"""
Aqsh Prisma - Analytics Data Fetcher (Enhanced for SEO Strategy)
GA4 (REST API) + Google Search Console のデータを取得して documents/analytics/ に格納する。
Usage: python scripts/fetch_analytics_data.py [--days 30]

NOTE: GA4はgRPCクライアントだとDNS解決に失敗するため、REST APIを直接使用している。
"""
import os
import json
import urllib.request
import argparse
from datetime import datetime, timedelta
from dotenv import load_dotenv
from google.oauth2 import service_account
from google.auth.transport.requests import Request

# GSC Libraries
from googleapiclient.discovery import build
import httplib2
from oauth2client.service_account import ServiceAccountCredentials

# ── Setup ────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(BASE_DIR, ".env.local"))

GA4_PROPERTY_ID = os.getenv("GA4_PROPERTY_ID", "").replace("properties/", "")
GSC_SITE_URL = os.getenv("GSC_SITE_URL")
CREDENTIALS_PATH = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
GA4_CV_EVENTS = os.getenv("GA4_CV_EVENTS", "")
GA4_READ_EVENT = os.getenv("GA4_READ_EVENT", "read_complete")
GA4_RELATED_EVENT = os.getenv("GA4_RELATED_EVENT", "click_related_article")

OUTPUT_DIR = os.path.join(BASE_DIR, "documents", "analytics")
GA4_API_BASE = f"https://analyticsdata.googleapis.com/v1beta/properties/{GA4_PROPERTY_ID}:runReport"

# API Timeout: increased for larger limits
API_TIMEOUT = 60


def parse_args():
    parser = argparse.ArgumentParser(description="Fetch Analytics Data")
    parser.add_argument("--days", type=int, default=30, help="Number of days to fetch data for (default: 30)")
    return parser.parse_args()


def setup_output_dir(days):
    today = datetime.now().strftime("%Y-%m-%d")
    target_dir = os.path.join(OUTPUT_DIR, today)
    os.makedirs(target_dir, exist_ok=True)
    return target_dir


def get_ga4_token():
    credentials = service_account.Credentials.from_service_account_file(
        CREDENTIALS_PATH,
        scopes=["https://www.googleapis.com/auth/analytics.readonly"]
    )
    credentials.refresh(Request())
    return credentials.token


def ga4_request(token, body):
    """GA4 REST APIリクエスト"""
    req = urllib.request.Request(
        GA4_API_BASE,
        data=json.dumps(body).encode("utf-8"),
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        method="POST"
    )
    with urllib.request.urlopen(req, timeout=API_TIMEOUT) as resp:
        return json.loads(resp.read().decode("utf-8"))


# ── GA4 ──────────────────────────────────────────────────
def fetch_ga4_summary(token, target_days):
    """当期と前期のサマリーを取得"""
    start_date_current = f"{target_days}daysAgo"
    end_date_current = "yesterday"
    start_date_prev = f"{target_days * 2}daysAgo"
    end_date_prev = f"{target_days + 1}daysAgo"

    def _fetch(start, end):
        body = {
            "dateRanges": [{"startDate": start, "endDate": end}],
            "metrics": [
                {"name": "activeUsers"}, {"name": "newUsers"},
                {"name": "screenPageViews"}, {"name": "sessions"},
                {"name": "userEngagementDuration"}, {"name": "engagementRate"},
                {"name": "bounceRate"}, {"name": "screenPageViewsPerSession"},
                {"name": "conversions"}
            ]
        }
        try:
            result = ga4_request(token, body)
            row = result.get("rows", [{}])[0]
            if not row: return None
            vals = [v["value"] for v in row.get("metricValues", [])]
            conversions = float(vals[8]) if len(vals) > 8 else 0

            users = int(vals[0])
            sessions = int(vals[3])
            return {
                "active_users": users,
                "new_users": int(vals[1]),
                "page_views": int(vals[2]),
                "sessions": sessions,
                "total_engagement_sec": round(float(vals[4]), 1),
                "avg_engagement_per_user_sec": round(float(vals[4]) / users, 1) if users > 0 else 0,
                "engagement_rate": round(float(vals[5]), 4),
                "bounce_rate": round(float(vals[6]), 4),
                "pages_per_session": round(float(vals[7]), 2),
                "conversions": int(conversions),
                "cvr_per_session": round(conversions / sessions, 4) if sessions > 0 else 0
            }
        except Exception as e:
            print(f"  Error (summary): {e}")
            return None

    current = _fetch(start_date_current, end_date_current)
    prev = _fetch(start_date_prev, end_date_prev)
    return current, prev


def fetch_ga4_pages(token, target_days, organic_only=False):
    """ページごとのデータを取得。Organicに絞るオプションを追加し、上限1000件"""
    body = {
        "dateRanges": [{"startDate": f"{target_days}daysAgo", "endDate": "yesterday"}],
        "dimensions": [{"name": "pagePath"}, {"name": "pageTitle"}],
        "metrics": [
            {"name": "activeUsers"}, {"name": "screenPageViews"},
            {"name": "userEngagementDuration"}, {"name": "engagementRate"},
            {"name": "bounceRate"}
        ],
        "orderBys": [{"metric": {"metricName": "screenPageViews"}, "desc": True}],
        "limit": 1000
    }
    
    if organic_only:
        body["dimensionFilter"] = {
            "filter": {
                "fieldName": "sessionDefaultChannelGroup",
                "stringFilter": {"matchType": "EXACT", "value": "Organic Search"}
            }
        }

    try:
        result = ga4_request(token, body)
        data = []
        for row in result.get("rows", []):
            dims = [d["value"] for d in row.get("dimensionValues", [])]
            vals = [v["value"] for v in row.get("metricValues", [])]
            users = int(vals[0])
            engagement_sec = float(vals[2])
            data.append({
                "page_path": dims[0],
                "page_title": dims[1],
                "active_users": users,
                "page_views": int(vals[1]),
                "avg_engagement_sec": round(engagement_sec / users, 1) if users > 0 else 0,
                "engagement_rate": round(float(vals[3]), 4),
                "bounce_rate": round(float(vals[4]), 4),
            })
        return data
    except Exception as e:
        print(f"  Error (pages organic={organic_only}): {e}")
        return None


def fetch_ga4_custom_events_grouped(token, target_days, event_names):
    """指定されたカスタムイベント群をページ×イベント名ごとにグループ化して取得する"""
    if not event_names:
        return {}
    
    body = {
        "dateRanges": [{"startDate": f"{target_days}daysAgo", "endDate": "yesterday"}],
        "dimensions": [{"name": "pagePath"}, {"name": "eventName"}],
        "metrics": [{"name": "eventCount"}],
        "dimensionFilter": {
            "filter": {
                "fieldName": "eventName",
                "inListFilter": {"values": event_names}
            }
        },
        "limit": 100000
    }
    try:
        result = ga4_request(token, body)
        data = {}
        for row in result.get("rows", []):
            path = row["dimensionValues"][0]["value"]
            ev_name = row["dimensionValues"][1]["value"]
            count = int(row["metricValues"][0]["value"])
            if path not in data:
                data[path] = {}
            data[path][ev_name] = count
        return data
    except Exception as e:
        print(f"  Error (custom_events_grouped): {e}")
        return {}


def fetch_ga4_sources(token, target_days):
    body = {
        "dateRanges": [{"startDate": f"{target_days}daysAgo", "endDate": "yesterday"}],
        "dimensions": [{"name": "sessionDefaultChannelGroup"}],
        "metrics": [
            {"name": "activeUsers"}, {"name": "sessions"},
            {"name": "screenPageViews"}, {"name": "userEngagementDuration"},
            {"name": "conversions"}
        ],
        "orderBys": [{"metric": {"metricName": "sessions"}, "desc": True}],
    }
    try:
        result = ga4_request(token, body)
        data = []
        for row in result.get("rows", []):
            vals = [v["value"] for v in row.get("metricValues", [])]
            users = int(vals[0])
            engagement_sec = float(vals[3])
            conversions = float(vals[4]) if len(vals) > 4 else 0
            
            data.append({
                "channel": row["dimensionValues"][0]["value"],
                "active_users": users,
                "sessions": int(vals[1]),
                "page_views": int(vals[2]),
                "avg_engagement_sec": round(engagement_sec / users, 1) if users > 0 else 0,
                "conversions": int(conversions)
            })
        return data
    except Exception as e:
        print(f"  Error (sources): {e}")
        return None


def fetch_ga4_source_detail(token, target_days):
    body = {
        "dateRanges": [{"startDate": f"{target_days}daysAgo", "endDate": "yesterday"}],
        "dimensions": [{"name": "sessionSource"}, {"name": "sessionMedium"}],
        "metrics": [
            {"name": "activeUsers"}, {"name": "sessions"},
            {"name": "screenPageViews"}, {"name": "userEngagementDuration"},
        ],
        "orderBys": [{"metric": {"metricName": "sessions"}, "desc": True}],
        "limit": 50
    }
    try:
        result = ga4_request(token, body)
        data = []
        for row in result.get("rows", []):
            dims = [d["value"] for d in row.get("dimensionValues", [])]
            vals = [v["value"] for v in row.get("metricValues", [])]
            users = int(vals[0])
            engagement_sec = float(vals[3])
            data.append({
                "source": dims[0],
                "medium": dims[1],
                "active_users": users,
                "sessions": int(vals[1]),
                "page_views": int(vals[2]),
                "avg_engagement_sec": round(engagement_sec / users, 1) if users > 0 else 0,
            })
        return data
    except Exception as e:
        print(f"  Error (source_detail): {e}")
        return None


# ── GSC ──────────────────────────────────────────────────
def build_gsc_service():
    if not CREDENTIALS_PATH or not os.path.exists(CREDENTIALS_PATH):
        return None
    scopes = ['https://www.googleapis.com/auth/webmasters.readonly']
    credentials = ServiceAccountCredentials.from_json_keyfile_name(CREDENTIALS_PATH, scopes)
    http = credentials.authorize(httplib2.Http())
    return build('searchconsole', 'v1', http=http, cache_discovery=False)


def fetch_gsc_data(service, dimension="query", days=30):
    if not GSC_SITE_URL:
        return None
    start_date = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')
    end_date = (datetime.now() - timedelta(days=2)).strftime('%Y-%m-%d')
    request = {'startDate': start_date, 'endDate': end_date, 'dimensions': [dimension], 'rowLimit': 1000}
    try:
        response = service.searchanalytics().query(siteUrl=GSC_SITE_URL, body=request).execute()
        data = []
        for row in response.get('rows', []):
            data.append({
                dimension: row['keys'][0],
                'clicks': row['clicks'], 'impressions': row['impressions'],
                'ctr': row.get('ctr', 0), 'position': row.get('position', 0)
            })
        return data
    except Exception as e:
        print(f"  Error (GSC {dimension}): {e}")
        return None

def fetch_gsc_cross_data(service, days=30):
    """pageとqueryのクロスディメンションで取得し、URLごとに最大のクリック数を生む「トップクエリ」を算出する"""
    if not GSC_SITE_URL:
        return {}
    start_date = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')
    end_date = (datetime.now() - timedelta(days=2)).strftime('%Y-%m-%d')
    request = {'startDate': start_date, 'endDate': end_date, 'dimensions': ["page", "query"], 'rowLimit': 5000}
    try:
        response = service.searchanalytics().query(siteUrl=GSC_SITE_URL, body=request).execute()
        page_query_map = {}
        for row in response.get('rows', []):
            url = row['keys'][0].replace(GSC_SITE_URL, "")
            if not url.startswith("/"): url = "/" + url
            query = row['keys'][1]
            clicks = row['clicks']
            pos = row.get('position', 0)
            
            if url not in page_query_map:
                page_query_map[url] = {"top_query": query, "clicks": clicks, "position": pos}
            else:
                if clicks > page_query_map[url]["clicks"]:
                    page_query_map[url] = {"top_query": query, "clicks": clicks, "position": pos}
        return page_query_map
    except Exception as e:
        print(f"  Error (GSC cross): {e}")
        return {}


# ── AI Rewrite Logic ─────────────────────────────────────
def evaluate_rewrite_flag(p):
    """
    戦略ドキュメントに基づくリライトフラグ付与
    """
    pos = p.get('gsc_position', 0)
    pv = p.get('page_views', 0)
    bounce = p.get('bounce_rate', 0)
    read_rate = p.get('read_rate', 0)
    
    flags = []
    # A: 表示/PV多 × 順位8-20
    if 8 <= pos <= 20 and pv >= 30:
        flags.append("🚨 [A: 最優先] 順位8-20位でPVあり。内部リンクやh2等の改善でTop3を狙えます。")
        
    # C: 順位高 × CTR低(PV少)
    if 1 <= pos <= 7 and pv < 15:
        flags.append("⚠️ [C: CTR改善] 順位は高いがPVが少ない。タイトル/リード文の検索意図マッチを見直してください。")
        
    # E: 直帰改善
    if bounce >= 0.6 and read_rate <= 0.15 and pv >= 10:
        flags.append("⚠️ [E: 直帰改善] 直帰率が高く完読されていません。リード文やUIUXの改善が推奨されます。")
        
    return " / ".join(flags) if flags else ""

# ── Markdown出力 ─────────────────────────────────────────
def fmt_sec(sec):
    m, s = divmod(int(sec), 60)
    return f"{m}分{s:02d}秒"

def calc_diff(curr, prev):
    if not prev or prev == 0:
        return "N/A"
    diff = ((curr - prev) / prev) * 100
    sign = "+" if diff > 0 else ""
    return f"{sign}{diff:.1f}%"

def calc_pt_diff(curr, prev):
    if not prev:
        return "N/A"
    diff = (curr - prev) * 100
    sign = "+" if diff > 0 else ""
    return f"{sign}{diff:.1f}pt"


def save_ga4_markdown(summary, prev_summary, pages, organic_pages, sources, out_dir, source_detail=None, days=30):
    md = os.path.join(out_dir, "ga4_summary.md")
    with open(md, "w", encoding="utf-8") as f:
        f.write(f"# GA4 Analytics Summary\n")
        f.write(f"> 取得日: {datetime.now().strftime('%Y-%m-%d')} / 対象期間: 過去{days}日間\n\n")

        # --- サマリー ---
        if summary:
            f.write("## サイト全体KPI (当期比)\n\n| 指標 | 当期 | 前期差分 |\n|---|---|---|\n")
            p = prev_summary or {}
            
            f.write(f"| **アクティブユーザー** | {summary['active_users']:,} | {calc_diff(summary['active_users'], p.get('active_users', 0))} |\n")
            f.write(f"| 新規ユーザー | {summary['new_users']:,} | {calc_diff(summary['new_users'], p.get('new_users', 0))} |\n")
            f.write(f"| **セッション** | {summary['sessions']:,} | {calc_diff(summary['sessions'], p.get('sessions', 0))} |\n")
            f.write(f"| **ページビュー** | {summary['page_views']:,} | {calc_diff(summary['page_views'], p.get('page_views', 0))} |\n")
            f.write(f"| ユーザーあたり平均エンゲージメント | {fmt_sec(summary['avg_engagement_per_user_sec'])} | - |\n")
            f.write(f"| ページ/セッション | {summary['pages_per_session']} | {calc_diff(summary['pages_per_session'], p.get('pages_per_session', 0))} |\n")
            f.write(f"| エンゲージメント率 | {summary['engagement_rate']:.1%} | {calc_pt_diff(summary['engagement_rate'], p.get('engagement_rate', 0))} |\n")
            f.write(f"| 直帰率 | {summary['bounce_rate']:.1%} | {calc_pt_diff(summary['bounce_rate'], p.get('bounce_rate', 0))} |\n")
            f.write(f"| **コンバージョン (CV)** | {summary.get('conversions', 0):,} | {calc_diff(summary.get('conversions', 0), p.get('conversions', 0))} |\n")
            f.write(f"| セッションCVR | {summary.get('cvr_per_session', 0):.2%} | {calc_pt_diff(summary.get('cvr_per_session', 0), p.get('cvr_per_session', 0))} |\n\n")

        # --- ページ群パフォーマンス出力ヘルパー ---
        def render_table(title, items, limit=20, show_top_query=False):
            f.write(f"### {title} (上位{limit}件)\n")
            if show_top_query:
                f.write("| Page Path | トップクエリ(順位) | PV | ユーザー | 直帰率 | 診断CV | 完読率 | 関連記事CTR |\n|---|---|---|---|---|---|---|---|\n")
            else:
                f.write("| Page Path | PV | ユーザー | 直帰率 | 診断CV | 完読率 | 関連記事CTR |\n|---|---|---|---|---|---|---|\n")
            
            for r in items[:limit]:
                cv = r.get('conversions', 0)
                read = r.get('read_rate', 0)
                rel_ctr = r.get('related_ctr', 0)
                
                if show_top_query:
                    query_str = f"{r.get('top_query', '-')} ({r.get('gsc_position', 0):.1f}位)"
                    f.write(f"| {r['page_path']} | {query_str} | {r['page_views']:,} | {r['active_users']:,} | {r['bounce_rate']:.1%} | **{cv:,}** | {read:.1%} | {rel_ctr:.1%} |\n")
                else:
                    f.write(f"| {r['page_path']} | {r['page_views']:,} | {r['active_users']:,} | {r['bounce_rate']:.1%} | **{cv:,}** | {read:.1%} | {rel_ctr:.1%} |\n")
            f.write("\n")

        if pages:
            blog_pages = [p for p in pages if p['page_path'].startswith('/articles/')]
            type_pages = [p for p in pages if p['page_path'].startswith('/types/')]
            other_pages = [p for p in pages if not p['page_path'].startswith('/articles/') and not p['page_path'].startswith('/types/')]

            f.write("## ページ群パフォーマンス (セクション別)\n\n")
            render_table("📚 記事ディレクトリ (/articles/*) 全流入", blog_pages)
            render_table("🔍 診断タイプ・相性ディレクトリ (/types/*) 全流入", type_pages)
            render_table("🏠 その他 (/, /about 等)", other_pages)
            
            # --- Organic限定ページ分析 ---
            if organic_pages:
                org_blog = [p for p in organic_pages if p['page_path'].startswith('/articles/')]
                f.write("### 🍃 【SEO向け】記事のOrganic検索流入 (自然検索のみ)\n")
                f.write("> SEOリライトやキーワード適合性の判定に利用。\n\n")
                render_table("Organic 検索流入", org_blog, limit=30, show_top_query=True)

            # --- AIリライト自動判定 ---
            rewrite_targets = [p for p in organic_pages if p.get('rewrite_flag')]
            if rewrite_targets:
                f.write("### 🚨 AI判定: 今週優先して手を入れるべきリライト推奨記事\n")
                f.write("> GSC順位データとGA4行動データをクロス分析し、SEO戦略ファイルに基づき自動抽出しました。\n\n")
                f.write("| 対象URL | トップクエリ | 判断理由 (AIフラグ) |\n|---|---|---|\n")
                for r in rewrite_targets[:20]:
                    query = f"{r.get('top_query', '-')} ({r.get('gsc_position', 0):.1f}位)"
                    f.write(f"| {r['page_path']} | {query} | {r['rewrite_flag']} |\n")
                f.write("\n")

            # --- 低PV ---
            low_pv_pages = [p for p in blog_pages if p['page_views'] <= 20]
            if low_pv_pages:
                f.write(f"### ⚠️ 潜在課題・リライト候補リスト (PV ≤ 20/期間中)\n")
                f.write("| リライト候補パス | PV | 直帰率 | 診断CV |\n|---|---|---|---|\n")
                for r in low_pv_pages[:30]:
                    f.write(f"| {r['page_path']} | {r['page_views']} | {r['bounce_rate']:.1%} | {r.get('conversions', 0)} |\n")
                f.write("\n")
                
    print(f"  -> Saved: {md}")


def save_gsc_markdown(query_data, out_dir, days=30):
    if not query_data:
        return
    md = os.path.join(out_dir, "gsc_queries_summary.md")
    sorted_data = sorted(query_data, key=lambda x: x['clicks'], reverse=True)
    with open(md, "w", encoding="utf-8") as f:
        f.write(f"# GSC Queries Summary (過去{days}日間)\n\n")
        f.write("| Query | Clicks | Impressions | CTR | Position |\n|---|---|---|---|---|\n")
        for r in sorted_data[:50]:
            f.write(f"| {r['query']} | {r['clicks']} | {r['impressions']} | {r['ctr']:.1%} | {r['position']:.1f} |\n")
    print(f"  -> Saved: {md}")


# ── Main ─────────────────────────────────────────────────
def main():
    args = parse_args()
    print("=" * 50)
    print(f"Aqsh Prisma Ultimate Analytics Fetcher (Days: {args.days})")
    print("=" * 50)

    if not CREDENTIALS_PATH or not os.path.exists(CREDENTIALS_PATH):
        print(f"Error: Credentials not found at {CREDENTIALS_PATH}")
        return

    out_dir = setup_output_dir(args.days)
    print(f"Output: {out_dir}\n")

    # 1. GSC API fetching (First to prepare merge data)
    print("[GSC] Fetching cross-dimension data...")
    gsc_service = build_gsc_service()
    page_query_map = {}
    gsc_q, gsc_p = [], []
    if gsc_service:
        page_query_map = fetch_gsc_cross_data(gsc_service, args.days)
        gsc_q = fetch_gsc_data(gsc_service, "query", args.days)
        gsc_p = fetch_gsc_data(gsc_service, "page", args.days)
        print(f"  -> Fetched {len(page_query_map)} cross-dimension page-query mapping.")

    # 2. GA4 API fetching
    print("\n[GA4] Fetching via REST API...")
    token = get_ga4_token()

    print(f"  - Fetching summary data...")
    summary, prev_summary = fetch_ga4_summary(token, args.days)
    
    print(f"  - Fetching page data...")
    ga4_pages = fetch_ga4_pages(token, args.days)
    ga4_organic_pages = fetch_ga4_pages(token, args.days, organic_only=True)
    
    print(f"  - Fetching sources...")
    ga4_sources = fetch_ga4_sources(token, args.days)
    ga4_source_detail = fetch_ga4_source_detail(token, args.days)

    # 3. Data Merging
    print("\n[MERGE] Merging GA4 Events and GSC Top Queries...")
    custom_cv_events = [e.strip() for e in GA4_CV_EVENTS.split(",") if e.strip()]
    all_custom_events = custom_cv_events + [GA4_READ_EVENT, GA4_RELATED_EVENT]

    page_ev_map = {}
    if all_custom_events:
        page_ev_map = fetch_ga4_custom_events_grouped(token, args.days, all_custom_events)

    def process_and_merge(pages):
        if not pages: return
        for p in pages:
            url = p["page_path"]
            ev_counts = page_ev_map.get(url, {})
            # Merge Google Analytics Custom Events
            p["conversions"] = sum(ev_counts.get(ev, 0) for ev in custom_cv_events)
            p["read_complete"] = ev_counts.get(GA4_READ_EVENT, 0)
            p["click_related"] = ev_counts.get(GA4_RELATED_EVENT, 0)
            
            au = p["active_users"]
            p["cvr"] = p["conversions"] / au if au > 0 else 0
            p["read_rate"] = p["read_complete"] / au if au > 0 else 0
            p["related_ctr"] = p["click_related"] / au if au > 0 else 0
            
            # Merge Google Search Console Top Query
            gsc_data = page_query_map.get(url, {})
            p["top_query"] = gsc_data.get("top_query", "-")
            p["gsc_position"] = gsc_data.get("position", 0)
            p["gsc_clicks"] = gsc_data.get("clicks", 0)
            
            # Evaluate SEO Rewrite Flags
            p["rewrite_flag"] = evaluate_rewrite_flag(p)

    process_and_merge(ga4_pages)
    process_and_merge(ga4_organic_pages)

    # 4. Save and Output
    print("\n[OUTPUT] Generating Markdown Reports...")
    save_ga4_markdown(summary, prev_summary, ga4_pages, ga4_organic_pages, ga4_sources, out_dir, ga4_source_detail, args.days)
    save_gsc_markdown(gsc_q, out_dir, args.days)

    print(f"\nDone! -> {out_dir}")


if __name__ == "__main__":
    main()

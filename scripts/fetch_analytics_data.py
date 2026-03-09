"""
Aqsh Prisma - Analytics Data Fetcher
GA4 (REST API) + Google Search Console のデータを取得して documents/analytics/ に格納する。
Usage: python scripts/fetch_analytics_data.py

NOTE: GA4はgRPCクライアントだとDNS解決に失敗するため、REST APIを直接使用している。
"""
import os
import json
import urllib.request
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
OUTPUT_DIR = os.path.join(BASE_DIR, "documents", "analytics")
GA4_API_BASE = f"https://analyticsdata.googleapis.com/v1beta/properties/{GA4_PROPERTY_ID}:runReport"


def setup_output_dir():
    current_month = datetime.now().strftime("%Y-%m")
    target_dir = os.path.join(OUTPUT_DIR, current_month)
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
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


# ── GA4 ──────────────────────────────────────────────────
def fetch_ga4_summary(token):
    body = {
        "dateRanges": [{"startDate": "30daysAgo", "endDate": "yesterday"}],
        "metrics": [
            {"name": "activeUsers"}, {"name": "newUsers"},
            {"name": "screenPageViews"}, {"name": "sessions"},
            {"name": "userEngagementDuration"}, {"name": "engagementRate"},
            {"name": "bounceRate"}, {"name": "screenPageViewsPerSession"},
        ]
    }
    try:
        result = ga4_request(token, body)
        row = result.get("rows", [{}])[0]
        vals = [v["value"] for v in row.get("metricValues", [])]
        users = int(vals[0])
        return {
            "period": "last_30_days",
            "active_users": users,
            "new_users": int(vals[1]),
            "page_views": int(vals[2]),
            "sessions": int(vals[3]),
            "total_engagement_sec": round(float(vals[4]), 1),
            "avg_engagement_per_user_sec": round(float(vals[4]) / users, 1) if users > 0 else 0,
            "engagement_rate": round(float(vals[5]), 4),
            "bounce_rate": round(float(vals[6]), 4),
            "pages_per_session": round(float(vals[7]), 2),
        }
    except Exception as e:
        print(f"  Error (summary): {e}")
        return None


def fetch_ga4_pages(token):
    body = {
        "dateRanges": [{"startDate": "30daysAgo", "endDate": "yesterday"}],
        "dimensions": [{"name": "pagePath"}, {"name": "pageTitle"}],
        "metrics": [
            {"name": "activeUsers"}, {"name": "screenPageViews"},
            {"name": "userEngagementDuration"}, {"name": "engagementRate"},
            {"name": "bounceRate"},
        ],
        "orderBys": [{"metric": {"metricName": "screenPageViews"}, "desc": True}],
        "limit": 100
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
        print(f"  Error (pages): {e}")
        return None


def fetch_ga4_sources(token):
    body = {
        "dateRanges": [{"startDate": "30daysAgo", "endDate": "yesterday"}],
        "dimensions": [{"name": "sessionDefaultChannelGroup"}],
        "metrics": [
            {"name": "activeUsers"}, {"name": "sessions"},
            {"name": "screenPageViews"}, {"name": "userEngagementDuration"},
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
            data.append({
                "channel": row["dimensionValues"][0]["value"],
                "active_users": users,
                "sessions": int(vals[1]),
                "page_views": int(vals[2]),
                "avg_engagement_sec": round(engagement_sec / users, 1) if users > 0 else 0,
            })
        return data
    except Exception as e:
        print(f"  Error (sources): {e}")
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


# ── Markdown出力 ─────────────────────────────────────────
def fmt_sec(sec):
    m, s = divmod(int(sec), 60)
    return f"{m}分{s:02d}秒"


def save_ga4_markdown(summary, pages, sources, out_dir):
    md = os.path.join(out_dir, "ga4_summary.md")
    with open(md, "w", encoding="utf-8") as f:
        f.write(f"# GA4 Analytics Summary ({datetime.now().strftime('%Y-%m')})\n")
        f.write(f"> 取得日: {datetime.now().strftime('%Y-%m-%d')} / 期間: 過去30日\n\n")

        if summary:
            f.write("## サイト全体\n\n| 指標 | 値 |\n|---|---|\n")
            f.write(f"| アクティブユーザー | {summary['active_users']} |\n")
            f.write(f"| 新規ユーザー | {summary['new_users']} |\n")
            f.write(f"| セッション | {summary['sessions']} |\n")
            f.write(f"| ページビュー | {summary['page_views']} |\n")
            f.write(f"| ユーザーあたり平均エンゲージメント | {fmt_sec(summary['avg_engagement_per_user_sec'])} |\n")
            f.write(f"| ページ/セッション | {summary['pages_per_session']} |\n")
            f.write(f"| エンゲージメント率 | {summary['engagement_rate']:.1%} |\n")
            f.write(f"| 直帰率 | {summary['bounce_rate']:.1%} |\n\n")

        if sources:
            f.write("## 流入経路\n\n| チャネル | ユーザー | セッション | PV | 平均エンゲージメント |\n|---|---|---|---|---|\n")
            for r in sources:
                f.write(f"| {r['channel']} | {r['active_users']} | {r['sessions']} | {r['page_views']} | {fmt_sec(r['avg_engagement_sec'])} |\n")
            f.write("\n")

        if pages:
            f.write("## ページ別（上位50）\n\n| Page Path | PV | ユーザー | 平均エンゲージメント | エンゲージ率 | 直帰率 |\n|---|---|---|---|---|---|\n")
            for r in pages[:50]:
                f.write(f"| {r['page_path']} | {r['page_views']} | {r['active_users']} | {fmt_sec(r['avg_engagement_sec'])} | {r['engagement_rate']:.1%} | {r['bounce_rate']:.1%} |\n")
    print(f"  -> Saved: {md}")


def save_gsc_markdown(query_data, out_dir):
    if not query_data:
        return
    md = os.path.join(out_dir, "gsc_queries_summary.md")
    sorted_data = sorted(query_data, key=lambda x: x['clicks'], reverse=True)
    with open(md, "w", encoding="utf-8") as f:
        f.write(f"# GSC Queries Summary ({datetime.now().strftime('%Y-%m')})\n\n")
        f.write("| Query | Clicks | Impressions | CTR | Position |\n|---|---|---|---|---|\n")
        for r in sorted_data[:50]:
            f.write(f"| {r['query']} | {r['clicks']} | {r['impressions']} | {r['ctr']:.1%} | {r['position']:.1f} |\n")
    print(f"  -> Saved: {md}")


# ── Main ─────────────────────────────────────────────────
def main():
    print("=" * 50)
    print("Aqsh Prisma Analytics Data Fetcher")
    print("=" * 50)

    if not CREDENTIALS_PATH or not os.path.exists(CREDENTIALS_PATH):
        print(f"Error: Credentials not found at {CREDENTIALS_PATH}")
        return

    out_dir = setup_output_dir()
    print(f"Output: {out_dir}\n")

    # ── GA4 (REST API) ──
    print("[GA4] Fetching via REST API...")
    token = get_ga4_token()

    ga4_summary = fetch_ga4_summary(token)
    if ga4_summary:
        with open(os.path.join(out_dir, "ga4_summary_raw.json"), "w", encoding="utf-8") as f:
            json.dump(ga4_summary, f, indent=2, ensure_ascii=False)
        print(f"  Users: {ga4_summary['active_users']}, PV: {ga4_summary['page_views']}, Sessions: {ga4_summary['sessions']}")

    ga4_pages = fetch_ga4_pages(token)
    if ga4_pages:
        with open(os.path.join(out_dir, "ga4_pages_raw.json"), "w", encoding="utf-8") as f:
            json.dump(ga4_pages, f, indent=2, ensure_ascii=False)
        print(f"  {len(ga4_pages)} pages fetched")

    ga4_sources = fetch_ga4_sources(token)
    if ga4_sources:
        with open(os.path.join(out_dir, "ga4_sources_raw.json"), "w", encoding="utf-8") as f:
            json.dump(ga4_sources, f, indent=2, ensure_ascii=False)
        print(f"  {len(ga4_sources)} channels fetched")

    save_ga4_markdown(ga4_summary, ga4_pages, ga4_sources, out_dir)

    # ── GSC ──
    print("\n[GSC] Fetching data...")
    gsc_service = build_gsc_service()
    if gsc_service:
        gsc_q = fetch_gsc_data(gsc_service, "query")
        if gsc_q:
            with open(os.path.join(out_dir, "gsc_queries_raw.json"), "w", encoding="utf-8") as f:
                json.dump(gsc_q, f, indent=2, ensure_ascii=False)
            print(f"  {len(gsc_q)} queries fetched")

        gsc_p = fetch_gsc_data(gsc_service, "page")
        if gsc_p:
            with open(os.path.join(out_dir, "gsc_pages_raw.json"), "w", encoding="utf-8") as f:
                json.dump(gsc_p, f, indent=2, ensure_ascii=False)
            print(f"  {len(gsc_p)} pages fetched")

        save_gsc_markdown(gsc_q, out_dir)

    print(f"\nDone! -> {out_dir}")


if __name__ == "__main__":
    main()

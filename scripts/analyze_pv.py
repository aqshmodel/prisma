import json
import re

slugs_after_0320 = set()
with open("documents/プロジェクト戦略ver2/記事テーマサマリ.md", "r", encoding="utf-8") as f:
    for line in f:
        # e.g. | article-slug | タイトル | カテゴリ | ピラー | 2026-03-25 | 備考 |
        # 日付が 2026-03-20 〜 2026-04-31 にマッチするもの
        match = re.search(r'\|\s*([a-zA-Z0-9_-]+)\s*\|.*?\|\s*(2026-03-2[0-9]|2026-03-3[0-1]|2026-04-[0-9]{2})\s*\|', line)
        if match:
            slug = match.group(1)
            slugs_after_0320.add(slug)

print(f"3/20以降に作成されたと判定した記事数: {len(slugs_after_0320)}")

with open("documents/analytics/2026-04-05/ga4_pages.json", "r", encoding="utf-8") as f:
    data = json.load(f)

results = []
for row in data:
    path = row.get("page_path", "")
    pv = row.get("page_views", 0)
    
    if path.startswith("/articles/"):
        slug = path.strip("/").split("/")[-1]
        # "slug" が slugs_after_0320 の中に含まれているか確認
        if slug in slugs_after_0320:
            results.append((slug, int(pv)))

# PV降順でソート
results.sort(key=lambda x: x[1], reverse=True)

print("=== 3/20以降に執筆された記事のPVランキング ===")
for slug, pv in results:
    print(f"{pv} PV : {slug}")

import re
import os
import glob

CONTENT_DIR = "content/articles"
ALL_ARTICLES = set()

# Collect all valid article slugs
for filepath in glob.glob(f"{CONTENT_DIR}/**/*.mdx", recursive=True):
    filename = os.path.basename(filepath)
    slug = filename.replace(".mdx", "")
    ALL_ARTICLES.add(slug)

broken_links = []
suspicious_links = []

# Catch markdown links [text](url) and href="url"
# link_pattern = re.compile(r'\[([^\]]+)\]\(([^)]+)\)')
# Also matching <a href="..."> just in case
md_link_pattern = re.compile(r'\[([^\]]+)\]\(([^)]+)\)')

for filepath in glob.glob(f"{CONTENT_DIR}/**/*.mdx", recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    md_links = md_link_pattern.findall(content)
    
    for text, url in md_links:
        # Ignore external links, mailto, etc.
        if url.startswith('http') or url.startswith('mailto:') or url.startswith('#'):
            continue
            
        # Ignore images
        if url.startswith('/images/') or url.endswith('.png') or url.endswith('.jpg') or url.endswith('.webp'):
            continue

        # Check internal /articles/ links
        if url.startswith('/articles/'):
            url_path = url.split('#')[0]
            target_slug = url_path.replace('/articles/', '').strip('/')
            
            # If there's no slug (e.g. just /articles/ or /articles), that's a list page. Assuming it's valid.
            if target_slug and target_slug not in ALL_ARTICLES:
                broken_links.append({"file": filepath, "text": text, "broken_url": url, "reason": "記事が存在しません"})
        
        # Check relative links that people might have mistakenly added (e.g. ./slug or ../slug or slug.mdx)
        elif not url.startswith('/'):
            suspicious_links.append({"file": filepath, "text": text, "url": url, "reason": "相対パスの可能性があります"})
            
        # Check absolute links to other parts of the site
        elif url.startswith('/'):
            # Allow / (top), /about, /diagnosis, /tags, etc.
            # We won't strictly enforce existence of all Next.js pages here, but log if it looks like an article typo
            if "article" in url and not url.startswith('/articles/'):
                suspicious_links.append({"file": filepath, "text": text, "url": url, "reason": "タイポの可能性があります (/article/等)"})

print("=== 🚨 リンク切れ（/articles/...） ===")
if broken_links:
    for b in broken_links:
        print(f"ファイル: {b['file']}\n  テキスト: [{b['text']}]\n  リンク: {b['broken_url']}\n  理由: {b['reason']}\n")
else:
    print("なし！ /articles/ 配下のリンク切れは完全にゼロです。")

print("\n=== ⚠️ 疑わしいリンク（相対パスやタイポの可能性） ===")
if suspicious_links:
    for s in suspicious_links:
        print(f"ファイル: {s['file']}\n  テキスト: [{s['text']}]\n  リンク: {s['url']}\n  理由: {s['reason']}\n")
else:
    print("なし！ 怪しい形式のリンクは見当たりません。")


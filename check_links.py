import re
import os
import glob

CONTENT_DIR = "content/articles"
ALL_ARTICLES = set()

for filepath in glob.glob(f"{CONTENT_DIR}/**/*.mdx", recursive=True):
    filename = os.path.basename(filepath)
    slug = filename.replace(".mdx", "")
    ALL_ARTICLES.add(slug)

no_link_files = []
broken_links = []

link_pattern = re.compile(r'\[([^\]]+)\]\((/[^)]+)\)')

for filepath in glob.glob(f"{CONTENT_DIR}/**/*.mdx", recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    links = link_pattern.findall(content)
    
    internal_links = [link for link in links if link[1].startswith('/') and not link[1].startswith('/images/')]
    
    if not internal_links:
        no_link_files.append(filepath)
    
    for text, url in internal_links:
        if url.startswith('/articles/'):
            url_path = url.split('#')[0]
            target_slug = url_path.replace('/articles/', '').strip('/')
            if target_slug not in ALL_ARTICLES:
                broken_links.append({"file": filepath, "text": text, "broken_url": url})

print("=== サイト内リンクがない記事 ===")
if no_link_files:
    for f in no_link_files:
        print(f)
else:
    print("なし！すべての記事にサイト内リンクがあります。")

print("\n=== リンク切れ（/articles/...） ===")
if broken_links:
    for b in broken_links:
        print(f"ファイル: {b['file']}\n  テキスト: [{b['text']}]\n  リンク先: {b['broken_url']}\n")
else:
    print("なし！/articles/ へのリンク切れはありません。")

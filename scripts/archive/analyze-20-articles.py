import os
import re

articles = [
    # Batch 3
    "infp-new-assignment-anxiety.mdx",
    "isfj-burnout-after-holidays.mdx",
    "human-strengths-in-ai-era-by-type.mdx",
    "intj-desire-for-independence.mdx",
    "intp-stress-from-unreasonable-boss.mdx",
    "estj-loneliness-of-competence.mdx",
    "entp-boredom-in-relationships.mdx",
    "isfp-loss-of-passion-at-work.mdx",
    "infj-empathy-fatigue-protection.mdx",
    "intronverts-need-for-alone-time.mdx",
    # Batch 4
    "self-love-with-personality-type.mdx",
    "f-type-empathy-as-a-charm.mdx",
    "t-type-logical-cool-aura.mdx",
    "n-type-creative-genius.mdx",
    "s-type-beauty-of-routine.mdx",
    "e-type-social-charm-power.mdx",
    "i-type-mysterious-charm.mdx",
    "j-type-reliability-in-love.mdx",
    "p-type-flexibility-in-love.mdx",
    "enneagram-aura-and-self-love.mdx"
]

base_dir = "content/articles"

print("=== 20 Articles Analysis ===")
print(f"{'Filename':<35} | {'Chars':<6} | {'Quotes(「」)':<12} | {'Links':<5} | {'Broken Links'}")
print("-" * 80)

for filename in articles:
    filepath = os.path.join(base_dir, filename)
    if not os.path.exists(filepath):
        print(f"{filename:<35} | NOT FOUND")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. 文字数
    char_count = len(content)
    
    # 2. 括弧の数（「 と 」のペアのおおよその数とするため、「 の数を数える）
    quote_count = content.count("「")
    
    # 3. 内部リンクの数とリンク切れチェック
    # マークダウンのリンク形式: [テキスト](/articles/slug)
    link_pattern = re.compile(r'\[.*?\]\((/articles/[a-zA-Z0-9-]+)\)')
    links = link_pattern.findall(content)
    link_count = len(links)
    
    broken_links = []
    for link in links:
        # 例: /articles/slug -> content/articles/slug.mdx が存在するか
        slug = link.replace('/articles/', '')
        target_file = os.path.join(base_dir, f"{slug}.mdx")
        if not os.path.exists(target_file):
            broken_links.append(link)
    
    broken_str = ", ".join(broken_links) if broken_links else "None"
    
    print(f"{filename:<35} | {char_count:<6} | {quote_count:<12} | {link_count:<5} | {broken_str}")

print("-" * 80)

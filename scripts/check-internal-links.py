import re
import os
import glob

# ピラー記事のslugリスト（想定）
pillar_slugs = [
    "understanding-16types-for-career",
    "understanding-16types-in-relationships",
    "understanding-16types-under-stress",
    "understanding-enneagram"
]

files = glob.glob("content/articles/*.mdx")
target_slugs = [
    "infp-new-assignment-anxiety",
    "isfj-burnout-after-holidays",
    "human-strengths-in-ai-era-by-type",
    "intj-desire-for-independence",
    "intp-stress-from-unreasonable-boss",
    "estj-loneliness-of-competence",
    "entp-boredom-in-relationships",
    "isfp-loss-of-passion-at-work",
    "infj-empathy-fatigue-protection",
    "intronverts-need-for-alone-time"
]

for filepath in files:
    basename = os.path.basename(filepath).replace('.mdx', '')
    if basename not in target_slugs:
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # MDX内のリンクを抽出 [text](/articles/slug)
    links = re.findall(r'\[([^\]]+)\]\((/articles/[^)]+)\)', content)
    
    has_pillar_link = False
    print(f"--- {basename} ---")
    for text, url in links:
        is_pillar = any(p in url for p in pillar_slugs)
        if is_pillar:
            has_pillar_link = True
        print(f"  Link: [{text}]({url}) - Pillar: {is_pillar}")
        
    if not has_pillar_link:
        print("  WARNING: No pillar article link found!")

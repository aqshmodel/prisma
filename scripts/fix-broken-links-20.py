import os

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

link_mapping = {
    "/articles/understanding-16types-under-stress": "/articles/stress-check-blind-spots-by-personality-type",
    "/articles/understanding-16types-in-relationships": "/articles/socionics-os-compatibility",
    "/articles/enneagram-engine": "/articles/enneagram-motivation-engine",
    "/articles/isfj-cannot-say-no": "/articles/isfj-cannot-say-no-at-work",
    "/articles/perfectionism-burnout": "/articles/perfectionism-burnout-by-personality-type"
}

print("Fixing broken links...")

for filename in articles:
    filepath = os.path.join(base_dir, filename)
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original = content
    for old_url, new_url in link_mapping.items():
        content = content.replace(f"({old_url})", f"({new_url})")
        content = content.replace(f'href="{old_url}"', f'href="{new_url}"')
        
    if original != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed links in: {filename}")

print("Done.")

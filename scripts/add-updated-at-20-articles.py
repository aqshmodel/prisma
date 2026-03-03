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

print("Adding updatedAt: '2026-03-03' to 20 articles...")

for filename in articles:
    filepath = os.path.join(base_dir, filename)
    if not os.path.exists(filepath):
        print(f"Not found: {filename}")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract frontmatter
    match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
    if match:
        frontmatter = match.group(1)
        
        # Check if updatedAt already exists
        if re.search(r'^updatedAt:', frontmatter, re.MULTILINE):
            # Replace existing updatedAt
            new_frontmatter = re.sub(r'(?m)^updatedAt:.*$', "updatedAt: '2026-03-03'", frontmatter)
            action = "Updated"
        else:
            # Append updatedAt to the end of frontmatter
            new_frontmatter = frontmatter + "\nupdatedAt: '2026-03-03'"
            action = "Added"
        
        new_content = content[:match.start(1)] + new_frontmatter + content[match.end(1):]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
            
        print(f"{action} in: {filename}")
    else:
        print(f"Frontmatter not found in {filename}")

print("Done.")

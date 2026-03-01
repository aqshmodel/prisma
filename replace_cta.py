import os
import re
import glob

content_dir = 'content/articles'
mdx_files = glob.glob(os.path.join(content_dir, '*.mdx'))

inline_link_pattern = re.compile(r'\[([^\]]+)\]\(/diagnosis/?\)')
# Pattern for lines that are just the CTA link, like "[▶ ...](/diagnosis/)"
block_link_pattern = re.compile(r'^\[▶?\s*([^\]]+)\]\(/diagnosis/?\)\s*$', re.MULTILINE)

changed_count = 0

for filepath in mdx_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # 1. Replace block-level links with the component
    content = block_link_pattern.sub(r'<DiagnosisCTA />', content)
    
    # 2. Replace any remaining inline links with just their text
    content = inline_link_pattern.sub(r'\1', content)
    
    # 3. Ensure <DiagnosisCTA /> is present at the bottom if it was not added by the block replacement
    # Some articles had NO block links, only inline links, so they need the button added at the end.
    if '<DiagnosisCTA' not in content:
        content = content.strip() + '\n\n<DiagnosisCTA />\n'
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        changed_count += 1

print(f"Updated {changed_count} files.")

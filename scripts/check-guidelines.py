import os
import glob
import re

def check_guidelines():
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
            
        lines = content.split('\n')
        
        issues = []
        has_cta = False
        has_disclaimer = False
        internal_links = 0
        
        for i, line in enumerate(lines):
            # 1. 見出しの文字数チェック (h2, h3 は13文字以内)
            h2_match = re.match(r'^##\s+(.+)$', line)
            h3_match = re.match(r'^###\s+(.+)$', line)
            
            if h2_match:
                heading = h2_match.group(1).strip()
                if len(heading) > 13:
                    issues.append(f"Line {i+1}: h2 too long ({len(heading)} chars) -> {heading}")
            elif h3_match:
                heading = h3_match.group(1).strip()
                if len(heading) > 13:
                    issues.append(f"Line {i+1}: h3 too long ({len(heading)} chars) -> {heading}")
                    
            # 2. 内部リンクのカウント (markdown link)
            if re.search(r'\[.+?\]\(/articles/.+?\)', line):
                internal_links += 1
                
            # 3. CTAと免責事項
            if "<DiagnosisCTA />" in line:
                has_cta = True
            if "※本記事は自己分析のフレームワークであり" in line:
                has_disclaimer = True
                
        # 4. Description length check (120-160 chars)
        desc_match = re.search(r"description:\s*'(.*?)'", content)
        if desc_match:
            desc = desc_match.group(1)
            if len(desc) < 120 or len(desc) > 160:
                issues.append(f"Meta: Description length is {len(desc)} chars (should be 120-160)")
                
        # 5. Frontmatter checklist
        required_fields = ['title:', 'description:', 'date:', 'coverImage:', 'author:', 'category:', 'tags:', 'slug:']
        for field in required_fields:
            if not re.search(f"^{field}", content, re.MULTILINE):
                issues.append(f"Meta: Missing frontmatter field '{field}'")
                
        if not has_cta:
            issues.append("Missing <DiagnosisCTA />")
        if not has_disclaimer:
            issues.append("Missing disclaimer text")
        if internal_links == 0:
            issues.append("No internal links found")
            
        if issues:
            print(f"\n--- Issues for {basename}.mdx ---")
            for issue in issues:
                print(f"  - {issue}")

if __name__ == "__main__":
    check_guidelines()

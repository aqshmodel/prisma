import os
import glob
import re

# AIの特徴的なパターンやNGワードのリスト
ai_patterns = [
    r"結論から言うと",
    r"まず〜について解説します",
    r"いかがでしたか？",
    r"〜と言えるでしょう",
    r"〜なのも事実です",
    r"したがって、",
    r"まとめると、",
    r"この記事では",
    r"〜を深く掘り下げ",
    r"〜について見ていきましょう",
    r"〜は重要です",
    r"〜することが不可欠です",
    r"〜を理解する鍵となります",
    # ガイドラインに抵触しやすい表現
    r"〜ですよね。",  # 過度な馴れ馴れしさ
]

def check_files():
    files = glob.glob("content/articles/*.mdx")
    # 今回作成した10記事に絞る
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
    
    found_issues = False
    
    for filepath in files:
        basename = os.path.basename(filepath).replace('.mdx', '')
        if basename not in target_slugs:
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        lines = content.split('\n')
        file_issues = []
        
        for i, line in enumerate(lines):
            # フロントマターは除外
            if i < 15 and line.startswith(('title:', 'description:', 'tags:', 'slug:')):
                continue
                
            for pattern in ai_patterns:
                if re.search(pattern, line):
                    file_issues.append((i + 1, pattern, line.strip()))
        
        # タイトル長チェック (SEOガイドライン: フック13文字 + メイン30-35)
        title_match = re.search(r"title:\s*'(.*?)'", content)
        if title_match:
            title = title_match.group(1)
            if len(title) > 48: # 13 + 35
                file_issues.append((0, "Title length > 48", title))
            if "──" not in title and "｜" not in title and "！" not in title:
                pass # フック構造の厳密チェックは目視でも行う
        
        if file_issues:
            found_issues = True
            print(f"\nIssues found in {basename}.mdx:")
            for issue in file_issues:
                line_idx, pattern, text = issue
                if line_idx == 0:
                    print(f"  [Meta]: {pattern} -> {text}")
                else:
                    print(f"  Line {line_idx} [{pattern}]: {text}")

    if not found_issues:
        print("No obvious AI patterns found in target files.")

if __name__ == "__main__":
    check_files()

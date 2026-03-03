import re
import os
import glob

# 記事の各descriptionに対して、文末を適切にカットして160文字以内に収める
files = glob.glob("content/articles/*.mdx")

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    def trim_desc(match):
        desc = match.group(1)
        if len(desc) > 160:
            # 「。」で分割して、160文字以下に収まる文までを採用する
            sentences = desc.split('。')
            new_desc = ""
            for s in sentences:
                if not s:
                    continue
                if len(new_desc) + len(s) + 1 <= 158:
                    new_desc += s + "。"
                else:
                    break
            
            # もし最初の1文すら160文字を超えていたら、強制カット（基本あり得ない）
            if not new_desc:
                new_desc = desc[:157] + "..."
                
            return f"description: '{new_desc}'"
        return match.group(0)
        
    new_content = re.sub(r"description:\s*'(.*?)'", trim_desc, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Description length adjusted.")

import os
import re

TARGET_DIR = 'content/articles'

# URLやファイルパスの中のosは置換しないようにする。
# 前後にアルファベットやハイフン、スラッシュがない大文字の「OS」だけを対象とする。
# (例: 「自分のOSが」-> Match, 「macOS」-> No Match, 「-os-」-> No Match)
pattern = re.compile(r'(?<![a-zA-Z\-\/])OS(?![a-zA-Z\-\/])')

def replace_isolated_os():
    count = 0
    for root, _, files in os.walk(TARGET_DIR):
        for file in files:
            if file.endswith('.mdx') or file.endswith('.md'):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                    
                    changed = False
                    for i, line in enumerate(lines):
                        # URLなど明らかな英字パスを含む行は、念のためより慎重に（または手動確認が必要だが、一旦正規表現でカバー）
                        new_line = pattern.sub('思考のクセ', line)
                        # ただし、「Mac OS X」のようなものは壊れる可能性があるが、ほぼ使われていないと仮定
                        # 念のため「Mac 思考のクセ X」になったら戻す
                        new_line = new_line.replace('Mac 思考のクセ X', 'Mac OS X')
                        
                        if line != new_line:
                            lines[i] = new_line
                            changed = True

                        # 「思考のクセ仕様」など不自然な結合を修正
                        lines[i] = lines[i].replace('思考のクセ仕様', '思考パターンの仕様')
                        lines[i] = lines[i].replace('思考のクセの相性', '思考パターンの相性')

                    if changed:
                        with open(path, 'w', encoding='utf-8') as f:
                            f.writelines(lines)
                        count += 1
                except Exception as e:
                    print(f"Error processing {path}: {e}")
                    
    print(f"Isolated OS replaced in {count} files.")

if __name__ == '__main__':
    replace_isolated_os()

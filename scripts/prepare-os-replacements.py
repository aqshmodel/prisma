import os
import re
import json

TARGET_DIRS = ['src', 'content', 'documents', 'scripts']
EXTENSIONS = ['.tsx', '.ts', '.js', '.md', '.mdx']

def get_replacement(text):
    # Rule based replacements for "脳のOS"
    
    # 1. 括弧付き
    text = text.replace('脳のOS（性格タイプ）', '性格タイプ')
    text = text.replace('脳のOS（情報処理パターン）', '思考のクセ（情報処理パターン）')
    text = text.replace('脳のOS（オペレーティングシステム）', '基本タイプ（情報処理のクセ）')
    text = text.replace('ソシオニクス（脳のOS）', 'ソシオニクス（認知パターン）')
    
    # 2. 組み合わせ
    text = text.replace('「脳のOS」と「心のエンジン」', '「思考のクセ」と「心のエンジン」')
    text = text.replace('脳のOSと心のエンジン', '思考のクセと心のエンジン')
    text = text.replace('（脳のOS）', '（思考のクセ）')
    
    # 3. 表現
    text = text.replace('脳のOSの仕様', '思考パターンの仕様')
    text = text.replace('脳のOSのバグ', '思考のバグ')
    text = text.replace('脳のOSレベル', '認知パターンレベル')
    text = text.replace('脳のOS──', '思考のクセ──')
    text = text.replace('脳のOS自体', '思考のクセ自体')
    
    # 4. 「脳のOS」そのまま
    text = text.replace('「情報処理タイプ（脳のOS）」', '「情報処理タイプ（認知パターン）」')
    text = text.replace('「脳のOS」', '「思考のクセ」')
    
    # 5. フォールバック
    text = text.replace('脳のOS', '思考のクセ')
    
    return text

results = []

for d in TARGET_DIRS:
    for root, _, files in os.walk(d):
        for file in files:
            if any(file.endswith(ext) for ext in EXTENSIONS):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                    
                    file_results = []
                    for i, line in enumerate(lines):
                        if '脳のOS' in line:
                            original = line.strip()
                            proposed = get_replacement(original)
                            file_results.append({
                                'line_idx': i,
                                'original': original,
                                'proposed': proposed
                            })
                    if file_results:
                        results.append({'file': path, 'matches': file_results})
                except Exception as e:
                    pass

with open('os_replacements_review.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"Found matches in {len(results)} files. Wrote review file.")

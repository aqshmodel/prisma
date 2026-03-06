import os

TARGET_DIRS = ['src', 'content', 'documents']
EXTENSIONS = ['.tsx', '.ts', '.js', '.md', '.mdx']

replacements = {
    '自分のOS': '自分の思考のクセ',
    '相手のOS': '相手の思考のクセ',
    '私のOS': '私の思考のクセ',
    'あなたのOS': 'あなたの思考のクセ',
    '個人のOS': '個人の思考のクセ',
    '二人のOS': '二人の思考のクセ',
    '全員のOS': '全員の思考のクセ',
    
    'OSの相性': '思考のクセの相性',
    'OSの仕様': '思考パターンの仕様',
    'OSの不一致': '思考のクセの不一致',
    'OSの違い': '思考のクセの違い',
    'OSの組み合わせ': '思考のクセの組み合わせ',
    '2つのOS': '2つの思考のクセ',
    'OS同士': '思考のクセ同士',
    
    '感覚型のOS': '感覚型の認知パターン',
    '直感型のOS': '直感型の認知パターン',
    '思考型のOS': '思考型の認知パターン',
    '感情型のOS': '感情型の認知パターン',
    '外向型のOS': '外向型の認知パターン',
    '内向型のOS': '内向型の認知パターン',
    '組織のOS': '組織の認知パターン',
    
    'OS（オペレーティングシステム）': '思考のクセ',
    'OSを変える必要はない': '基本的なタイプを変える必要はない',
    '（OSの相性）': '（思考のクセの相性）',
    '同じOS': '同じ思考のクセ',
}

def apply_edge_cases():
    count = 0
    for d in TARGET_DIRS:
        for root, _, files in os.walk(d):
            for file in files:
                if any(file.endswith(ext) for ext in EXTENSIONS):
                    path = os.path.join(root, file)
                    try:
                        with open(path, 'r', encoding='utf-8') as f:
                            content = f.read()
                        
                        original_content = content
                        for old, new in replacements.items():
                            content = content.replace(old, new)
                            
                        if original_content != content:
                            with open(path, 'w', encoding='utf-8') as f:
                                f.write(content)
                            count += 1
                    except Exception:
                        pass
    print(f"Edge cases replaced in {count} files.")

if __name__ == '__main__':
    apply_edge_cases()

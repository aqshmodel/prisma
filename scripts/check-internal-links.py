"""
内部リンク検証スクリプト（全記事対応版）
=========================================
用途:
  1. ピラー記事へのリンク有無を確認
  2. 相性ページリンク (/types/*/compatibility/*) のOSコード検証
  3. タイプ名を含む記事で相性リンクが無い場合にWARNING

実行: python scripts/check-internal-links.py
"""
import re
import os
import glob
import yaml

# --- 定数 ---
PILLAR_SLUGS = [
    "understanding-16types-for-career",
    "understanding-16types-in-relationships",
    "understanding-16types-under-stress",
    "understanding-enneagram"
]

VALID_OS_CODES = {
    'ENTp', 'ISFp', 'ESFj', 'INTj', 'ENFj', 'ISTj', 'ESTp', 'INFp',
    'ESFp', 'INTp', 'ENTj', 'ISFj', 'ESTj', 'INFj', 'ENFp', 'ISTp'
}

MBTI_TYPES = {
    'INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISTP', 'ESTJ', 'ESTP', 'ISFJ', 'ISFP', 'ESFJ', 'ESFP'
}

# 恋愛・対人関係系のカテゴリ/タグキーワード
COMPAT_RELEVANT_KEYWORDS = {'恋愛', '相性', '人間関係', 'パートナー', '夫婦', 'カップル'}


def parse_frontmatter(content: str) -> dict:
    """MDXファイルからフロントマターを抽出"""
    match = re.match(r'^---\s*\n(.*?)\n---', content, re.DOTALL)
    if not match:
        return {}
    try:
        return yaml.safe_load(match.group(1)) or {}
    except yaml.YAMLError:
        return {}


def contains_mbti_type(text: str) -> set:
    """テキスト内のMBTIタイプ名を抽出"""
    found = set()
    for t in MBTI_TYPES:
        if t in text.upper() or t in text:
            found.add(t)
    return found


def check_article(filepath: str) -> dict:
    """1記事の内部リンクを検証"""
    basename = os.path.basename(filepath).replace('.mdx', '').replace('.md', '')

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    fm = parse_frontmatter(content)
    title = fm.get('title', '')
    tags = fm.get('tags', [])
    category = fm.get('category', '')

    result = {
        'slug': basename,
        'title': title,
        'errors': [],
        'warnings': [],
        'info': [],
    }

    # --- 1. ピラー記事リンクの確認 ---
    article_links = re.findall(r'\[([^\]]+)\]\((/articles/[^)]+)\)', content)
    has_pillar = any(
        any(p in url for p in PILLAR_SLUGS)
        for _, url in article_links
    )
    if not has_pillar:
        result['warnings'].append('ピラー記事へのリンクがありません')

    # --- 2. 相性ページリンクの検証 ---
    compat_links = re.findall(r'/types/([^/]+)/compatibility/([^)"\s]+)', content)
    hub_links = re.findall(r'\(/compatibility\)', content)

    for source, target in compat_links:
        # OSコードの正規表現で厳密に抽出（末尾の記号を除去）
        source_clean = re.match(r'[A-Z][A-Z][A-Z][a-z]', source)
        target_clean = re.match(r'[A-Z][A-Z][A-Z][a-z]', target)

        if not source_clean or source_clean.group() not in VALID_OS_CODES:
            result['errors'].append(f'❌ 無効なOSコード（ソース）: {source}')
        if not target_clean or target_clean.group() not in VALID_OS_CODES:
            result['errors'].append(f'❌ 無効なOSコード（ターゲット）: {target}')

    has_compat_link = len(compat_links) > 0 or len(hub_links) > 0

    if has_compat_link:
        result['info'].append(f'相性リンク: {len(compat_links)}件（直リンク）+ {len(hub_links)}件（ハブ）')

    # --- 3. タイプ名を含む記事の相性リンク漏れ検出 ---
    title_types = contains_mbti_type(title)
    tag_text = ' '.join(tags) if isinstance(tags, list) else str(tags)
    tag_types = contains_mbti_type(tag_text)
    all_types = title_types | tag_types

    # カテゴリ/タグが恋愛・対人関係系かチェック
    is_compat_relevant = any(
        kw in category or kw in tag_text
        for kw in COMPAT_RELEVANT_KEYWORDS
    )

    should_have_compat = len(all_types) > 0 or is_compat_relevant

    if should_have_compat and not has_compat_link:
        type_info = ', '.join(sorted(all_types)) if all_types else '（恋愛/対人テーマ）'
        result['warnings'].append(
            f'⚠️  タイプ名 [{type_info}] を含むが相性ページリンクがありません'
        )

    return result


def main():
    files = sorted(glob.glob('content/articles/*.mdx') + glob.glob('content/articles/*.md'))

    if not files:
        print('❌ 記事ファイルが見つかりません。プロジェクトルートから実行してください。')
        return

    total_errors = 0
    total_warnings = 0
    articles_with_compat = 0
    articles_needing_compat = 0

    print(f'📋 内部リンク検証: {len(files)}記事をスキャン\n')
    print('=' * 60)

    for filepath in files:
        result = check_article(filepath)

        has_output = result['errors'] or result['warnings']

        if has_output:
            print(f"\n--- {result['slug']} ---")
            if result['title']:
                print(f"    {result['title'][:50]}...")

            for err in result['errors']:
                print(f'    {err}')
                total_errors += 1

            for warn in result['warnings']:
                print(f'    {warn}')
                total_warnings += 1

            for info in result['info']:
                print(f'    ✅ {info}')

        if result['info']:
            articles_with_compat += 1

        if any('相性ページリンクがありません' in w for w in result['warnings']):
            articles_needing_compat += 1

    print('\n' + '=' * 60)
    print(f'\n📊 サマリ:')
    print(f'   総記事数: {len(files)}')
    print(f'   相性リンクあり: {articles_with_compat}')
    print(f'   相性リンク推奨: {articles_needing_compat}')
    print(f'   エラー: {total_errors}')
    print(f'   警告: {total_warnings}')

    if total_errors > 0:
        print(f'\n❌ {total_errors}件のエラーがあります。修正してください。')
        exit(1)
    elif total_warnings > 0:
        print(f'\n⚠️  {total_warnings}件の警告があります。')
    else:
        print('\n✅ すべてのリンクが正常です。')


if __name__ == '__main__':
    main()

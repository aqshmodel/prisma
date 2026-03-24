import type { Plugin } from 'unified';
import type { Root, Element, Text } from 'hast';
import { getAllGlossaryEntries, type GlossaryMetadata } from '@/features/glossary/utils/glossary';

const EXCLUDED_TAGS = ['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre'];

function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 用語の境界違反（英単語の一部を誤検知するケース）を防ぐための判定
 */
function isWordBoundaryViolation(term: string, before: string | undefined, after: string | undefined): boolean {
    // 用語の先頭が英数字で、直前の文字も英数字なら単語の途中 (例: [Profile] で [Fi] が引かれた場合)
    if (/^[a-zA-Z0-9]/.test(term)) {
        if (before && /[a-zA-Z0-9]$/.test(before)) return true;
    }
    // 用語の最後が英数字で、直後の文字も英数字なら単語の途中 (例: [Team] で [Te] が引かれた場合)
    if (/[a-zA-Z0-9]$/.test(term)) {
        if (after && /^[a-zA-Z0-9]/.test(after)) return true;
    }
    return false;
}

/**
 * Text Nodeを走査して、用語集に合致するテキストを <a> タグに置換する処理
 * 正規表現によって一括で分割（split）することでパフォーマンスを改善。
 */
function processTextNode(
    textNode: Text,
    seenTerms: Set<string>,
    terms: GlossaryMetadata[],
    termPattern: RegExp | null
): (Text | Element)[] {
    if (!termPattern) return [textNode];

    const text = textNode.value;
    const parts: (Text | Element)[] = [];
    const tokens = text.split(termPattern);

    // split にキャプチャグループ（()）を含めると、
    // [ "テキスト", "マッチした文字列(用語)", "テキスト", ... ] という配列になる
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (!token) continue; // 空文字は無視

        // トークンが用語リストに存在するかどうかを確認
        const matchedTerm = terms.find(t => t.title === token);

        if (matchedTerm) {
            // 単語の途中を切っていないか（誤爆防止）のチェック
            const beforeText = tokens[i - 1];
            const afterText = tokens[i + 1];
            
            if (isWordBoundaryViolation(token, beforeText, afterText)) {
                // 境界違反の場合は、単なるテキストとして扱う
                parts.push({ type: 'text', value: token });
                continue;
            }

            // トークンが用語集に存在し、境界違反でもない場合
            if (seenTerms.has(matchedTerm.title)) {
                // すでにリンク化済みの用語であれば、単なるテキストとして追加
                parts.push({ type: 'text', value: token });
            } else {
                // 初回出現なら Set に記録し、リンク要素を作成
                seenTerms.add(matchedTerm.title);
                parts.push({
                    type: 'element',
                    tagName: 'a',
                    properties: {
                        href: `/glossary/${matchedTerm.slug}`,
                        title: `${matchedTerm.title}とは`,
                        className: ['glossary-link', 'text-prisma-600', 'font-medium', 'hover:text-prisma-700', 'hover:underline', 'transition-colors']
                    },
                    children: [{ type: 'text', value: token }]
                });
            }
        } else {
            // 単なるテキストの場合
            parts.push({ type: 'text', value: token });
        }
    }

    return parts;
}

/** ASTツリーを再帰的に走査し、テキストノードを置換する */
function walk(
    node: Element | Root,
    inExcludedTag: boolean,
    seenTerms: Set<string>,
    terms: GlossaryMetadata[],
    termPattern: RegExp | null
) {
    if (node.type === 'element' || node.type === 'root') {
        const isElement = node.type === 'element';
        const isExcluded = inExcludedTag || (isElement && EXCLUDED_TAGS.includes((node as Element).tagName));

        if (node.children && Array.isArray(node.children)) {
            for (let i = 0; i < node.children.length; i++) {
                const child = node.children[i];

                if (child.type === 'text' && !isExcluded) {
                    const newChildren = processTextNode(child as Text, seenTerms, terms, termPattern);
                    if (newChildren.length > 1 || newChildren[0] !== child) {
                        node.children.splice(i, 1, ...newChildren);
                        i += newChildren.length - 1;
                    }
                } else if (child.type === 'element') {
                    walk(child as Element, isExcluded, seenTerms, terms, termPattern);
                }
            }
        }
    }
}

/**
 * 用語自動リンク付与プラグイン (rehype)
 */
export const rehypeGlossaryLink: Plugin<[], Root> = () => {
    const glossaryEntries = getAllGlossaryEntries();
    // タイトルの文字数が長い順にソート (正規表現のORで最長一致させるため)
    const sortedTerms = [...glossaryEntries].sort((a, b) => b.title.length - a.title.length);
    
    // パフォーマンス改善：全用語をOR結合した単一の正規表現を生成
    // (A|B|C) の形にすることで split() 適用時に用語自体も配列に残る
    let termPattern: RegExp | null = null;
    if (sortedTerms.length > 0) {
        const patternString = sortedTerms.map(t => escapeRegExp(t.title)).join('|');
        termPattern = new RegExp(`(${patternString})`, 'g');
    }

    return (tree: Root) => {
        const seenTerms = new Set<string>();
        walk(tree, false, seenTerms, sortedTerms, termPattern);
    };
};

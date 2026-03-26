import React, { type ReactNode, type ReactElement } from 'react';
import Link from 'next/link';
import glossaryData from '../../../public/data/glossary-meta.json';

type GlossaryTerm = {
    slug: string;
    title: string;
};

// 正規表現エスケープ処理
function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 用語の境界違反（英単語の一部を誤検知するケース）を防ぐための判定
 */
function isWordBoundaryViolation(term: string, before: string | undefined, after: string | undefined): boolean {
    if (/^[a-zA-Z0-9]/.test(term)) {
        if (before && /[a-zA-Z0-9]$/.test(before)) return true;
    }
    if (/[a-zA-Z0-9]$/.test(term)) {
        if (after && /^[a-zA-Z0-9]/.test(after)) return true;
    }
    return false;
}

/**
 * ReactNode 内のテキストから用語集のキーワードを <a>（next/link）に置換する。
 *
 * @param nodes 置換対象の ReactNode (string 含む)
 * @param seenTerms 既に置換された用語を管理する Set (同一テキストブロック内での重複リンクを防ぐ)
 */
export const parseGlossaryLinks = (
    nodes: ReactNode | ReactNode[],
    seenTerms: Set<string>
): ReactNode | ReactNode[] => {
    const terms = glossaryData as GlossaryTerm[];
    if (!terms || terms.length === 0) return nodes;

    // パフォーマンス改善: 全用語の一括正規表現 (ソート済みである前提)
    const patternString = terms.map(t => escapeRegExp(t.title)).join('|');
    const termPattern = new RegExp(`(${patternString})`, 'g');

    // Reactのレンダリングにおいて Math.random() の代替となる決定的な連番ID
    const keyCounter = { current: 0 };

    const parseString = (text: string): ReactNode[] => {
        const tokens = text.split(termPattern);
        const parts: ReactNode[] = [];

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (!token) continue; // 空文字はスキップ

            const matchedTerm = terms.find(t => t.title === token);

            if (matchedTerm) {
                // 単語の途中を切っていないか（誤爆防止）のチェック
                const beforeText = tokens[i - 1];
                const afterText = tokens[i + 1];

                if (isWordBoundaryViolation(token, beforeText, afterText)) {
                    // 境界違反（Team の Te等）の場合は通常のテキストとして出力
                    parts.push(token);
                    continue;
                }

                if (seenTerms.has(matchedTerm.title)) {
                    // すでに処理済みの用語はテキストとして出力
                    parts.push(token);
                } else {
                    seenTerms.add(matchedTerm.title);
                    keyCounter.current += 1;
                    parts.push(
                        <Link
                            key={`glossary-${matchedTerm.slug}-${keyCounter.current}`}
                            href={`/glossary/${matchedTerm.slug}/`}
                            title={`${matchedTerm.title}とは`}
                            className="text-prisma-600 font-medium hover:text-prisma-700 hover:underline transition-colors glossary-link whitespace-nowrap"
                        >
                            {token}
                        </Link>
                    );
                }
            } else {
                parts.push(token);
            }
        }
        return parts;
    };

    const traverse = (node: ReactNode): ReactNode | ReactNode[] => {
        if (typeof node === 'string') {
            const parsed = parseString(node);
            return parsed.length === 1 && typeof parsed[0] === 'string' ? node : parsed;
        }

        if (React.isValidElement(node)) {
            // すでにリンクタグの場合は内包テキストを置換しない（ネスト防止）
            if (node.type === 'a' || node.type === Link) {
                return node;
            }
            const element = node as ReactElement<any>;
            if (element.props && element.props.children) {
                const newChildren = Array.isArray(element.props.children)
                    ? element.props.children.flatMap(traverse)
                    : traverse(element.props.children);
                return React.cloneElement(element, { ...element.props }, ...newChildren);
            }
        }

        if (Array.isArray(node)) {
            return node.flatMap(traverse);
        }

        return node;
    };

    return Array.isArray(nodes) ? nodes.flatMap(traverse) : traverse(nodes);
};

import React, { useMemo } from 'react';
import { parseBoldText } from '@/lib/utils/parse-bold-text';
import { parseGlossaryLinks } from '@/lib/utils/parse-glossary-links';

interface FormattedTextProps {
    text: string;
    className?: string;
    /** 用語集リンクの自動付与を無効化するかどうか。デフォルトは false (付与する) */
    disableGlossary?: boolean;
}

/**
 * テキスト内の **太字** 記法をReact要素としてレンダリングし、
 * さらに用語集(glossary)に登録された専門用語を自動でリンク置換するコンポーネント。
 */
export const FormattedText: React.FC<FormattedTextProps> = ({ text, className, disableGlossary = false }) => {
    const renderedContent = useMemo(() => {
        if (!text) return null;

        // 1. まず太字 (**文**) を span に置換する
        const boldParsed = parseBoldText(text);

        // 2. 次に用語集の自動リンク付与を行う（無効化されていなければ）
        if (disableGlossary) {
            return boldParsed;
        }

        // ブロック(コンポーネント)単位で出現用語の重複管理を行う Set
        const seenTerms = new Set<string>();
        return parseGlossaryLinks(boldParsed, seenTerms);
    }, [text, disableGlossary]);

    if (!text) return null;

    return (
        <span className={className}>
            {renderedContent}
        </span>
    );
};

import React from 'react';

/**
 * Markdownの **太字** 記法をReact要素に変換するユーティリティ。
 *
 * 以下の3箇所で重複していたロジックを共通化:
 * - FormattedText コンポーネント
 * - AboutSocionicsPage の parseBoldText
 * - AboutEnneagramPage の parseBoldText
 *
 * 【セキュリティ】
 * dangerouslySetInnerHTML は使用せず、Reactの標準レンダリングで処理。
 * 入力テキストは自動的にエスケープされるため、XSSリスクは低い。
 */
export const parseBoldText = (text: string | undefined | null): React.ReactNode => {
    if (!text) return null;

    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
            return (
                <span
                    key={`bold-${index}`}
                    className="bg-prisma-100 text-prisma-900 px-1.5 py-0.5 rounded font-bold mx-0.5"
                >
                    {part.slice(2, -2)}
                </span>
            );
        }
        return <React.Fragment key={`frag-${index}`}>{part}</React.Fragment>;
    });
};

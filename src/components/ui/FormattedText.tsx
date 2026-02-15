import React from 'react';

interface FormattedTextProps {
    text: string;
    className?: string;
}

/**
 * テキスト内の **太字** 記法をプログラムで解析し、
 * JSXの <strong> タグとしてレンダリングするコンポーネント。
 *
 * 【セキュリティ上の注意】
 * このコンポーネントは `dangerouslySetInnerHTML` を使用せず、
 * Reactの標準的なレンダリング機構を使用しているため、XSSのリスクは低いです。
 * 入力テキストはエスケープされて表示されます。
 */
export const FormattedText: React.FC<FormattedTextProps> = ({ text, className }) => {
    if (!text) return null;

    // **テキスト** 形式を分割して処理
    // Note: 括弧 () で囲むことで、区切り文字自体も配列に含まれるようにしています
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return (
        <span className={className}>
            {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
                    return (
                        <strong key={index} className="font-bold text-slate-900 bg-prisma-100/50 px-1 rounded mx-0.5">
                            {part.slice(2, -2)}
                        </strong>
                    );
                }
                return <React.Fragment key={index}>{part}</React.Fragment>;
            })}
        </span>
    );
};

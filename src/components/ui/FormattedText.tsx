import React from 'react';
import { parseBoldText } from '@/lib/utils/parse-bold-text';

interface FormattedTextProps {
    text: string;
    className?: string;
}

/**
 * テキスト内の **太字** 記法をReact要素としてレンダリングするコンポーネント。
 * 内部で共通ユーティリティ parseBoldText を使用。
 *
 * 【セキュリティ上の注意】
 * dangerouslySetInnerHTML を使用せず、Reactの標準レンダリングで処理。
 */
export const FormattedText: React.FC<FormattedTextProps> = ({ text, className }) => {
    if (!text) return null;

    return (
        <span className={className}>
            {parseBoldText(text)}
        </span>
    );
};

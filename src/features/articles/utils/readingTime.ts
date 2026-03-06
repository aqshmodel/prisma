/**
 * MDX本文から読了時間（分）を算出する。
 * 日本語: 約500文字/分を基準とする。
 */
export const getReadingTime = (content: string): number => {
    // MDX記法・HTML・空白を除去し、純粋なテキスト文字数を算出
    const textOnly = content
        .replace(/<[^>]+>/g, '')            // HTMLタグ
        .replace(/```[\s\S]*?```/g, '')     // コードブロック
        .replace(/`[^`]+`/g, '')            // インラインコード
        .replace(/!\[.*?\]\(.*?\)/g, '')    // 画像
        .replace(/\[([^\]]+)\]\(.*?\)/g, '$1') // リンク（テキストは残す）
        .replace(/[#*\-\[\]()>!`{}<>/=|_~]/g, '')  // Markdown記号
        .replace(/\s+/g, '');               // 空白

    return Math.max(1, Math.ceil(textOnly.length / 500));
};

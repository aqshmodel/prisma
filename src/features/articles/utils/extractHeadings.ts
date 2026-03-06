export interface Heading {
    id: string;
    text: string;
}

/**
 * MDX本文からh2見出しを抽出し、idとtextのペアを返す。
 * idはテキストをそのままslugifyして生成。
 */
export const extractHeadings = (content: string): Heading[] => {
    const headingRegex = /^## (.+)$/gm;
    const headings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const text = match[1]
            .replace(/[*_`]/g, '')  // Markdown装飾を除去
            .trim();

        // 日本語対応のslugify: 記号除去→スペースをハイフンに
        const id = text
            .toLowerCase()
            .replace(/[、。・：（）「」『』【】？！〜]/g, '')
            .replace(/\s+/g, '-')
            .replace(/^-+|-+$/g, '');

        headings.push({ id, text });
    }

    return headings;
};

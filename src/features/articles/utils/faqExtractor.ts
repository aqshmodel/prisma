interface FaqItem {
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
        '@type': 'Answer';
        text: string;
    };
}

/**
 * MDX本文から疑問形の見出し（h2/h3）とその直後の段落を抽出し、
 * FAQPage JSON-LDオブジェクトを生成する。
 * 疑問形見出しが2つ未満の場合はnullを返す。
 */
export const extractFaqJsonLd = (content: string): object | null => {
    // 疑問形パターン
    const questionPatterns = [
        /[？?]$/,       // 末尾が？
        /とは$/,        // 〜とは
        /の違い/,       // 〜の違い
        /なぜ/,         // なぜ〜
        /どう/,         // どう〜
        /のか$/,        // 〜のか
    ];

    const lines = content.split('\n');
    const faqs: FaqItem[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // h2またはh3の見出しかチェック
        const headingMatch = line.match(/^#{2,3}\s+(.+)$/);
        if (!headingMatch) continue;

        const headingText = headingMatch[1].replace(/[*_`]/g, '').trim();

        // 疑問形パターンにマッチするかチェック
        const isQuestion = questionPatterns.some(pattern => pattern.test(headingText));
        if (!isQuestion) continue;

        // 直後の段落テキストを収集（次のh2/h3まで）
        const answerLines: string[] = [];
        for (let j = i + 1; j < lines.length; j++) {
            const nextLine = lines[j].trim();
            // 次の見出しに到達したら停止
            if (/^#{2,3}\s/.test(nextLine)) break;
            // 空行、MDXコンポーネント、画像等をスキップ
            if (nextLine === '' || nextLine.startsWith('<') || nextLine.startsWith('!') || nextLine.startsWith('```')) continue;
            // 引用ブロックのテキストは取り込む
            const cleanLine = nextLine.replace(/^>\s*/, '').replace(/[*_`]/g, '');
            if (cleanLine.length > 0) {
                answerLines.push(cleanLine);
            }
            // 最大3段落で区切る
            if (answerLines.length >= 3) break;
        }

        if (answerLines.length > 0) {
            faqs.push({
                '@type': 'Question',
                name: headingText,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: answerLines.join(' '),
                },
            });
        }
    }

    // 2問未満なら出力しない
    if (faqs.length < 2) return null;

    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs,
    };
};

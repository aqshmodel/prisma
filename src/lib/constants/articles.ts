/**
 * 記事一覧ページのページネーション定数
 *
 * articles/page.tsx と articles/page/[page]/page.tsx の両方で共有。
 * 値を変更すると、1ページあたりの記事表示数が全ページで統一的に反映される。
 */
export const ARTICLES_PER_PAGE = 10;

/**
 * 記事カテゴリの一覧
 *
 * フィルタUIやバリデーションなど、カテゴリを参照するすべての箇所で共有。
 */
export const ARTICLE_CATEGORIES = [
    'すべて',
    '働き方・キャリア',
    '恋愛・人間関係',
    'メンタルヘルス',
    '自己分析・診断',
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

/**
 * MBTI表記のタイプコードで記事をフィルタリングする。
 * タイトル、タグ、slug のいずれかにタイプ名が含まれていればマッチ。
 *
 * ジェネリック化により ArticleMetadata（Server）と ArticleMeta（Client/JSON）の
 * 両方の型で利用可能。
 */
export const filterArticlesByType = <T extends { title: string; tags: string[]; slug: string }>(
    articles: T[],
    mbtiCode: string
): T[] => {
    const upper = mbtiCode.toUpperCase();
    const lower = mbtiCode.toLowerCase();

    return articles.filter(article => {
        const titleMatch = article.title.toUpperCase().includes(upper);
        const tagMatch = article.tags.some(tag => tag.toUpperCase().includes(upper));
        const slugMatch = article.slug.toLowerCase().includes(lower);
        return titleMatch || tagMatch || slugMatch;
    });
};

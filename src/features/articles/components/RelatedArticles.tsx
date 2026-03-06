import React from 'react';
import { getAllArticles, type ArticleMetadata } from '../utils/mdx';
import { ArticleCardSmall } from './ArticleCard';

interface RelatedArticlesProps {
    currentSlug: string;
    category: string;
    tags: string[];
}

/**
 * 同カテゴリ×タグ重複数でスコアリングし、関連度の高い記事を最大4件表示。
 * スコア: カテゴリ一致=2点 + タグ重複1件ごとに1点
 */
const getRelatedArticles = (
    currentSlug: string,
    category: string,
    tags: string[],
    maxCount = 4
): ArticleMetadata[] => {
    const allArticles = getAllArticles();
    const currentTags = new Set(tags.map(t => t.toLowerCase()));

    const scored = allArticles
        .filter(a => a.slug !== currentSlug)
        .map(article => {
            let score = 0;
            if (article.category === category) score += 2;
            article.tags.forEach(tag => {
                if (currentTags.has(tag.toLowerCase())) score += 1;
            });
            return { article, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score);

    return scored.slice(0, maxCount).map(({ article }) => article);
};

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({
    currentSlug,
    category,
    tags,
}) => {
    const articles = getRelatedArticles(currentSlug, category, tags);

    if (articles.length === 0) return null;

    return (
        <div className="not-prose mt-16 md:mt-20 pt-8 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6">
                あわせて読みたい
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {articles.map(article => (
                    <ArticleCardSmall
                        key={article.slug}
                        slug={article.slug}
                        title={article.title}
                        coverImage={article.coverImage}
                        category={article.category}
                        className="bg-slate-50 hover:bg-prisma-50/30"
                    />
                ))}
            </div>
        </div>
    );
};

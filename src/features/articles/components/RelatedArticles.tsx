import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles, type ArticleMetadata } from '../utils/mdx';

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
                    <Link
                        key={article.slug}
                        href={`/articles/${article.slug}`}
                        className="group flex gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100 hover:border-prisma-200 hover:bg-prisma-50/30 transition-all duration-200"
                    >
                        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-200 relative">
                            {article.coverImage ? (
                                <Image
                                    src={article.coverImage}
                                    alt={article.title}
                                    fill
                                    sizes="80px"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-prisma-500/20 to-indigo-500/20" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="text-[10px] text-prisma-600 font-medium bg-prisma-50 px-1.5 py-0.5 rounded">
                                {article.category}
                            </span>
                            <h4 className="text-sm font-bold text-slate-800 mt-1 leading-snug line-clamp-2 group-hover:text-prisma-600 transition-colors">
                                {article.title}
                            </h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

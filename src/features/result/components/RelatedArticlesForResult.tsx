'use client';

import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { OS_TO_MBTI } from '@/lib/constants/type-mapping';
import { filterArticlesByType } from '@/lib/utils/article-filter';
import { ArticleCardSmall } from '@/features/articles/components/ArticleCard';

interface ArticleMeta {
    slug: string;
    title: string;
    description: string;
    coverImage: string;
    category: string;
    tags: string[];
}

interface RelatedArticlesForResultProps {
    typeCode: string;
}

export const RelatedArticlesForResult: React.FC<RelatedArticlesForResultProps> = ({ typeCode }) => {
    const [articles, setArticles] = useState<ArticleMeta[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAndFilter = async () => {
            try {
                const res = await fetch('/data/articles-meta.json');
                const allArticles: ArticleMeta[] = await res.json();

                const mbtiCode = OS_TO_MBTI[typeCode] || typeCode;
                const matched = filterArticlesByType(allArticles, mbtiCode);

                // マッチ4件、なければ最新4件
                setArticles(matched.length > 0 ? matched.slice(0, 4) : allArticles.slice(0, 4));
            } catch {
                console.error('Failed to load articles metadata');
            } finally {
                setLoading(false);
            }
        };

        fetchAndFilter();
    }, [typeCode]);

    if (loading) {
        return (
            <div className="mt-12 flex justify-center">
                <div className="w-6 h-6 border-2 border-prisma-200 border-t-prisma-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (articles.length === 0) return null;

    return (
        <div className="mt-12 pt-8 border-t border-slate-200/50">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-6">
                <BookOpen size={18} className="text-prisma-500" />
                あなたのタイプに関する記事
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {articles.map(article => (
                    <ArticleCardSmall
                        key={article.slug}
                        slug={article.slug}
                        title={article.title}
                        coverImage={article.coverImage}
                        category={article.category}
                        className="bg-white/80 hover:bg-white backdrop-blur-sm"
                    />
                ))}
            </div>
        </div>
    );
};

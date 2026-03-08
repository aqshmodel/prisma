'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { ArticleCardLarge } from './ArticleCard';
import type { ArticleMetadata } from '@/features/articles/utils/mdx';

const CATEGORIES = ['すべて', '働き方・キャリア', '恋愛・人間関係', 'メンタルヘルス', '自己分析・診断'] as const;

interface ArticleFilterProps {
    articles: ArticleMetadata[];
    /** フィルタ未使用時に表示するデフォルトコンテンツ（ページネーション付き一覧） */
    children: React.ReactNode;
}

export const ArticleFilter: React.FC<ArticleFilterProps> = ({ articles, children }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('すべて');
    const [searchQuery, setSearchQuery] = useState('');

    const isFiltering = selectedCategory !== 'すべて' || searchQuery.length > 0;

    const filteredArticles = useMemo(() => {
        if (!isFiltering) return [];

        return articles.filter(article => {
            // カテゴリフィルタ
            if (selectedCategory !== 'すべて' && article.category !== selectedCategory) {
                return false;
            }

            // キーワード検索
            if (searchQuery.length > 0) {
                const query = searchQuery.toLowerCase();
                const matchTitle = article.title.toLowerCase().includes(query);
                const matchDesc = article.description.toLowerCase().includes(query);
                const matchTags = article.tags.some(tag => tag.toLowerCase().includes(query));
                if (!matchTitle && !matchDesc && !matchTags) {
                    return false;
                }
            }

            return true;
        });
    }, [articles, selectedCategory, searchQuery, isFiltering]);

    return (
        <>
            {/* Filter UI */}
            <div className="mb-8">
                {/* Search */}
                <div className="relative mb-6">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="キーワードで検索（例: INFp、仕事、恋愛）"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-prisma-300 focus:border-prisma-300 transition-all"
                    />
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === category
                                ? 'bg-prisma-500 text-white shadow-sm'
                                : 'bg-white text-slate-600 border border-slate-200 hover:border-prisma-300 hover:text-prisma-600'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Result Count */}
                {isFiltering && (
                    <p className="mt-4 text-sm text-slate-500">
                        {filteredArticles.length}件の記事が見つかりました
                        <button
                            onClick={() => { setSelectedCategory('すべて'); setSearchQuery(''); }}
                            className="ml-3 text-prisma-600 hover:text-prisma-700 font-medium"
                        >
                            フィルタを解除
                        </button>
                    </p>
                )}
            </div>

            {/* Content: フィルタON時は結果表示、OFF時はchildren（ページネーション付き一覧）を表示 */}
            {isFiltering ? (
                filteredArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pb-16">
                        {filteredArticles.map((article) => (
                            <ArticleCardLarge
                                key={article.slug}
                                slug={article.slug}
                                title={article.title}
                                description={article.description}
                                coverImage={article.coverImage}
                                category={article.category}
                                date={article.date}
                                updatedAt={article.updatedAt}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-slate-500 py-16 px-4">
                        <p className="text-lg font-medium mb-2">該当する記事が見つかりませんでした</p>
                        <p className="text-sm">キーワードを変更するか、フィルタを解除してください。</p>
                    </div>
                )
            ) : (
                children
            )}
        </>
    );
};

'use client';

import React, { useState, useMemo } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { ArticleCardLarge } from './ArticleCard';
import { usePagefindSearch } from '@/features/articles/hooks/usePagefindSearch';
import { ARTICLE_CATEGORIES, type ArticleCategory } from '@/lib/constants/articles';
import type { ArticleMetadata } from '@/features/articles/utils/mdx';

interface ArticleFilterProps {
    articles: ArticleMetadata[];
    /** フィルタ未使用時に表示するデフォルトコンテンツ（ページネーション付き一覧） */
    children: React.ReactNode;
}

/**
 * 記事一覧ページのフィルタ・検索コンポーネント
 *
 * 検索ロジックは usePagefindSearch フックに委譲し、
 * 本コンポーネントはUI描画とカテゴリフィルタのみを担当する。
 */
export const ArticleFilter: React.FC<ArticleFilterProps> = ({ articles, children }) => {
    const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>('すべて');

    const {
        searchQuery,
        handleSearchChange,
        isSearching,
        pagefindAvailable,
        searchResults,
    } = usePagefindSearch(articles);

    // カテゴリだけのフィルタかどうか
    const isCategoryOnly = selectedCategory !== 'すべて' && searchQuery.length === 0;
    const isFiltering = selectedCategory !== 'すべて' || searchQuery.length > 0;

    // 最終的な表示記事リスト
    const displayedArticles = useMemo(() => {
        // 検索クエリがある場合
        if (searchQuery.length > 0) {
            // カテゴリフィルタも適用
            if (selectedCategory !== 'すべて') {
                return searchResults.filter(a => a.category === selectedCategory);
            }
            return searchResults;
        }

        // カテゴリのみのフィルタ
        if (isCategoryOnly) {
            return articles.filter(a => a.category === selectedCategory);
        }

        return [];
    }, [searchQuery, searchResults, selectedCategory, isCategoryOnly, articles]);

    return (
        <>
            {/* Filter UI */}
            <div className="mb-8">
                {/* Search */}
                <div className="relative mb-6">
                    {isSearching ? (
                        <Loader2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-prisma-400 animate-spin" />
                    ) : (
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    )}
                    <input
                        type="text"
                        placeholder="キーワードで全文検索（例: 恋愛、神経系、独身税）"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-prisma-300 focus:border-prisma-300 transition-all"
                    />
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2">
                    {ARTICLE_CATEGORIES.map(category => (
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
                {isFiltering && !isSearching && (
                    <p className="mt-4 text-sm text-slate-500">
                        {displayedArticles.length}件の記事が見つかりました
                        {pagefindAvailable && searchQuery.length > 0 && (
                            <span className="ml-2 text-xs text-slate-400">（全文検索）</span>
                        )}
                        <button
                            onClick={() => { setSelectedCategory('すべて'); handleSearchChange(''); }}
                            className="ml-3 text-prisma-600 hover:text-prisma-700 font-medium"
                        >
                            フィルタを解除
                        </button>
                    </p>
                )}
            </div>

            {/* Content: フィルタON時は結果表示、OFF時はchildren（ページネーション付き一覧）を表示 */}
            {isFiltering ? (
                isSearching ? (
                    <div className="text-center text-slate-400 py-16">
                        <Loader2 size={32} className="mx-auto animate-spin mb-4" />
                        <p className="text-sm">検索中...</p>
                    </div>
                ) : displayedArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pb-16">
                        {displayedArticles.map((article) => (
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

'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { ArticleCardLarge } from './ArticleCard';
import type { ArticleMetadata } from '@/features/articles/utils/mdx';

const CATEGORIES = ['すべて', '働き方・キャリア', '恋愛・人間関係', 'メンタルヘルス', '自己分析・診断'] as const;

// Pagefind の型定義
interface PagefindResult {
    id: string;
    url: string;
    excerpt: string;
    meta: { title?: string };
    data: () => Promise<PagefindResultData>;
}
interface PagefindResultData {
    url: string;
    excerpt: string;
    meta: { title?: string };
}
interface PagefindInstance {
    search: (query: string) => Promise<{ results: PagefindResult[] }>;
    init: () => Promise<void>;
}

interface ArticleFilterProps {
    articles: ArticleMetadata[];
    /** フィルタ未使用時に表示するデフォルトコンテンツ（ページネーション付き一覧） */
    children: React.ReactNode;
}

/**
 * 記事一覧ページのフィルタ・検索コンポーネント
 *
 * 本番環境（ビルド後）: Pagefind API で全文検索
 * 開発環境（next dev）: メタデータの includes() フォールバック
 */
export const ArticleFilter: React.FC<ArticleFilterProps> = ({ articles, children }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('すべて');
    const [searchQuery, setSearchQuery] = useState('');
    const [pagefindResults, setPagefindResults] = useState<ArticleMetadata[] | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [pagefindAvailable, setPagefindAvailable] = useState<boolean | null>(null);

    const pagefindRef = useRef<PagefindInstance | null>(null);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Pagefind の初期化（マウント時に1回だけ）
    useEffect(() => {
        const initPagefind = async () => {
            try {
                // @ts-expect-error Pagefind は静的ファイルとして提供されるため型定義が存在しない
                const pf = await import(/* webpackIgnore: true */ '/pagefind/pagefind.js');
                pagefindRef.current = pf;
                setPagefindAvailable(true);
            } catch {
                // 開発環境など、Pagefindが存在しない場合はフォールバック
                setPagefindAvailable(false);
            }
        };
        initPagefind();
    }, []);

    // カテゴリだけのフィルタかどうか
    const isCategoryOnly = selectedCategory !== 'すべて' && searchQuery.length === 0;
    const isFiltering = selectedCategory !== 'すべて' || searchQuery.length > 0;

    // Pagefind 検索の実行
    const executePagefindSearch = useCallback(async (query: string) => {
        if (!pagefindRef.current || query.length === 0) {
            setPagefindResults(null);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        try {
            const search = await pagefindRef.current.search(query);
            // 各resultのdata()を非同期で解決してURLを取得
            const resolvedResults = await Promise.all(
                search.results.slice(0, 30).map((result: PagefindResult) => result.data())
            );
            // URLからslugを抽出し、articles配列とマッチング（関連度順を保持）
            const orderedResults: ArticleMetadata[] = [];
            for (const data of resolvedResults) {
                // URLの形式: /articles/{slug}/ → slugを抽出
                const urlMatch = data.url.match(/\/articles\/([^/]+)/);
                if (urlMatch) {
                    const article = articles.find(a => a.slug === urlMatch[1]);
                    if (article && !orderedResults.includes(article)) {
                        orderedResults.push(article);
                    }
                }
            }
            setPagefindResults(orderedResults);
        } catch {
            // Pagefind検索失敗時はフォールバック
            setPagefindResults(null);
        } finally {
            setIsSearching(false);
        }
    }, [articles]);

    // デバウンス付き検索
    const handleSearchChange = useCallback((value: string) => {
        setSearchQuery(value);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        if (value.length === 0) {
            setPagefindResults(null);
            setIsSearching(false);
            return;
        }

        if (pagefindAvailable) {
            setIsSearching(true);
            debounceTimer.current = setTimeout(() => {
                executePagefindSearch(value);
            }, 300);
        }
    }, [pagefindAvailable, executePagefindSearch]);

    // フォールバック検索（includes ベース、開発環境用）
    const fallbackResults = useMemo(() => {
        if (pagefindAvailable || searchQuery.length === 0) return [];

        const queries = searchQuery.toLowerCase().split(/\s+/).filter(q => q.length > 0);

        return articles.filter(article => {
            return queries.every(query => {
                const matchTitle = article.title.toLowerCase().includes(query);
                const matchDesc = article.description.toLowerCase().includes(query);
                const matchTags = article.tags.some(tag => tag.toLowerCase().includes(query));
                return matchTitle || matchDesc || matchTags;
            });
        });
    }, [articles, searchQuery, pagefindAvailable]);

    // 最終的な表示記事リスト
    const displayedArticles = useMemo(() => {
        // 検索クエリがある場合
        if (searchQuery.length > 0) {
            const baseResults = pagefindAvailable ? (pagefindResults || []) : fallbackResults;
            // カテゴリフィルタも適用
            if (selectedCategory !== 'すべて') {
                return baseResults.filter(a => a.category === selectedCategory);
            }
            return baseResults;
        }

        // カテゴリのみのフィルタ
        if (isCategoryOnly) {
            return articles.filter(a => a.category === selectedCategory);
        }

        return [];
    }, [searchQuery, pagefindAvailable, pagefindResults, fallbackResults, selectedCategory, isCategoryOnly, articles]);

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

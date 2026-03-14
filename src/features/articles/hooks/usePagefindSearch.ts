'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import type { PagefindInstance, PagefindResult } from '@/types/pagefind';
import type { ArticleMetadata } from '@/features/articles/utils/mdx';

interface UsePagefindSearchReturn {
    searchQuery: string;
    handleSearchChange: (value: string) => void;
    isSearching: boolean;
    pagefindAvailable: boolean | null;
    /** Pagefind（本番）またはフォールバック（開発）の検索結果 */
    searchResults: ArticleMetadata[];
}

/**
 * Pagefind 全文検索のロジックを管理するカスタムフック
 *
 * - 本番環境（ビルド後）: Pagefind API で全文検索
 * - 開発環境（next dev）: メタデータの includes() フォールバック
 * - デバウンス（300ms）付き
 * - アンマウント時にタイマーを自動クリーンアップ
 */
export function usePagefindSearch(articles: ArticleMetadata[]): UsePagefindSearchReturn {
    const [searchQuery, setSearchQuery] = useState('');
    const [pagefindResults, setPagefindResults] = useState<ArticleMetadata[] | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [pagefindAvailable, setPagefindAvailable] = useState<boolean | null>(null);

    const pagefindRef = useRef<PagefindInstance | null>(null);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ─── Pagefind 初期化（マウント時に1回） ───
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

    // ─── アンマウント時にデバウンスタイマーをクリア ───
    useEffect(() => {
        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, []);

    // ─── Pagefind 検索の実行 ───
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

    // ─── デバウンス付き検索ハンドラ ───
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

    // ─── フォールバック検索（includes ベース、開発環境用） ───
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

    // ─── 統合された検索結果 ───
    const searchResults = useMemo(() => {
        if (searchQuery.length === 0) return [];
        return pagefindAvailable ? (pagefindResults || []) : fallbackResults;
    }, [searchQuery, pagefindAvailable, pagefindResults, fallbackResults]);

    return {
        searchQuery,
        handleSearchChange,
        isSearching,
        pagefindAvailable,
        searchResults,
    };
}

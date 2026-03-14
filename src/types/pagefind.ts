/**
 * Pagefind 全文検索エンジンの型定義
 *
 * Pagefind はビルド後に静的ファイルとして提供されるため、
 * 公式の型定義パッケージが存在しない。ここで独自に定義する。
 */

/** Pagefind 検索結果の個別アイテム（未解決） */
export interface PagefindResult {
    id: string;
    url: string;
    excerpt: string;
    meta: { title?: string };
    /** 詳細データを非同期で取得する */
    data: () => Promise<PagefindResultData>;
}

/** Pagefind 検索結果の解決済みデータ */
export interface PagefindResultData {
    url: string;
    excerpt: string;
    meta: { title?: string };
}

/** Pagefind API インスタンス */
export interface PagefindInstance {
    search: (query: string) => Promise<{ results: PagefindResult[] }>;
    init: () => Promise<void>;
}

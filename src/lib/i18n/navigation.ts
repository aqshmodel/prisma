'use client';

import { useLocale } from './context';

/**
 * ロケール対応のパスを生成するフック
 *
 * @example
 * const localePath = useLocalePath();
 * router.push(localePath('/result'));
 * // ja → '/result'
 * // en → '/en/result'
 */
export function useLocalePath() {
    const locale = useLocale();

    return (path: string): string => {
        if (locale === 'ja') return path;
        // 英語は /en プレフィックスを付与
        return `/en${path}`;
    };
}

/**
 * 非フック版: Server Component や静的コンテキストで使用
 */
export function getLocalePath(locale: 'ja' | 'en', path: string): string {
    if (locale === 'ja') return path;
    return `/en${path}`;
}

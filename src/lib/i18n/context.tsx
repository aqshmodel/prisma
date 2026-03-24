'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { type Locale, DEFAULT_LOCALE } from './types';

/**
 * ロケールコンテキスト
 * アプリケーション内のどこからでも現在のロケールを取得できるようにする。
 */
const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

/**
 * ロケールプロバイダー
 * レイアウト（Route Group 単位）で子コンポーネントにロケールを注入する。
 */
export const LocaleProvider: React.FC<{ locale: Locale; children: ReactNode }> = ({
    locale,
    children,
}) => (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
);

/**
 * 現在のロケールを取得するフック
 * @returns 現在のロケール ('ja' | 'en')
 */
export const useLocale = (): Locale => useContext(LocaleContext);

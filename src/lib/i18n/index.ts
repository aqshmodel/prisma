/**
 * i18n バレルファイル
 * 外部からのインポートを簡潔にするための re-export。
 *
 * @example
 * import { useLocale, useLocalePath, type Locale } from '@/lib/i18n';
 */

// 型定義
export { type Locale, DEFAULT_LOCALE, SUPPORTED_LOCALES } from './types';

// コンテキスト
export { LocaleProvider, useLocale } from './context';

// ナビゲーション
export { useLocalePath, getLocalePath } from './navigation';

// UI テキスト
export { getUIText, type UIText } from './ui-dictionary';

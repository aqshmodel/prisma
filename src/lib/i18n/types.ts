/**
 * i18n 型定義
 * サポートする言語とデフォルト設定を一元管理する。
 */

/** サポートする言語コード */
export type Locale = 'ja' | 'en';

/** デフォルト言語 */
export const DEFAULT_LOCALE: Locale = 'ja';

/** サポート言語一覧 */
export const SUPPORTED_LOCALES: readonly Locale[] = ['ja', 'en'] as const;

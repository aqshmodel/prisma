/**
 * サイト共通の設定値
 * URL等のマジックストリングを一箇所で管理する。
 */
export const SITE_CONFIG = {
    /** サイトのベースURL（末尾スラッシュなし） */
    baseUrl: 'https://prisma.aqsh.co.jp',
    /** サイト名 */
    name: 'Aqsh Prisma',
    /** 運営会社名 */
    organization: 'Aqsh株式会社',
    /** デフォルトOGP画像パス */
    ogImage: '/og-image.png',
    /** ロゴURL */
    logo: '/logo.webp',
} as const;

/**
 * JSON-LD用のpublisherオブジェクト（Schema.org Organization）
 * about系ページやArticleのJSON-LDで繰り返し使用される共通構造。
 */
export const PUBLISHER_JSON_LD = {
    '@type': 'Organization' as const,
    name: SITE_CONFIG.name,
    logo: {
        '@type': 'ImageObject' as const,
        url: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.logo}`,
    },
};

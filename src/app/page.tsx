import { WelcomePage } from '../features/welcome/WelcomePage';
import type { Metadata } from 'next';
import { getAllArticles } from '../features/articles/utils/mdx';
import { ArticleSection } from '../features/welcome/components/ArticleSection';

export const metadata: Metadata = {
    title: 'Aqsh Prisma | 無料16タイプ診断 ソシオニクス × ビジネス心理学',
    description: 'ソシオニクスとビジネス心理学に基づき、あなたのリーダーシップ特性と潜在リスクを可視化する次世代の組織診断ツール。',
    alternates: {
        canonical: 'https://prisma.aqsh.co.jp',
    },
    openGraph: {
        title: 'Aqsh Prisma | 無料16タイプ診断 ソシオニクス × ビジネス心理学',
        description: 'ソシオニクスとビジネス心理学に基づき、あなたのリーダーシップ特性と潜在リスクを可視化する次世代の組織診断ツール。',
        url: 'https://prisma.aqsh.co.jp/',
        siteName: 'Aqsh Prisma',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Aqsh Prisma Dashboard',
            },
        ],
        locale: 'ja_JP',
        type: 'website',
    },
};

/**
 * アプリケーションのトップページ (Server Component)
 * Compositionパターンを利用し、重いデータフェッチ（記事一覧等）をサーバー側で行ってから
 * Client Componentである `WelcomePage` にスロットとして流し込みます。
 */
export default function Home() {
    const latestArticles = getAllArticles().slice(0, 3);

    /**
     * SoftwareApplication (JSON-LD)
     * Webアプリケーションとしてのメタデータを検索エンジンにアピールします。
     */
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Aqsh Prisma",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "JPY",
            "availability": "https://schema.org/InStock"
        },
        "description": "ソシオニクスとビジネス心理学に基づき、リーダーシップ特性と潜在リスクを可視化する次世代の組織診断ツール。",
        "featureList": [
            "16タイプの基本特性分析",
            "モチベーションエンジンの特定",
            "バイアスリスクの検知",
            "組織マトリクスによる配置最適化"
        ],
        "screenshot": "https://prisma.aqsh.co.jp/hero-image.png"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <WelcomePage
                articleSlot={<ArticleSection articles={latestArticles} />}
            />
        </>
    );
}

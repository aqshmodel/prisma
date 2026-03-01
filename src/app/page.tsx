import { WelcomePage } from '../features/welcome/WelcomePage';
import type { Metadata } from 'next';
import { getAllArticles } from '../features/articles/utils/mdx';
import { ArticleSection } from '../features/welcome/components/ArticleSection';

export const metadata: Metadata = {
    title: 'Aqsh Prisma | 16タイプ×エニアグラム 無料性格診断・自己分析',
    description: 'あなたの「脳のOS」と「心のエンジン」を科学する無料性格診断。16タイプ（ソシオニクス）とエニアグラムを用いて、人間関係の摩擦、恋愛のすれ違い、キャリアの迷いの根本原因を精緻に言語化します。',
    alternates: {
        canonical: 'https://prisma.aqsh.co.jp',
    },
    openGraph: {
        title: 'Aqsh Prisma | 16タイプ×エニアグラム 無料性格診断・自己分析',
        description: 'あなたの「脳のOS」と「心のエンジン」を科学する無料性格診断。16タイプ（ソシオニクス）とエニアグラムを用いて、人間関係の摩擦、恋愛のすれ違い、キャリアの迷いの根本原因を精緻に言語化します。',
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
        "@type": "WebApplication",
        "name": "Aqsh Prisma 性格診断テスト",
        "applicationCategory": "LifestyleApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "JPY",
            "availability": "https://schema.org/InStock"
        },
        "description": "あなたの「脳のOS」と「心のエンジン」を科学する無料性格診断。16タイプ（ソシオニクス）とエニアグラムを用いて、生きづらさの根本原因を言語化します。",
        "featureList": [
            "16タイプ診断による認知パターンの特定",
            "エニアグラムによる無意識のモチベーション分析",
            "恋愛・キャリア・人間関係の摩擦原因の可視化",
            "自分専用の取扱説明書（トリセツ）の生成"
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

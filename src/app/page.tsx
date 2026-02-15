import { WelcomePage } from '../features/welcome/WelcomePage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Aqsh Prisma | 組織シナジー最大化ツール - 無料診断',
    description: 'あなたの組織の「見えない摩擦」を科学で解明。ソシオニクスとビジネス心理学に基づき、リーダーシップ特性と潜在リスクを可視化する次世代の組織診断ツール。',
    openGraph: {
        title: 'Aqsh Prisma | 組織シナジー最大化ツール',
        description: 'チームの「認知のOS」と「駆動エンジン」を分析し、最適な配置とシナジーを生み出す。',
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

export default function Home() {
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
            <WelcomePage />
        </>
    );
}

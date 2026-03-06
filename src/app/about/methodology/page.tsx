import type { Metadata } from 'next';
import { AboutMethodologyPage } from '@/features/about/components/AboutMethodologyPage';

export const metadata: Metadata = {
    title: '診断ロジックの説明 | Aqsh Prismaの診断はどう作られているか',
    description: 'Aqsh Prismaの16タイプ×エニアグラム診断がどのようなロジックで結果を算出しているかを、透明性をもって解説します。72問の設問設計から判定アルゴリズムまで。',
    keywords: '診断ロジック, アルゴリズム, ソシオニクス, エニアグラム, 認知バイアス, 16タイプ, Aqsh',
    openGraph: {
        title: '診断ロジックの説明 | Aqsh Prismaの診断はどう作られているか',
        description: 'Aqsh Prismaの16タイプ×エニアグラム診断がどのようなロジックで結果を算出しているかを、透明性をもって解説します。',
        type: 'article',
        url: 'https://aqsh.me/about/methodology',
        locale: 'ja_JP',
        siteName: 'Aqsh(アクシュ)',
        images: [
            {
                url: 'https://prisma.aqsh.co.jp/og-image.png',
                width: 1200,
                height: 630,
                alt: '診断ロジックの説明 | Aqsh'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '診断ロジックの説明 | Aqsh Prismaの診断はどう作られているか',
        description: 'Aqsh Prismaの16タイプ×エニアグラム診断がどのようなロジックで結果を算出しているかを、透明性をもって解説します。',
        images: ['https://prisma.aqsh.co.jp/og-image.png'],
    },
    alternates: {
        canonical: 'https://aqsh.me/about/methodology',
    },
};

export default function Page() {
    return <AboutMethodologyPage />;
}

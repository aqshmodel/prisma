import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants/site-config';
import { AboutMethodologyPage } from '@/features/about/components/AboutMethodologyPage';

export const metadata: Metadata = {
    title: '診断ロジックの説明 | Aqsh Prismaの診断はどう作られているか',
    description: 'Aqsh Prismaの16タイプ×エニアグラム診断がどのようなロジックで結果を算出しているかを、透明性をもって解説します。72問の設問設計から判定アルゴリズムまで。',
    keywords: '診断ロジック, アルゴリズム, ソシオニクス, エニアグラム, 認知バイアス, 16タイプ, Aqsh',
    openGraph: {
        title: '診断ロジックの説明 | Aqsh Prismaの診断はどう作られているか',
        description: 'Aqsh Prismaの16タイプ×エニアグラム診断がどのようなロジックで結果を算出しているかを、透明性をもって解説します。',
        type: 'article',
        url: `${SITE_CONFIG.baseUrl}/about/methodology`,
        locale: 'ja_JP',
        siteName: SITE_CONFIG.name,
        images: [
            {
                url: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`,
                width: 1200,
                height: 630,
                alt: '診断ロジックの説明 | Aqsh Prisma'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '診断ロジックの説明 | Aqsh Prismaの診断はどう作られているか',
        description: 'Aqsh Prismaの16タイプ×エニアグラム診断がどのようなロジックで結果を算出しているかを、透明性をもって解説します。',
        images: [`${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`],
    },
    alternates: {
        canonical: `${SITE_CONFIG.baseUrl}/about/methodology`,
    },
};

export default function Page() {
    return <AboutMethodologyPage />;
}

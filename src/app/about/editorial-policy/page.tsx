import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants/site-config';
import { AboutEditorialPolicyPage } from '@/features/about/components/AboutEditorialPolicyPage';

export const metadata: Metadata = {
    title: '編集方針 | Aqsh Prisma',
    description: 'Aqsh Prismaのコンテンツ制作方針、情報ソースの基準、更新ポリシー、免責事項について説明します。',
    keywords: '編集方針, コンテンツポリシー, 情報ソース, 免責事項, Aqsh',
    openGraph: {
        title: '編集方針 | Aqsh Prisma',
        description: 'Aqsh Prismaのコンテンツ制作方針、情報ソースの基準、更新ポリシー、免責事項について説明します。',
        type: 'article',
        url: `${SITE_CONFIG.baseUrl}/about/editorial-policy`,
        locale: 'ja_JP',
        siteName: SITE_CONFIG.name,
        images: [
            {
                url: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`,
                width: 1200,
                height: 630,
                alt: '編集方針 | Aqsh Prisma'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '編集方針 | Aqsh Prisma',
        description: 'Aqsh Prismaのコンテンツ制作方針、情報ソースの基準、更新ポリシー、免責事項について説明します。',
        images: [`${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`],
    },
    alternates: {
        canonical: `${SITE_CONFIG.baseUrl}/about/editorial-policy`,
    },
};

export default function Page() {
    return <AboutEditorialPolicyPage />;
}

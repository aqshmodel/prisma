import type { Metadata } from 'next';
import { AboutEditorialPolicyPage } from '@/features/about/components/AboutEditorialPolicyPage';

export const metadata: Metadata = {
    title: '編集方針 | Aqsh Prisma',
    description: 'Aqsh Prismaのコンテンツ制作方針、情報ソースの基準、更新ポリシー、免責事項について説明します。',
    keywords: '編集方針, コンテンツポリシー, 情報ソース, 免責事項, Aqsh',
    openGraph: {
        title: '編集方針 | Aqsh Prisma',
        description: 'Aqsh Prismaのコンテンツ制作方針、情報ソースの基準、更新ポリシー、免責事項について説明します。',
        type: 'article',
        url: 'https://aqsh.me/about/editorial-policy',
        locale: 'ja_JP',
        siteName: 'Aqsh(アクシュ)',
        images: [
            {
                url: 'https://prisma.aqsh.co.jp/og-image.png',
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
        images: ['https://prisma.aqsh.co.jp/og-image.png'],
    },
    alternates: {
        canonical: 'https://aqsh.me/about/editorial-policy',
    },
};

export default function Page() {
    return <AboutEditorialPolicyPage />;
}

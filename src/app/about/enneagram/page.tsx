import type { Metadata } from 'next';
import { SITE_CONFIG, buildUrl } from '@/lib/constants/site-config';
import { AboutEnneagramPage } from '@/features/about/components/AboutEnneagramPage';

export const metadata: Metadata = {
    title: 'エニアグラムとは？ | 9つの欲求と心のエンジン | Aqsh Prisma',
    description: '同じ行動の裏にある本当の理由とは。あなたの行動を無意識に支配する9タイプのエニアグラム（心のエンジン）について、専門的にわかりやすく解説します。',
    keywords: 'エニアグラム, 9タイプ, 性格診断, 欲求, ストレス行動, 心理学, Aqsh',
    openGraph: {
        title: 'エニアグラムとは？ | 9つの欲求と心のエンジン | Aqsh Prisma',
        description: '同じ行動の裏にある本当の理由とは。あなたの行動を無意識に支配する9タイプのエニアグラム（心のエンジン）について、専門的にわかりやすく解説します。',
        type: 'article',
        url: buildUrl('/about/enneagram'),
        locale: 'ja_JP',
        siteName: SITE_CONFIG.name,
        images: [
            {
                url: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`,
                width: 1200,
                height: 630,
                alt: 'エニアグラムとは？ | Aqsh Prisma'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'エニアグラムとは？ | 9つの欲求と心のエンジン | Aqsh Prisma',
        description: '同じ行動の裏にある本当の理由とは。あなたの行動を無意識に支配する9タイプのエニアグラム（心のエンジン）について、専門的にわかりやすく解説します。',
        images: [`${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`],
    },
    alternates: {
        canonical: buildUrl('/about/enneagram'),
    },
};

export default function Page() {
    return <AboutEnneagramPage />;
}

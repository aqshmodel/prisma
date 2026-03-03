import type { Metadata } from 'next';
import { AboutEnneagramPage } from '@/features/about/components/AboutEnneagramPage';

export const metadata: Metadata = {
    title: 'エニアグラムとは？ | 9つの欲求と心のエンジン | Aqsh(アクシュ)',
    description: '同じ行動の裏にある本当の理由とは。あなたの行動を無意識に支配する9タイプのエニアグラム（心のエンジン）について、専門的にわかりやすく解説します。',
    keywords: 'エニアグラム, 9タイプ, 性格診断, 欲求, ストレス行動, 心理学, Aqsh, アクシュ',
    openGraph: {
        title: 'エニアグラムとは？ | 9つの欲求と心のエンジン | Aqsh',
        description: '同じ行動の裏にある本当の理由とは。あなたの行動を無意識に支配する9タイプのエニアグラム（心のエンジン）について、専門的にわかりやすく解説します。',
        type: 'article',
        url: 'https://aqsh.me/about/enneagram',
        locale: 'ja_JP',
        siteName: 'Aqsh(アクシュ)',
        images: [
            {
                url: 'https://prisma.aqsh.co.jp/og-image.png',
                width: 1200,
                height: 630,
                alt: 'エニアグラムとは？ | 9つの欲求と心のエンジン | Aqsh(アクシュ)'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'エニアグラムとは？ | 9つの欲求と心のエンジン | Aqsh(アクシュ)',
        description: '同じ行動の裏にある本当の理由とは。あなたの行動を無意識に支配する9タイプのエニアグラム（心のエンジン）について、専門的にわかりやすく解説します。',
        images: ['https://prisma.aqsh.co.jp/og-image.png'],
    },
    alternates: {
        canonical: 'https://aqsh.me/about/enneagram',
    },
};

export default function Page() {
    return <AboutEnneagramPage />;
}

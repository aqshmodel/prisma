import type { Metadata } from 'next';
import { AboutSocionicsPage } from '@/features/about/components/AboutSocionicsPage';

export const metadata: Metadata = {
    title: 'ソシオニクスとは？ | 16タイプの性格構造を解明 | Aqsh(アクシュ)',
    description: 'なぜあの人とは話が合わないのか。ロシア発祥の緻密な性格類型学「ソシオニクス」で、16タイプの思考パターンや相性をわかりやすく解説します。',
    keywords: 'ソシオニクス, 16タイプ, 性格診断, MBTI代替, 相性, 心理学, Aqsh, アクシュ',
    openGraph: {
        title: 'ソシオニクスとは？ | 16タイプの性格構造を解明 | Aqsh',
        description: 'なぜあの人とは話が合わないのか。ロシア発祥の緻密な性格類型学「ソシオニクス」で、16タイプの思考パターンや相性をわかりやすく解説します。',
        type: 'article',
        url: 'https://aqsh.me/about/socionics',
        locale: 'ja_JP',
        siteName: 'Aqsh(アクシュ)',
        images: [
            {
                url: 'https://prisma.aqsh.co.jp/og-image.png',
                width: 1200,
                height: 630,
                alt: 'ソシオニクスとは？ | 16タイプの性格構造を解明 | Aqsh(アクシュ)',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ソシオニクスとは？ | 16タイプの性格構造を解明 | Aqsh(アクシュ)',
        description: 'なぜあの人とは話が合わないのか。ロシア発祥の緻密な性格類型学「ソシオニクス」で、16タイプの思考パターンや相性をわかりやすく解説します。',
        images: ['https://prisma.aqsh.co.jp/og-image.png'],
    },
    alternates: {
        canonical: 'https://aqsh.me/about/socionics',
    },
};

export default function Page() {
    return <AboutSocionicsPage />;
}

import type { Metadata } from 'next';
import { SITE_CONFIG, buildUrl } from '@/lib/constants/site-config';
import { AboutSocionicsPage } from '@/features/about/components/AboutSocionicsPage';

export const metadata: Metadata = {
    title: 'ソシオニクスとは？ | 16タイプの性格構造を解明 | Aqsh Prisma',
    description: 'なぜあの人とは話が合わないのか。ロシア発祥の緻密な性格類型学「ソシオニクス」で、16タイプの思考パターンや相性をわかりやすく解説します。',
    keywords: 'ソシオニクス, 16タイプ, 性格診断, MBTI代替, 相性, 心理学, Aqsh',
    openGraph: {
        title: 'ソシオニクスとは？ | 16タイプの性格構造を解明 | Aqsh Prisma',
        description: 'なぜあの人とは話が合わないのか。ロシア発祥の緻密な性格類型学「ソシオニクス」で、16タイプの思考パターンや相性をわかりやすく解説します。',
        type: 'article',
        url: buildUrl('/about/socionics'),
        locale: 'ja_JP',
        siteName: SITE_CONFIG.name,
        images: [
            {
                url: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`,
                width: 1200,
                height: 630,
                alt: 'ソシオニクスとは？ | Aqsh Prisma',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ソシオニクスとは？ | 16タイプの性格構造を解明 | Aqsh Prisma',
        description: 'なぜあの人とは話が合わないのか。ロシア発祥の緻密な性格類型学「ソシオニクス」で、16タイプの思考パターンや相性をわかりやすく解説します。',
        images: [`${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`],
    },
    alternates: {
        canonical: buildUrl('/about/socionics'),
    },
};

export default function Page() {
    return <AboutSocionicsPage />;
}

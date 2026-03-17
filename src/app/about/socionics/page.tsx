import type { Metadata } from 'next';
import { SITE_CONFIG, buildUrl } from '@/lib/constants/site-config';
import { AboutSocionicsPage } from '@/features/about/components/AboutSocionicsPage';

export const metadata: Metadata = {
    title: 'ソシオニクスとは？ 相性診断の仕組みと16タイプ解説 | Aqsh Prisma',
    description: 'ソシオニクスの相性診断はなぜ当たるのか。ロシア発祥の性格類型学で、16タイプの思考パターンと14パターンの相性関係をわかりやすく解説。MBTIとの違いや、相性が合う人・合わない人の見分け方も。',
    keywords: 'ソシオニクス, ソシオニクス 相性, 16タイプ, 性格診断, MBTI代替, 相性診断, 心理学, Aqsh',
    openGraph: {
        title: 'ソシオニクスとは？ 相性診断の仕組みと16タイプ解説 | Aqsh Prisma',
        description: 'ソシオニクスの相性診断はなぜ当たるのか。ロシア発祥の性格類型学で、16タイプの思考パターンと14パターンの相性関係をわかりやすく解説。MBTIとの違いや、相性が合う人・合わない人の見分け方も。',
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

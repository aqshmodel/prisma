import type { Metadata } from 'next';
import { SITE_CONFIG, buildUrl } from '@/lib/constants/site-config';
import { CommercialTransactionPage } from '@/features/legal/components/CommercialTransactionPage';

export const metadata: Metadata = {
    title: '特定商取引法に基づく表記 | Aqsh Prisma',
    description: 'Aqsh Prismaが提供する有料サービスに関する、特定商取引法に基づく表記です。',
    openGraph: {
        title: '特定商取引法に基づく表記 | Aqsh Prisma',
        description: 'Aqsh Prismaが提供する有料サービスに関する、特定商取引法に基づく表記です。',
        type: 'website',
        url: buildUrl('/legal'),
        locale: 'ja_JP',
        siteName: SITE_CONFIG.name,
        images: [
            {
                url: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`,
                width: 1200,
                height: 630,
                alt: '特定商取引法に基づく表記 | Aqsh Prisma'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '特定商取引法に基づく表記 | Aqsh Prisma',
        description: 'Aqsh Prismaが提供する有料サービスに関する、特定商取引法に基づく表記です。',
        images: [`${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`],
    },
    alternates: {
        canonical: buildUrl('/legal'),
    },
};

export default function Page() {
    return <CommercialTransactionPage />;
}

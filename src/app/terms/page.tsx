import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants/site-config';
import { TermsOfServicePage } from '@/features/legal/components/TermsOfServicePage';

export const metadata: Metadata = {
    title: '利用規約 | Aqsh Prisma',
    description: 'Aqsh Prismaが提供するアプリやサービスの利用条件、免責事項、権利帰属などを定めた利用規約です。',
    openGraph: {
        title: '利用規約 | Aqsh Prisma',
        description: 'Aqsh Prismaが提供するアプリやサービスの利用条件、免責事項、権利帰属などを定めた利用規約です。',
        type: 'website',
        url: `${SITE_CONFIG.baseUrl}/terms`,
        locale: 'ja_JP',
        siteName: SITE_CONFIG.name,
        images: [
            {
                url: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`,
                width: 1200,
                height: 630,
                alt: '利用規約 | Aqsh Prisma'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '利用規約 | Aqsh Prisma',
        description: 'Aqsh Prismaが提供するアプリやサービスの利用条件、免責事項、権利帰属などを定めた利用規約です。',
        images: [`${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`],
    },
    alternates: {
        canonical: `${SITE_CONFIG.baseUrl}/terms`,
    },
};

export default function Page() {
    return <TermsOfServicePage />;
}

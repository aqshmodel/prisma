import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants/site-config';
import { PrivacyPolicyPage } from '@/features/legal/components/PrivacyPolicyPage';

export const metadata: Metadata = {
    title: 'プライバシーポリシー | Aqsh Prisma',
    description: 'Aqsh Prismaにおける個人情報および個人関連情報（診断結果・行動履歴等）の取り扱い方針について説明します。',
    openGraph: {
        title: 'プライバシーポリシー | Aqsh Prisma',
        description: 'Aqsh Prismaにおける個人情報および個人関連情報（診断結果・行動履歴等）の取り扱い方針について説明します。',
        type: 'website',
        url: `${SITE_CONFIG.baseUrl}/privacy`,
        locale: 'ja_JP',
        siteName: SITE_CONFIG.name,
        images: [
            {
                url: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`,
                width: 1200,
                height: 630,
                alt: 'プライバシーポリシー | Aqsh Prisma'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'プライバシーポリシー | Aqsh Prisma',
        description: 'Aqsh Prismaにおける個人情報および個人関連情報（診断結果・行動履歴等）の取り扱い方針について説明します。',
        images: [`${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`],
    },
    alternates: {
        canonical: `${SITE_CONFIG.baseUrl}/privacy`,
    },
};

export default function Page() {
    return <PrivacyPolicyPage />;
}

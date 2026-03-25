import type { Metadata } from 'next';
import { SITE_CONFIG, buildUrl } from '@/lib/constants/site-config';
import { PrivacyPolicyEnPage } from '@/features/legal/components/PrivacyPolicyEnPage';

export const metadata: Metadata = {
    title: 'Privacy Policy | Aqsh Prisma',
    description: 'Explanation regarding the handling of personal information and personal-related information on Aqsh Prisma.',
    openGraph: {
        title: 'Privacy Policy',
        description: 'Explanation regarding the handling of personal information on Aqsh Prisma.',
        type: 'website',
        url: buildUrl('/en/privacy'),
        locale: 'en_US',
        siteName: SITE_CONFIG.name,
    },
    alternates: {
        canonical: buildUrl('/en/privacy'),
    },
};

export default function Page() {
    return <PrivacyPolicyEnPage />;
}

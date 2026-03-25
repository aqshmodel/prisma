import type { Metadata } from 'next';
import { SITE_CONFIG, buildUrl } from '@/lib/constants/site-config';
import { TermsOfServiceEnPage } from '@/features/legal/components/TermsOfServiceEnPage';

export const metadata: Metadata = {
    title: 'Terms of Service | Aqsh Prisma',
    description: 'Terms of Service for using the Aqsh Prisma diagnostic platform.',
    openGraph: {
        title: 'Terms of Service',
        description: 'Terms of Service for using the Aqsh Prisma diagnostic platform.',
        type: 'website',
        url: buildUrl('/en/terms'),
        locale: 'en_US',
        siteName: SITE_CONFIG.name,
    },
    alternates: {
        canonical: buildUrl('/en/terms'),
    },
};

export default function Page() {
    return <TermsOfServiceEnPage />;
}

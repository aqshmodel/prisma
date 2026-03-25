import type { Metadata } from 'next';
import { SITE_CONFIG, buildUrl } from '@/lib/constants/site-config';
import { AboutMethodologyEnPage } from '@/features/about/components/AboutMethodologyEnPage';

export const metadata: Metadata = {
    title: 'Diagnostic Logic | How Aqsh Prisma Works',
    description: 'Transparently explaining the logic behind Aqsh Prisma\'s 16-type × Enneagram diagnosis. From the 72-question design to the scoring algorithms.',
    keywords: 'Diagnostic Logic, Algorithm, Socionics, Enneagram, Cognitive Bias, 16 types, Aqsh Prisma',
    openGraph: {
        title: 'Diagnostic Logic | How Aqsh Prisma Works',
        description: 'Transparently explaining the logic behind Aqsh Prisma\'s 16-type × Enneagram diagnosis.',
        type: 'article',
        url: buildUrl('/en/about/methodology'),
        locale: 'en_US',
        siteName: SITE_CONFIG.name,
        images: [
            {
                url: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`,
                width: 1200,
                height: 630,
                alt: 'Diagnostic Logic | Aqsh Prisma'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Diagnostic Logic | How Aqsh Prisma Works',
        description: 'Transparently explaining the logic behind Aqsh Prisma\'s 16-type × Enneagram diagnosis.',
        images: [`${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`],
    },
    alternates: {
        canonical: buildUrl('/en/about/methodology'),
    },
};

export default function Page() {
    return <AboutMethodologyEnPage />;
}

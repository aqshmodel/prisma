import type { Metadata } from 'next';
import { SITE_CONFIG, buildUrl } from '@/lib/constants/site-config';
import { AboutSocionicsEnPage } from '@/features/about/components/AboutSocionicsEnPage';

export const metadata: Metadata = {
    title: 'What is Socionics? | 16 Personality Structures Explained | Aqsh Prisma',
    description: 'Why do you clash with certain people? Exploring Socionics, a precise personality typology from Russia, to decode the 16 cognitive habits and relationship dynamics.',
    keywords: 'Socionics, 16 Types, Personality Types, Cognitive Habits, Intertype Relations, Aqsh Prisma',
    openGraph: {
        title: 'What is Socionics? | 16 Personality Structures Explained',
        description: 'Exploring Socionics, a precise typology from Russia, to decode the 16 cognitive habits.',
        type: 'article',
        url: buildUrl('/en/about/socionics'),
        locale: 'en_US',
        siteName: SITE_CONFIG.name,
        images: [
            {
                url: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`,
                width: 1200,
                height: 630,
                alt: 'What is Socionics? | Aqsh Prisma'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'What is Socionics? | 16 Personality Structures Explained',
        description: 'Exploring Socionics, a precise typology from Russia, to decode the 16 cognitive habits.',
        images: [`${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`],
    },
    alternates: {
        canonical: buildUrl('/en/about/socionics'),
    },
};

export default function Page() {
    return <AboutSocionicsEnPage />;
}

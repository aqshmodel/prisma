import type { Metadata } from 'next';
import { SITE_CONFIG, buildUrl } from '@/lib/constants/site-config';
import { AboutEnneagramEnPage } from '@/features/about/components/AboutEnneagramEnPage';

export const metadata: Metadata = {
    title: 'What is Enneagram? | The 9 Desires and Heart\'s Engines | Aqsh Prisma',
    description: 'What is the real reason behind our actions? Expertly explaining the 9 types of Enneagram (Heart\'s Engines) that subconsciously govern behavior.',
    keywords: 'Enneagram, Heart\'s Engine, 9 Types, Subconscious Desire, Personality Test, Aqsh Prisma',
    openGraph: {
        title: 'What is Enneagram? | The 9 Desires and Heart\'s Engines',
        description: 'Expertly explaining the 9 types of Enneagram that subconsciously govern behavior.',
        type: 'article',
        url: buildUrl('/en/about/enneagram'),
        locale: 'en_US',
        siteName: SITE_CONFIG.name,
        images: [
            {
                url: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`,
                width: 1200,
                height: 630,
                alt: 'What is Enneagram? | Aqsh Prisma'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'What is Enneagram? | The 9 Desires and Heart\'s Engines',
        description: 'Expertly explaining the 9 types of Enneagram that subconsciously govern behavior.',
        images: [`${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`],
    },
    alternates: {
        canonical: buildUrl('/en/about/enneagram'),
    },
};

export default function Page() {
    return <AboutEnneagramEnPage />;
}

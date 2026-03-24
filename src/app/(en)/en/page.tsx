import { WelcomePage } from '@/features/welcome/WelcomePage';
import type { Metadata } from 'next';
import { SITE_CONFIG, buildUrl } from '@/lib/constants/site-config';

export const metadata: Metadata = {
    title: 'Free Personality Diagnostic | Aqsh Prisma',
    description: 'A free personality diagnostic combining 16 Socionics types and 9 Enneagram types. Discover your thinking patterns and unconscious motivations to understand the root causes of your relationship, career, and life challenges.',
    alternates: {
        canonical: buildUrl('/en/'),
    },
    openGraph: {
        title: 'Free Personality Diagnostic | Aqsh Prisma',
        description: 'A free personality diagnostic combining 16 Socionics types and 9 Enneagram types. Discover your thinking patterns and unconscious motivations.',
        url: buildUrl('/en/'),
        siteName: SITE_CONFIG.name,
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Aqsh Prisma - Free Personality Diagnostic',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
};

/**
 * 英語版トップページ (Server Component)
 * `/en/` でアクセスされる英語版のランディングページ。
 * 記事スロットは英語版では非表示（articleSlot を渡さない）。
 */
export default function EnHome() {
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Aqsh Prisma Personality Diagnostic",
            "applicationCategory": "LifestyleApplication",
            "operatingSystem": "Web Browser",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
            },
            "description": "A free scientific personality diagnostic that combines 16 Socionics types and 9 Enneagram types to reveal your thinking patterns and unconscious motivations.",
            "featureList": [
                "16-type diagnostic to identify cognitive patterns",
                "Enneagram-based motivation analysis",
                "Relationship, career, and love friction visualization",
                "Personal instruction manual generation"
            ],
            "screenshot": SITE_CONFIG.baseUrl + "/hero-image.webp"
        },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <WelcomePage />
        </>
    );
}

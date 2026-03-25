import type { Metadata } from 'next';
import { OS_CONTENT_EN } from '@/features/result/data/os/en';
import { CompatibilityPageEn } from '@/features/compatibility/components/CompatibilityPageEn';
import { getCompatibility } from '@/lib/constants/compatibility';
import { RELATION_DEFINITIONS_EN } from '@/lib/constants/compatibility.en';
import { buildUrl } from '@/lib/constants/site-config';
import type { OSTypeCode } from '@/types/diagnosis';

type Props = {
    params: Promise<{ code: string; target: string }>;
};

/**
 * Generate 240 SSG static paths
 * 16 types x 15 target types = 240 pages
 */
export function generateStaticParams() {
    const codes = Object.keys(OS_CONTENT_EN);
    const params: { code: string; target: string }[] = [];

    for (const code of codes) {
        for (const target of codes) {
            if (code !== target) {
                params.push({ code, target });
            }
        }
    }

    return params;
}

/**
 * Dynamically generate SEO-optimized metadata
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { code, target } = await params;
    const sourceData = OS_CONTENT_EN[code as keyof typeof OS_CONTENT_EN];
    const targetData = OS_CONTENT_EN[target as keyof typeof OS_CONTENT_EN];

    if (!sourceData || !targetData) {
        return { title: 'Compatibility Not Found | Aqsh Prisma' };
    }

    const baseRelation = getCompatibility(code as OSTypeCode, target as OSTypeCode);
    const enRelation = RELATION_DEFINITIONS_EN[baseRelation.type];
    const sourceName = sourceData.name.split('(')[0].trim();
    const targetName = targetData.name.split('(')[0].trim();

    const title = `${sourceName} & ${targetName} Compatibility [${enRelation.nameEn}] | Love & Work | Aqsh Prisma`;
    const description = `The compatibility between ${sourceName} and ${targetName} is ${enRelation.nameEn}. Discover relationships, communication tips in love and workplace. Free 16 type personality match based on Socionics.`;
    const pageUrl = buildUrl(`/en/types/${code}/compatibility/${target}`);

    return {
        title,
        description,
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            title,
            description,
            url: pageUrl,
            images: [{ url: '/og-image.png', width: 1200, height: 630 }],
            locale: 'en_US',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

/**
 * Compatibility Detail Page (Server Component)
 *
 * Includes JSON-LD structured data (BreadcrumbList + WebPage + FAQ)
 */
export default async function Page({ params }: Props) {
    const { code, target } = await params;
    const sourceData = OS_CONTENT_EN[code as keyof typeof OS_CONTENT_EN];
    const targetData = OS_CONTENT_EN[target as keyof typeof OS_CONTENT_EN];

    if (!sourceData || !targetData) {
        return <div className="p-8 text-center text-slate-500">Type not found</div>;
    }

    const baseRelation = getCompatibility(code as OSTypeCode, target as OSTypeCode);
    const enRelation = RELATION_DEFINITIONS_EN[baseRelation.type];
    const sourceName = sourceData.name.split('(')[0].trim();
    const targetName = targetData.name.split('(')[0].trim();

    // Structural Data: BreadcrumbList + WebPage + FAQ
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
                {
                    '@type': 'ListItem',
                    'position': 1,
                    'name': 'Home',
                    'item': buildUrl('/en'),
                },
                {
                    '@type': 'ListItem',
                    'position': 2,
                    'name': sourceName,
                    'item': buildUrl(`/en/types/${code}`),
                },
                {
                    '@type': 'ListItem',
                    'position': 3,
                    'name': `Compatibility with ${targetName}`,
                    'item': buildUrl(`/en/types/${code}/compatibility/${target}`),
                },
            ],
        },
        {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': [
                {
                    '@type': 'Question',
                    'name': `How is the compatibility between ${sourceName} and ${targetName}?`,
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': `The compatibility between ${sourceName} and ${targetName} is called "${enRelation.nameEn}". ${enRelation.summary} ${enRelation.concreteTip}`,
                    },
                },
                {
                    '@type': 'Question',
                    'name': `What are tips for ${sourceName} and ${targetName} working together?`,
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': enRelation.workCompatibility.roleAdvice,
                    },
                },
                {
                    '@type': 'Question',
                    'name': `What is the romantic relationship between ${sourceName} and ${targetName} like?`,
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': `${enRelation.loveCompatibility.attraction} ${enRelation.loveCompatibility.longevityTip}`,
                    },
                },
                {
                    '@type': 'Question',
                    'name': `What should ${sourceName} and ${targetName} be careful about?`,
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': `${enRelation.loveCompatibility.challenge} At work: ${enRelation.workCompatibility.frictionPoint}`,
                    },
                },
                ...(enRelation.faq ?? []).map((faqItem) => ({
                    '@type': 'Question' as const,
                    'name': faqItem.question,
                    'acceptedAnswer': {
                        '@type': 'Answer' as const,
                        'text': faqItem.answer,
                    },
                })),
            ],
        },
        {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            'name': `Tips to improve the relationship between ${sourceName} and ${targetName}`,
            'step': enRelation.dos.map((tip, i) => ({
                '@type': 'HowToStep',
                'position': i + 1,
                'text': tip,
            })),
        },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CompatibilityPageEn
                sourceCode={code as OSTypeCode}
                targetCode={target as OSTypeCode}
            />
        </>
    );
}

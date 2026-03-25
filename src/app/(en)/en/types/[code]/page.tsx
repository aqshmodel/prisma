import type { Metadata } from 'next';
import { TypeDetailPageEn } from '@/features/type-detail/TypeDetailPageEn';
import { OS_CONTENT_EN } from '@/features/result/data/os/en';
import { buildUrl } from '@/lib/constants/site-config';

type Props = {
    params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { code } = await params;
    const data = OS_CONTENT_EN[code as keyof typeof OS_CONTENT_EN];

    if (!data) {
        return {
            title: 'Type Not Found | Aqsh Prisma',
        };
    }

    // Remove markdown decoration and newlines
    const plainDescription = data.description
        .replace(/\*\*/g, '')
        .replace(/\n/g, '')
        .slice(0, 100);

    const title = `${data.name.split('(')[0].trim()} (${code}) Personality, Career & Compatibility | Free 16 Type Test | Aqsh Prisma`;
    const description = `${data.catchphrase} ${plainDescription}... Discover the unique traits and leadership potential of ${code} in the workplace. Free personality diagnostic tool 'Aqsh Prisma'.`;

    return {
        title,
        description,
        alternates: {
            canonical: buildUrl(`/en/types/${code}`),
        },
        openGraph: {
            title,
            description,
            url: buildUrl(`/en/types/${code}`),
            locale: 'en_US',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export function generateStaticParams() {
    return Object.keys(OS_CONTENT_EN).map((code) => ({
        code: code,
    }));
}

export default async function Page({ params }: Props) {
    const { code } = await params;
    const data = OS_CONTENT_EN[code as keyof typeof OS_CONTENT_EN];

    if (!data) {
        return <TypeDetailPageEn />;
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': buildUrl('/en')
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': data.name.split('(')[0].trim(),
                'item': buildUrl(`/en/types/${code}`)
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <TypeDetailPageEn />
        </>
    );
}

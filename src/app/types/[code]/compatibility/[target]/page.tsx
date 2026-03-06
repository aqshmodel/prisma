import type { Metadata } from 'next';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { CompatibilityPage } from '@/features/compatibility/components/CompatibilityPage';
import { getCompatibility, getPairConcreteTip } from '@/lib/constants/compatibility';
import { SITE_CONFIG } from '@/lib/constants/site-config';
import type { OSTypeCode } from '@/types/diagnosis';

type Props = {
    params: Promise<{ code: string; target: string }>;
};

/**
 * 240ページ分のSSG静的パスを生成
 * 16タイプ × 15相手タイプ = 240ページ
 */
export function generateStaticParams() {
    const codes = Object.keys(OS_CONTENT);
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
 * SEO最適化されたメタデータを動的に生成
 * title: "{typeA} × {typeB} の相性【{関係性名}】"
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { code, target } = await params;
    const sourceData = OS_CONTENT[code as keyof typeof OS_CONTENT];
    const targetData = OS_CONTENT[target as keyof typeof OS_CONTENT];

    if (!sourceData || !targetData) {
        return { title: '相性が見つかりません | Aqsh Prisma' };
    }

    const relation = getCompatibility(code as OSTypeCode, target as OSTypeCode);

    const pairTip = getPairConcreteTip(code as OSTypeCode, target as OSTypeCode);
    const title = `${sourceData.name}×${targetData.name}の相性【${relation.name}】| Aqsh Prisma`;
    const baseDesc = `${sourceData.name}と${targetData.name}の相性は${relation.name}。`;
    const tipEnd = pairTip.indexOf('。', 30);
    const tipSlice = tipEnd > 0 ? pairTip.slice(0, tipEnd + 1) : pairTip.slice(0, 60);
    const description = `${baseDesc}${tipSlice} ソシオニクス理論に基づく16タイプ相性診断。`;
    const pageUrl = `${SITE_CONFIG.baseUrl}/types/${code}/compatibility/${target}`;

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
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

/**
 * 相性詳細ページ (Server Component)
 *
 * JSON-LD構造化データ（BreadcrumbList + WebPage + FAQ）を含む。
 */
export default async function Page({ params }: Props) {
    const { code, target } = await params;
    const sourceData = OS_CONTENT[code as keyof typeof OS_CONTENT];
    const targetData = OS_CONTENT[target as keyof typeof OS_CONTENT];

    if (!sourceData || !targetData) {
        return <div>タイプが見つかりません</div>;
    }

    const relation = getCompatibility(code as OSTypeCode, target as OSTypeCode);

    // BreadcrumbList + WebPage + FAQ の構造化データ
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
                {
                    '@type': 'ListItem',
                    'position': 1,
                    'name': 'TOP',
                    'item': SITE_CONFIG.baseUrl,
                },
                {
                    '@type': 'ListItem',
                    'position': 2,
                    'name': sourceData.name,
                    'item': `${SITE_CONFIG.baseUrl}/types/${code}`,
                },
                {
                    '@type': 'ListItem',
                    'position': 3,
                    'name': `× ${targetData.name} の相性`,
                    'item': `${SITE_CONFIG.baseUrl}/types/${code}/compatibility/${target}`,
                },
            ],
        },
        {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': [
                {
                    '@type': 'Question',
                    'name': `${sourceData.name}と${targetData.name}の相性は？`,
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': `${sourceData.name}と${targetData.name}の相性は「${relation.name}」です。${relation.summary} ${getPairConcreteTip(code as OSTypeCode, target as OSTypeCode)}`,
                    },
                },
                {
                    '@type': 'Question',
                    'name': `${sourceData.name}と${targetData.name}が仕事で組むときのコツは？`,
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': relation.workCompatibility.roleAdvice,
                    },
                },
                ...(relation.faq ?? []).map((faqItem) => ({
                    '@type': 'Question' as const,
                    'name': faqItem.question,
                    'acceptedAnswer': {
                        '@type': 'Answer' as const,
                        'text': faqItem.answer,
                    },
                })),
            ],
        },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CompatibilityPage
                sourceCode={code as OSTypeCode}
                targetCode={target as OSTypeCode}
            />
        </>
    );
}

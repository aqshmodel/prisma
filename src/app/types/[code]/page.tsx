import type { Metadata } from 'next';
import { TypeDetailPage } from '../../../features/type-detail/TypeDetailPage';
import { OS_CONTENT } from '../../../features/result/data/content-os';

type Props = {
    params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { code } = await params;
    const data = OS_CONTENT[code as keyof typeof OS_CONTENT];

    if (!data) {
        return {
            title: 'タイプが見つかりません | Aqsh Prisma',
        };
    }

    // Markdownの装飾や改行を削除し、説明文の一部を抽出
    const plainDescription = data.description
        .replace(/\*\*/g, '')
        .replace(/\n/g, '')
        .slice(0, 80);

    const title = `${data.name} (${data.code}) の性格と適職・相性 - 無料16タイプ診断 | Aqsh Prisma`;
    const description = `${data.catchphrase} ${plainDescription}… 組織での見えない摩擦を解明する無料診断ツール『Aqsh Prisma』であなたの性格的特徴やリーダーシップ特性を発見しましょう。`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export function generateStaticParams() {
    return Object.keys(OS_CONTENT).map((code) => ({
        code: code,
    }));
}

export default async function Page({ params }: Props) {
    const { code } = await params;
    const data = OS_CONTENT[code as keyof typeof OS_CONTENT];

    if (!data) {
        return <TypeDetailPage />;
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'ホーム',
                'item': 'https://prisma.aqsh.co.jp/'
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': `${data.name} (${data.code})`,
                'item': `https://prisma.aqsh.co.jp/types/${code}`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <TypeDetailPage />
        </>
    );
}

import type { Metadata } from 'next';
import { CompatibilitySection } from '@/features/welcome/components/CompatibilitySection';
import { buildUrl } from '@/lib/constants/site-config';

export const metadata: Metadata = {
    title: 'タイプ別相性診断（16タイプ）| Aqsh Prisma',
    description: '16性格タイプ同士の相性を徹底・詳細解説。気になる相手との仕事・恋愛での相性パターンや効果的なコミュニケーションのコツを確認できます。',
    alternates: {
        canonical: buildUrl('/compatibility'),
    },
    openGraph: {
        title: 'タイプ別相性診断（16タイプ）| Aqsh Prisma',
        description: '16性格タイプ同士の相性を詳細解説。仕事・恋愛での相性パターンを確認しよう。',
        url: buildUrl('/compatibility'),
    },
};

export default function CompatibilitySearchPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'TOP',
                'item': buildUrl('/'),
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': 'タイプ別相性診断',
                'item': buildUrl('/compatibility'),
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="min-h-[70vh] bg-gradient-to-b from-white to-prisma-50/30 flex flex-col justify-center py-10">
                <CompatibilitySection />
            </div>
        </>
    );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { getAllGlossaryEntries } from '@/features/glossary/utils/glossary';
import { buildUrl } from '@/lib/constants/site-config';

export const metadata: Metadata = {
    title: 'パーソナリティ診断 用語集 | Aqsh Prisma',
    description: 'ソシオニクス・エニアグラム・認知機能など、パーソナリティ診断に関する専門用語をわかりやすく解説。Fe・Ni・双対関係・タイプ3など、診断結果の理解を深める用語集です。',
    alternates: {
        canonical: buildUrl('/glossary'),
    },
    openGraph: {
        title: 'パーソナリティ診断 用語集 | Aqsh Prisma',
        description: 'ソシオニクス・エニアグラム・認知機能など、パーソナリティ診断に関する専門用語をわかりやすく解説。Fe・Ni・双対関係・タイプ3など、診断結果の理解を深める用語集です。',
        url: buildUrl('/glossary'),
    },
    twitter: {
        card: 'summary',
        title: 'パーソナリティ診断 用語集 | Aqsh Prisma',
        description: 'ソシオニクス・エニアグラム・認知機能など、パーソナリティ診断に関する専門用語をわかりやすく解説。Fe・Ni・双対関係・タイプ3など、診断結果の理解を深める用語集です。',
    },
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    '認知機能': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    'ソシオニクス関係性': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    'エニアグラム': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    'タイプ論全般': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
};

/** カテゴリ名からアンカーID用の文字列を生成 */
function toCategoryId(category: string): string {
    return `category-${category}`;
}

export default function GlossaryPage() {
    const entries = getAllGlossaryEntries();

    // カテゴリ別にグループ化
    const grouped = entries.reduce((acc, entry) => {
        if (!acc[entry.category]) acc[entry.category] = [];
        acc[entry.category].push(entry);
        return acc;
    }, {} as Record<string, typeof entries>);

    const categoryNames = Object.keys(grouped);

    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
                { '@type': 'ListItem', 'position': 1, 'name': 'ホーム', 'item': buildUrl('/') },
                { '@type': 'ListItem', 'position': 2, 'name': '用語集', 'item': buildUrl('/glossary') },
            ],
        },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="min-h-screen bg-slate-50 pb-20">
                {/* Header */}
                <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                    <div className="max-w-4xl md:max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                        <Link href="/" className="text-slate-500 hover:text-slate-800 flex items-center gap-2 font-medium">
                            <ArrowLeft size={20} />
                            TOP
                        </Link>
                        <span className="font-bold text-slate-800 flex items-center gap-2">
                            <BookOpen size={18} />
                            Glossary
                        </span>
                    </div>
                </div>

                {/* Hero */}
                <div className="bg-white pb-10 pt-8 px-4 border-b border-slate-100">
                    <div className="max-w-3xl md:max-w-5xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-slate-600 text-sm font-bold mb-6">
                            <BookOpen size={14} />
                            Glossary
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight mb-3">
                            パーソナリティ診断 用語集
                        </h1>
                        <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
                            ソシオニクス・エニアグラム・認知機能など、パーソナリティ診断で使われる専門用語をわかりやすく解説します。{entries.length}件の用語を収録。
                        </p>
                    </div>
                </div>

                {/* カテゴリ目次 */}
                <div className="max-w-3xl md:max-w-5xl mx-auto px-4 mt-8 mb-2">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {categoryNames.map((category) => {
                            const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS['タイプ論全般'];
                            return (
                                <a
                                    key={category}
                                    href={`#${toCategoryId(category)}`}
                                    className={`px-4 py-2 rounded-full text-sm font-bold border transition-all hover:shadow-sm ${colors.bg} ${colors.text} ${colors.border}`}
                                >
                                    {category}
                                    <span className="ml-1.5 text-xs opacity-60">{grouped[category].length}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Category Groups */}
                <div className="max-w-3xl md:max-w-5xl mx-auto px-4 mt-10 space-y-12">
                    {Object.entries(grouped).map(([category, items]) => {
                        const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS['タイプ論全般'];
                        return (
                            <section key={category} id={toCategoryId(category)}>
                                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-lg text-sm font-bold ${colors.bg} ${colors.text}`}>
                                        {category}
                                    </span>
                                    <span className="text-sm text-slate-400 font-normal">{items.length}件</span>
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {items.map((entry) => (
                                        <Link
                                            key={entry.slug}
                                            href={`/glossary/${entry.slug}/`}
                                            className={`group bg-white rounded-xl border ${colors.border} p-5 hover:shadow-md transition-all`}
                                        >
                                            <h3 className="font-bold text-slate-800 group-hover:text-prisma-600 transition-colors mb-2">
                                                {entry.title}
                                            </h3>
                                            <p className="text-xs text-slate-500 line-clamp-2">
                                                {entry.description}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="max-w-3xl md:max-w-5xl mx-auto px-4 mt-16 text-center">
                    <div className="bg-white rounded-2xl border border-slate-200 p-8">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">自分の認知機能を知りたい方へ</h3>
                        <p className="text-sm text-slate-500 mb-4">無料診断で、あなたの認知の癖を可視化できます。</p>
                        <Link
                            href="/diagnosis"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-prisma-500 text-white font-bold rounded-xl hover:bg-prisma-600 transition-colors"
                        >
                            無料で診断する &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

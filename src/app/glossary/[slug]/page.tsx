import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ArrowRight, User } from 'lucide-react';
import { getGlossaryBySlug, getGlossarySlugs, getAllGlossaryEntries } from '@/features/glossary/utils/glossary';
import { buildUrl } from '@/lib/constants/site-config';
import { MDXRemote } from 'next-mdx-remote/rsc';

type Props = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return getGlossarySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const entry = getGlossaryBySlug(slug);

    if (!entry) {
        return { title: '用語が見つかりません | Aqsh Prisma' };
    }

    const title = `${entry.metadata.title}とは | パーソナリティ用語集 | Aqsh Prisma`;
    const description = entry.metadata.description;

    return {
        title,
        description,
        alternates: {
            canonical: buildUrl(`/glossary/${slug}`),
        },
        openGraph: { title, description, url: buildUrl(`/glossary/${slug}`) },
        twitter: { card: 'summary', title, description },
    };
}

export default async function GlossaryEntryPage({ params }: Props) {
    const { slug } = await params;
    const entry = getGlossaryBySlug(slug);

    if (!entry) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-slate-500">用語が見つかりませんでした。</p>
            </div>
        );
    }

    const { metadata, content } = entry;
    const allEntries = getAllGlossaryEntries();

    // 関連用語のメタデータを取得
    const relatedTermEntries = metadata.relatedTerms
        .map(slug => allEntries.find(e => e.slug === slug))
        .filter(Boolean);

    // JSON-LD: BreadcrumbList + DefinedTerm
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
                { '@type': 'ListItem', 'position': 1, 'name': 'ホーム', 'item': buildUrl('/') },
                { '@type': 'ListItem', 'position': 2, 'name': '用語集', 'item': buildUrl('/glossary') },
                { '@type': 'ListItem', 'position': 3, 'name': metadata.title, 'item': buildUrl(`/glossary/${slug}`) },
            ],
        },
        {
            '@context': 'https://schema.org',
            '@type': 'DefinedTerm',
            'name': metadata.title,
            'description': metadata.description,
            'inDefinedTermSet': {
                '@type': 'DefinedTermSet',
                'name': 'Aqsh Prisma パーソナリティ用語集',
                'url': buildUrl('/glossary'),
            },
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
                        <Link href="/glossary" className="text-slate-500 hover:text-slate-800 flex items-center gap-2 font-medium">
                            <ArrowLeft size={20} />
                            用語集に戻る
                        </Link>
                        <span className="font-bold text-slate-800 flex items-center gap-2">
                            <BookOpen size={18} />
                            Glossary
                        </span>
                    </div>
                </div>

                {/* Hero */}
                <div className="bg-white pb-8 pt-8 px-4 border-b border-slate-100">
                    <div className="max-w-3xl mx-auto">
                        <span className="text-xs text-prisma-600 font-medium bg-prisma-50 px-2 py-1 rounded-md mb-4 inline-block">
                            {metadata.category}
                        </span>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                            {metadata.title}とは
                        </h1>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto px-4 mt-8">
                    <article className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10">
                        <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-prisma-600 prose-a:no-underline hover:prose-a:underline">
                            <MDXRemote source={content} />
                        </div>
                    </article>

                    {/* 著者権威性バッジ */}
                    <div className="mt-6 bg-slate-50 rounded-xl border border-slate-200 p-5 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-prisma-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <User size={18} className="text-prisma-600" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800">監修：Tsukada Takahiro</p>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                人材業界歴24年・求職者面談 累計1,000名以上。ソシオニクス・エニアグラム等の産業心理学を実務に応用し、Aqsh Prismaを自社開発。
                            </p>
                        </div>
                    </div>

                    {/* Related Terms */}
                    {relatedTermEntries.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">関連する用語</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {relatedTermEntries.map((term) => term && (
                                    <Link
                                        key={term.slug}
                                        href={`/glossary/${term.slug}`}
                                        className="group bg-white rounded-xl border border-slate-200 p-4 hover:border-prisma-300 hover:shadow-sm transition-all flex items-center justify-between"
                                    >
                                        <div>
                                            <h3 className="font-bold text-slate-800 text-sm group-hover:text-prisma-600 transition-colors">
                                                {term.title}
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-1 line-clamp-1">{term.description}</p>
                                        </div>
                                        <ArrowRight size={16} className="text-slate-400 group-hover:text-prisma-500 transition-colors flex-shrink-0 ml-2" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Related Articles */}
                    {metadata.relatedArticles.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">関連コラム</h2>
                            <div className="space-y-2">
                                {metadata.relatedArticles.map((articleSlug) => (
                                    <Link
                                        key={articleSlug}
                                        href={`/articles/${articleSlug}`}
                                        className="group block bg-white rounded-xl border border-slate-200 p-4 hover:border-prisma-300 hover:shadow-sm transition-all"
                                    >
                                        <span className="text-sm font-bold text-slate-700 group-hover:text-prisma-600 transition-colors flex items-center gap-2">
                                            <ArrowRight size={14} className="text-slate-400" />
                                            {articleSlug.replace(/-/g, ' ')}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="mt-12 text-center">
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

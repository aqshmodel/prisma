import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ArrowRight, User } from 'lucide-react';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { getAllArticles } from '@/features/articles/utils/mdx';
import { toTypeLabel } from '@/lib/constants/type-mapping';
import { buildUrl } from '@/lib/constants/site-config';
import { filterArticlesByType } from '@/lib/utils/article-filter';
import { ArticleCardLarge } from '@/features/articles/components/ArticleCard';

type Props = {
    params: Promise<{ code: string }>;
};

export function generateStaticParams() {
    return Object.keys(OS_CONTENT).map((code) => ({ code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { code } = await params;
    const data = OS_CONTENT[code as keyof typeof OS_CONTENT];
    const typeLabel = toTypeLabel(code);

    if (!data) {
        return { title: 'タイプが見つかりません | Aqsh Prisma' };
    }

    const title = `${data.name}（${typeLabel}）に関する記事一覧 | Aqsh Prisma`;
    const description = `${data.name}（${typeLabel}）タイプの性格・仕事・恋愛・人間関係に関するコラム記事の一覧です。`;
    const url = buildUrl(`/types/${code}/articles`);

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
        },
        twitter: {
            card: 'summary',
            title,
            description,
        },
    };
}

/** descriptionの先頭2文を抽出する */
function extractDescriptionSummary(description: string): string {
    const cleaned = description.replace(/\*\*/g, '').replace(/\n/g, ' ').trim();
    const sentences = cleaned.match(/[^。]+。/g);
    if (!sentences) return cleaned.slice(0, 120) + '…';
    return sentences.slice(0, 2).join('');
}

export default async function TypeArticlesPage({ params }: Props) {
    const { code } = await params;
    const data = OS_CONTENT[code as keyof typeof OS_CONTENT];
    const typeLabel = toTypeLabel(code);

    if (!data) {
        return <div className="p-8 text-center text-slate-500">タイプが見つかりませんでした。</div>;
    }

    const allArticles = getAllArticles();
    const matchedArticles = filterArticlesByType(allArticles, typeLabel);
    const descriptionSummary = extractDescriptionSummary(data.description);

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="absolute inset-0 bg-white border-b border-slate-200 w-screen left-1/2 -translate-x-1/2 -z-10" aria-hidden="true" />
                <div className="max-w-4xl md:max-w-6xl xl:max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href={`/types/${code}`} className="text-slate-500 hover:text-slate-800 flex items-center gap-2 font-medium">
                        <ArrowLeft size={20} />
                        {data.name}
                    </Link>
                    <Link href="/articles" className="font-bold text-slate-800 flex items-center gap-2">
                        <BookOpen size={18} />
                        全記事一覧
                    </Link>
                </div>
            </div>

            {/* Hero */}
            <div className="bg-white pb-12 pt-12 px-4 border-b border-slate-100">
                <div className="max-w-3xl md:max-w-5xl xl:max-w-[1200px] mx-auto text-center">
                    <p className="text-sm text-prisma-600 font-medium mb-2 tracking-wider">{data.name.match(/\((.+)\)/)?.[1]} / {typeLabel}</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                        {data.name}に関する記事
                    </h1>

                    {/* タイプ概要セクション */}
                    <div className="max-w-2xl mx-auto mt-6 mb-6">
                        <p className="text-base text-prisma-700 font-medium italic mb-3">
                            &ldquo;{data.catchphrase}&rdquo;
                        </p>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4">
                            {descriptionSummary}
                        </p>
                        <Link
                            href={`/types/${code}`}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-prisma-600 hover:text-prisma-700 transition-colors"
                        >
                            <User size={14} />
                            {data.name}の詳細を見る
                            <ArrowRight size={14} />
                        </Link>
                    </div>

                    <p className="text-lg text-slate-600">
                        {matchedArticles.length > 0
                            ? `${matchedArticles.length}件の記事が見つかりました`
                            : 'このタイプ専用の記事はまだありません'
                        }
                    </p>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="max-w-3xl md:max-w-5xl xl:max-w-[1200px] mx-auto px-4 mt-12">
                {matchedArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {matchedArticles.map((article) => (
                            <ArticleCardLarge
                                key={article.slug}
                                slug={article.slug}
                                title={article.title}
                                description={article.description}
                                coverImage={article.coverImage}
                                category={article.category}
                                date={article.date}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-slate-500 mb-8">このタイプに特化した記事を現在執筆準備中です。</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href={`/types/${code}`}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-prisma-300 text-prisma-600 font-medium rounded-xl hover:bg-prisma-50 transition-colors"
                            >
                                <User size={16} />
                                {data.name}の詳細を見る
                            </Link>
                            <Link
                                href="/articles"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-prisma-500 text-white font-medium rounded-xl hover:bg-prisma-600 transition-colors"
                            >
                                <BookOpen size={16} />
                                全記事一覧を見る
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

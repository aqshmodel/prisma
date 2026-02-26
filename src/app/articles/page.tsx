
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getAllArticles } from '../../features/articles/utils/mdx';
import { ArrowLeft, BookOpen, Calendar } from 'lucide-react';

/**
 * 記事一覧ページの静的メタデータ
 * SEO向上のため、Canonical（正規URL）を明示しています。
 */
export const metadata: Metadata = {
    title: 'コラム一覧 | Aqsh Prisma - 16性格診断で才能と適職を見つける',
    description: '16性格診断（ソシオニクス）を活用した自己分析、チームビルディング、適職探しに役立つコラムや記事の一覧です。',
    alternates: {
        canonical: 'https://prisma.aqsh.co.jp/articles',
    },
};

/**
 * ブログ（コラム）のトップページコンポーネント
 * Server Componentとしてビルド時に静的生成（SSG）されます。
 */
export default function ArticlesPage() {
    const articles = getAllArticles();

    /**
     * 検索エンジン向けの構造化データ（JSON-LD）
     * このページが記事のリスト（ItemList）であることをGoogleに伝達し、リッチリザルトを促進します。
     */
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": articles.map((article, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://prisma.aqsh.co.jp/articles/${article.slug}`
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="min-h-screen bg-slate-50 pb-20">
                {/* Header */}
                <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                    <div className="max-w-4xl md:max-w-6xl xl:max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
                        <Link href="/" className="text-slate-500 hover:text-slate-800 flex items-center gap-2 font-medium">
                            <ArrowLeft size={20} />
                            TOP
                        </Link>
                        <span className="font-bold text-slate-800 flex items-center gap-2">
                            <BookOpen size={18} />
                            Articles
                        </span>
                    </div>
                </div>

                {/* Hero */}
                <div className="bg-white pb-12 pt-12 px-4 border-b border-slate-100">
                    <div className="max-w-3xl md:max-w-5xl xl:max-w-[1200px] mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
                            コラム・記事一覧
                        </h1>
                        <p className="text-lg text-slate-600">
                            自己理解と他者理解を深め、才能を仕事に活かすためのヒントをお届けします。
                        </p>
                    </div>
                </div>

                {/* Article List */}
                <div className="max-w-3xl md:max-w-5xl xl:max-w-[1200px] mx-auto px-4 mt-12">
                    {articles.length === 0 ? (
                        <div className="text-center text-slate-500 py-12">
                            記事が公開されていません。
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {articles.map((article) => (
                                <Link
                                    href={`/articles/${article.slug}`}
                                    key={article.slug}
                                    className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all flex flex-col"
                                >
                                    <div className="h-48 bg-slate-200 relative overflow-hidden">
                                        {/* next/image を使用し、帯域と描画パフォーマンスを最適化 */}
                                        {article.coverImage ? (
                                            <Image
                                                src={article.coverImage}
                                                alt={article.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-prisma-500/20 to-indigo-500/20" aria-hidden="true" />
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-3">
                                            <span className="bg-prisma-50 text-prisma-700 px-2 py-1 rounded-md">
                                                {article.category || 'コラム'}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                {article.date}
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-800 leading-tight mb-3 group-hover:text-prisma-600 transition-colors line-clamp-2">
                                            {article.title}
                                        </h2>
                                        <p className="text-sm text-slate-600 line-clamp-3 mb-4">
                                            {article.description}
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                            <span className="text-xs text-slate-400 font-medium">
                                                {article.author || 'Aqsh Prisma Team'}
                                            </span>
                                            <span className="text-sm font-bold text-prisma-600 group-hover:translate-x-1 transition-transform">
                                                続きを読む →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

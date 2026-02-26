import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';
import type { ArticleMetadata } from '../../articles/utils/mdx';

/**
 * トップページ等に表示する最新ブログ記事セクション（Server Component としても機能）
 * 
 * @description
 * SEOとCWV（Core Web Vitals）の最適化のため、画像はCSS Background ではなく、
 * next/image (<Image />) を用いて遅延読み込みとWebP最適化を適用しています。
 */
interface ArticleSectionProps {
    /** 描画する記事のメタデータ一覧 */
    articles: ArticleMetadata[];
}

export const ArticleSection: React.FC<ArticleSectionProps> = ({ articles }) => {
    if (!articles || articles.length === 0) return null;

    return (
        <section className="py-24 bg-slate-50 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 font-serif tracking-tight">
                        コラム・お役立ち記事
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        16性格診断を活用した自己分析や、チームビルディングに役立つ最新情報をお届けします。
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {articles.map(article => (
                        <Link
                            key={article.slug}
                            href={`/articles/${article.slug}`}
                            className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="aspect-video bg-slate-100 relative overflow-hidden">
                                {/* next/image を使用し、LCP（最大コンテンツ描画時間）を高速化 */}
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
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-medium">
                                    <span className="bg-prisma-50 text-prisma-700 px-2 py-1 rounded-md">
                                        {article.category || 'コラム'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {article.date}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-prisma-600 transition-colors line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-slate-600 line-clamp-2">
                                    {article.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/articles"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all group"
                    >
                        すべての記事を見る
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

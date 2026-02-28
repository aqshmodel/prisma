import Link from 'next/link';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import type { ArticleMetadata } from '@/features/articles/utils/mdx';
import { Pagination } from './Pagination';

interface ArticleListProps {
    articles: ArticleMetadata[];
    currentPage: number;
    totalPages: number;
    basePath: string;
    defaultPath?: string;
}

export function ArticleList({ articles, currentPage, totalPages, basePath, defaultPath }: ArticleListProps) {
    if (articles.length === 0) {
        return (
            <div className="text-center text-slate-500 py-12 pb-24">
                記事が公開されていません。
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-12 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {articles.map((article) => (
                    <Link
                        href={`/articles/${article.slug}`}
                        key={article.slug}
                        className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all flex flex-col"
                    >
                        <div className="h-48 bg-slate-200 relative overflow-hidden">
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
                                    続きを読む &rarr;
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    basePath={basePath}
                    defaultPath={defaultPath}
                />
            )}
        </div>
    );
}

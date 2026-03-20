import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, RefreshCw } from 'lucide-react';

interface ArticleCardBaseProps {
    slug: string;
    title: string;
    description?: string;
    coverImage?: string;
    category?: string;
    date?: string;
    updatedAt?: string;
    /** 著者名（記事一覧で表示する場合） */
    author?: string;
}

/**
 * 大型記事カード（記事一覧・フィルタ結果・タイプ別記事で使用）
 * カバー画像 + メタ情報 + タイトル + 説明文 + 「続きを読む」
 */
export const ArticleCardLarge: React.FC<ArticleCardBaseProps> = ({
    slug, title, description, coverImage, category, date, updatedAt, author,
}) => (
    <Link
        href={`/articles/${slug}`}
        className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all flex flex-col"
    >
        <div className="h-48 md:h-64 bg-slate-200 relative overflow-hidden">
            {coverImage ? (
                <Image
                    src={coverImage}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-prisma-500/20 to-indigo-500/20" aria-hidden="true" />
            )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 font-medium mb-3">
                <span className="bg-prisma-50 text-prisma-700 px-2 py-1 rounded-md">
                    {category || 'コラム'}
                </span>
                <div className="flex items-center gap-3">
                    {date && (
                        <span className="flex items-center gap-1" title="公開日">
                            <Calendar size={12} />
                            <time dateTime={date}>{date}</time>
                        </span>
                    )}
                    {updatedAt && updatedAt !== date && (
                        <span className="flex items-center gap-1" title="最終更新日">
                            <RefreshCw size={12} />
                            <time dateTime={updatedAt}>{updatedAt}</time>
                        </span>
                    )}
                </div>
            </div>
            <h2 className="text-xl font-bold text-slate-800 leading-tight mb-3 group-hover:text-prisma-600 transition-colors line-clamp-2">
                {title}
            </h2>
            {description && (
                <p className="text-sm text-slate-600 line-clamp-3 mb-4">{description}</p>
            )}
            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                {author && (
                    <span className="text-xs text-slate-400 font-medium">
                        {author}
                    </span>
                )}
                <span className="text-sm font-bold text-prisma-600 group-hover:translate-x-1 transition-transform ml-auto">
                    続きを読む &rarr;
                </span>
            </div>
        </div>
    </Link>
);

/**
 * 小型記事カード（関連記事セクションで使用）
 * サムネイル + カテゴリ + タイトルのコンパクト表示
 */
export const ArticleCardSmall: React.FC<ArticleCardBaseProps & { className?: string }> = ({
    slug, title, coverImage, category, className = '',
}) => (
    <Link
        href={`/articles/${slug}`}
        className={`group flex gap-3 rounded-xl p-3 border border-slate-100 hover:border-prisma-200 transition-all duration-200 ${className}`}
    >
        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-200 relative">
            {coverImage ? (
                <Image
                    src={coverImage}
                    alt={title}
                    fill
                    sizes="80px"
                    className="object-cover"
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-prisma-500/20 to-indigo-500/20" />
            )}
        </div>
        <div className="flex-1 min-w-0">
            <span className="text-[10px] text-prisma-600 font-medium bg-prisma-50 px-1.5 py-0.5 rounded">
                {category}
            </span>
            <h4 className="text-sm font-bold text-slate-800 mt-1 leading-snug line-clamp-2 group-hover:text-prisma-600 transition-colors">
                {title}
            </h4>
        </div>
    </Link>
);

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';

interface ArticleMeta {
    slug: string;
    title: string;
    description: string;
    coverImage: string;
    category: string;
    tags: string[];
}

/**
 * ソシオニクスOSコード → 16Personalities/MBTI表記の変換マップ
 */
const OS_TO_MBTI: Record<string, string> = {
    'INTp': 'INTJ', 'ENTp': 'ENTP', 'INFp': 'INFJ', 'ENFp': 'ENFP',
    'ISTj': 'ISTJ', 'ESTj': 'ESTJ', 'ISFj': 'ISFJ', 'ESFj': 'ESFJ',
    'INTj': 'INTP', 'ENTj': 'ENTJ', 'INFj': 'INFP', 'ENFj': 'ENFJ',
    'ISTp': 'ISTP', 'ESTp': 'ESTP', 'ISFp': 'ISFP', 'ESFp': 'ESFP',
};

interface RelatedArticlesForResultProps {
    typeCode: string;
}

export const RelatedArticlesForResult: React.FC<RelatedArticlesForResultProps> = ({ typeCode }) => {
    const [articles, setArticles] = useState<ArticleMeta[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAndFilter = async () => {
            try {
                const res = await fetch('/data/articles-meta.json');
                const allArticles: ArticleMeta[] = await res.json();

                const mbtiCode = OS_TO_MBTI[typeCode] || typeCode;

                // タイプ名でフィルタ
                const matched = allArticles.filter(article => {
                    const titleMatch = article.title.toUpperCase().includes(mbtiCode.toUpperCase());
                    const tagMatch = article.tags.some(tag =>
                        tag.toUpperCase().includes(mbtiCode.toUpperCase())
                    );
                    const slugMatch = article.slug.toLowerCase().includes(mbtiCode.toLowerCase());
                    return titleMatch || tagMatch || slugMatch;
                });

                // マッチ4件、なければ最新4件
                setArticles(matched.length > 0 ? matched.slice(0, 4) : allArticles.slice(0, 4));
            } catch {
                console.error('Failed to load articles metadata');
            } finally {
                setLoading(false);
            }
        };

        fetchAndFilter();
    }, [typeCode]);

    if (loading) {
        return (
            <div className="mt-12 flex justify-center">
                <div className="w-6 h-6 border-2 border-prisma-200 border-t-prisma-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (articles.length === 0) return null;

    return (
        <div className="mt-12 pt-8 border-t border-slate-200/50">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-6">
                <BookOpen size={18} className="text-prisma-500" />
                あなたのタイプに関する記事
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {articles.map(article => (
                    <Link
                        key={article.slug}
                        href={`/articles/${article.slug}`}
                        className="group flex gap-3 bg-white/80 rounded-xl p-3 border border-slate-100 hover:border-prisma-200 hover:bg-white transition-all duration-200 backdrop-blur-sm"
                    >
                        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-200 relative">
                            {article.coverImage ? (
                                <Image
                                    src={article.coverImage}
                                    alt={article.title}
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
                                {article.category}
                            </span>
                            <h4 className="text-sm font-bold text-slate-800 mt-1 leading-snug line-clamp-2 group-hover:text-prisma-600 transition-colors">
                                {article.title}
                            </h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

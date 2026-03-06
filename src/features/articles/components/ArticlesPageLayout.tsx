import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';

interface ArticlesPageLayoutProps {
    /** 現在のページ番号（2ページ目以降の表示用） */
    currentPage?: number;
    children: React.ReactNode;
}

/**
 * 記事一覧ページの共通レイアウト
 *
 * ヘッダー（Back + Title）とヒーローセクション（h1 + description）を
 * articles/page.tsx と articles/page/[page]/page.tsx で共有する。
 */
export function ArticlesPageLayout({ currentPage, children }: ArticlesPageLayoutProps) {
    const pageLabel = currentPage && currentPage > 1 ? `（${currentPage}ページ目）` : '';

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="absolute inset-0 bg-white border-b border-slate-200 w-screen left-1/2 -translate-x-1/2 -z-10" aria-hidden="true" />
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
                        自己理解と他者理解を深め、才能を仕事に活かすためのヒントをお届けします。{pageLabel}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl md:max-w-5xl xl:max-w-[1200px] mx-auto px-4 mt-12">
                {children}
            </div>
        </div>
    );
}

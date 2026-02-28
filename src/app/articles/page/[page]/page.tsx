import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { getAllArticles } from '@/features/articles/utils/mdx';
import { ArticleList } from '@/features/articles/components/ArticleList';
import { notFound } from 'next/navigation';

type Props = {
    params: Promise<{ page: string }>;
};

export async function generateStaticParams() {
    const articles = getAllArticles();
    const totalPages = Math.ceil(articles.length / 10);

    const params = [];
    // 1ページ目は /articles にあたるため生成しない
    for (let i = 2; i <= totalPages; i++) {
        params.push({ page: i.toString() });
    }

    return params;
}

export async function generateMetadata({ params }: Props) {
    const { page } = await params;
    return {
        title: `コラム一覧（${page}ページ目） | Aqsh Prisma - 16性格診断で才能と適職を見つける`,
        description: `16性格診断（ソシオニクス）を活用した自己分析、チームビルディング、適職探しに役立つコラムや記事の一覧です。（${page}ページ目）`,
    };
}

export default async function ArticlesPaginationPage({ params }: Props) {
    const { page } = await params;
    const pageValue = parseInt(page, 10);

    if (isNaN(pageValue) || pageValue < 2) {
        notFound();
    }

    const articles = getAllArticles();
    const totalPages = Math.ceil(articles.length / 10);

    if (pageValue > totalPages) {
        notFound();
    }

    const startIndex = (pageValue - 1) * 10;
    const endIndex = startIndex + 10;
    const currentArticles = articles.slice(startIndex, endIndex);

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
                        自己理解と他者理解を深め、才能を仕事に活かすためのヒントをお届けします。（{pageValue}ページ目）
                    </p>
                </div>
            </div>

            {/* Article List */}
            <div className="max-w-3xl md:max-w-5xl xl:max-w-[1200px] mx-auto px-4 mt-12">
                <ArticleList
                    articles={currentArticles}
                    currentPage={pageValue}
                    totalPages={totalPages}
                    basePath="/articles/page"
                    defaultPath="/articles"
                />
            </div>
        </div>
    );
}

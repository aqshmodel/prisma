
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllArticles } from '../../features/articles/utils/mdx';
import { ArticleList } from '../../features/articles/components/ArticleList';
import { ArrowLeft, BookOpen } from 'lucide-react';

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
                    {/* 背景だけを画面幅いっぱいに引き延ばすフルブリードハック */}
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
                            自己理解と他者理解を深め、才能を仕事に活かすためのヒントをお届けします。
                        </p>
                    </div>
                </div>

                {/* Article List */}
                <div className="max-w-3xl md:max-w-5xl xl:max-w-[1200px] mx-auto px-4 mt-12">
                    <ArticleList
                        articles={articles.slice(0, 10)}
                        currentPage={1}
                        totalPages={Math.ceil(articles.length / 10)}
                        basePath="/articles/page"
                        defaultPath="/articles"
                    />
                </div>
            </div>
        </>
    );
}

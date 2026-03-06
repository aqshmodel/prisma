import { getAllArticles } from '@/features/articles/utils/mdx';
import { ArticleList } from '@/features/articles/components/ArticleList';
import { ArticleFilter } from '@/features/articles/components/ArticleFilter';
import { ArticlesPageLayout } from '@/features/articles/components/ArticlesPageLayout';
import { ARTICLES_PER_PAGE } from '@/lib/constants/articles';
import { notFound } from 'next/navigation';

type Props = {
    params: Promise<{ page: string }>;
};

export async function generateStaticParams() {
    const articles = getAllArticles();
    const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

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
    const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

    if (pageValue > totalPages) {
        notFound();
    }

    const startIndex = (pageValue - 1) * ARTICLES_PER_PAGE;
    const endIndex = startIndex + ARTICLES_PER_PAGE;
    const currentArticles = articles.slice(startIndex, endIndex);

    return (
        <ArticlesPageLayout currentPage={pageValue}>
            <ArticleFilter articles={articles}>
                <ArticleList
                    articles={currentArticles}
                    currentPage={pageValue}
                    totalPages={totalPages}
                    basePath="/articles/page"
                    defaultPath="/articles"
                />
            </ArticleFilter>
        </ArticlesPageLayout>
    );
}

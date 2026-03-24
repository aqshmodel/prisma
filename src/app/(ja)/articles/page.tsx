import type { Metadata } from 'next';
import { getAllArticles } from '@/features/articles/utils/mdx';
import { ArticleList } from '@/features/articles/components/ArticleList';
import { ArticleFilter } from '@/features/articles/components/ArticleFilter';
import { ArticlesPageLayout } from '@/features/articles/components/ArticlesPageLayout';
import { buildUrl } from '@/lib/constants/site-config';
import { ARTICLES_PER_PAGE } from '@/lib/constants/articles';

/**
 * 記事一覧ページの静的メタデータ
 * SEO向上のため、Canonical（正規URL）を明示しています。
 */
export const metadata: Metadata = {
    title: 'コラム一覧 | Aqsh Prisma - 16性格診断で才能と適職を見つける',
    description: '16性格診断（ソシオニクス）を活用した自己分析、チームビルディング、適職探しに役立つコラムや記事の一覧です。',
    alternates: {
        canonical: buildUrl('/articles'),
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
            "url": buildUrl(`/articles/${article.slug}`)
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ArticlesPageLayout>
                <ArticleFilter articles={articles}>
                    <ArticleList
                        articles={articles.slice(0, ARTICLES_PER_PAGE)}
                        currentPage={1}
                        totalPages={Math.ceil(articles.length / ARTICLES_PER_PAGE)}
                        basePath="/articles/page"
                        defaultPath="/articles"
                    />
                </ArticleFilter>
            </ArticlesPageLayout>
        </>
    );
}

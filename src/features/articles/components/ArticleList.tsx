import type { ArticleMetadata } from '@/features/articles/utils/mdx';
import { ArticleCardLarge } from './ArticleCard';
import { Pagination } from './Pagination';

interface ArticleListProps {
    articles: ArticleMetadata[];
    currentPage: number;
    totalPages: number;
    basePath: string;
    defaultPath?: string;
}

/**
 * ページネーション付き記事一覧コンポーネント（Server Component）
 *
 * 記事カードの表示は ArticleCardLarge に委譲し、
 * ページネーションの制御に責任を持つ。
 */
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
                    <ArticleCardLarge
                        key={article.slug}
                        slug={article.slug}
                        title={article.title}
                        description={article.description}
                        coverImage={article.coverImage}
                        category={article.category}
                        date={article.date}
                        updatedAt={article.updatedAt}
                        author={article.author || 'Aqsh Prisma Team'}
                    />
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

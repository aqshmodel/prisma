import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ArticleList } from '@/features/articles/components/ArticleList';
import type { ArticleMetadata } from '@/features/articles/utils/mdx';

// Mocks
const mockArticles: ArticleMetadata[] = [
    {
        slug: 'article-1',
        title: 'Test Article 1',
        description: 'Test Desc 1',
        date: '2023-01-01',
        coverImage: '',
        author: 'Author 1',
        category: 'Category 1',
        tags: [],
    },
    {
        slug: 'article-2',
        title: 'Test Article 2',
        description: 'Test Desc 2',
        date: '2023-01-02',
        coverImage: '',
        author: 'Author 2',
        category: 'Category 2',
        tags: [],
    },
];

describe('ArticleList Component', () => {
    it('renders a list of articles', () => {
        render(
            <ArticleList
                articles={mockArticles}
                currentPage={1}
                totalPages={5}
                basePath="/articles/page"
            />
        );

        // Check if articles are rendered
        expect(screen.getByText('Test Article 1')).toBeInTheDocument();
        expect(screen.getByText('Test Article 2')).toBeInTheDocument();
    });

    it('renders Pagination component when totalPages > 1', () => {
        render(
            <ArticleList
                articles={mockArticles}
                currentPage={2}
                totalPages={5}
                basePath="/articles/page"
            />
        );

        // Pagination should be rendered - check for pagination info text
        expect(screen.getByTestId('pagination-info')).toHaveTextContent('2 / 5');
    });

    it('handles empty articles gracefully', () => {
        render(
            <ArticleList
                articles={[]}
                currentPage={1}
                totalPages={0}
                basePath="/articles/page"
            />
        );

        expect(screen.getByText(/記事が公開されていません/)).toBeInTheDocument();
    });
});

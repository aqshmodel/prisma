import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Pagination } from '@/features/articles/components/Pagination';

describe('Pagination Component', () => {
    it('renders correct pagination links for middle pages', () => {
        // Current page: 50, Total pages: 100
        render(<Pagination currentPage={50} totalPages={100} basePath="/articles/page" />);

        // Previous link should point to page 49
        const prevLink = screen.getByRole('link', { name: /前へ/ });
        expect(prevLink).toHaveAttribute('href', '/articles/page/49');

        // Next link should point to page 51
        const nextLink = screen.getByRole('link', { name: /次へ/ });
        expect(nextLink).toHaveAttribute('href', '/articles/page/51');

        // Current page text
        expect(screen.getByTestId('pagination-info')).toHaveTextContent('50 / 100');
    });

    it('does not render "previous" link on the first page', () => {
        render(<Pagination currentPage={1} totalPages={100} basePath="/articles/page" />);

        const prevLink = screen.queryByRole('link', { name: /前へ/ });
        expect(prevLink).not.toBeInTheDocument();
    });

    it('does not render "next" link on the last page', () => {
        render(<Pagination currentPage={100} totalPages={100} basePath="/articles/page" />);

        const nextLink = screen.queryByRole('link', { name: /次へ/ });
        expect(nextLink).not.toBeInTheDocument();
    });

    it('points to defaultPath for page 1 if provided', () => {
        render(
            <Pagination
                currentPage={2}
                totalPages={10}
                basePath="/articles/page"
                defaultPath="/articles"
            />
        );

        // When on page 2, the previous link is page 1. Since defaultPath is provided, it should point to '/articles' instead of '/articles/page/1'
        const prevLink = screen.getByRole('link', { name: /前へ/ });
        expect(prevLink).toHaveAttribute('href', '/articles');
    });
});

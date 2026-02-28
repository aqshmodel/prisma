import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
    defaultPath?: string;
}

export function Pagination({ currentPage, totalPages, basePath, defaultPath }: PaginationProps) {
    if (totalPages <= 1) return null;

    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;

    const getPrevHref = () => {
        if (prevPage === 1 && defaultPath) return defaultPath;
        return `${basePath}/${prevPage}`;
    };

    return (
        <nav className="flex justify-center items-center space-x-4 py-10" aria-label="Pagination">
            {currentPage > 1 ? (
                <Link
                    href={getPrevHref()}
                    className="px-6 py-3 font-bold text-slate-600 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800 transition-all flex items-center gap-2"
                >
                    &larr; 前へ
                </Link>
            ) : (
                <span className="px-6 py-3 font-bold text-slate-300 bg-slate-50 border-2 border-slate-100 rounded-xl cursor-not-allowed flex items-center gap-2 select-none">
                    &larr; 前へ
                </span>
            )}

            <span data-testid="pagination-info" className="text-slate-500 font-bold px-4">
                {currentPage} <span className="text-slate-300 font-normal">/</span> {totalPages}
            </span>

            {currentPage < totalPages ? (
                <Link
                    href={`${basePath}/${nextPage}`}
                    className="px-6 py-3 font-bold text-slate-600 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800 transition-all flex items-center gap-2"
                >
                    次へ &rarr;
                </Link>
            ) : (
                <span className="px-6 py-3 font-bold text-slate-300 bg-slate-50 border-2 border-slate-100 rounded-xl cursor-not-allowed flex items-center gap-2 select-none">
                    次へ &rarr;
                </span>
            )}
        </nav>
    );
}

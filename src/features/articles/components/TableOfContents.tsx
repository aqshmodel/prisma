import React from 'react';
import { List } from 'lucide-react';
import type { Heading } from '../utils/extractHeadings';

interface TableOfContentsProps {
    headings: Heading[];
}

/**
 * h2見出しベースの目次コンポーネント。
 * h2が3つ未満の場合は非表示。
 */
export const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
    if (headings.length < 3) return null;

    return (
        <nav
            aria-label="目次"
            className="not-prose my-8 bg-slate-50 border border-slate-200 rounded-xl p-5"
        >
            <p className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                <List size={16} className="text-prisma-500" />
                この記事の目次
            </p>
            <ol className="space-y-1.5">
                {headings.map((heading, index) => (
                    <li key={heading.id}>
                        <a
                            href={`#${heading.id}`}
                            className="flex items-start gap-2 text-sm text-slate-600 hover:text-prisma-600 transition-colors leading-snug"
                        >
                            <span className="text-prisma-400 font-medium flex-shrink-0 mt-px">
                                {index + 1}.
                            </span>
                            <span>{heading.text}</span>
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

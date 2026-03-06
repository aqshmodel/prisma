'use client';

import React, { useState, useEffect } from 'react';
import { List } from 'lucide-react';
import type { Heading } from '../utils/extractHeadings';

interface TableOfContentsProps {
    headings: Heading[];
}

/**
 * h2見出しベースの目次コンポーネント。
 * h2が3つ未満の場合は非表示。
 * スムーズスクロール + 現在位置ハイライト対応。
 */
export const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        if (headings.length < 3) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // 画面内に入った見出しのうち最初のものをアクティブに
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                        break;
                    }
                }
            },
            { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
        );

        const elements = headings
            .map(h => document.getElementById(h.id))
            .filter(Boolean) as HTMLElement[];

        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length < 3) return null;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // URLハッシュも更新
            window.history.pushState(null, '', `#${id}`);
            setActiveId(id);
        }
    };

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
                            onClick={(e) => handleClick(e, heading.id)}
                            className={`flex items-start gap-2 text-sm transition-colors leading-snug ${activeId === heading.id
                                    ? 'text-prisma-600 font-semibold'
                                    : 'text-slate-600 hover:text-prisma-600'
                                }`}
                        >
                            <span className={`font-medium flex-shrink-0 mt-px ${activeId === heading.id ? 'text-prisma-600' : 'text-prisma-400'
                                }`}>
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

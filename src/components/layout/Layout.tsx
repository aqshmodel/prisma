'use client';

import React, { type ReactNode } from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const isTopPage = pathname === '/';

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-prisma-200">
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-prisma-100 h-16 flex items-center justify-center">
                <Link href="/" className="text-xl font-bold text-prisma-700 tracking-wider hover:opacity-80 transition-opacity">
                    Aqsh PRISMA
                </Link>
            </header>

            <main className={cn(
                "pt-16 min-h-[calc(100vh-60px)] flex flex-col",
                !isTopPage && "px-4 w-full md:max-w-[1200px] mx-auto pb-12 pt-24"
            )}>
                <div
                    className="flex-grow flex flex-col w-full"
                >
                    {children}
                </div>
            </main>

            <footer className="py-6 text-center text-slate-400 text-sm">
                © 2026 Aqsh PRISMA. All rights reserved.
            </footer>
        </div>
    );
};

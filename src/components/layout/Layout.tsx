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
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-prisma-200 flex flex-col">
            <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
                <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm supports-[backdrop-filter]:bg-white/60" />
                <div className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-serif font-bold text-slate-800 tracking-tight hover:opacity-70 transition-opacity">
                        Aqsh <span className="text-prisma-600">PRISMA</span>
                    </Link>
                    {/* Future: Add Nav Links here */}
                </div>
            </header>

            <main className={cn(
                "pt-16 flex-grow flex flex-col",
                !isTopPage && "px-4 w-full md:max-w-[1200px] mx-auto pb-12 pt-24"
            )}>
                <div
                    className="flex-grow flex flex-col w-full"
                >
                    {children}
                </div>
            </main>

            <footer className="bg-[#0B0F17] text-white py-12 border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
                        <div className="text-center md:text-left">
                            <Link href="/" className="text-2xl font-serif font-bold tracking-tight mb-2 inline-block">
                                Aqsh <span className="text-prisma-400">PRISMA</span>
                            </Link>
                            <p className="text-slate-400 text-sm">
                                科学的な組織診断で、<br className="md:hidden" />
                                チームの可能性を最大化する。
                            </p>
                        </div>
                        <div className="flex gap-6 text-sm text-slate-400 font-medium">
                            <Link href="https://aqsh.co.jp/privacypolicy/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="https://aqsh.co.jp/aqsh-termofservice/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms of Service</Link>
                            <Link href="https://aqsh.co.jp/contact/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact</Link>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                        <p>© 2026 Aqsh PRISMA. All rights reserved.</p>
                        <p className="font-serif tracking-wider opacity-50">DESIGNED BY ANTIGRAVITY</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

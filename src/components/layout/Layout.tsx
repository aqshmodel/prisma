'use client';

import React, { useState, type ReactNode } from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CompatibilitySearchModal } from '@/components/common/CompatibilitySearchModal';

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const isTopPage = pathname === '/';
    const [isCompatibilityModalOpen, setIsCompatibilityModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-prisma-200 flex flex-col">
            <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
                <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm supports-[backdrop-filter]:bg-white/60" />
                <div className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-serif font-bold text-slate-800 tracking-tight hover:opacity-70 transition-opacity">
                        Aqsh <span className="text-prisma-600">PRISMA</span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm font-medium">
                        <button
                            onClick={() => setIsCompatibilityModalOpen(true)}
                            className="text-slate-600 hover:text-prisma-600 transition-colors focus:outline-none"
                        >
                            相性診断
                        </button>
                        <Link href="/articles" className="text-slate-600 hover:text-prisma-600 transition-colors">
                            コラム
                        </Link>
                        <Link href="/glossary" className="text-slate-600 hover:text-prisma-600 transition-colors">
                            用語集
                        </Link>
                    </nav>
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

            <footer className="bg-[#0B0F17] text-slate-300 py-16 md:py-24 border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-prisma-500/20 to-transparent" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-prisma-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
                        {/* Brand & Concept */}
                        <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
                            <Link href="/" className="text-3xl font-serif font-bold tracking-tight mb-4 inline-block hover:opacity-80 transition-opacity">
                                Aqsh <span className="text-prisma-400">PRISMA</span>
                            </Link>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-8">
                                科学的な組織診断と性格分析で、<br />
                                チームの可能性を最大化し、個人の生きづらさを解消する。
                            </p>
                            <div className="flex gap-4">
                                <a href="https://aqsh.co.jp/" target="_blank" rel="noopener noreferrer" className="text-xs font-medium px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 hover:text-white transition-all">
                                    運営会社: Aqsh株式会社
                                </a>
                            </div>
                        </div>

                        {/* Navigation Columns */}
                        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
                            {/* Service */}
                            <div className="flex flex-col gap-4">
                                <h4 className="text-white font-bold tracking-wider mb-2">サービス</h4>
                                <button
                                    onClick={() => setIsCompatibilityModalOpen(true)}
                                    className="text-left text-slate-400 hover:text-prisma-400 transition-colors focus:outline-none"
                                >
                                    相性診断
                                </button>
                                <Link href="/#types" className="text-slate-400 hover:text-prisma-400 transition-colors">タイプ一覧</Link>
                                <Link href="/articles" className="text-slate-400 hover:text-prisma-400 transition-colors">コラム一覧</Link>
                                <Link href="/glossary" className="text-slate-400 hover:text-prisma-400 transition-colors">用語集</Link>
                            </div>

                            {/* About */}
                            <div className="flex flex-col gap-4">
                                <h4 className="text-white font-bold tracking-wider mb-2">About</h4>
                                <Link href="/about/methodology" className="text-slate-400 hover:text-prisma-400 transition-colors">診断ロジック</Link>
                                <Link href="/about/enneagram" className="text-slate-400 hover:text-prisma-400 transition-colors">エニアグラムとは</Link>
                                <Link href="/about/socionics" className="text-slate-400 hover:text-prisma-400 transition-colors">ソシオニクスとは</Link>
                                <Link href="/about/editorial-policy" className="text-slate-400 hover:text-prisma-400 transition-colors">編集方針</Link>
                            </div>

                            {/* Legal */}
                            <div className="flex flex-col gap-4">
                                <h4 className="text-white font-bold tracking-wider mb-2">規約・サポート</h4>
                                <Link href="/terms" className="text-slate-400 hover:text-prisma-400 transition-colors">利用規約</Link>
                                <Link href="/privacy" className="text-slate-400 hover:text-prisma-400 transition-colors">プライバシーポリシー</Link>
                                <Link href="https://aqsh.co.jp/contact/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-prisma-400 transition-colors">お問い合わせ</Link>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Copyright */}
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                        <p>© {new Date().getFullYear()} Aqsh PRISMA. All rights reserved.</p>
                        <p className="font-serif tracking-widest opacity-50">DESIGNED BY ANTIGRAVITY</p>
                    </div>
                </div>
            </footer>

            <CompatibilitySearchModal
                isOpen={isCompatibilityModalOpen}
                onClose={() => setIsCompatibilityModalOpen(false)}
            />
        </div>
    );
};

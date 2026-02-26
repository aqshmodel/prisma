import React from 'react';
import Image from 'next/image';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeroSectionProps {
    onStart: () => void;
    onResume: () => void;
    onViewResult: () => void;
    hasProgress: boolean;
    hasResult: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStart, onResume, onViewResult, hasProgress, hasResult }) => {
    return (
        <section className="relative min-h-[calc(100vh-60px)] flex flex-col items-center justify-center overflow-hidden pt-8 pb-16 lg:py-16">
            {/* Background Decoration - Organic Shapes */}
            <div className="absolute inset-0 bg-[#f8fcfc] -z-20" /> {/* Slightly warmer/off-white background */}

            {/* Organic Shape 1 (Top Right) */}
            <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px] bg-gradient-to-br from-prisma-100/30 to-white/0 rounded-full blur-[100px] -z-10 opacity-50 mix-blend-multiply animate-[spin_60s_linear_infinite]" />

            {/* Organic Shape 2 (Bottom Left) */}
            <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-prisma-200/20 to-white/0 rounded-full blur-[120px] -z-10 opacity-50 mix-blend-multiply animate-[spin_45s_linear_infinite_reverse]" />

            <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 lg:gap-16 items-center relative z-10">
                {/* Left Content (Text) - Spans 7 cols */}
                <div
                    className="lg:col-span-7 flex flex-col items-start lg:items-start text-left lg:text-left space-y-6 md:space-y-10 animate-fade-in-up"
                >
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1 border-b border-prisma-500/30 text-prisma-700 text-xs font-serif tracking-[0.2em] uppercase mb-2 md:mb-4"
                    >
                        Aqsh Prisma Analysis
                    </div>

                    <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-tight lg:leading-[1.2] tracking-wide font-medium">
                        <br className="hidden lg:block" />
                        <span className="italic relative inline-block mr-2">
                            <span className="relative z-10 text-prisma-600 inline-block">真の駆動力</span>
                            <span className="absolute bottom-2 left-0 w-full h-2 lg:h-3 bg-prisma-200/40 -z-10 -rotate-1 rounded-sm"></span>
                        </span>
                        を、<br className="lg:hidden" />
                        <span className="inline-block">科学する。</span>
                    </h1>

                    <div className="max-w-lg lg:max-w-2xl text-left mx-auto lg:mx-0 space-y-6 md:space-y-8">
                        <p className="text-slate-600 text-base lg:text-lg leading-[1.8] md:leading-[2.2] font-normal tracking-wide">
                            <span className="inline-block">なぜ、あの人とは話が合わないのか。</span>
                            <span className="inline-block">優秀なメンバーが集まっても、なぜ<span className="text-prisma-600 font-bold">成果が出ない</span>のか。</span>
                            <br className="block my-2" />
                            <span className="inline-block">Aqsh Prismaは、ソシオニクスとビジネス心理学に基づき、</span>
                            <span className="inline-block">あなたの「認知パターン」と「モチベーションエンジン」を紐解きます。</span>
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 w-full pt-2 lg:pt-8 items-center justify-center lg:justify-start">
                        {hasProgress ? (
                            <Button
                                size="xl"
                                onClick={onResume}
                                className="w-full sm:w-auto min-w-[260px] bg-prisma-600 hover:bg-prisma-700 text-white rounded-full px-10 py-5 h-auto shadow-lg shadow-prisma-200/40 transition-transform hover:-translate-y-0.5"
                            >
                                <span className="flex flex-col items-center">
                                    <span className="text-sm font-serif tracking-widest opacity-90 mb-1">Resume Analysis</span>
                                    <span className="text-lg font-bold flex items-center gap-2">
                                        診断を再開する <ArrowRight className="w-4 h-4" />
                                    </span>
                                </span>
                            </Button>
                        ) : hasResult ? (
                            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                                <Button
                                    size="xl"
                                    onClick={onViewResult}
                                    className="w-full sm:w-auto min-w-[260px] bg-prisma-600 hover:bg-prisma-700 text-white rounded-full px-10 py-5 h-auto shadow-lg shadow-prisma-200/40 transition-transform hover:-translate-y-0.5"
                                >
                                    <span className="flex flex-col items-center">
                                        <span className="text-sm font-serif tracking-widest opacity-90 mb-1">View Result</span>
                                        <span className="text-lg font-bold flex items-center gap-2">
                                            最新の結果を見る <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </span>
                                </Button>
                                <Button
                                    size="xl"
                                    variant="outline"
                                    onClick={onStart}
                                    className="w-full sm:w-auto min-w-[260px] border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-full px-10 py-5 h-auto transition-transform hover:-translate-y-0.5"
                                >
                                    <span className="flex flex-col items-center">
                                        <span className="text-sm font-serif tracking-widest opacity-80 mb-1">Restart</span>
                                        <span className="text-lg font-bold flex items-center gap-2">
                                            新しく診断を始める
                                        </span>
                                    </span>
                                </Button>
                            </div>
                        ) : (
                            <Button
                                size="xl"
                                onClick={onStart}
                                className="w-full sm:w-auto min-w-[280px] bg-prisma-600 hover:bg-prisma-700 text-white rounded-full px-12 py-6 h-auto shadow-xl shadow-prisma-200/40 transition-transform hover:-translate-y-0.5"
                            >
                                <span className="flex flex-col items-center">
                                    <span className="text-xs font-serif tracking-[0.2em] uppercase opacity-90 mb-2">Free Analysis</span>
                                    <span className="text-xl font-bold flex items-center gap-3">
                                        無料で診断する <ArrowRight className="w-5 h-5" />
                                    </span>
                                </span>
                            </Button>
                        )}
                        <p className="text-xs text-slate-400 font-medium tracking-wider mt-2 font-serif">
                            所要時間：約 10分  |  登録不要
                        </p>
                    </div>
                </div>

                {/* Right Image - Spans 5 cols - HIDDEN ON MOBILE */}
                <div className="hidden lg:col-span-5 relative w-full aspect-[3/4] lg:aspect-auto lg:h-[700px] lg:flex items-center justify-center lg:justify-end animate-fade-in-up stagger-2">
                    <div className="relative w-full h-full max-w-[500px] mx-auto">
                        {/* Image Frame - Arch Shape or Organic */}
                        <div className="absolute inset-0 border border-prisma-200 rounded-[100px_100px_0_0] lg:rounded-[200px_200px_0_0] -translate-x-4 translate-y-4 -z-10" />
                        <div className="relative w-full h-full bg-slate-100 rounded-[100px_100px_0_0] lg:rounded-[200px_200px_0_0] overflow-hidden shadow-2xl shadow-prisma-100/50">
                            <Image
                                src="/hero-image.png"
                                alt="Prisma Analysis"
                                fill
                                className="object-cover object-center opacity-90 hover:scale-105 transition-transform duration-[2s] ease-out mix-blend-multiply"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-prisma-900/10 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Minimal (Hidden on Mobile) */}
            <div
                className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-3 text-slate-300 animate-bounce"
            >
                <span className="text-[10px] tracking-[0.3em] uppercase font-serif">Scroll</span>
                <div className="w-[1px] h-16 bg-slate-300" />
            </div>
        </section>
    );
};

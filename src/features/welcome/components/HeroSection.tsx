import React from 'react';

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
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-20">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white -z-10" />
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
                <div
                    className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] rounded-full bg-prisma-100 blur-3xl opacity-40 animate-pulse"
                    style={{ animationDuration: '4s' }}
                />
                <div
                    className="absolute top-[30%] -left-[5%] w-[400px] h-[400px] rounded-full bg-teal-50 blur-3xl opacity-40 animate-pulse"
                    style={{ animationDuration: '5s', animationDelay: '1s' }}
                />
                <div
                    className="absolute bottom-[0%] left-[10%] w-[300px] h-[300px] rounded-full bg-slate-100 blur-3xl opacity-30 animate-pulse"
                    style={{ animationDuration: '6s', animationDelay: '2s' }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Content */}
                <div
                    className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:space-y-10 animate-fade-in-up"
                >
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-prisma-50/80 border border-prisma-100 text-prisma-700 text-sm font-bold tracking-wide"
                    >
                        <span className="text-prisma-600">
                            Aqsh Prisma
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                        あなたの<br className="hidden lg:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-prisma-500 to-teal-600">
                            真の駆動力
                        </span>を<br />
                        科学する。
                    </h1>

                    <div className="max-w-lg lg:max-w-xl text-left mx-auto lg:mx-0 space-y-6">
                        <p className="text-slate-600 text-lg leading-loose font-medium">
                            なぜ、あの人とは話が噛み合わないのか？<br />
                            なぜ、チームの熱量は上がらないのか？
                        </p>
                        <p className="text-slate-500 text-base leading-relaxed">
                            Aqsh Prismaは、ソシオニクスとビジネス心理学に基づき、
                            あなたの<span className="font-bold text-prisma-600">「認知パターン」</span>と
                            <span className="font-bold text-prisma-600">「モチベーションエンジン」</span>を可視化。
                            組織の見えない摩擦を解消し、爆発的なシナジーを生み出します。
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 w-full pt-4 items-center justify-center lg:justify-start">
                        {hasProgress ? (
                            <Button
                                size="xl"
                                onClick={onResume}
                                className="w-full sm:w-auto min-w-[240px] shadow-xl shadow-orange-200/50 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 border-none text-white px-8 py-4 h-auto"
                            >
                                <span className="flex flex-col items-start text-left">
                                    <span className="text-sm font-normal opacity-90">中断したところから</span>
                                    <span className="text-lg font-bold flex items-center gap-2">
                                        診断を再開する <ArrowRight className="w-5 h-5" />
                                    </span>
                                </span>
                            </Button>
                        ) : hasResult ? (
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <Button
                                    size="xl"
                                    onClick={onViewResult}
                                    className="w-full sm:w-auto min-w-[240px] shadow-xl shadow-teal-200/50 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 border-none text-white px-8 py-4 h-auto group"
                                >
                                    <span className="flex flex-col items-start text-left">
                                        <span className="text-sm font-normal opacity-90">診断済みの方はこちら</span>
                                        <span className="text-lg font-bold flex items-center gap-2">
                                            最新の結果を見る <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </span>
                                </Button>
                                <Button
                                    size="xl"
                                    variant="outline"
                                    onClick={onStart}
                                    className="w-full sm:w-auto min-w-[240px] border-2 border-prisma-200 text-prisma-600 hover:bg-prisma-50 hover:border-prisma-300 px-8 py-4 h-auto"
                                >
                                    <span className="flex flex-col items-start text-left">
                                        <span className="text-sm font-normal opacity-80">もう一度診断する</span>
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
                                className="w-full sm:w-auto min-w-[280px] shadow-2xl shadow-prisma-200/50 bg-gradient-to-r from-prisma-500 to-teal-500 hover:from-prisma-600 hover:to-teal-600 border-none text-white px-10 py-5 h-auto group relative overflow-hidden"
                            >
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                <span className="relative flex flex-col items-start text-left">
                                    <span className="text-xs font-bold tracking-widest uppercase opacity-80 mb-0.5">Free Analysis</span>
                                    <span className="text-xl font-bold flex items-center gap-2">
                                        無料で診断する <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </span>
                            </Button>
                        )}
                        <div className="flex flex-col gap-1 items-center lg:items-start pl-2">
                            <p className="text-xs text-slate-400 font-medium">
                                所要時間：約 5分 | 登録不要
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div
                    className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-auto lg:h-[600px] flex items-center justify-center p-4 lg:p-0 animate-scale-in stagger-2"
                >
                    <div className="relative w-full h-full max-w-[600px] mx-auto flex items-center justify-center">
                        {/* Blob Background */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-teal-100 rounded-full blur-3xl opacity-30 animate-pulse-slow" />

                        {/* Main Image */}
                        <img
                            src="/hero-image.png"
                            alt="Prisma Analysis Abstract Visualization"
                            className="relative w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out z-10"
                        />
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 animate-bounce"
            >
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-slate-400 to-transparent" />
            </div>
        </section>
    );
};

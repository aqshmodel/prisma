'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Target } from 'lucide-react';

/**
 * ミニ診断への導線セクション
 * ヒーローセクション直下に配置し、フル診断への前段階として機能
 */
export const MiniDiagnosisSection: React.FC = () => {
    return (
        <section className="relative py-12 md:py-16 bg-gradient-to-b from-white to-slate-50/50">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-8">
                    <p className="text-xs font-serif tracking-[0.2em] uppercase text-teal-500 mb-2">
                        Quick Start
                    </p>
                    <h2 className="text-xl sm:text-2xl font-serif font-medium text-slate-800">
                        まずは気軽に試してみませんか？
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {/* 4象限クイック診断 */}
                    <Link
                        href="/mini-diagnosis/"
                        className="group relative bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-teal-200 transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100/50 border border-teal-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <Zap className="w-6 h-6 text-teal-500" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-800 mb-1 group-hover:text-teal-600 transition-colors">
                                    4象限クイック診断
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                    10問・約3分であなたの思考パターンの象限（α・β・γ・δ）がわかります。
                                </p>
                                <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-500 group-hover:translate-x-1 transition-transform">
                                    ⚡ すぐに始める →
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* タイプ絞り込みクイズ */}
                    <Link
                        href="/type-quiz/"
                        className="group relative bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-teal-200 transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100/50 border border-teal-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <Target className="w-6 h-6 text-teal-500" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-800 mb-1 group-hover:text-teal-600 transition-colors">
                                    タイプ絞り込みクイズ
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                    5問・約2分であなたの16タイプを絞り込みます。
                                </p>
                                <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-500 group-hover:translate-x-1 transition-transform">
                                    🎯 すぐに始める →
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

'use client';

import React from 'react';
import Link from 'next/link';
import { Users, ArrowRight } from 'lucide-react';

/**
 * 記事末尾に表示する「相性ページへの導線」CTA
 * キャリア・働き方系の記事から、タイプ別相性ページへ誘導する。
 * GA4データ根拠: 相性ページは平均滞在4分・直帰率17%でサイト内最強のエンゲージメント。
 */
export const CompatibilityCTA: React.FC = () => {
    const handleClick = () => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'cta_click', {
                event_category: 'engagement',
                event_label: 'CompatibilityCTA',
                location: window.location.pathname,
            });
        }
    };

    return (
        <div className="my-12 not-prose">
            <div className="relative overflow-hidden rounded-2xl border border-prisma-200 bg-gradient-to-br from-prisma-50 via-white to-blue-50 p-6 md:p-8">
                {/* 背景装飾 */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-prisma-100/30 rounded-full blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-100/30 rounded-full blur-2xl" aria-hidden="true" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-prisma-500/10 flex items-center justify-center">
                        <Users className="w-7 h-7 text-prisma-600" />
                    </div>

                    {/* Text */}
                    <div className="flex-grow text-center md:text-left">
                        <h3 className="text-lg font-bold text-slate-800 mb-1">
                            あなたのタイプの「相性」を見てみませんか？
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            上司や部下、同僚との関係に悩んでいるなら、タイプ別の相性パターンがヒントになるかもしれません。
                        </p>
                    </div>

                    {/* Button */}
                    <Link
                        href="/articles/socionics-compatibility-how-to-check/"
                        onClick={handleClick}
                        className="flex-shrink-0 group flex items-center gap-2 bg-prisma-500 !text-white !no-underline px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-prisma-600 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
                    >
                        相性の調べ方を見る
                        <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform !text-white" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

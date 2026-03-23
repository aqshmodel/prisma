'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { TYPE_TO_QUADRA, QUADRA_TYPE_MAP } from '@/features/mini-diagnosis/data/mini-types';
import { QUADRANT_CONTENT } from '@/features/mini-diagnosis/data/quadrant-content';
import { SITE_CONFIG } from '@/lib/constants/site-config';
import { Button } from '@/components/ui/Button';
import type { OSTypeCode } from '@/types/diagnosis';
import { ArrowRight, Share2, RotateCcw, AlertCircle } from 'lucide-react';

export const QuizResultPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const typeCode = searchParams.get('type') as OSTypeCode | null;

    if (!typeCode || !OS_CONTENT[typeCode]) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-slate-500 mb-4">結果が見つかりませんでした。</p>
                    <Button onClick={() => router.push('/type-quiz/')}>もう一度クイズする</Button>
                </div>
            </div>
        );
    }

    const osData = OS_CONTENT[typeCode];
    const quadra = TYPE_TO_QUADRA[typeCode];
    const quadraContent = quadra ? QUADRANT_CONTENT[quadra] : null;

    const shareText = `タイプ絞り込みクイズの結果、私は「${osData.name}」でした！あなたは何タイプ？`;
    const shareUrl = `${SITE_CONFIG.baseUrl}/type-quiz/`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-white pb-20 relative">
            {/* Header */}
            <div className="relative z-10 pt-20 pb-12 px-4 text-center animate-fade-in-up">
                <div className="inline-block mb-4">
                    <span className="px-4 py-1 text-xs font-serif tracking-[0.2em] text-teal-800 border-b border-teal-300">
                        タイプ絞り込みクイズの結果
                    </span>
                </div>

                {/* Type Code */}
                <div className="mb-4">
                    <span className="text-6xl sm:text-8xl font-serif font-bold text-teal-600 tracking-tight drop-shadow-sm">
                        {typeCode}
                    </span>
                </div>

                {/* Type Name */}
                <h1 className="text-2xl sm:text-3xl font-serif font-medium text-slate-800 mb-2">
                    {osData.name}
                </h1>
                <p className="text-lg text-slate-600 font-serif opacity-90 max-w-xl mx-auto leading-relaxed mb-6">
                    {osData.catchphrase}
                </p>

                {/* 注意書き */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-xs text-amber-700">
                    <AlertCircle size={14} />
                    <span>これは簡易判定です。フル診断で正確なタイプを確認できます。</span>
                </div>

                {/* Share */}
                <div className="flex items-center justify-center gap-3 mt-6">
                    <button
                        onClick={() => {
                            window.open(
                                `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}&hashtags=タイプ診断,性格診断`,
                                '_blank'
                            );
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-black/80 text-white text-xs font-medium rounded-full hover:bg-black transition-colors"
                    >
                        <Share2 size={13} />
                        Xでシェア
                    </button>
                    <button
                        onClick={() => {
                            window.open(
                                `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`,
                                '_blank'
                            );
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#06C755] text-white text-xs font-medium rounded-full hover:bg-[#05b34c] transition-colors"
                    >
                        LINE
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-[1200px] mx-auto px-4 relative z-10">
                {/* あるある */}
                {osData.aruaru && osData.aruaru.length > 0 && (
                    <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm mb-8 animate-fade-in-up">
                        <h3 className="text-lg font-serif font-bold text-slate-800 mb-4">
                            😂 {osData.name}の「あるある」
                        </h3>
                        <ul className="space-y-3">
                            {osData.aruaru.slice(0, 4).map((item: string, i: number) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold bg-teal-100 text-teal-600 flex-shrink-0">
                                        {i + 1}
                                    </span>
                                    <span className="text-slate-700 leading-relaxed text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Quadra情報 */}
                {quadraContent && (
                    <div className="bg-gradient-to-r from-teal-50 to-teal-100/50 border border-teal-100 rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up">
                        <h3 className="text-sm font-bold text-teal-500 uppercase tracking-wider mb-2">
                            所属する象限
                        </h3>
                        <p className="text-base font-serif font-bold text-slate-800 mb-1">
                            {quadraContent.name}
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            {quadraContent.catchphrase}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {QUADRA_TYPE_MAP[quadra]?.map((code) => (
                                <span
                                    key={code}
                                    className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                                        code === typeCode
                                            ? 'bg-teal-600 text-white'
                                            : 'bg-white/80 text-slate-500 border border-slate-200'
                                    }`}
                                >
                                    {code}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* フル診断CTA */}
                <div className="bg-gradient-to-r from-teal-50 to-teal-100/60 border border-teal-200 rounded-2xl p-6 sm:p-8 text-center mb-8 animate-fade-in-up">
                    <h3 className="text-xl font-serif font-bold text-slate-800 mb-2">
                        本当にこのタイプ？確かめてみましょう
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 max-w-md mx-auto">
                        フル診断（72問・約10分）では、思考パターンだけでなく、行動エンジン・認知バイアスまで分析。
                        あなた専用の「取扱説明書」を生成します。
                    </p>
                    <div className="flex justify-center">
                        <Button
                            onClick={() => router.push('/diagnosis/')}
                            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-base font-bold"
                        >
                            フル診断を受ける（無料）
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-center gap-4">
                    <Button
                        variant="outline"
                        onClick={() => router.push('/type-quiz/')}
                        className="text-slate-500 hover:text-slate-700"
                    >
                        <RotateCcw size={16} className="mr-2" />
                        もう一度クイズする
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => router.push('/')}
                        className="text-slate-500 hover:text-slate-700"
                    >
                        トップに戻る
                    </Button>
                </div>
            </div>
        </div>
    );
};

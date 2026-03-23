'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { QUADRANT_CONTENT } from '../data/quadrant-content';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants/site-config';
import type { QuadrantType } from '../data/mini-types';
import { ArrowRight, Share2, RotateCcw } from 'lucide-react';

export const MiniResultPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const quadrant = searchParams.get('q') as QuadrantType | null;
    const merryScore = Number(searchParams.get('ms') || '0');
    const judiciousScore = Number(searchParams.get('js') || '0');

    if (!quadrant || !QUADRANT_CONTENT[quadrant]) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-slate-500 mb-4">結果が見つかりませんでした。</p>
                    <Button onClick={() => router.push('/mini-diagnosis/')}>もう一度診断する</Button>
                </div>
            </div>
        );
    }

    const content = QUADRANT_CONTENT[quadrant];

    const shareText = `私は${content.name}でした！あなたはどの象限？`;
    const shareUrl = `${SITE_CONFIG.baseUrl}/mini-diagnosis/`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-white pb-20 relative">
            {/* Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[600px] z-0 opacity-20 blur-[100px] bg-gradient-radial from-teal-400 to-teal-600" />
            </div>

            {/* Header */}
            <div className="relative z-10 pt-20 pb-12 px-4 text-center animate-fade-in-up">
                <div className="inline-block mb-4">
                    <span className="px-4 py-1 text-xs font-serif tracking-[0.2em] text-teal-800 border-b border-teal-300">
                        4象限クイック診断の結果
                    </span>
                </div>

                {/* Quadra Name */}
                <h1 className="text-4xl sm:text-6xl font-serif font-medium text-slate-900 leading-tight tracking-tight mb-4">
                    {content.name}
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 font-serif opacity-90 max-w-xl mx-auto leading-relaxed">
                    {content.catchphrase}
                </p>

                {/* Score Pills */}
                <div className="flex justify-center gap-3 mt-6">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600">
                        {merryScore >= 3 ? '🎉 楽天的' : '🎯 真剣'}（{merryScore}/5）
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600">
                        {judiciousScore >= 3 ? '🔍 慎重' : '⚡ 決断的'}（{judiciousScore}/5）
                    </span>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center justify-center gap-3 mt-6">
                    <button
                        onClick={() => {
                            window.open(
                                `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}&hashtags=4象限診断,性格診断`,
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
                {/* Description */}
                <div className="bg-gradient-to-r from-teal-50 to-teal-100/50 border border-teal-100 rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up">
                    <h2 className="text-lg font-serif font-bold text-teal-700 mb-3">この象限の特徴</h2>
                    <p className="text-slate-700 leading-relaxed">{content.description}</p>
                </div>

                {/* Values & Social Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm animate-fade-in-up">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                            価値観
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {content.values.map((v) => (
                                <span key={v} className="px-3 py-1 text-sm font-medium rounded-full bg-teal-100 text-teal-700">
                                    {v}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm animate-fade-in-up">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                            対人スタイル
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{content.socialStyle}</p>
                    </div>
                </div>

                {/* Characteristics */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm mb-8 animate-fade-in-up">
                    <h3 className="text-lg font-serif font-bold text-slate-800 mb-4">
                        💡 {content.name}の「あるある」
                    </h3>
                    <ul className="space-y-3">
                        {content.characteristics.map((c, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="mt-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold bg-teal-100 text-teal-700 flex-shrink-0">
                                    {i + 1}
                                </span>
                                <span className="text-slate-700 leading-relaxed">{c}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Belonging Types */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm mb-8 animate-fade-in-up">
                    <h3 className="text-lg font-serif font-bold text-slate-800 mb-2">
                        🧩 この象限に属する4タイプ
                    </h3>
                    <p className="text-sm text-slate-500 mb-5">
                        あなたはこの4タイプのいずれかです。フル診断で特定できます。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {content.types.map((typeCode) => {
                            const osData = OS_CONTENT[typeCode];
                            if (!osData) return null;
                            return (
                                <div
                                    key={typeCode}
                                    className="border border-slate-100 rounded-xl p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xl font-serif font-bold text-teal-600">
                                            {typeCode}
                                        </span>
                                        <span className="text-sm font-medium text-slate-700">
                                            {osData.name}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-2">
                                        {osData.catchphrase}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Full Diagnosis CTA */}
                <div className="bg-gradient-to-r from-teal-50 to-teal-100/60 border border-teal-200 rounded-2xl p-6 sm:p-8 text-center mb-8 animate-fade-in-up">
                    <h3 className="text-xl font-serif font-bold text-slate-800 mb-2">
                        もっと詳しく知りたいですか？
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 max-w-md mx-auto">
                        フル診断（72問・約10分）では、あなたの具体的なタイプ・行動エンジン・認知バイアスまで分析し、パーソナライズされた「取扱説明書」を生成します。
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
                        onClick={() => router.push('/mini-diagnosis/')}
                        className="text-slate-500 hover:text-slate-700"
                    >
                        <RotateCcw size={16} className="mr-2" />
                        もう一度診断する
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

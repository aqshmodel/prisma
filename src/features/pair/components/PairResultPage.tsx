'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Share2, RotateCcw, Heart, Briefcase, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants/site-config';
import type { OSTypeCode } from '@/types/diagnosis';
import type { RelationDefinition } from '@/lib/constants/compatibility';

interface Props {
    codeA: OSTypeCode;
    codeB: OSTypeCode;
    relation: RelationDefinition;
    concreteTip: string;
}

/** 星表示 */
function Stars({ count }: { count: number }) {
    return (
        <span className="text-2xl tracking-wider">
            {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < count ? 'text-yellow-400' : 'text-slate-200'}>★</span>
            ))}
        </span>
    );
}

export const PairResultPage: React.FC<Props> = ({ codeA, codeB, relation, concreteTip }) => {
    const dataA = OS_CONTENT[codeA];
    const dataB = OS_CONTENT[codeB];
    const nameA = dataA.name.split('(')[0].trim();
    const nameB = dataB.name.split('(')[0].trim();

    const shareUrl = `${SITE_CONFIG.baseUrl}/pair/result/${codeA}/${codeB}/`;
    const shareText = `${nameA}（${codeA}）×${nameB}（${codeB}）の相性は【${relation.name}】${relation.emoji}でした！あなたも相性を診断してみませんか？`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-white pb-20">
            {/* Header */}
            <div className="relative z-10 pt-16 pb-10 px-4 text-center animate-fade-in-up">
                <div className="inline-block mb-4">
                    <span className="px-4 py-1 text-xs font-serif tracking-[0.2em] text-teal-800 border-b border-teal-300">
                        ペア相性診断の結果
                    </span>
                </div>

                {/* Two Type Cards */}
                <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6">
                    <div className="text-center">
                        <p className="text-3xl sm:text-5xl font-serif font-bold text-teal-600">{codeA}</p>
                        <p className="text-sm sm:text-base font-serif text-slate-700 mt-1">{nameA}</p>
                    </div>
                    <span className="text-2xl sm:text-4xl text-slate-300 font-serif">×</span>
                    <div className="text-center">
                        <p className="text-3xl sm:text-5xl font-serif font-bold text-teal-600">{codeB}</p>
                        <p className="text-sm sm:text-base font-serif text-slate-700 mt-1">{nameB}</p>
                    </div>
                </div>

                {/* Relation Badge */}
                <div className="mb-4">
                    <span className="text-5xl">{relation.emoji}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-serif font-medium text-slate-900 leading-tight tracking-tight mb-3">
                    {relation.name}
                </h1>
                <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed mb-4">
                    {relation.summary}
                </p>
                <Stars count={relation.stars} />

                {/* Share */}
                <div className="flex items-center justify-center gap-3 mt-6">
                    <button
                        onClick={() => {
                            window.open(
                                `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}&hashtags=相性診断,16性格診断`,
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

            {/* Content */}
            <div className="max-w-[1200px] mx-auto px-4 relative z-10">
                {/* Overview */}
                <div className="bg-gradient-to-r from-teal-50 to-teal-100/50 border border-teal-100 rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up">
                    <h2 className="text-lg font-serif font-bold text-teal-700 mb-3">この関係について</h2>
                    {relation.overview.split('\n\n').map((p, i) => (
                        <p key={i} className="text-slate-700 leading-relaxed mb-3 last:mb-0">{p}</p>
                    ))}
                </div>

                {/* Strengths & Cautions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm animate-fade-in-up">
                        <h3 className="flex items-center gap-2 text-base font-bold text-emerald-700 mb-4">
                            <CheckCircle size={18} />
                            この関係の強み
                        </h3>
                        <ul className="space-y-2">
                            {relation.strengths.map((s, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">●</span>
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white border border-amber-100 rounded-2xl p-6 shadow-sm animate-fade-in-up">
                        <h3 className="flex items-center gap-2 text-base font-bold text-amber-700 mb-4">
                            <AlertTriangle size={18} />
                            注意ポイント
                        </h3>
                        <ul className="space-y-2">
                            {relation.cautions.map((c, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                    <span className="text-amber-400 mt-0.5 flex-shrink-0">●</span>
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Work Compatibility */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm mb-8 animate-fade-in-up">
                    <h3 className="flex items-center gap-2 text-lg font-serif font-bold text-slate-800 mb-4">
                        <Briefcase size={20} className="text-teal-500" />
                        仕事の相性
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">チームワーク</p>
                            <p className="text-sm text-slate-700 leading-relaxed">{relation.workCompatibility.teamDynamics}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">役割分担のコツ</p>
                            <p className="text-sm text-slate-700 leading-relaxed">{relation.workCompatibility.roleAdvice}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">⚠ 摩擦ポイント</p>
                            <p className="text-sm text-slate-700 leading-relaxed">{relation.workCompatibility.frictionPoint}</p>
                        </div>
                    </div>
                </div>

                {/* Love Compatibility */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm mb-8 animate-fade-in-up">
                    <h3 className="flex items-center gap-2 text-lg font-serif font-bold text-slate-800 mb-4">
                        <Heart size={20} className="text-rose-400" />
                        恋愛の相性
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">惹かれあうポイント</p>
                            <p className="text-sm text-slate-700 leading-relaxed">{relation.loveCompatibility.attraction}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">課題</p>
                            <p className="text-sm text-slate-700 leading-relaxed">{relation.loveCompatibility.challenge}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">💡 長続きのコツ</p>
                            <p className="text-sm text-slate-700 leading-relaxed">{relation.loveCompatibility.longevityTip}</p>
                        </div>
                    </div>
                </div>

                {/* Dos & Don'ts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm animate-fade-in-up">
                        <h3 className="flex items-center gap-2 text-base font-bold text-emerald-700 mb-4">
                            <CheckCircle size={18} />
                            やるべきこと
                        </h3>
                        <ul className="space-y-2">
                            {relation.dos.map((d, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                                    {d}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white border border-rose-100 rounded-2xl p-6 shadow-sm animate-fade-in-up">
                        <h3 className="flex items-center gap-2 text-base font-bold text-rose-700 mb-4">
                            <XCircle size={18} />
                            避けるべきこと
                        </h3>
                        <ul className="space-y-2">
                            {relation.donts.map((d, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                    <span className="text-rose-400 mt-0.5 flex-shrink-0">✗</span>
                                    {d}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Concrete Tip */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm mb-8 animate-fade-in-up">
                    <h3 className="text-lg font-serif font-bold text-slate-800 mb-3">💡 具体的なシーン例</h3>
                    <p className="text-sm text-slate-700 leading-relaxed">{concreteTip}</p>
                </div>

                {/* Direction Note (for asymmetric relations) */}
                {relation.directionNote && (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 animate-fade-in-up">
                        <p className="text-sm text-amber-800 leading-relaxed">
                            <span className="font-bold">⚠ 方向性に関する注意：</span>{relation.directionNote}
                        </p>
                    </div>
                )}

                {/* Detailed Type Pages CTA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <Link
                        href={`/types/${codeA}/compatibility/${codeB}/`}
                        className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow group"
                    >
                        <div>
                            <p className="text-xs text-teal-500 font-bold mb-1">{codeA}から見た相性</p>
                            <p className="text-sm font-medium text-slate-700 group-hover:text-teal-600 transition-colors">
                                {nameA}×{nameB}の詳細
                            </p>
                        </div>
                        <ArrowRight size={18} className="text-slate-300 group-hover:text-teal-500 transition-colors" />
                    </Link>
                    <Link
                        href={`/types/${codeB}/compatibility/${codeA}/`}
                        className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow group"
                    >
                        <div>
                            <p className="text-xs text-teal-500 font-bold mb-1">{codeB}から見た相性</p>
                            <p className="text-sm font-medium text-slate-700 group-hover:text-teal-600 transition-colors">
                                {nameB}×{nameA}の詳細
                            </p>
                        </div>
                        <ArrowRight size={18} className="text-slate-300 group-hover:text-teal-500 transition-colors" />
                    </Link>
                </div>

                {/* CTA - Invite someone else */}
                <div className="bg-gradient-to-r from-teal-50 to-teal-100/60 border border-teal-200 rounded-2xl p-6 sm:p-8 text-center mb-8 animate-fade-in-up">
                    <h3 className="text-xl font-serif font-bold text-slate-800 mb-2">
                        あなたも誰かとペア診断してみませんか？
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 max-w-md mx-auto">
                        恋人、友人、同僚…気になるあの人との相性を無料で診断できます。
                    </p>
                    <div className="flex justify-center">
                        <Link href="/diagnosis/">
                            <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-base font-bold">
                                無料で診断する
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-center gap-4">
                    <Link href="/">
                        <Button variant="outline" className="text-slate-500 hover:text-slate-700">
                            <RotateCcw size={16} className="mr-2" />
                            トップに戻る
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

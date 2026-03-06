'use client';

import React from 'react';
import Link from 'next/link';
import {
    Star,
    Briefcase,
    Heart,
    ThumbsUp,
    ThumbsDown,
    ChevronRight,
    ArrowLeft,
    Sparkles,
    Lightbulb,
    MessageCircleQuestion,
    Info,
} from 'lucide-react';
import type { OSTypeCode } from '@/types/diagnosis';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { RadarChart } from '@/features/result/components/RadarChart';
import { Card } from '@/components/ui/Card';
import { FormattedText } from '@/components/ui/FormattedText';
import { resolveColor } from '@/lib/constants/color-map';
import { getCompatibility, getAllCompatibilities, getPairConcreteTip } from '@/lib/constants/compatibility';
import { CompatibilityCard } from './CompatibilityCard';

interface CompatibilityPageProps {
    sourceCode: OSTypeCode;
    targetCode: OSTypeCode;
}

// --- 星評価表示コンポーネント ---
const StarRating: React.FC<{ stars: number; size?: number }> = ({ stars, size = 20 }) => (
    <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                size={size}
                className={i < stars ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}
            />
        ))}
    </div>
);

// --- セクション見出し ---
const SectionTitle: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3 font-serif">
        {icon}
        {title}
    </h2>
);

/**
 * タイプ別相性詳細ページ
 *
 * 9つのセクションで構成:
 * ①パンくず ②ヘッダー ③概要 ④強み/注意点 ⑤仕事 ⑥恋愛 ⑦DOs/DON'Ts ⑧他タイプ一覧 ⑨CTA
 */
export const CompatibilityPage: React.FC<CompatibilityPageProps> = ({
    sourceCode,
    targetCode,
}) => {
    const sourceData = OS_CONTENT[sourceCode];
    const targetData = OS_CONTENT[targetCode];
    const relation = getCompatibility(sourceCode, targetCode);
    const allCompats = getAllCompatibilities(sourceCode);

    if (!sourceData || !targetData) return null;

    const sourceColor = resolveColor(sourceData.color);
    const targetColor = resolveColor(targetData.color);

    return (
        <div className="max-w-4xl mx-auto">
            {/* ① パンくず */}
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 flex-wrap">
                <Link href="/" className="hover:text-prisma-600 transition-colors">TOP</Link>
                <ChevronRight size={14} />
                <Link href={`/types/${sourceCode}`} className="hover:text-prisma-600 transition-colors">
                    {sourceData.name}
                </Link>
                <ChevronRight size={14} />
                <span className="text-slate-600 font-medium">
                    × {targetData.name} の相性
                </span>
            </nav>

            {/* h1: SEO用のメイン見出し */}
            <h1 className="text-lg sm:text-xl font-bold text-slate-700 text-center mb-6 font-serif">
                {sourceData.name}と{targetData.name}の相性
            </h1>

            {/* ② ヘッダー: 2タイプ + 星評価 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    {/* タイプA */}
                    <div className="flex-1 text-center">
                        <div className="w-48 h-48 mx-auto mb-4">
                            <RadarChart data={sourceData.params} color={sourceColor} />
                        </div>
                        <Link
                            href={`/types/${sourceCode}`}
                            className="text-lg font-bold text-slate-800 hover:text-prisma-600 transition-colors font-serif"
                        >
                            {sourceData.name}
                        </Link>
                        <p className="text-sm text-slate-400 mt-1">{sourceCode}</p>
                    </div>

                    {/* 中央: 相性スコア */}
                    <div className="flex flex-col items-center gap-3 py-4">
                        <span className="text-3xl">{relation.emoji}</span>
                        <StarRating stars={relation.stars} size={24} />
                        <span className="text-lg font-bold text-slate-800 font-serif">
                            {relation.name}
                        </span>
                        <span className="text-xs text-slate-400">{relation.nameEn}</span>
                    </div>

                    {/* タイプB */}
                    <div className="flex-1 text-center">
                        <div className="w-48 h-48 mx-auto mb-4">
                            <RadarChart data={targetData.params} color={targetColor} />
                        </div>
                        <Link
                            href={`/types/${targetCode}`}
                            className="text-lg font-bold text-slate-800 hover:text-prisma-600 transition-colors font-serif"
                        >
                            {targetData.name}
                        </Link>
                        <p className="text-sm text-slate-400 mt-1">{targetCode}</p>
                    </div>
                </div>
            </div>

            {/* ③ 相性概要 */}
            <Card className="p-6 sm:p-8 mb-8">
                <SectionTitle
                    icon={<Sparkles size={22} className="text-prisma-500" />}
                    title="相性の全体像"
                />
                <div className="text-slate-700 leading-[1.9] whitespace-pre-line">
                    <FormattedText text={relation.overview} />
                </div>
            </Card>

            {/* ③-b 具体的なシーン例 */}
            <Card className="p-6 sm:p-8 mb-8 bg-violet-50/50 border-violet-100">
                <h3 className="text-base font-bold text-violet-800 mb-3 flex items-center gap-2">
                    <Lightbulb size={18} />
                    具体的なシーン例
                </h3>
                <p className="text-sm text-violet-900 leading-[1.9]">
                    <FormattedText text={getPairConcreteTip(sourceCode, targetCode)} />
                </p>
            </Card>

            {/* ③-c 方向性の解説（Benefit/Supervision） */}
            {relation.directionNote && (
                <Card className="p-6 sm:p-8 mb-8 bg-amber-50/50 border-amber-200">
                    <h3 className="text-base font-bold text-amber-800 mb-3 flex items-center gap-2">
                        <Info size={18} />
                        この関係の方向性について
                    </h3>
                    <p className="text-sm text-amber-900 leading-[1.9]">
                        <FormattedText text={relation.directionNote} />
                    </p>
                </Card>
            )}

            {/* ④ 強み / 注意点 */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6 bg-emerald-50/50 border-emerald-100">
                    <h3 className="text-base font-bold text-emerald-800 mb-4 flex items-center gap-2">
                        <ThumbsUp size={18} />
                        この関係の強み
                    </h3>
                    <ul className="space-y-3">
                        {relation.strengths.map((item, i) => (
                            <li key={i} className="flex gap-2 text-sm text-emerald-900 leading-relaxed">
                                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </Card>
                <Card className="p-6 bg-amber-50/50 border-amber-100">
                    <h3 className="text-base font-bold text-amber-800 mb-4 flex items-center gap-2">
                        <ThumbsDown size={18} />
                        注意すべきポイント
                    </h3>
                    <ul className="space-y-3">
                        {relation.cautions.map((item, i) => (
                            <li key={i} className="flex gap-2 text-sm text-amber-900 leading-relaxed">
                                <span className="text-amber-500 font-bold mt-0.5">!</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            {/* ⑤ 仕事での相性 */}
            <Card className="p-6 sm:p-8 mb-8">
                <SectionTitle
                    icon={<Briefcase size={22} className="text-blue-500" />}
                    title="仕事での相性"
                />
                <div className="space-y-6">
                    <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                        <h4 className="text-sm font-bold text-blue-800 mb-2">チームでの相乗効果</h4>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            <FormattedText text={relation.workCompatibility.teamDynamics} />
                        </p>
                    </div>
                    <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                        <h4 className="text-sm font-bold text-indigo-800 mb-2">役割分担のアドバイス</h4>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            <FormattedText text={relation.workCompatibility.roleAdvice} />
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                        <h4 className="text-sm font-bold text-slate-700 mb-2">⚠️ 摩擦ポイント</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            <FormattedText text={relation.workCompatibility.frictionPoint} />
                        </p>
                    </div>
                </div>
            </Card>

            {/* ⑥ 恋愛・プライベートでの相性 */}
            <Card className="p-6 sm:p-8 mb-8">
                <SectionTitle
                    icon={<Heart size={22} className="text-pink-500" />}
                    title="恋愛・プライベートでの相性"
                />
                <div className="space-y-6">
                    <div className="bg-pink-50 rounded-xl p-5 border border-pink-100">
                        <h4 className="text-sm font-bold text-pink-800 mb-2">惹かれるポイント</h4>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            <FormattedText text={relation.loveCompatibility.attraction} />
                        </p>
                    </div>
                    <div className="bg-rose-50 rounded-xl p-5 border border-rose-100">
                        <h4 className="text-sm font-bold text-rose-800 mb-2">関係の課題</h4>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            <FormattedText text={relation.loveCompatibility.challenge} />
                        </p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                        <h4 className="text-sm font-bold text-purple-800 mb-2">💡 長続きの秘訣</h4>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            <FormattedText text={relation.loveCompatibility.longevityTip} />
                        </p>
                    </div>
                </div>
            </Card>

            {/* ⑦ コミュニケーションガイド */}
            <Card className="p-6 sm:p-8 mb-8">
                <SectionTitle
                    icon={<ThumbsUp size={22} className="text-cyan-500" />}
                    title="コミュニケーションガイド"
                />
                <div className="space-y-6">
                    <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-5">
                        <h4 className="flex items-center gap-2 font-bold text-cyan-800 mb-3 text-sm">
                            <ThumbsUp size={16} />
                            効果的な接し方 (DOs)
                        </h4>
                        <ul className="space-y-2">
                            {relation.dos.map((item, i) => (
                                <li key={i} className="flex gap-2 text-sm text-cyan-900">
                                    <span className="text-cyan-500 font-bold">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-rose-50 border border-rose-100 rounded-xl p-5">
                        <h4 className="flex items-center gap-2 font-bold text-rose-800 mb-3 text-sm">
                            <ThumbsDown size={16} />
                            避けるべき接し方 (DON&apos;Ts)
                        </h4>
                        <ul className="space-y-2">
                            {relation.donts.map((item, i) => (
                                <li key={i} className="flex gap-2 text-sm text-rose-900">
                                    <span className="text-rose-400 font-bold">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Card>

            {/* ⑦-b よくある質問 (FAQ) */}
            {relation.faq && relation.faq.length > 0 && (
                <Card className="p-6 sm:p-8 mb-8">
                    <SectionTitle
                        icon={<MessageCircleQuestion size={22} className="text-teal-500" />}
                        title="よくある質問"
                    />
                    <div className="space-y-5">
                        {relation.faq.map((item, i) => (
                            <div key={i} className="bg-teal-50/50 rounded-xl p-5 border border-teal-100">
                                <h4 className="text-sm font-bold text-teal-800 mb-2">Q. {item.question}</h4>
                                <p className="text-sm text-slate-700 leading-relaxed">A. {item.answer}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* ⑧ 他タイプとの相性一覧 */}
            <Card className="p-6 sm:p-8 mb-8">
                <SectionTitle
                    icon={<Star size={22} className="text-amber-500 fill-amber-500" />}
                    title={`${sourceData.name} の他タイプとの相性`}
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {allCompats.map(({ targetCode: code, relation: rel }) => (
                        <CompatibilityCard
                            key={code}
                            sourceCode={sourceCode}
                            targetCode={code}
                            relation={rel}
                        />
                    ))}
                </div>
            </Card>

            {/* ⑨ フッターアクション */}
            <div className="flex flex-col items-center gap-6 mt-12 mb-8">
                <p className="text-slate-400 text-sm text-center max-w-md">
                    相性は「運命」ではなく「取扱説明書」。互いの特性を理解し、
                    意識的な工夫をすることで、どんな関係も改善できます。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/diagnosis"
                        className="inline-flex items-center justify-center gap-2 bg-prisma-600 hover:bg-prisma-700 text-white px-8 py-3 text-base font-bold rounded-lg transition-colors"
                    >
                        <Sparkles size={18} />
                        自分のタイプを診断する
                    </Link>
                    <Link
                        href={`/types/${sourceCode}`}
                        className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-500 hover:text-slate-700 hover:border-slate-400 px-8 py-3 text-base font-bold rounded-lg transition-colors"
                    >
                        <ArrowLeft size={16} />
                        {sourceData.name} の詳細に戻る
                    </Link>
                </div>
            </div>
        </div>
    );
};

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
import { OS_CONTENT_EN } from '@/features/result/data/os/en';
import { RadarChart } from '@/features/result/components/RadarChart';
import { Card } from '@/components/ui/Card';
import { FormattedText } from '@/components/ui/FormattedText';
import { resolveColor } from '@/lib/constants/color-map';
import { getCompatibility, getAllCompatibilities } from '@/lib/constants/compatibility';
import { RELATION_DEFINITIONS_EN } from '@/lib/constants/compatibility.en';
import { CompatibilityCardEn } from './CompatibilityCardEn';

interface CompatibilityPageEnProps {
    sourceCode: OSTypeCode;
    targetCode: OSTypeCode;
}

// --- Star Rating Component ---
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

// --- Section Title ---
const SectionTitle: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3 font-serif">
        {icon}
        {title}
    </h2>
);

/**
 * English Type Compatibility Detail Page
 */
export const CompatibilityPageEn: React.FC<CompatibilityPageEnProps> = ({
    sourceCode,
    targetCode,
}) => {
    const sourceData = OS_CONTENT_EN[sourceCode];
    const targetData = OS_CONTENT_EN[targetCode];

    // Get original (Japanese-based) relation logic to find the type, then map to English definitions
    const baseRelation = getCompatibility(sourceCode, targetCode);
    const enRelation = RELATION_DEFINITIONS_EN[baseRelation.type];
    const allCompats = getAllCompatibilities(sourceCode);

    if (!sourceData || !targetData) return null;

    const sourceColor = resolveColor(sourceData.color);
    const targetColor = resolveColor(targetData.color);

    // Use generic concrete tip from English relation definition
    const concreteTip = enRelation.concreteTip;

    return (
        <div className="max-w-4xl mx-auto">
            {/* ① Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 flex-wrap">
                <Link href="/en" className="hover:text-prisma-600 transition-colors">TOP</Link>
                <ChevronRight size={14} />
                <Link href={`/en/types/${sourceCode}/`} className="hover:text-prisma-600 transition-colors">
                    {sourceData.name.split('(')[0].trim()}
                </Link>
                <ChevronRight size={14} />
                <span className="text-slate-600 font-medium">
                    × {targetData.name.split('(')[0].trim()}
                </span>
            </nav>

            {/* h1: Main Title for SEO */}
            <h1 className="text-lg sm:text-xl font-bold text-slate-700 text-center mb-6 font-serif">
                Compatibility: {sourceData.name.split('(')[0].trim()} &amp; {targetData.name.split('(')[0].trim()}
            </h1>

            {/* ② Header: 2 Types + Star Rating */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    {/* Type A */}
                    <div className="flex-1 text-center">
                        <div className="w-48 h-48 mx-auto mb-4">
                            <RadarChart data={sourceData.params} color={sourceColor} />
                        </div>
                        <Link
                            href={`/en/types/${sourceCode}/`}
                            className="text-lg font-bold text-slate-800 hover:text-prisma-600 transition-colors font-serif"
                        >
                            {sourceData.name.split('(')[0].trim()}
                        </Link>
                        <p className="text-sm text-slate-400 mt-1">{sourceCode}</p>
                    </div>

                    {/* Center: Compatibility Score */}
                    <div className="flex flex-col items-center gap-3 py-4">
                        <span className="text-3xl">{enRelation.emoji}</span>
                        <StarRating stars={enRelation.stars} size={24} />
                        <span className="text-lg font-bold text-slate-800 font-serif">
                            {enRelation.nameEn}
                        </span>
                        <span className="text-xs text-slate-400">{enRelation.type}</span>
                    </div>

                    {/* Type B */}
                    <div className="flex-1 text-center">
                        <div className="w-48 h-48 mx-auto mb-4">
                            <RadarChart data={targetData.params} color={targetColor} />
                        </div>
                        <Link
                            href={`/en/types/${targetCode}/`}
                            className="text-lg font-bold text-slate-800 hover:text-prisma-600 transition-colors font-serif"
                        >
                            {targetData.name.split('(')[0].trim()}
                        </Link>
                        <p className="text-sm text-slate-400 mt-1">{targetCode}</p>
                    </div>
                </div>
            </div>

            {/* ③ Compatibility Overview */}
            <Card className="p-6 sm:p-8 mb-8">
                <SectionTitle
                    icon={<Sparkles size={22} className="text-prisma-500" />}
                    title="Compatibility Overview"
                />
                <div className="text-slate-700 leading-[1.9] whitespace-pre-line">
                    <FormattedText text={enRelation.overview} />
                </div>
            </Card>

            {/* ③-b Specific Scenario Example */}
            <Card className="p-6 sm:p-8 mb-8 bg-violet-50/50 border-violet-100">
                <h3 className="text-base font-bold text-violet-800 mb-3 flex items-center gap-2">
                    <Lightbulb size={18} />
                    Specific Scenario Example
                </h3>
                <p className="text-sm text-violet-900 leading-[1.9]">
                    <FormattedText text={concreteTip} />
                </p>
            </Card>

            {/* ③-c Direction Note (Benefit/Supervision) */}
            {enRelation.directionNote && (
                <Card className="p-6 sm:p-8 mb-8 bg-amber-50/50 border-amber-200">
                    <h3 className="text-base font-bold text-amber-800 mb-3 flex items-center gap-2">
                        <Info size={18} />
                        Direction of this Relationship
                    </h3>
                    <p className="text-sm text-amber-900 leading-[1.9]">
                        <FormattedText text={enRelation.directionNote} />
                    </p>
                </Card>
            )}

            {/* ④ Strengths / Cautions */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6 bg-emerald-50/50 border-emerald-100">
                    <h3 className="text-base font-bold text-emerald-800 mb-4 flex items-center gap-2">
                        <ThumbsUp size={18} />
                        Strengths of this Relationship
                    </h3>
                    <ul className="space-y-3">
                        {enRelation.strengths.map((item, i) => (
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
                        Points of Caution
                    </h3>
                    <ul className="space-y-3">
                        {enRelation.cautions.map((item, i) => (
                            <li key={i} className="flex gap-2 text-sm text-amber-900 leading-relaxed">
                                <span className="text-amber-500 font-bold mt-0.5">!</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            {/* ⑤ Work Compatibility */}
            <Card className="p-6 sm:p-8 mb-8">
                <SectionTitle
                    icon={<Briefcase size={22} className="text-blue-500" />}
                    title="Work Compatibility"
                />
                <div className="space-y-6">
                    <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                        <h4 className="text-sm font-bold text-blue-800 mb-2">Team Dynamics</h4>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            <FormattedText text={enRelation.workCompatibility.teamDynamics} />
                        </p>
                    </div>
                    <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                        <h4 className="text-sm font-bold text-indigo-800 mb-2">Role Advice</h4>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            <FormattedText text={enRelation.workCompatibility.roleAdvice} />
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                        <h4 className="text-sm font-bold text-slate-700 mb-2">⚠️ Friction Point</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            <FormattedText text={enRelation.workCompatibility.frictionPoint} />
                        </p>
                    </div>
                </div>
            </Card>

            {/* ⑥ Love & Private Compatibility */}
            <Card className="p-6 sm:p-8 mb-8">
                <SectionTitle
                    icon={<Heart size={22} className="text-pink-500" />}
                    title="Romance &amp; Private Content"
                />
                <div className="space-y-6">
                    <div className="bg-pink-50 rounded-xl p-5 border border-pink-100">
                        <h4 className="text-sm font-bold text-pink-800 mb-2">Points of Attraction</h4>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            <FormattedText text={enRelation.loveCompatibility.attraction} />
                        </p>
                    </div>
                    <div className="bg-rose-50 rounded-xl p-5 border border-rose-100">
                        <h4 className="text-sm font-bold text-rose-800 mb-2">Relationship Challenges</h4>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            <FormattedText text={enRelation.loveCompatibility.challenge} />
                        </p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                        <h4 className="text-sm font-bold text-purple-800 mb-2">💡 Longevity Tip</h4>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            <FormattedText text={enRelation.loveCompatibility.longevityTip} />
                        </p>
                    </div>
                </div>
            </Card>

            {/* ⑦ Communication Guide */}
            <Card className="p-6 sm:p-8 mb-8">
                <SectionTitle
                    icon={<ThumbsUp size={22} className="text-cyan-500" />}
                    title="Communication Guide"
                />
                <div className="space-y-6">
                    <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-5">
                        <h4 className="flex items-center gap-2 font-bold text-cyan-800 mb-3 text-sm">
                            <ThumbsUp size={16} />
                            Effective Interaction (DOs)
                        </h4>
                        <ul className="space-y-2">
                            {enRelation.dos.map((item, i) => (
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
                            Interactions to Avoid (DON&apos;Ts)
                        </h4>
                        <ul className="space-y-2">
                            {enRelation.donts.map((item, i) => (
                                <li key={i} className="flex gap-2 text-sm text-rose-900">
                                    <span className="text-rose-400 font-bold">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Card>

            {/* ⑦-b FAQ */}
            {enRelation.faq && enRelation.faq.length > 0 && (
                <Card className="p-6 sm:p-8 mb-8">
                    <SectionTitle
                        icon={<MessageCircleQuestion size={22} className="text-teal-500" />}
                        title="Frequently Asked Questions"
                    />
                    <div className="space-y-5">
                        {enRelation.faq.map((item, i) => (
                            <div key={i} className="bg-teal-50/50 rounded-xl p-5 border border-teal-100">
                                <h4 className="text-sm font-bold text-teal-800 mb-2">Q. {item.question}</h4>
                                <p className="text-sm text-slate-700 leading-relaxed">A. {item.answer}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* ⑧ All Compatibility List */}
            <Card className="p-6 sm:p-8 mb-8">
                <SectionTitle
                    icon={<Star size={22} className="text-amber-500 fill-amber-500" />}
                    title={`${sourceData.name.split('(')[0].trim()}'s Compatibility with All Types`}
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {allCompats.map(({ targetCode: tc, relation: rel }) => (
                        <CompatibilityCardEn
                            key={tc}
                            sourceCode={sourceCode}
                            targetCode={tc}
                            relation={rel}
                        />
                    ))}
                </div>
            </Card>

            {/* ⑨ Footer Actions */}
            <div className="flex flex-col items-center gap-6 mt-12 mb-8">
                <p className="text-slate-400 text-sm text-center max-w-md">
                    Compatibility is not &quot;fate&quot; but an &quot;instruction manual.&quot; By understanding each other's traits and making conscious efforts, any relationship can improve.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/en/diagnosis"
                        className="inline-flex items-center justify-center gap-2 bg-prisma-600 hover:bg-prisma-700 text-white px-8 py-3 text-base font-bold rounded-lg transition-colors"
                    >
                        <Sparkles size={18} />
                        Take the Personality Test
                    </Link>
                    <Link
                        href={`/en/types/${sourceCode}/`}
                        className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-500 hover:text-slate-700 hover:border-slate-400 px-8 py-3 text-base font-bold rounded-lg transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to {sourceData.name.split('(')[0].trim()}'s Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

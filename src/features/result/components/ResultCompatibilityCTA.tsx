'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { getAllCompatibilities } from '@/lib/constants/compatibility';
import { resolveColor } from '@/lib/constants/color-map';
import type { OSTypeCode } from '@/types/diagnosis';
import { useLocale } from '@/lib/i18n';
import { getUIText } from '@/lib/i18n/ui-dictionary';
import { getOSContent } from '@/lib/i18n/localized-data';
import { getLocalePath } from '@/lib/i18n/navigation';

interface ResultCompatibilityCTAProps {
    typeCode: OSTypeCode;
}

export const ResultCompatibilityCTA: React.FC<ResultCompatibilityCTAProps> = ({ typeCode }) => {
    const locale = useLocale();
    const t = getUIText(locale).compatCta;
    const osContent = getOSContent(locale);
    const allRelations = getAllCompatibilities(typeCode);

    // 最高のパートナー (Dual)
    const bestMatchRel = allRelations.find(r => r.relation.type === 'Dual');
    const bestMatchOs = bestMatchRel ? osContent[bestMatchRel.targetCode] : null;

    // 成長を促す相手 (Conflict)
    const challengeMatchRel = allRelations.find(r => r.relation.type === 'Conflict');
    const challengeMatchOs = challengeMatchRel ? osContent[challengeMatchRel.targetCode] : null;

    if (!bestMatchRel || !bestMatchOs || !challengeMatchRel || !challengeMatchOs) {
        return null;
    }

    const bestColor = resolveColor(bestMatchOs.color);
    const challengeColor = resolveColor(challengeMatchOs.color);

    return (
        <section className="mt-16 mb-8 relative z-10">
            <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-prisma-100 text-prisma-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-4">
                    <Sparkles size={14} />
                    {t.badge}
                </div>
                <h2 className="text-2xl font-bold text-slate-800 font-serif">{t.title}</h2>
                <p className="text-sm text-slate-500 mt-2">
                    {t.subtitle}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {/* Best Match */}
                <Link
                    href={getLocalePath(locale, `/types/${typeCode}/compatibility/${bestMatchRel.targetCode}/`)}
                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-prisma-300 transition-all duration-300 p-6 flex flex-col"
                >
                    <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-3">
                            <span
                                className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                                style={{ backgroundColor: `${bestColor}15`, color: bestColor }}
                            >
                                <Sparkles size={12} />
                                {t.bestLabel}
                            </span>
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Sparkles key={i} size={12} className="text-amber-400 fill-amber-400" />
                                ))}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-slate-800 mb-1">
                            {bestMatchOs.name}
                        </h3>
                        <p className="text-sm text-slate-600 mb-6 line-clamp-2">
                            {bestMatchRel.relation.summary}
                        </p>
                    </div>

                    <div
                        className="flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-2.5 mt-auto"
                        style={{ color: bestColor }}
                    >
                        {t.bestLink} <ArrowRight size={16} />
                    </div>
                </Link>

                {/* Challenge Match */}
                <Link
                    href={getLocalePath(locale, `/types/${typeCode}/compatibility/${challengeMatchRel.targetCode}/`)}
                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-prisma-300 transition-all duration-300 p-6 flex flex-col"
                >
                    <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-3">
                            <span
                                className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                                style={{ backgroundColor: `${challengeColor}15`, color: challengeColor }}
                            >
                                <Zap size={12} />
                                {t.challengeLabel}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-800 mb-1">
                            {challengeMatchOs.name}
                        </h3>
                        <p className="text-sm text-slate-600 mb-6 line-clamp-2">
                            {t.challengeDesc}
                        </p>
                    </div>

                    <div
                        className="flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-2.5 mt-auto"
                        style={{ color: challengeColor }}
                    >
                        {t.challengeLink} <ArrowRight size={16} />
                    </div>
                </Link>
            </div>

            {/* 全タイプ相性一覧への導線 */}
            <div className="mt-6 text-center">
                <Link
                    href={getLocalePath(locale, `/types/${typeCode}/`)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-prisma-600 hover:text-prisma-800 transition-colors"
                >
                    {t.viewAll16} <ArrowRight size={14} />
                </Link>
            </div>
        </section>
    );
};

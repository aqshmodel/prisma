'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { BarChart3, ChevronDown, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { getAllCompatibilities } from '@/lib/constants/compatibility';
import type { OSTypeCode } from '@/types/diagnosis';
import { useLocale } from '@/lib/i18n';
import { getUIText } from '@/lib/i18n/ui-dictionary';
import { getOSContent } from '@/lib/i18n/localized-data';
import { getLocalePath } from '@/lib/i18n/navigation';

interface CompatibilityScoreTableProps {
    typeCode: OSTypeCode;
}

const INITIAL_DISPLAY_COUNT = 5;

export const CompatibilityScoreTable: React.FC<CompatibilityScoreTableProps> = ({ typeCode }) => {
    const locale = useLocale();
    const t = getUIText(locale).compatTable;
    const osContent = getOSContent(locale);
    const [showAll, setShowAll] = useState(false);
    const allRelations = getAllCompatibilities(typeCode);

    const displayRelations = showAll ? allRelations : allRelations.slice(0, INITIAL_DISPLAY_COUNT);

    return (
        <Card className="p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-prisma-500" />
                {t.title}
            </h3>

            <div className="space-y-2">
                {displayRelations.map(({ targetCode, relation }) => {
                    const targetOs = osContent[targetCode];
                    if (!targetOs) return null;

                    return (
                        <Link
                            key={targetCode}
                            href={getLocalePath(locale, `/types/${typeCode}/compatibility/${targetCode}/`)}
                            className="group flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-prisma-200 hover:bg-prisma-50/30 transition-all"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <span className="text-base shrink-0">{relation.emoji}</span>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-slate-800 truncate">
                                        {targetOs.name}
                                    </p>
                                    <p className="text-xs text-slate-500 truncate">
                                        {relation.name}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                <div className="flex gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span
                                            key={i}
                                            className={`text-xs ${i < relation.stars ? 'text-amber-400' : 'text-slate-200'}`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <ArrowRight
                                    size={14}
                                    className="text-slate-300 group-hover:text-prisma-500 group-hover:translate-x-0.5 transition-all"
                                />
                            </div>
                        </Link>
                    );
                })}
            </div>

            {allRelations.length > INITIAL_DISPLAY_COUNT && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 text-sm font-bold text-prisma-600 hover:text-prisma-800 border border-prisma-200 hover:border-prisma-300 rounded-xl transition-colors"
                >
                    {showAll ? t.close : t.showMore(allRelations.length - INITIAL_DISPLAY_COUNT)}
                    <ChevronDown
                        size={16}
                        className={`transition-transform ${showAll ? 'rotate-180' : ''}`}
                    />
                </button>
            )}
        </Card>
    );
};

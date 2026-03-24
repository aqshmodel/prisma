
import React from 'react';

import { TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { FormattedText } from '@/components/ui/FormattedText';
import type { OSContent } from '../../data/os/types';
import type { EngineContent } from '../../data/content-engine';
import { useLocale } from '@/lib/i18n';
import { getUIText } from '@/lib/i18n/ui-dictionary';

interface GrowthTabProps {
    osData: OSContent;
    engineData: EngineContent;
    themeColor: string;
}

export const GrowthTab: React.FC<GrowthTabProps> = ({ osData, engineData }) => {
    const locale = useLocale();
    const t = getUIText(locale).growthTab;

    if (!osData.growth) return null;

    const levels = [
        { data: osData.growth.level1, level: 1 },
        { data: osData.growth.level2, level: 2 },
        { data: osData.growth.level3, level: 3 },
    ];

    const LEVEL_META = [
        { label: t.levelLabels[0], color: '#94a3b8', bgColor: 'bg-slate-50', borderColor: 'border-slate-200' },
        { label: t.levelLabels[1], color: '#0ABAB5', bgColor: 'bg-prisma-50/50', borderColor: 'border-prisma-200' },
        { label: t.levelLabels[2], color: '#eab308', bgColor: 'bg-amber-50/50', borderColor: 'border-amber-200' },
    ] as const;

    return (
        <div className="space-y-8">
            {/* 成長アドバイス */}
            <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <TrendingUp size={20} className="text-prisma-500" />
                    {t.advice}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                    <FormattedText text={engineData.growthAdvice} />
                </p>
            </Card>

            {/* 成長ロードマップ */}
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 px-2">
                    <span className="w-1.5 h-6 bg-prisma-500 rounded-full" />
                    {t.roadmap}
                </h3>

                {/* タイムライン */}
                <div className="relative">
                    {/* 縦線 */}
                    <div className="hidden sm:block absolute left-[23px] top-4 bottom-4 w-px bg-slate-200" />

                    <div className="space-y-6">
                        {levels.map(({ data, level }, idx) => {
                            const meta = LEVEL_META[idx];
                            const levelActions = osData.growth?.actionItems?.filter(item => item.level === level) || [];

                            return (
                                <div key={level} className="relative sm:pl-14">
                                    {/* レベルバッジ */}
                                    <div
                                        className="w-12 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold z-10 mb-3 sm:mb-0 sm:absolute sm:left-0 sm:top-4 sm:w-12 sm:h-7"
                                        style={{ backgroundColor: meta.color }}
                                    >
                                        {meta.label.split(' ')[0]}
                                    </div>

                                    <div className="space-y-3">
                                        {/* メインカード */}
                                        <Card className={`p-5 border ${meta.borderColor}`}>
                                            <p className="text-xs font-bold tracking-wider text-slate-400 mb-1">{meta.label}</p>
                                            <h4 className="text-lg font-bold text-slate-800 mb-2">
                                                <FormattedText text={data.title} />
                                            </h4>
                                            <p className="text-slate-600 text-sm leading-relaxed">
                                                <FormattedText text={data.content} />
                                            </p>
                                        </Card>

                                        {/* アクション項目 */}
                                        {levelActions.length > 0 && (
                                            <div className="grid gap-3 sm:grid-cols-2">
                                                {levelActions.map((action) => (
                                                    <div key={action.title} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                                        <div className="flex items-start gap-3">
                                                            <CheckCircle2
                                                                size={18}
                                                                className="mt-0.5 shrink-0 text-prisma-400"
                                                            />
                                                            <div>
                                                                <h5 className="font-bold text-slate-700 text-sm mb-1">
                                                                    <FormattedText text={action.title} />
                                                                </h5>
                                                                <p className="text-xs text-slate-500 leading-relaxed">
                                                                    <FormattedText text={action.description} />
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* レベル間矢印（最後以外） */}
                                        {idx < levels.length - 1 && (
                                            <div className="flex justify-center sm:justify-start sm:pl-4 py-1">
                                                <ArrowRight size={16} className="text-slate-300 rotate-90" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

'use client';

import React from 'react';

import { Zap, LayoutDashboard, Blend } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { FormattedText } from '@/components/ui/FormattedText';
import { RadarChart } from '../RadarChart';
import { MatrixChart } from '../MatrixChart';
import { getCrossKey } from '../../data/cross/types';
import { getCrossContent, getOSContent } from '@/lib/i18n/localized-data';
import { useLocale } from '@/lib/i18n';
import { getUIText } from '@/lib/i18n/ui-dictionary';
import { getLocalePath } from '@/lib/i18n/navigation';
import type { OSContent } from '../../data/os/types';
import type { EngineContent } from '../../data/content-engine';


interface OverviewTabProps {
    osData: OSContent;
    engineData: EngineContent;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ osData, engineData }) => {
    const locale = useLocale();
    const t = getUIText(locale).overviewTab;
    const crossContent = getCrossContent(locale);
    const osContent = getOSContent(locale);
    const crossKey = getCrossKey(osData.code, engineData.type);
    const crossData = crossContent[crossKey];

    return (
        <div
            className="space-y-6"
        >
            <Card className="p-6 shadow-lg">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="flex justify-center">
                        <RadarChart data={osData.params} color={osData.color} locale={locale} />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-semibold text-slate-400 tracking-wider">{t.engine}</h3>
                            </div>
                            <p className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                                <span className={`p-2 rounded-lg bg-yellow-100/50 text-yellow-600`}>
                                    <Zap className="w-6 h-6" fill="currentColor" />
                                </span>
                                {engineData.name}
                            </p>
                            <p className="text-slate-600 mt-4 text-base leading-relaxed font-medium">
                                <FormattedText text={engineData.motivation} />
                            </p>
                            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed">
                                <FormattedText text={engineData.description} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                                <span className="text-red-800 font-bold text-xs block mb-1">{t.stressReaction}</span>
                                <p className="text-xs text-red-700 leading-snug">
                                    <FormattedText text={engineData.stressBehavior} />
                                </p>
                            </div>
                            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                                <span className="text-emerald-800 font-bold text-xs block mb-1">{t.growthHint}</span>
                                <p className="text-xs text-emerald-700 leading-snug">
                                    <FormattedText text={engineData.growthAdvice} />
                                </p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                            <h3 className="text-sm font-semibold text-slate-400 tracking-wider mb-2">{t.baseType}</h3>
                            <div className="flex items-baseline gap-2">
                                <p className="text-2xl font-bold text-slate-800">
                                    {osData.name.split('(')[0].trim()}
                                </p>
                                <span className="text-lg font-semibold text-slate-400">({osData.code})</span>
                            </div>
                            <p className="text-slate-500 text-xs mt-2">
                                {t.bestMatch}: <span className="font-semibold">{osContent[osData.bestMatch]?.name || osData.bestMatch}</span> / {t.caution}: <span className="font-semibold">{osContent[osData.worstMatch]?.name || osData.worstMatch}</span>
                            </p>
                            <div className="mt-4">
                                <a href={getLocalePath(locale, `/types/${osData.code}`)} className="text-sm text-indigo-600 font-bold hover:underline flex items-center gap-1">
                                    {t.viewProfile} <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* ハッシュタグ + 掛け合わせ解説 */}
            {crossData && (
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Blend size={20} className="text-prisma-500" />
                        {t.yourCombo}
                    </h3>
                    {osData.hashTag && (
                        <p className="text-prisma-600 font-bold text-sm mb-3">{osData.hashTag}</p>
                    )}
                    <div className="bg-prisma-50/50 border border-prisma-100 rounded-xl p-5">
                        <p className="text-xl font-bold text-slate-800 mb-3">
                            {crossData.title}
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            {crossData.description}
                        </p>
                    </div>
                    <p className="text-xs text-slate-400 mt-3">
                        {t.comboCaption(osData.name, engineData.name)}
                    </p>
                </Card>
            )}

            <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <LayoutDashboard size={20} className="text-slate-400" />
                    {t.typePosition}
                </h3>
                <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50/50 p-2 text-center">
                    <MatrixChart highlightCode={osData.code} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-500">
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                        <span className="font-bold block mb-1">{t.quadrantTopLeft}</span>
                        {t.quadrantTopLeftDesc}
                    </div>
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                        <span className="font-bold block mb-1">{t.quadrantTopRight}</span>
                        {t.quadrantTopRightDesc}
                    </div>
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                        <span className="font-bold block mb-1">{t.quadrantBottomLeft}</span>
                        {t.quadrantBottomLeftDesc}
                    </div>
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                        <span className="font-bold block mb-1">{t.quadrantBottomRight}</span>
                        {t.quadrantBottomRightDesc}
                    </div>
                </div>
            </Card>

            {/* Engine Detail Modal removed */}
        </div>
    );
};

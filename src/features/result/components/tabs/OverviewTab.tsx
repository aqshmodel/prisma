'use client';

import React from 'react';

import { Zap, LayoutDashboard } from 'lucide-react';
import { Card } from '../../../../components/ui/Card';
import { FormattedText } from '../../../../components/ui/FormattedText';
import { RadarChart } from '../RadarChart';
import { MatrixChart } from '../MatrixChart';
import type { OSContent } from '../../data/content-os';
import type { EngineContent } from '../../data/content-engine';


interface OverviewTabProps {
    osData: OSContent;
    engineData: EngineContent;
    themeColor: string;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ osData, engineData, themeColor }) => {
    return (
        <div
            className="space-y-6"
        >
            <Card className="p-6 shadow-lg border-t-4" style={{ borderTopColor: themeColor }}>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="flex justify-center">
                        <RadarChart data={osData.params} color={osData.color} />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Primary Engine</h3>
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
                                <span className="text-red-800 font-bold text-xs block mb-1">⚠️ ストレス反応</span>
                                <p className="text-xs text-red-700 leading-snug">
                                    <FormattedText text={engineData.stressBehavior} />
                                </p>
                            </div>
                            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                                <span className="text-emerald-800 font-bold text-xs block mb-1">🌱 成長へのヒント</span>
                                <p className="text-xs text-emerald-700 leading-snug">
                                    <FormattedText text={engineData.growthAdvice} />
                                </p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Basic Type</h3>
                            <div className="flex items-baseline gap-2">
                                <p className="text-2xl font-bold text-slate-800">
                                    {osData.name.split('(')[0].trim()}
                                </p>
                                <span className="text-lg font-semibold text-slate-400">({osData.code})</span>
                            </div>
                            <p className="text-slate-500 text-xs mt-2">
                                相性最高: <span className="font-semibold">{osData.bestMatch}</span> / 要注意: <span className="font-semibold">{osData.worstMatch}</span>
                            </p>
                            <div className="mt-4">
                                <a href={`/types/${osData.code}`} className="text-sm text-indigo-600 font-bold hover:underline flex items-center gap-1">
                                    詳細プロファイルを見る <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <LayoutDashboard size={20} className="text-slate-400" />
                    タイプポジション
                </h3>
                <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50/50 p-2 text-center">
                    <MatrixChart highlightCode={osData.code} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-500">
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                        <span className="font-bold block mb-1">左上: 伝統・規律</span>
                        確実性と安定を重視し、組織の基盤を支える守り手。
                    </div>
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                        <span className="font-bold block mb-1">右上: 革新・論理</span>
                        合理性と成果を追求し、変革を推進する開拓者。
                    </div>
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                        <span className="font-bold block mb-1">左下: 協調・感情</span>
                        人の和と調和を尊び、チームの接着剤となる調整役。
                    </div>
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                        <span className="font-bold block mb-1">右下: 自由・直感</span>
                        可能性と独自性を愛し、新しい風を吹き込む創作者。
                    </div>
                </div>
            </Card>

            {/* Engine Detail Modal removed */}
        </div>
    );
};

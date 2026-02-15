'use client';

import React, { useState, Suspense } from 'react';

import { Zap, LayoutDashboard, Info } from 'lucide-react';
import { Card } from '../../../../components/ui/Card';
import { RadarChart } from '../RadarChart';
import { MatrixChart } from '../MatrixChart';
import type { OSContent } from '../../data/content-os';
import type { EngineContent } from '../../data/content-engine';

// Lazy load the modal since it's not immediately visible
const EngineDetailModal = React.lazy(() =>
    import('../EngineDetailModal').then(module => ({ default: module.EngineDetailModal }))
);

interface OverviewTabProps {
    osData: OSContent;
    engineData: EngineContent;
    themeColor: string;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ osData, engineData, themeColor }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div
            className="space-y-6"
        >
            <Card className="p-6 shadow-lg border-t-4" style={{ borderTopColor: themeColor }}>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="flex justify-center">
                        <RadarChart data={osData.params} color={osData.color} />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Primary Engine</h3>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                                >
                                    <Info size={14} />
                                    詳細を見る
                                </button>
                            </div>
                            <p className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                <Zap className="text-yellow-500" fill="currentColor" />
                                {engineData.name}
                            </p>
                            <p className="text-slate-600 mt-2 text-sm leading-relaxed">
                                {engineData.motivation}
                            </p>
                        </div>
                        <div className="pt-4 border-t border-slate-100">
                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Basic Type</h3>
                            <p className="text-xl font-bold text-slate-800">{osData.code}</p>
                            <p className="text-slate-500 text-xs mt-1">
                                相性最高: <span className="font-semibold">{osData.bestMatch}</span> / 要注意: <span className="font-semibold">{osData.worstMatch}</span>
                            </p>
                            <div className="mt-4">
                                <a href={`/types/${osData.code}`} className="text-sm text-indigo-600 font-bold hover:underline">
                                    ↪ タイプ詳細を見る
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

            <Suspense fallback={null}>
                <EngineDetailModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    engine={engineData}
                    engineType={engineData.name.split(' ')[0]}
                />
            </Suspense>
        </div>
    );
};

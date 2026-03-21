
import React from 'react';

import { Microscope, CheckCircle2, AlertTriangle, Sparkles, Lightbulb, Smile, Shield } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { FormattedText } from '@/components/ui/FormattedText';
import type { OSContent } from '../../data/content-os';
import type { BiasContent } from '../../data/content-bias';

interface AnalysisTabProps {
    osData: OSContent;
    themeColor: string;
    biasRisks: (BiasContent & { level: string })[];
}

export const AnalysisTab: React.FC<AnalysisTabProps> = ({ osData, themeColor, biasRisks }) => {
    const highCount = biasRisks.filter(b => b.level === 'high').length;
    const mediumCount = biasRisks.filter(b => b.level === 'medium').length;

    return (
        <div
            className="space-y-6"
        >
            <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Microscope size={20} style={{ color: themeColor }} />
                    基本プロファイル
                </h3>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed mb-6 whitespace-pre-wrap">
                    <FormattedText text={osData.description} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
                        <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                            <CheckCircle2 size={18} /> 強み
                        </h4>
                        <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                            <FormattedText text={osData.strength} />
                        </div>
                    </div>
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                            <AlertTriangle size={18} /> 弱点
                        </h4>
                        <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                            <FormattedText text={osData.weakness} />
                        </div>
                    </div>
                </div>
            </Card>

            {/* あるあるセクション */}
            {osData.aruaru && osData.aruaru.length > 0 && (
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Smile size={20} className="text-prisma-500" />
                        あるある
                    </h3>
                    <ul className="space-y-3">
                        {osData.aruaru.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                                <span className="text-prisma-400 mt-0.5 shrink-0">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </Card>
            )}

            {osData.psychology && (
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Sparkles size={20} className="text-prisma-500" />
                        深層心理
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">根源的欲求</h4>
                                <p className="font-medium text-slate-800">
                                    <FormattedText text={osData.psychology.coreDesire} />
                                </p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">盲点</h4>
                                <p className="font-medium text-slate-800">
                                    <FormattedText text={osData.psychology.blindSpot} />
                                </p>
                            </div>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                            <h4 className="font-bold text-red-800 mb-2 text-sm">ストレス反応</h4>
                            <p className="text-sm text-red-900 leading-relaxed">
                                <FormattedText text={osData.psychology.stressResponse} />
                            </p>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                            <h4 className="font-bold text-emerald-800 mb-2 text-sm">回復方法</h4>
                            <p className="text-sm text-emerald-900 leading-relaxed">
                                <FormattedText text={osData.psychology.recoveryMethod} />
                            </p>
                        </div>
                    </div>
                </Card>
            )}

            {/* バイアス検出セクション（強化版） */}
            {biasRisks.length > 0 && (
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Shield size={20} className="text-slate-500" />
                        思考のクセ診断
                    </h3>

                    {/* サマリーバー */}
                    <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-slate-800">{biasRisks.length}</p>
                            <p className="text-xs text-slate-500">検出数</p>
                        </div>
                        <div className="w-px h-10 bg-slate-200" />
                        <div className="flex gap-3">
                            {highCount > 0 && (
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                    <span className="text-sm text-slate-600">高リスク <span className="font-bold text-red-700">{highCount}</span></span>
                                </div>
                            )}
                            {mediumCount > 0 && (
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                    <span className="text-sm text-slate-600">中リスク <span className="font-bold text-amber-700">{mediumCount}</span></span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* バイアス一覧 */}
                    <div className="space-y-4">
                        {biasRisks.map((bias) => {
                            const isHigh = bias.level === 'high';
                            return (
                                <div key={bias.name} className="rounded-xl border border-slate-200 overflow-hidden">
                                    {/* ヘッダー */}
                                    <div className={`px-5 py-3 flex items-center justify-between ${isHigh ? 'bg-red-50 border-b border-red-100' : 'bg-amber-50 border-b border-amber-100'}`}>
                                        <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${isHigh ? 'bg-red-400' : 'bg-amber-400'}`} />
                                            {bias.name}
                                        </h4>
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isHigh ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {isHigh ? '高リスク' : '中リスク'}
                                        </span>
                                    </div>

                                    {/* 本文 */}
                                    <div className="p-5 bg-white space-y-4">
                                        <p className="text-sm font-bold text-slate-700">
                                            {bias.warning}
                                        </p>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            <FormattedText text={bias.detail} />
                                        </p>

                                        {/* 対策 */}
                                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                            <h5 className="font-bold text-slate-700 mb-1 text-sm flex items-center gap-2">
                                                <Lightbulb size={16} className="text-prisma-500" />
                                                対策アプローチ
                                            </h5>
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                <FormattedText text={bias.countermeasure} />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            )}
        </div>
    );
};

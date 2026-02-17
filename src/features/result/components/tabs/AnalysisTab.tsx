
import React from 'react';

import { Microscope, CheckCircle2, AlertTriangle, Sparkles, Lightbulb } from 'lucide-react';
import { Card } from '../../../../components/ui/Card';
import { FormattedText } from '../../../../components/ui/FormattedText';
import type { OSContent } from '../../data/content-os';
import type { BiasContent } from '../../data/content-bias';

interface AnalysisTabProps {
    osData: OSContent;
    themeColor: string;
    biasRisks: (BiasContent & { level: string })[];
}

export const AnalysisTab: React.FC<AnalysisTabProps> = ({ osData, themeColor, biasRisks }) => {
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

            {osData.psychology && (
                <Card className="p-6 border-l-4 border-purple-400">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Sparkles size={20} className="text-purple-500" />
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

            {biasRisks.length > 0 && (
                <Card className="p-6 border-l-4 border-red-500">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <AlertTriangle size={20} className="text-red-500" />
                        注意すべき思考のバイアス
                    </h3>
                    <div className="space-y-6">
                        {biasRisks.map((bias, idx) => (
                            <div key={idx} className="bg-red-50/50 rounded-xl p-5 border border-red-100">
                                <h4 className="font-bold text-red-800 text-lg mb-2 flex items-center gap-2">
                                    {bias.name}
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${bias.level === 'high' ? 'bg-red-200 text-red-900' : 'bg-orange-200 text-orange-900'
                                        }`}>
                                        Risk: {bias.level === 'high' ? '高' : '中'}
                                    </span>
                                </h4>
                                <p className="font-bold text-slate-700 mb-2 text-sm">
                                    ⚠️ {bias.warning}
                                </p>
                                <p className="text-sm text-slate-600 mb-4 leading-relaxed whitespace-pre-line">
                                    <FormattedText text={bias.detail} />
                                </p>

                                <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                                    <h5 className="font-bold text-slate-700 mb-1 text-sm flex items-center gap-2">
                                        <Lightbulb size={16} className="text-yellow-500" />
                                        対策アプローチ
                                    </h5>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        <FormattedText text={bias.countermeasure} />
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
};


import React from 'react';

import { TrendingUp, CheckCircle2 } from 'lucide-react';
import { Card } from '../../../../components/ui/Card';
import { FormattedText } from '../../../../components/ui/FormattedText';
import type { OSContent } from '../../data/content-os';
import type { EngineContent } from '../../data/content-engine';

interface GrowthTabProps {
    osData: OSContent;
    engineData: EngineContent;
    themeColor: string;
}

export const GrowthTab: React.FC<GrowthTabProps> = ({ osData, engineData, themeColor }) => {
    if (!osData.growth) return null;

    const levels = [
        { data: osData.growth.level1, level: 1 },
        { data: osData.growth.level2, level: 2 },
        { data: osData.growth.level3, level: 3 },
    ];

    return (
        <div
            className="space-y-8"
        >
            <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100 shadow-sm">
                <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <TrendingUp size={24} className="text-indigo-600" />
                    成長へのアドバイス
                </h3>
                <p className="text-indigo-800 leading-relaxed whitespace-pre-wrap text-sm">
                    <FormattedText text={engineData.growthAdvice} />
                </p>
            </div>

            <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 px-2">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                    成長ロードマップ
                </h3>

                <div className="relative space-y-8 sm:before:absolute sm:before:inset-0 sm:before:ml-6 sm:before:w-0.5 sm:before:-translate-x-px sm:before:bg-gradient-to-b sm:before:from-indigo-100 sm:before:via-indigo-100 sm:before:to-transparent">
                    {levels.map(({ data, level }) => {
                        const levelActions = osData.growth?.actionItems?.filter(item => item.level === level) || [];

                        return (
                            <div key={level} className="relative sm:pl-14">
                                {/* Level Badge */}
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md z-10 border-2 border-white mb-3 sm:mb-0 sm:absolute sm:left-2 sm:top-0"
                                    style={{ backgroundColor: level === 1 ? '#94a3b8' : level === 2 ? themeColor : '#eab308' }}
                                >
                                    {level}
                                </div>

                                <div className="space-y-4">
                                    <Card className="p-5 border-l-4" style={{
                                        borderLeftColor: level === 1 ? '#94a3b8' : level === 2 ? themeColor : '#eab308'
                                    }}>
                                        <h4 className="text-lg font-bold text-slate-800 mb-2">
                                            <FormattedText text={data.title} />
                                        </h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            <FormattedText text={data.content} />
                                        </p>
                                    </Card>

                                    {levelActions.length > 0 && (
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {levelActions.map((action, i) => (
                                                <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                                                    <div className="flex items-start gap-3">
                                                        <CheckCircle2
                                                            size={18}
                                                            className="mt-0.5 shrink-0 text-slate-300 group-hover:text-emerald-500 transition-colors"
                                                        />
                                                        <div>
                                                            <h5 className="font-bold text-slate-700 text-sm mb-1 group-hover:text-indigo-700 transition-colors">
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
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

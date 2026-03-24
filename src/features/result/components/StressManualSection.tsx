import React from 'react';

import { AlertCircle, XCircle, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { FormattedText } from '@/components/ui/FormattedText';
import type { OSContent } from '../data/os/types';
import type { EngineContent } from '../data/content-engine';
import { useLocale } from '@/lib/i18n';
import { getUIText } from '@/lib/i18n/ui-dictionary';

interface StressManualSectionProps {
    osData: OSContent;
    engineData: EngineContent;
}

export const StressManualSection: React.FC<StressManualSectionProps> = ({ osData, engineData }) => {
    const locale = useLocale();
    const t = getUIText(locale).stressManual;
    const manual = engineData.stressManual;
    const hasOsData = !!osData.psychology;

    if (!manual && !hasOsData) return null;

    return (
        <Card className="p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <AlertCircle size={20} className="text-rose-500" />
                {t.title}
            </h3>

            {/* OS由来: ストレス反応と回復方法 */}
            {hasOsData && (
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                        <h4 className="font-bold text-red-800 mb-2 text-sm">{t.stressResponse}</h4>
                        <p className="text-sm text-red-900 leading-relaxed">
                            <FormattedText text={osData.psychology.stressResponse} />
                        </p>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                        <h4 className="font-bold text-emerald-800 mb-2 text-sm">{t.recoveryHint}</h4>
                        <p className="text-sm text-emerald-900 leading-relaxed">
                            <FormattedText text={osData.psychology.recoveryMethod} />
                        </p>
                    </div>
                </div>
            )}

            {/* Engine由来: 詳細ストレスマニュアル */}
            {manual && (
                <div className="space-y-5">
                    <div>
                        <h4 className="font-bold text-slate-700 mb-3 text-sm flex items-center gap-2">
                            <AlertCircle size={16} className="text-amber-500" />
                            {t.signTitle}
                        </h4>
                        <ul className="space-y-2">
                            {manual.signs.map((sign, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed bg-amber-50/50 p-3 rounded-lg border border-amber-100">
                                    <span className="text-amber-500 font-bold shrink-0 mt-0.5">{i + 1}.</span>
                                    <FormattedText text={sign} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-700 mb-3 text-sm flex items-center gap-2">
                            <XCircle size={16} className="text-red-400" />
                            {t.ngActions}
                        </h4>
                        <ul className="space-y-2">
                            {manual.ngActions.map((action, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed bg-red-50/30 p-3 rounded-lg border border-red-100">
                                    <span className="text-red-400 font-bold shrink-0">NG</span>
                                    <FormattedText text={action} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-700 mb-3 text-sm flex items-center gap-2">
                            <Clock size={16} className="text-prisma-500" />
                            {t.recoveryPlan}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {[
                                { time: t.quick, label: locale === 'ja' ? '応急処置' : 'Quick Fix', content: manual.recovery.quick, color: 'bg-prisma-50 border-prisma-100' },
                                { time: t.medium, label: locale === 'ja' ? 'ちゃんと休む' : 'Proper Rest', content: manual.recovery.medium, color: 'bg-blue-50 border-blue-100' },
                                { time: t.full, label: locale === 'ja' ? 'フルリセット' : 'Full Reset', content: manual.recovery.full, color: 'bg-indigo-50 border-indigo-100' },
                            ].map(({ time, label, content, color }) => (
                                <div key={time} className={`p-4 rounded-xl border ${color}`}>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-lg font-bold text-slate-800">{time}</span>
                                        <span className="text-xs text-slate-500">{label}</span>
                                    </div>
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        <FormattedText text={content} />
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
};


import React from 'react';

import { Briefcase, Target, ShieldAlert, Users, TrendingUp, CircleDollarSign, Battery, Rocket } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { FormattedText } from '@/components/ui/FormattedText';
import type { OSContent } from '../../data/os/types';
import type { EngineContent } from '../../data/content-engine';
import { useLocale } from '@/lib/i18n';
import { getUIText } from '@/lib/i18n/ui-dictionary';

interface WorkTabProps {
    osData: OSContent;
    engineData?: EngineContent;
    themeColor: string;
}

export const WorkTab: React.FC<WorkTabProps> = ({ osData, engineData, themeColor }) => {
    const locale = useLocale();
    const t = getUIText(locale).workTab;

    if (!osData.workStyle) return null;

    return (
        <div className="space-y-6">
            {/* Section 1: ワークスタイル分析 */}
            <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Briefcase size={20} style={{ color: themeColor }} />
                    {t.workStyle}
                </h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-bold text-slate-700 mb-2">{t.mission}</h4>
                        <p className="text-lg font-medium text-slate-800 border-l-4 border-slate-300 pl-4 py-1 italic">
                            "<FormattedText text={osData.workStyle.mission} />"
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-bold text-slate-700 mb-2 text-sm">{t.style}</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg whitespace-pre-wrap">
                                <FormattedText text={osData.workStyle.style} />
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-700 mb-2 text-sm">{t.motivation}</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg whitespace-pre-wrap">
                                <FormattedText text={osData.workStyle.motivation} />
                            </p>
                        </div>
                    </div>
                    {/* マネジメント適性 */}
                    <div>
                        <h4 className="font-bold text-slate-700 mb-2 text-sm">{t.management}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg whitespace-pre-wrap">
                            <FormattedText text={osData.workStyle.management} />
                        </p>
                    </div>
                    {/* 会議・チーム + エネルギーリズム */}
                    {(osData.workStyle.teamBehavior || osData.workStyle.workEnergyPattern) && (
                        <div className="grid md:grid-cols-2 gap-6">
                            {osData.workStyle.teamBehavior && (
                                <div>
                                    <h4 className="font-bold text-slate-700 mb-2 text-sm flex items-center gap-1.5">
                                        <Users size={14} style={{ color: themeColor }} />
                                        {t.teamBehavior}
                                    </h4>
                                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg whitespace-pre-wrap">
                                        <FormattedText text={osData.workStyle.teamBehavior} />
                                    </p>
                                </div>
                            )}
                            {osData.workStyle.workEnergyPattern && (
                                <div>
                                    <h4 className="font-bold text-slate-700 mb-2 text-sm flex items-center gap-1.5">
                                        <Battery size={14} style={{ color: themeColor }} />
                                        {t.energyRhythm}
                                    </h4>
                                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg whitespace-pre-wrap">
                                        <FormattedText text={osData.workStyle.workEnergyPattern} />
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Card>

            {/* Section 2: 適職・キャリアパス + 副業 */}
            <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Target size={20} className="text-rose-500" />
                    {t.careerPath}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                    {osData.workStyle.bestRoles.map((role) => (
                        <div key={role.title} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-slate-800 mb-2 text-sm border-b pb-2">{role.title}</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                <FormattedText text={role.reason} />
                            </p>
                        </div>
                    ))}
                </div>
                {/* 副業・サイドプロジェクト */}
                {osData.workStyle.sideProjects && osData.workStyle.sideProjects.length > 0 && (
                    <div className="mt-6">
                        <h4 className="font-bold text-slate-700 mb-3 text-sm flex items-center gap-1.5">
                            <Rocket size={14} className="text-indigo-500" />
                            {t.sideProjects}
                        </h4>
                        <div className="grid md:grid-cols-3 gap-4">
                            {osData.workStyle.sideProjects.map((project) => (
                                <div key={project.title} className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                                    <h5 className="font-bold text-indigo-800 mb-1 text-sm">{project.title}</h5>
                                    <p className="text-xs text-indigo-600 leading-relaxed">
                                        <FormattedText text={project.reason} />
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Card>

            {/* Section 3: NGな職場環境 + モチベーションキラー */}
            {(osData.workStyle.ngEnvironments || engineData?.motivationKillers) && (
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <ShieldAlert size={20} className="text-amber-500" />
                        {t.ngEnvironments}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {osData.workStyle.ngEnvironments && (
                            <div>
                                <h4 className="font-bold text-slate-700 mb-3 text-sm">{t.ngEnvLabel}</h4>
                                <ul className="space-y-2">
                                    {osData.workStyle.ngEnvironments.map((env, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600 bg-red-50 p-3 rounded-lg">
                                            <span className="text-red-400 mt-0.5 shrink-0">&#x2715;</span>
                                            <FormattedText text={env} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {engineData?.motivationKillers && (
                            <div>
                                <h4 className="font-bold text-slate-700 mb-3 text-sm">{t.motivationKillers}</h4>
                                <ul className="space-y-2">
                                    {engineData.motivationKillers.map((killer, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600 bg-amber-50 p-3 rounded-lg">
                                            <span className="text-amber-400 mt-0.5 shrink-0">&#x26A0;</span>
                                            <FormattedText text={killer} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </Card>
            )}

            {/* Section 4: 上司・部下の相性 */}
            {(osData.workStyle.idealBoss || osData.workStyle.idealSubordinate) && (
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Users size={20} style={{ color: themeColor }} />
                        {t.bossCompat}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {osData.workStyle.idealBoss && (
                            <div>
                                <h4 className="font-bold text-slate-700 mb-2 text-sm">{t.idealBoss}</h4>
                                <p className="text-sm text-slate-600 leading-relaxed bg-blue-50 p-4 rounded-lg whitespace-pre-wrap">
                                    <FormattedText text={osData.workStyle.idealBoss} />
                                </p>
                            </div>
                        )}
                        {osData.workStyle.idealSubordinate && (
                            <div>
                                <h4 className="font-bold text-slate-700 mb-2 text-sm">{t.idealSubordinate}</h4>
                                <p className="text-sm text-slate-600 leading-relaxed bg-green-50 p-4 rounded-lg whitespace-pre-wrap">
                                    <FormattedText text={osData.workStyle.idealSubordinate} />
                                </p>
                            </div>
                        )}
                    </div>
                </Card>
            )}

            {/* Section 5: キャリアの危険信号 */}
            {engineData?.careerRisk && (
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <TrendingUp size={20} className="text-orange-500" />
                        {t.careerRisk}
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-bold text-slate-700 mb-2 text-sm">{t.trapPattern}</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-orange-50 p-3 rounded-lg whitespace-pre-wrap">
                                <FormattedText text={engineData.careerRisk.trapPattern} />
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-700 mb-2 text-sm">{t.quitTrigger}</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-orange-50 p-3 rounded-lg whitespace-pre-wrap">
                                <FormattedText text={engineData.careerRisk.quitTrigger} />
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-700 mb-2 text-sm">{t.prevention}</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-emerald-50 p-3 rounded-lg whitespace-pre-wrap">
                                <FormattedText text={engineData.careerRisk.prevention} />
                            </p>
                        </div>
                    </div>
                </Card>
            )}

            {/* Section 6: お金と交渉の傾向 */}
            {engineData?.moneyStyle && (
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <CircleDollarSign size={20} className="text-emerald-500" />
                        {t.moneyStyle}
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-bold text-slate-700 mb-2 text-sm">{t.lossPattern}</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-red-50 p-3 rounded-lg whitespace-pre-wrap">
                                <FormattedText text={engineData.moneyStyle.lossPattern} />
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-700 mb-2 text-sm">{t.negotiationHabit}</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg whitespace-pre-wrap">
                                <FormattedText text={engineData.moneyStyle.negotiationHabit} />
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-700 mb-2 text-sm">{t.earningStrategy}</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-emerald-50 p-3 rounded-lg whitespace-pre-wrap">
                                <FormattedText text={engineData.moneyStyle.earningStrategy} />
                            </p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

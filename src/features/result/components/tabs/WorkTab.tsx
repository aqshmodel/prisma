
import React from 'react';

import { Briefcase, Target, ShieldAlert, Users, TrendingUp, CircleDollarSign, Battery, Rocket } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { FormattedText } from '@/components/ui/FormattedText';
import type { OSContent } from '../../data/content-os';
import type { EngineContent } from '../../data/content-engine';

interface WorkTabProps {
    osData: OSContent;
    engineData?: EngineContent;
    themeColor: string;
}

export const WorkTab: React.FC<WorkTabProps> = ({ osData, engineData, themeColor }) => {
    if (!osData.workStyle) return null;

    return (
        <div className="space-y-6">
            {/* Section 1: ワークスタイル分析 */}
            <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Briefcase size={20} style={{ color: themeColor }} />
                    ワークスタイル分析
                </h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-bold text-slate-700 mb-2">ミッション</h4>
                        <p className="text-lg font-medium text-slate-800 border-l-4 border-slate-300 pl-4 py-1 italic">
                            "<FormattedText text={osData.workStyle.mission} />"
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-bold text-slate-700 mb-2 text-sm">働き方のスタイル</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg whitespace-pre-wrap">
                                <FormattedText text={osData.workStyle.style} />
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-700 mb-2 text-sm">モチベーションの源泉</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg whitespace-pre-wrap">
                                <FormattedText text={osData.workStyle.motivation} />
                            </p>
                        </div>
                    </div>
                    {/* マネジメント適性 */}
                    <div>
                        <h4 className="font-bold text-slate-700 mb-2 text-sm">マネジメント適性</h4>
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
                                        会議・チームでの振る舞い
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
                                        仕事エネルギーのリズム
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
                    適職・キャリアパス
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
                            副業・サイドプロジェクト適性
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
                        避けるべき環境・モチベーションキラー
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {osData.workStyle.ngEnvironments && (
                            <div>
                                <h4 className="font-bold text-slate-700 mb-3 text-sm">この性格タイプに合わない環境</h4>
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
                                <h4 className="font-bold text-slate-700 mb-3 text-sm">やる気を殺す3大要素</h4>
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
                        上司・部下の相性
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {osData.workStyle.idealBoss && (
                            <div>
                                <h4 className="font-bold text-slate-700 mb-2 text-sm">こういう上司の下で力を発揮する</h4>
                                <p className="text-sm text-slate-600 leading-relaxed bg-blue-50 p-4 rounded-lg whitespace-pre-wrap">
                                    <FormattedText text={osData.workStyle.idealBoss} />
                                </p>
                            </div>
                        )}
                        {osData.workStyle.idealSubordinate && (
                            <div>
                                <h4 className="font-bold text-slate-700 mb-2 text-sm">こういう部下と相性がいい</h4>
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
                        キャリアの危険信号
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-bold text-slate-700 mb-2 text-sm">陥りがちなパターン</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-orange-50 p-3 rounded-lg whitespace-pre-wrap">
                                <FormattedText text={engineData.careerRisk.trapPattern} />
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-700 mb-2 text-sm">転職の引き金になりやすいこと</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-orange-50 p-3 rounded-lg whitespace-pre-wrap">
                                <FormattedText text={engineData.careerRisk.quitTrigger} />
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-700 mb-2 text-sm">予防策</h4>
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
                        お金と交渉の傾向
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-bold text-slate-700 mb-2 text-sm">損しやすいパターン</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-red-50 p-3 rounded-lg whitespace-pre-wrap">
                                <FormattedText text={engineData.moneyStyle.lossPattern} />
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-700 mb-2 text-sm">交渉のクセ</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg whitespace-pre-wrap">
                                <FormattedText text={engineData.moneyStyle.negotiationHabit} />
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-700 mb-2 text-sm">収入アップの戦略</h4>
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

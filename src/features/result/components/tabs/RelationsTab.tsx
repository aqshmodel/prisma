
import React from 'react';
import Link from 'next/link';

import { Heart, ThumbsUp, ThumbsDown, ArrowRight, Users } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { FormattedText } from '@/components/ui/FormattedText';
import type { OSContent } from '../../data/os/types';
import type { EngineContent } from '../../data/content-engine';
import { LoveStyleSection } from '../LoveStyleSection';
import { CompatibilityScoreTable } from '../CompatibilityScoreTable';
import { useLocale } from '@/lib/i18n';
import { getUIText } from '@/lib/i18n/ui-dictionary';
import { getOSContent } from '@/lib/i18n/localized-data';
import { getLocalePath } from '@/lib/i18n/navigation';

interface RelationsTabProps {
    osData: OSContent;
    engineData: EngineContent;
}

export const RelationsTab: React.FC<RelationsTabProps> = ({ osData, engineData }) => {
    const locale = useLocale();
    const t = getUIText(locale).relationsTab;
    const osContent = getOSContent(locale);
    const bestMatchOs = osContent[osData.bestMatch];
    const worstMatchOs = osContent[osData.worstMatch];

    return (
        <div
            className="space-y-6"
        >
            <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Heart size={20} className="text-pink-500" />
                    {t.commTitle}
                </h3>

                <div className="space-y-4">
                    <h4 className="font-bold text-slate-700">{t.manual}</h4>
                    <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-5">
                        <h5 className="flex items-center gap-2 font-bold text-cyan-800 mb-3 text-sm">
                            <ThumbsUp size={16} />
                            {t.doComm}
                        </h5>
                        <ul className="space-y-2">
                            {osData.doCommunication.map((item) => (
                                <li key={item} className="flex gap-2 text-sm text-cyan-900">
                                    <span className="text-cyan-500 font-bold">•</span>
                                    <FormattedText text={item} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-rose-50 border border-rose-100 rounded-xl p-5">
                        <h5 className="flex items-center gap-2 font-bold text-rose-800 mb-3 text-sm">
                            <ThumbsDown size={16} />
                            {t.dontComm}
                        </h5>
                        <ul className="space-y-2">
                            {osData.dontCommunication.map((item) => (
                                <li key={item} className="flex gap-2 text-sm text-rose-900">
                                    <span className="text-rose-400 font-bold">•</span>
                                    <FormattedText text={item} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Card>

            {/* 友人・家族の傾向 */}
            {(osData.relationships.friendshipStyle || osData.relationships.familyRole) && (
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Users size={20} className="text-prisma-500" />
                        {t.friendFamily}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {osData.relationships.friendshipStyle && (
                            <div className="bg-prisma-50/30 rounded-xl p-5 border border-prisma-100">
                                <h4 className="text-sm font-bold text-prisma-700 mb-2 flex items-center gap-2">
                                    <Heart size={14} className="text-prisma-500" />
                                    {t.friendship}
                                </h4>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    <FormattedText text={osData.relationships.friendshipStyle} />
                                </p>
                            </div>
                        )}
                        {osData.relationships.familyRole && (
                            <div className="bg-prisma-50/30 rounded-xl p-5 border border-prisma-100">
                                <h4 className="text-sm font-bold text-prisma-700 mb-2 flex items-center gap-2">
                                    <Users size={14} className="text-prisma-500" />
                                    {t.familyRole}
                                </h4>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    <FormattedText text={osData.relationships.familyRole} />
                                </p>
                            </div>
                        )}
                    </div>
                </Card>
            )}

            {/* 恋愛の傾向（OS + Engine 統合） */}
            <LoveStyleSection osData={osData} engineData={engineData} />

            {/* 相性スコア一覧 */}
            <CompatibilityScoreTable typeCode={osData.code} />

            {/* 相性チェックへの導線 */}
            <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">{t.compatDetails}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {bestMatchOs && (
                        <Link
                            href={getLocalePath(locale, `/types/${osData.code}/compatibility/${osData.bestMatch}`)}
                            className="group flex items-center justify-between p-4 bg-prisma-50/50 rounded-xl border border-prisma-100 hover:border-prisma-300 transition-colors"
                        >
                            <div>
                                <p className="text-xs font-bold text-prisma-600 mb-0.5">{t.bestCompat}</p>
                                <p className="text-sm font-bold text-slate-800">{bestMatchOs.name}</p>
                            </div>
                            <ArrowRight size={16} className="text-prisma-400 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                    {worstMatchOs && (
                        <Link
                            href={getLocalePath(locale, `/types/${osData.code}/compatibility/${osData.worstMatch}`)}
                            className="group flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
                        >
                            <div>
                                <p className="text-xs font-bold text-slate-500 mb-0.5">{t.cautionCompat}</p>
                                <p className="text-sm font-bold text-slate-800">{worstMatchOs.name}</p>
                            </div>
                            <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                </div>
                <div className="mt-4 text-center">
                    <Link
                        href={getLocalePath(locale, `/types/${osData.code}`)}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-prisma-600 hover:text-prisma-800 transition-colors"
                    >
                        {t.viewAll16} <ArrowRight size={14} />
                    </Link>
                </div>
            </Card>
        </div>
    );
};

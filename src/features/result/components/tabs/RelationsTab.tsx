
import React from 'react';
import Link from 'next/link';

import { Heart, ThumbsUp, ThumbsDown, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { FormattedText } from '@/components/ui/FormattedText';
import { OS_CONTENT } from '../../data/content-os';
import type { OSContent } from '../../data/content-os';

interface RelationsTabProps {
    osData: OSContent;
}

export const RelationsTab: React.FC<RelationsTabProps> = ({ osData }) => {
    const bestMatchOs = OS_CONTENT[osData.bestMatch];
    const worstMatchOs = OS_CONTENT[osData.worstMatch];

    return (
        <div
            className="space-y-6"
        >
            <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Heart size={20} className="text-pink-500" />
                    人間関係とコミュニケーション
                </h3>

                {osData.relationships && (
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
                            <h4 className="text-sm font-bold text-pink-800 mb-2">求めるパートナー像</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                <FormattedText text={osData.relationships.partnerQuality} />
                            </p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                            <h4 className="text-sm font-bold text-slate-700 mb-2">対立のトリガー</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                <FormattedText text={osData.relationships.conflictTrigger} />
                            </p>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    <h4 className="font-bold text-slate-700">周囲への取扱説明書</h4>
                    <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-5">
                        <h5 className="flex items-center gap-2 font-bold text-cyan-800 mb-3 text-sm">
                            <ThumbsUp size={16} />
                            効果的な接し方
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
                            避けるべき接し方
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

            {/* 相性チェックへの導線 */}
            <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">相性をもっと詳しく</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {bestMatchOs && (
                        <Link
                            href={`/types/${osData.code}/compatibility/${osData.bestMatch}`}
                            className="group flex items-center justify-between p-4 bg-prisma-50/50 rounded-xl border border-prisma-100 hover:border-prisma-300 transition-colors"
                        >
                            <div>
                                <p className="text-xs font-bold text-prisma-600 mb-0.5">最高の相性</p>
                                <p className="text-sm font-bold text-slate-800">{bestMatchOs.name}</p>
                            </div>
                            <ArrowRight size={16} className="text-prisma-400 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                    {worstMatchOs && (
                        <Link
                            href={`/types/${osData.code}/compatibility/${osData.worstMatch}`}
                            className="group flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
                        >
                            <div>
                                <p className="text-xs font-bold text-slate-500 mb-0.5">要注意の相手</p>
                                <p className="text-sm font-bold text-slate-800">{worstMatchOs.name}</p>
                            </div>
                            <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                </div>
                <div className="mt-4 text-center">
                    <Link
                        href={`/types/${osData.code}`}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-prisma-600 hover:text-prisma-800 transition-colors"
                    >
                        全16タイプとの相性を見る <ArrowRight size={14} />
                    </Link>
                </div>
            </Card>
        </div>
    );
};


import React from 'react';

import { Heart, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card } from '../../../../components/ui/Card';
import { FormattedText } from '../../../../components/ui/FormattedText';
import type { OSContent } from '../../data/content-os';

interface RelationsTabProps {
    osData: OSContent;
}

export const RelationsTab: React.FC<RelationsTabProps> = ({ osData }) => {
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
                            効果的な接し方 (DOs)
                        </h5>
                        <ul className="space-y-2">
                            {osData.doCommunication.map((item, idx) => (
                                <li key={idx} className="flex gap-2 text-sm text-cyan-900">
                                    <span className="text-cyan-500 font-bold">•</span>
                                    <FormattedText text={item} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-rose-50 border border-rose-100 rounded-xl p-5">
                        <h5 className="flex items-center gap-2 font-bold text-rose-800 mb-3 text-sm">
                            <ThumbsDown size={16} />
                            避けるべき接し方 (DON'Ts)
                        </h5>
                        <ul className="space-y-2">
                            {osData.dontCommunication.map((item, idx) => (
                                <li key={idx} className="flex gap-2 text-sm text-rose-900">
                                    <span className="text-rose-400 font-bold">•</span>
                                    <FormattedText text={item} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
};

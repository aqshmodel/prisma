import React from 'react';

import { Heart } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { FormattedText } from '@/components/ui/FormattedText';
import type { OSContent } from '../data/os/types';
import type { EngineContent } from '../data/content-engine';
import { useLocale } from '@/lib/i18n';
import { getUIText } from '@/lib/i18n/ui-dictionary';

interface LoveStyleSectionProps {
    osData: OSContent;
    engineData: EngineContent;
}

export const LoveStyleSection: React.FC<LoveStyleSectionProps> = ({ osData, engineData }) => {
    const locale = useLocale();
    const t = getUIText(locale).loveStyle;
    const love = engineData.loveStyle;
    const hasOsRelationships = !!osData.relationships;

    if (!love && !hasOsRelationships) return null;

    return (
        <Card className="p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Heart size={20} className="text-pink-500" />
                {t.title}
            </h3>

            <div className="space-y-4">
                {/* OS由来: パートナー像 & 対立トリガー */}
                {hasOsRelationships && (
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
                            <h4 className="text-sm font-bold text-pink-800 mb-2">{t.partnerImage}</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                <FormattedText text={osData.relationships.partnerQuality} />
                            </p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                            <h4 className="text-sm font-bold text-slate-700 mb-2">{t.conflictTrigger}</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                <FormattedText text={osData.relationships.conflictTrigger} />
                            </p>
                        </div>
                    </div>
                )}

                {/* Engine由来: 恋愛パターン */}
                {love && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100">
                            <h4 className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-2">{t.fallingPattern}</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                <FormattedText text={love.fallingPattern} />
                            </p>
                        </div>
                        <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100">
                            <h4 className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">{t.attachmentType}</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                <FormattedText text={love.attachmentType} />
                            </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.breakTrigger}</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                <FormattedText text={love.breakTrigger} />
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};

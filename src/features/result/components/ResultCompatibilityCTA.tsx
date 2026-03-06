import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { getAllCompatibilities } from '@/lib/constants/compatibility';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { resolveColor } from '@/lib/constants/color-map';
import type { OSTypeCode } from '@/types/diagnosis';

interface ResultCompatibilityCTAProps {
    typeCode: OSTypeCode;
}

export const ResultCompatibilityCTA: React.FC<ResultCompatibilityCTAProps> = ({ typeCode }) => {
    const allRelations = getAllCompatibilities(typeCode);

    // 最高のパートナー (Dual)
    const bestMatchRel = allRelations.find(r => r.relation.type === 'Dual');
    const bestMatchOs = bestMatchRel ? OS_CONTENT[bestMatchRel.targetCode] : null;

    // 成長を促す相手 (Conflict または相反するタイプ)
    const challengeMatchRel = allRelations.find(r => r.relation.type === 'Conflict');
    const challengeMatchOs = challengeMatchRel ? OS_CONTENT[challengeMatchRel.targetCode] : null;

    if (!bestMatchRel || !bestMatchOs || !challengeMatchRel || !challengeMatchOs) {
        return null;
    }

    const bestColor = resolveColor(bestMatchOs.color);
    const challengeColor = resolveColor(challengeMatchOs.color);

    return (
        <section className="mt-16 mb-8 relative z-10">
            <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-prisma-100 text-prisma-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-4">
                    <Sparkles size={14} />
                    SPECIAL COMPATIBILITY
                </div>
                <h2 className="text-2xl font-bold text-slate-800 font-serif">特別な相性のパートナー</h2>
                <p className="text-sm text-slate-500 mt-2">
                    あなたにとって最も重要な意味を持つ2つのタイプをチェックしましょう
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {/* Best Match */}
                <Link
                    href={`/types/${typeCode}/compatibility/${bestMatchRel.targetCode}`}
                    className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-300 p-6 flex flex-col"
                >
                    {/* 背景グラデーション装飾 */}
                    <div
                        className="absolute -top-20 -right-20 w-48 h-48 opacity-[0.08] blur-3xl rounded-full transition-opacity group-hover:opacity-20"
                        style={{ backgroundColor: bestColor }}
                    />

                    <div className="relative z-10 flex-grow">
                        <div className="flex items-center gap-2 mb-3">
                            <span
                                className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                                style={{ backgroundColor: `${bestColor}15`, color: bestColor }}
                            >
                                <Sparkles size={12} />
                                Best Match (双対関係)
                            </span>
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Sparkles key={i} size={12} className="text-amber-400 fill-amber-400" />
                                ))}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-prisma-700 transition-colors">
                            {bestMatchOs.name} ({bestMatchOs.code})
                        </h3>
                        <p className="text-sm text-slate-600 mb-6 line-clamp-2">
                            {bestMatchRel.relation.summary}
                        </p>
                    </div>

                    <div
                        className="relative z-10 flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-2 mt-auto"
                        style={{ color: bestColor }}
                    >
                        最高の相性を見る <ArrowRight size={16} />
                    </div>
                </Link>

                {/* Challenge Match */}
                <Link
                    href={`/types/${typeCode}/compatibility/${challengeMatchRel.targetCode}`}
                    className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-300 p-6 flex flex-col"
                >
                    {/* 背景グラデーション装飾 */}
                    <div
                        className="absolute -top-20 -right-20 w-48 h-48 opacity-[0.08] blur-3xl rounded-full transition-opacity group-hover:opacity-20"
                        style={{ backgroundColor: challengeColor }}
                    />

                    <div className="relative z-10 flex-grow">
                        <div className="flex items-center gap-2 mb-3">
                            <span
                                className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                                style={{ backgroundColor: `${challengeColor}15`, color: challengeColor }}
                            >
                                <Zap size={12} />
                                Challenge Match (衝突関係)
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-prisma-700 transition-colors">
                            {challengeMatchOs.name} ({challengeMatchOs.code})
                        </h3>
                        <p className="text-sm text-slate-600 mb-6 line-clamp-2">
                            価値観が根本的に異なり摩擦が起きやすい反面、自分にない視点を学べる成長の鍵となる相手です。
                        </p>
                    </div>

                    <div
                        className="relative z-10 flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-2 mt-auto"
                        style={{ color: challengeColor }}
                    >
                        接し方のコツを見る <ArrowRight size={16} />
                    </div>
                </Link>
            </div>
        </section>
    );
};

import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import type { OSTypeCode } from '@/types/diagnosis';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { resolveColor } from '@/lib/constants/color-map';
import type { RelationDefinition } from '@/lib/constants/compatibility';

interface CompatibilityCardProps {
    /** 自分のタイプコード（リンク構築用） */
    sourceCode: OSTypeCode;
    /** 相手のタイプコード */
    targetCode: OSTypeCode;
    /** 相性関係の定義 */
    relation: RelationDefinition;
}

/**
 * 他タイプとの相性一覧で使用する小型カード
 * タイプ名・星評価・関係性名をコンパクトに表示し、詳細ページヘリンク
 */
export const CompatibilityCard: React.FC<CompatibilityCardProps> = ({
    sourceCode,
    targetCode,
    relation,
}) => {
    const targetData = OS_CONTENT[targetCode];
    if (!targetData) return null;

    const themeColor = resolveColor(targetData.color);

    return (
        <Link
            href={`/types/${sourceCode}/compatibility/${targetCode}`}
            className="group block bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-prisma-300 transition-all duration-200"
        >
            <div className="flex items-center justify-between mb-2">
                <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
                >
                    {targetData.code}
                </span>
                <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            size={12}
                            className={i < relation.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}
                        />
                    ))}
                </div>
            </div>
            <h4 className="text-sm font-bold text-slate-800 group-hover:text-prisma-600 transition-colors mb-1">
                {targetData.name}
            </h4>
            <p className="text-xs text-slate-500">
                {relation.emoji} {relation.name}
            </p>
        </Link>
    );
};

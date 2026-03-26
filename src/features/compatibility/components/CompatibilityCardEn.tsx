import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import type { OSTypeCode } from '@/types/diagnosis';
import { OS_CONTENT_EN } from '@/features/result/data/os/en';
import { resolveColor } from '@/lib/constants/color-map';
import type { RelationDefinition } from '@/lib/constants/compatibility';
import { RELATION_DEFINITIONS_EN } from '@/lib/constants/compatibility.en';

interface CompatibilityCardEnProps {
    /** 自分のタイプコード（リンク構築用） */
    sourceCode: OSTypeCode;
    /** 相手のタイプコード */
    targetCode: OSTypeCode;
    /** 相性関係の定義 (元の日本語ベースのオブジェクトだが、typeキーを使って英語定義を引き直す) */
    relation: RelationDefinition;
}

/**
 * 英語版: 他タイプとの相性一覧で使用する小型カード
 * タイプ名・星評価・関係性名をコンパクトに表示し、詳細ページヘリンク (English)
 */
export const CompatibilityCardEn: React.FC<CompatibilityCardEnProps> = ({
    sourceCode,
    targetCode,
    relation,
}) => {
    const targetData = OS_CONTENT_EN[targetCode];
    if (!targetData) return null;

    const themeColor = resolveColor(targetData.color);
    
    // Convert to English relation definition
    const enRelation = RELATION_DEFINITIONS_EN[relation.type];

    return (
        <Link
            href={`/en/types/${sourceCode}/compatibility/${targetCode}/`}
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
                            className={i < enRelation.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}
                        />
                    ))}
                </div>
            </div>
            <h4 className="text-sm font-bold text-slate-800 group-hover:text-prisma-600 transition-colors mb-1">
                {targetData.name.split('(')[0].trim()}
            </h4>
            <p className="text-xs text-slate-500">
                {enRelation.emoji} {enRelation.nameEn}
            </p>
        </Link>
    );
};

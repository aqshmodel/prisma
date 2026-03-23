import type { OSTypeCode } from '@/types/diagnosis';

/**
 * ソシオニクスの4象限（Quadra）タイプ
 * sociotype.com 公式定義に準拠
 */
export type QuadrantType = 'Alpha' | 'Beta' | 'Gamma' | 'Delta';

/**
 * ミニ診断の質問型定義
 */
export interface MiniQuestion {
    id: number;
    text: string;
    /** 選択肢A（Merry軸ならMerry寄り、Judicious軸ならJudicious寄り） */
    choiceA: string;
    /** 選択肢B（Merry軸ならSerious寄り、Judicious軸ならDecisive寄り） */
    choiceB: string;
    /** Reinin dichotomyの判定軸 */
    axis: 'merry-serious' | 'judicious-decisive';
}

/**
 * ミニ診断の結果型定義
 */
export interface MiniDiagnosisResult {
    quadrant: QuadrantType;
    /** Merry/Serious 軸のスコア（0=完全Serious, 5=完全Merry） */
    merryScore: number;
    /** Judicious/Decisive 軸のスコア（0=完全Decisive, 5=完全Judicious） */
    judiciousScore: number;
    timestamp: string;
}

/**
 * Quadra → 所属タイプコードのマッピング
 * sociotype.com 公式定義に準拠:
 * - Alpha: Ti, Ne, Fe, Si を価値要素とする
 * - Beta:  Ti, Se, Fe, Ni を価値要素とする
 * - Gamma: Fi, Se, Te, Ni を価値要素とする
 * - Delta: Fi, Ne, Te, Si を価値要素とする
 */
export const QUADRA_TYPE_MAP: Record<QuadrantType, OSTypeCode[]> = {
    Alpha: ['ENTp', 'ISFp', 'ESFj', 'INTj'],
    Beta:  ['ENFj', 'ISTj', 'ESTp', 'INFp'],
    Gamma: ['ESFp', 'INTp', 'ENTj', 'ISFj'],
    Delta: ['ESTj', 'INFj', 'ENFp', 'ISTp'],
};

/**
 * OSTypeCode → Quadra の逆引きマップ
 */
export const TYPE_TO_QUADRA: Record<OSTypeCode, QuadrantType> = Object.entries(
    QUADRA_TYPE_MAP
).reduce(
    (acc, [quadra, types]) => {
        types.forEach((type) => {
            acc[type] = quadra as QuadrantType;
        });
        return acc;
    },
    {} as Record<OSTypeCode, QuadrantType>
);

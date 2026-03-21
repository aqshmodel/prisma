import type { OSTypeCode } from '@/types/diagnosis';
import type { EngineType } from '@/types/diagnosis';

/**
 * OS × Engine 掛け合わせ解説データの型定義
 *
 * 各組み合わせ（例: ENTp × T1）に対して、
 * その人物像をユニークに描写する短い称号と解説テキストを持つ。
 */
export interface CrossContent {
    /** OS タイプコード (例: 'ENTp') */
    osCode: OSTypeCode;
    /** Engine タイプ (例: 'T1') */
    engineType: EngineType;
    /** 称号（例: '完璧を求める発明家'） - 15文字以内推奨 */
    title: string;
    /** 解説テキスト（100〜200文字程度） */
    description: string;
}

/**
 * 掛け合わせデータのキーを生成するヘルパー
 * @example getCrossKey('ENTp', 'T1') => 'ENTp_T1'
 */
export const getCrossKey = (osCode: OSTypeCode, engineType: EngineType): string =>
    `${osCode}_${engineType}`;

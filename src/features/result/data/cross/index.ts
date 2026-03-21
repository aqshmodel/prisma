import type { CrossContent } from './types';
import { CROSS_ENTp } from './entp';
import { CROSS_ISFp } from './isfp';
import { CROSS_ESFj } from './esfj';
import { CROSS_INTj } from './intj';
import { CROSS_ENFj } from './enfj';
import { CROSS_ISTj } from './istj';
import { CROSS_ESTp } from './estp';
import { CROSS_INFp } from './infp';
import { CROSS_ESFp } from './esfp';
import { CROSS_INTp } from './intp';
import { CROSS_ENTj } from './entj';
import { CROSS_ISFj } from './isfj';
import { CROSS_ESTj } from './estj';
import { CROSS_INFj } from './infj';
import { CROSS_ENFp } from './enfp';
import { CROSS_ISTp } from './istp';

/**
 * 全掛け合わせデータの統合マップ
 * 全16タイプ × 9エンジン = 144通り
 * キー: `{OSCode}_{EngineType}` (例: 'ENTp_T1')
 */
export const CROSS_CONTENT: Record<string, CrossContent> = {
    // Alpha Quadra
    ...CROSS_ENTp,
    ...CROSS_ISFp,
    ...CROSS_ESFj,
    ...CROSS_INTj,
    // Beta Quadra
    ...CROSS_ENFj,
    ...CROSS_ISTj,
    ...CROSS_ESTp,
    ...CROSS_INFp,
    // Gamma Quadra
    ...CROSS_ESFp,
    ...CROSS_INTp,
    ...CROSS_ENTj,
    ...CROSS_ISFj,
    // Delta Quadra
    ...CROSS_ESTj,
    ...CROSS_INFj,
    ...CROSS_ENFp,
    ...CROSS_ISTp,
};

export * from './types';

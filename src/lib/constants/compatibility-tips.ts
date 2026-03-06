import type { OSTypeCode } from '@/types/diagnosis';

import { ALPHA_PAIR_TIPS } from './compatibility-tips-alpha';
import { BETA_PAIR_TIPS } from './compatibility-tips-beta';
import { GAMMA_PAIR_TIPS } from './compatibility-tips-gamma';
import { DELTA_PAIR_TIPS } from './compatibility-tips-delta';

type PairKey = `${OSTypeCode}-${OSTypeCode}`;

/**
 * 全240ペアの固有 concreteTip を統合したマップ。
 * ペアキーは `${sourceCode}-${targetCode}` 形式。
 * 存在しないキーの場合は undefined を返すため、
 * getPairConcreteTip ヘルパーを通じて共通テキストにフォールバックすること。
 */
export const PAIR_CONCRETE_TIPS: Partial<Record<PairKey, string>> = {
    ...ALPHA_PAIR_TIPS,
    ...BETA_PAIR_TIPS,
    ...GAMMA_PAIR_TIPS,
    ...DELTA_PAIR_TIPS,
};

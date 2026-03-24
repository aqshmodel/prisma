import type { OSTypeCode } from '@/types/diagnosis';

import { ALPHA_PAIR_TIPS_EN } from './compatibility-tips-alpha.en';
import { BETA_PAIR_TIPS_EN } from './compatibility-tips-beta.en';
import { GAMMA_PAIR_TIPS_EN } from './compatibility-tips-gamma.en';
import { DELTA_PAIR_TIPS_EN } from './compatibility-tips-delta.en';

type PairKey = `${OSTypeCode}-${OSTypeCode}`;

/**
 * All 240 pair-specific concreteTips in English.
 * Key format: `${sourceCode}-${targetCode}`.
 * Falls back to the relation-type default tip via getPairConcreteTip
 * when a key is missing.
 */
export const PAIR_CONCRETE_TIPS_EN: Partial<Record<PairKey, string>> = {
    ...ALPHA_PAIR_TIPS_EN,
    ...BETA_PAIR_TIPS_EN,
    ...GAMMA_PAIR_TIPS_EN,
    ...DELTA_PAIR_TIPS_EN,
};

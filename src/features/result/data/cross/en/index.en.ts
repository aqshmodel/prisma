import type { CrossContent } from '../types';
import { CROSS_ENTp_EN } from './entp.en';
import { CROSS_ISFp_EN } from './isfp.en';
import { CROSS_ESFj_EN } from './esfj.en';
import { CROSS_INTj_EN } from './intj.en';
import { CROSS_ENFj_EN } from './enfj.en';
import { CROSS_ISTj_EN } from './istj.en';
import { CROSS_ESTp_EN } from './estp.en';
import { CROSS_INFp_EN } from './infp.en';
import { CROSS_ESFp_EN } from './esfp.en';
import { CROSS_INTp_EN } from './intp.en';
import { CROSS_ENTj_EN } from './entj.en';
import { CROSS_ISFj_EN } from './isfj.en';
import { CROSS_ESTj_EN } from './estj.en';
import { CROSS_INFj_EN } from './infj.en';
import { CROSS_ENFp_EN } from './enfp.en';
import { CROSS_ISTp_EN } from './istp.en';

/**
 * All cross-content data in English.
 * 16 OS types × 9 Engine types = 144 entries.
 * Key: `{OSCode}_{EngineType}` (e.g. 'ENTp_T1')
 */
export const CROSS_CONTENT_EN: Record<string, CrossContent> = {
    // Alpha Quadra
    ...CROSS_ENTp_EN,
    ...CROSS_ISFp_EN,
    ...CROSS_ESFj_EN,
    ...CROSS_INTj_EN,
    // Beta Quadra
    ...CROSS_ENFj_EN,
    ...CROSS_ISTj_EN,
    ...CROSS_ESTp_EN,
    ...CROSS_INFp_EN,
    // Gamma Quadra
    ...CROSS_ESFp_EN,
    ...CROSS_INTp_EN,
    ...CROSS_ENTj_EN,
    ...CROSS_ISFj_EN,
    // Delta Quadra
    ...CROSS_ESTj_EN,
    ...CROSS_INFj_EN,
    ...CROSS_ENFp_EN,
    ...CROSS_ISTp_EN,
};

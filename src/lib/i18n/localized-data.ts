/**
 * ロケールに応じたデータ取得のゲートウェイ
 *
 * 全てのコンテンツデータへのアクセスはこのモジュールを経由する。
 * 英語版データが未実装の場合は、日本語にフォールバックする。
 *
 * @example
 * const locale = useLocale();
 * const questions = getQuestions(locale);
 * const osContent = getOSContent(locale);
 */

import type { Locale } from './types';
import type { Question, EngineType, BiasType, OSTypeCode } from '@/types/diagnosis';
import type { OSContent } from '@/features/result/data/os/types';
import type { EngineContent } from '@/features/result/data/content-engine';
import type { BiasContent } from '@/features/result/data/content-bias';
import type { CrossContent } from '@/features/result/data/cross/types';
import type { RelationType, RelationDefinition } from '@/lib/constants/compatibility';

// --- 日本語データ（既存） ---
import { QUESTIONS } from '@/features/diagnosis/data/questions';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { ENGINE_CONTENT } from '@/features/result/data/content-engine';
import { BIAS_CONTENT } from '@/features/result/data/content-bias';
import { CROSS_CONTENT } from '@/features/result/data/cross';
import { RELATION_DEFINITIONS } from '@/lib/constants/compatibility';

// --- 英語データ（段階的に追加） ---
import { QUESTIONS_EN } from '@/features/diagnosis/data/questions.en';
import { OS_CONTENT_EN } from '@/features/result/data/os/en';
import { ENGINE_CONTENT_EN } from '@/features/result/data/content-engine.en';
import { BIAS_CONTENT_EN } from '@/features/result/data/content-bias.en';
import { CROSS_CONTENT_EN } from '@/features/result/data/cross/en/index.en';
import { PAIR_CONCRETE_TIPS } from '@/lib/constants/compatibility-tips';
import { PAIR_CONCRETE_TIPS_EN } from '@/lib/constants/compatibility-tips.en';
import { getCompatibility } from '@/lib/constants/compatibility';
import { RELATION_DEFINITIONS_EN } from '@/lib/constants/compatibility.en';

/**
 * 質問データを取得する
 */
export function getQuestions(locale: Locale): Question[] {
    if (locale === 'en') {
        return QUESTIONS_EN;
    }
    return QUESTIONS;
}

/**
 * OS (16タイプ) コンテンツを取得する
 */
export function getOSContent(locale: Locale): Record<string, OSContent> {
    if (locale === 'en') {
        return OS_CONTENT_EN;
    }
    return OS_CONTENT;
}

/**
 * Engine (9タイプ) コンテンツを取得する
 */
export function getEngineContent(locale: Locale): Record<EngineType, EngineContent> {
    if (locale === 'en') {
        return ENGINE_CONTENT_EN;
    }
    return ENGINE_CONTENT;
}

/**
 * Bias (5種) コンテンツを取得する
 */
export function getBiasContent(locale: Locale): Record<BiasType, BiasContent> {
    if (locale === 'en') {
        return BIAS_CONTENT_EN;
    }
    return BIAS_CONTENT;
}

/**
 * Cross (OS × Engine) コンテンツを取得する
 */
export function getCrossContent(locale: Locale): Record<string, CrossContent> {
    if (locale === 'en') {
        return CROSS_CONTENT_EN;
    }
    return CROSS_CONTENT;
}

/**
 * ペア固有のconcreTipをロケールに応じて取得する
 */
export function getPairConcreteTipLocalized(
    typeA: OSTypeCode,
    typeB: OSTypeCode,
    locale: Locale
): string {
    const key = `${typeA}-${typeB}` as `${OSTypeCode}-${OSTypeCode}`;
    const tips = locale === 'en' ? PAIR_CONCRETE_TIPS_EN : PAIR_CONCRETE_TIPS;
    const relationDefs = getRelationDefinitions(locale);
    const relation = getCompatibility(typeA, typeB);
    return (tips as Record<string, string | undefined>)[key] ?? relationDefs[relation.type]?.concreteTip ?? relation.concreteTip;
}

/**
 * 相性関係定義を取得する
 */
export function getRelationDefinitions(locale: Locale): Record<RelationType, RelationDefinition> {
    if (locale === 'en') {
        return RELATION_DEFINITIONS_EN;
    }
    return RELATION_DEFINITIONS;
}

import type { DiagnosisResult, OSTypeCode, EngineType } from '@/types/diagnosis';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { ENGINE_CONTENT } from '@/features/result/data/content-engine';

/**
 * 診断結果をURL共有用の短いBase64文字列にエンコードする。
 *
 * フォーマット: "{osCode}-{enginePrimary}" → Base64
 * 例: "ENTp-T3" → "RU5UcC1UMw"
 */
export function encodeResult(result: DiagnosisResult): string {
    const payload = `${result.os.code}-${result.engine.primary}`;
    // btoa はブラウザ環境で使用（client component内での呼び出しを前提）
    return btoa(payload);
}

/** デコード結果の型 */
interface DecodedResult {
    osCode: OSTypeCode;
    enginePrimary: EngineType;
}

/**
 * Base64エンコードされた共有コードを診断結果のキーにデコードする。
 *
 * 不正な値（存在しないタイプコード等）の場合は null を返す。
 */
export function decodeResult(encoded: string): DecodedResult | null {
    try {
        const decoded = atob(encoded);
        const [osCode, enginePrimary] = decoded.split('-');

        // バリデーション: OS_CONTENT と ENGINE_CONTENT に存在するか確認
        if (!osCode || !enginePrimary) return null;
        if (!(osCode in OS_CONTENT)) return null;
        if (!(enginePrimary in ENGINE_CONTENT)) return null;

        return {
            osCode: osCode as OSTypeCode,
            enginePrimary: enginePrimary as EngineType,
        };
    } catch {
        // Base64デコード失敗
        return null;
    }
}

/**
 * デコードしたキーから、共有表示用の疑似DiagnosisResultを構築する。
 *
 * 実際の診断と異なり、バイアススコアやマトリクス座標は含まれない。
 * あくまで「タイプ表示」に必要な最小限のデータ。
 */
export function buildSharedResult(decoded: DecodedResult): DiagnosisResult {
    return {
        os: {
            code: decoded.osCode,
            subtype: 'Contact', // 共有閲覧では判定不可のためデフォルト
        },
        engine: {
            primary: decoded.enginePrimary,
            secondary: decoded.enginePrimary, // セカンダリも同一でフォールバック
        },
        bias: {
            scores: {
                Confirmation: 0,
                SunkCost: 0,
                StatusQuo: 0,
                Authority: 0,
                Availability: 0,
            },
            alerts: [],
            totalScore: 0,
        },
        matrix: { x: 5, y: 5 }, // 中央値でフォールバック
        validity: 'A',
        timestamp: new Date().toISOString(),
    };
}

import type { MiniDiagnosisResult, QuadrantType } from '../data/mini-types';

type AnswerValue = 'A' | 'B';
type MiniAnswers = Record<number, AnswerValue>;

/**
 * ミニ診断の回答から Quadra を判定する
 *
 * Reinin dichotomy の2軸で判定:
 * - Merry vs Serious (Q1-Q5): A=Merry, B=Serious
 * - Judicious vs Decisive (Q6-Q10): A=Judicious, B=Decisive
 *
 * Quadra決定マトリクス:
 *          Judicious    Decisive
 * Merry    α (Alpha)    β (Beta)
 * Serious  δ (Delta)    γ (Gamma)
 */
export const calculateMiniDiagnosis = (answers: MiniAnswers): MiniDiagnosisResult => {
    // Merry/Serious 軸: Q1-Q5
    // A = Merry寄り → スコア加算
    let merryScore = 0;
    for (let i = 1; i <= 5; i++) {
        if (answers[i] === 'A') merryScore++;
    }

    // Judicious/Decisive 軸: Q6-Q10
    // A = Judicious寄り → スコア加算
    let judiciousScore = 0;
    for (let i = 6; i <= 10; i++) {
        if (answers[i] === 'A') judiciousScore++;
    }

    // 各軸の閾値: 3以上 = Merry / Judicious
    const isMerry = merryScore >= 3;
    const isJudicious = judiciousScore >= 3;

    let quadrant: QuadrantType;
    if (isMerry && isJudicious) {
        quadrant = 'Alpha';    // Merry + Judicious
    } else if (isMerry && !isJudicious) {
        quadrant = 'Beta';     // Merry + Decisive
    } else if (!isMerry && !isJudicious) {
        quadrant = 'Gamma';    // Serious + Decisive
    } else {
        quadrant = 'Delta';    // Serious + Judicious
    }

    return {
        quadrant,
        merryScore,
        judiciousScore,
        timestamp: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
    };
};

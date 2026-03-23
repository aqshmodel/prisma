import { describe, it, expect } from 'vitest';
import { calculateMiniDiagnosis } from './mini-calculator';

type AnswerValue = 'A' | 'B';

/** ヘルパー: 全問を指定パターンで回答 */
function makeAnswers(merryAnswers: AnswerValue[], judiciousAnswers: AnswerValue[]): Record<number, AnswerValue> {
    const answers: Record<number, AnswerValue> = {};
    merryAnswers.forEach((v, i) => { answers[i + 1] = v; });
    judiciousAnswers.forEach((v, i) => { answers[i + 6] = v; });
    return answers;
}

describe('calculateMiniDiagnosis', () => {
    describe('Quadra判定マトリクス', () => {
        it('全Merry + 全Judicious → Alpha', () => {
            const result = calculateMiniDiagnosis(
                makeAnswers(['A','A','A','A','A'], ['A','A','A','A','A'])
            );
            expect(result.quadrant).toBe('Alpha');
            expect(result.merryScore).toBe(5);
            expect(result.judiciousScore).toBe(5);
        });

        it('全Merry + 全Decisive → Beta', () => {
            const result = calculateMiniDiagnosis(
                makeAnswers(['A','A','A','A','A'], ['B','B','B','B','B'])
            );
            expect(result.quadrant).toBe('Beta');
            expect(result.merryScore).toBe(5);
            expect(result.judiciousScore).toBe(0);
        });

        it('全Serious + 全Decisive → Gamma', () => {
            const result = calculateMiniDiagnosis(
                makeAnswers(['B','B','B','B','B'], ['B','B','B','B','B'])
            );
            expect(result.quadrant).toBe('Gamma');
            expect(result.merryScore).toBe(0);
            expect(result.judiciousScore).toBe(0);
        });

        it('全Serious + 全Judicious → Delta', () => {
            const result = calculateMiniDiagnosis(
                makeAnswers(['B','B','B','B','B'], ['A','A','A','A','A'])
            );
            expect(result.quadrant).toBe('Delta');
            expect(result.merryScore).toBe(0);
            expect(result.judiciousScore).toBe(5);
        });
    });

    describe('境界値テスト', () => {
        it('Merry 3/5 + Judicious 3/5 → Alpha（閾値ちょうど）', () => {
            const result = calculateMiniDiagnosis(
                makeAnswers(['A','A','A','B','B'], ['A','A','A','B','B'])
            );
            expect(result.quadrant).toBe('Alpha');
            expect(result.merryScore).toBe(3);
            expect(result.judiciousScore).toBe(3);
        });

        it('Merry 2/5 + Judicious 2/5 → Gamma（閾値未満）', () => {
            const result = calculateMiniDiagnosis(
                makeAnswers(['A','A','B','B','B'], ['A','A','B','B','B'])
            );
            expect(result.quadrant).toBe('Gamma');
            expect(result.merryScore).toBe(2);
            expect(result.judiciousScore).toBe(2);
        });

        it('Merry 3/5 + Judicious 2/5 → Beta', () => {
            const result = calculateMiniDiagnosis(
                makeAnswers(['A','A','A','B','B'], ['A','A','B','B','B'])
            );
            expect(result.quadrant).toBe('Beta');
        });

        it('Merry 2/5 + Judicious 3/5 → Delta', () => {
            const result = calculateMiniDiagnosis(
                makeAnswers(['A','A','B','B','B'], ['A','A','A','B','B'])
            );
            expect(result.quadrant).toBe('Delta');
        });
    });

    describe('結果のプロパティ', () => {
        it('timestampが含まれる', () => {
            const result = calculateMiniDiagnosis(
                makeAnswers(['A','A','A','A','A'], ['A','A','A','A','A'])
            );
            expect(result.timestamp).toBeTruthy();
            expect(typeof result.timestamp).toBe('string');
        });

        it('スコアが正しい範囲（0-5）で返る', () => {
            const result = calculateMiniDiagnosis(
                makeAnswers(['A','B','A','B','A'], ['B','A','B','A','B'])
            );
            expect(result.merryScore).toBeGreaterThanOrEqual(0);
            expect(result.merryScore).toBeLessThanOrEqual(5);
            expect(result.judiciousScore).toBeGreaterThanOrEqual(0);
            expect(result.judiciousScore).toBeLessThanOrEqual(5);
        });
    });
});

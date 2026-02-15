import { describe, it, expect } from 'vitest';
import { calculateDiagnosis } from './calculator';
import { type Answers, type OSTypeCode } from '../../../types/diagnosis';

// --- Helper Functions ---

/**
 * Creates an answer set that guarantees a specific score for each dimension.
 * default value for unspecified questions is 'A'.
 */
const createBaseAnswers = (): Answers => {
    const answers: Answers = {};
    for (let i = 1; i <= 72; i++) answers[i] = 'A';
    return answers;
};

const setOSAnswers = (answers: Answers, target: { E?: boolean, N?: boolean, T?: boolean, J?: boolean }) => {
    // 1. E (Extrovert) vs I (Introvert)
    // E indicators: 1A, 8A, 12A, 27B, 32B. Need 3 for E.
    if (target.E) {
        answers[1] = 'A'; answers[8] = 'A'; answers[12] = 'A';
    } else {
        // Force I: Set all E indicators to opposite
        answers[1] = 'B'; answers[8] = 'B'; answers[12] = 'B'; answers[27] = 'A'; answers[32] = 'A';
    }

    // 2. N (Intuition) vs S (Sensing)
    // N indicators: 4A, 6A, 9A, 13A, 17B, 19A. Need 4 for N.
    if (target.N) {
        answers[4] = 'A'; answers[6] = 'A'; answers[9] = 'A'; answers[13] = 'A';
    } else {
        // Force S: Set N indicators to opposite
        answers[4] = 'B'; answers[6] = 'B'; answers[9] = 'B'; answers[13] = 'B'; answers[17] = 'A'; answers[19] = 'B';
    }

    // 3. T (Thinking) vs F (Feeling)
    // T indicators: 3B, 7B, 10B, 14B, 18A, 39B. Need 4 for T.
    if (target.T) {
        answers[3] = 'B'; answers[7] = 'B'; answers[10] = 'B'; answers[14] = 'B';
    } else {
        // Force F: Set T indicators to opposite
        answers[3] = 'A'; answers[7] = 'A'; answers[10] = 'A'; answers[14] = 'A'; answers[18] = 'B'; answers[39] = 'A';
    }

    // 4. J (Judging) vs P (Perceiving)
    // J indicators: 2B, 5A, 11A, 15A, 16B, 20A. Need 4 for J.
    if (target.J) {
        answers[2] = 'B'; answers[5] = 'A'; answers[11] = 'A'; answers[15] = 'A';
    } else {
        // Force P: Set J indicators to opposite
        answers[2] = 'A'; answers[5] = 'B'; answers[11] = 'B'; answers[15] = 'B'; answers[16] = 'A'; answers[20] = 'B';
    }

    return answers;
};

describe('DiagnosisCalculator', () => {

    describe('1. OS Type Calculation (All 16 Types)', () => {
        const types: { code: OSTypeCode, params: { E: boolean, N: boolean, T: boolean, J: boolean } }[] = [
            { code: 'ENTj', params: { E: true, N: true, T: true, J: true } },
            { code: 'ENTp', params: { E: true, N: true, T: true, J: false } },
            { code: 'ENFj', params: { E: true, N: true, T: false, J: true } },
            { code: 'ENFp', params: { E: true, N: true, T: false, J: false } },
            { code: 'ESTj', params: { E: true, N: false, T: true, J: true } },
            { code: 'ESTp', params: { E: true, N: false, T: true, J: false } },
            { code: 'ESFj', params: { E: true, N: false, T: false, J: true } },
            { code: 'ESFp', params: { E: true, N: false, T: false, J: false } },
            { code: 'INTj', params: { E: false, N: true, T: true, J: true } },
            { code: 'INTp', params: { E: false, N: true, T: true, J: false } },
            { code: 'INFj', params: { E: false, N: true, T: false, J: true } },
            { code: 'INFp', params: { E: false, N: true, T: false, J: false } },
            { code: 'ISTj', params: { E: false, N: false, T: true, J: true } },
            { code: 'ISTp', params: { E: false, N: false, T: true, J: false } },
            { code: 'ISFj', params: { E: false, N: false, T: false, J: true } },
            { code: 'ISFp', params: { E: false, N: false, T: false, J: false } },
        ];

        types.forEach(({ code, params }) => {
            it(`should correctly identify ${code}`, () => {
                const answers = createBaseAnswers();
                setOSAnswers(answers, params);
                const result = calculateDiagnosis(answers);
                expect(result.os.code).toBe(code);
            });
        });
    });

    describe('2. Tie-Breaker Logic', () => {
        it('should use Q4 to break N/S tie', () => {
            const answers = createBaseAnswers();
            // Set N score to 3 (Threshold is 4 normally, Low is 2. So 3 is middle/tie zone)
            // Questions: 4, 6, 9, 13, 17B, 19
            // Let's set 6A, 9A, 13A (Score 3)
            answers[4] = 'B'; // Tie breaker Question
            answers[6] = 'A'; answers[9] = 'A'; answers[13] = 'A';
            answers[17] = 'A'; answers[19] = 'B'; // Others off

            // With Q4=B, it should be S (false)
            let result = calculateDiagnosis(answers);
            expect(result.os.code).toContain('S');

            // With Q4=A, it should be N (true)
            answers[4] = 'A';
            result = calculateDiagnosis(answers);
            expect(result.os.code).toContain('N');
        });

        it('should use Q14 to break T/F tie', () => {
            const answers = createBaseAnswers();
            // Set T score to 3
            // Questions: 3B, 7B, 10B, 14B, 18A, 39B
            answers[3] = 'B'; answers[7] = 'B'; answers[10] = 'B';
            answers[14] = 'A'; // Tie breaker Question (B=T, A=F)
            answers[18] = 'B'; answers[39] = 'A';

            // With Q14=A (F answer), it should be F
            let result = calculateDiagnosis(answers);
            expect(result.os.code).toContain('F');

            // With Q14=B (T answer), it should be T
            answers[14] = 'B';
            result = calculateDiagnosis(answers);
            expect(result.os.code).toContain('T');
        });

        it('should use Q15 to break J/P tie', () => {
            const answers = createBaseAnswers();
            // Set J score to 3
            // Questions: 2B, 5A, 11A, 15A, 16B, 20A
            answers[2] = 'B'; answers[5] = 'A'; answers[11] = 'A';
            answers[15] = 'B'; // Tie breaker Q (A=J, B=P)
            answers[16] = 'A'; answers[20] = 'B';

            // With Q15=B (P answer), it should be p
            let result = calculateDiagnosis(answers);
            expect(result.os.code).toMatch(/p$/); // Ends with p

            // With Q15=A (J answer), it should be j
            answers[15] = 'A';
            result = calculateDiagnosis(answers);
            expect(result.os.code).toMatch(/j$/); // Ends with j
        });
    });

    describe('3. Engine Calculation', () => {
        it('should identify Primary Engine correctly', () => {
            const answers = createBaseAnswers();

            // Suppress T2 score to let T3 win (to overcome ENFj tie-breaker bias)
            answers[46] = 'B'; answers[50] = 'B'; answers[55] = 'B'; answers[60] = 'B';

            // Target T3 (Achiever)
            // Q45B(T3), Q51A(T3), Q56A(T3), Q58B(T3)
            answers[45] = 'B'; // T1 vs T3 -> T3
            answers[51] = 'A'; // T3 vs T5 -> T3
            answers[56] = 'A'; // T3 vs T8 -> T3
            answers[58] = 'B'; // T6 vs T3 -> T3

            const result = calculateDiagnosis(answers);
            expect(result.engine.primary).toBe('T3');
        });
    });

    describe('4. Bias Detection', () => {
        it('should detect Confirmation Bias', () => {
            const answers = createBaseAnswers();
            answers[63] = 'A';
            answers[64] = 'A';

            const result = calculateDiagnosis(answers);
            expect(result.bias.alerts).toContain('Confirmation');
            expect(result.bias.scores.Confirmation).toBe(2);
        });

        it('should detect Sunk Cost Fallacy', () => {
            const answers = createBaseAnswers();
            answers[65] = 'A';
            answers[66] = 'A';

            const result = calculateDiagnosis(answers);
            expect(result.bias.alerts).toContain('SunkCost');
        });
    });

    describe('5. Matrix Calculation', () => {
        it('should calculate correct coordinates', () => {
            const answers = createBaseAnswers();
            setOSAnswers(answers, { E: true, N: true, T: true, J: false }); // ENTp
            // ENTp should be High Innovation (N+P), High Logic (T)
            // T score max -> X = 10
            // N score max -> Y component 1
            // P score max -> Y component 2

            const result = calculateDiagnosis(answers);
            expect(result.matrix.x).toBeGreaterThan(5); // Logic side
            expect(result.matrix.y).toBeGreaterThan(5); // Innovation side
        });
    });

    describe('6. Validity Check', () => {
        it('should flag masking when Risk=0 and Engine=T3', () => {
            const answers = createBaseAnswers();

            // Suppress T2 score to let T3 win
            answers[46] = 'B'; answers[50] = 'B'; answers[55] = 'B'; answers[60] = 'B';

            // Set T3 as engine
            answers[45] = 'B'; answers[51] = 'A'; answers[56] = 'A'; answers[58] = 'B';

            // Ensure 0 bias risk
            // All Q63-72 set to 'B'
            for (let i = 63; i <= 72; i++) answers[i] = 'B';

            const result = calculateDiagnosis(answers);
            expect(result.engine.primary).toBe('T3');
            expect(result.bias.totalScore).toBe(0);
            expect(result.validity).toBe('C'); // Should be flagged
        });
    });
});

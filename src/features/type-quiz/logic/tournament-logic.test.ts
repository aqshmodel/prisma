import { describe, it, expect } from 'vitest';
import {
    createInitialState,
    getCurrentQuestion,
    getCurrentQuestionNumber,
    processAnswer,
} from './tournament-logic';
import { STAGE2_QUESTIONS } from '../data/tournament-data';
import type { QuadrantType } from '@/features/mini-diagnosis/data/mini-types';

describe('tournament-logic', () => {
    describe('createInitialState', () => {
        it('初期状態が正しい', () => {
            const state = createInitialState();
            expect(state.stage).toBe('intro');
            expect(state.currentQuestionIndex).toBe(0);
            expect(state.determinedQuadra).toBeNull();
            expect(state.determinedType).toBeNull();
            expect(state.remainingTypes).toEqual([]);
        });
    });

    describe('Stage 1 → Quadra判定', () => {
        it('A+A → Alpha (Merry+Judicious)', () => {
            let state = { ...createInitialState(), stage: 'stage1' as const };
            state = processAnswer(state, 'A'); // Q1: Merry
            state = processAnswer(state, 'A'); // Q2: Judicious
            expect(state.stage).toBe('stage2');
            expect(state.determinedQuadra).toBe('Alpha');
        });

        it('A+B → Beta (Merry+Decisive)', () => {
            let state = { ...createInitialState(), stage: 'stage1' as const };
            state = processAnswer(state, 'A');
            state = processAnswer(state, 'B');
            expect(state.stage).toBe('stage2');
            expect(state.determinedQuadra).toBe('Beta');
        });

        it('B+B → Gamma (Serious+Decisive)', () => {
            let state = { ...createInitialState(), stage: 'stage1' as const };
            state = processAnswer(state, 'B');
            state = processAnswer(state, 'B');
            expect(state.stage).toBe('stage2');
            expect(state.determinedQuadra).toBe('Gamma');
        });

        it('B+A → Delta (Serious+Judicious)', () => {
            let state = { ...createInitialState(), stage: 'stage1' as const };
            state = processAnswer(state, 'B');
            state = processAnswer(state, 'A');
            expect(state.stage).toBe('stage2');
            expect(state.determinedQuadra).toBe('Delta');
        });
    });

    describe('Stage 2 → タイプ確定', () => {
        // 各Quadraで全パターン（AAA, AAB, ABA, ABB, BAA, BAB, BBA, BBB）のうち
        // 到達可能なパスが全タイプに到達するか検証
        const quadras: QuadrantType[] = ['Alpha', 'Beta', 'Gamma', 'Delta'];

        quadras.forEach((quadra) => {
            it(`${quadra}象限: 全4タイプに到達可能`, () => {
                const reachedTypes = new Set<string>();
                const questions = STAGE2_QUESTIONS[quadra];

                // 全8パターン(2^3)の回答を試す
                for (let pattern = 0; pattern < 8; pattern++) {
                    let state = {
                        ...createInitialState(),
                        stage: 'stage2' as const,
                        determinedQuadra: quadra,
                        remainingTypes: [
                            ...questions[0].resultIfA,
                            ...questions[0].resultIfB,
                        ] as string[],
                    };

                    const answers: ('A' | 'B')[] = [
                        pattern & 4 ? 'B' : 'A',
                        pattern & 2 ? 'B' : 'A',
                        pattern & 1 ? 'B' : 'A',
                    ];

                    for (const answer of answers) {
                        if (state.stage === 'complete') break;
                        state = processAnswer(state, answer);
                    }

                    if (state.determinedType) {
                        reachedTypes.add(state.determinedType);
                    }
                }

                // 4タイプ全てに到達可能であること
                expect(reachedTypes.size).toBe(4);
            });
        });
    });

    describe('getCurrentQuestionNumber', () => {
        it('Stage 1 Q1 → 1', () => {
            const state = { ...createInitialState(), stage: 'stage1' as const };
            expect(getCurrentQuestionNumber(state)).toBe(1);
        });

        it('Stage 2 Q1 → 3', () => {
            const state = {
                ...createInitialState(),
                stage: 'stage2' as const,
                determinedQuadra: 'Alpha' as const,
            };
            expect(getCurrentQuestionNumber(state)).toBe(3);
        });
    });

    describe('getCurrentQuestion', () => {
        it('intro状態ではnullを返す', () => {
            const state = createInitialState();
            expect(getCurrentQuestion(state)).toBeNull();
        });

        it('stage1ではStage1の質問を返す', () => {
            const state = { ...createInitialState(), stage: 'stage1' as const };
            const q = getCurrentQuestion(state);
            expect(q).not.toBeNull();
            expect(q?.id).toBe('s1-q1');
        });
    });
});

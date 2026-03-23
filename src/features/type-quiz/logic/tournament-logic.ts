import type { OSTypeCode } from '@/types/diagnosis';
import type { QuadrantType } from '@/features/mini-diagnosis/data/mini-types';
import {
    STAGE1_QUESTIONS,
    STAGE2_QUESTIONS,
    type TournamentState,
    type QuizQuestion,
} from '../data/tournament-data';

/**
 * トーナメントの初期状態
 */
export const createInitialState = (): TournamentState => ({
    stage: 'stage1',
    currentQuestionIndex: 0,
    determinedQuadra: null,
    remainingTypes: [],
    determinedType: null,
    answers: {},
});

/**
 * 現在の質問を取得
 */
export const getCurrentQuestion = (state: TournamentState): QuizQuestion | null => {
    if (state.stage === 'stage1') {
        return STAGE1_QUESTIONS[state.currentQuestionIndex] ?? null;
    }
    if (state.stage === 'stage2' && state.determinedQuadra) {
        const questions = STAGE2_QUESTIONS[state.determinedQuadra];
        return questions[state.currentQuestionIndex] ?? null;
    }
    return null;
};

/**
 * 現在の質問番号（全5問中）
 */
export const getCurrentQuestionNumber = (state: TournamentState): number => {
    if (state.stage === 'stage1') return state.currentQuestionIndex + 1;
    if (state.stage === 'stage2') return state.currentQuestionIndex + 3; // Stage1の2問 + 1
    return 0;
};

/**
 * Stage 1 の回答に基づいて Quadra を判定する
 */
const determineQuadra = (answers: Record<string, 'A' | 'B'>): QuadrantType => {
    const q1 = answers['s1-q1'];
    const q2 = answers['s1-q2'];

    // Q1: A=Merry(Alpha/Beta), B=Serious(Gamma/Delta)
    // Q2: A=Judicious(Alpha/Delta), B=Decisive(Beta/Gamma)
    if (q1 === 'A' && q2 === 'A') return 'Alpha';    // Merry + Judicious
    if (q1 === 'A' && q2 === 'B') return 'Beta';      // Merry + Decisive
    if (q1 === 'B' && q2 === 'B') return 'Gamma';     // Serious + Decisive
    return 'Delta';                                      // Serious + Judicious
};

/**
 * 回答を処理して次の状態を返す
 */
export const processAnswer = (
    state: TournamentState,
    answer: 'A' | 'B'
): TournamentState => {
    const question = getCurrentQuestion(state);
    if (!question) return state;

    const newAnswers = { ...state.answers, [question.id]: answer };
    const selectedTypes = answer === 'A' ? question.resultIfA : question.resultIfB;

    // Stage 1 の処理
    if (state.stage === 'stage1') {
        const nextIndex = state.currentQuestionIndex + 1;

        if (nextIndex >= STAGE1_QUESTIONS.length) {
            // Stage 1 完了 → Quadra判定 → Stage 2 へ
            const quadra = determineQuadra(newAnswers);
            const quadraTypes = STAGE2_QUESTIONS[quadra][0].resultIfA.concat(
                STAGE2_QUESTIONS[quadra][0].resultIfB
            ) as OSTypeCode[];

            return {
                ...state,
                answers: newAnswers,
                stage: 'stage2',
                currentQuestionIndex: 0,
                determinedQuadra: quadra,
                remainingTypes: quadraTypes,
            };
        }

        // Stage 1 の次の質問へ
        return {
            ...state,
            answers: newAnswers,
            currentQuestionIndex: nextIndex,
        };
    }

    // Stage 2 の処理
    if (state.stage === 'stage2' && state.determinedQuadra) {
        const questions = STAGE2_QUESTIONS[state.determinedQuadra];
        const nextIndex = state.currentQuestionIndex + 1;
        const newRemaining = state.remainingTypes.filter(
            (t) => (selectedTypes as OSTypeCode[]).includes(t)
        );

        if (nextIndex >= questions.length || newRemaining.length <= 1) {
            // Stage 2 完了 → タイプ確定
            return {
                ...state,
                answers: newAnswers,
                stage: 'complete',
                remainingTypes: newRemaining,
                determinedType: newRemaining[0] ?? null,
            };
        }

        // Stage 2 の次の質問へ
        return {
            ...state,
            answers: newAnswers,
            currentQuestionIndex: nextIndex,
            remainingTypes: newRemaining,
        };
    }

    return state;
};

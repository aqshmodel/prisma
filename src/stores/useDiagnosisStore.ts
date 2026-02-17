import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Answers, type DiagnosisResult } from '../types/diagnosis';

interface State {
    answers: Answers;
    currentStep: number;
    result: DiagnosisResult | null;
    history: DiagnosisResult[];
    isNewResult: boolean;
}

interface Action {
    setAnswer: (questionId: number, value: 'A' | 'B') => void;
    nextStep: () => void;
    prevStep: () => void;
    resetDiagnosis: () => void;
    setResult: (result: DiagnosisResult) => void;
    restoreLastResult: () => void;
    markResultAsSaved: () => void;
    clearHistory: () => void;
}

export const useDiagnosisStore = create<State & Action>()(
    persist(
        (set) => ({
            answers: {},
            currentStep: 0, // 0 means Introduction/Top page, 1 means Question 1? Or 0 index? Let's say 1-based step for questions for clarity, or 0 for landing.
            // Let's stick to: 0 = Landing, 1 = Q1-Q10, 2 = Q11-Q20... (Page based)
            // Actually, finer control: `currentQuestionIndex` or just a step phase.
            // To match wizard logic:
            // Step 0: Landing
            // Step 1: Q1-Q10
            // ...
            // Step 8: Results (calculated)
            result: null,
            history: [],
            isNewResult: false,

            setAnswer: (id, value) => set((state) => ({
                answers: { ...state.answers, [id]: value }
            })),

            nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
            prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),

            resetDiagnosis: () => set({ answers: {}, currentStep: 0, result: null, isNewResult: false }),

            setResult: (result) => set(() => ({
                result: result,
                history: [result], // Keep only the latest one
                isNewResult: true, // Mark as new result
            })),

            restoreLastResult: () => set((state) => ({
                result: state.history.length > 0 ? state.history[0] : null,
                isNewResult: false // Restored results are not "new"
            })),

            markResultAsSaved: () => set({ isNewResult: false }), // Action to reset the flag

            clearHistory: () => set({ history: [] })
        }),
        {
            name: 'aqsh-prisma-storage',
            partialize: (state) => ({
                history: state.history,
                answers: state.answers,
                currentStep: state.currentStep
            }),
        }
    )
);

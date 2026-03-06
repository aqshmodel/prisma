import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Answers, type DiagnosisResult } from '../types/diagnosis';

interface State {
    /** 各設問への回答（キー: 設問ID, 値: 'A' | 'B'） */
    answers: Answers;
    /** 診断結果 */
    result: DiagnosisResult | null;
    /** 過去の診断結果（現在は最新1件のみ保持） */
    history: DiagnosisResult[];
    /** 結果がFirebaseに未保存かどうかのフラグ */
    isNewResult: boolean;
}

interface Action {
    /** 特定の設問に回答する */
    setAnswer: (questionId: number, value: 'A' | 'B') => void;
    /** 診断をリセット（全回答・結果をクリア） */
    resetDiagnosis: () => void;
    /** 診断結果を設定 */
    setResult: (result: DiagnosisResult) => void;
    /** 履歴から最新の結果を復元 */
    restoreLastResult: () => void;
    /** 結果を保存済みとしてマーク */
    markResultAsSaved: () => void;
    /** 履歴をクリア */
    clearHistory: () => void;
}

export const useDiagnosisStore = create<State & Action>()(
    persist(
        (set) => ({
            answers: {},
            result: null,
            history: [],
            isNewResult: false,

            setAnswer: (id, value) => set((state) => ({
                answers: { ...state.answers, [id]: value }
            })),

            resetDiagnosis: () => set({ answers: {}, result: null, isNewResult: false }),

            setResult: (result) => set(() => ({
                result: result,
                history: [result], // 最新1件のみ保持
                isNewResult: true,
            })),

            restoreLastResult: () => set((state) => ({
                result: state.history.length > 0 ? state.history[0] : null,
                isNewResult: false,
            })),

            markResultAsSaved: () => set({ isNewResult: false }),

            clearHistory: () => set({ history: [] }),
        }),
        {
            name: 'aqsh-prisma-storage',
            /**
             * LocalStorageに永続化するフィールドを制限。
             * answers は再開時に必要、history は結果復元用。
             */
            partialize: (state) => ({
                history: state.history,
                answers: state.answers,
            }),
        }
    )
);

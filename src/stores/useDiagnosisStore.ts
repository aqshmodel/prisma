import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type Answers, type DiagnosisResult } from "../types/diagnosis";

let durableStorage = true;
export const isDiagnosisStorageDurable = () => durableStorage;
const diagnosisStorage = createJSONStorage(() => ({
  getItem: (name: string) => {
    try {
      return localStorage.getItem(name);
    } catch {
      durableStorage = false;
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    try {
      localStorage.setItem(name, value);
      durableStorage = true;
    } catch {
      durableStorage = false;
    }
  },
  removeItem: (name: string) => {
    try {
      localStorage.removeItem(name);
    } catch {
      durableStorage = false;
    }
  },
}));

export interface PendingDiagnosis {
  id: string;
  locale: "ja" | "en";
  result: DiagnosisResult;
}

interface State {
  pending: PendingDiagnosis[];
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
  completeDiagnosis: (result: DiagnosisResult, locale: "ja" | "en") => void;
  acknowledgeSubmission: (id: string) => void;
  /** 特定の設問に回答する */
  setAnswer: (questionId: number, value: "A" | "B") => void;
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
      pending: [],
      answers: {},
      result: null,
      history: [],
      isNewResult: false,

      completeDiagnosis: (result, locale) =>
        set((state) => ({
          result,
          history: [result],
          isNewResult: true,
          pending: [
            ...state.pending,
            { id: crypto.randomUUID(), locale, result },
          ],
        })),
      acknowledgeSubmission: (id) =>
        set((state) => ({
          pending: state.pending.filter((item) => item.id !== id),
          isNewResult: false,
        })),

      setAnswer: (id, value) =>
        set((state) => ({
          answers: { ...state.answers, [id]: value },
        })),

      resetDiagnosis: () =>
        set({ answers: {}, result: null, isNewResult: false }),

      setResult: (result) =>
        set(() => ({
          result: result,
          history: [result], // 最新1件のみ保持
          isNewResult: false,
        })),

      restoreLastResult: () =>
        set((state) => ({
          result: state.history.length > 0 ? state.history[0] : null,
          isNewResult: false,
        })),

      markResultAsSaved: () => set({ isNewResult: false }),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "aqsh-prisma-storage",
      storage: diagnosisStorage,
      /**
       * LocalStorageに永続化するフィールドを制限。
       * answers は再開時に必要、history は結果復元用。
       */
      partialize: (state) => ({
        history: state.history,
        pending: state.pending,
        answers: state.answers,
      }),
    },
  ),
);

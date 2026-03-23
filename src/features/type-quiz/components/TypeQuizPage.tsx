'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
    createInitialState,
    getCurrentQuestion,
    getCurrentQuestionNumber,
    processAnswer,
} from '../logic/tournament-logic';
import type { TournamentState } from '../data/tournament-data';
import { Target, Zap } from 'lucide-react';
import { clsx } from 'clsx';

export const TypeQuizPage: React.FC = () => {
    const router = useRouter();
    // createInitialStateは stage: 'stage1' から始まるようになっている
    const [state, setState] = useState<TournamentState>(createInitialState);
    const [isAnimating, setIsAnimating] = useState(false);

    const question = getCurrentQuestion(state);
    const questionNumber = getCurrentQuestionNumber(state);

    const handleAnswer = useCallback(
        (answer: 'A' | 'B') => {
            if (isAnimating) return;
            setIsAnimating(true);

            // アニメーション後に次の質問へ
            setTimeout(() => {
                const nextState = processAnswer(state, answer);
                setState(nextState);
                setIsAnimating(false);

                if (nextState.stage === 'complete' && nextState.determinedType) {
                    // 結果ページへ遷移
                    setTimeout(() => {
                        router.push(`/type-quiz/result/?type=${nextState.determinedType}`);
                    }, 800);
                }
            }, 400); // 400ms のフェードアウト・イン
        },
        [state, isAnimating, router]
    );

    // 結果演出画面（complete → ルーティング前のローディング）
    if (state.stage === 'complete') {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 animate-fade-in-up">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin" />
                    <Target className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-teal-500" />
                </div>
                <div className="text-center">
                    <p className="text-lg font-serif font-medium text-slate-700">タイプを特定中...</p>
                    <p className="text-sm text-slate-400 mt-1">あなたにぴったりのタイプを見つけています</p>
                </div>
            </div>
        );
    }

    // クイズ質問画面
    if (!question) return null;

    const stageLabel = state.stage === 'stage1' ? 'Step 1: 象限を判定' : 'Step 2: タイプを特定';

    return (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            
            {/* Header & Progress */}
            <div className="mb-8 text-center animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 mb-4">
                    {state.stage === 'stage1' ? (
                        <Zap size={14} className="text-teal-500" />
                    ) : (
                        <Target size={14} className="text-teal-500" />
                    )}
                    <span className="text-xs font-medium text-teal-600">
                        {stageLabel}
                    </span>
                </div>

                <div className="flex justify-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <div
                            key={n}
                            className={clsx(
                                'w-10 h-1.5 rounded-full transition-all duration-500',
                                n < questionNumber
                                    ? 'bg-teal-500' // 完了
                                    : n === questionNumber
                                      ? 'bg-teal-400 animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.5)]' // 現在
                                      : 'bg-slate-100' // 未完了
                            )}
                        />
                    ))}
                </div>
                <p className="text-sm text-slate-400 font-medium tracking-wide">
                    {questionNumber} <span className="text-slate-300 mx-1">/</span> 5
                </p>
            </div>

            {/* Question Card (1-by-1 Display) */}
            <div className={clsx(
                'transition-all duration-400 ease-out transform',
                isAnimating ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
            )}>
                <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 max-w-3xl mx-auto">
                    
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-800 text-center mb-8 sm:mb-12 leading-relaxed">
                        {question.text}
                    </h2>

                    {/* 2択カード */}
                    <div className="space-y-4">
                        {(['A', 'B'] as const).map((choice) => {
                            const text = choice === 'A' ? question.choiceA : question.choiceB;
                            return (
                                <button
                                    key={choice}
                                    onClick={() => handleAnswer(choice)}
                                    disabled={isAnimating}
                                    className="w-full text-left rounded-2xl p-5 sm:p-6 border-2 border-slate-100 bg-slate-50/50 hover:border-teal-400 hover:shadow-lg hover:bg-teal-50/30 transition-all duration-200 active:scale-[0.98] group relative overflow-hidden"
                                >
                                    <div className="flex items-center gap-4 relative z-10">
                                        <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 group-hover:border-teal-200 flex items-center justify-center text-xl font-bold text-slate-400 group-hover:text-teal-500 transition-colors">
                                            {choice}
                                        </span>
                                        <span className="text-base sm:text-lg font-medium leading-relaxed text-slate-600 group-hover:text-slate-800 transition-colors">
                                            {text}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 to-teal-500/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                                </button>
                            );
                        })}
                    </div>

                </div>
            </div>

            <div className="text-center mt-8">
               <p className="text-xs text-slate-400">
                   ※ 直感で「自分に近い」と思う方を選んでください。
               </p>
            </div>

        </div>
    );
};

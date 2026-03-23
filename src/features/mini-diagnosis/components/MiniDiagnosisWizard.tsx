'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { QuestionCard } from '@/features/diagnosis/components/QuestionCard';
import { MINI_QUESTIONS } from '../data/mini-questions';
import { calculateMiniDiagnosis } from '../logic/mini-calculator';
import { ArrowLeft, Sparkles, Zap } from 'lucide-react';

type AnswerValue = 'A' | 'B';

export const MiniDiagnosisWizard: React.FC = () => {
    const router = useRouter();
    const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
    const [isComputing, setIsComputing] = useState(false);

    const totalQuestions = MINI_QUESTIONS.length;
    const answeredCount = Object.keys(answers).length;
    const progress = Math.round((answeredCount / totalQuestions) * 100);
    const allAnswered = answeredCount === totalQuestions;

    const handleAnswer = useCallback((id: number, value: AnswerValue) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    }, []);

    const handleSubmit = useCallback(() => {
        if (!allAnswered) return;
        setIsComputing(true);

        // 必須ではないが、少しロマンのためのローディング演出
        setTimeout(() => {
            const result = calculateMiniDiagnosis(answers);
            const params = new URLSearchParams({
                q: result.quadrant,
                ms: String(result.merryScore),
                js: String(result.judiciousScore),
            });
            router.push(`/mini-diagnosis/result/?${params.toString()}`);
        }, 1500);
    }, [allAnswered, answers, router]);

    if (isComputing) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 animate-fade-in-up">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-teal-500" />
                </div>
                <div className="text-center">
                    <p className="text-lg font-serif font-medium text-slate-700">分析中...</p>
                    <p className="text-sm text-slate-400 mt-1">あなたの象限を判定しています</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {/* Header */}
            <div className="text-center mb-10 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 border border-teal-200 rounded-full mb-4">
                    <Zap className="w-4 h-4 text-teal-500" />
                    <span className="text-xs font-medium text-teal-600 tracking-wide">
                        約3分で完了
                    </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-medium text-slate-800 mb-3">
                    4象限クイック診断
                </h1>
                <p className="text-slate-500 leading-relaxed max-w-xl mx-auto">
                    直感で「自分に近い」と思う方を選んでください。<br className="hidden sm:block" />
                    全10問に回答すると、結果が表示されます。
                </p>
            </div>

            {/* Sticky Progress Bar */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:bg-transparent sm:backdrop-blur-none sm:border-none sm:py-0">
                <div className="flex justify-between items-center text-sm mb-2">
                    <span className="font-bold text-slate-700">
                        進捗状況
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                        {answeredCount} / {totalQuestions}
                    </span>
                </div>
                <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-teal-300 to-teal-500 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
                {MINI_QUESTIONS.map((question) => (
                    <QuestionCard
                        key={question.id}
                        question={{
                            id: question.id,
                            text: question.text,
                            choiceA: question.choiceA,
                            choiceB: question.choiceB,
                            category: 'OS',
                        }}
                        selectedValue={answers[question.id]}
                        onSelect={(val) => handleAnswer(question.id, val)}
                    />
                ))}
            </div>

            {/* Footer Actions */}
            <div className="mt-12 flex flex-col items-center border-t border-slate-100 pt-8 pb-16">
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className={`px-12 py-4 text-lg font-bold rounded-full shadow-lg transition-all duration-300 w-full sm:w-auto ${
                        allAnswered
                            ? 'bg-teal-500 hover:bg-teal-600 shadow-teal-200/50 hover:-translate-y-1 text-white border-transparent'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed border-transparent shadow-none'
                    }`}
                >
                    <Sparkles className="w-5 h-5 mr-2" />
                    診断結果を見る
                </Button>

                <Button
                    variant="ghost"
                    onClick={() => router.push('/')}
                    className="mt-6 text-slate-400 hover:text-slate-600"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    トップへ戻る
                </Button>
            </div>
        </div>
    );
};

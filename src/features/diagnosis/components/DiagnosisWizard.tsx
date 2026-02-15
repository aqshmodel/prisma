'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/Button';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { QuestionCard } from './QuestionCard';
import { LoadingAnalysis } from './LoadingAnalysis';
import { useDiagnosisStore } from '../../../stores/useDiagnosisStore';
import { QUESTIONS } from '../data/questions';
import { calculateDiagnosis } from '../logic/calculator';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const QUESTIONS_PER_PAGE = 10;

export const DiagnosisWizard: React.FC = () => {
    const router = useRouter();
    const { answers, setAnswer, setResult } = useDiagnosisStore();
    const [currentPage, setCurrentPage] = useState(0);
    const [isComputing, setIsComputing] = useState(false);

    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const totalPages = Math.ceil(QUESTIONS.length / QUESTIONS_PER_PAGE);
    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const currentQuestions = QUESTIONS.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

    // Progress logic
    const answeredCount = Object.keys(answers).length;
    const progress = Math.min(100, Math.round((answeredCount / QUESTIONS.length) * 100));

    // Check if current page is complete
    const isPageComplete = currentQuestions.every(q => answers[q.id]);

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(p => p + 1);
        } else {
            finishDiagnosis();
        }
    };

    const handleBack = () => {
        if (currentPage > 0) {
            setCurrentPage(p => p - 1);
        } else {
            router.push('/');
        }
    };

    const finishDiagnosis = () => {
        setIsComputing(true);
        // Mimic calculation delay is handled by LoadingAnalysis
    };

    const handleAnalysisComplete = () => {
        const result = calculateDiagnosis(answers);
        setResult(result);
        router.push('/result');
    };

    if (isComputing) {
        return <LoadingAnalysis onComplete={handleAnalysisComplete} />;
    }

    return (
        <div className="w-full mx-auto">
            {/* Header Progress */}
            <div className="mb-8 sticky top-16 bg-white/90 backdrop-blur-sm z-40 py-4 -mx-4 px-4 md:mx-0 md:px-0 border-b md:border-none border-prisma-50">
                <div className="flex justify-between text-sm text-slate-500 mb-2 font-medium">
                    <span>進捗状況</span>
                    <span>{progress}% ({answeredCount} / {QUESTIONS.length})</span>
                </div>
                <ProgressBar progress={progress} />
            </div>

            <div className="space-y-6">
                {currentQuestions.map((q) => (
                    <QuestionCard
                        key={q.id}
                        question={q}
                        selectedValue={answers[q.id]}
                        onSelect={(val) => setAnswer(q.id, val)}
                    />
                ))}
            </div>

            {/* Footer Actions */}
            <div className="mt-10 flex items-center justify-between p-4 bg-white rounded-xl shadow-lg border border-prisma-100 sticky bottom-4 z-40">
                <Button variant="ghost" onClick={handleBack} className="text-slate-400 hover:text-slate-600">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    戻る
                </Button>

                <Button
                    variant={isPageComplete ? 'primary' : 'secondary'}
                    onClick={handleNext}
                    disabled={!isPageComplete}
                    className="min-w-[140px]"
                >
                    {currentPage === totalPages - 1 ? (
                        <>
                            診断完了
                            <CheckCircle className="w-5 h-5 ml-2" />
                        </>
                    ) : (
                        <>
                            次へ
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                    )}
                </Button>
            </div>

            <div className="h-8" />{/* Spacer */}
        </div>
    );
};

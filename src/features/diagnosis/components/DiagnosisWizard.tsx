'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { QuestionCard } from './QuestionCard';
import { LoadingAnalysis } from './LoadingAnalysis';
import { useDiagnosisStore } from '@/stores/useDiagnosisStore';
import { QUESTIONS } from '../data/questions';
import { calculateDiagnosis } from '../logic/calculator';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Sparkles } from 'lucide-react';

const QUESTIONS_PER_PAGE = 10;
const TOTAL_PAGES = Math.ceil(QUESTIONS.length / QUESTIONS_PER_PAGE);

// セクション定義
const SECTIONS = [
    { name: '思考パターン', category: 'OS', startQ: 1, endQ: 20, color: 'prisma' },
    { name: '行動傾向', category: 'Subtype', startQ: 21, endQ: 44, color: 'blue' },
    { name: '行動エンジン', category: 'Engine', startQ: 45, endQ: 62, color: 'violet' },
    { name: '判断バイアス', category: 'Bias', startQ: 63, endQ: 72, color: 'amber' },
] as const;

// ページ→セクション情報を取得
function getSectionInfo(page: number) {
    const startQ = page * QUESTIONS_PER_PAGE + 1;
    const sectionIndex = SECTIONS.findIndex(s => startQ >= s.startQ && startQ <= s.endQ);
    return { section: SECTIONS[sectionIndex] ?? SECTIONS[0], sectionIndex };
}

// セクション切り替わり時のメッセージ
function getSectionTransitionMessage(page: number, prevPage: number): string | null {
    if (page <= prevPage) return null; // 戻りでは表示しない
    const { sectionIndex: currIdx } = getSectionInfo(page);
    const { sectionIndex: prevIdx } = getSectionInfo(prevPage);
    if (currIdx === prevIdx) return null;

    switch (currIdx) {
        case 1: return '✅ 思考パターン編 完了！ 次は行動の傾向を見ていきます';
        case 2: return '✅ 行動傾向 完了！ あなたの行動エンジンを特定します';
        case 3: return '✅ もうすぐ完了！ 最後に判断パターンを見ます';
        default: return null;
    }
}

export const DiagnosisWizard: React.FC = () => {
    const router = useRouter();
    const { answers, setAnswer, setResult } = useDiagnosisStore();
    const [currentPage, setCurrentPage] = useState(0);
    const [prevPage, setPrevPage] = useState(0);
    const [isComputing, setIsComputing] = useState(false);
    const [showTransition, setShowTransition] = useState(false);
    const [transitionMessage, setTransitionMessage] = useState<string | null>(null);

    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // セクション切り替わりメッセージ
    useEffect(() => {
        const msg = getSectionTransitionMessage(currentPage, prevPage);
        if (msg) {
            setTransitionMessage(msg);
            setShowTransition(true);
            const timer = setTimeout(() => setShowTransition(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [currentPage, prevPage]);

    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const currentQuestions = QUESTIONS.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

    // Progress logic
    const answeredCount = Object.keys(answers).length;
    const progress = Math.min(100, Math.round((answeredCount / QUESTIONS.length) * 100));
    const isPageComplete = currentQuestions.every(q => answers[q.id]);

    // 残り時間の計算（全体約10分 = 72問、1問あたり約8.3秒）
    const remainingQuestions = QUESTIONS.length - answeredCount;
    const remainingMinutes = Math.max(1, Math.ceil(remainingQuestions * (10 / 72)));

    // 現在のセクション情報
    const { section: currentSection } = getSectionInfo(currentPage);

    const handleNext = useCallback(() => {
        setPrevPage(currentPage);
        if (currentPage < TOTAL_PAGES - 1) {
            setCurrentPage(p => p + 1);
        } else {
            finishDiagnosis();
        }
    }, [currentPage]);

    const handleBack = useCallback(() => {
        if (currentPage > 0) {
            setPrevPage(currentPage);
            setCurrentPage(p => p - 1);
        } else {
            // ページ1で戻るを押した場合: 確認ダイアログ
            const confirmed = window.confirm(
                '診断を中断しますか？\n回答データは保持されるため、後から再開できます。'
            );
            if (confirmed) {
                router.push('/');
            }
        }
    }, [currentPage, router]);

    const finishDiagnosis = () => {
        setIsComputing(true);
    };

    const handleAnalysisComplete = useCallback(() => {
        const result = calculateDiagnosis(answers);
        setResult(result);
        router.push('/result');
    }, [answers, setResult, router]);

    if (isComputing) {
        return <LoadingAnalysis onComplete={handleAnalysisComplete} />;
    }

    return (
        <div className="w-full mx-auto">
            {/* Progress Header - Sticky */}
            <div className="mb-6 sticky top-16 bg-white/95 backdrop-blur-md z-40 py-4 -mx-4 px-4 md:mx-0 md:px-0 border-b border-prisma-100 shadow-sm">
                {/* 上段: ページ番号 + 残り時間 */}
                <div className="flex justify-between items-center text-sm mb-2">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-700">
                            ページ {currentPage + 1} / {TOTAL_PAGES}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-prisma-50 text-prisma-600 font-medium">
                            {currentSection.name}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">
                            {answeredCount === 0 ? '約10分' : `あと約${remainingMinutes}分`}
                        </span>
                    </div>
                </div>

                {/* プログレスバー（セクション区切り付き） */}
                <div className="relative w-full h-2.5 bg-prisma-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-prisma-400 to-prisma-600 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                    {/* セクション区切りマーカー */}
                    {SECTIONS.slice(0, -1).map((s, i) => {
                        const position = (s.endQ / QUESTIONS.length) * 100;
                        return (
                            <div
                                key={i}
                                className="absolute top-0 w-0.5 h-full bg-white/60"
                                style={{ left: `${position}%` }}
                            />
                        );
                    })}
                </div>

                {/* 下段: 進捗詳細 */}
                <div className="flex justify-between text-xs text-slate-400 mt-1.5">
                    <span>{answeredCount} / {QUESTIONS.length} 問回答済み</span>
                    <span>{progress}%</span>
                </div>
            </div>

            {/* セクション切り替わりメッセージ */}
            {showTransition && transitionMessage && (
                <div className="mb-6 p-4 bg-gradient-to-r from-prisma-50 to-blue-50 border border-prisma-200 rounded-xl animate-fade-in-up">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-prisma-500 flex-shrink-0" />
                        <p className="text-sm font-bold text-prisma-700">{transitionMessage}</p>
                    </div>
                </div>
            )}

            {/* Questions */}
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
                    {currentPage === 0 ? '中断' : '戻る'}
                </Button>

                <Button
                    variant={isPageComplete ? 'primary' : 'secondary'}
                    onClick={handleNext}
                    disabled={!isPageComplete}
                    className="min-w-[140px]"
                >
                    {currentPage === TOTAL_PAGES - 1 ? (
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

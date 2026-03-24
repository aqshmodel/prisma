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
import { useLocale, useLocalePath, getUIText } from '@/lib/i18n';
import { getQuestions } from '@/lib/i18n/localized-data';

const QUESTIONS_PER_PAGE = 10;
const TOTAL_PAGES = Math.ceil(QUESTIONS.length / QUESTIONS_PER_PAGE);

// セクション定義（ロケール対応）
function getSections(locale: 'ja' | 'en') {
    const t = getUIText(locale);
    return [
        { name: t.diagnosis.sectionNames.os, category: 'OS', startQ: 1, endQ: 20, color: 'prisma' },
        { name: t.diagnosis.sectionNames.subtype, category: 'Subtype', startQ: 21, endQ: 44, color: 'blue' },
        { name: t.diagnosis.sectionNames.engine, category: 'Engine', startQ: 45, endQ: 62, color: 'violet' },
        { name: t.diagnosis.sectionNames.bias, category: 'Bias', startQ: 63, endQ: 72, color: 'amber' },
    ] as const;
}

// ページ→セクション情報を取得
function getSectionInfo(page: number, locale: 'ja' | 'en') {
    const sections = getSections(locale);
    const startQ = page * QUESTIONS_PER_PAGE + 1;
    const sectionIndex = sections.findIndex(s => startQ >= s.startQ && startQ <= s.endQ);
    return { section: sections[sectionIndex] ?? sections[0], sectionIndex };
}

// セクション切り替わり時のメッセージ
function getSectionTransitionMessage(page: number, prevPage: number, locale: 'ja' | 'en'): string | null {
    if (page <= prevPage) return null; // 戻りでは表示しない
    const sections = getSections(locale);
    const t = getUIText(locale);
    const { sectionIndex: currIdx } = getSectionInfo(page, locale);
    const { sectionIndex: prevIdx } = getSectionInfo(prevPage, locale);
    if (currIdx === prevIdx) return null;
    void sections; // suppress unused warning

    switch (currIdx) {
        case 1: return t.diagnosis.transitions.s1;
        case 2: return t.diagnosis.transitions.s2;
        case 3: return t.diagnosis.transitions.s3;
        default: return null;
    }
}

export const DiagnosisWizard: React.FC = () => {
    const router = useRouter();
    const locale = useLocale();
    const localePath = useLocalePath();
    const t = getUIText(locale);
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
        const msg = getSectionTransitionMessage(currentPage, prevPage, locale);
        if (msg) {
            setTransitionMessage(msg);
            setShowTransition(true);
            const timer = setTimeout(() => setShowTransition(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [currentPage, prevPage, locale]);

    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const localizedQuestions = getQuestions(locale);
    const currentQuestions = localizedQuestions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

    // Progress logic
    const answeredCount = Object.keys(answers).length;
    const progress = Math.min(100, Math.round((answeredCount / QUESTIONS.length) * 100));
    const isPageComplete = currentQuestions.every(q => answers[q.id]);

    // 残り時間の計算（全体約10分 = 72問、1問あたり約8.3秒）
    const remainingQuestions = QUESTIONS.length - answeredCount;
    const remainingMinutes = Math.max(1, Math.ceil(remainingQuestions * (10 / 72)));

    // 現在のセクション情報
    const { section: currentSection } = getSectionInfo(currentPage, locale);

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
            const confirmed = window.confirm(t.diagnosis.abortConfirm);
            if (confirmed) {
                router.push(localePath('/'));
            }
        }
    }, [currentPage, router, t.diagnosis.abortConfirm, localePath]);

    const finishDiagnosis = () => {
        setIsComputing(true);
    };

    const handleAnalysisComplete = useCallback(() => {
        const result = calculateDiagnosis(answers);
        setResult(result);
        router.push(localePath('/result'));
    }, [answers, setResult, router, localePath]);

    if (isComputing) {
        return <LoadingAnalysis onComplete={handleAnalysisComplete} />;
    }

    return (
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Progress Header - Sticky */}
            <div className="mb-6 sticky top-16 bg-white/95 backdrop-blur-md z-40 py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-prisma-100 shadow-sm">
                {/* 上段: ページ番号 + 残り時間 */}
                <div className="flex justify-between items-center text-sm mb-2">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-700">
                            {locale === 'ja' ? `ページ ${currentPage + 1} / ${TOTAL_PAGES}` : `Page ${currentPage + 1} / ${TOTAL_PAGES}`}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-prisma-50 text-prisma-600 font-medium">
                            {currentSection.name}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">
                            {answeredCount === 0 ? t.diagnosis.aboutMinutes : t.diagnosis.remainingMinutes(remainingMinutes)}
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
                    {getSections(locale).slice(0, -1).map((s, i) => {
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
                    <span>{t.diagnosis.answeredOf(answeredCount, QUESTIONS.length)}</span>
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
                    {currentPage === 0 ? t.diagnosis.abort : t.diagnosis.back}
                </Button>

                <Button
                    variant={isPageComplete ? 'primary' : 'secondary'}
                    onClick={handleNext}
                    disabled={!isPageComplete}
                    className="min-w-[140px]"
                >
                    {currentPage === TOTAL_PAGES - 1 ? (
                        <>
                            {t.diagnosis.complete}
                            <CheckCircle className="w-5 h-5 ml-2" />
                        </>
                    ) : (
                        <>
                            {t.diagnosis.next}
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                    )}
                </Button>
            </div>

            <div className="h-8" />{/* Spacer */}
        </div>
    );
};

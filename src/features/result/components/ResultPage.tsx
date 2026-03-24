'use client';

import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    LayoutDashboard,
    Microscope,
    Users,
    Briefcase,
    TrendingUp,
    RotateCcw,
    Download,
    Share2
} from 'lucide-react';

import { FormattedText } from '@/components/ui/FormattedText';
import { useDiagnosisStore } from '@/stores/useDiagnosisStore';
import { usePairStore } from '@/stores/usePairStore';
import { OS_CONTENT } from '../data/content-os';
import { ENGINE_CONTENT } from '../data/content-engine';
import { BIAS_CONTENT } from '../data/content-bias';
import { Button } from '@/components/ui/Button';
import { ShareButtons } from '@/components/common/ShareButtons';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { PrintLayout } from './PrintLayout';
import { RelatedArticlesForResult } from './RelatedArticlesForResult';
import { ResultCompatibilityCTA } from './ResultCompatibilityCTA';
import { resolveColor } from '@/lib/constants/color-map';
import { SITE_CONFIG } from '@/lib/constants/site-config';
import { decodeResult, buildSharedResult } from '@/lib/utils/share-result';
import type { OSTypeCode } from '@/types/diagnosis';

// Tab Components (lazy loading for code splitting)
const OverviewTab = lazy(() => import('./tabs/OverviewTab').then(m => ({ default: m.OverviewTab })));
const AnalysisTab = lazy(() => import('./tabs/AnalysisTab').then(m => ({ default: m.AnalysisTab })));
const WorkTab = lazy(() => import('./tabs/WorkTab').then(m => ({ default: m.WorkTab })));
const RelationsTab = lazy(() => import('./tabs/RelationsTab').then(m => ({ default: m.RelationsTab })));
const GrowthTab = lazy(() => import('./tabs/GrowthTab').then(m => ({ default: m.GrowthTab })));


type TabType = 'overview' | 'analysis' | 'work' | 'relations' | 'growth';

/** ペア相性診断への導線コンポーネント */
const PairDiagnosisCTA: React.FC<{ myCode: OSTypeCode; myName: string }> = ({ myCode, myName }) => {
    const router = useRouter();
    const partnerCode = usePairStore((s) => s.partnerCode);
    const isValidInvite = usePairStore((s) => s.isValidInvite);
    const clearPartnerCode = usePairStore((s) => s.clearPartnerCode);
    const [mounted, setMounted] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => setMounted(true), []);

    const inviteUrl = `${SITE_CONFIG.baseUrl}/pair/invite/${myCode}/`;
    const hasValidPair = mounted && isValidInvite() && partnerCode;
    const partnerData = hasValidPair ? OS_CONTENT[partnerCode] : null;
    const partnerName = partnerData ? partnerData.name.split('(')[0].trim() : '';

    const handleCopyInvite = async () => {
        try {
            await navigator.clipboard.writeText(inviteUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
            prompt('招待URLをコピーしてください:', inviteUrl);
        }
    };

    const handleGoToPairResult = () => {
        if (!partnerCode) return;
        clearPartnerCode();
        router.push(`/pair/result/${partnerCode}/${myCode}/`);
    };

    return (
        <div className="mt-12 space-y-6 animate-fade-in-up">
            {/* Bさん向け: ペア招待経由で診断完了した場合のCTA */}
            {hasValidPair && (
                <div className="bg-gradient-to-r from-teal-50 to-teal-100/60 border-2 border-teal-300 rounded-2xl p-6 sm:p-8 text-center">
                    <Users size={32} className="text-teal-500 mx-auto mb-3" />
                    <h3 className="text-xl font-serif font-bold text-slate-800 mb-2">
                        {partnerName}さんとの相性結果を見る！
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 max-w-md mx-auto">
                        {partnerName}（{partnerCode}）とあなた（{myName.split('(')[0].trim()}）の相性を今すぐチェック。
                    </p>
                    <Button
                        onClick={handleGoToPairResult}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-base font-bold"
                    >
                        相性結果を見る
                        <Users size={18} className="ml-2" />
                    </Button>
                </div>
            )}

            {/* Aさん向け: 誰かを招待するCTA */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-center">
                <h3 className="text-lg font-serif font-bold text-slate-800 mb-2">
                    💕 恋人や友人とペア相性診断をしてみませんか？
                </h3>
                <p className="text-sm text-slate-600 mb-4 max-w-md mx-auto">
                    招待URLを送って、二人の相性を確認しましょう。ソシオニクス14種の関係性から分析します。
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                        onClick={handleCopyInvite}
                        variant="outline"
                        className="border-teal-300 text-teal-700 hover:bg-teal-50"
                    >
                        {copied ? '✓ コピーしました！' : '📋 招待URLをコピー'}
                    </Button>
                    <button
                        onClick={() => {
                            const text = `私は「${myName}」タイプでした！あなたとの相性を診断してみない？`;
                            window.open(
                                `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(inviteUrl)}&text=${encodeURIComponent(text)}`,
                                '_blank'
                            );
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#06C755] text-white text-sm font-medium rounded-xl hover:bg-[#05b34c] transition-colors"
                    >
                        LINEで招待する
                    </button>
                </div>
            </div>
        </div>
    );
};

export const ResultPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const result = useDiagnosisStore((state) => state.result);
    const setResult = useDiagnosisStore((state) => state.setResult);
    const reset = useDiagnosisStore((state) => state.resetDiagnosis);
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    /** 共有URLからの閲覧かどうか（Firestore保存をスキップ、CTAを表示） */
    const [isSharedView, setIsSharedView] = useState(false);

    // Print logic state and ref
    const [isPrinting, setIsPrinting] = useState(false);
    const componentRef = useRef<HTMLDivElement>(null);
    const promiseResolveRef = useRef<(() => void) | null>(null);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `Prisma_Result_${result?.os.code || 'Analysis'}`,
        onBeforePrint: React.useCallback(() => {
            return new Promise<void>((resolve) => {
                promiseResolveRef.current = resolve;
                setIsPrinting(true);
            });
        }, []),
        onAfterPrint: React.useCallback(() => {
            promiseResolveRef.current = null;
            setIsPrinting(false);
        }, []),
    });

    useEffect(() => {
        if (isPrinting && promiseResolveRef.current) {
            promiseResolveRef.current();
            promiseResolveRef.current = null;
        }
    }, [isPrinting]);

    const restore = useDiagnosisStore((state) => state.restoreLastResult);
    const history = useDiagnosisStore((state) => state.history);
    const isNewResult = useDiagnosisStore((state) => state.isNewResult);
    const markResultAsSaved = useDiagnosisStore((state) => state.markResultAsSaved);
    const dataSavedRef = useRef(false);

    useEffect(() => {
        if (!result) {
            // 1. URLの共有パラメータから復元を試みる
            const sharedCode = searchParams.get('r');
            if (sharedCode) {
                const decoded = decodeResult(sharedCode);
                if (decoded) {
                    const sharedResult = buildSharedResult(decoded);
                    setResult(sharedResult);
                    setIsSharedView(true);
                    return;
                }
            }

            // 2. ローカル履歴から復元を試みる
            if (history.length > 0) {
                restore();
            } else {
                router.push('/');
            }
            return;
        }

        const saveResult = async () => {
            // 共有閲覧時はFirestoreに保存しない
            if (isSharedView) return;
            // Only save if it's a new result and hasn't been saved in this session yet
            if (!isNewResult || dataSavedRef.current) return;

            // 競合（Race Condition）を防ぐため、非同期処理の「前」に同期的にロックをかける
            dataSavedRef.current = true;

            try {
                // Dynamic import to avoid SSR issues
                const [
                    { db },
                    { collection, addDoc, serverTimestamp }
                ] = await Promise.all([
                    import('@/lib/firebase'),
                    import('firebase/firestore')
                ]);

                // Save only necessary data
                await addDoc(collection(db, 'diagnosis_results'), {
                    type: result,
                    // engine: result.engine, // engine data is included in result
                    // bias: result.bias,     // bias data is included in result
                    timestamp: serverTimestamp(),
                    userAgent: window.navigator.userAgent,
                });

                markResultAsSaved(); // Reset flag so it won't be saved again
                console.log('Diagnosis result saved to Firestore');
            } catch (error) {
                // 保存に失敗した場合はロックを解除し、次回以降のレンダリングで再試行できるようにする
                dataSavedRef.current = false;
                console.error('Error saving diagnosis result:', error);
            }
        };

        saveResult();
    }, [result, history, restore, router, isNewResult, markResultAsSaved, searchParams, setResult, isSharedView]);

    if (!result) return null;

    const osData = OS_CONTENT[result.os.code];
    const engineData = ENGINE_CONTENT[result.engine.primary];

    // Calculate bias risks from alerts
    const biasRisks = result.bias.alerts?.map((alertType) => {
        const content = BIAS_CONTENT[alertType];
        // Determine risk level based on score if available, otherwise default to high/medium logic
        const score = result.bias.scores[alertType] || 0;
        const level = score >= 2 ? 'high' : 'medium';
        return { ...content, level };
    }) || [];

    const themeColor = resolveColor(osData.color);

    const handleReset = () => {
        reset();
        router.push('/');
    };

    const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
        { id: 'overview', label: 'サマリ', icon: LayoutDashboard },
        { id: 'analysis', label: '性格分析', icon: Microscope },
        { id: 'work', label: '仕事・適職', icon: Briefcase },
        { id: 'relations', label: '人間関係', icon: Users },
        { id: 'growth', label: '成長ロードマップ', icon: TrendingUp },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-prisma-50 to-white pb-20 relative">
            {/* Ambient Background Wrapper - Handles overflow for blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Ambient Background - Tiffany Blue Glow */}
                <div
                    className="absolute top-[-20%] left-[-10%] w-[60%] h-[600px] z-0 opacity-20 blur-[100px]"
                    style={{ background: `radial-gradient(circle, ${themeColor}, transparent 70%)` }}
                />
                <div
                    className="absolute top-[10%] right-[-10%] w-[40%] h-[500px] z-0 opacity-15 blur-[120px]"
                    style={{ background: 'radial-gradient(circle, #0ABAB5, transparent 70%)' }}
                />
            </div>

            {/* Header */}
            <div className="relative z-10 pt-20 pb-12 px-4 text-center animate-fade-in-up">
                <div className="flex flex-col items-center">
                    <div className="inline-block mb-6 relative">
                        <span className="relative z-10 px-4 py-1 text-xs font-serif tracking-[0.2em] text-prisma-800 border-b border-prisma-300">
                            あなたの診断結果
                        </span>
                    </div>

                    <div className="flex flex-col items-center gap-2 mb-8 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/50 blur-3xl -z-10 rounded-full" />

                        <h1 className="text-5xl sm:text-7xl font-serif font-medium text-slate-900 leading-tight tracking-tight mix-blend-multiply">
                            {osData.name.split('(')[0].trim()}
                        </h1>
                        <div className="flex items-baseline gap-3 mt-2">
                            <span className="text-3xl sm:text-4xl font-serif text-prisma-600 tracking-widest opacity-90">
                                {osData.code}
                            </span>
                        </div>
                    </div>

                    <div className="max-w-2xl mx-auto relative px-8 py-6">
                        <div className="text-lg sm:text-xl text-slate-700 font-medium opacity-90 leading-[2.2] font-serif tracking-wide break-keep">
                            <FormattedText text={osData.catchphrase} />
                        </div>
                    </div>
                </div>

                    {/* Hero直下のシェアボタン */}
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <button
                            onClick={() => {
                                const shareUrl = `${SITE_CONFIG.baseUrl}/result/share/${result.os.code}`;
                                const text = `私の基本タイプは「${osData.name}」でした！あなたのタイプも診断してみませんか？`;
                                window.open(
                                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}&hashtags=16性格診断,性格診断,自己分析`,
                                    '_blank'
                                );
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-black/80 text-white text-xs font-medium rounded-full hover:bg-black transition-colors"
                        >
                            <Share2 size={13} />
                            Xでシェア
                        </button>
                        <button
                            onClick={() => {
                                const shareUrl = `${SITE_CONFIG.baseUrl}/result/share/${result.os.code}`;
                                window.open(
                                    `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`,
                                    '_blank'
                                );
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#06C755] text-white text-xs font-medium rounded-full hover:bg-[#05b34c] transition-colors"
                        >
                            LINE
                        </button>
                    </div>
            </div>

            {/* Tab Navigation */}
            <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-prisma-100/50 mb-12 animate-fade-in-up stagger-1">
                <div className="max-w-4xl md:max-w-6xl mx-auto flex overflow-x-auto no-scrollbar px-6 sm:px-0 justify-start sm:justify-center gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 text-sm tracking-widest transition-all relative whitespace-nowrap group font-serif ${activeTab === tab.id
                                ? 'text-prisma-800 font-medium'
                                : 'text-slate-400 hover:text-prisma-600'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                {/* Icon removed for cleaner look, or keep small */}
                                {tab.label}
                            </span>

                            <div
                                className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500 ease-out ${activeTab === tab.id ? 'bg-prisma-500 w-full opacity-100' : 'bg-prisma-300 w-0 opacity-0 group-hover:w-full group-hover:opacity-50'
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-3xl md:max-w-5xl mx-auto px-2 sm:px-4 relative z-10 min-h-[500px]">
                {/* Key changes trigger animation replay */}
                <div key={activeTab} className="animate-fade-in-up stagger-2">
                    <Suspense fallback={
                        <div className="flex items-center justify-center py-20">
                            <div className="w-8 h-8 border-2 border-prisma-200 border-t-prisma-500 rounded-full animate-spin" />
                        </div>
                    }>
                        {activeTab === 'overview' && (
                            <OverviewTab
                                osData={osData}
                                engineData={engineData}
                            />
                        )}

                        {activeTab === 'analysis' && (
                            <AnalysisTab
                                osData={osData}
                                engineData={engineData}
                                themeColor={themeColor}
                                biasRisks={biasRisks}
                            />
                        )}

                        {activeTab === 'work' && (
                            <WorkTab
                                osData={osData}
                                engineData={engineData}
                                themeColor={themeColor}
                            />
                        )}

                        {activeTab === 'relations' && (
                            <RelationsTab osData={osData} engineData={engineData} />
                        )}

                        {activeTab === 'growth' && (
                            <GrowthTab
                                osData={osData}
                                engineData={engineData}
                                themeColor={themeColor}
                            />
                        )}
                    </Suspense>
                </div>

                {/* Compatibility CTA (Best Match & Challenge Match) */}
                <ResultCompatibilityCTA typeCode={result.os.code} />

                {/* ペア相性診断への導線 */}
                <PairDiagnosisCTA myCode={result.os.code} myName={osData.name} />

                {/* Related Articles for this Type */}
                <RelatedArticlesForResult typeCode={result.os.code} />

                {/* Footer Actions */}
                <div className="mt-12 flex flex-col items-center gap-6">
                    <p className="text-slate-400 text-sm text-center max-w-md">
                        この診断結果は、あなたが本来持っている可能性を最大限に引き出すための指針です。
                    </p>

                    <ShareButtons
                        url={`${SITE_CONFIG.baseUrl}/result/share/${result.os.code}`}
                        title={`【16性格診断】私の基本タイプは『${osData.name}』でした！`}
                        text={`私の基本タイプは「${osData.name}」でした！あなたのタイプも診断してみませんか？`}
                        hashtags={['16性格診断', '性格診断', '自己分析']}
                    />

                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Button
                            variant="outline"
                            onClick={() => handlePrint()}
                            disabled={isPrinting}
                            className={`flex items-center gap-2 text-slate-600 border-slate-300 ${isPrinting ? 'opacity-50 cursor-not-allowed' : 'hover:text-slate-800'}`}
                        >
                            <Download size={18} />
                            {isPrinting ? '準備中...' : 'PDFで保存する'}
                        </Button>

                        <Button
                            variant="outline"
                            onClick={handleReset}
                            className="flex items-center gap-2 text-slate-500 hover:text-slate-700"
                        >
                            <RotateCcw size={16} />
                            トップに戻る
                        </Button>
                    </div>

                    {/* 共有閲覧者向けCTA */}
                    {isSharedView && (
                        <div className="mt-8 bg-gradient-to-r from-prisma-50 to-indigo-50 border border-prisma-200 rounded-2xl p-6 text-center max-w-md">
                            <p className="text-slate-700 font-medium mb-3">
                                あなたのタイプも気になりませんか？
                            </p>
                            <Button
                                onClick={() => router.push('/diagnosis')}
                                className="bg-prisma-600 hover:bg-prisma-700 text-white px-8 py-3 text-base font-bold"
                            >
                                無料で診断する（3分）
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Print Mount Node (On-Demand) */}
            {isPrinting && (
                <div className="invisible h-0 overflow-hidden" aria-hidden="true">
                    <PrintLayout
                        ref={componentRef}
                        result={result}
                        osData={osData}
                        engineData={engineData}
                        biasRisks={biasRisks}
                        themeColor={themeColor}
                    />
                </div>
            )}

        </div>
    );
};

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Microscope,
    Users,
    Briefcase,
    TrendingUp,
    RotateCcw,
    Download
} from 'lucide-react';

import { FormattedText } from '../../../components/ui/FormattedText';
import { useDiagnosisStore } from '../../../stores/useDiagnosisStore';
import { OS_CONTENT } from '../data/content-os';
import { ENGINE_CONTENT } from '../data/content-engine';
import { BIAS_CONTENT } from '../data/content-bias';
import { Button } from '../../../components/ui/Button';
import { ShareButtons } from '../../../components/common/ShareButtons';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { PrintLayout } from './PrintLayout';

// Tab Components
import { OverviewTab } from './tabs/OverviewTab';
import { AnalysisTab } from './tabs/AnalysisTab';
import { WorkTab } from './tabs/WorkTab';
import { RelationsTab } from './tabs/RelationsTab';
import { GrowthTab } from './tabs/GrowthTab';

// Color mapping for dynamic styles
const COLOR_MAP: Record<string, string> = {
    'sky-500': '#0ea5e9',
    'emerald-400': '#34d399',
    'orange-400': '#fb923c',
    'indigo-500': '#6366f1',
    'rose-500': '#f43f5e',
    'slate-600': '#475569',
    'red-600': '#dc2626',
    'violet-400': '#a78bfa',
    'amber-500': '#f59e0b',
    'blue-800': '#1e40af',
    'blue-600': '#2563eb',
    'teal-600': '#0ababa', // Updated to User's Teal
    'cyan-700': '#078282', // Updated to User's Deep Teal
    'prisma-500': '#0ABAB5', // User's Primary
    'fuchsia-400': '#e879f9',
    'yellow-400': '#facc15',
    'gray-500': '#6b7280',
};

type TabType = 'overview' | 'analysis' | 'work' | 'relations' | 'growth';

export const ResultPage: React.FC = () => {
    const router = useRouter();
    const result = useDiagnosisStore((state) => state.result);
    const reset = useDiagnosisStore((state) => state.resetDiagnosis);
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `Prisma_Result_${result?.os.code || 'Analysis'}`,
    });

    const restore = useDiagnosisStore((state) => state.restoreLastResult);
    const history = useDiagnosisStore((state) => state.history);
    const dataSavedRef = useRef(false);

    useEffect(() => {
        if (!result) {
            // Try to restore from history if available
            if (history.length > 0) {
                restore();
            } else {
                router.push('/');
            }
            return;
        }

        const saveResult = async () => {
            if (dataSavedRef.current) return;

            try {
                // Dynamic import to avoid SSR issues
                const { db } = await import('@/lib/firebase');
                const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');

                // Save only necessary data
                await addDoc(collection(db, 'diagnosis_results'), {
                    type: result,
                    // engine: result.engine, // engine data is included in result
                    // bias: result.bias,     // bias data is included in result
                    timestamp: serverTimestamp(),
                    userAgent: window.navigator.userAgent,
                });

                dataSavedRef.current = true;
                console.log('Diagnosis result saved to Firestore');
            } catch (error) {
                console.error('Error saving diagnosis result:', error);
            }
        };

        saveResult();
    }, [result, history, restore, router]);

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

    const themeColor = COLOR_MAP[osData.color] || '#6366f1';

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
                        <span className="relative z-10 px-4 py-1 text-xs font-serif tracking-[0.2em] uppercase text-prisma-800 border-b border-prisma-300">
                            Diagnostics Result
                        </span>
                    </div>

                    <div className="flex flex-col items-center gap-2 mb-8 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/50 blur-3xl -z-10 rounded-full" />

                        <h1 className="text-5xl sm:text-7xl font-serif font-medium text-slate-900 leading-tight tracking-tight mix-blend-multiply">
                            {osData.name.split('(')[0].trim()}
                        </h1>
                        <div className="flex items-baseline gap-3 mt-2">
                            <span className="text-sm font-serif italic text-slate-500 tracking-wider">Type</span>
                            <span className="text-3xl sm:text-4xl font-serif text-prisma-600 tracking-widest opacity-90">
                                {osData.code}
                            </span>
                        </div>
                    </div>

                    <div className="max-w-2xl mx-auto relative px-8 py-6">
                        {/* Decorative Quotes */}
                        <span className="absolute top-0 left-0 text-6xl text-prisma-200 font-serif leading-none opacity-50">“</span>
                        <span className="absolute bottom-0 right-0 text-6xl text-prisma-200 font-serif leading-none opacity-50 rotate-180">“</span>

                        <div className="text-lg sm:text-xl text-slate-700 font-medium opacity-90 leading-[2.2] font-serif tracking-wide">
                            <FormattedText text={osData.catchphrase} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-prisma-100/50 mb-12 animate-fade-in-up stagger-1">
                <div className="max-w-4xl mx-auto flex overflow-x-auto no-scrollbar px-6 sm:px-0 justify-start sm:justify-center gap-8">
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
            <div className="max-w-3xl mx-auto px-4 relative z-10 min-h-[500px]">
                {/* Key changes trigger animation replay */}
                <div key={activeTab} className="animate-fade-in-up stagger-2">
                    {activeTab === 'overview' && (
                        <OverviewTab
                            osData={osData}
                            engineData={engineData}
                            themeColor={themeColor}
                        />
                    )}

                    {activeTab === 'analysis' && (
                        <AnalysisTab
                            osData={osData}
                            themeColor={themeColor}
                            biasRisks={biasRisks}
                        />
                    )}

                    {activeTab === 'work' && (
                        <WorkTab
                            osData={osData}
                            themeColor={themeColor}
                        />
                    )}

                    {activeTab === 'relations' && (
                        <RelationsTab osData={osData} />
                    )}

                    {activeTab === 'growth' && (
                        <GrowthTab
                            osData={osData}
                            engineData={engineData}
                            themeColor={themeColor}
                        />
                    )}
                </div>

                {/* Footer Actions */}
                <div className="mt-12 flex flex-col items-center gap-6">
                    <p className="text-slate-400 text-sm text-center max-w-md">
                        この診断結果は、あなたが本来持っている可能性を最大限に引き出すための指針です。
                    </p>

                    <ShareButtons
                        title={`【16性格診断】私の基本タイプは『${osData.name}』(${osData.code})でした！`}
                        text={`サブタイプ: ${osData.code} / ${osData.catchphrase}`}
                        hashtags={['16性格診断', '性格診断', '自己分析']}
                    />

                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Button
                            variant="outline"
                            onClick={() => handlePrint()}
                            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 border-slate-300"
                        >
                            <Download size={18} />
                            PDFで保存する
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
                </div>
            </div>

            {/* Hidden Print Layout */}
            <div className="hidden">
                <PrintLayout
                    ref={componentRef}
                    result={result}
                    osData={osData}
                    engineData={engineData}
                    biasRisks={biasRisks}
                    themeColor={themeColor}
                />
            </div>

        </div>
    );
};

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
    'teal-600': '#0d9488',
    'cyan-700': '#0e7490',
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

    useEffect(() => {
        if (!result) {
            // Try to restore from history if available
            if (history.length > 0) {
                restore();
            } else {
                router.push('/');
            }
        }
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-prisma-50 to-white pb-20 relative overflow-hidden">
            {/* Ambient Background - Tiffany Blue Glow */}
            <div
                className="absolute top-[-20%] left-[-10%] w-[60%] h-[600px] z-0 opacity-20 pointer-events-none blur-[100px]"
                style={{ background: `radial-gradient(circle, ${themeColor}, transparent 70%)` }}
            />
            <div
                className="absolute top-[10%] right-[-10%] w-[40%] h-[500px] z-0 opacity-15 pointer-events-none blur-[120px]"
                style={{ background: 'radial-gradient(circle, #0ABAB5, transparent 70%)' }}
            />

            {/* Header */}
            <div className="relative z-10 pt-12 pb-8 px-4 text-center animate-fade-in-up">
                <div>
                    <span className="inline-block px-4 py-1.5 bg-white/70 backdrop-blur-md rounded-full text-xs font-bold text-prisma-800 mb-6 border border-prisma-200 shadow-sm animate-scale-in">
                        DIAGNOSTICS RESULT
                    </span>

                    <div className="flex flex-col items-center gap-3 mb-4">
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 leading-tight tracking-tight drop-shadow-sm">
                            {osData.name.split('(')[0].trim()}
                        </h1>
                        <span className="text-2xl sm:text-3xl font-black text-slate-300 tracking-wider">
                            ({osData.code})
                        </span>
                    </div>

                    <div className="text-lg text-slate-600 font-medium opacity-90 mt-2 max-w-2xl mx-auto leading-relaxed">
                        <FormattedText text={osData.catchphrase} />
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-prisma-100 shadow-sm mb-8 animate-fade-in-up stagger-1">
                <div className="max-w-4xl mx-auto flex overflow-x-auto no-scrollbar px-4 sm:px-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-sm font-bold transition-all relative min-w-max whitespace-nowrap group ${activeTab === tab.id
                                ? 'text-prisma-700'
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50/50'
                                }`}
                        >
                            <tab.icon size={18} className={`transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-105'}`} />
                            {tab.label}
                            {activeTab === tab.id && (
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full shadow-[0_-2px_6px_rgba(10,186,181,0.2)]"
                                    style={{ backgroundColor: '#0ABAB5' }}
                                />
                            )}
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

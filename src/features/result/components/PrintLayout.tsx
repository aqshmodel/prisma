import { forwardRef } from 'react';
import { type OSContent } from '../data/content-os';
import { type EngineContent } from '../data/content-engine';
import { RadarChart } from './RadarChart';
import { type DiagnosisResult } from '../../../types/diagnosis';
import { FormattedText } from '../../../components/ui/FormattedText';

interface PrintLayoutProps {
    result: DiagnosisResult;
    osData: OSContent;
    engineData: EngineContent;
    biasRisks: any[];
    themeColor: string;
}

export const PrintLayout = forwardRef<HTMLDivElement, PrintLayoutProps>(
    ({ osData, engineData, biasRisks, themeColor }, ref) => {
        return (
            <div ref={ref} className="print-container bg-white text-slate-900 p-8 max-w-[210mm] mx-auto hidden print:block">
                <style type="text/css" media="print">
                    {`
                        @page { size: A4; margin: 10mm; }
                        body { -webkit-print-color-adjust: exact; }
                        .print-break-inside-avoid { break-inside: avoid; }
                        .print-break-before { break-before: page; }
                    `}
                </style>

                {/* Header / Cover */}
                <header className="text-center border-b-2 border-slate-900 pb-6 mb-8">
                    <div className="flex justify-between items-end mb-4">
                        <img src="/logo.png" alt="Aqsh" className="h-8 object-contain grayscale" />
                        <span className="text-xs text-slate-400">Prisma Diagnosis Result</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">{osData.name.split('(')[0].trim()}</h1>
                    <div className="text-2xl font-bold text-slate-500 mb-4">({osData.code})</div>
                    <p className="text-sm border border-slate-200 inline-block px-4 py-1 rounded-full">
                        {osData.catchphrase}
                    </p>
                </header>

                {/* Page 1: Overview & Analysis */}
                <section className="mb-8 print-break-inside-avoid">
                    <div className="grid grid-cols-2 gap-8 items-start">
                        {/* Radar Chart */}
                        <div className="flex flex-col items-center justify-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <h3 className="font-bold text-sm mb-4 text-slate-500 uppercase tracking-wider">Parameters</h3>
                            <div className="rader-chart-print w-full max-w-[300px]">
                                {/* Passing a fixed size prop if supported or handling via CSS, assumig RadarChart is responsive */}
                                <RadarChart data={osData.params} color={themeColor} />
                            </div>
                        </div>

                        {/* Basic Description */}
                        <div>
                            <h2 className="text-xl font-bold border-l-4 border-slate-900 pl-3 mb-4">基本プロファイル</h2>
                            <div className="text-xs leading-relaxed text-slate-700 text-justify">
                                <FormattedText text={osData.description} />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-4 print-break-inside-avoid">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 border border-emerald-100 bg-emerald-50/30 rounded-lg">
                            <h3 className="font-bold text-emerald-700 mb-2 text-sm">強み (Strengths)</h3>
                            <div className="text-xs text-slate-700">
                                <FormattedText text={osData.strength} />
                            </div>
                        </div>
                        <div className="p-4 border border-rose-100 bg-rose-50/30 rounded-lg">
                            <h3 className="font-bold text-rose-700 mb-2 text-sm">弱点 (Weaknesses)</h3>
                            <div className="text-xs text-slate-700">
                                <FormattedText text={osData.weakness} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Page 2: Work & Relationships */}
                <div className="print-break-before"></div>
                <header className="text-right border-b border-slate-200 pb-2 mb-8 text-xs text-slate-400">
                    Page 2 - Work & Relationships
                </header>

                <section className="mb-8 print-break-inside-avoid">
                    <h2 className="text-xl font-bold border-l-4 border-slate-900 pl-3 mb-6">働き方と適職</h2>
                    <div className="mb-6">
                        <h4 className="font-bold text-sm text-slate-700 mb-1">ミッション</h4>
                        <p className="text-sm italic text-slate-600 bg-slate-50 p-3 border-l-2 border-slate-300">
                            {osData.workStyle.mission}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-bold text-sm text-slate-700 mb-2">ワーキングスタイル</h4>
                            <p className="text-xs text-slate-600 leading-relaxed text-justify">
                                {osData.workStyle.style}
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-slate-700 mb-2">適職例</h4>
                            <ul className="text-xs space-y-2">
                                {osData.workStyle.bestRoles.map((role, i) => (
                                    <li key={i} className="flex gap-2">
                                        <span className="font-bold text-slate-900 shrink-0">• {role.title}:</span>
                                        <span className="text-slate-600">{role.reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-8 print-break-inside-avoid">
                    <h2 className="text-xl font-bold border-l-4 border-slate-900 pl-3 mb-6">人間関係と相性</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="border p-3 rounded text-center">
                            <span className="block text-xs text-slate-400 mb-1">Best Match</span>
                            <span className="block text-lg font-bold text-indigo-600">{osData.bestMatch}</span>
                        </div>
                        <div className="border p-3 rounded text-center">
                            <span className="block text-xs text-slate-400 mb-1">Worst Match</span>
                            <span className="block text-lg font-bold text-orange-600">{osData.worstMatch}</span>
                        </div>
                    </div>
                    <div className="text-xs text-slate-600 leading-relaxed border p-4 rounded bg-slate-50">
                        <span className="font-bold block mb-1">コミュニケーションのアドバイス:</span>
                        {osData.relationships.advice}
                    </div>
                </section>

                <section className="print-break-inside-avoid mb-8">
                    <h2 className="text-xl font-bold border-l-4 border-slate-900 pl-3 mb-4">注意すべきバイアス (Risks)</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {biasRisks.map((risk, index) => (
                            <div key={index} className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-bold text-slate-700 text-sm">{risk.name}</h4>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${risk.level === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {risk.level === 'high' ? 'High Risk' : 'Medium Risk'}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-600">{risk.description}</p>
                            </div>
                        ))}
                        {biasRisks.length === 0 && (
                            <p className="text-xs text-slate-500 italic">特筆すべき高いリスクは検出されませんでした。</p>
                        )}
                    </div>
                </section>

                {/* Engine Info */}
                <section className="print-break-inside-avoid">
                    <h2 className="text-xl font-bold border-l-4 border-slate-900 pl-3 mb-4">駆動エンジン (Primary: {engineData.name})</h2>
                    <div className="text-xs text-slate-600 leading-relaxed text-justify">
                        <p className="mb-2"><span className="font-bold">欲求:</span> {engineData.motivation}</p>
                        <p><span className="font-bold">概要:</span> {engineData.description}</p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-12 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
                    © 2026 Aqsh Inc. All rights reserved. | 16性格診断 Prisma
                </footer>
            </div>
        );
    }
);

PrintLayout.displayName = 'PrintLayout';

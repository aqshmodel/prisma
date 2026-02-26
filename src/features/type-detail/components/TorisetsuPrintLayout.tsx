import { forwardRef } from 'react';
import { type OSContent } from '../../result/data/content-os';
import { FormattedText } from '../../../components/ui/FormattedText';
import { RadarChart } from '../../result/components/RadarChart';
import { CheckCircle2, AlertTriangle, Briefcase, Zap } from 'lucide-react';

interface TorisetsuPrintLayoutProps {
    osData: OSContent;
    themeColor: string;
}

export const TorisetsuPrintLayout = forwardRef<HTMLDivElement, TorisetsuPrintLayoutProps>(
    ({ osData, themeColor }, ref) => {
        return (
            <div ref={ref} className="bg-white text-slate-900 mx-auto w-full max-w-[210mm]">
                {/* 印刷用のグローバルCSSインジェクション */}
                <style type="text/css" media="print">
                    {`
                        @page {
                            size: A4 portrait;
                            margin: 10mm;
                        }
                        body {
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                            background-color: white !important;
                        }
                        @media print {
                            .print-break-inside-avoid {
                                break-inside: avoid;
                            }
                            .print-page-break {
                                break-before: page;
                            }
                        }
                    `}
                </style>

                <div className="p-6">
                    {/* Header: 取扱説明書タイトル */}
                    <header className="border-b-4 pb-4 mb-6 flex items-end justify-between" style={{ borderColor: themeColor }}>
                        <div>
                            <div className="text-sm font-bold text-slate-400 tracking-widest mb-1">
                                Aqsh Prisma - Personal Instruction Manual
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-baseline gap-3">
                                {osData.name.split('(')[0].trim()}
                                <span className="text-2xl font-bold text-slate-400">({osData.code})</span>
                            </h1>
                            <p className="mt-2 text-lg font-bold" style={{ color: themeColor }}>
                                {osData.catchphrase}
                            </p>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full border border-slate-200">
                                取扱説明書
                            </span>
                        </div>
                    </header>

                    {/* Section 1: 基本仕様 (Overview) */}
                    <section className="mb-6 print-break-inside-avoid grid grid-cols-5 gap-6">
                        <div className="col-span-2 flex flex-col items-center justify-center bg-slate-50 rounded-xl p-4 border border-slate-200">
                            <h2 className="text-sm font-bold text-slate-500 mb-2 invisible print:visible">パラメーター</h2>
                            <div className="w-[180px] h-[180px]">
                                <RadarChart data={osData.params} color={themeColor} />
                            </div>
                        </div>
                        <div className="col-span-3 flex flex-col justify-center">
                            <h2 className="text-lg font-black border-l-4 pl-3 mb-2" style={{ borderColor: themeColor }}>
                                基本仕様 (Overview)
                            </h2>
                            <div className="text-sm leading-relaxed text-slate-700 text-justify">
                                <FormattedText text={osData.description} />
                            </div>
                        </div>
                    </section>

                    {/* Section 2: 強みと弱点 (Specs) */}
                    <section className="mb-6 print-break-inside-avoid grid grid-cols-2 gap-6">
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                            <h3 className="text-emerald-700 font-bold mb-3 flex items-center gap-2">
                                <CheckCircle2 size={18} className="text-emerald-500" />
                                優れた機能 (強み)
                            </h3>
                            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                                <FormattedText text={osData.strength} />
                            </div>
                        </div>
                        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
                            <h3 className="text-rose-700 font-bold mb-3 flex items-center gap-2">
                                <AlertTriangle size={18} className="text-rose-500" />
                                動作不良の要因 (弱点)
                            </h3>
                            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                                <FormattedText text={osData.weakness} />
                            </div>
                        </div>
                    </section>

                    {/* Section 3: 適切な稼働環境 (Work Style) */}
                    {osData.workStyle && (
                        <section className="mb-6 print-break-inside-avoid">
                            <h2 className="text-lg font-black border-l-4 pl-3 mb-4" style={{ borderColor: themeColor }}>
                                適切な稼働環境 (働き方・適職)
                            </h2>
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                                <div className="mb-4 pb-4 border-b border-slate-200/60">
                                    <h4 className="text-sm font-bold text-slate-500 mb-1 flex items-center gap-1">
                                        <Briefcase size={14} /> 基本ミッション
                                    </h4>
                                    <p className="text-sm font-bold text-slate-800">{osData.workStyle.mission}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-500 mb-2">推奨される主な役割 (適職)</h4>
                                    <ul className="text-sm space-y-2">
                                        {osData.workStyle.bestRoles.map((role, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-slate-400 shrink-0 mt-0.5">•</span>
                                                <div>
                                                    <span className="font-bold text-slate-800">{role.title}</span>
                                                    <span className="text-slate-600 block mt-0.5 text-xs">{role.reason}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Section 4: 接続互換性・注意事項 (Relationships) */}
                    <section className="print-break-inside-avoid">
                        <h2 className="text-lg font-black border-l-4 pl-3 mb-4 flex items-center gap-2" style={{ borderColor: themeColor }}>
                            <Zap size={20} className="text-amber-500" />
                            接続互換性・取扱上の注意
                        </h2>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="border border-indigo-200 bg-indigo-50/50 p-4 rounded-xl text-center">
                                <p className="text-xs font-bold text-indigo-500 mb-1">最高の相性 (共鳴)</p>
                                <p className="text-xl font-black text-indigo-700">{osData.bestMatch}</p>
                            </div>
                            <div className="border border-orange-200 bg-orange-50/50 p-4 rounded-xl text-center">
                                <p className="text-xs font-bold text-orange-500 mb-1">要注意の相性 (摩擦)</p>
                                <p className="text-xl font-black text-orange-700">{osData.worstMatch}</p>
                            </div>
                        </div>

                        {osData.relationships?.communicationStyle && (
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                                <h3 className="font-bold text-slate-700 mb-2 text-sm">スムーズな通信手順 (接し方のコツ)</h3>
                                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                                    {osData.relationships.communicationStyle}
                                </p>
                            </div>
                        )}
                        {osData.relationships?.advice && (
                            <div className="mt-3 bg-red-50 border border-red-100 rounded-xl p-5">
                                <h3 className="font-bold text-red-700 mb-2 text-sm">【警告】関係修復の注意点</h3>
                                <p className="text-sm text-red-600/90 leading-relaxed whitespace-pre-wrap">
                                    {osData.relationships.advice}
                                </p>
                            </div>
                        )}
                    </section>

                    {/* Footer */}
                    <footer className="mt-8 pt-4 border-t border-slate-200 text-center">
                        <p className="text-[10px] text-slate-400 font-medium tracking-wider">
                            Aqsh Prisma - Organization Synergy Tool / prisma.aqsh.co.jp
                        </p>
                    </footer>
                </div>
            </div>
        );
    }
);

TorisetsuPrintLayout.displayName = 'TorisetsuPrintLayout';

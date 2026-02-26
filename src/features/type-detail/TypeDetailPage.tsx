'use client';

import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    FileText,
    Briefcase,
    Users,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import { OS_CONTENT } from '../result/data/content-os';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { FormattedText } from '../../components/ui/FormattedText';
import { RadarChart } from '../result/components/RadarChart';
import { ShareButtons } from '../../components/common/ShareButtons';
import { useReactToPrint } from 'react-to-print';
import { TorisetsuPrintLayout } from './components/TorisetsuPrintLayout';

// Color mapping definition from ResultPage.tsx (for themeColor resolution)
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
    'teal-600': '#0ababa',
    'cyan-700': '#078282',
    'prisma-500': '#0ABAB5',
    'fuchsia-400': '#e879f9',
    'yellow-400': '#facc15',
    'gray-500': '#6b7280',
};

export const TypeDetailPage: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const code = params?.code as string;

    const osData = useMemo(() => {
        return code ? OS_CONTENT[code as keyof typeof OS_CONTENT] : null;
    }, [code]);

    const themeColor = osData ? (COLOR_MAP[osData.color] || '#6366f1') : '#6366f1';

    // Print logic state and ref
    const [isPrinting, setIsPrinting] = React.useState(false);
    const printRef = React.useRef<HTMLDivElement>(null);
    const promiseResolveRef = React.useRef<(() => void) | null>(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Aqsh_Prisma_Torisetsu_${osData?.code || 'Type'}`,
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

    React.useEffect(() => {
        if (isPrinting && promiseResolveRef.current) {
            // DOMがマウント（レンダリング）された直後にresolveする
            promiseResolveRef.current();
            promiseResolveRef.current = null;
        }
    }, [isPrinting]);

    if (!osData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <p className="text-slate-600 mb-4">指定されたタイプが見つかりませんでした。</p>
                <Button onClick={() => router.push('/')}>トップに戻る</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">

            {/* Header / Nav */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-4xl md:max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="text-slate-500 hover:text-slate-800 flex items-center gap-2 font-medium">
                        <ArrowLeft size={20} />
                        TOP
                    </Link>
                    <span className="font-bold text-slate-800">Type Detail</span>
                </div>
            </div>

            {/* Hero */}
            <div className="bg-white pb-12 pt-8 px-4 border-b border-slate-100">
                <div className="max-w-3xl md:max-w-5xl mx-auto text-center">
                    <div className="inline-block px-3 py-1 bg-slate-100 rounded-full text-slate-600 text-sm font-bold mb-6">
                        Basic Type Detail
                    </div>

                    <div className="flex flex-col items-center gap-2 mb-4">
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                            {osData.name.split('(')[0].trim()}
                        </h1>
                        <span className="text-2xl md:text-4xl font-black text-slate-300 tracking-wider">
                            ({osData.code})
                        </span>
                    </div>

                    <div className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed mt-4">
                        <FormattedText text={osData.catchphrase} />
                    </div>
                </div>
            </div>

            <div className="max-w-3xl md:max-w-5xl mx-auto px-2 sm:px-4 mt-8 space-y-12">

                {/* Basic Profile */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <FileText className="text-slate-400" />
                        基本プロファイル
                    </h2>
                    <Card className="p-6 md:p-8">
                        <div className="flex justify-center mb-8">
                            <RadarChart data={osData.params} color={osData.color} />
                        </div>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                            <FormattedText text={osData.description} />
                        </div>
                    </Card>
                </section>

                {/* Strength & Weakness */}
                <section className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 border-t-4 border-emerald-400">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <CheckCircle2 className="text-emerald-500" />
                            強み
                        </h3>
                        <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                            <FormattedText text={osData.strength} />
                        </div>
                    </Card>
                    <Card className="p-6 border-t-4 border-rose-400">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <AlertTriangle className="text-rose-500" />
                            弱点
                        </h3>
                        <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                            <FormattedText text={osData.weakness} />
                        </div>
                    </Card>
                </section>

                {/* Other Sections (Work, Relations, Growth - Simplified) */}
                {osData.workStyle && (
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Briefcase className="text-slate-400" />
                            働き方・適職
                        </h2>
                        <Card className="p-6 space-y-6">
                            <div>
                                <h4 className="font-bold text-slate-700 mb-2">ミッション</h4>
                                <p className="text-lg italic text-slate-800 border-l-4 border-slate-200 pl-4">
                                    {osData.workStyle.mission}
                                </p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <h4 className="font-bold text-slate-700 mb-2 text-sm">適職例</h4>
                                <ul className="list-disc list-inside text-slate-600 space-y-1">
                                    {osData.workStyle.bestRoles.map((role, i) => (
                                        <li key={i}>
                                            <span className="font-bold text-slate-800">{role.title}</span>: {role.reason}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Card>
                    </section>
                )}

                {/* Relationships */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Users className="text-slate-400" />
                        人間関係と相性
                    </h2>
                    <Card className="p-6">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                                <h4 className="font-bold text-indigo-900 mb-1">最高の相性</h4>
                                <Link href={`/types/${osData.bestMatch}`} className="text-lg font-bold text-indigo-600 hover:underline block">
                                    {OS_CONTENT[osData.bestMatch]?.name ? (
                                        <>
                                            <span className="text-2xl mr-2">{OS_CONTENT[osData.bestMatch].name.split('(')[0]}</span>
                                            <span className="text-sm opacity-80">({osData.bestMatch})</span>
                                        </>
                                    ) : osData.bestMatch}
                                </Link>
                                <p className="text-xs text-indigo-700 mt-2">
                                    補完し合い、共に成長できるパートナー
                                </p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                                <h4 className="font-bold text-orange-900 mb-1">要注意な相性</h4>
                                <Link href={`/types/${osData.worstMatch}`} className="text-lg font-bold text-orange-600 hover:underline block">
                                    {OS_CONTENT[osData.worstMatch]?.name ? (
                                        <>
                                            <span className="text-2xl mr-2">{OS_CONTENT[osData.worstMatch].name.split('(')[0]}</span>
                                            <span className="text-sm opacity-80">({osData.worstMatch})</span>
                                        </>
                                    ) : osData.worstMatch}
                                </Link>
                                <p className="text-xs text-orange-700 mt-2">
                                    誤解が生じやすく、ストレスを感じやすい相手
                                </p>
                            </div>
                        </div>
                        <div className="text-slate-600 leading-relaxed">
                            <h4 className="font-bold text-slate-800 mb-2">コミュニケーションのヒント</h4>
                            <p className="whitespace-pre-wrap">{osData.relationships?.communicationStyle}</p>
                        </div>
                    </Card>
                </section>

                {/* Share */}
                <section className="text-center pt-8 pb-12">
                    <h3 className="font-bold text-slate-700 mb-4">このタイプをシェアする</h3>
                    <ShareButtons
                        title={`【16性格診断】${osData.name} (${osData.code}) の詳細`}
                        text={`${osData.catchphrase} #16性格診断`}
                    />
                    <div className="mt-8">
                        <Button
                            variant="primary"
                            onClick={() => handlePrint()}
                            disabled={isPrinting}
                            className={`flex items-center gap-2 mx-auto shadow-md ${isPrinting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <FileText size={18} />
                            {isPrinting ? 'PDFを準備中...' : 'このタイプの取扱説明書（PDF）を作成'}
                        </Button>
                        <p className="text-xs text-slate-400 mt-2">※ A4サイズで綺麗に印刷・保存できます</p>
                    </div>
                </section>

                {/* All Types Nav */}
                <section className="border-t border-slate-200 pt-12">
                    <h3 className="text-center font-bold text-slate-500 mb-8">全16タイプ一覧</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {Object.keys(OS_CONTENT).map(key => (
                            <Link
                                key={key}
                                href={`/types/${key}`}
                                className={`
                                    p-3 rounded-lg text-center border transition-all
                                    ${key === code
                                        ? 'bg-slate-900 text-white border-slate-900'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                                    }
                                `}
                            >
                                <span className="block font-bold text-sm">{key}</span>
                                <span className="text-xs opacity-80 scale-90 block">
                                    {OS_CONTENT[key as keyof typeof OS_CONTENT].name.split(' ')[0]}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>

            {/* Print Mount Node (On-Demand) */}
            {isPrinting && (
                <div className="invisible h-0 overflow-hidden" aria-hidden="true">
                    <TorisetsuPrintLayout ref={printRef} osData={osData} themeColor={themeColor} />
                </div>
            )}
        </div>
    );
};

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
import { OS_CONTENT_EN } from '@/features/result/data/os/en';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormattedText } from '@/components/ui/FormattedText';
import { RadarChart } from '@/features/result/components/RadarChart';
import { ShareButtonsEn } from '@/components/common/ShareButtonsEn';
import { useReactToPrint } from 'react-to-print';
import { getAllCompatibilities } from '@/lib/constants/compatibility';
import { CompatibilityCardEn } from '@/features/compatibility/components/CompatibilityCardEn';
import type { OSTypeCode } from '@/types/diagnosis';


export const TypeDetailPageEn: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const code = params?.code as string;

    const osData = useMemo(() => {
        return code ? OS_CONTENT_EN[code as keyof typeof OS_CONTENT_EN] : null;
    }, [code]);

    // Print logic state and ref
    const [isPrinting, setIsPrinting] = React.useState(false);
    const printRef = React.useRef<HTMLDivElement>(null);
    const promiseResolveRef = React.useRef<(() => void) | null>(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Aqsh_Prisma_Guide_${osData?.code || 'Type'}`,
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
            promiseResolveRef.current();
            promiseResolveRef.current = null;
        }
    }, [isPrinting]);

    if (!osData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <p className="text-slate-600 mb-4">The specified type could not be found.</p>
                <Button onClick={() => router.push('/en')}>Back to Top</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">

            {/* Header / Nav */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-4xl md:max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/en" className="text-slate-500 hover:text-slate-800 flex items-center gap-2 font-medium">
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
                            ({osData.name.match(/\((.+)\)/)?.[1]} / {osData.code})
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
                        Basic Profile
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
                            Strengths
                        </h3>
                        <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                            <FormattedText text={osData.strength} />
                        </div>
                    </Card>
                    <Card className="p-6 border-t-4 border-rose-400">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <AlertTriangle className="text-rose-500" />
                            Weaknesses
                        </h3>
                        <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                            <FormattedText text={osData.weakness} />
                        </div>
                    </Card>
                </section>

                {/* Work Style & Roles */}
                {osData.workStyle && (
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Briefcase className="text-slate-400" />
                            Work Style & Suitable Roles
                        </h2>
                        <Card className="p-6 space-y-6">
                            <div>
                                <h4 className="font-bold text-slate-700 mb-2">Mission</h4>
                                <p className="text-lg italic text-slate-800 border-l-4 border-slate-200 pl-4">
                                    {osData.workStyle.mission}
                                </p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <h4 className="font-bold text-slate-700 mb-2 text-sm">Example Roles</h4>
                                <ul className="list-disc list-inside text-slate-600 space-y-1">
                                    {osData.workStyle.bestRoles.map((role) => (
                                        <li key={role.title}>
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
                        Relationships & Compatibility
                    </h2>
                    <Card className="p-6">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <Link href={`/en/types/${code}/compatibility/${osData.bestMatch}/`} className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 hover:shadow-md transition-shadow block">
                                <h4 className="font-bold text-indigo-900 mb-1">Best Match</h4>
                                <div className="text-lg font-bold text-indigo-600">
                                    {OS_CONTENT_EN[osData.bestMatch]?.name ? (
                                        <>
                                            <span className="text-2xl mr-2">{OS_CONTENT_EN[osData.bestMatch].name.split('(')[0].trim()}</span>
                                            <span className="text-sm opacity-80">({OS_CONTENT_EN[osData.bestMatch]?.name?.match(/\((.+)\)/)?.[1]} / {osData.bestMatch})</span>
                                        </>
                                    ) : osData.bestMatch}
                                </div>
                                <p className="text-xs text-indigo-700 mt-2">
                                    Partners who naturally complement each other
                                </p>
                                <span className="text-xs text-indigo-500 mt-2 inline-block">→ View details</span>
                            </Link>
                            <Link href={`/en/types/${code}/compatibility/${osData.worstMatch}/`} className="bg-orange-50 p-4 rounded-lg border border-orange-100 hover:shadow-md transition-shadow block">
                                <h4 className="font-bold text-orange-900 mb-1">Cautionary Match</h4>
                                <div className="text-lg font-bold text-orange-600">
                                    {OS_CONTENT_EN[osData.worstMatch]?.name ? (
                                        <>
                                            <span className="text-2xl mr-2">{OS_CONTENT_EN[osData.worstMatch].name.split('(')[0].trim()}</span>
                                            <span className="text-sm opacity-80">({OS_CONTENT_EN[osData.worstMatch]?.name?.match(/\((.+)\)/)?.[1]} / {osData.worstMatch})</span>
                                        </>
                                    ) : osData.worstMatch}
                                </div>
                                <p className="text-xs text-orange-700 mt-2">
                                    Prone to misunderstandings and stress
                                </p>
                                <span className="text-xs text-orange-500 mt-2 inline-block">→ View details</span>
                            </Link>
                        </div>
                        <div className="text-slate-600 leading-relaxed">
                            <h4 className="font-bold text-slate-800 mb-2">Communication Tips</h4>
                            <p className="whitespace-pre-wrap">{osData.relationships?.communicationStyle}</p>
                        </div>
                    </Card>
                </section>

                {/* Share */}
                <section className="text-center pt-8 pb-12">
                    <h3 className="font-bold text-slate-700 mb-4">Share this type</h3>
                    <ShareButtonsEn
                        title={`[16 Personality Type] Details for ${osData.name.split('(')[0].trim()}`}
                        text={`${osData.catchphrase} #16Personality #AqshPrisma`}
                    />
                    <div className="mt-8">
                        <Button
                            variant="primary"
                            onClick={() => handlePrint()}
                            disabled={isPrinting}
                            className={`flex items-center gap-2 mx-auto shadow-md ${isPrinting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <FileText size={18} />
                            {isPrinting ? 'Preparing PDF...' : 'Download Type Guide (PDF)'}
                        </Button>
                        <p className="text-xs text-slate-400 mt-2">* Can be cleanly printed or saved as A4 size</p>
                    </div>
                </section>

                {/* All Compatibilities */}
                <section className="border-t border-slate-200 pt-12 mb-16">
                    <h3 className="text-center font-bold text-slate-700 mb-2">Compatibility with All Types</h3>
                    <p className="text-center text-sm text-slate-500 mb-8">Check detailed relationship dynamics with each of the 16 types</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {getAllCompatibilities(code as OSTypeCode).map(({ targetCode: tc, relation: rel }) => (
                            <CompatibilityCardEn
                                key={tc}
                                sourceCode={code as OSTypeCode}
                                targetCode={tc}
                                relation={rel}
                            />
                        ))}
                    </div>
                </section>

                {/* All Types Nav */}
                <section className="border-t border-slate-200 pt-12">
                    <h3 className="text-center font-bold text-slate-500 mb-8">All 16 Types</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {Object.keys(OS_CONTENT_EN).map(key => (
                            <Link
                                key={key}
                                href={`/en/types/${key}/`}
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
                                    {OS_CONTENT_EN[key as keyof typeof OS_CONTENT_EN].name.split(' ')[0]}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

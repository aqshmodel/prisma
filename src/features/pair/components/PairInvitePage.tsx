'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Users, Zap } from 'lucide-react';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { Button } from '@/components/ui/Button';
import { usePairStore } from '@/stores/usePairStore';
import { useDiagnosisStore } from '@/stores/useDiagnosisStore';
import type { OSTypeCode } from '@/types/diagnosis';

interface Props {
    osCode: string;
}

export const PairInvitePage: React.FC<Props> = ({ osCode }) => {
    const router = useRouter();
    const setPartnerCode = usePairStore((s) => s.setPartnerCode);
    const history = useDiagnosisStore((s) => s.history);

    // ★ハイドレーション保護: localStorageの値はクライアント側でのみ読む
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const partnerData = OS_CONTENT[osCode as OSTypeCode];

    if (!partnerData) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-slate-500 mb-4">無効な招待リンクです。</p>
                    <Button onClick={() => router.push('/')}>トップに戻る</Button>
                </div>
            </div>
        );
    }

    const partnerName = partnerData.name.split('(')[0].trim();
    const myResult = mounted && history.length > 0 ? history[0] : null;
    const myCode = myResult?.os.code;

    /** 新規で診断してからペア結果へ */
    const handleStartDiagnosis = () => {
        setPartnerCode(osCode as OSTypeCode);
        router.push('/diagnosis/');
    };

    /** 既存の結果を使ってすぐにペア結果へ */
    const handleSkipToPairResult = () => {
        if (!myCode) return;
        router.push(`/pair/result/${osCode}/${myCode}/`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-white">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                {/* Hero */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 border border-teal-200 rounded-full text-teal-700 text-sm font-bold mb-8">
                        <Users size={14} />
                        ペア相性診断への招待
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-serif font-medium text-slate-900 leading-tight tracking-tight mb-4">
                        <span className="text-teal-600">{osCode}（{partnerName}）</span>
                        <span className="text-slate-400 text-2xl sm:text-3xl">さんから</span>
                        <br />
                        相性診断の招待が届いています
                    </h1>

                    <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed mt-6">
                        あなたも診断を受けて、二人の相性を確認しましょう。
                        ソシオニクスの14種の関係性のうち、どの関係にあたるかが分かります。
                    </p>
                </div>

                {/* Partner Card */}
                <div className="max-w-lg mx-auto mb-12">
                    <div className="bg-white border border-teal-100 rounded-2xl p-6 sm:p-8 shadow-sm text-center">
                        <p className="text-xs text-teal-500 font-bold tracking-wider uppercase mb-2">招待者のタイプ</p>
                        <p className="text-4xl font-serif font-bold text-teal-600 mb-1">{osCode}</p>
                        <p className="text-lg font-serif text-slate-800 mb-2">{partnerName}</p>
                        <p className="text-sm text-slate-500 italic">{partnerData.catchphrase}</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="max-w-lg mx-auto space-y-4">
                    {/* 既存結果がある場合: スキップボタン */}
                    {mounted && myResult && myCode && (
                        <div className="bg-gradient-to-r from-teal-50 to-teal-100/60 border border-teal-200 rounded-2xl p-6 text-center animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-full mb-3">
                                <Zap size={12} />
                                既に診断済みです！
                            </div>
                            <p className="text-sm text-slate-600 mb-4">
                                前回の結果（<span className="font-bold text-teal-700">{OS_CONTENT[myCode]?.name.split('(')[0].trim()}</span>）を使ってすぐに相性結果を見られます。
                            </p>
                            <Button
                                onClick={handleSkipToPairResult}
                                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-base font-bold w-full sm:w-auto"
                            >
                                すぐに相性を見る
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    )}

                    {/* 新規診断ボタン */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
                        <p className="text-sm text-slate-600 mb-4">
                            {mounted && myResult
                                ? '新しく診断し直したい場合はこちら'
                                : 'フル診断（72問・約10分）を受けて、二人の相性を確認しましょう'}
                        </p>
                        <div className="flex justify-center">
                            <Button
                                onClick={handleStartDiagnosis}
                                variant={mounted && myResult ? 'outline' : undefined}
                                className={mounted && myResult
                                    ? 'text-slate-600 hover:text-slate-800'
                                    : 'bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-base font-bold'
                                }
                            >
                                {mounted && myResult ? '新しく診断する' : '無料で診断する（約10分）'}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

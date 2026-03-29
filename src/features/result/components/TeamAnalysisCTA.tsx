'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLocale, useLocalePath } from '@/lib/i18n';

/** チーム分析機能（法人向け）への導線コンポーネント */
export const TeamAnalysisCTA: React.FC = () => {
    const router = useRouter();
    const localePath = useLocalePath();
    const locale = useLocale();

    // 英語版では現状チーム機能が未提供などの場合は非表示にする（今回は日本語版のみ表示とする）
    if (locale === 'en') return null;

    const handleGoToTeam = () => {
        router.push(localePath('/team/'));
    };

    return (
        <div className="mt-8 mb-4 animate-fade-in-up">
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-2xl p-6 sm:p-8 text-center shadow-sm relative overflow-hidden">
                <div className="absolute -top-4 -right-4 text-teal-100 opacity-50">
                    <Briefcase size={80} />
                </div>
                
                <div className="relative z-10">
                    <div className="inline-flex items-center justify-center bg-teal-100 text-teal-600 rounded-full p-3 mb-4">
                        <Users size={24} />
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-serif font-bold text-slate-800 mb-2">
                        職場のチームの相性も分析してみませんか？
                    </h3>
                    
                    <p className="text-sm md:text-base text-slate-600 mb-6 max-w-lg mx-auto leading-relaxed text-left">
                        メンバーのタイプを入力するだけで、チーム全員の相性マップと、GoogleのAI「Gemini」による組織コンサルティングを即座に生成します。
                    </p>
                    
                    <div className="flex justify-center mt-2 sm:mt-4">
                        <Button
                            onClick={handleGoToTeam}
                            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-base font-bold shadow-md hover:shadow-lg transition-all"
                        >
                            法人・チーム向け分析を見る
                            <Briefcase size={18} className="ml-2" />
                        </Button>
                    </div>
                    </div>
                </div>
            </div>
    );
};

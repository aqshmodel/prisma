import React from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
    onStart: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onStart }) => {
    return (
        <Section background="prisma" className="text-center py-24 md:py-32">
            <div className="max-w-4xl mx-auto space-y-8 bg-white/40 backdrop-blur-md p-8 md:p-16 rounded-3xl border border-white/50 shadow-2xl">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight">
                    あなたの可能性を、<br />
                    データで解き明かそう。
                </h2>
                <p className="text-slate-700 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                    組織のミスマッチを解消し、<br className="md:hidden" />最高のチームを作る第一歩。<br />
                    まずは無料で、あなた自身のタイプを知ることから始めましょう。
                </p>

                <div className="pt-8 flex flex-col items-center">
                    <Button
                        size="xl"
                        onClick={onStart}
                        className="w-full sm:w-auto px-16 py-6 text-xl shadow-2xl shadow-prisma-600/30 bg-slate-900 hover:bg-slate-800 text-white border-none transform hover:scale-105 transition-all"
                    >
                        今すぐ診断を始める
                        <ArrowRight className="w-6 h-6 ml-2" />
                    </Button>
                    <p className="mt-4 text-sm text-slate-600">
                        所要時間：約10分 | 登録不要
                    </p>
                </div>
            </div>
        </Section>
    );
};

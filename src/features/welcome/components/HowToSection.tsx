import React from 'react';
import { Section } from '@/components/ui/Section';
import { MousePointerClick, FileText, Rocket } from 'lucide-react';

export const HowToSection: React.FC = () => {
    return (
        <Section background="gray">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                    使い方は、とてもシンプル。
                </h2>
                <p className="text-slate-600">
                    登録不要。今すぐあなたの組織タイプを診断できます。
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
                {/* Connecting Line (PC only) */}
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-prisma-200 via-slate-300 to-prisma-200 -z-10" />

                <StepItem
                    step={1}
                    icon={<MousePointerClick className="w-8 h-8 text-prisma-600" />}
                    title="72の質問に回答"
                    desc="ブラウザ上で直感的に回答。所要時間は約5分〜8分です。アカウント登録は必要ありません。"
                />
                <StepItem
                    step={2}
                    icon={<FileText className="w-8 h-8 text-prisma-600" />}
                    title="分析レポートを表示"
                    desc="回答完了と同時に、詳細な分析結果が表示されます。あなたのタイプ、強み、盲点が即座にわかります。"
                />
                <StepItem
                    step={3}
                    icon={<Rocket className="w-8 h-8 text-prisma-600" />}
                    title="チームで活用"
                    desc="結果をチームでシェア。お互いの「取扱説明書」として活用し、相互理解を深めましょう。"
                />
            </div>
        </Section>
    );
};

const StepItem = ({ step, icon, title, desc }: { step: number, icon: React.ReactNode, title: string, desc: string }) => (
    <div className="flex flex-col items-center text-center group bg-white md:bg-transparent p-6 md:p-0 rounded-2xl shadow-sm md:shadow-none">
        <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
            {icon}
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-prisma-500 text-white flex items-center justify-center font-bold text-sm border-2 border-white">
                {step}
            </div>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
            {desc}
        </p>
    </div>
);

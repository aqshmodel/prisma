import React from 'react';
import { Frown, AlertTriangle, BatteryWarning, HelpCircle } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';

const problems = [
    {
        icon: <HelpCircle className="w-8 h-8 text-prisma-600" />,
        title: "伝わらない",
        desc: "論理的に説明しても、なぜか相手には響かない。あるいは感情論ばかりで話が進まない。"
    },
    {
        icon: <BatteryWarning className="w-8 h-8 text-orange-500" />,
        title: "噛み合わない",
        desc: "お互いに良かれと思ってやっていることが、なぜか裏目に出てトラブルになる。"
    },
    {
        icon: <Frown className="w-8 h-8 text-rose-500" />,
        title: "評価されない",
        desc: "自分の強みが活かせる仕事が回ってこない。チーム内での立ち位置が見つからない。"
    },
];

export const ProblemSection: React.FC = () => {
    return (
        <Section background="gray" className="border-t border-slate-200">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prisma-50 text-prisma-700 text-xs font-bold uppercase tracking-wider border border-prisma-100 animate-fade-in-up"
                >
                    <AlertTriangle className="w-3 h-3" />
                    Problem
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                    優秀なメンバーが集まっても、<br />
                    なぜか成果が出ない。
                </h2>
                <p className="text-slate-600 text-lg">
                    組織の停滞を生むのは「能力不足」ではありません。<br />
                    それは、お互いの<span className="font-bold text-slate-800 underline decoration-prisma-400 decoration-4 underline-offset-4">「認知のズレ」</span>が原因かもしれません。
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {problems.map((problem, idx) => (
                    <div key={idx} className="animate-scale-in" style={{ animationDelay: `${idx * 150}ms` }}>
                        <Card className="h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-t-slate-200 hover:border-t-prisma-500">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="p-3 bg-slate-50 rounded-full">
                                    {problem.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">{problem.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {problem.desc}
                                </p>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>

            <div
                className="mt-16 text-center animate-fade-in-up stagger-3"
            >
                <div className="inline-block p-6 rounded-2xl bg-white border border-prisma-200 shadow-lg max-w-2xl relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-prisma-100 text-prisma-800 px-3 py-1 rounded-full text-xs font-bold border border-prisma-200">
                        POINT
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed">
                        これらの摩擦は、性格の不一致ではなく<br />
                        <span className="text-prisma-600 font-bold">「情報処理タイプ」</span>と<span className="text-orange-500 font-bold">「モチベーション（エンジン）」</span>の<br />
                        ミスマッチから生まれています。
                    </p>
                </div>
            </div>
        </Section>
    );
};

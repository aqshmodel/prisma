import React from 'react';
import { BatteryWarning, HelpCircle, Frown } from 'lucide-react';

const problems = [
    {
        icon: <HelpCircle className="w-8 h-8 transition-colors" />,
        title: "伝わらない",
        desc: "論理的に説明しても、なぜか相手には響かない。あるいは感情論ばかりで話が進まない。"
    },
    {
        icon: <BatteryWarning className="w-8 h-8 transition-colors" />,
        title: "噛み合わない",
        desc: "お互いに良かれと思ってやっていることが、なぜか裏目に出てトラブルになる。"
    },
    {
        icon: <Frown className="w-8 h-8 transition-colors" />,
        title: "評価されない",
        desc: "自分の強みが活かせる仕事が回ってこない。チーム内での立ち位置が見つからない。"
    },
];

export const ProblemSection: React.FC = () => {
    return (
        <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
            {/* Subtle Gradient Background */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-prisma-100/40 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-200/40 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-left md:text-center max-w-3xl mx-auto mb-12 md:mb-20 space-y-6 animate-fade-in-up">
                    <span className="inline-block text-xs font-serif tracking-[0.2em] text-slate-500 uppercase mb-2">
                        The Problem
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-slate-900 leading-[1.4] md:leading-[1.3] tracking-tight text-balance">
                        <span className="inline-block">優秀なメンバーが集まっても、</span><br className="hidden md:block" />
                        <span className="inline-block"><span className="text-prisma-600">成果が出ない</span>理由。</span>
                    </h2>
                    <p className="text-slate-600 text-base md:text-lg leading-[1.8] md:leading-loose tracking-wide font-medium">
                        <span className="inline-block">組織の停滞を生むのは「能力不足」ではありません。</span><br className="hidden md:block" />
                        <span className="inline-block">それは、お互いの<span className="text-slate-900 font-bold border-b-2 border-prisma-300/50 inline-block leading-snug">「認知のズレ」</span>が原因かもしれません。</span>
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {problems.map((problem, idx) => (
                        <div key={idx} className="group relative h-full" style={{ animationDelay: `${idx * 150}ms` }}>
                            <div className="h-full glass-panel rounded-apple p-8 md:p-10 flex flex-col items-start text-left md:items-center md:text-center transition-all duration-500 ease-apple hover:scale-[1.02] hover:shadow-lg hover:shadow-slate-200/50">
                                <div className="mb-6 p-4 bg-slate-50 rounded-2xl shadow-sm text-slate-400 group-hover:bg-prisma-500 group-hover:text-white transition-colors duration-500">
                                    {problem.icon}
                                </div>
                                <h3 className="text-xl font-serif font-bold text-slate-800 mb-4">{problem.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed text-balance-apple">
                                    {problem.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="animate-fade-in-up stagger-3 max-w-4xl mx-auto">
                    <div className="glass-panel rounded-apple p-10 md:p-14 text-center relative overflow-hidden group hover:shadow-xl transition-all duration-500 ease-apple">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-slate-50/80 -z-10" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-prisma-400/30 rounded-full" />

                        <div className="text-left md:text-center">
                            <span className="inline-block text-[10px] font-bold tracking-widest text-prisma-500 uppercase mb-4 border border-prisma-200 px-3 py-1 rounded-full bg-white/50">
                                Key Insight
                            </span>
                            <h3 className="text-xl md:text-2xl font-serif text-slate-800 leading-relaxed">
                                <span className="inline-block">これらの摩擦は、性格の不一致ではなく</span><br className="hidden md:block" />
                                <span className="inline-block"><span className="text-prisma-600 font-bold">「情報処理タイプ」</span>と<span className="text-amber-500 font-bold">「モチベーション」</span>の</span><br className="hidden md:block" />
                                <span className="inline-block">構造的なミスマッチから生まれています。</span>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

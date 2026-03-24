'use client';

import React from 'react';
import { BookOpen, Users, Scale } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { getWelcomeText } from '../welcome-dictionary';

export const TrustSection: React.FC = () => {
    const locale = useLocale();
    const t = getWelcomeText(locale).trust;

    const cardIcons = [
        <BookOpen key="book" className="w-6 h-6 text-prisma-300" />,
        <Users key="users" className="w-6 h-6 text-prisma-300" />,
        <Scale key="scale" className="w-6 h-6 text-prisma-300" />,
    ];

    return (
        <section className="py-24 md:py-32 bg-[#0B0F17] relative overflow-hidden text-white">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-prisma-900/40 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-900/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20 animate-fade-in-up">
                    <span className="inline-block text-xs font-serif tracking-[0.2em] text-prisma-200 uppercase mb-4 opacity-70">
                        {t.badge}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-white leading-[1.3] tracking-tight mb-6">
                        {t.heading[0]}<br />
                        {t.heading[1]}
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {t.cards.map((card, idx) => (
                        <TrustCard
                            key={card.title}
                            icon={cardIcons[idx]}
                            title={card.title}
                            desc={card.desc}
                        />
                    ))}
                </div>

                <div className="max-w-4xl mx-auto animate-fade-in-up stagger-3">
                    <div className="relative rounded-apple p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent overflow-hidden">
                        <div className="absolute inset-0 bg-prisma-500/10 blur-xl opacity-50" />
                        <div className="relative bg-[#0F141C]/80 backdrop-blur-xl rounded-apple p-10 md:p-14 border border-white/5">
                            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                                <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-prisma-500/20 text-prisma-300 font-serif text-2xl font-bold border border-prisma-500/30">
                                    1
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif font-bold mb-4 text-white">{t.whyTitle}</h3>
                                    <p className="text-slate-300 leading-relaxed text-lg">
                                        {locale === 'ja' ? (
                                            <>
                                                多くの性格診断が「よくある行動」や「気分」という<span className="text-white font-bold border-b border-prisma-500/50">表面的な現象</span>だけを測定するのに対し、
                                                Aqsh Prismaはその源泉となる<span className="text-white font-bold border-b border-prisma-500/50">「思考のクセ」</span>と<span className="text-white font-bold border-b border-prisma-500/50">「心のエンジン」</span>を特定します。
                                                そのため、環境や気分で結果がブレにくく、本質的なあなたの自己理解を助けます。
                                            </>
                                        ) : (
                                            <>
                                                {t.whyDesc[0]}
                                                {t.whyDesc[1]}
                                                {t.whyDesc[2]}
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-white/5 flex flex-wrap gap-6 justify-center md:justify-start text-xs font-medium tracking-widest uppercase text-slate-500">
                                <span>Based on Jungian Typology</span>
                                <span>•</span>
                                <span>Socionics Theory</span>
                                <span>•</span>
                                <span>Cognitive Science</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const TrustCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="group p-8 rounded-apple bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-500 ease-apple hover:-translate-y-1">
        <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-serif font-bold mb-4 text-white/90 group-hover:text-white transition-colors">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-sm text-balance-apple group-hover:text-slate-300 transition-colors">
            {desc}
        </p>
    </div>
);

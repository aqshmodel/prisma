'use client';

import React from 'react';
import { Target, Users, TrendingUp } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { getWelcomeText } from '../welcome-dictionary';

const icons = [
    <Target key="target" className="w-8 h-8" />,
    <Users key="users" className="w-8 h-8" />,
    <TrendingUp key="trending" className="w-8 h-8" />,
];

export const BenefitSection: React.FC = () => {
    const locale = useLocale();
    const t = getWelcomeText(locale).benefit;

    return (
        <section className="relative py-32 lg:py-40 overflow-hidden">
            {/* Diffused Background */}
            <div className="absolute inset-0 bg-slate-50/50 -z-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-gradient-to-r from-prisma-100/30 via-white/0 to-prisma-100/30 blur-[120px] -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="text-left md:text-center max-w-3xl mx-auto mb-12 md:mb-20 space-y-6 animate-fade-in-up">
                    <span className="inline-block text-xs font-serif tracking-[0.2em] text-prisma-600 uppercase mb-2">
                        {t.badge}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-slate-900 leading-[1.4] md:leading-[1.2] tracking-tight text-balance">
                        <span className="inline-block">
                            {locale === 'ja' ? (
                                <>自己理解の深さが、</>
                            ) : (
                                <>{t.heading[0]}</>
                            )}
                        </span><br className="hidden md:block" />
                        <span className="inline-block">
                            {locale === 'ja' ? (
                                <><span className="text-prisma-600">人生の質</span>に直結する。</>
                            ) : (
                                <>{t.heading[1]}</>
                            )}
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {t.cards.map((card, idx) => (
                        <BenefitCard
                            key={card.title}
                            icon={icons[idx]}
                            title={card.title}
                            subtitle={card.subtitle}
                            description={card.description}
                            delay={idx * 100}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const BenefitCard = ({ icon, title, subtitle, description, delay }: { icon: React.ReactNode, title: string, subtitle: string, description: string, delay: number }) => (
    <div
        className="group relative h-full glass-panel rounded-apple p-10 flex flex-col items-start transition-all duration-500 ease-apple hover:scale-[1.02] hover:shadow-lg hover:shadow-prisma-100/50"
        style={{ animationDelay: `${delay} ms` }}
    >
        <div className="mb-8 p-4 bg-prisma-100/80 rounded-2xl text-prisma-600 group-hover:bg-prisma-500 group-hover:text-white transition-colors duration-500 ease-apple shadow-sm group-hover:shadow-md ring-1 ring-prisma-200/50 group-hover:ring-prisma-500">
            {icon}
        </div>

        <div className="mb-4">
            <span className="block text-xs font-bold tracking-widest text-prisma-400 uppercase mb-2">{title}</span>
            <h3 className="text-2xl font-serif font-medium text-slate-800 group-hover:text-prisma-700 transition-colors">
                {subtitle}
            </h3>
        </div>

        <p className="text-slate-500 leading-relaxed font-medium text-sm text-balance-apple">
            {description}
        </p>
    </div>
);

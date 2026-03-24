'use client';

import React from 'react';
import { MousePointerClick, FileText, Rocket } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { getWelcomeText } from '../welcome-dictionary';

const icons = [
    <MousePointerClick key="click" className="w-6 h-6 text-prisma-600" />,
    <FileText key="file" className="w-6 h-6 text-prisma-600" />,
    <Rocket key="rocket" className="w-6 h-6 text-prisma-600" />,
];

export const HowToSection: React.FC = () => {
    const locale = useLocale();
    const t = getWelcomeText(locale).howTo;

    return (
        <section className="py-24 md:py-32 bg-slate-50 border-t border-slate-200/60 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6 animate-fade-in-up">
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-slate-900 leading-[1.3] tracking-tight">
                        {t.heading[0]}<br className="md:hidden" />
                        {t.heading[1]}
                    </h2>
                    <p className="text-slate-600 text-base md:text-lg leading-loose tracking-wide font-medium">
                        {t.subheading}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
                    {/* Connecting Line (PC only) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-prisma-200/50 via-slate-300 to-prisma-200/50 -z-10" />

                    {t.steps.map((step, idx) => (
                        <StepItem
                            key={step.title}
                            step={idx + 1}
                            icon={icons[idx]}
                            title={step.title}
                            desc={step.desc}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const StepItem = ({ step, icon, title, desc }: { step: number, icon: React.ReactNode, title: string, desc: string }) => (
    <div className="flex flex-col items-center text-center group relative p-6 md:p-0">
        <div className="w-24 h-24 rounded-full bg-white border border-slate-100 flex items-center justify-center mb-6 shadow-sm shadow-slate-200/50 group-hover:scale-110 group-hover:shadow-md transition-all duration-500 ease-apple relative z-10">
            {icon}
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-serif font-bold text-sm border-4 border-slate-50 group-hover:bg-prisma-500 transition-colors duration-500">
                {step}
            </div>
        </div>
        <h3 className="text-xl font-serif font-medium text-slate-800 mb-3 group-hover:text-prisma-700 transition-colors duration-300">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto text-balance-apple">
            {desc}
        </p>
    </div>
);

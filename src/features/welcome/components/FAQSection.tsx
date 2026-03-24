'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { getWelcomeText } from '../welcome-dictionary';


export const FAQSection: React.FC = () => {
    const locale = useLocale();
    const t = getWelcomeText(locale).faq;

    return (
        <section className="py-24 md:py-32 bg-white border-t border-slate-100 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20 animate-fade-in-up">
                    <span className="inline-block text-xs font-serif tracking-[0.2em] text-slate-400 uppercase mb-2">
                        {t.badge}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-slate-900 leading-[1.3] tracking-tight">
                        {t.heading}
                    </h2>
                </div>

                <div className="space-y-4">
                    {t.items.map((faq, idx) => (
                        <div key={faq.question} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                            <FAQItem question={faq.question} answer={faq.answer} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`group rounded-apple border transition-all duration-500 ease-apple overflow-hidden ${isOpen ? 'bg-slate-50 border-prisma-200/50 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors"
                aria-expanded={isOpen}
            >
                <span className={`font-serif text-lg md:text-xl font-medium transition-colors duration-300 ${isOpen ? 'text-prisma-700' : 'text-slate-800'}`}>
                    {question}
                </span>
                <span className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500 ease-apple ml-4 shrink-0 ${isOpen ? 'bg-prisma-500 border-prisma-500 text-white rotate-180' : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:bg-white group-hover:border-slate-300'}`}>
                    <ChevronDown className="w-4 h-4" />
                </span>
            </button>

            <div
                className={`grid transition-[grid-template-rows] duration-500 ease-apple ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className="p-6 md:p-8 pt-0 text-slate-600 leading-loose text-base md:text-lg border-t border-dashed border-prisma-100/50 mx-6 md:mx-8 mt-2">
                        <div className="pt-4">
                            {answer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

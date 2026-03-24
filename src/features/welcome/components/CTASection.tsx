'use client';

import React from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { getWelcomeText } from '../welcome-dictionary';

interface CTASectionProps {
    onStart: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onStart }) => {
    const locale = useLocale();
    const t = getWelcomeText(locale).cta;

    return (
        <Section background="prisma" className="text-center py-24 md:py-32">
            <div className="max-w-4xl mx-auto space-y-8 bg-white/40 backdrop-blur-md p-8 md:p-16 rounded-3xl border border-white/50 shadow-2xl">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight">
                    {t.heading[0]}<br />
                    {t.heading[1]}
                </h2>
                <p className="text-slate-700 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                    {t.desc[0]}<br className="md:hidden" />{' '}{t.desc[1]}
                </p>

                <div className="pt-8 flex flex-col items-center">
                    <Button
                        size="xl"
                        onClick={onStart}
                        className="w-full sm:w-auto px-16 py-6 text-xl shadow-2xl shadow-prisma-600/30 bg-slate-900 hover:bg-slate-800 text-white border-none transform hover:scale-105 transition-all"
                    >
                        {t.button}
                        <ArrowRight className="w-6 h-6 ml-2" />
                    </Button>
                    <p className="mt-4 text-sm text-slate-600">
                        {t.timeNote}
                    </p>
                </div>
            </div>
        </Section>
    );
};

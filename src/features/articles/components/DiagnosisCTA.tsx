import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface DiagnosisCTAProps {
    title?: string;
    description?: string;
    buttonText?: string;
}

export const DiagnosisCTA: React.FC<DiagnosisCTAProps> = ({
    title = 'FREE ANALYSIS',
    description,
    buttonText = '無料で診断する',
}) => {
    return (
        <div className="my-10 flex flex-col items-center justify-center not-prose w-full">
            {description && (
                <p className="text-center text-slate-600 mb-6 font-medium">
                    {description}
                </p>
            )}
            <Link
                href="/diagnosis"
                className="group relative flex flex-col items-center justify-center bg-[#00B5AD] !text-white !no-underline px-12 py-5 rounded-[40px] shadow-[0_8px_30px_rgb(0,181,173,0.3)] hover:shadow-[0_12px_40px_rgb(0,181,173,0.4)] hover:-translate-y-1 transition-all duration-300 w-full max-w-sm sm:max-w-md"
            >
                <div className="absolute inset-0 bg-white/20 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <span className="text-sm md:text-base font-serif tracking-[0.2em] mb-1 opacity-90 uppercase !text-white">
                    {title}
                </span>
                <span className="text-xl md:text-2xl font-bold tracking-wider flex items-center gap-2 !text-white">
                    {buttonText}
                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform !text-white" />
                </span>
            </Link>
        </div>
    );
};

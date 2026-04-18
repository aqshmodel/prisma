'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';

interface TeamAnalysisCTAProps {
    title?: string;
    description?: string;
    buttonText?: string;
}

export const TeamAnalysisCTA: React.FC<TeamAnalysisCTAProps> = ({
    title = 'TEAM CHEMISTRY ANALYSIS',
    description = '個人の診断は完全無料。メンバーのタイプを入力して組織の相性マップを可視化する',
    buttonText = '法人向けチーム分析を試す',
}) => {
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ctaRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'view_team_cta', {
                            event_category: 'engagement',
                            event_label: 'TeamAnalysisCTA Viewed',
                            location: window.location.pathname,
                        });
                    }
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(ctaRef.current);
        return () => observer.disconnect();
    }, []);

    const handleClick = () => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'click_team_analysis', {
                event_category: 'engagement',
                event_label: 'TeamAnalysisCTA Clicked',
                location: window.location.pathname,
            });
        }
    };

    return (
        <div ref={ctaRef} className="my-12 flex flex-col items-center justify-center not-prose w-full bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100">
            <div className="bg-slate-200 text-slate-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6 flex items-center gap-2">
                <Users size={14} />
                マネージャー・経営者様向け
            </div>
            
            {description && (
                <h3 className="text-center text-slate-800 mb-8 font-bold text-lg md:text-xl max-w-2xl leading-relaxed">
                    {description}
                </h3>
            )}
            
            <Link
                href="/team"
                onClick={handleClick}
                className="group relative flex flex-col items-center justify-center bg-slate-800 !text-white !no-underline px-10 py-5 rounded-2xl shadow-xl hover:bg-slate-900 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full max-w-md"
            >
                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <span className="text-xs md:text-sm font-sans tracking-[0.1em] mb-1.5 opacity-80 uppercase !text-white">
                    {title}
                </span>
                <span className="text-lg md:text-xl font-bold tracking-wider flex items-center gap-2 !text-white">
                    {buttonText}
                    <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform !text-white drop-shadow-sm" />
                </span>
            </Link>
            
            <p className="mt-6 text-xs text-slate-500 text-center max-w-md leading-relaxed">
                ※個人ユーザーの100問診断は何度使っても無料です。従業員の方々に受けてもらい、その結果タイプをチーム分析に入力することで相関図を作成できます。
            </p>
        </div>
    );
};

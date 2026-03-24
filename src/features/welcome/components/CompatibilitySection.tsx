'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight } from 'lucide-react';
import { getOSContent } from '@/lib/i18n/localized-data';
import { Button } from '@/components/ui/Button';
import type { OSTypeCode } from '@/types/diagnosis';
import { useLocale, useLocalePath } from '@/lib/i18n';
import { getWelcomeText } from '../welcome-dictionary';

/**
 * トップページの相性セクション
 *
 * 2つのタイプセレクタで任意のペアの相性詳細ページへ遷移できるUI。
 */
export const CompatibilitySection: React.FC = () => {
    const router = useRouter();
    const locale = useLocale();
    const localePath = useLocalePath();
    const t = getWelcomeText(locale).compatibility;
    const [typeA, setTypeA] = useState<OSTypeCode | ''>('');
    const [typeB, setTypeB] = useState<OSTypeCode | ''>('');

    // ロケールに応じたタイプデータを取得
    const typeOptions = Object.entries(getOSContent(locale)).map(([code, data]) => ({
        code: code as OSTypeCode,
        name: data.name,
    }));
    const canNavigate = typeA && typeB && typeA !== typeB;

    const handleCheck = () => {
        if (canNavigate) {
            router.push(localePath(`/types/${typeA}/compatibility/${typeB}`));
        }
    };

    return (
        <section className="py-20 px-6 bg-gradient-to-b from-white to-prisma-50/30">
            <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-prisma-100 text-prisma-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-6">
                    <Sparkles size={14} />
                    COMPATIBILITY CHECK
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 font-serif mb-4">
                    {t.heading}
                </h2>
                <p className="text-slate-500 mb-10 max-w-md mx-auto">
                    {t.desc}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-8">
                    <select
                        value={typeA}
                        onChange={(e) => setTypeA(e.target.value as OSTypeCode)}
                        className="w-64 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-prisma-400 focus:border-transparent transition-shadow"
                    >
                        <option value="">{t.selectA}</option>
                        {typeOptions.map(({ code, name }) => (
                            <option key={code} value={code}>
                                {name}
                            </option>
                        ))}
                    </select>

                    <span className="text-2xl text-slate-300 font-serif">×</span>

                    <select
                        value={typeB}
                        onChange={(e) => setTypeB(e.target.value as OSTypeCode)}
                        className="w-64 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-prisma-400 focus:border-transparent transition-shadow"
                    >
                        <option value="">{t.selectB}</option>
                        {typeOptions.map(({ code, name }) => (
                            <option key={code} value={code}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

                <Button
                    onClick={handleCheck}
                    disabled={!canNavigate}
                    className={`px-8 py-3 text-base font-bold transition-all mx-auto ${canNavigate
                        ? 'bg-prisma-600 hover:bg-prisma-700 text-white shadow-lg shadow-prisma-200'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                >
                    <span className="flex items-center gap-2">
                        {t.button}
                        <ArrowRight size={18} />
                    </span>
                </Button>
            </div>
        </section>
    );
};

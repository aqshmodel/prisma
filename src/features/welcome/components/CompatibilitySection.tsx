'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight } from 'lucide-react';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { Button } from '@/components/ui/Button';
import type { OSTypeCode } from '@/types/diagnosis';

const typeOptions = Object.entries(OS_CONTENT).map(([code, data]) => ({
    code: code as OSTypeCode,
    name: data.name,
}));

/**
 * トップページの相性セクション
 *
 * 2つのタイプセレクタで任意のペアの相性詳細ページへ遷移できるUI。
 * 「気になるあの人との相性は？」の問いかけでユーザーを引き込む。
 */
export const CompatibilitySection: React.FC = () => {
    const router = useRouter();
    const [typeA, setTypeA] = useState<OSTypeCode | ''>('');
    const [typeB, setTypeB] = useState<OSTypeCode | ''>('');

    const canNavigate = typeA && typeB && typeA !== typeB;

    const handleCheck = () => {
        if (canNavigate) {
            router.push(`/types/${typeA}/compatibility/${typeB}`);
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
                    気になるあの人との相性は？
                </h2>
                <p className="text-slate-500 mb-10 max-w-md mx-auto">
                    2つのタイプを選んで、仕事・恋愛での相性パターンとコミュニケーションのコツを確認しましょう。
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-8">
                    <select
                        value={typeA}
                        onChange={(e) => setTypeA(e.target.value as OSTypeCode)}
                        className="w-64 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-prisma-400 focus:border-transparent transition-shadow"
                    >
                        <option value="">自分のタイプを選択</option>
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
                        <option value="">相手のタイプを選択</option>
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
                        相性を見る
                        <ArrowRight size={18} />
                    </span>
                </Button>
            </div>
        </section>
    );
};

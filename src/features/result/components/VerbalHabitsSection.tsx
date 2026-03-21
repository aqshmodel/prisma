import React from 'react';

import { MessageCircle, Brain, Zap } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import type { OSContent } from '../data/content-os';

interface VerbalHabitsSectionProps {
    osData: OSContent;
}

export const VerbalHabitsSection: React.FC<VerbalHabitsSectionProps> = ({ osData }) => {
    if (!osData.verbalHabits) return null;

    const { phrases, innerVoice, triggerWords } = osData.verbalHabits;

    return (
        <Card className="p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <MessageCircle size={20} className="text-prisma-500" />
                口ぐせ・思考パターン
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* よく言う口ぐせ */}
                <div className="bg-prisma-50/50 p-4 rounded-xl border border-prisma-100">
                    <h4 className="font-bold text-prisma-700 mb-3 text-sm flex items-center gap-1.5">
                        <MessageCircle size={14} />
                        よく言う口ぐせ
                    </h4>
                    <ul className="space-y-2">
                        {phrases.map((phrase, i) => (
                            <li key={i} className="text-sm text-slate-700 leading-relaxed pl-3 border-l-2 border-prisma-200">
                                {phrase}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 心の中のつぶやき */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-600 mb-3 text-sm flex items-center gap-1.5">
                        <Brain size={14} />
                        心の中のつぶやき
                    </h4>
                    <ul className="space-y-2">
                        {innerVoice.map((voice, i) => (
                            <li key={i} className="text-sm text-slate-600 leading-relaxed italic pl-3 border-l-2 border-slate-300">
                                {voice}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 地雷ワード */}
                <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100">
                    <h4 className="font-bold text-rose-700 mb-3 text-sm flex items-center gap-1.5">
                        <Zap size={14} />
                        地雷ワード
                    </h4>
                    <ul className="space-y-2">
                        {triggerWords.map((word, i) => (
                            <li key={i} className="text-sm text-rose-800 leading-relaxed pl-3 border-l-2 border-rose-200">
                                {word}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    );
};

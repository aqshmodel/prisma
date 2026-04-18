'use client';

import React from 'react';
import { DiagnosisCTA } from './DiagnosisCTA';
import { CompatibilityCTA } from './CompatibilityCTA';

export const RelationshipDualCTA: React.FC = () => {
    return (
        <div className="my-16 p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200 shadow-sm not-prose">
            <div className="mb-6 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
                    気になる相手との相性や、本当の自分を正確に知るために
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                    相性を正確に分析するには、まず<strong>あなた自身の本当のタイプ（心のOS）</strong>を把握することが不可欠です。すでにタイプをご存知の方は相性一覧表へ、まだ曖昧な方は無料の精密診断から始めてみましょう。
                </p>
            </div>
            
            <div className="flex flex-col gap-2 relative z-10 w-full mb-10">
                <div className="w-full">
                    <DiagnosisCTA 
                        title="STEP 1" 
                        description="まだ自分のタイプが確定していない方・迷っている方" 
                        buttonText="無料の精密診断を受ける" 
                    />
                </div>
                <div className="w-full -mt-10">
                    <CompatibilityCTA />
                </div>
            </div>
        </div>
    );
};

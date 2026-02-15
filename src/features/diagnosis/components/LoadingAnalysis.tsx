import React, { useEffect, useState } from 'react';



const LOADING_MESSAGES = [
    "思考パターンを解析中...",
    "行動エンジンを特定中...",
    "バイアスリスクを計算中...",
    "組織マップ座標を導出中...",
    "診断完了"
];

interface LoadingAnalysisProps {
    onComplete: () => void;
}

export const LoadingAnalysis: React.FC<LoadingAnalysisProps> = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (step >= LOADING_MESSAGES.length) {
            setTimeout(onComplete, 800);
            return;
        }

        const timer = setTimeout(() => {
            setStep(s => s + 1);
        }, 1200);

        return () => clearTimeout(timer);
    }, [step, onComplete]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
            <div className="relative w-32 h-32 mb-8">
                <div
                    className="absolute inset-0 border-4 border-prisma-100 rounded-full"
                />
                <div
                    className="absolute inset-0 border-t-4 border-prisma-500 rounded-full animate-spin"
                    style={{ animationDuration: '1.5s' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="w-16 h-16 bg-prisma-50 rounded-full animate-pulse"
                    />
                </div>
            </div>

            <div className="h-12 overflow-hidden w-full max-w-sm text-center">
                {step < LOADING_MESSAGES.length && (
                    <p
                        className="text-lg font-bold text-prisma-800 transition-opacity duration-300"
                    >
                        {LOADING_MESSAGES[step]}
                    </p>
                )}
            </div>

            <div className="w-64 h-2 bg-slate-100 rounded-full mt-6 overflow-hidden">
                <div
                    className="h-full bg-prisma-500 transition-all duration-500 ease-out"
                    style={{ width: `${(step / (LOADING_MESSAGES.length - 1)) * 100}%` }}
                />
            </div>
        </div>
    );
};

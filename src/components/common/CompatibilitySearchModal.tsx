'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { Button } from '@/components/ui/Button';
import type { OSTypeCode } from '@/types/diagnosis';

interface CompatibilitySearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const typeOptions = Object.entries(OS_CONTENT).map(([code, data]) => ({
    code: code as OSTypeCode,
    name: data.name,
}));

export const CompatibilitySearchModal: React.FC<CompatibilitySearchModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [typeA, setTypeA] = useState<OSTypeCode | ''>('');
    const [typeB, setTypeB] = useState<OSTypeCode | ''>('');
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    const handleClose = useCallback(() => {
        if (isAnimatingOut) return; // 二重実行防止
        setIsAnimatingOut(true);
        setTimeout(() => {
            onClose();
            setIsAnimatingOut(false);
        }, 300);
    }, [onClose, isAnimatingOut]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsAnimatingOut(false);

            // ブラウザ履歴にモーダル用のエントリを追加
            window.history.pushState({ modal: 'compatibility' }, '');
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // ブラウザの「戻る」ボタンでモーダルを閉じる
    useEffect(() => {
        if (!isOpen) return;

        const handlePopState = () => {
            onClose(); // アニメーションなしで即座に閉じる（戻るボタンのUX）
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [isOpen, onClose]);

    // Escapeキーでも閉じる
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleClose]);

    const canNavigate = typeA && typeB && typeA !== typeB;

    const handleCheck = () => {
        if (canNavigate) {
            // 履歴エントリを消してから遷移
            window.history.back();
            setTimeout(() => {
                onClose();
                router.push(`/types/${typeA}/compatibility/${typeB}`);
            }, 100);
        }
    };

    if (!isOpen && !isAnimatingOut) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 ${isAnimatingOut ? 'opacity-0' : 'opacity-100'
                    }`}
                onClick={handleClose}
            />

            {/* Modal Dialog */}
            <div
                className={`relative w-full max-w-2xl bg-white m-4 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 transform ${isAnimatingOut ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
                    }`}
            >
                {/* Decorative background */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-prisma-200 opacity-20 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 opacity-20 blur-3xl rounded-full pointer-events-none" />

                {/* Close button — z-20 で確実にコンテンツの上に配置 */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-20"
                >
                    <X size={24} />
                </button>

                <div className="relative z-10 p-8 sm:p-12 text-center">
                    <div className="inline-flex items-center gap-2 bg-prisma-100 text-prisma-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-6">
                        <Sparkles size={14} />
                        COMPATIBILITY SEARCH
                    </div>

                    <h2 className="text-3xl font-bold text-slate-800 font-serif mb-4">
                        気になるあの人との相性は？
                    </h2>
                    <p className="text-slate-500 mb-10 max-w-sm mx-auto text-sm">
                        2つのタイプを選んで、仕事・恋愛での相性パターンとコミュニケーションのコツを確認しましょう。
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 justify-center mb-10">
                        <select
                            value={typeA}
                            onChange={(e) => setTypeA(e.target.value as OSTypeCode)}
                            className="w-full sm:w-56 px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-prisma-400 focus:bg-white transition-all"
                        >
                            <option value="">自分のタイプを選択</option>
                            {typeOptions.map(({ code, name }) => (
                                <option key={code} value={code}>
                                    {name}
                                </option>
                            ))}
                        </select>

                        <span className="hidden sm:block text-2xl text-slate-300 font-serif">×</span>
                        <div className="sm:hidden w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-sm my-2">
                            ×
                        </div>

                        <select
                            value={typeB}
                            onChange={(e) => setTypeB(e.target.value as OSTypeCode)}
                            className="w-full sm:w-56 px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-prisma-400 focus:bg-white transition-all"
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
                        className={`w-full sm:w-auto mx-auto px-10 py-4 text-base font-bold transition-all rounded-xl ${canNavigate
                            ? 'bg-prisma-600 hover:bg-prisma-700 text-white shadow-lg shadow-prisma-200/50 hover:shadow-xl hover:-translate-y-0.5'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                    >
                        <span className="flex items-center justify-center gap-2">
                            相性を見る
                            <ArrowRight size={18} />
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

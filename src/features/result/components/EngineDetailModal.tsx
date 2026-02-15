
import React from 'react';

import { X, TrendingUp, AlertCircle, Heart, Zap } from 'lucide-react';
import type { EngineContent } from '../data/content-engine';

interface EngineDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    engine: EngineContent;
    engineType: string;
}

export const EngineDetailModal: React.FC<EngineDetailModalProps> = ({
    isOpen,
    onClose,
    engine,
    engineType,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10"
            >
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white border-b border-gray-100">
                    <div>
                        <span className="inline-block px-3 py-1 mb-2 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-full">
                            駆動エンジン {engineType}
                        </span>
                        <h2 className="text-2xl font-bold text-gray-900">{engine.name}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-8">
                    {/* Description */}
                    <div className="prose prose-indigo max-w-none">
                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {engine.description}
                        </p>
                    </div>

                    {/* Grid Layout for Details */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Strengths */}
                        <div className="p-5 bg-blue-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-3 text-blue-700">
                                <TrendingUp size={20} />
                                <h3 className="font-bold">強み・ポテンシャル</h3>
                            </div>
                            <ul className="text-sm leading-relaxed text-blue-900 list-disc list-inside">
                                {engine.strengths.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Weaknesses */}
                        <div className="p-5 bg-red-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-3 text-red-700">
                                <AlertCircle size={20} />
                                <h3 className="font-bold">陥りやすい罠</h3>
                            </div>
                            <ul className="text-sm leading-relaxed text-red-900 list-disc list-inside">
                                {engine.weaknesses.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Values */}
                        <div className="p-5 bg-purple-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-3 text-purple-700">
                                <Heart size={20} />
                                <h3 className="font-bold">大切にする価値観</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {engine.values.map((item, index) => (
                                    <span key={index} className="px-2 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-md">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Stress Behavior */}
                        <div className="p-5 bg-orange-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-3 text-orange-700">
                                <Zap size={20} />
                                <h3 className="font-bold">ストレス時の反応</h3>
                            </div>
                            <p className="text-sm leading-relaxed text-orange-900 whitespace-pre-wrap">
                                {engine.stressBehavior}
                            </p>
                        </div>
                    </div>

                    {/* Growth Advice (Existing Content) */}
                    <div className="pt-6 border-t border-gray-100">
                        <h3 className="mb-4 text-lg font-bold text-gray-900">
                            成長へのアドバイス
                        </h3>
                        <div className="p-5 border-l-4 border-indigo-500 bg-gray-50 rounded-r-xl">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {engine.growthAdvice}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

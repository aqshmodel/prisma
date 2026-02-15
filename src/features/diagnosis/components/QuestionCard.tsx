import React from 'react';

import { type Question } from '../../../types/diagnosis';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

interface QuestionCardProps {
    question: Question;
    selectedValue: 'A' | 'B' | undefined;
    onSelect: (value: 'A' | 'B') => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedValue, onSelect }) => {
    return (
        <div
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
        >
            <div className="flex items-start gap-4 mb-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-prisma-100 text-prisma-700 font-bold rounded-full text-sm">
                    Q{question.id}
                </span>
                <h3 className="text-lg font-bold text-slate-800 pt-1">
                    {question.text}
                </h3>
            </div>

            <div className="flex flex-col gap-4 pl-0 md:pl-0 mt-6">
                <Option
                    label="A"
                    text={question.choiceA}
                    isSelected={selectedValue === 'A'}
                    onClick={() => onSelect('A')}
                />
                <Option
                    label="B"
                    text={question.choiceB}
                    isSelected={selectedValue === 'B'}
                    onClick={() => onSelect('B')}
                />
            </div>
        </div>
    );
};

const Option: React.FC<{ label: string, text: string, isSelected: boolean, onClick: () => void }> = ({
    label, text, isSelected, onClick
}) => (
    <button
        onClick={onClick}
        className={clsx(
            "w-full text-left rounded-xl md:rounded-2xl transition-all duration-200 border-2 relative group mt-4 md:mt-0 active:scale-[0.98]",
            // Mobile: Extra top padding for border label
            // Desktop: Normal padding, flex layout
            "p-5 pt-7 md:p-6 md:flex md:flex-row md:items-center md:gap-6",
            isSelected
                ? "border-prisma-500 bg-prisma-50/50 shadow-md ring-2 md:ring-4 ring-prisma-100"
                : "border-slate-200 bg-white hover:border-prisma-300 hover:shadow-lg hover:bg-white"
        )}
    >
        {/* Label Badge */}
        {/* Mobile: Absolute on border */}
        {/* Desktop: Static inline block */}
        <div className={clsx(
            "font-bold transition-colors shadow-sm",
            // Mobile Styles
            "absolute -top-3 left-4 px-3 py-0.5 rounded-full text-sm border-2",
            // Desktop Styles
            "md:static md:top-auto md:left-auto md:w-12 md:h-12 md:rounded-xl md:text-xl md:flex md:items-center md:justify-center md:border-0 md:flex-shrink-0",

            isSelected
                ? "bg-prisma-500 text-white border-prisma-500"
                : "bg-white text-slate-400 border-slate-200 group-hover:border-prisma-200 group-hover:text-prisma-500 md:bg-slate-100 md:group-hover:bg-prisma-100 md:group-hover:text-prisma-600"
        )}>
            {label}
        </div>

        {/* Content */}
        <div className="flex-grow flex items-center justify-between">
            <span className={clsx(
                "text-base md:text-lg leading-relaxed font-medium transition-colors my-auto",
                isSelected ? "text-slate-800" : "text-slate-600 group-hover:text-slate-900"
            )}>
                {text}
            </span>

            {/* Check Icon */}
            <div className="w-8 flex justify-center">
                {isSelected && (
                    <div className="w-8 h-8 rounded-full bg-prisma-500 flex items-center justify-center shadow-sm">
                        <Check className="w-5 h-5 text-white" strokeWidth={3} />
                    </div>
                )}
            </div>
        </div>
    </button>
);

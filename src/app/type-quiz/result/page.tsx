'use client';

import { Suspense } from 'react';
import { QuizResultPage } from '@/features/type-quiz/components/QuizResultPage';

export default function TypeQuizResultPageRoute() {
    return (
        <Suspense
            fallback={
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
                </div>
            }
        >
            <QuizResultPage />
        </Suspense>
    );
}

'use client';

import { Suspense } from 'react';
import { MiniResultPage } from '@/features/mini-diagnosis/components/MiniResultPage';

export default function MiniDiagnosisResultPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-prisma-200 border-t-prisma-500 rounded-full animate-spin" />
                </div>
            }
        >
            <MiniResultPage />
        </Suspense>
    );
}

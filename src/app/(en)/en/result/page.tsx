import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ResultPage } from '@/features/result/components/ResultPage';

export const metadata: Metadata = {
    title: 'Your Results | Aqsh Prisma',
    robots: {
        index: false,
    },
};

export default function EnResultPage() {
    return (
        <Suspense>
            <ResultPage />
        </Suspense>
    );
}

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ResultPage } from '@/features/result/components/ResultPage';

export const metadata: Metadata = {
    title: '診断結果 | Aqsh Prisma',
    robots: {
        index: false,
    },
};

/**
 * 結果ページ
 *
 * ResultPage内でuseSearchParamsを使用するため、
 * Next.jsの要件としてSuspenseバウンダリで囲む必要がある。
 * これによりSSG（静的生成）とクエリパラメータの両立が可能になる。
 */
export default function Page() {
    return (
        <Suspense>
            <ResultPage />
        </Suspense>
    );
}

import type { Metadata } from 'next';
import { ResultPage } from '../../features/result/components/ResultPage';

export const metadata: Metadata = {
    title: '診断結果 | Aqsh Prisma',
    robots: {
        index: false,
    },
};

export default function Page() {
    return <ResultPage />;
}

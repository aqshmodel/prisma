import type { Metadata } from 'next';
import { TypeQuizPage } from '@/features/type-quiz/components/TypeQuizPage';
import { SITE_CONFIG, buildUrl } from '@/lib/constants/site-config';

export const metadata: Metadata = {
    title: 'タイプ絞り込みクイズ（5問） | Aqsh Prisma',
    description:
        'たった5問であなたのソシオニクス16タイプを絞り込み！直感で選ぶだけのカンタンクイズ。結果をシェアして友達と比べよう！',
    alternates: {
        canonical: buildUrl('/type-quiz/'),
    },
    openGraph: {
        title: 'タイプ絞り込みクイズ（5問） | Aqsh Prisma',
        description:
            'たった5問であなたのソシオニクス16タイプを絞り込み！直感で選ぶだけのカンタンクイズ。',
        url: buildUrl('/type-quiz/'),
        siteName: SITE_CONFIG.name,
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
        locale: 'ja_JP',
        type: 'website',
    },
};

export default function TypeQuizPageRoute() {
    return <TypeQuizPage />;
}

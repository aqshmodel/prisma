import type { Metadata } from 'next';
import { MiniDiagnosisWizard } from '@/features/mini-diagnosis/components/MiniDiagnosisWizard';
import { SITE_CONFIG, buildUrl } from '@/lib/constants/site-config';

export const metadata: Metadata = {
    title: '4象限クイック診断（約1分） | Aqsh Prisma',
    description:
        'たった10問であなたの思考パターンの象限がわかる！ソシオニクスの4象限（α・β・γ・δ）のどこに属するかを無料で診断します。',
    alternates: {
        canonical: buildUrl('/mini-diagnosis/'),
    },
    openGraph: {
        title: '4象限クイック診断（約1分） | Aqsh Prisma',
        description:
            'たった10問であなたの思考パターンの象限がわかる！ソシオニクスの4象限（α・β・γ・δ）のどこに属するかを無料で診断します。',
        url: buildUrl('/mini-diagnosis/'),
        siteName: SITE_CONFIG.name,
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
        locale: 'ja_JP',
        type: 'website',
    },
};

export default function MiniDiagnosisPage() {
    return <MiniDiagnosisWizard />;
}

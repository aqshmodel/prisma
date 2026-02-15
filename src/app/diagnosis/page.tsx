import type { Metadata } from 'next';
import { DiagnosisWizard } from '../../features/diagnosis/components/DiagnosisWizard';

export const metadata: Metadata = {
    title: '診断開始 | Aqsh Prisma',
    description: '72の設問から、あなたのリーダーシップ特性と潜在リスクを分析します。',
};

export default function DiagnosisPage() {
    return <DiagnosisWizard />;
}

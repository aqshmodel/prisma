import type { Metadata } from 'next';
import { DiagnosisWizard } from '@/features/diagnosis/components/DiagnosisWizard';

export const metadata: Metadata = {
    title: 'Start Diagnosis | Aqsh Prisma',
    description: 'Answer 72 questions to discover your cognitive patterns and unconscious motivations.',
};

export default function EnDiagnosisPage() {
    return <DiagnosisWizard />;
}

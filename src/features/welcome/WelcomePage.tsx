'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDiagnosisStore } from '../../stores/useDiagnosisStore';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { TypeSection } from './components/TypeSection';
import { BenefitSection } from './components/BenefitSection';
import { TrustSection } from './components/TrustSection';
import { HowToSection } from './components/HowToSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';

interface WelcomePageProps {
    articleSlot?: React.ReactNode;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ articleSlot }) => {
    const router = useRouter();
    const resetDiagnosis = useDiagnosisStore((state) => state.resetDiagnosis);
    const answers = useDiagnosisStore((state) => state.answers);
    const currentStep = useDiagnosisStore((state) => state.currentStep);
    const result = useDiagnosisStore((state) => state.result);
    const history = useDiagnosisStore((state) => state.history);

    // Check if there is an active incomplete session
    const hasProgress = Object.keys(answers).length > 0 && currentStep < 8;
    // Check if there is a completed result
    const hasResult = !!result || history.length > 0;

    const handleStart = () => {
        resetDiagnosis();
        router.push('/diagnosis');
    };

    const handleResume = () => router.push('/diagnosis');

    const handleViewResult = () => router.push('/result');

    return (
        <div className="flex flex-col w-full">
            <HeroSection
                onStart={handleStart}
                onResume={handleResume}
                onViewResult={handleViewResult}
                hasProgress={hasProgress}
                hasResult={hasResult}
            />

            <ProblemSection />
            <SolutionSection />
            <TypeSection />
            <BenefitSection />
            <TrustSection />
            <HowToSection />
            <FAQSection />

            {articleSlot}

            <CTASection onStart={handleStart} />
        </div>
    );
};

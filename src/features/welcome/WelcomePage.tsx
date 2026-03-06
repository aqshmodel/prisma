'use client';

import React, { Suspense, lazy } from 'react';
import { useRouter } from 'next/navigation';
import { useDiagnosisStore } from '../../stores/useDiagnosisStore';
import { HeroSection } from './components/HeroSection';

// ファーストビュー外のセクションを遅延読み込み（TBT改善）
const ProblemSection = lazy(() => import('./components/ProblemSection').then(m => ({ default: m.ProblemSection })));
const SolutionSection = lazy(() => import('./components/SolutionSection').then(m => ({ default: m.SolutionSection })));
const TypeSection = lazy(() => import('./components/TypeSection').then(m => ({ default: m.TypeSection })));
const BenefitSection = lazy(() => import('./components/BenefitSection').then(m => ({ default: m.BenefitSection })));
const TrustSection = lazy(() => import('./components/TrustSection').then(m => ({ default: m.TrustSection })));
const TheoryLinksSection = lazy(() => import('./components/TheoryLinksSection').then(m => ({ default: m.TheoryLinksSection })));
const HowToSection = lazy(() => import('./components/HowToSection').then(m => ({ default: m.HowToSection })));
const FAQSection = lazy(() => import('./components/FAQSection').then(m => ({ default: m.FAQSection })));
const CTASection = lazy(() => import('./components/CTASection').then(m => ({ default: m.CTASection })));

interface WelcomePageProps {
    articleSlot?: React.ReactNode;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ articleSlot }) => {
    const router = useRouter();
    const resetDiagnosis = useDiagnosisStore((state) => state.resetDiagnosis);
    const answers = useDiagnosisStore((state) => state.answers);
    const result = useDiagnosisStore((state) => state.result);
    const history = useDiagnosisStore((state) => state.history);

    // 回答が1問以上あり、まだ全問（72問）完了していない場合を「進行中」とみなす
    const answeredCount = Object.keys(answers).length;
    const hasProgress = answeredCount > 0 && answeredCount < 72 && !result;
    // 完了済みの結果があるかどうか
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

            <Suspense fallback={null}>
                <ProblemSection />
                <SolutionSection />
                <TypeSection />
                <BenefitSection />
                <TrustSection />
                <TheoryLinksSection />
                <HowToSection />
                <FAQSection />

                {articleSlot}

                <CTASection onStart={handleStart} />
            </Suspense>
        </div>
    );
};

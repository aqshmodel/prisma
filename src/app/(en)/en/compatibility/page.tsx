import type { Metadata } from 'next';
import { CompatibilitySection } from '@/features/welcome/components/CompatibilitySection';
import { buildUrl } from '@/lib/constants/site-config';

export const metadata: Metadata = {
    title: 'Type Compatibility (16 Types) | Aqsh Prisma',
    description: 'Detailed compatibility analysis between 16 personality types. Discover communication patterns and relationship dynamics for work and love.',
    alternates: {
        canonical: buildUrl('/en/compatibility'),
    },
    openGraph: {
        title: 'Type Compatibility (16 Types) | Aqsh Prisma',
        description: 'Detailed compatibility analysis between 16 personality types.',
        url: buildUrl('/en/compatibility'),
    },
};

export default function EnCompatibilityPage() {
    return (
        <div className="min-h-[70vh] bg-gradient-to-b from-white to-prisma-50/30 flex flex-col justify-center py-10">
            <CompatibilitySection />
        </div>
    );
}

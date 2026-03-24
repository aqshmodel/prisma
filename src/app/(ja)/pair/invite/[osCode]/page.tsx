import type { Metadata } from 'next';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { toTypeLabel } from '@/lib/constants/type-mapping';
import { buildUrl, SITE_CONFIG } from '@/lib/constants/site-config';
import type { OSTypeCode } from '@/types/diagnosis';
import { PairInvitePage } from '@/features/pair/components/PairInvitePage';

type Props = {
    params: Promise<{ osCode: string }>;
};

export function generateStaticParams() {
    return Object.keys(OS_CONTENT).map((osCode) => ({ osCode }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { osCode } = await params;
    const data = OS_CONTENT[osCode as OSTypeCode];
    const typeLabel = toTypeLabel(osCode);

    if (!data) {
        return { title: 'ペア相性診断 | Aqsh Prisma' };
    }

    const typeName = data.name.split('(')[0].trim();
    const title = `${typeName}（${typeLabel}）の私と相性診断しませんか？ | Aqsh Prisma`;
    const description = `${typeName}さんからペア相性診断の招待が届いています。あなたも診断して、二人の相性を確認しましょう！完全無料・約10分。`;
    const url = buildUrl(`/pair/invite/${osCode}`);

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: SITE_CONFIG.name,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default async function PairInviteRoute({ params }: Props) {
    const { osCode } = await params;
    return <PairInvitePage osCode={osCode} />;
}

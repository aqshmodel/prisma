import type { Metadata } from 'next';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { getCompatibility, getPairConcreteTip } from '@/lib/constants/compatibility';
import { buildUrl, SITE_CONFIG } from '@/lib/constants/site-config';
import type { OSTypeCode } from '@/types/diagnosis';
import { PairResultPage } from '@/features/pair/components/PairResultPage';

type Props = {
    params: Promise<{ osCodeA: string; osCodeB: string }>;
};

/**
 * 16×16=256 パターンの静的ルートを生成
 */
export function generateStaticParams() {
    const codes = Object.keys(OS_CONTENT);
    const params: { osCodeA: string; osCodeB: string }[] = [];

    for (const a of codes) {
        for (const b of codes) {
            params.push({ osCodeA: a, osCodeB: b });
        }
    }

    return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { osCodeA, osCodeB } = await params;
    const dataA = OS_CONTENT[osCodeA as OSTypeCode];
    const dataB = OS_CONTENT[osCodeB as OSTypeCode];

    if (!dataA || !dataB) {
        return { title: 'ペア相性結果 | Aqsh Prisma' };
    }

    const relation = getCompatibility(osCodeA as OSTypeCode, osCodeB as OSTypeCode);
    const nameA = dataA.name.split('(')[0].trim();
    const nameB = dataB.name.split('(')[0].trim();

    const title = `${nameA}×${nameB}の相性は【${relation.name}】${relation.emoji} | Aqsh Prisma`;
    const description = `${nameA}（${osCodeA}）と${nameB}（${osCodeB}）の相性は「${relation.name}」（★${'★'.repeat(relation.stars - 1)}）。${relation.summary}`;
    const url = buildUrl(`/pair/result/${osCodeA}/${osCodeB}`);

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

export default async function PairResultRoute({ params }: Props) {
    const { osCodeA, osCodeB } = await params;
    const dataA = OS_CONTENT[osCodeA as OSTypeCode];
    const dataB = OS_CONTENT[osCodeB as OSTypeCode];

    if (!dataA || !dataB) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-slate-500">無効な相性結果ページです。</p>
            </div>
        );
    }

    const relation = getCompatibility(osCodeA as OSTypeCode, osCodeB as OSTypeCode);
    const concreteTip = getPairConcreteTip(osCodeA as OSTypeCode, osCodeB as OSTypeCode);

    return (
        <PairResultPage
            codeA={osCodeA as OSTypeCode}
            codeB={osCodeB as OSTypeCode}
            relation={relation}
            concreteTip={concreteTip}
        />
    );
}

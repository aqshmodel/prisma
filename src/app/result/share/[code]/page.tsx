import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { toTypeLabel } from '@/lib/constants/type-mapping';
import { buildUrl, SITE_CONFIG } from '@/lib/constants/site-config';

type Props = {
    params: Promise<{ code: string }>;
};

export function generateStaticParams() {
    return Object.keys(OS_CONTENT).map((code) => ({ code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { code } = await params;
    const data = OS_CONTENT[code as keyof typeof OS_CONTENT];
    const typeLabel = toTypeLabel(code);

    if (!data) {
        return { title: '診断結果 | Aqsh Prisma' };
    }

    const title = `私のタイプは「${data.name}」でした！ | Aqsh Prisma`;
    const description = `${data.catchphrase} — ${data.name}（${typeLabel}）の診断結果をシェア中。あなたのタイプも無料で診断できます。`;
    const url = buildUrl(`/result/share/${code}`);

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

/** descriptionの先頭2文を抽出 */
function extractSummary(description: string): string {
    const cleaned = description.replace(/\*\*/g, '').replace(/\n/g, ' ').trim();
    const sentences = cleaned.match(/[^。]+。/g);
    if (!sentences) return cleaned.slice(0, 120) + '…';
    return sentences.slice(0, 2).join('');
}

export default async function ShareResultPage({ params }: Props) {
    const { code } = await params;
    const data = OS_CONTENT[code as keyof typeof OS_CONTENT];
    const typeLabel = toTypeLabel(code);

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <p className="text-slate-500 mb-4">タイプが見つかりませんでした。</p>
                    <Link href="/diagnosis" className="text-prisma-600 font-bold hover:underline">
                        診断ページへ →
                    </Link>
                </div>
            </div>
        );
    }

    const summary = extractSummary(data.description);
    const typeName = data.name.split('(')[0].trim();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-prisma-50/30 to-white">
            {/* Hero */}
            <div className="pt-16 pb-12 px-4 text-center">
                <div className="max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-prisma-50 border border-prisma-200 rounded-full text-prisma-700 text-sm font-bold mb-8">
                        <Lightbulb size={14} />
                        診断結果をシェア中
                    </div>

                    <p className="text-sm text-slate-500 mb-2 tracking-wider font-serif">
                        {data.name.match(/\((.+)\)/)?.[1]} / {typeLabel}
                    </p>

                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-4 font-serif">
                        {typeName}
                    </h1>

                    <div className="max-w-lg mx-auto px-6 py-4 relative mb-6">
                        <span className="absolute top-0 left-0 text-5xl text-prisma-200 font-serif leading-none opacity-50">"</span>
                        <span className="absolute bottom-0 right-0 text-5xl text-prisma-200 font-serif leading-none opacity-50 rotate-180">"</span>
                        <p className="text-lg text-slate-700 font-medium italic leading-relaxed font-serif">
                            {data.catchphrase}
                        </p>
                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto mb-8">
                        {summary}
                    </p>

                    <Link
                        href={`/types/${code}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-prisma-600 hover:text-prisma-700 transition-colors mb-12"
                    >
                        このタイプの詳細を見る
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>

            {/* 診断CTA */}
            <div className="px-4 pb-20">
                <div className="max-w-md mx-auto bg-white rounded-2xl border border-prisma-200 shadow-sm p-8 text-center">
                    <h2 className="text-lg font-bold text-slate-800 mb-2">
                        あなたのタイプも気になりませんか？
                    </h2>
                    <p className="text-sm text-slate-500 mb-6">
                        72問の質問で、あなたの思考の癖と無意識の欲求を言語化します。所要時間は約3分、完全無料です。
                    </p>
                    <Link
                        href="/diagnosis"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-prisma-600 hover:bg-prisma-700 text-white font-bold rounded-xl transition-colors text-base"
                    >
                        無料で診断する（3分）
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

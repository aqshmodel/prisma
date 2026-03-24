import Link from 'next/link';
import { ArrowLeft, Scale } from 'lucide-react';
import { PUBLISHER_JSON_LD, buildUrl } from '@/lib/constants/site-config';

export const CommercialTransactionPage = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: '特定商取引法に基づく表記 | Aqsh Prisma',
        description: 'Aqsh Prismaが提供する有料サービスに関する、特定商取引法に基づく表記です。',
        url: buildUrl('/legal'),
        publisher: PUBLISHER_JSON_LD,
        breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'TOP',
                    item: buildUrl('/'),
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: '特定商取引法に基づく表記',
                    item: buildUrl('/legal'),
                },
            ],
        },
    };

    const legalItems: [string, string][] = [
        ['事業者名', 'Aqsh株式会社（Aqsh.co,Ltd.）'],
        ['販売責任者', '代表取締役 塚田崇博'],
        [
            '所在地',
            '〒028-7111 岩手県八幡平市大更25地割113番地 起業家支援センター2F',
        ],
        ['WebサイトURL', 'https://prisma.aqsh.co.jp'],
        ['メールアドレス', 'tsukada-t@aqsh.co.jp'],
        [
            '商品・サービス',
            'チーム相性マップ分析サービス（ソシオニクスに基づくチーム関係性の分析・可視化）',
        ],
        [
            '料金',
            'スモールチーム（3〜6名）: ¥3,300/回（税込）\nミドルチーム（7〜15名）: ¥5,500/回（税込）\nラージチーム（16〜30名）: ¥11,000/回（税込）\n※31名以上の組織分析はお問い合わせください',
        ],
        ['初期費用', '無料'],
        [
            'お支払い方法',
            'クレジットカード決済（Stripeを通じた決済）',
        ],
        [
            'お支払い時期',
            '都度課金: サービス利用時に決済',
        ],
        [
            '役務の提供時期',
            'お申込み・決済完了後、直ちにご利用いただけます。',
        ],
        [
            '解約・キャンセル',
            'デジタルコンテンツの特性上、決済完了後の返品・返金は原則としてお受けしておりません。',
        ],
        [
            '動作環境',
            'インターネットに接続可能なPC・スマートフォン・タブレット（最新のChrome, Safari, Edge, Firefoxを推奨）',
        ],
        [
            '電話受付時間',
            '月曜〜金曜（土日祝日を除く）午前10時〜午後6時',
        ],
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header (Breadcrumb UI) */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-prisma-600 font-medium transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1.5" />
                        TOPへ戻る
                    </Link>
                </div>
            </div>

            <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                {/* Hero Title */}
                <div className="mb-12 md:mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-prisma-50 border border-prisma-100 flex items-center justify-center">
                            <Scale className="w-6 h-6 text-prisma-600" />
                        </div>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium text-sm">
                            Legal Notice
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                        特定商取引法に基づく表記
                    </h1>
                </div>

                {/* Content Body */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-sm md:text-[15px]">
                        <tbody>
                            {legalItems.map(([label, value], i) => (
                                <tr
                                    key={label}
                                    className={i % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}
                                >
                                    <th className="text-left font-semibold text-slate-600 px-5 md:px-8 py-4 md:py-5 w-36 md:w-52 align-top border-b border-slate-100">
                                        {label}
                                    </th>
                                    <td className="text-slate-700 px-5 md:px-8 py-4 md:py-5 border-b border-slate-100 whitespace-pre-line leading-relaxed">
                                        {value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Data */}
                <div className="mt-12 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
                    <div className="prose prose-slate md:prose-lg max-w-none">
                        <div className="bg-slate-50/50 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="text-center md:text-left">
                                <span className="block text-sm font-bold text-slate-800 mb-1">附則</span>
                                <span className="text-sm text-slate-500">本表記は 2026年3月24日 より制定・実施いたします。</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

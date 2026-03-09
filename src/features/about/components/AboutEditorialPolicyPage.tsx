import Link from 'next/link';
import { ArrowLeft, ArrowRight, FileText, Search, RefreshCw, Shield, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_CONFIG, PUBLISHER_JSON_LD } from '@/lib/constants/site-config';

const PolicySection = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
    <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-12 md:mb-16">
        <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-prisma-50 border border-prisma-100 flex items-center justify-center">
                {icon}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">{title}</h2>
        </div>
        {children}
    </section>
);

export const AboutEditorialPolicyPage = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '編集方針 | Aqsh Prisma',
        description: 'Aqsh Prismaのコンテンツがどのような方針・プロセスで制作されているかを説明します。',
        image: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`,
        author: {
            '@type': 'Organization',
            name: SITE_CONFIG.name
        },
        publisher: PUBLISHER_JSON_LD
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        TOPへ戻る
                    </Link>
                </div>
            </div>

            <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

                {/* Hero */}
                <div className="mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-prisma-50 text-prisma-700 font-medium text-sm mb-6 border border-prisma-100">
                        Editorial Policy
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                        編集方針
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Aqsh Prisma のコンテンツがどのような原則・プロセスで<br className="hidden md:inline" />
                        制作されているかをご説明します。
                    </p>
                </div>

                {/* 1. 編集理念 */}
                <PolicySection icon={<Heart className="w-5 h-5 text-prisma-500" />} title="編集理念">
                    <div className="prose text-slate-600 max-w-none">
                        <p className="text-lg font-medium text-slate-800 mb-4">
                            「正しさ」を押しつけるのではなく、「あなたの味方」であること。
                        </p>
                        <p>
                            Aqsh Prisma は、性格タイプ診断を通じて自分自身を深く理解し、日常のストレスや人間関係の悩みに対する具体的な手がかりを提供するメディアです。私たちは、読者を評価・ラベリングすることではなく、「あなたが自分を責めなくていい理由」を見つけるお手伝いをすることを使命としています。
                        </p>
                        <p>
                            記事の語り口は、上から目線のアドバイスではなく、読者と同じ目線で悩みに寄り添うトーンを貫いています。
                        </p>
                    </div>
                </PolicySection>

                {/* 2. コンテンツ制作プロセス */}
                <PolicySection icon={<FileText className="w-5 h-5 text-prisma-500" />} title="コンテンツ制作プロセス">
                    <div className="space-y-4">
                        {[
                            { step: '1', title: 'テーマ選定', desc: '検索データとSNS上のリアルな声をもとに、実際に多くの方が困っているテーマを特定します。' },
                            { step: '2', title: 'リサーチ', desc: '学術論文・専門書・公的機関の資料を中心に、信頼性の高い情報を収集します。SNS投稿は読者の共感素材として活用しますが、事実の根拠としては使用しません。' },
                            { step: '3', title: '執筆', desc: 'ソシオニクスやエニアグラムの理論に基づいた分析を、専門用語を噛み砕いた平易な文章で執筆します。' },
                            { step: '4', title: '検証', desc: '記載内容の正確性、理論との整合性、読者にとっての有用性を複数の視点からチェックします。' },
                            { step: '5', title: '公開・更新', desc: '公開後も定期的に内容を見直し、最新の知見や読者からのフィードバックを反映します。' },
                        ].map(s => (
                            <div key={s.step} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-prisma-500 text-white flex items-center justify-center text-sm font-bold">{s.step}</span>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">{s.title}</h4>
                                    <p className="text-sm text-slate-600 mt-1">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </PolicySection>

                {/* 3. 情報ソースの基準 */}
                <PolicySection icon={<Search className="w-5 h-5 text-prisma-500" />} title="情報ソースの基準">
                    <div className="prose text-slate-600 max-w-none mb-6">
                        <p>Aqsh Prisma では、以下の優先順位で情報源を採用しています。</p>
                    </div>
                    <div className="space-y-3">
                        {[
                            { priority: '最優先', sources: '学術論文（査読済み）、専門書、公的機関の統計データ' },
                            { priority: '高', sources: '専門家によるレビュー記事、企業の調査レポート' },
                            { priority: '補助的', sources: 'SNS投稿（X, note等）は「読者の実体験の声」として引用。事実の根拠としては使用しない' },
                        ].map(s => (
                            <div key={s.priority} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <span className="flex-shrink-0 px-2 py-0.5 rounded bg-prisma-50 text-prisma-700 text-xs font-bold border border-prisma-100">{s.priority}</span>
                                <p className="text-sm text-slate-600">{s.sources}</p>
                            </div>
                        ))}
                    </div>
                </PolicySection>

                {/* 4. 更新ポリシー */}
                <PolicySection icon={<RefreshCw className="w-5 h-5 text-prisma-500" />} title="更新ポリシー">
                    <div className="prose text-slate-600 max-w-none">
                        <p>
                            公開済みの記事は、以下の基準で定期的に見直しを行います。
                        </p>
                        <ul className="list-none pl-0 space-y-2 mt-4">
                            <li className="flex items-start"><span className="mr-2 text-prisma-500">•</span>ソシオニクス・エニアグラムの研究に新しい知見が発表された場合</li>
                            <li className="flex items-start"><span className="mr-2 text-prisma-500">•</span>社会情勢の変化により、記事の前提や文脈が古くなった場合</li>
                            <li className="flex items-start"><span className="mr-2 text-prisma-500">•</span>読者からの指摘やフィードバックにより、改善が必要と判断された場合</li>
                            <li className="flex items-start"><span className="mr-2 text-prisma-500">•</span>最終更新日は各記事ページに明示しています</li>
                        </ul>
                    </div>
                </PolicySection>

                {/* 5. 免責事項 */}
                <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-12 md:mb-16">
                    <div className="flex items-start gap-4">
                        <Shield className="w-6 h-6 text-slate-400 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="font-bold text-slate-900 text-xl mb-4">免責事項</h2>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li>本サイトで提供するコンテンツおよび診断結果は、自己理解を深めるためのフレームワークであり、医学的・心理学的な診断や治療行為ではありません。</li>
                                <li>性格タイプの情報は、個人の能力や人格の優劣を決定づけるものではありません。</li>
                                <li>心身の不調が続く場合は、かかりつけの医師や心療内科、カウンセラーなどの専門機関にご相談ください。</li>
                                <li>コンテンツの利用により生じたいかなる損害についても、Aqsh Prisma は責任を負いかねます。</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="text-center mb-12">
                    <Link
                        href="/diagnosis"
                        className={cn(
                            "inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white",
                            "bg-prisma-500 rounded-full hover:bg-prisma-600 transition-all",
                            "transform hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-prisma-500/20"
                        )}
                    >
                        無料で診断してみる
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </div>

            </main>
        </div>
    );
};

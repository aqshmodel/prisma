import Link from 'next/link';
import { ArrowLeft, ArrowRight, Brain, Gauge, Cpu, Shield, AlertTriangle, BookOpen, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_CONFIG, PUBLISHER_JSON_LD } from '@/lib/constants/site-config';

const Section = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <section className={cn("bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-12 md:mb-16", className)}>
        {children}
    </section>
);

const StepCard = ({ number, title, description, icon }: { number: string; title: string; description: string; icon: React.ReactNode }) => (
    <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-prisma-50 border border-prisma-100 flex items-center justify-center">
            {icon}
        </div>
        <div>
            <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-prisma-500 bg-prisma-50 px-2 py-0.5 rounded-full">{number}</span>
                <h4 className="font-bold text-slate-900">{title}</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
        </div>
    </div>
);

const AxisCard = ({ axis, labelA, labelB, questions, description }: { axis: string; labelA: string; labelB: string; questions: string; description: string }) => (
    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-lg bg-prisma-500 text-white text-sm font-bold">{axis}</span>
            <span className="text-sm text-slate-500">{labelA} ↔ {labelB}</span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-2">{description}</p>
        <p className="text-xs text-slate-400">対象設問: {questions}</p>
    </div>
);

export const AboutMethodologyPage = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '診断ロジックの説明 | Aqsh Prisma の診断はどう作られているか',
        description: 'Aqsh Prismaの16タイプ×エニアグラム診断がどのようなロジックで結果を算出しているかを、透明性をもって解説します。72問の設問設計から判定アルゴリズムまで。',
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
                <div className="mb-16 md:mb-24">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-prisma-50 text-prisma-700 font-medium text-sm mb-6 border border-prisma-100">
                        Methodology
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        診断ロジックの説明
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                        Aqsh Prisma の診断は、どのような理論的根拠に基づき、<br className="hidden md:inline" />
                        どのようなアルゴリズムで結果を導き出しているのか。<br className="hidden md:inline" />
                        その全体像を透明性をもって解説します。
                    </p>
                </div>

                {/* 1. 診断の全体像 */}
                <Section>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                        診断の全体像
                    </h2>
                    <div className="prose prose-lg text-slate-600 max-w-none mb-8">
                        <p>
                            Aqsh Prisma の診断は、全<span className="bg-prisma-100 text-prisma-900 px-1.5 mx-0.5 rounded font-bold">72問</span>の二択質問に回答することで、以下の4つの分析を同時に行います。すべての計算はクライアント（あなたのブラウザ）上でリアルタイムに実行され、回答データがサーバーに送信されることはありません。
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <StepCard
                            number="Part 1"
                            title="思考のクセ（OS）判定"
                            description="20問の回答から、ソシオニクスの4指標（E/I, N/S, T/F, J/P）を算出し、16タイプのうち1つを決定します。"
                            icon={<Brain className="w-5 h-5 text-prisma-500" />}
                        />
                        <StepCard
                            number="Part 2"
                            title="サブタイプ判定"
                            description="24問の回答から、環境との関わり方の傾向（Contact型 / Inert型）を判定します。"
                            icon={<Gauge className="w-5 h-5 text-prisma-500" />}
                        />
                        <StepCard
                            number="Part 3"
                            title="エンジン（エニアグラム）判定"
                            description="18問の回答から、9タイプの心のエンジン（根源的欲求）のうち、主エンジンと副エンジンを特定します。"
                            icon={<Cpu className="w-5 h-5 text-prisma-500" />}
                        />
                        <StepCard
                            number="Part 4"
                            title="認知バイアス検出"
                            description="10問5ペアの回答パターンから、確証バイアスやサンクコスト効果などの思考の偏りを検出します。"
                            icon={<AlertTriangle className="w-5 h-5 text-prisma-500" />}
                        />
                    </div>
                </Section>

                {/* 2. OS判定ロジック */}
                <Section>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                        Part 1: 思考のクセ（OS）判定
                    </h2>
                    <p className="text-slate-500 mb-8">設問 Q1〜Q20 / 20問</p>

                    <div className="prose text-slate-600 max-w-none mb-8">
                        <p>
                            ソシオニクスの16タイプは、4つの二項対立指標の組み合わせで構成されます。各指標に関連する複数の設問への回答をスコアリングし、閾値と比較してどちらの傾向が強いかを判定します。
                        </p>
                        <p>
                            スコアが閾値付近で判定が困難な場合（いわゆる「ボーダーライン」）は、各指標ごとに定められた<span className="bg-prisma-100 text-prisma-900 px-1 mx-0.5 rounded">タイブレーカー設問</span>の回答を参照して最終判定を行います。これにより、曖昧な回答でも一貫性のある結果を保証しています。
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AxisCard
                            axis="E / I"
                            labelA="外向"
                            labelB="内向"
                            questions="Q1, Q8, Q12, Q27, Q32"
                            description="エネルギーの方向性。外界との相互作用を好むか、内面世界での熟考を好むか。"
                        />
                        <AxisCard
                            axis="N / S"
                            labelA="直感"
                            labelB="感覚"
                            questions="Q4, Q6, Q9, Q13, Q17, Q19"
                            description="情報の受け取り方。抽象的な可能性を見るか、具体的な事実を見るか。"
                        />
                        <AxisCard
                            axis="T / F"
                            labelA="論理"
                            labelB="感情"
                            questions="Q3, Q7, Q10, Q14, Q18, Q39"
                            description="判断のくだし方。客観的な論理で判断するか、主観的な価値観で判断するか。"
                        />
                        <AxisCard
                            axis="j / p"
                            labelA="規範"
                            labelB="柔軟"
                            questions="Q2, Q5, Q11, Q15, Q16, Q20"
                            description="外界への態度。計画的に進めるか、柔軟に適応するか。ソシオニクス独自の定義。"
                        />
                    </div>
                </Section>

                {/* 3. サブタイプ判定 */}
                <Section>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                        Part 2: サブタイプ判定
                    </h2>
                    <p className="text-slate-500 mb-8">設問 Q21〜Q44 / 24問</p>

                    <div className="prose text-slate-600 max-w-none mb-8">
                        <p>
                            同じ16タイプでも、環境との関わり方には個人差があります。ソシオニクスではこれを<span className="bg-prisma-100 text-prisma-900 px-1 mx-0.5 rounded">サブタイプ</span>と呼びます。
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-prisma-50 border border-blue-100">
                            <h3 className="font-bold text-slate-900 mb-3 text-lg">🔄 Contact（接触型）</h3>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li className="flex items-start"><span className="mr-2 text-blue-400">•</span>環境との接点を積極的に作る</li>
                                <li className="flex items-start"><span className="mr-2 text-blue-400">•</span>変化に強く、柔軟に対応する</li>
                                <li className="flex items-start"><span className="mr-2 text-blue-400">•</span>外部からの刺激を力に変える</li>
                            </ul>
                        </div>
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                            <h3 className="font-bold text-slate-900 mb-3 text-lg">🛡️ Inert（慣性型）</h3>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li className="flex items-start"><span className="mr-2 text-amber-400">•</span>自分のペースと領域を守る</li>
                                <li className="flex items-start"><span className="mr-2 text-amber-400">•</span>環境からのノイズを遮断する</li>
                                <li className="flex items-start"><span className="mr-2 text-amber-400">•</span>内面的な深みと一貫性がある</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-sm text-slate-500">
                            24問の回答をスコアリングし、閾値によって判定します。ボーダーラインの場合は、OS判定のE/I傾向をタイブレーカーとして使用します（外向型はContact寄り、内向型はInert寄り）。
                        </p>
                    </div>
                </Section>

                {/* 4. エンジン判定 */}
                <Section>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                        Part 3: エンジン（エニアグラム）判定
                    </h2>
                    <p className="text-slate-500 mb-8">設問 Q45〜Q62 / 18問</p>

                    <div className="prose text-slate-600 max-w-none mb-8">
                        <p>
                            思考のクセとは別に、人には無意識の深層にある<span className="bg-prisma-100 text-prisma-900 px-1 mx-0.5 rounded">根源的な欲求（心のエンジン）</span>が存在します。エニアグラム理論に基づく9タイプの欲求パターンを、18問の二択で測定します。
                        </p>
                        <p>
                            判定では、各設問が2つのエンジンタイプを対照させる構造になっており、回答ごとに該当タイプにスコアが加算されます。最終的にスコアが最も高い2タイプを、主エンジン（Primary）と副エンジン（Secondary）として出力します。
                        </p>
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-3 gap-3 mb-8">
                        {[
                            { type: 'T1', name: '完璧', desc: '正しくありたい' },
                            { type: 'T2', name: '貢献', desc: '人の役に立ちたい' },
                            { type: 'T3', name: '達成', desc: '成功を証明したい' },
                            { type: 'T4', name: '独自', desc: '唯一無二でありたい' },
                            { type: 'T5', name: '探究', desc: '仕組みを理解したい' },
                            { type: 'T6', name: '安全', desc: 'リスクを排除したい' },
                            { type: 'T7', name: '冒険', desc: '自由にワクワクしたい' },
                            { type: 'T8', name: '支配', desc: '自分で決めたい' },
                            { type: 'T9', name: '平和', desc: '穏やかでいたい' },
                        ].map(e => (
                            <div key={e.type} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                                <span className="text-xs font-bold text-prisma-500">{e.type}</span>
                                <p className="font-bold text-slate-900 text-sm mt-1">{e.name}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{e.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="p-5 rounded-2xl bg-prisma-50 border border-prisma-100">
                        <h4 className="font-bold text-prisma-800 mb-2 flex items-center">
                            <Shield className="w-4 h-4 mr-2" />
                            OSとの整合性チェック（Priority Map）
                        </h4>
                        <p className="text-sm text-prisma-700 leading-relaxed">
                            エンジン判定では、スコアが同点の場合にOS（16タイプ）との整合性を考慮した重み付けを行います。たとえば外向型（E）は行動・達成系のエンジン（T3, T7, T8）と、内向型（I）は探究・安全系のエンジン（T5, T4, T1）と親和性が高いため、ボーダーラインの判定ではこの傾向を加味します。
                        </p>
                    </div>
                </Section>

                {/* 5. 認知バイアス */}
                <Section>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                        Part 4: 認知バイアス検出
                    </h2>
                    <p className="text-slate-500 mb-8">設問 Q63〜Q72 / 10問（5ペア）</p>

                    <div className="prose text-slate-600 max-w-none mb-8">
                        <p>
                            認知バイアスとは、人が無意識のうちに陥る思考の偏りです。Aqsh Prisma では、5種類の代表的なバイアスについて、それぞれ2問1組のペア構造で検出します。ペアの2問とも特定パターンの回答をした場合に、そのバイアスが強く検出されたとみなします。
                        </p>
                    </div>

                    <div className="space-y-3">
                        {[
                            { name: '確証バイアス', desc: '自分に都合のよい情報ばかりを集め、反証データを過小評価する傾向', pair: 'Q63 & Q64' },
                            { name: 'サンクコスト効果', desc: 'すでに費やしたコスト（時間・金銭）に囚われ、損切りできなくなる傾向', pair: 'Q65 & Q66' },
                            { name: '現状維持バイアス', desc: '変化のリスクを過大評価し、現状を維持しようとする傾向', pair: 'Q67 & Q68' },
                            { name: '帰属バイアス', desc: '成功は自分の実力、失敗は環境のせいと解釈する傾向', pair: 'Q69 & Q70' },
                            { name: '同調バイアス', desc: '集団の空気に流され、自分の意見を抑制する傾向', pair: 'Q71 & Q72' },
                        ].map(b => (
                            <div key={b.name} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-slate-900 text-sm">{b.name}</h4>
                                        <span className="text-xs text-slate-400">{b.pair}</span>
                                    </div>
                                    <p className="text-sm text-slate-600">{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* 6. 整合性チェック */}
                <Section>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                        回答の整合性チェック
                    </h2>
                    <div className="prose text-slate-600 max-w-none mb-8">
                        <p>
                            診断結果の信頼性を担保するため、Aqsh Prisma ではOS（16タイプ）とエンジン（エニアグラム）の判定結果に矛盾がないかを自動で検証しています。
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-green-50 border border-green-100">
                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-slate-900">判定A: 高い整合性</h4>
                                <p className="text-sm text-slate-600 mt-1">OSとエンジンの間に矛盾が見られず、回答に一貫性があります。結果の信頼度が高い状態です。</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-amber-50 border border-amber-100">
                            <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-slate-900">判定B: 軽度の不一致</h4>
                                <p className="text-sm text-slate-600 mt-1">OSとエンジンの間に1点の不一致が検出されました。環境適応や成長過程でこのパターンが出ることがあります。</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-red-50 border border-red-100">
                            <Shield className="w-6 h-6 text-red-500 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-slate-900">判定C: 社会的仮面の可能性</h4>
                                <p className="text-sm text-slate-600 mt-1">複数の矛盾が検出されました。「こうあるべき自分」として回答した可能性があります。リラックスした状態で再診断をおすすめします。</p>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* 7. 理論的背景 */}
                <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white mb-12 md:mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <BookOpen className="w-8 h-8 text-prisma-400" />
                        <h2 className="text-2xl md:text-3xl font-bold">理論的背景</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="font-bold text-prisma-300 mb-3">ソシオニクス</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                1970年代にリトアニアの研究者アウシュラ・アウグスティナヴィチューテによって体系化。ユングの心理学的類型論を基盤に、情報代謝（Information Metabolism）の概念を導入して16タイプの相互関係を理論化。
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="font-bold text-prisma-300 mb-3">エニアグラム</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                古代の知恵とされる9つの人格パターンの体系。クラウディオ・ナランホやドン・リチャード・リソらにより現代心理学として再構築され、個人の根源的動機と防衛パターンを説明する枠組みとして広く活用。
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="font-bold text-prisma-300 mb-3">認知バイアス</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                ダニエル・カーネマンとエイモス・トヴェルスキーの行動経済学、およびリチャード・セイラーのナッジ理論に基づく意思決定の偏りの検出。ビジネスシーンでの判断ミスを未然に防ぐための気づきを提供。
                            </p>
                        </div>
                    </div>
                </section>

                {/* 8. 免責事項 */}
                <Section className="bg-slate-50 border-slate-200">
                    <div className="flex items-start gap-4">
                        <Shield className="w-6 h-6 text-slate-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-slate-900 mb-2">ご利用にあたって</h3>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li>本診断は自己理解のためのフレームワークであり、医学的・心理学的な診断行為ではありません。</li>
                                <li>結果はあくまで傾向の可視化であり、個人の能力や適性を断定するものではありません。</li>
                                <li>すべての計算処理はお使いのブラウザ上で完結しており、回答データは外部サーバーに送信されません。</li>
                                <li>心身の不調が続く場合は、専門の医療機関にご相談ください。</li>
                            </ul>
                        </div>
                    </div>
                </Section>

                {/* CTA */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        自分の思考のクセを知る
                    </h2>
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

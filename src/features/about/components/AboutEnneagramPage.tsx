import Link from 'next/link';
import { ArrowLeft, Flame, Shield, Heart, Eye, Layout, ArrowRight } from 'lucide-react';
import { ENGINE_CONTENT } from '@/features/result/data/content-engine';
import { cn } from '@/lib/utils';

const parseBoldText = (text: string | undefined | null) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <span key={index} className="bg-prisma-100 text-prisma-900 px-1.5 py-0.5 rounded font-bold mx-0.5">
                    {part.slice(2, -2)}
                </span>
            );
        }
        return part;
    });
};

const enneagramFeatures = [
    {
        icon: <Heart className="w-6 h-6 text-prisma-500" />,
        title: '感情センター',
        description: '自己イメージや「他者からどう見られているか」が行動の軸。T2(貢献)、T3(達成)、T4(独自)が属します。'
    },
    {
        icon: <Eye className="w-6 h-6 text-prisma-600" />,
        title: '思考センター',
        description: '不安や恐れを避け、安全を確保するための「分析・戦略」が行動の軸。T5(探求)、T6(安全)、T7(熱狂)が属します。'
    },
    {
        icon: <Shield className="w-6 h-6 text-prisma-500" />,
        title: '本能センター',
        description: '怒りや自律性、「環境をコントロールしたい」という衝動が行動の軸。T8(統率)、T9(平和)、T1(品質)が属します。'
    }
];

export const AboutEnneagramPage = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'エニアグラムとは？ | 9つの欲求と心のエンジン | Aqsh(アクシュ)',
        description: '同じ行動の裏にある本当の理由とは。あなたの行動を無意識に支配する9タイプのエニアグラム（心のエンジン）について、専門的にわかりやすく解説します。',
        image: 'https://prisma.aqsh.co.jp/og-image.png',
        author: {
            '@type': 'Organization',
            name: 'Aqsh Prisma'
        },
        publisher: {
            '@type': 'Organization',
            name: 'Aqsh Prisma',
            logo: {
                '@type': 'ImageObject',
                url: 'https://prisma.aqsh.co.jp/logo.png'
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Header / Navigation */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        TOPへ戻る
                    </Link>
                </div>
            </div>

            <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                {/* Hero Section */}
                <div className="mb-16 md:mb-24">
                    <span className="inline-flex px-4 py-1.5 rounded-full bg-prisma-50 text-prisma-700 font-medium text-sm mb-6 items-center border border-prisma-100">
                        <Flame className="w-4 h-4 mr-1.5" />
                        Theory 2: 心のエンジン
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        無意識の欲求に触れる
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                        同じ行動をとっていても、その裏にある本当の理由は人それぞれ。<br />
                        あなたの人生を内側から駆動させる、エニアグラムの世界へ。
                    </p>
                </div>

                {/* Introduction */}
                <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-16 md:mb-24">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                        心のエンジンとは
                    </h2>
                    <div className="prose prose-lg text-slate-600 max-w-none">
                        <p className="mb-4">
                            エニアグラムは、人間の性格を9つの基本的なタイプに分類する強力な心理学システムです。自分の恐れているものは何か、どうしても欲してしまうものは何かといった人間の根源的な動機（モチベーション）を深く掘り下げます。
                        </p>
                        <p className="mb-4">
                            Aqshでは、このエニアグラムが示す無意識の欲求を<span className="bg-prisma-100 text-prisma-900 px-1 mx-1 rounded whitespace-nowrap">心のエンジン</span>と呼びます。
                        </p>
                        <p>
                            ソシオニクス（思考のクセ）が「どうやるか」というスペックだとすれば、エニアグラム（心のエンジン）は<span className="bg-prisma-100 text-prisma-900 px-1 mx-1 rounded whitespace-nowrap">なぜやるか</span>という根本的な動機に当たります。この2つの掛け合わせにより、あなたという唯一無二の存在が形成されているというのが、Aqshの哲学です。
                        </p>
                    </div>
                </section>

                {/* Centers Explanation */}
                <section className="mb-16 md:mb-24">
                    <div className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                            人を動かす3つの源泉
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            エニアグラムでは、人のエネルギーの源泉を大きく3つに分類します。あなたが無意識のうちに最も頼っているエネルギーはどれでしょうか。
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {enneagramFeatures.map((feature, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 9 Types Details */}
                <section className="mb-16 md:mb-24">
                    <div className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                            9つの心のエンジン
                        </h2>
                        <p className="text-slate-600">
                            Aqshで定義している、誰もが生まれ持つ9つの無意識の欲求と、その光と影。
                        </p>
                    </div>

                    <div className="space-y-6">
                        {Object.values(ENGINE_CONTENT).map((engine) => (
                            <div key={engine.type} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
                                <div className="flex flex-col md:flex-row md:items-start gap-6">
                                    {/* Left Column (Identifier) */}
                                    <div className="md:w-1/4 flex-shrink-0">
                                        <span className="inline-block px-3 py-1 rounded-md bg-prisma-50 text-prisma-700 font-bold text-sm mb-2 border border-prisma-100">
                                            タイプ {engine.type.replace('T', '')}
                                        </span>
                                        <h3 className="text-2xl font-bold text-slate-900">{engine.name}</h3>
                                    </div>

                                    {/* Right Column (Content) */}
                                    <div className="md:w-3/4">
                                        <div className="bg-slate-50 rounded-xl p-4 mb-5 border border-slate-100">
                                            <p className="text-slate-700 font-medium">
                                                <span className="text-prisma-500 mr-2 flex-shrink-0">根源的欲求:</span>
                                                <span className="leading-relaxed">{parseBoldText(engine.motivation)}</span>
                                            </p>
                                        </div>
                                        <div className="text-slate-600 leading-relaxed mb-8">
                                            {parseBoldText(engine.description)}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
                                            <div>
                                                <h4 className="font-semibold text-prisma-600 mb-3 text-sm flex items-center">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-prisma-500 mr-2"></span>光（強み）
                                                </h4>
                                                <ul className="space-y-2 text-sm text-slate-600">
                                                    {engine.strengths.map((str, i) => (
                                                        <li key={i} className="flex items-start">
                                                            <span className="mr-2 text-prisma-400 font-bold leading-relaxed">•</span>
                                                            <span className="leading-relaxed">{parseBoldText(str)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-slate-500 mb-3 text-sm flex items-center">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-2"></span>影（ストレス行動）
                                                </h4>
                                                <div className="text-sm text-slate-600 leading-relaxed">
                                                    {parseBoldText(engine.stressBehavior)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Combining Theories */}
                <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white mb-16 md:mb-24">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/3 flex justify-center">
                            <Layout className="w-32 h-32 text-prisma-400 opacity-80" />
                        </div>
                        <div className="md:w-2/3">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                16×9＝144の解像度
                            </h2>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                思考のクセ（16タイプ）と、心のエンジン（9タイプ）。<br />
                                世の中にある多くの診断はどちらか片方だけを見るため、なんとなく腑に落ちないという結果になりがちです。同じく論理的な思考を持つ人だとしても、成功したいからなのか、不安を消したいからなのかで、その人はまるで別の顔を持ちます。
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                Aqshは、この2つを掛け合わせた144通りの究極のパーソナライゼーションで、あなたという存在の解像度を極限まで引き上げます。
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        自分のエンジンを知る
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

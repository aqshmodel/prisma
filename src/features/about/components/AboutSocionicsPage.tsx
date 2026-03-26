import Link from 'next/link';
import { ArrowLeft, Brain, Compass, Users, Target, ArrowRight } from 'lucide-react';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { cn } from '@/lib/utils';
import { SITE_CONFIG, PUBLISHER_JSON_LD } from '@/lib/constants/site-config';
import { parseBoldText } from '@/lib/utils/parse-bold-text';

const renderTextWithBullets = (text: string) => {
    if (!text) return null;
    const items = text.split('・').filter(item => item.trim() !== '');

    if (items.length === 1 && !text.includes('・')) {
        return <div className="text-slate-600 leading-relaxed text-sm">{parseBoldText(items[0])}</div>;
    }

    return (
        <ul className="space-y-3 mt-2">
            {items.map((item, idx) => (
                <li key={`bullet-${idx}`} className="flex items-start">
                    <span className="mr-2 text-prisma-400 font-bold leading-relaxed text-sm">•</span>
                    <span className="text-slate-600 leading-relaxed text-sm">
                        {parseBoldText(item.trim())}
                    </span>
                </li>
            ))}
        </ul>
    );
};

const features = [
    {
        icon: <Brain className="w-6 h-6 text-prisma-500" />,
        title: '情報の受け取り方',
        description: '感覚(S)と直感(N)。目の前にある「事実」を見るか、その裏にある「可能性」を見るか。'
    },
    {
        icon: <Target className="w-6 h-6 text-prisma-600" />,
        title: '判断のくだし方',
        description: '思考(T)と感情(F)。客観的な「論理」で決めるか、主観的な「気持ち」で決めるか。'
    },
    {
        icon: <Compass className="w-6 h-6 text-prisma-500" />,
        title: 'エネルギーの方向',
        description: '外向(E)と内向(I)。外界の「刺激」で充電するか、一人の「時間」で充電するか。'
    }
];

export const AboutSocionicsPage = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'ソシオニクスとは？ | 16タイプの性格構造を解明 | Aqsh Prisma',
        description: 'なぜあの人とは話が合わないのか。ロシア発祥の緻密な性格類型学「ソシオニクス」で、16タイプの思考パターンや相性をわかりやすく解説します。',
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
                    <span className="inline-block px-4 py-1.5 rounded-full bg-prisma-50 text-prisma-700 font-medium text-sm mb-6 box-border border border-prisma-100">
                        Theory 1: 思考のクセ
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        あの人とのズレの正体
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                        その答えは性格が悪いからではなく、思考のクセが違うから。<br />
                        ロシア発祥の緻密な類型学、ソシオニクスの世界へようこそ。
                    </p>
                </div>

                {/* Introduction */}
                <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-16 md:mb-24">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                        思考のクセとは
                    </h2>
                    <div className="prose prose-lg text-slate-600 max-w-none">
                        <p className="mb-4">
                            MBTIなどで知られる16タイプ診断。これらはいずれも、精神科医カール・ユングの心理学的類型論をルーツに持っています。
                        </p>
                        <p className="mb-4">
                            中でもAqshがベースとしている<span className="bg-prisma-100 text-prisma-900 px-1 mx-1 rounded whitespace-nowrap">ソシオニクス</span>は、1970年代のソビエト連邦（現リトアニア）で独自の発達を遂げた理論です。単なる個人の性格分析にとどまらず、<span className="bg-prisma-100 text-prisma-900 px-1 mx-1 rounded">人は社会の中でどのように情報をやり取りしているか（情報代謝）</span>という点に焦点を当てているのが最大の特徴です。
                        </p>
                        <p>
                            Aqshでは、このソシオニクスが示す16パターンの脳のスペックや特徴を、親しみを込めて<span className="bg-prisma-100 text-prisma-900 px-1 mx-1 rounded whitespace-nowrap">思考のクセ</span>と呼んでいます。PCやスマホにMacとWindowsの違いがあるように、人間の脳にも根本的な仕様の違いがあるのです。
                        </p>
                    </div>
                </section>

                {/* Axes Explanation */}
                <section className="mb-16 md:mb-24">
                    <div className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                            情報代謝を分ける3つの軸
                        </h2>
                        <p className="text-slate-600">
                            あなたの脳が世界をどう解釈しているか。その法則は以下の要素の組み合わせで決まります。
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feature) => (
                            <div key={feature.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 16 Types Grid */}
                <section className="mb-16 md:mb-24">
                    <div className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                            16の思考パターン
                        </h2>
                        <p className="text-slate-600">
                            Aqshで定義している16個の思考のクセをご紹介します。<br className="hidden md:inline" />
                            世の中に優れた仕様も劣った仕様もありません。すべてが美しい多様性です。
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Object.values(OS_CONTENT).map((os) => (
                            <Link
                                href={`/types/${os.code}/`}
                                key={os.code}
                                className={cn(
                                    "bg-white rounded-3xl p-8 shadow-sm border border-slate-200 block group",
                                    "hover:border-prisma-300 hover:shadow-lg transition-all duration-300"
                                )}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="pr-2">
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-prisma-600 transition-colors">{os.name.split(' ')[0]}</h3>
                                        <p className="text-sm font-medium text-slate-500 mt-1">{os.name.substring(os.name.indexOf(' ') + 1)}</p>
                                    </div>
                                    <span
                                        className="inline-block px-2 py-1 rounded-md text-xs font-bold"
                                        style={{ backgroundColor: `${os.color}15`, color: os.color }}
                                    >
                                        {os.code}
                                    </span>
                                </div>
                                <p className="text-slate-800 font-medium mb-3 text-sm">{os.catchphrase}</p>
                                <div className="space-y-6 mt-6 pt-6 border-t border-slate-100">
                                    <div>
                                        <h4 className="font-semibold text-prisma-600 mb-2 flex items-center">
                                            <span className="w-1.5 h-1.5 rounded-full bg-prisma-500 mr-2"></span>強み
                                        </h4>
                                        {renderTextWithBullets(os.strength)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-500 mb-2 flex items-center">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-2"></span>弱み
                                        </h4>
                                        {renderTextWithBullets(os.weakness)}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Relationship Logic */}
                <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white mb-16 md:mb-24">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/3 flex justify-center">
                            <Users className="w-32 h-32 text-prisma-400 opacity-80" />
                        </div>
                        <div className="md:w-2/3">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                相性は人間関係のパズル
                            </h2>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                ソシオニクスの最も深い部分は、人間関係を単なる気分で終わらせない点にあります。自分の見えない死角を無意識のうちに完璧に補ってくれる相手など、異なる思考のクセを持つ者同士がどう影響し合うかを論理的に解明しています。
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                相手のOSの仕様を知れば、これまでノイズに聞こえていた言葉が、愛あるメッセージへと翻訳されるのです。
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="mb-12">
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

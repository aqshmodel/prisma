import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';
import { SITE_CONFIG, PUBLISHER_JSON_LD } from '@/lib/constants/site-config';

export const PrivacyPolicyPage = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: '個人情報・個人関連情報保護方針（プライバシーポリシー） | Aqsh Prisma',
        description: 'Aqsh Prismaにおける個人情報および個人関連情報（診断結果・行動履歴等）の取り扱い方針について説明します。',
        url: `${SITE_CONFIG.baseUrl}/privacy`,
        publisher: PUBLISHER_JSON_LD,
        breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'TOP',
                    item: SITE_CONFIG.baseUrl,
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'プライバシーポリシー',
                    item: `${SITE_CONFIG.baseUrl}/privacy`,
                },
            ],
        },
    };

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

            <main className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                {/* Hero Title */}
                <div className="mb-12 md:mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-prisma-50 border border-prisma-100 flex items-center justify-center">
                            <Lock className="w-6 h-6 text-prisma-600" />
                        </div>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium text-sm">
                            Privacy Policy
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                        個人情報・個人関連情報保護方針
                    </h1>
                </div>

                {/* Content Body */}
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
                    <div className="prose prose-slate md:prose-lg max-w-none prose-headings:font-bold prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-3 prose-h2:mt-12 prose-a:text-prisma-600 hover:prose-a:text-prisma-700 prose-li:marker:text-prisma-500">
                        <p>
                            Aqsh株式会社（以下「当社」といいます）は、性格診断および自己理解・組織シナジー向上を目的とした情報提供サービス「Aqsh Prisma」（以下「本サービス」といいます）の提供にあたり、利用者の皆様のプライバシーを尊重し、個人情報および個人関連情報の管理に細心の注意を払い、これを適正に取り扱います。
                        </p>

                        <h2>第1条（個人情報・個人関連情報の定義）</h2>
                        <h3>1. 個人情報</h3>
                        <p>個人情報とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報（個人識別符号を含みます）を指します。</p>

                        <h3>2. 個人関連情報</h3>
                        <p>個人関連情報とは、生存する個人に関する情報であって、単独では特定の個人を識別することができない情報を指します。これには、Cookie等の識別子、IPアドレス、端末ブラウザ情報、アクセスログ、検索履歴等の属性情報・端末情報・位置情報・行動履歴等、および<strong>本サービス内において入力された性格診断テストの回答データ並びにその診断結果</strong>が含まれます。</p>

                        <h2>第2条（個人情報の利用目的）</h2>
                        <p>当社は、取得した個人情報を以下の目的の範囲内で適切に利用します。利用目的を超えて利用することはありません。</p>
                        <ol>
                            <li>ユーザーの個人認証及びユーザー向け本サービスの提供</li>
                            <li>本サービスの利用に伴う各種お知らせ、重要な連絡事項等の配信・送付</li>
                            <li>ユーザーからのお問い合わせに対する回答およびサポート提供</li>
                            <li>本サービス利用規約等に違反する行為、および不正・不当な目的での利用の調査・対応</li>
                        </ol>

                        <h2>第3条（個人関連情報の取得と利用目的）</h2>
                        <p>当社は、本サービスにおいて会員登録を必須としない利用形態を考慮し、各種「個人関連情報」を取得し、以下の目的で利用します。なお、当社は個人関連情報を、ユーザーが別途提供した個人情報と紐付けて利用する場合があります。その場合、当該個人関連情報も個人情報として第2条の規定に従い取り扱います。</p>
                        <ol>
                            <li>
                                <strong>性格診断の実施とデータ保存について</strong>
                                <ul>
                                    <li>本サービスは会員登録不要で、すべてのユーザーが無料で利用できます。</li>
                                    <li>ユーザーが実施した性格診断テストの回答データおよび最新の診断結果は、ユーザーが本サービスをご利用になる端末のブラウザ内（ローカルストレージ等）にのみ保存されます。当社が特定の個人と紐づけて、診断履歴や結果内容を自社のデータベース等に収集・保管することはありません。</li>
                                </ul>
                            </li>
                            <li>
                                <strong>統計データの収集と利用（個人関連情報の利用）</strong>
                                <ul>
                                    <li>当社は、ユーザー個人の特定（「誰が」実施したか）を行わない匿名の情報として、「いつ」「どのような診断結果が出たか」といった統計データのみを管理画面（システムサーバー）にて取得・集計します。</li>
                                    <li>当該統計データは、本サービスの機能改善、市場調査、マーケティング施策、B2B向けHRコンテンツ制作等の「個人を特定できない形」でのみ利用され、第三者に個人の結果として開示されることは一切ありません。</li>
                                    <li>診断アルゴリズムの精度向上および本サービスの機能改善</li>
                                    <li>新規機能・サービスの開発、各種分析およびマーケティング施策への活用</li>
                                </ul>
                            </li>
                            <li>
                                <strong>アクセスログおよびCookie等の利用</strong>
                                <ul>
                                    <li>ユーザーの利便性向上および本サービスのセッション管理</li>
                                    <li>本サービスの利用状況に関する統計データの作成および分析（Google Analytics（GA4）やGoogle Search Console等の外部ツールの利用を含みます）</li>
                                    <li>ユーザーに適切なコンテンツや広告を配信するための行動ターゲティング広告サービスの利用</li>
                                </ul>
                            </li>
                        </ol>

                        <h2>第4条（個人情報の第三者提供）</h2>
                        <p>当社は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。</p>
                        <ol>
                            <li>人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難である場合</li>
                            <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難である場合</li>
                            <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがある場合</li>
                            <li>あらかじめ第三者提供を行うことを告知あるいは公表し、かつ当社が個人情報保護委員会に届出をした場合</li>
                            <li>合併その他の事由による事業の承継に伴い、利用目的の範囲内で事業承継者に提供される場合</li>
                        </ol>

                        <h2>第5条（第三者提供に関する免責事項）</h2>
                        <p>以下の場合は、第三者による個人情報の取得に関し、当社は何らの責任を負いません。</p>
                        <ol>
                            <li>ユーザー自らが本サービスの機能または別の手段を用いて、第三者に個人情報を明らかにする場合</li>
                            <li>ユーザーが本サービスに入力した任意の情報により、期せずして本人が特定できてしまった場合</li>
                            <li>本サービスからリンクされる外部サイトにおいて、ユーザーより個人情報が提供され、またそれが利用された場合</li>
                        </ol>

                        <h2>第6条（統計処理されたデータの利用）</h2>
                        <p>当社は、提供を受けた個人情報や個人関連情報をもとに、個人を特定できないように加工した統計データを作成することができます。個人を特定できない統計データについては、当社は何らの制限なく自由に利用（自社サイト内での属性公開や、他の法人への提供等を含みます）することができるものとします。</p>

                        <h2>第7条（個人情報の開示・訂正・利用停止等）</h2>
                        <p>原則としてユーザー本人に限り、「個人情報の利用目的」の通知、登録した個人情報の開示、訂正、追加または削除、利用停止、ならびに第三者への提供の停止（以下「個人情報の変更等」といいます）を求めることができるものとします。具体的な方法については下記の問い合わせ先にご連絡ください。ただし、当社が付与するユーザーID等の情報がなく、システム上本人の特定および変更対象データの特定が困難な場合、または法令により開示等の義務を負わない場合は、個人情報の変更等に応じないことがあります。</p>

                        <h2>第8条（安全管理措置）</h2>
                        <p>当社は、個人情報の安全管理のため、漏洩、滅失または毀損の防止策をはじめとする必要かつ適切な措置を講じます。また、個人情報の取扱い業務の一部または全部を外部委託する場合、委託先に対して必要かつ適切な監督を行います。</p>

                        <h2>第9条（未成年者の利用について）</h2>
                        <p>本サービスのユーザーが未成年者の場合、保護者または法定代理人（親権者等）の同意を得た上で、本サービスを利用し、個人情報等を提供していただくものとします。</p>

                        <h2>第10条（プライバシーポリシーの変更）</h2>
                        <p>当社は、法令等の定めがある場合を除き、必要に応じて本ポリシーの内容を随時変更することができるものとします。変更後のプライバシーポリシーは、本サービスまたは当社の運営するウェブサイトに掲示したときから効力を生じるものとします。本サービスをご利用の際には、最新のプライバシーポリシーをご確認ください。</p>

                        <h2>お問い合わせ窓口</h2>
                        <p>本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。</p>
                        <p className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                            <strong>Aqsh株式会社</strong><br />
                            代表取締役 塚田崇博<br />
                            Email: <a href="mailto:info@aqsh.co.jp">info@aqsh.co.jp</a>
                        </p>

                        {/* Footer Data */}
                        <div className="mt-16 pt-8 border-t border-slate-100 bg-slate-50/50 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="text-center md:text-left">
                                <span className="block text-sm font-bold text-slate-800 mb-1">附則</span>
                                <span className="text-sm text-slate-500">本方針は 2026年3月9日 より制定・施行します。</span>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

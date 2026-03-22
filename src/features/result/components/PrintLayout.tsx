import { forwardRef } from 'react';
import { type OSContent, OS_CONTENT } from '../data/content-os';
import { type EngineContent } from '../data/content-engine';
import { type BiasContent } from '../data/content-bias';
import { RadarChart } from './RadarChart';
import { type DiagnosisResult } from '@/types/diagnosis';
import { FormattedText } from '@/components/ui/FormattedText';

interface PrintLayoutProps {
    result: DiagnosisResult;
    osData: OSContent;
    engineData: EngineContent;
    /** 検出されたバイアスリスク（BiasContentにリスクレベルを付与） */
    biasRisks: Array<BiasContent & { level: string }>;
    themeColor: string;
}

/* ── 印刷用ヘルパー ── */
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl font-bold border-l-4 border-slate-900 pl-3 mb-4">{children}</h2>
);

const SubTitle = ({ children }: { children: React.ReactNode }) => (
    <h4 className="font-bold text-sm text-slate-700 mb-1">{children}</h4>
);

const Prose = ({ text }: { text: string }) => (
    <div className="text-xs text-slate-600 leading-relaxed text-justify"><FormattedText text={text} /></div>
);

const PageHeader = ({ label }: { label: string }) => (
    <>
        <div className="print-break-before" />
        <header className="text-right border-b border-slate-200 pb-2 mb-6 text-xs text-slate-400">{label}</header>
    </>
);

export const PrintLayout = forwardRef<HTMLDivElement, PrintLayoutProps>(
    ({ osData, engineData, biasRisks, themeColor }, ref) => {
        return (
            <div ref={ref} className="print-container bg-white text-slate-900 p-8 max-w-[210mm] mx-auto hidden print:block">
                <style type="text/css" media="print">
                    {`
                        @page { size: A4; margin: 10mm; }
                        body { -webkit-print-color-adjust: exact; }
                        .print-break-inside-avoid { break-inside: avoid; }
                        .print-break-before { break-before: page; }
                    `}
                </style>

                {/* ════════════════════════════════════════════
                    Page 1 : 表紙 + サマリ
                   ════════════════════════════════════════════ */}
                <header className="text-center border-b-2 border-slate-900 pb-6 mb-8">
                    <div className="flex justify-between items-end mb-4">
                        <img src="/logo.webp" alt="Aqsh" className="h-8 object-contain grayscale" />
                        <span className="text-xs text-slate-400">Prisma Diagnosis Result</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">{osData.name.split('(')[0].trim()}</h1>
                    <div className="text-2xl font-bold text-slate-500 mb-4">({osData.name.match(/\((.+)\)/)?.[1]} / {osData.code})</div>
                    <p className="text-sm border border-slate-200 inline-block px-4 py-1 rounded-full">
                        {osData.catchphrase}
                    </p>
                </header>

                {/* レーダー + 基本プロファイル */}
                <section className="mb-8 print-break-inside-avoid">
                    <div className="grid grid-cols-2 gap-8 items-start">
                        <div className="flex flex-col items-center justify-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <h3 className="font-bold text-sm mb-4 text-slate-500 uppercase tracking-wider">Parameters</h3>
                            <div className="rader-chart-print w-full max-w-[300px]">
                                <RadarChart data={osData.params} color={themeColor} />
                            </div>
                        </div>
                        <div>
                            <SectionTitle>基本プロファイル</SectionTitle>
                            <Prose text={osData.description} />
                        </div>
                    </div>
                </section>

                {/* 強み / 弱点 */}
                <section className="mb-6 print-break-inside-avoid">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 border border-emerald-100 bg-emerald-50/30 rounded-lg">
                            <h3 className="font-bold text-emerald-700 mb-2 text-sm">強み (Strengths)</h3>
                            <Prose text={osData.strength} />
                        </div>
                        <div className="p-4 border border-rose-100 bg-rose-50/30 rounded-lg">
                            <h3 className="font-bold text-rose-700 mb-2 text-sm">弱点 (Weaknesses)</h3>
                            <Prose text={osData.weakness} />
                        </div>
                    </div>
                </section>

                {/* エンジン情報 */}
                <section className="print-break-inside-avoid mb-4">
                    <SectionTitle>駆動エンジン: {engineData.name}</SectionTitle>
                    <div className="text-xs text-slate-600 leading-relaxed space-y-1">
                        <p><span className="font-bold">欲求:</span> {engineData.motivation}</p>
                        <p><span className="font-bold">概要:</span> {engineData.description}</p>
                        <p><span className="font-bold">ストレス挙動:</span> {engineData.stressBehavior}</p>
                        <p><span className="font-bold">成長アドバイス:</span> {engineData.growthAdvice}</p>
                    </div>
                </section>


                {/* ════════════════════════════════════════════
                    Page 2 : 性格分析
                   ════════════════════════════════════════════ */}
                <PageHeader label="Page 2 - 性格分析" />

                {/* あるある */}
                {osData.aruaru && osData.aruaru.length > 0 && (
                    <section className="mb-6 print-break-inside-avoid">
                        <SectionTitle>あるある</SectionTitle>
                        <ul className="text-xs text-slate-600 space-y-1">
                            {osData.aruaru.map((item, i) => (
                                <li key={i} className="flex gap-2"><span className="text-slate-400 shrink-0">✓</span>{item}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* 深層心理 */}
                {osData.psychology && (
                    <section className="mb-6 print-break-inside-avoid">
                        <SectionTitle>深層心理</SectionTitle>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-slate-50 p-3 rounded-lg">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-1">根源的欲求</h4>
                                <p className="text-xs font-medium text-slate-800">{osData.psychology.coreDesire}</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-1">盲点</h4>
                                <p className="text-xs font-medium text-slate-800">{osData.psychology.blindSpot}</p>
                            </div>
                            <div className="bg-indigo-50 p-3 rounded-lg">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-1">フロー状態</h4>
                                <p className="text-xs font-medium text-slate-800">{osData.psychology.flowState}</p>
                            </div>
                        </div>
                    </section>
                )}

                {/* 口ぐせ */}
                {osData.verbalHabits && (
                    <section className="mb-6 print-break-inside-avoid">
                        <SectionTitle>口ぐせ・思考パターン</SectionTitle>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <SubTitle>よく言うセリフ</SubTitle>
                                <ul className="text-xs text-slate-600 space-y-1">
                                    {osData.verbalHabits.phrases.map((p, i) => <li key={i}>「{p}」</li>)}
                                </ul>
                            </div>
                            <div>
                                <SubTitle>心の声</SubTitle>
                                <ul className="text-xs text-slate-600 space-y-1">
                                    {osData.verbalHabits.innerVoice.map((v, i) => <li key={i} className="italic">{v}</li>)}
                                </ul>
                            </div>
                            <div>
                                <SubTitle>地雷ワード</SubTitle>
                                <ul className="text-xs text-slate-600 space-y-1">
                                    {osData.verbalHabits.triggerWords.map((w, i) => <li key={i} className="text-red-600">「{w}」</li>)}
                                </ul>
                            </div>
                        </div>
                    </section>
                )}

                {/* バイアスリスク */}
                {biasRisks.length > 0 && (
                    <section className="print-break-inside-avoid mb-4">
                        <SectionTitle>思考のクセ (Bias Risks)</SectionTitle>
                        <div className="space-y-2">
                            {biasRisks.map((risk) => (
                                <div key={risk.name} className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-bold text-slate-700 text-xs">{risk.name}</h4>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${risk.level === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {risk.level === 'high' ? 'High' : 'Medium'}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-slate-600">{risk.warning}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}


                {/* ════════════════════════════════════════════
                    Page 3 : 仕事・適職 ①
                   ════════════════════════════════════════════ */}
                <PageHeader label="Page 3 - 仕事・適職 ①" />

                <section className="mb-6 print-break-inside-avoid">
                    <SectionTitle>働き方と適職</SectionTitle>
                    <div className="mb-4">
                        <SubTitle>ミッション</SubTitle>
                        <p className="text-sm italic text-slate-600 bg-slate-50 p-3 border-l-2 border-slate-300">
                            {osData.workStyle.mission}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <SubTitle>ワーキングスタイル</SubTitle>
                            <Prose text={osData.workStyle.style} />
                        </div>
                        <div>
                            <SubTitle>モチベーションの源泉</SubTitle>
                            <Prose text={osData.workStyle.motivation} />
                        </div>
                    </div>
                    <div className="mb-4">
                        <SubTitle>マネジメント適性</SubTitle>
                        <Prose text={osData.workStyle.management} />
                    </div>

                    {/* チーム行動 + エネルギーリズム */}
                    {(osData.workStyle.teamBehavior || osData.workStyle.workEnergyPattern) && (
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            {osData.workStyle.teamBehavior && (
                                <div>
                                    <SubTitle>会議・チームでの振る舞い</SubTitle>
                                    <Prose text={osData.workStyle.teamBehavior} />
                                </div>
                            )}
                            {osData.workStyle.workEnergyPattern && (
                                <div>
                                    <SubTitle>仕事エネルギーのリズム</SubTitle>
                                    <Prose text={osData.workStyle.workEnergyPattern} />
                                </div>
                            )}
                        </div>
                    )}

                    {/* 適職例 */}
                    <SubTitle>適職例</SubTitle>
                    <ul className="text-xs space-y-1">
                        {osData.workStyle.bestRoles.map((role) => (
                            <li key={role.title} className="flex gap-2">
                                <span className="font-bold text-slate-900 shrink-0">• {role.title}:</span>
                                <span className="text-slate-600">{role.reason}</span>
                            </li>
                        ))}
                    </ul>
                </section>


                {/* ════════════════════════════════════════════
                    Page 4 : 仕事・適職 ②
                   ════════════════════════════════════════════ */}
                <PageHeader label="Page 4 - 仕事・適職 ②" />

                {/* 副業適性 */}
                {osData.workStyle.sideProjects && osData.workStyle.sideProjects.length > 0 && (
                    <section className="mb-6 print-break-inside-avoid">
                        <SectionTitle>副業・サイドプロジェクト適性</SectionTitle>
                        <ul className="text-xs space-y-1">
                            {osData.workStyle.sideProjects.map((p) => (
                                <li key={p.title} className="flex gap-2">
                                    <span className="font-bold text-slate-900 shrink-0">• {p.title}:</span>
                                    <span className="text-slate-600">{p.reason}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* NG環境 + モチベーションキラー */}
                {(osData.workStyle.ngEnvironments || engineData.motivationKillers) && (
                    <section className="mb-6 print-break-inside-avoid">
                        <SectionTitle>避けるべき環境・モチベーションキラー</SectionTitle>
                        <div className="grid grid-cols-2 gap-4">
                            {osData.workStyle.ngEnvironments && (
                                <div>
                                    <SubTitle>合わない環境</SubTitle>
                                    <ul className="text-xs text-slate-600 space-y-1">
                                        {osData.workStyle.ngEnvironments.map((env, i) => (
                                            <li key={i} className="flex gap-1"><span className="text-red-400 shrink-0">✕</span>{env}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {engineData.motivationKillers && (
                                <div>
                                    <SubTitle>やる気を殺す3大要素</SubTitle>
                                    <ul className="text-xs text-slate-600 space-y-1">
                                        {engineData.motivationKillers.map((k, i) => (
                                            <li key={i} className="flex gap-1"><span className="text-amber-400 shrink-0">⚠</span>{k}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* 理想の上司 / 部下 */}
                {(osData.workStyle.idealBoss || osData.workStyle.idealSubordinate) && (
                    <section className="mb-6 print-break-inside-avoid">
                        <SectionTitle>上司・部下の相性</SectionTitle>
                        <div className="grid grid-cols-2 gap-4">
                            {osData.workStyle.idealBoss && (
                                <div>
                                    <SubTitle>こういう上司の下で力を発揮する</SubTitle>
                                    <Prose text={osData.workStyle.idealBoss} />
                                </div>
                            )}
                            {osData.workStyle.idealSubordinate && (
                                <div>
                                    <SubTitle>こういう部下と相性がいい</SubTitle>
                                    <Prose text={osData.workStyle.idealSubordinate} />
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* キャリア危険信号 */}
                {engineData.careerRisk && (
                    <section className="mb-6 print-break-inside-avoid">
                        <SectionTitle>キャリアの危険信号</SectionTitle>
                        <div className="space-y-2">
                            <div><SubTitle>陥りがちなパターン</SubTitle><Prose text={engineData.careerRisk.trapPattern} /></div>
                            <div><SubTitle>転職の引き金</SubTitle><Prose text={engineData.careerRisk.quitTrigger} /></div>
                            <div><SubTitle>予防策</SubTitle><Prose text={engineData.careerRisk.prevention} /></div>
                        </div>
                    </section>
                )}

                {/* お金と交渉 */}
                {engineData.moneyStyle && (
                    <section className="mb-6 print-break-inside-avoid">
                        <SectionTitle>お金と交渉の傾向</SectionTitle>
                        <div className="space-y-2">
                            <div><SubTitle>損しやすいパターン</SubTitle><Prose text={engineData.moneyStyle.lossPattern} /></div>
                            <div><SubTitle>交渉のクセ</SubTitle><Prose text={engineData.moneyStyle.negotiationHabit} /></div>
                            <div><SubTitle>収入アップの戦略</SubTitle><Prose text={engineData.moneyStyle.earningStrategy} /></div>
                        </div>
                    </section>
                )}


                {/* ════════════════════════════════════════════
                    Page 5 : 人間関係
                   ════════════════════════════════════════════ */}
                <PageHeader label="Page 5 - 人間関係" />

                <section className="mb-6 print-break-inside-avoid">
                    <SectionTitle>人間関係とコミュニケーション</SectionTitle>

                    {/* 効果的 / 避けるべき */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-3 bg-cyan-50/50 rounded-lg border border-cyan-100">
                            <SubTitle>効果的な接し方</SubTitle>
                            <ul className="text-xs text-slate-600 space-y-1">
                                {osData.doCommunication.map((item, i) => (
                                    <li key={i} className="flex gap-1"><span className="text-cyan-500 shrink-0">•</span>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-3 bg-rose-50/50 rounded-lg border border-rose-100">
                            <SubTitle>避けるべき接し方</SubTitle>
                            <ul className="text-xs text-slate-600 space-y-1">
                                {osData.dontCommunication.map((item, i) => (
                                    <li key={i} className="flex gap-1"><span className="text-rose-400 shrink-0">•</span>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* 友人・家族の傾向 */}
                    {(osData.relationships.friendshipStyle || osData.relationships.familyRole) && (
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            {osData.relationships.friendshipStyle && (
                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                    <SubTitle>友人関係の傾向</SubTitle>
                                    <Prose text={osData.relationships.friendshipStyle} />
                                </div>
                            )}
                            {osData.relationships.familyRole && (
                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                    <SubTitle>家族内での役割</SubTitle>
                                    <Prose text={osData.relationships.familyRole} />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Best / Worst Match */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="border p-3 rounded text-center">
                            <span className="block text-xs text-slate-400 mb-1">Best Match</span>
                            <span className="block text-lg font-bold text-indigo-600">{OS_CONTENT[osData.bestMatch]?.name || osData.bestMatch}</span>
                        </div>
                        <div className="border p-3 rounded text-center">
                            <span className="block text-xs text-slate-400 mb-1">Worst Match</span>
                            <span className="block text-lg font-bold text-orange-600">{OS_CONTENT[osData.worstMatch]?.name || osData.worstMatch}</span>
                        </div>
                    </div>

                    {/* アドバイス */}
                    <div className="text-xs text-slate-600 leading-relaxed border p-4 rounded bg-slate-50">
                        <span className="font-bold block mb-1">コミュニケーションのアドバイス:</span>
                        {osData.relationships.advice}
                    </div>
                </section>


                {/* ════════════════════════════════════════════
                    Page 6 : 成長ロードマップ
                   ════════════════════════════════════════════ */}
                {osData.growth && (
                    <>
                        <PageHeader label="Page 6 - 成長ロードマップ" />

                        {/* 成長アドバイス */}
                        <section className="mb-6 print-break-inside-avoid">
                            <SectionTitle>成長へのアドバイス</SectionTitle>
                            <Prose text={engineData.growthAdvice} />
                        </section>

                        {/* Level 1 / 2 / 3 */}
                        <section className="mb-4">
                            <SectionTitle>成長ロードマップ</SectionTitle>
                            <div className="space-y-4">
                                {([
                                    { data: osData.growth.level1, level: 1, label: 'Lv.1 基礎' },
                                    { data: osData.growth.level2, level: 2, label: 'Lv.2 応用' },
                                    { data: osData.growth.level3, level: 3, label: 'Lv.3 実践' },
                                ] as const).map(({ data, level, label }) => {
                                    const actions = osData.growth?.actionItems?.filter(a => a.level === level) || [];
                                    return (
                                        <div key={level} className="print-break-inside-avoid border border-slate-200 rounded-lg p-4">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
                                            <h4 className="text-sm font-bold text-slate-800 mb-1">{data.title}</h4>
                                            <p className="text-xs text-slate-600 leading-relaxed mb-2">{data.content}</p>
                                            {actions.length > 0 && (
                                                <div className="grid grid-cols-2 gap-2">
                                                    {actions.map((a) => (
                                                        <div key={a.title} className="bg-slate-50 p-2 rounded border border-slate-100">
                                                            <p className="text-xs font-bold text-slate-700">{a.title}</p>
                                                            <p className="text-[10px] text-slate-500">{a.description}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </>
                )}


                {/* ════════════════════════════════════════════
                    Footer
                   ════════════════════════════════════════════ */}
                <footer className="mt-12 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
                    © 2026 Aqsh Inc. All rights reserved. | 16性格診断 Prisma
                </footer>
            </div>
        );
    }
);

PrintLayout.displayName = 'PrintLayout';

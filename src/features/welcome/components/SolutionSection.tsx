import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { Cpu, Zap, ShieldCheck, Layers } from 'lucide-react';

export const SolutionSection: React.FC = () => {
    return (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-50 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-left md:text-center max-w-3xl mx-auto mb-12 md:mb-20 space-y-6 animate-fade-in-up">
                    <span className="inline-block text-xs font-serif tracking-[0.2em] text-slate-400 uppercase mb-2">
                        Scientific Approach
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-slate-900 leading-[1.4] md:leading-[1.3] tracking-tight text-balance">
                        <span className="inline-block">見えない「摩擦」を、</span><br className="hidden md:block" />
                        <span className="inline-block"><span className="text-prisma-600 inline-block">見える「データ」</span>に変える。</span>
                    </h2>
                    <p className="text-slate-600 text-base md:text-lg leading-[1.8] md:leading-loose tracking-wide font-medium">
                        <span className="inline-block">Aqsh Prismaは、個人の特性を3つのレイヤーで分析。</span><br className="hidden md:block" />
                        <span className="inline-block">感覚や経験則に頼らない、科学的な組織マネジメントを実現します。</span>
                    </p>
                </div>

                <BentoGrid className="max-w-6xl mx-auto">
                    {items.map((item, i) => (
                        <BentoGridItem
                            key={i}
                            title={item.title}
                            description={item.description}
                            header={item.header}
                            icon={item.icon}
                            className={i === 0 || i === 3 ? "md:col-span-2" : ""}
                        />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
};

const Skeleton = ({ className, children }: { className?: string, children?: React.ReactNode }) => (
    <div className={`flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-slate-50 border border-slate-100 overflow-hidden ${className}`}>
        {children}
    </div>
);

const items = [
    {
        title: "基本タイプ (Type)",
        description: "情報の入力・処理・出力の癖を16タイプに分類。「あの人はなぜそう考えるのか？」のメカニズムを解明します。",
        header: (
            <Skeleton className="flex items-center justify-center bg-slate-50/50">
                <div className="grid grid-cols-4 gap-3 opacity-60 transform scale-90">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className={`w-6 h-6 rounded-md ${i === 5 ? 'bg-prisma-400 shadow-md shadow-prisma-200' : 'bg-slate-200'}`} />
                    ))}
                </div>
            </Skeleton>
        ),
        icon: <Cpu className="h-6 w-6 text-slate-400 group-hover/bento:text-prisma-600 transition-colors" />,
    },
    {
        title: "駆動エンジン (Motivation)",
        description: "深層心理にある根源的な欲求を特定。何がその人の情熱に火をつけるのか、モチベーションの源泉を探ります。",
        header: (
            <Skeleton className="flex items-center justify-center bg-amber-50/30 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-amber-200/50 animate-spin-slow" />
                    <div className="w-24 h-24 rounded-full border border-amber-300/50 absolute animate-spin-reverse-slow" />
                </div>
                <Zap className="w-10 h-10 text-amber-400/80 relative z-10" />
            </Skeleton>
        ),
        icon: <Zap className="h-6 w-6 text-slate-400 group-hover/bento:text-amber-500 transition-colors" />,
    },
    {
        title: "バイアスリスク (Risk)",
        description: "意思決定を歪める「認知バイアス」の傾向を予測。リーダーシップにおける落とし穴を事前に回避します。",
        header: (
            <Skeleton className="flex items-center justify-center bg-rose-50/30">
                <ShieldCheck className="w-16 h-16 text-rose-300/80" />
            </Skeleton>
        ),
        icon: <ShieldCheck className="h-6 w-6 text-slate-400 group-hover/bento:text-rose-400 transition-colors" />,
    },
    {
        title: "組織マトリクス (Matrix)",
        description: "チームメンバー全員のタイプをマッピング。相関関係を可視化し、最適な配置とコミュニケーション戦略を立案します。",
        header: (
            <Skeleton className="flex items-center justify-center bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 gap-px opacity-[0.03]">
                    {[...Array(32)].map((_, i) => <div key={i} className="bg-slate-900" />)}
                </div>
                <div className="relative z-10 flex -space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-prisma-400 to-prisma-500 border-4 border-white shadow-lg z-30" />
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 border-4 border-white shadow-lg z-20" />
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-500 border-4 border-white shadow-lg z-10" />
                </div>
            </Skeleton>
        ),
        icon: <Layers className="h-6 w-6 text-slate-400 group-hover/bento:text-prisma-600 transition-colors" />,
    },
];

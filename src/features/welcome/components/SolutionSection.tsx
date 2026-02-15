import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { Section } from '@/components/ui/Section';
import { Cpu, Zap, ShieldCheck, Layers, Sparkles } from 'lucide-react';

export const SolutionSection: React.FC = () => {
    return (
        <Section background="white">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prisma-50 text-prisma-700 text-xs font-bold uppercase tracking-wider border border-prisma-100">
                    <Sparkles className="w-3 h-3" />
                    Solution
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                    見えない「摩擦」を、<br />
                    見える「データ」に変える。
                </h2>
                <p className="text-slate-600 text-lg">
                    Aqsh Prismaは、個人の特性を3つのレイヤーで分析。<br />
                    感覚や経験則に頼らない、科学的な組織マネジメントを実現します。
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
        </Section>
    );
};

const Skeleton = ({ className, children }: { className?: string, children?: React.ReactNode }) => (
    <div className={`flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 border border-neutral-100 dark:border-white/[0.2] ${className}`}>
        {children}
    </div>
);

const items = [
    {
        title: "基本タイプ",
        description: "情報の入力・処理・出力の癖を16タイプに分類。「あの人はなぜそう考えるのか？」のメカニズムを解明します。",
        header: (
            <Skeleton className="flex items-center justify-center bg-blue-50/50">
                <div className="grid grid-cols-4 gap-2 opacity-50">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className={`w-8 h-8 rounded-md ${i === 5 ? 'bg-prisma-500 scale-110 shadow-lg' : 'bg-slate-200'}`} />
                    ))}
                </div>
            </Skeleton>
        ),
        icon: <Cpu className="h-6 w-6 text-prisma-500" />,
    },
    {
        title: "駆動エンジン",
        description: "深層心理にある根源的な欲求を特定。何がその人の情熱に火をつけるのか、モチベーションの源泉を探ります。",
        header: (
            <Skeleton className="flex items-center justify-center bg-amber-50/50 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin" />
                </div>
                <Zap className="w-10 h-10 text-amber-500 relative z-10" />
            </Skeleton>
        ),
        icon: <Zap className="h-6 w-6 text-amber-500" />,
    },
    {
        title: "バイアスリスク",
        description: "意思決定を歪める「認知バイアス」の傾向を予測。リーダーシップにおける落とし穴を事前に回避します。",
        header: (
            <Skeleton className="flex items-center justify-center bg-rose-50/50">
                <ShieldCheck className="w-16 h-16 text-rose-400 opacity-80" />
            </Skeleton>
        ),
        icon: <ShieldCheck className="h-6 w-6 text-rose-500" />,
    },
    {
        title: "組織マトリクス",
        description: "チームメンバー全員のタイプをマッピング。相関関係を可視化し、最適な配置とコミュニケーション戦略を立案します。",
        header: (
            <Skeleton className="flex items-center justify-center bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-px opacity-10">
                    {[...Array(36)].map((_, i) => <div key={i} className="bg-slate-400" />)}
                </div>
                <div className="relative z-10 flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-prisma-500 border-4 border-white shadow-lg" />
                    <div className="w-12 h-12 rounded-full bg-teal-500 border-4 border-white shadow-lg -ml-6" />
                    <div className="w-12 h-12 rounded-full bg-cyan-600 border-4 border-white shadow-lg -ml-6" />
                </div>
            </Skeleton>
        ),
        icon: <Layers className="h-6 w-6 text-slate-700" />,
    },
];

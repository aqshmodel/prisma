import React from 'react';
import { Section } from '@/components/ui/Section';
import { Target, Users, TrendingUp, CheckCircle2 } from 'lucide-react';

export const BenefitSection: React.FC = () => {
    return (
        <Section background="prisma">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-prisma-700 text-xs font-bold uppercase tracking-wider border border-prisma-100 shadow-sm">
                    <TrendingUp className="w-3 h-3" />
                    Benefit
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                    個人の成長が、<br />
                    組織の進化に直結する。
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <BenefitCard
                    icon={<Target className="w-10 h-10 text-white" />}
                    title="自己認識の深化"
                    description="自分が何者で、どこへ向かうべきかが明確になります。強みを活かし、弱点を補うための具体的な指針が得られます。"
                    delay={0}
                />
                <BenefitCard
                    icon={<Users className="w-10 h-10 text-white" />}
                    title="相互理解の促進"
                    description="「なぜあの人はそう動くのか」が腑に落ちます。感情的な対立が減り、建設的な対話が生まれる土壌を作ります。"
                    delay={100}
                />
                <BenefitCard
                    icon={<TrendingUp className="w-10 h-10 text-white" />}
                    title="組織パフォーマンスの最大化"
                    description="適材適所の配置と、個性に合わせたマネジメントにより、チーム全体の生産性が劇的に向上します。"
                    delay={200}
                />
            </div>
        </Section>
    );
};

const BenefitCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => (
    <div
        className="relative group h-full"
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-prisma-400 to-teal-600 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform opacity-20 blur-sm" />
        <div className="relative bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col items-start text-left">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-prisma-500 to-teal-500 flex items-center justify-center shadow-lg shadow-prisma-200 mb-6 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                {title}
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
                {description}
            </p>
            <div className="mt-auto pt-6 flex items-center text-prisma-600 text-sm font-bold">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                効果を実感
            </div>
        </div>
    </div>
);

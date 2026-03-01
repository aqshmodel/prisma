import React from 'react';
import { Target, Users, TrendingUp } from 'lucide-react';

export const BenefitSection: React.FC = () => {
    return (
        <section className="relative py-32 lg:py-40 overflow-hidden">
            {/* Diffused Background */}
            <div className="absolute inset-0 bg-slate-50/50 -z-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-gradient-to-r from-prisma-100/30 via-white/0 to-prisma-100/30 blur-[120px] -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="text-left md:text-center max-w-3xl mx-auto mb-12 md:mb-20 space-y-6 animate-fade-in-up">
                    <span className="inline-block text-xs font-serif tracking-[0.2em] text-prisma-600 uppercase mb-2">
                        Why Prisma?
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-slate-900 leading-[1.4] md:leading-[1.2] tracking-tight text-balance">
                        <span className="inline-block">自己理解の深さが、</span><br className="hidden md:block" />
                        <span className="inline-block"><span className="text-prisma-600">人生の質</span>に直結する。</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    <BenefitCard
                        icon={<Target className="w-8 h-8" />}
                        title="Deep Insight"
                        subtitle="自分だけの取扱説明書"
                        description="自分が何者で、どこへ向かうべきかが明確に。得意なことだけでなく、絶対に避けるべき「致死量のタスク」まで可視化します。"
                        delay={0}
                    />
                    <BenefitCard
                        icon={<Users className="w-8 h-8" />}
                        title="Empathy"
                        subtitle="人間関係のノイズ削減"
                        description="「なぜあの人はあんな態度をとるのか」が腑に落ちます。不毛な感情対立が減り、ストレスのない関係構築の土台が作れます。"
                        delay={100}
                    />
                    <BenefitCard
                        icon={<TrendingUp className="w-8 h-8" />}
                        title="Life Hack"
                        subtitle="才能の最大化"
                        description="無理に自分を変えるのではなく、持って生まれた「脳のOS」を活かしきることで、仕事も恋愛も本来の力を発揮できるようになります。"
                        delay={200}
                    />
                </div>
            </div>
        </section>
    );
};

const BenefitCard = ({ icon, title, subtitle, description, delay }: { icon: React.ReactNode, title: string, subtitle: string, description: string, delay: number }) => (
    <div
        className="group relative h-full glass-panel rounded-apple p-10 flex flex-col items-start transition-all duration-500 ease-apple hover:scale-[1.02] hover:shadow-lg hover:shadow-prisma-100/50"
        style={{ animationDelay: `${delay} ms` }}
    >
        <div className="mb-8 p-4 bg-prisma-100/80 rounded-2xl text-prisma-600 group-hover:bg-prisma-500 group-hover:text-white transition-colors duration-500 ease-apple shadow-sm group-hover:shadow-md ring-1 ring-prisma-200/50 group-hover:ring-prisma-500">
            {icon}
        </div>

        <div className="mb-4">
            <span className="block text-xs font-bold tracking-widest text-prisma-400 uppercase mb-2">{title}</span>
            <h3 className="text-2xl font-serif font-medium text-slate-800 group-hover:text-prisma-700 transition-colors">
                {subtitle}
            </h3>
        </div>

        <p className="text-slate-500 leading-relaxed font-medium text-sm text-balance-apple">
            {description}
        </p>
    </div>
);

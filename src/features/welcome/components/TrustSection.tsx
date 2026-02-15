import React from 'react';
import { Section } from '@/components/ui/Section';
import { BookOpen, Users, Scale } from 'lucide-react';

export const TrustSection: React.FC = () => {
    return (
        <Section background="dark" className="text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-prisma-500 blur-3xl opacity-30" />
                <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-teal-500 blur-3xl opacity-20" />
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16 relative z-10">
                <div className="bg-prisma-900/50 p-8 rounded-2xl border border-prisma-800 backdrop-blur-sm">
                    <BookOpen className="w-8 h-8 text-prisma-400 mb-4" />
                    <h3 className="text-xl font-bold mb-3 text-white">Jungian Typology</h3>
                    <p className="text-prisma-100 leading-relaxed">
                        C.G.ユングの「タイプ論」をベースに、人間の認知プロセスを体系化。
                        <span className="text-prisma-300 font-bold">生まれ持った「脳の利き手」</span>を特定します。
                    </p>
                </div>
                <div className="bg-prisma-900/50 p-8 rounded-2xl border border-prisma-800 backdrop-blur-sm">
                    <Users className="w-8 h-8 text-prisma-400 mb-4" />
                    <h3 className="text-xl font-bold mb-3 text-white">Socionics</h3>
                    <p className="text-prisma-100 leading-relaxed">
                        タイプ間の「情報代謝」をモデル化したソシオニクス理論を採用。
                        <span className="text-prisma-300 font-bold">相性のメカニズム</span>を論理的に解明します。
                    </p>
                </div>
                <div className="bg-prisma-900/50 p-8 rounded-2xl border border-prisma-800 backdrop-blur-sm">
                    <Scale className="w-8 h-8 text-prisma-400 mb-4" />
                    <h3 className="text-xl font-bold mb-3 text-white">Business Psychology</h3>
                    <p className="text-prisma-100 leading-relaxed">
                        現代の組織論と行動経済学を統合。
                        理論を実務で使える<span className="text-prisma-300 font-bold">マネジメント指標</span>へと昇華させました。
                    </p>
                </div>
            </div>

            <div className="relative max-w-4xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-prisma-500 to-teal-500 rounded-2xl transform rotate-1 opacity-20" />
                <div className="relative bg-prisma-900/80 backdrop-blur-sm border border-prisma-800 p-8 rounded-2xl">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
                        <span className="w-8 h-8 rounded-full bg-prisma-500 flex items-center justify-center text-sm">1</span>
                        Why it works
                    </h3>
                    <p className="text-prisma-100 leading-relaxed mb-8">
                        多くの適性検査が「行動」や「発言」という<span className="text-white font-bold">表面的な現象</span>を測定するのに対し、
                        Aqsh Prismaはその源泉となる<span className="text-white font-bold">「思考回路」</span>を特定します。
                        そのため、環境が変わってもブレない本質的な特性を理解することができます。
                    </p>
                    <div className="h-px w-full bg-prisma-800 mb-6" />
                    <div className="flex items-center justify-between text-sm text-prisma-400">
                        <span>Based on Jungian Typology</span>
                        <span>Socionics Theory</span>
                    </div>
                </div>
            </div>
        </Section>
    );
};



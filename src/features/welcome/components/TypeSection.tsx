import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { FormattedText } from '@/components/ui/FormattedText';
import { OS_CONTENT } from '@/features/result/data/content-os';

export const TypeSection: React.FC = () => {
    // 16タイプを配列に変換
    const types = Object.values(OS_CONTENT);

    return (
        <Section background="prisma">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-prisma-800 text-xs font-bold uppercase tracking-wider border border-white/40 backdrop-blur-sm">
                    <Sparkles className="w-3 h-3" />
                    16 Types
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                    多様な個性が、<br />
                    組織の力になる。
                </h2>
                <p className="text-slate-700 text-lg">
                    Aqsh Prismaは、人間の認知特性を16の「基本タイプ」に分類。<br />
                    それぞれの強みと役割を理解することが、最強のチーム作りへの第一歩です。
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                {types.map((type) => (
                    <Link key={type.code} href={`/types/${type.code}`} className="block group h-full">
                        <Card className="h-full hover:shadow-2xl hover:shadow-prisma-200/50 transition-all duration-300 border border-white/50 hover:border-prisma-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                            <div className="flex flex-col h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 group-hover:bg-prisma-500 group-hover:text-white transition-colors">
                                        {type.code}
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-prisma-100 transition-colors">
                                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-prisma-600 transition-colors" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-prisma-700 transition-colors">
                                    {type.name}
                                </h3>

                                <p className="text-sm text-slate-500 font-medium mb-4 line-clamp-2 min-h-[2.5em]">
                                    {type.catchphrase}
                                </p>

                                <div className="mt-auto pt-4 border-t border-slate-100">
                                    <div className="text-xs text-slate-400 line-clamp-3 leading-relaxed group-hover:text-slate-600 transition-colors">
                                        <FormattedText text={type.description} />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </Section>
    );
};

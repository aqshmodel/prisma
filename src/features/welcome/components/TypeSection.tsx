import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FormattedText } from '@/components/ui/FormattedText';
import { OS_CONTENT } from '@/features/result/data/content-os';

export const TypeSection: React.FC = () => {
    // 16タイプを配列に変換
    const types = Object.values(OS_CONTENT);

    return (
        <section className="py-24 md:py-32 bg-slate-50 border-t border-slate-200/60 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-left md:text-center max-w-3xl mx-auto mb-12 md:mb-20 space-y-6 animate-fade-in-up">
                    <span className="inline-block text-xs font-serif tracking-[0.2em] text-slate-400 uppercase mb-2">
                        Discover Your Type
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-slate-900 leading-[1.4] md:leading-[1.3] tracking-tight text-balance">
                        <span className="inline-block">多様な個性が、</span><br className="hidden md:block" />
                        <span className="inline-block"><span className="text-prisma-600">組織の力</span>になる。</span>
                    </h2>
                    <p className="text-slate-600 text-base md:text-lg leading-[1.8] md:leading-loose tracking-wide font-medium">
                        <span className="inline-block">Aqsh Prismaは、人間の認知特性を16の「基本タイプ」に分類。</span><br className="hidden md:block" />
                        <span className="inline-block">それぞれの強みと役割を理解することが、最強のチーム作りへの第一歩です。</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {types.map((type, idx) => (
                        <Link key={type.code} href={`/types/${type.code}`} className="block group h-full">
                            <div className="h-full glass-panel rounded-apple p-6 flex flex-col transition-all duration-500 ease-apple hover:scale-[1.02] hover:shadow-lg hover:shadow-prisma-200/50 hover:bg-white/80" style={{ animationDelay: `${idx * 50}ms` }}>
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-500 tracking-widest group-hover:bg-prisma-500 group-hover:text-white transition-colors duration-300">
                                        {type.code}
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-prisma-50 group-hover:text-prisma-600 transition-colors duration-300">
                                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-prisma-600 transition-colors" />
                                    </div>
                                </div>

                                <h3 className="text-lg font-serif font-bold text-slate-800 mb-3 group-hover:text-prisma-700 transition-colors duration-300">
                                    {type.name}
                                </h3>

                                <p className="text-xs text-slate-500 font-medium mb-4 line-clamp-2 min-h-[2.5em] tracking-wide">
                                    {type.catchphrase}
                                </p>

                                <div className="mt-auto pt-4 border-t border-slate-100/50">
                                    <div className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed group-hover:text-slate-600 transition-colors duration-300">
                                        <FormattedText text={type.description} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

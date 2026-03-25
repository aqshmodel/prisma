import Link from 'next/link';
import { ArrowRight, Brain, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale, useLocalePath } from '@/lib/i18n';
import { getWelcomeText } from '../welcome-dictionary';

export const TheoryLinksSection: React.FC = () => {
    const locale = useLocale();
    const localePath = useLocalePath();
    const t = getWelcomeText(locale).theoryLinks;

    return (
        <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200" id="theories">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                        {t.heading}
                    </h2>
                    <p className="text-slate-600 leading-relaxed md:text-lg">
                        {t.desc[0]}<br className="hidden md:inline" />{t.desc[1]}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                    {/* Socionics Card */}
                    <Link
                        href={localePath('/about/socionics')}
                        className={cn(
                            "group relative bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200",
                            "overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        )}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-prisma-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />

                        <div className="relative">
                            <div className="w-14 h-14 rounded-2xl bg-prisma-50 text-prisma-600 flex items-center justify-center mb-6 shadow-inner ring-1 ring-prisma-100">
                                <Brain className="w-7 h-7" />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-prisma-600 transition-colors">
                                {t.socionics.title}
                            </h3>

                            <p className="text-slate-600 leading-relaxed mb-8">
                                {t.socionics.desc}
                            </p>

                            <div className="flex items-center text-prisma-600 font-semibold mt-auto">
                                <span className="group-hover:mr-2 transition-all">{t.socionics.link}</span>
                                <ArrowRight className="w-5 h-5 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </div>
                        </div>
                    </Link>

                    {/* Enneagram Card */}
                    <Link
                        href={localePath('/about/enneagram')}
                        className={cn(
                            "group relative bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200",
                            "overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        )}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-prisma-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />

                        <div className="relative">
                            <div className="w-14 h-14 rounded-2xl bg-prisma-50 text-prisma-600 flex items-center justify-center mb-6 shadow-inner ring-1 ring-prisma-100">
                                <Flame className="w-7 h-7" />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-prisma-600 transition-colors">
                                {t.enneagram.title}
                            </h3>

                            <p className="text-slate-600 leading-relaxed mb-8">
                                {t.enneagram.desc}
                            </p>

                            <div className="flex items-center text-prisma-600 font-semibold mt-auto">
                                <span className="group-hover:mr-2 transition-all">{t.enneagram.link}</span>
                                <ArrowRight className="w-5 h-5 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Brain, Gauge, Cpu, Shield, AlertTriangle, BookOpen, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_CONFIG, PUBLISHER_JSON_LD } from '@/lib/constants/site-config';

const Section = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <section className={cn("bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-12 md:mb-16", className)}>
        {children}
    </section>
);

const StepCard = ({ number, title, description, icon }: { number: string; title: string; description: string; icon: React.ReactNode }) => (
    <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-prisma-50 border border-prisma-100 flex items-center justify-center">
            {icon}
        </div>
        <div>
            <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-prisma-500 bg-prisma-50 px-2 py-0.5 rounded-full">{number}</span>
                <h4 className="font-bold text-slate-900">{title}</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
        </div>
    </div>
);

const AxisCard = ({ axis, labelA, labelB, questions, description }: { axis: string; labelA: string; labelB: string; questions: string; description: string }) => (
    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-lg bg-prisma-500 text-white text-sm font-bold">{axis}</span>
            <span className="text-sm text-slate-500">{labelA} ↔ {labelB}</span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-2">{description}</p>
        <p className="text-xs text-slate-400">Target Questions: {questions}</p>
    </div>
);

export const AboutMethodologyEnPage = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Diagnostic Logic | How Aqsh Prisma Works',
        description: 'Transparently explaining the logic behind Aqsh Prisma\'s 16-type × Enneagram diagnosis. From the 72-question design to the scoring algorithms.',
        image: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.ogImage}`,
        author: {
            '@type': 'Organization',
            name: SITE_CONFIG.name
        },
        publisher: PUBLISHER_JSON_LD
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link href="/en" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Home
                    </Link>
                </div>
            </div>

            <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

                <div className="mb-16 md:mb-24">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-prisma-50 text-prisma-700 font-medium text-sm mb-6 border border-prisma-100">
                        Methodology
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        Diagnostic Logic Explained
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                        What theoretical foundations and algorithms drive <br className="hidden md:inline" />
                        Aqsh Prisma's diagnostic results? <br className="hidden md:inline" />
                        Here we transparently explain the complete architecture.
                    </p>
                </div>

                <Section>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                        Overview of the Diagnosis
                    </h2>
                    <div className="prose prose-lg text-slate-600 max-w-none mb-8">
                        <p>
                            By answering a total of <span className="bg-prisma-100 text-prisma-900 px-1.5 mx-0.5 rounded font-bold">72</span> binary questions, Aqsh Prisma performs four parallel analyses. All calculations execute in real-time on your client (browser), meaning your answer data is never sent to our servers.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <StepCard
                            number="Part 1"
                            title="OS (Cognitive Core) Analysis"
                            description="Calculates 4 Socionics dichotomies (E/I, N/S, T/F, J/P) from 20 questions to determine 1 of 16 base types."
                            icon={<Brain className="w-5 h-5 text-prisma-500" />}
                        />
                        <StepCard
                            number="Part 2"
                            title="Subtype Detection"
                            description="Determines behavioral differences in approaching external environments (Contact vs. Inert) based on 24 questions."
                            icon={<Gauge className="w-5 h-5 text-prisma-500" />}
                        />
                        <StepCard
                            number="Part 3"
                            title="Engine (Enneagram) Analysis"
                            description="Identifies your primary and secondary internal motivations among 9 desires based on 18 questions."
                            icon={<Cpu className="w-5 h-5 text-prisma-500" />}
                        />
                        <StepCard
                            number="Part 4"
                            title="Cognitive Bias Check"
                            description="Detects confirmation bias, sunk cost fallacy, and other logical blindspots using 5 specific question pairs."
                            icon={<AlertTriangle className="w-5 h-5 text-prisma-500" />}
                        />
                    </div>
                </Section>

                <Section>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                        Part 1: OS (Cognitive Core) Logic
                    </h2>
                    <p className="text-slate-500 mb-8">Questions Q1–Q20 / 20 items</p>

                    <div className="prose text-slate-600 max-w-none mb-8">
                        <p>
                            The 16 Socionics types are identified via 4 dichotomies. We score your answers against specific threshold limits indicating your dominant traits.
                        </p>
                        <p>
                            If your scores lie on the border, <span className="bg-prisma-100 text-prisma-900 px-1 mx-0.5 rounded">tie-breaker questions</span> assigned to each trait are used for final determination, ensuring a consistent and reliable outcome.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AxisCard
                            axis="E / I"
                            labelA="Extraversion"
                            labelB="Introversion"
                            questions="Q1, Q8, Q12, Q27, Q32"
                            description="Direction of energy. Preferring dynamic interaction with the external world versus deep reflection in the internal world."
                        />
                        <AxisCard
                            axis="N / S"
                            labelA="Intuition"
                            labelB="Sensing"
                            questions="Q4, Q6, Q9, Q13, Q17, Q19"
                            description="How you perceive information. Grasping abstract possibilities versus seeing concrete facts."
                        />
                        <AxisCard
                            axis="T / F"
                            labelA="Thinking"
                            labelB="Feeling"
                            questions="Q3, Q7, Q10, Q14, Q18, Q39"
                            description="How you make decisions. Relying on objective logic versus prioritizing subjective values and ethics."
                        />
                        <AxisCard
                            axis="j / p"
                            labelA="Judging"
                            labelB="Perceiving"
                            questions="Q2, Q5, Q11, Q15, Q16, Q20"
                            description="Your attitude toward the external world. Preferring structured routines versus remaining adaptable."
                        />
                    </div>
                </Section>

                <Section>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                        Part 2: Subtype Detection
                    </h2>
                    <p className="text-slate-500 mb-8">Questions Q21–Q44 / 24 items</p>

                    <div className="prose text-slate-600 max-w-none mb-8">
                        <p>
                            People sharing the same 16 type often differ in how intensely they interact with their environments. In Socionics, this is known as a <span className="bg-prisma-100 text-prisma-900 px-1 mx-0.5 rounded">subtype</span>.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-prisma-50 border border-blue-100">
                            <h3 className="font-bold text-slate-900 mb-3 text-lg">🔄 Contact</h3>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li className="flex items-start"><span className="mr-2 text-blue-400">•</span>Actively seeking connections with the environment.</li>
                                <li className="flex items-start"><span className="mr-2 text-blue-400">•</span>Highly adaptable to changes.</li>
                                <li className="flex items-start"><span className="mr-2 text-blue-400">•</span>Converting external stimuli into power.</li>
                            </ul>
                        </div>
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                            <h3 className="font-bold text-slate-900 mb-3 text-lg">🛡️ Inert</h3>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li className="flex items-start"><span className="mr-2 text-amber-400">•</span>Protecting personal pace and territory.</li>
                                <li className="flex items-start"><span className="mr-2 text-amber-400">•</span>Blocking out environmental noise.</li>
                                <li className="flex items-start"><span className="mr-2 text-amber-400">•</span>Exhibiting depth and consistency.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-sm text-slate-500">
                            24 answers are scored against threshold limits. For borderline results, the E/I trait acts as a tie-breaker (Extraversion leans Contact; Introversion leans Inert).
                        </p>
                    </div>
                </Section>

                <Section>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                        Part 3: Engine (Enneagram) Analysis
                    </h2>
                    <p className="text-slate-500 mb-8">Questions Q45–Q62 / 18 items</p>

                    <div className="prose text-slate-600 max-w-none mb-8">
                        <p>
                            Beneath cognitive habits lie 9 fundamental motives called the <span className="bg-prisma-100 text-prisma-900 px-1 mx-0.5 rounded">Heart's Engine</span>, based on the Enneagram structure.
                        </p>
                        <p>
                            Each question contrasts two specific engines. Points are added to engines matching your selection, and the top two highest scores determine your Primary and Secondary engines.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-3 gap-3 mb-8">
                        {[
                            { type: 'T1', name: 'Perfection', desc: 'Wants to do right' },
                            { type: 'T2', name: 'Help', desc: 'Wants to feel loved' },
                            { type: 'T3', name: 'Achieve', desc: 'Wants to feel valuable' },
                            { type: 'T4', name: 'Unique', desc: 'Wants to be special' },
                            { type: 'T5', name: 'Explore', desc: 'Wants to understand' },
                            { type: 'T6', name: 'Secure', desc: 'Wants to be safe' },
                            { type: 'T7', name: 'Adventure', desc: 'Wants to be happy' },
                            { type: 'T8', name: 'Power', desc: 'Wants to control' },
                            { type: 'T9', name: 'Peace', desc: 'Wants harmony' },
                        ].map(e => (
                            <div key={e.type} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                                <span className="text-xs font-bold text-prisma-500">{e.type}</span>
                                <p className="font-bold text-slate-900 text-sm mt-1">{e.name}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{e.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="p-5 rounded-2xl bg-prisma-50 border border-prisma-100">
                        <h4 className="font-bold text-prisma-800 mb-2 flex items-center">
                            <Shield className="w-4 h-4 mr-2" />
                            Priority Map Validation
                        </h4>
                        <p className="text-sm text-prisma-700 leading-relaxed">
                            When engine scores tie, we apply weights based on an OS integration map. For example, Extraverts (E) naturally align with action-driven engines (T3, T7, T8), while Introverts (I) correlate heavily with internal analysis types (T5, T4, T1). We use this compatibility to resolve ties.
                        </p>
                    </div>
                </Section>

                <Section>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                        Part 4: Cognitive Bias Detection
                    </h2>
                    <p className="text-slate-500 mb-8">Questions Q63–Q72 / 10 items (5 pairs)</p>

                    <div className="prose text-slate-600 max-w-none mb-8">
                        <p>
                            Cognitive biases are unconscious flaws in reasoning. Aqsh Prisma tests for 5 major biases using paired question structures. A strong bias is detected if you consistently select the biased answer across a specific pair.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {[
                            { name: 'Confirmation Bias', desc: 'Favoring information that confirms existing beliefs while undervaluing contrarian data.', pair: 'Q63 & Q64' },
                            { name: 'Sunk Cost Fallacy', desc: 'Continuing an endeavor because of previously invested resources (time, money).', pair: 'Q65 & Q66' },
                            { name: 'Status Quo Bias', desc: 'Preferring that things stay as they are, heavily overweighting the risks of change.', pair: 'Q67 & Q68' },
                            { name: 'Attribution Bias', desc: 'Attributing successes to personal merit while blaming failures on external circumstances.', pair: 'Q69 & Q70' },
                            { name: 'Conformity Bias', desc: 'Suppressing personal opinions to align with the majority consensus of a group.', pair: 'Q71 & Q72' },
                        ].map(b => (
                            <div key={b.name} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-slate-900 text-sm">{b.name}</h4>
                                        <span className="text-xs text-slate-400">{b.pair}</span>
                                    </div>
                                    <p className="text-sm text-slate-600">{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                        Overall Consistency Check
                    </h2>
                    <div className="prose text-slate-600 max-w-none mb-8">
                        <p>
                            To ensure high reliability, Aqsh Prisma automatically cross-verifies your OS (16 types) and Engine (Enneagram) results for logical contradictions.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-green-50 border border-green-100">
                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-slate-900">Grade A: Highly Consistent</h4>
                                <p className="text-sm text-slate-600 mt-1">Found no contradictions between your OS and Engine. High diagnostic reliability.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-amber-50 border border-amber-100">
                            <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-slate-900">Grade B: Minor Discrepancy</h4>
                                <p className="text-sm text-slate-600 mt-1">Detected a partial mismatch. This pattern often arises through environmental adaptation or rapid personal growth phases.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-red-50 border border-red-100">
                            <Shield className="w-6 h-6 text-red-500 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-slate-900">Grade C: Potential Persona Usage</h4>
                                <p className="text-sm text-slate-600 mt-1">Multiple contradictions found. You might have answered as an "idealized" version of yourself. We recommend retaking the test when fully relaxed.</p>
                            </div>
                        </div>
                    </div>
                </Section>

                <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white mb-12 md:mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <BookOpen className="w-8 h-8 text-prisma-400" />
                        <h2 className="text-2xl md:text-3xl font-bold">Theoretical Foundations</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="font-bold text-prisma-300 mb-3">Socionics</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Systematized in the 1970s by Lithuanian researcher Aūšra Augustinavičiūtė. Expanding on Jung's psychological types, it introduces Information Metabolism to analyze how the 16 types process reality.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="font-bold text-prisma-300 mb-3">Enneagram</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                A framework of 9 interconnected personality archetypes. Reconstructed as modern psychology by figures like Claudio Naranjo and Don R. Riso, it explains our deepest defense mechanisms and subconscious motivations.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="font-bold text-prisma-300 mb-3">Cognitive Bias</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Drawing heavily from behavioral economics pioneered by Daniel Kahneman and Amos Tversky, this analysis highlights mental blindspots to help prevent systematic errors in career and life decisions.
                            </p>
                        </div>
                    </div>
                </section>

                <Section className="bg-slate-50 border-slate-200">
                    <div className="flex items-start gap-4">
                        <Shield className="w-6 h-6 text-slate-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-slate-900 mb-2">Notice & Disclaimer</h3>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li>This diagnostic tool is designed for self-reflection and team-building frameworks, not medical or clinical psychology diagnoses.</li>
                                <li>Results visualize behavioral tendencies and do not dictate your absolute ceiling or potential.</li>
                                <li>All calculations are executed securely within your browser. Answer data is never transmitted to or stored on external servers.</li>
                            </ul>
                        </div>
                    </div>
                </Section>

                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        Discover Your Cognitive Habits
                    </h2>
                    <Link
                        href="/en/diagnosis"
                        className={cn(
                            "inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white",
                            "bg-prisma-500 rounded-full hover:bg-prisma-600 transition-all",
                            "transform hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-prisma-500/20"
                        )}
                    >
                        Start Free Diagnosis
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </div>

            </main>
        </div>
    );
};

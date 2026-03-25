import Link from 'next/link';
import { ArrowLeft, Flame, Shield, Heart, Eye, Layout, ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { SITE_CONFIG, PUBLISHER_JSON_LD } from '@/lib/constants/site-config';
import { parseBoldText } from '@/lib/utils/parse-bold-text';

// ★ 英語化に際し、翻訳データを直接書き込むか、別のデータファイル(engine-content-en.ts)を作る必要がある。
// ここでは ENGINE_CONTENT_EN を同一ファイル内で定義してしまうか、別ファイルから引くか。
// 今回は、依存を増やさないためにインラインでデータを保持するようにします。
const ENGINE_CONTENT_EN_DATA = {
    T1: {
        type: 'T1',
        name: 'The Reformer',
        motivation: 'To be right, to strive for higher values, and to improve everything.',
        description: 'Driven by a strict inner critic. They are highly ethical, detail-oriented, and structured. They fear being corrupt, evil, or defective.',
        strengths: ['Highly ethical and deeply responsible.', 'Excellent at improving systems and refining details.', 'Maintains high standards and strong discipline.'],
        stressBehavior: 'Can become overly critical, self-righteous, and rigid when things fall short of their perfectionist ideals.'
    },
    T2: {
        type: 'T2',
        name: 'The Helper',
        motivation: 'To be loved, needed, and appreciated by others.',
        description: 'Warm, empathetic, and inherently focused on the needs of others. They fear being unwanted or unloved, driving them to express love through acts of service.',
        strengths: ['Highly empathetic and emotionally supportive.', 'Skilled at building strong, reciprocal relationships.', 'Naturally generous and nurturing.'],
        stressBehavior: 'May become overly intrusive, manipulative, or emotionally exhausted by constantly prioritizing others over themselves.'
    },
    T3: {
        type: 'T3',
        name: 'The Achiever',
        motivation: 'To feel valuable, successful, and admired.',
        description: 'Goal-oriented, adaptive, and highly driven by efficiency and image. They fear being worthless or unsuccessful, pushing them to excel in their chosen field.',
        strengths: ['Highly efficient and goal-oriented.', 'Excellent at presenting themselves and adapting to audiences.', 'Inspires others through strong leadership and success.'],
        stressBehavior: 'Can become workaholic, overly competitive, or deceptive in order to maintain an image of success.'
    },
    T4: {
        type: 'T4',
        name: 'The Individualist',
        motivation: 'To find themselves and their significance, to be unique.',
        description: 'Deeply introspective, expressive, and romantic. They fear having no identity or personal significance, driving a search for authenticity.',
        strengths: ['Highly creative and aesthetically sensitive.', 'Comfortable exploring emotional depth and complex feelings.', 'Deeply authentic and expressive.'],
        stressBehavior: 'May withdraw, become moody, or feel chronically misunderstood and envious of normal people.'
    },
    T5: {
        type: 'T5',
        name: 'The Investigator',
        motivation: 'To be capable, competent, and to understand the world.',
        description: 'Analytical, observant, and fiercely independent. They fear being useless, helpless, or incapable, driving an intense thirst for knowledge and mastery.',
        strengths: ['Objective, analytical, and highly observant.', 'Capable of intense focus and profound intellectual synthesis.', 'Independent and self-sufficient.'],
        stressBehavior: 'Can become detached, isolated, or overly cynical and protective of their time and energy.'
    },
    T6: {
        type: 'T6',
        name: 'The Loyalist',
        motivation: 'To have security, support, and guidance.',
        description: 'Committed, security-oriented, and highly responsible. They fear being without support or guidance, making them excellent troubleshooters but prone to anxiety.',
        strengths: ['Deeply loyal and trustworthy.', 'Excellent at identifying risks and troubleshooting problems.', 'Strong sense of duty and community.'],
        stressBehavior: 'Can become overly anxious, suspicious, or excessively reliant on authority figures.'
    },
    T7: {
        type: 'T7',
        name: 'The Enthusiast',
        motivation: 'To be happy, fully engaged, and avoid pain.',
        description: 'Spontaneous, versatile, and optimistic. They fear being deprived or in pain, driving them to constantly seek new experiences and varied stimulation.',
        strengths: ['Quick-thinking, innovative, and highly adaptable.', 'Spreads optimism and infectious energy.', 'Capable of synthesizing multiple divergent ideas.'],
        stressBehavior: 'May become scattered, impulsive, and unable to commit to one path to avoid missing out.'
    },
    T8: {
        type: 'T8',
        name: 'The Challenger',
        motivation: 'To be self-reliant, strong, and to protect their own destiny.',
        description: 'Powerful, decisive, and fiercely independent. They fear being harmed or controlled by others, driving them to take charge of their environment.',
        strengths: ['Natural leader with a commanding presence.', 'Decisive and fiercely protective of their loved ones.', 'Straightforward, honest, and action-oriented.'],
        stressBehavior: 'Can become domineering, confrontational, or uncompromising to maintain control.'
    },
    T9: {
        type: 'T9',
        name: 'The Peacemaker',
        motivation: 'To have inner stability and profound peace of mind.',
        description: 'Easygoing, receptive, and reassuring. They fear loss and separation, driving them to create harmony and avoid conflict at all costs.',
        strengths: ['Calm, patient, and excellent mediators.', 'Inclusive, accepting, and naturally supportive of others.', 'Able to see all sides of an issue.'],
        stressBehavior: 'Can become passive-aggressive, stubborn, or disengaged (numb) to avoid dealing with conflict.'
    }
};

const enneagramFeatures = [
    {
        icon: <Heart className="w-6 h-6 text-prisma-500" />,
        title: 'Feeling (Heart) Center',
        description: 'Driven by self-image and how they are perceived by others. Includes T2 (Helper), T3 (Achiever), and T4 (Individualist).'
    },
    {
        icon: <Eye className="w-6 h-6 text-prisma-600" />,
        title: 'Thinking (Head) Center',
        description: 'Driven by analysis and strategy to find security and avoid fear. Includes T5 (Investigator), T6 (Loyalist), and T7 (Enthusiast).'
    },
    {
        icon: <Shield className="w-6 h-6 text-prisma-500" />,
        title: 'Instinctive (Gut) Center',
        description: 'Driven by autonomy, anger, and the urge to control their environment. Includes T8 (Challenger), T9 (Peacemaker), and T1 (Reformer).'
    }
];

export const AboutEnneagramEnPage = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'What is Enneagram? | The 9 Desires and Heart\'s Engines | Aqsh Prisma',
        description: 'What is the real reason behind our actions? Expertly explaining the 9 types of Enneagram (Heart\'s Engines) that subconsciously govern behavior.',
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
            {/* Header / Navigation */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link href="/en" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Home
                    </Link>
                </div>
            </div>

            <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                {/* Hero Section */}
                <div className="mb-16 md:mb-24">
                    <span className="inline-flex px-4 py-1.5 rounded-full bg-prisma-50 text-prisma-700 font-medium text-sm mb-6 items-center border border-prisma-100">
                        <Flame className="w-4 h-4 mr-1.5" />
                        Theory 2: Heart's Engine
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        Touching Subconscious Desires
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                        Even when people take the same action, the underlying reasons vary wildly.<br />
                        Welcome to the world of the Enneagram, the engine driving your life from within.
                    </p>
                </div>

                {/* Introduction */}
                <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-16 md:mb-24">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                        What is a "Heart's Engine"?
                    </h2>
                    <div className="prose prose-lg text-slate-600 max-w-none">
                        <p className="mb-4">
                            The Enneagram is a powerful psychological system that classifies human personality into 9 core types. It delves deep into human motives—what you fear most, and what you desperately crave.
                        </p>
                        <p className="mb-4">
                            At Aqsh, we refer to these subconsciously driven motives dictated by the Enneagram as the <span className="bg-prisma-100 text-prisma-900 px-1 mx-1 rounded whitespace-nowrap">Heart's Engine</span>.
                        </p>
                        <p>
                            If Socionics represents the hardware specifications ("how" you do things), the Enneagram represents your core motivation (<span className="bg-prisma-100 text-prisma-900 px-1 mx-1 rounded whitespace-nowrap">"why" you do things</span>). The interplay between these two systems shapes your unique individuality, which is the core philosophy of Aqsh Prisma.
                        </p>
                    </div>
                </section>

                {/* Centers Explanation */}
                <section className="mb-16 md:mb-24">
                    <div className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                            The 3 Centers of Intelligence
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            The Enneagram categorizes human energy sources into three primary centers. Which energy do you subconsciously rely on the most?
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {enneagramFeatures.map((feature) => (
                            <div key={feature.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 9 Types Details */}
                <section className="mb-16 md:mb-24">
                    <div className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                            The 9 Heart's Engines
                        </h2>
                        <p className="text-slate-600">
                            The 9 fundamental unconscious desires—and their light and shadow—as defined by Aqsh.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {Object.values(ENGINE_CONTENT_EN_DATA).map((engine) => (
                            <div key={engine.type} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
                                <div className="flex flex-col md:flex-row md:items-start gap-6">
                                    {/* Left Column (Identifier) */}
                                    <div className="md:w-1/4 flex-shrink-0">
                                        <span className="inline-block px-3 py-1 rounded-md bg-prisma-50 text-prisma-700 font-bold text-sm mb-2 border border-prisma-100">
                                            Type {engine.type.replace('T', '')}
                                        </span>
                                        <h3 className="text-2xl font-bold text-slate-900">{engine.name}</h3>
                                    </div>

                                    {/* Right Column (Content) */}
                                    <div className="md:w-3/4">
                                        <div className="bg-slate-50 rounded-xl p-4 mb-5 border border-slate-100">
                                            <p className="text-slate-700 font-medium">
                                                <span className="text-prisma-500 mr-2 flex-shrink-0">Core Motive:</span>
                                                <span className="leading-relaxed">{parseBoldText(engine.motivation)}</span>
                                            </p>
                                        </div>
                                        <div className="text-slate-600 leading-relaxed mb-8">
                                            {parseBoldText(engine.description)}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
                                            <div>
                                                <h4 className="font-semibold text-prisma-600 mb-3 text-sm flex items-center">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-prisma-500 mr-2"></span>Light (Strengths)
                                                </h4>
                                                <ul className="space-y-2 text-sm text-slate-600">
                                                    {engine.strengths.map((str, i) => (
                                                        <li key={`str-${i}`} className="flex items-start">
                                                            <span className="mr-2 text-prisma-400 font-bold leading-relaxed">•</span>
                                                            <span className="leading-relaxed">{parseBoldText(str)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-slate-500 mb-3 text-sm flex items-center">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-2"></span>Shadow (Stress Behavior)
                                                </h4>
                                                <div className="text-sm text-slate-600 leading-relaxed">
                                                    {parseBoldText(engine.stressBehavior)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Combining Theories */}
                <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white mb-16 md:mb-24">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/3 flex justify-center">
                            <Layout className="w-32 h-32 text-prisma-400 opacity-80" />
                        </div>
                        <div className="md:w-2/3">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Resolution of 16 × 9 = 144
                            </h2>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                Cognitive Habits (16 types) and the Heart's Engine (9 types).<br />
                                Most personality tests cover only one, leaving you feeling partially understood. Even two highly logical individuals exhibit entirely different attitudes if one is driven by the desire to succeed and the other by the fear of being vulnerable.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                Aqsh multiplies these two axes to offer 144 patterns of ultimate personalization, bringing the resolution of your individuality to its maximum limit.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="mb-12 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        Discover Your Engine
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

import Link from 'next/link';
import { ArrowLeft, Brain, Compass, Users, Target, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_CONFIG, PUBLISHER_JSON_LD } from '@/lib/constants/site-config';
import { parseBoldText } from '@/lib/utils/parse-bold-text';

// データをインラインで定義します
const OS_CONTENT_EN_DATA = {
    ENTP: {
        code: 'ENTP',
        name: 'ILE Inventor',
        color: '#8b5cf6',
        catchphrase: 'Breaking conventions with endless possibilities',
        strength: 'Generates innovative ideas through divergent thinking. ・Highly adaptable and quick-witted in unexpected situations. ・Sees underlying structures and hidden potential.',
        weakness: 'Often loses interest once a concept is understood. ・Struggles with strict routines and detailed administrative execution. ・Can be perceived as argumentative or needlessly contrarian.'
    },
    ISFP: {
        code: 'ISFP',
        name: 'SEI Peacemaker',
        color: '#ec4899',
        catchphrase: 'Sensing life\'s aesthetics and physical comforts',
        strength: 'Creates comfortable, harmonious physical environments. ・Highly attuned to sensory details and aesthetics. ・Empathetic and gently diplomatic in interactions.',
        weakness: 'Avoids long-term strategic planning. ・Can be overly passive to preserve peace. ・Struggles to confront harsh realities or assert strong boundaries.'
    },
    ESFJ: {
        code: 'ESFJ',
        name: 'ESE Enthusiast',
        color: '#f59e0b',
        catchphrase: 'Radiating emotional warmth to unite people',
        strength: 'Creates powerful emotional connections and enthusiasm. ・Highly attentive to the emotional atmosphere and group harmony. ・Acts swiftly to care for others\' needs.',
        weakness: 'Can become overly involved in others\' emotional lives. ・Struggles with cold, impersonal logical analysis. ・Desires strong external validation.'
    },
    INTJ: {
        code: 'INTJ',
        name: 'LII Analyst',
        color: '#0ea5e9',
        catchphrase: 'Architecting perfect logical systems',
        strength: 'Constructs robust internal logical frameworks. ・Maintains a high degree of objectivity and fairness. ・Excels at categorizing and structuring complex information.',
        weakness: 'May struggle with emotional expression and empathy. ・Can become rigid when reality contradicts their logical models. ・Often ignores practical details in favor of pure theory.'
    },
    ENFJ: {
        code: 'ENFJ',
        name: 'EIE Mentor',
        color: '#f43f5e',
        catchphrase: 'Inspiring people with grand emotional visions',
        strength: 'Powerful ability to inspire and mobilize groups emotionally. ・Deeply senses emotional undercurrents and future trends. ・Expressive, dramatic, and charismatic.',
        weakness: 'Can become emotionally volatile or overly dramatic. ・Struggles to relax and enjoy the present physical moment. ・May struggle with strict, impersonal logic.'
    },
    ISTP: {
        code: 'ISTP',
        name: 'LSI Inspector',
        color: '#6366f1',
        catchphrase: 'Enforcing order through structural precision',
        strength: 'Maintains strict order, discipline, and hierarchical structure. ・Highly detail-oriented and precise in execution. ・Dependable and clear about rules and boundaries.',
        weakness: 'Can be inflexible or overly authoritarian. ・Struggles with ambiguity and sudden changes. ・May lack emotional warmth in interpersonal relations.'
    },
    ESTP: {
        code: 'ESTP',
        name: 'SLE Conqueror',
        color: '#ef4444',
        catchphrase: 'Seizing opportunities through decisive action',
        strength: 'Decisive, bold, and highly effective in crisis situations. ・Strong awareness of power dynamics and territorial control. ・Action-oriented rather than theoretical.',
        weakness: 'Can be overly blunt or intimidating to sensitive individuals. ・Struggles to foresee long-term consequences of impulsive actions. ・May disregard ethical considerations to achieve goals.'
    },
    INFP: {
        code: 'INFP',
        name: 'IEI Romantic',
        color: '#d946ef',
        catchphrase: 'Navigating the currents of time and emotion',
        strength: 'Deep capacity for foresight and tracking long-term emotional trends. ・Highly empathetic, intuitive, and imaginative. ・Calms external tensions through soft diplomacy.',
        weakness: 'Can struggle with day-to-day practicalities and logistics. ・May become passive or disconnected from physical reality. ・Struggles to exert forceful leadership.'
    },
    ESFP: {
        code: 'ESFP',
        name: 'SEE Politician',
        color: '#f97316',
        catchphrase: 'Mastering social leverage and influence',
        strength: 'Highly skilled at navigating social networks and personal influence. ・Dynamic, persuasive, and excellent at asserting will tactfully. ・Flexible and pragmatic in achieving goals.',
        weakness: 'Struggles with abstract logical systems and strict rules. ・May be overly reliant on personal relationships over objective criteria. ・Lacks long-term strategic foresight.'
    },
    INTP: {
        code: 'INTP',
        name: 'ILI Critic',
        color: '#38bdf8',
        catchphrase: 'Observing the inevitable flow of cause and effect',
        strength: 'Exceptional ability to foresee outcomes and spot fatal flaws in plans. ・Deeply analytical, objective, and philosophical. ・Patient and naturally avoids unnecessary risks.',
        weakness: 'Can be overly pessimistic or paralyzingly critical. ・Struggles with initiating action and emotional enthusiasm. ・May become physically inactive.'
    },
    ENTJ: {
        code: 'ENTJ',
        name: 'LIE Entrepreneur',
        color: '#2563eb',
        catchphrase: 'Optimizing systems for maximum efficiency',
        strength: 'Highly focused on practical efficiency, productivity, and optimization. ・Constantly seeks new ventures and profitable methodologies. ・Active, fast-paced, and visionary.',
        weakness: 'Can view relationships purely through a transactional lens. ・Struggles with deep emotional empathy or comfort. ・May rush execution without enough sensory preparation.'
    },
    ISFJ: {
        code: 'ISFJ',
        name: 'ESI Guardian',
        color: '#a855f7',
        catchphrase: 'Protecting deep moral bonds and loyalties',
        strength: 'Fiercely loyal to inner circles and strict internal moral codes. ・Excellent at assessing character and personal boundaries. ・Dutiful, meticulous, and protective.',
        weakness: 'Can be unforgiving and hold long-term grudges. ・Struggles with abstract possibilities and rapid innovation. ・May become overly judgmental.'
    },
    ESTJ: {
        code: 'ESTJ',
        name: 'LSE Director',
        color: '#14b8a6',
        catchphrase: 'Managing resources with reliable pragmatism',
        strength: 'Exceptional at factual, grounded management and logistics. ・Highly reliable, hardworking, and quality-oriented. ・Values verifiable facts and practical usefulness.',
        weakness: 'Struggles to anticipate distant or abstract future risks. ・Can be overly demanding of others\' time and energy. ・May neglect emotional nuances.'
    },
    INFJ: {
        code: 'INFJ',
        name: 'EII Humanist',
        color: '#c026d3',
        catchphrase: 'Nurturing the ethical potential of individuals',
        strength: 'Deeply committed to moral integrity and psychological growth. ・Highly empathetic and naturally seeks to heal emotional wounds. ・Perceptive regarding human potential.',
        weakness: 'Struggles asserting force or confronting aggressive behavior. ・Can become overly self-sacrificial or withdrawn. ・May view the world through overly idealistic lenses.'
    },
    ENFP: {
        code: 'ENFP',
        name: 'IEE Inspirer',
        color: '#eab308',
        catchphrase: 'Uncovering the hidden potential in all things',
        strength: 'Incredible ability to see potential in people and ideas. ・Highly open-minded, enthusiastic, and psychologically insightful. ・Easily establishes quick rapport with diverse individuals.',
        weakness: 'Struggles to establish and maintain strict structural logic. ・Can be overly scattered, starting many projects without finishing. ・May struggle with strict discipline.'
    },
    ISTJ: {
        code: 'ISTJ',
        name: 'SLI Artisan',
        color: '#10b981',
        catchphrase: 'Perfecting the sensory efficiency of the present',
        strength: 'Highly skilled at optimizing physical comfort and functional utility. ・Calm, practical, and immune to superficial emotional hype. ・Values high-quality craftsmanship and efficiency.',
        weakness: 'Can be stubborn and resistant to emotional pressure. ・Struggles to generate enthusiasm for abstract future visions. ・May isolate to protect their physical peace.'
    }
};

const renderTextWithBullets = (text: string) => {
    if (!text) return null;
    const items = text.split('・').filter(item => item.trim() !== '');

    if (items.length === 1 && !text.includes('・')) {
        return <div className="text-slate-600 leading-relaxed text-sm">{parseBoldText(items[0])}</div>;
    }

    return (
        <ul className="space-y-3 mt-2">
            {items.map((item, idx) => (
                <li key={`bullet-${idx}`} className="flex items-start">
                    <span className="mr-2 text-prisma-400 font-bold leading-relaxed text-sm">•</span>
                    <span className="text-slate-600 leading-relaxed text-sm">
                        {parseBoldText(item.trim())}
                    </span>
                </li>
            ))}
        </ul>
    );
};

const features = [
    {
        icon: <Brain className="w-6 h-6 text-prisma-500" />,
        title: 'Information Gathering',
        description: 'Sensing (S) or Intuition (N). Focusing on concrete physical "facts" before you vs. diving into abstract "potential" and possibilities.'
    },
    {
        icon: <Target className="w-6 h-6 text-prisma-600" />,
        title: 'Decision Making',
        description: 'Thinking (T) or Feeling (F). Making judgments based on objective "logic" vs. relying on subjective "values and ethics".'
    },
    {
        icon: <Compass className="w-6 h-6 text-prisma-500" />,
        title: 'Energy Direction',
        description: 'Extraversion (E) or Introversion (I). Recharging through external "stimulation" vs. recovering through solitary "reflection".'
    }
];

export const AboutSocionicsEnPage = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'What is Socionics? | 16 Personality Structures Explained | Aqsh Prisma',
        description: 'Why do you clash with certain people? Exploring Socionics, a precise personality typology from Russia, to decode the 16 cognitive habits and relationship dynamics.',
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
                    <span className="inline-block px-4 py-1.5 rounded-full bg-prisma-50 text-prisma-700 font-medium text-sm mb-6 box-border border border-prisma-100">
                        Theory 1: Cognitive Habits
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        Decoding the Disconnect
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                        The answer isn't bad character; it's different cognitive habits.<br />
                        Welcome to the intricate world of Socionics, a precise typology from Russia.
                    </p>
                </div>

                {/* Introduction */}
                <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-16 md:mb-24">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                        What are Cognitive Habits?
                    </h2>
                    <div className="prose prose-lg text-slate-600 max-w-none">
                        <p className="mb-4">
                            Most 16-type personality tests share a common root: the psychological types established by psychiatrist Carl Jung.
                        </p>
                        <p className="mb-4">
                            Among these, <span className="bg-prisma-100 text-prisma-900 px-1 mx-1 rounded whitespace-nowrap">Socionics</span>—the foundation of Aqsh's OS logic—developed independently in the Soviet Union (now Lithuania) in the 1970s. Rather than just analyzing personal traits, its defining feature is its focus on <span className="bg-prisma-100 text-prisma-900 px-1 mx-1 rounded">Information Metabolism</span>: how humans exchange information within society.
                        </p>
                        <p>
                            At Aqsh, we affectionately refer to these 16 hardware specifications of the human brain as <span className="bg-prisma-100 text-prisma-900 px-1 mx-1 rounded whitespace-nowrap">Cognitive Habits (OS)</span>. Just as computers operate on Mac or Windows, the human brain also runs on fundamentally different specifications.
                        </p>
                    </div>
                </section>

                {/* Axes Explanation */}
                <section className="mb-16 md:mb-24">
                    <div className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                            The 3 Axes of Information Metabolism
                        </h2>
                        <p className="text-slate-600">
                            How your brain interprets the world is governed by the combination of the following elements.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feature) => (
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

                {/* 16 Types Grid */}
                <section className="mb-16 md:mb-24">
                    <div className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                            The 16 Cognitive Patterns
                        </h2>
                        <p className="text-slate-600">
                            Here are the 16 cognitive habits (OS) defined within Aqsh Prisma.<br className="hidden md:inline" />
                            There are no superior or inferior specifications—just a beautiful spectrum of diversity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Object.values(OS_CONTENT_EN_DATA).map((os) => (
                            <div
                                key={os.code}
                                className={cn(
                                    "bg-white rounded-3xl p-8 shadow-sm border border-slate-200 block group",
                                    "hover:border-prisma-300 hover:shadow-lg transition-all duration-300"
                                )}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="pr-2">
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-prisma-600 transition-colors">{os.name.split(' ')[0]}</h3>
                                        <p className="text-sm font-medium text-slate-500 mt-1">{os.name.substring(os.name.indexOf(' ') + 1)}</p>
                                    </div>
                                    <span
                                        className="inline-block px-2 py-1 rounded-md text-xs font-bold"
                                        style={{ backgroundColor: `${os.color}15`, color: os.color }}
                                    >
                                        {os.code}
                                    </span>
                                </div>
                                <p className="text-slate-800 font-medium mb-3 text-sm">{os.catchphrase}</p>
                                <div className="space-y-6 mt-6 pt-6 border-t border-slate-100">
                                    <div>
                                        <h4 className="font-semibold text-prisma-600 mb-2 flex items-center">
                                            <span className="w-1.5 h-1.5 rounded-full bg-prisma-500 mr-2"></span>Strengths
                                        </h4>
                                        {renderTextWithBullets(os.strength)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-500 mb-2 flex items-center">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-2"></span>Weaknesses
                                        </h4>
                                        {renderTextWithBullets(os.weakness)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Relationship Logic */}
                <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white mb-16 md:mb-24">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/3 flex justify-center">
                            <Users className="w-32 h-32 text-prisma-400 opacity-80" />
                        </div>
                        <div className="md:w-2/3">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Compatibility is a Human Puzzle
                            </h2>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                The most profound aspect of Socionics is that it doesn't leave relationships to mere mood or chance. It logically decodes how individuals with different cognitive habits influence each other, such as precisely identifying partners who effortlessly cover your mental blindspots.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                Once you understand the specifications of another person's OS, words that previously sounded like noise can be gracefully translated into messages of care.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="mb-12 text-center">
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

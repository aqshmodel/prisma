import { type EngineType } from '@/types/diagnosis';
import type { EngineContent } from './content-engine';

/**
 * English version of Engine (Enneagram-based motivation) content for 9 types.
 * Keeps same structure and type keys as the Japanese original.
 */
export const ENGINE_CONTENT_EN: Record<EngineType, EngineContent> = {
    'T1': {
        type: 'T1',
        name: 'Quality (Reform)',
        motivation: 'A drive for correctness and improvement—"I want to do things right"',
        description: `
An engine that constantly senses the gap between ideals and reality, striving to make the world better and more correct.
You hold yourself and others to high standards, refusing to tolerate mistakes or compromises.
"Quality" is your proof of trustworthiness, and you take pride in perfecting every detail.
        `.trim(),
        growthAdvice: 'Accept that "perfect" doesn\'t exist. Releasing at 80% and improving through feedback leads to bigger results than endless polishing.',
        strengths: ['Strong ethics', 'Attention to detail', 'Drive to improve', 'Reliability'],
        weaknesses: ['Overly critical', 'Inflexibility', 'Fear of completion', 'Suppressed anger'],
        values: ['Justice', 'Quality', 'Consistency', 'Discipline'],
        stressBehavior: 'Under stress, you may become hypercritical of others\' mistakes or spiral into self-blame and melancholy.',
        stressManual: {
            signs: [
                'Minor etiquette breaches that normally wouldn\'t bother you suddenly feel unbearable',
                '"Let me redo this" becomes your refrain—you keep scrapping near-finished work',
                'Before sleep, you replay today\'s mistakes on loop, questioning if every word was "correct"'
            ],
            ngActions: [
                'Over-correcting others\' work with "you should do it this way," freezing team atmosphere',
                'Perfectionism spiraling: spending 3 days on the final 2% when 80% was more than enough',
                'Swallowing anger until it manifests physically—chronic headaches and tension are emotional red flags'
            ],
            recovery: {
                quick: 'Stop and just look out the window for 5 minutes. A view with no right or wrong answers loosens your brain\'s "grading mode"',
                medium: 'Immerse yourself in cleaning or organizing—physically "setting things right" satisfies your engine while providing a mental reset',
                full: 'Visit a museum or nature. Organic, imperfect beauty releases you from the spell of "correctness"'
            },
        },
        loveStyle: {
            fallingPattern: 'Attracted to sincerity and integrity. Not flashy gestures, but the steady accumulation of trust—keeping promises, remembering what was said. One day, all those small consistencies click into "this is the one."',
            attachmentType: 'Devoted but prone to nitpicking. Your "helpful suggestions" land as criticism. You mean well, but partners can feel suffocated. Once committed, though, you love with unmatched honesty.',
            breakTrigger: 'Laziness or dishonesty becomes the dealbreaker. Broken promises, casual lies, giving up on effort—once trust is gone, it rarely returns.'
        },
        careerRisk: {
            trapPattern: 'Perfectionism paralyzes action. "There must be a better way" leads to infinite preparation and zero launches.',
            quitTrigger: 'When you become certain "this company is doing the wrong thing." Ethics violations or quality-ignoring culture become unbearable.',
            prevention: 'Make "ship at 80% and refine with feedback" your mantra. Before criticizing, find 3 good things about a colleague\'s work.'
        },
        moneyStyle: {
            lossPattern: 'Believing "talking about money is beneath me," you delay salary negotiations. "Good work speaks for itself" is a nice idea that doesn\'t always hold.',
            negotiationHabit: 'Meticulously prepared with evidence, but uncomfortable asking for more. Logical but lacks emotional appeal.',
            earningStrategy: 'Monetize your obsession with quality. Auditing, quality management, and review roles command premium prices for "correctness guarantees."'
        },
        motivationKillers: [
            'Being told "don\'t worry about details, just ship it fast"',
            'Ambiguous rules where standards vary by person',
            'Having improvement suggestions dismissed as "too much trouble"'
        ]
    },
    'T2': {
        type: 'T2',
        name: 'Contribution (Connect)',
        motivation: 'A drive for connection—"I want to be needed and loved"',
        description: `
An engine sensitive to others' needs, seeking self-worth through helping people.
You excel at reading the room and work tirelessly to smooth team relationships.
"Thank you" and genuine gratitude are your greatest fuel.
        `.trim(),
        growthAdvice: 'Watch for neglecting your own needs. Saying "no" isn\'t rejection—it\'s how you sustain the ability to help long-term.',
        strengths: ['Empathy', 'Supportiveness', 'Relationship building', 'Generosity'],
        weaknesses: ['Self-sacrifice', 'Need for approval', 'Over-involvement', 'Ignoring own emotions'],
        values: ['Love', 'Service', 'Gratitude', 'Connection'],
        stressBehavior: 'After over-giving without reciprocation, you may erupt into intense anger or victim mentality.',
        stressManual: {
            signs: [
                'You\'re unable to decline requests more frequently. You say "I\'m fine" with a smile when you\'re exhausted',
                'Resentment about unacknowledged contributions starts to simmer. "I\'m always the one who..." loops in your mind',
                'Sudden desire to isolate. After being surrounded by people, LINE notifications feel like a burden'
            ],
            ngActions: [
                'Becoming passive-aggressive about past favors—"After everything I did for you" leaks through your attitude',
                'Completely ignoring your own needs to keep serving others until your body breaks down',
                'Crafting a "happy life" persona on social media while actually suffering inside'
            ],
            recovery: {
                quick: 'Put your phone face-down and enjoy a drink. Consciously create 5 minutes that are "for yourself," not for someone else',
                medium: 'Solo café time or a walk alone. Spend time without caring for anyone else and listen to your real feelings',
                full: 'A spa or massage—let someone take care of YOU. Switching from giver to receiver rebalances your energy'
            },
        },
        loveStyle: {
            fallingPattern: 'Weak for anyone who depends on you. "I can\'t do this without you" ignites a mix of duty and desire. Hard to tell if it\'s true attraction or the rush of being needed.',
            attachmentType: 'You unconsciously reshape yourself to be the ideal partner—adopting their hobbies, preferences, everything. Eventually, you can\'t answer "What do YOU like?"',
            breakTrigger: 'Unreciprocated giving builds up until one day "Do you even love me?" explodes. The accumulated resentment catches your partner off guard.'
        },
        careerRisk: {
            trapPattern: 'So busy supporting everyone else\'s career that your own gets sidelined. You become the "reliable helper" instead of advancing yourself.',
            quitTrigger: 'When the tank of unacknowledged effort overflows. You resign suddenly, shocking everyone who never saw it coming.',
            prevention: 'Define your boundaries clearly. "No" isn\'t rejection—it\'s a strategy for sustainable contribution.'
        },
        moneyStyle: {
            lossPattern: 'Expert at undercharging. "I don\'t need that much" leads to below-market compensation. Gratitude replaces actual income.',
            negotiationHabit: 'Too worried about the other person\'s reaction to push firmly. You settle for less than your worth to avoid tension.',
            earningStrategy: 'Turn "supporting people" into professional expertise: coaching, counseling, HR—roles where caring commands real pay.'
        },
        motivationKillers: [
            'Your contributions are taken for granted without a word of thanks',
            'A cold, transactional workplace with no helping culture',
            'Being told "that\'s not your job" when trying to assist someone'
        ]
    },
    'T3': {
        type: 'T3',
        name: 'Achievement (Achieve)',
        motivation: 'A drive for success—"I want to win and be admired"',
        description: `
An engine that proves self-worth through goals reached and visible results.
Efficiency, productivity, and outperforming the competition bring you alive.
"Being excellent" matters deeply—career advancement and social status are pursued with full intensity.
        `.trim(),
        growthAdvice: 'Achievement ≠ your value as a person. Learn to accept the version of you that fails or does nothing. Pause sometimes and ask what you truly want from the heart.',
        strengths: ['Goal execution', 'Efficiency', 'Adaptability', 'Charisma'],
        weaknesses: ['Fear of failure', 'Workaholism', 'Image consciousness', 'Emotional disconnection'],
        values: ['Success', 'Efficiency', 'Recognition', 'Competence'],
        stressBehavior: 'Extreme aversion to inefficiency, guilt about resting, and pushing through to burnout without stopping.',
        stressManual: {
            signs: [
                'You can\'t stop thinking about work on weekends. Watching a movie triggers "I could be working right now"',
                'Excessive self-promotion kicks in—your social feed becomes nothing but achievement announcements',
                'Emotional flatness—even good news doesn\'t register because you\'re already setting the next target'
            ],
            ngActions: [
                'Packing your schedule even tighter—using exhaustion as fuel is like flooring the accelerator toward a cliff',
                'Masking vulnerability with bravado. "I\'m totally fine" while crumbling inside',
                'Starting to evaluate people purely by usefulness. When relationships go transactional, you\'ve hit your limit'
            ],
            recovery: {
                quick: '5 minutes of zero productivity. Stare at the sky, watch cat videos. Practice giving yourself permission to "waste time"',
                medium: 'Non-competitive hobbies: cooking, gardening—activities where no one sees or judges the output',
                full: 'A full digital detox day. No phone, no notifications, no metrics. Rediscover who you are without the scoreboard'
            },
        },
        loveStyle: {
            fallingPattern: 'Drawn to people who see and appreciate your effort. "You\'re amazing" and "I see how hard you work" are surprisingly powerful. Indifference to your achievements is a dealbreaker.',
            attachmentType: 'You want to "win" at relationships too—perfect anniversary surprises, curated couple photos. But chasing the image can make you miss your partner\'s real feelings.',
            breakTrigger: 'When your partner feels like a drag on your ambitions—not supporting key career moments, not keeping up with your pace. Logic overtakes emotion, and the exit is swift.'
        },
        careerRisk: {
            trapPattern: 'Burnout from relentless achievement-chasing. Only taking "winnable" challenges and losing sight of what you actually want.',
            quitTrigger: 'When effort isn\'t fairly evaluated—passed over despite outworking everyone. You move fast to find a stage worthy of your talent.',
            prevention: 'Separate "results" from "fulfillment." Regularly check: do I enjoy this work, or am I just winning?'
        },
        moneyStyle: {
            lossPattern: 'Assuming results will speak for themselves without self-advocacy. Strong track record but outmaneuvered by better promoters.',
            negotiationHabit: 'Confident about your value but blind to the other side\'s perspective. "Look at my numbers" without considering their needs.',
            earningStrategy: 'Learn to narrate, not just demonstrate. Translate your achievements into "value for them"—this dramatically improves negotiation outcomes.'
        },
        motivationKillers: [
            'Egalitarian environments where effort and results aren\'t differentially rewarded',
            'No room for challenge or growth—same work, day after day',
            'Watching less-capable people advance through politics, not performance'
        ]
    },
    'T4': {
        type: 'T4',
        name: 'Originality (Original)',
        motivation: 'A drive for uniqueness—"I want to be special and feel deeply"',
        description: `
An engine that fears being ordinary and strives to establish a one-of-a-kind identity.
You possess delicate sensitivity, pursuing beauty, meaning, and emotional depth.
Your wish is to leave a unique mark on the world through your own perspective and expression.
        `.trim(),
        growthAdvice: 'Don\'t drown in emotional waves. Practice finding meaning in ordinary daily tasks. Your creativity flourishes most within disciplined routines.',
        strengths: ['Creativity', 'Sensitivity', 'Aesthetic sense', 'Unique worldview'],
        weaknesses: ['Mood swings', 'Self-absorption', 'Envy', 'Escapism'],
        values: ['Beauty', 'Originality', 'Depth', 'Authenticity'],
        stressBehavior: 'You may withdraw, convinced no one understands you, retreating into fantasies and indulging in melancholy.',
        stressManual: {
            signs: [
                'Others\' happiness feels blindingly bright. Friends\' social media triggers "why only me?"',
                'Creative work stalls. Inspiration dries up and you start doubting your own talent',
                'Old wounds flash back suddenly—a 3-year-old event feels like it happened yesterday'
            ],
            ngActions: [
                'Romanticizing sadness as proof of depth. Getting intoxicated by your own drama',
                'Isolating too much, believing asking for help is "something ordinary people do"',
                'Weaponizing your suffering\'s uniqueness—"no one could possibly understand" pushes away outstretched hands'
            ],
            recovery: {
                quick: 'Write your current feelings on paper. Externalizing swirling emotions creates even a small bit of distance',
                medium: 'Walk with music. Redirect attention from inner turmoil to the colors and sounds of the outside world',
                full: 'A day devoted to moving experiences—film, art, live music. "Sublimating" rather than "digesting" emotions accelerates recovery'
            },
        },
        loveStyle: {
            fallingPattern: 'You open your heart to someone who tries to understand your "hard-to-get" nature. "I love that feeling of yours" hits harder than surface compliments.',
            attachmentType: 'An emotional rollercoaster—intensely devoted one moment, suddenly cold the next. Partners find you unpredictable, but your emotional depth is also your greatest charm.',
            breakTrigger: '"Just be normal" or "act like everyone else" triggers an instant emotional shutdown. Rejection of your individuality is an existential wound.'
        },
        careerRisk: {
            trapPattern: 'Chasing "authenticity" into unmarketable niches. Mood swings lead to frequent short-tenure jobs.',
            quitTrigger: 'When your creativity is dismissed—"that\'s not relevant to work." It feels like your very existence is being denied.',
            prevention: 'Find where "being yourself" and "market value" intersect—design, writing, UX. When emotional waves hit, just noticing "I\'m in a wave right now" helps.'
        },
        moneyStyle: {
            lossPattern: '"I refuse to work just for money" keeps you from making realistic income plans. "Do what you love and money follows" is survivorship bias.',
            negotiationHabit: 'Too emotional for stable negotiation. Swings between "if you don\'t get my art, forget it" and "whatever, any price is fine."',
            earningStrategy: 'Brand your "worldview." Build a niche audience that resonates with your unique aesthetic, and serve them—niche strategy is your optimal path.'
        },
        motivationKillers: [
            'Uniform environments that erase individuality—identical desks, identical tasks',
            'Being told "just do it like everyone else"',
            'Mechanical work with zero room for emotional expression'
        ]
    },
    'T5': {
        type: 'T5',
        name: 'Investigation (Observe)',
        motivation: 'A drive for knowledge—"I want to understand and be competent"',
        description: `
An engine that seeks safety through observing, analyzing, and understanding the world.
You avoid emotional entanglement, preferring objective distance.
Accumulating expertise and building logical frameworks brings you both security and joy.
        `.trim(),
        growthAdvice: 'Don\'t stop at input—focus on output. Knowledge only becomes valuable when applied and shared. Dare to act even with incomplete information.',
        strengths: ['Analytical ability', 'Objectivity', 'Deep expertise', 'Composure'],
        weaknesses: ['Inaction', 'Isolation', 'Intellectual arrogance', 'Difficulty expressing emotions'],
        values: ['Knowledge', 'Logic', 'Independence', 'Privacy'],
        stressBehavior: 'You withdraw from human contact, lose yourself in information gathering, and lose touch with the real world.',
        stressManual: {
            signs: [
                'Energy for socializing is depleted. The urge to cancel plans increases sharply',
                'You hoard knowledge but can\'t produce anything. 30 browser tabs sit open, none closed',
                'Basic life tasks (shopping, cooking, cleaning) become absurdly difficult. Life\'s operating system starts failing'
            ],
            ngActions: [
                'Retreating deeper into your shell. After 3+ days of zero human contact, the barrier to re-entry grows exponentially',
                'Trying to solve everything in your head—"analyzing" without ever moving your hands as time melts away',
                'Sacrificing sleep to research. A 3 AM Wikipedia deep-dive isn\'t intellectual curiosity—it\'s anxiety in disguise'
            ],
            recovery: {
                quick: 'Open a window and breathe outside air. Physically connecting with the external world breaks the mental loop',
                medium: 'Meet one trusted person. Crowds drain you, but 1-on-1 deep conversation actually recharges',
                full: 'A full day of bodywork—yoga, swimming, sauna. Reclaiming physical sensation is the ultimate reset for a mind-dominant type'
            },
        },
        loveStyle: {
            fallingPattern: 'Quietly drawn to intellectual sparks—reading the same book, getting excited about niche topics. A late-night message exchange where "this person is interesting" flickers is often where love starts.',
            attachmentType: 'Perpetually balancing intimacy and space. You love deeply but absolutely need alone time—and struggle to explain why yesterday\'s togetherness requires today\'s solitude.',
            breakTrigger: 'Privacy invasion is fatal: checking your phone, opening your drawers, calling your alone time "cold." Any single violation can shatter trust instantly.'
        },
        careerRisk: {
            trapPattern: 'All input, no output. "Just a bit more research" stretches to infinity, and decisions never get made despite vast knowledge.',
            quitTrigger: 'When privacy and focus time are chronically invaded—open offices, constant meetings, pressure to "engage more with the team."',
            prevention: 'Set a rule: "30% of what I learn must become output." That converts knowledge into recognized value.'
        },
        moneyStyle: {
            lossPattern: '"Money doesn\'t interest me" leads to accepting far below market rate. "If I can do my research, that\'s enough" gets exploited.',
            negotiationHabit: 'Preparation is flawless but face-to-face "push" is lacking. Email or written negotiation plays to your strengths.',
            earningStrategy: 'Systematize and sell your expertise—books, courses, templates. Build "stock-type" income you can earn without meeting people.'
        },
        motivationKillers: [
            'All-day meetings and small talk with zero alone time',
            'Pressure for snap decisions with no time to think deeply',
            'Zero intellectual stimulation—repetitive tasks with nothing new to learn'
        ]
    },
    'T6': {
        type: 'T6',
        name: 'Security (Secure)',
        motivation: 'A drive for safety—"I want to feel secure and protected"',
        description: `
An engine that manages anxiety by anticipating risks and preparing defenses.
You value belonging to trustworthy authorities, organizations, and groups, fulfilling your role responsibly.
Cautious and loyal, you function as the team's defensive line.
        `.trim(),
        growthAdvice: 'Transform inner anxiety into intuitive trust. You can\'t eliminate all risk. Believe in your own judgment and the future\'s possibilities—take the step.',
        strengths: ['Loyalty', 'Risk management', 'Responsibility', 'Teamwork'],
        weaknesses: ['Anxiety', 'Dependency', 'Suspicion', 'Indecisiveness'],
        values: ['Safety', 'Trust', 'Responsibility', 'Faithfulness'],
        stressBehavior: 'You may catastrophize, panic, and either cling to authority or swing into full rebellion.',
        stressManual: {
            signs: [
                '"What if" scenarios won\'t stop. You can\'t sleep because of things that haven\'t happened yet',
                'You over-read between the lines. "It\'s fine" from someone triggers "but are they actually angry?"',
                'Decision paralysis increases. Can\'t even pick a lunch menu? You\'re under serious pressure'
            ],
            ngActions: [
                'Projecting anxiety onto others—"Are you sure it\'s OK?" on repeat exhausts everyone around you',
                'Over-depending on authority figures, effectively surrendering your own judgment',
                'Flipping to "trust no one" mode and isolating completely'
            ],
            recovery: {
                quick: 'Write down worries, then sort them into "actually happening now" vs. "imagined." Most fall into the latter category',
                medium: 'Call a trusted friend—not for advice, just to talk. Speaking aloud halves anxiety',
                full: 'Physical activity all day—hiking, climbing, dancing. When your body is tired, your brain loses the energy to manufacture fear'
            },
        },
        loveStyle: {
            fallingPattern: 'Drawn to stability and consistency—not surprises, but a daily "good morning" text. Love begins when you reach certainty: "this person will never betray me." Getting there takes a long observation period.',
            attachmentType: 'Once trust is earned, you show deep loyalty—but carry constant fear of betrayal. "Testing" behaviors (delayed replies to gauge reactions) cause guilt even as you can\'t stop.',
            breakTrigger: 'Discovered lies or secrets are the ultimate trigger—even small ones. It\'s not just the betrayal; it\'s "my judgment about people was wrong" that shatters everything.'
        },
        careerRisk: {
            trapPattern: 'Over-caution prevents risk-taking. You stay in "safe but stagnant" positions. Over-reliance on superiors makes you a perpetual instruction-waiter.',
            quitTrigger: 'When trusted leadership betrays you. Your "safe haven" crumbles and you flee in panic—often repeating the pattern at the next job.',
            prevention: 'Distinguish "anxiety" from "actual danger." Writing down the worst realistic outcome usually reveals "I won\'t die from this."'
        },
        moneyStyle: {
            lossPattern: 'Prioritizing "stability" keeps you from acting even when underpaid. Too afraid to even check your market value.',
            negotiationHabit: 'Self-sabotaging with "they\'ll think I\'m lying" or "they\'ll think I\'m arrogant." Confirming "is this really OK?" too often actually makes the other party nervous.',
            earningStrategy: 'Weaponize risk management. Compliance, due diligence, safety—your "danger-detection" skills are highly valued. Convert anxiety into specialization.'
        },
        motivationKillers: [
            'Rules that change constantly with no anchor to believe in',
            'Untrustworthy leadership whose instructions shift daily',
            'A zero-tolerance-for-failure atmosphere where you can\'t take risks'
        ]
    },
    'T7': {
        type: 'T7',
        name: 'Enthusiasm (Excited)',
        motivation: 'A drive for joy—"I want to experience everything and stay happy"',
        description: `
An engine that chases new experiences and soaks up life's possibilities.
You avoid pain and boredom, always planning the next exciting adventure.
Overflowing with ideas, you pull others into thrilling new projects.
        `.trim(),
        growthAdvice: 'Instead of always chasing "something better," commit deeply to what\'s in front of you. True freedom and satisfaction hide within the process of going deep on one thing.',
        strengths: ['Optimism', 'Idea generation', 'Adventurousness', 'Versatility'],
        weaknesses: ['Restlessness', 'Avoidance', 'Poor planning', 'Commitment phobia'],
        values: ['Freedom', 'Fun', 'Possibility', 'Experience'],
        stressBehavior: 'You may act impulsively to escape discomfort, overcommitting to too many things until nothing gets finished.',
        stressManual: {
            signs: [
                'Sudden urge to start new hobbies or plans. Your Amazon wishlist doubles overnight',
                'Can\'t focus on one thing—task-switching every 30 minutes with everything half-done',
                'Zoning out during conversations. Nodding along while your mind is racing through other plans'
            ],
            ngActions: [
                'Impulse shopping or binge eating—trying to overwrite bad feelings with "fun" solves nothing underneath',
                'Packing your schedule completely. The emptiness of free time becomes the fear, and booking becomes the goal',
                'Literally running away. If you suddenly start planning a vacation, ask yourself what you\'re running from'
            ],
            recovery: {
                quick: '10 deep breaths. Practice sitting with boredom or discomfort instead of fleeing. Just staying present is enough',
                medium: 'Write down every active project, then pick only 3. Everything else is officially "not doing"—courage required',
                full: 'A full day offline. No new information, no new stimulation. Just "here and now." Befriend boredom for a day'
            },
        },
        loveStyle: {
            fallingPattern: 'Falls for anyone who makes life feel like an adventure. "What should we do next?" flowing non-stop on a first date = fully hooked.',
            attachmentType: 'All-in on sharing fun, but struggles with heavy emotions. "Cheer up, let\'s go eat something good!" is genuine but lands as "you\'re not taking my feelings seriously."',
            breakTrigger: 'Routine and boredom are the biggest threat. Feeling trapped by rules ("we MUST see each other every weekend") triggers rapid cooling. When love ends, it\'s shockingly clean—only the partner is left behind.'
        },
        careerRisk: {
            trapPattern: 'Interest scatters and nothing gets completed. Chasing "the next fun thing" leads to a résumé full of short stints.',
            quitTrigger: 'Accumulated boredom and constraints. "Same thing every day" plus "no freedom to move" triggers a sudden "I quit" that feels positive to you but looks like déjà vu to everyone else.',
            prevention: 'Commit to at least 2 years upfront. When boredom hits, don\'t leave—find "new games" within the current role. Side projects can also satisfy curiosity.'
        },
        moneyStyle: {
            lossPattern: 'Scatters money following interests—courses, tools, certifications—each abandoned halfway. Paying for "possibility" without returns.',
            negotiationHabit: 'Too optimistic and settles with "eh, fine" the moment tension appears. Lacks negotiation stamina.',
            earningStrategy: 'Sell your ability to create excitement—event planning, community building, entertainment. Portfolio-style multiple income streams suit you best.'
        },
        motivationKillers: [
            'Pure routine work with no room for new challenges',
            'Detailed rules and approval processes that kill speed',
            'A negative team culture where "it\'ll never work" is the mantra'
        ]
    },
    'T8': {
        type: 'T8',
        name: 'Command (Power)',
        motivation: 'A drive for control—"I want to shape my own destiny and influence others"',
        description: `
An engine that carves its own path, seeking impact on people and environments.
You value strength and despise showing weakness.
Even in adversity, you lead powerfully and protect those under your wing.
        `.trim(),
        growthAdvice: 'Strength and gentleness can coexist. Admitting weakness and relying on others isn\'t defeat—it\'s the first step toward genuine trust. Empower, don\'t dominate.',
        strengths: ['Decisiveness', 'Leadership', 'Confidence', 'Passion'],
        weaknesses: ['Intimidation', 'Controlling', 'Denying vulnerability', 'Confrontational'],
        values: ['Power', 'Justice', 'Autonomy', 'Influence'],
        stressBehavior: 'When you feel out of control, you may become aggressive and try to force outcomes, leading to isolation.',
        stressManual: {
            signs: [
                'Your voice gets louder, tone turns commanding. You don\'t notice, but others start tensing up',
                '"I can\'t delegate this" expands to cover more and more. You hoard tasks and overwhelm yourself',
                'Trivial things trigger explosive anger. An email that\'d normally roll off your back takes 30 minutes to reply to'
            ],
            ngActions: [
                'Using intimidation to maintain control. Raised voices and slammed desks create compliance, not loyalty',
                'Equating rest with weakness. "Things fall apart without me" might be arrogance, not fact',
                'Finding enemies to fight. The real enemy isn\'t external—it\'s your fear of vulnerability'
            ],
            recovery: {
                quick: 'Delay your email/chat response by 5 minutes. Anger peaks at 6 seconds—breathe through it',
                medium: 'Intense physical activity—gym, boxing, running. Channel the combat energy into physical release',
                full: 'Solitude in nature. Mountains and oceans show you how small the things you can control actually are—and that realization brings peace'
            },
        },
        loveStyle: {
            fallingPattern: 'Attracted to equals who push back. You prefer someone who stands their ground over someone who submits. Falling happens when you spot gentleness inside strength.',
            attachmentType: 'Your protective instinct can become overprotective. "Leave it to me" takes on everything, and your partner responds with "I\'m not a child." You want to show vulnerability but "must be strong" won\'t let you.',
            breakTrigger: 'Betrayal or cowardice. If someone you protected talks behind your back or runs from adversity, trust collapses. "Not worth protecting" is the most painful conclusion, but you\'ll leave without saying it.'
        },
        careerRisk: {
            trapPattern: 'Dominance destroys teams. "Follow me" leadership delivers short-term results but drives talent away. Eventually only yes-men remain.',
            quitTrigger: 'When organizational walls can\'t be moved no matter how hard you fight. You head toward independence or entrepreneurship. "Being employed" itself is stressful.',
            prevention: 'Know the line between "strong" and "scary." Practice asking reports "What do you think?" Trusting and delegating ultimately enlarges your capacity.'
        },
        moneyStyle: {
            lossPattern: 'Preference for directness serves you, but forcefulness can backfire. "This is the fair price" intimidates and negotiations can stall.',
            negotiationHabit: '"Take it or leave it"—and you\'ll actually leave. Strong on the push, weak on the pull. Finding win-win landing zones is difficult.',
            earningStrategy: 'Monetize your protective strength—management, crisis response, security. Choose positions with enough authority to match your drive.'
        },
        motivationKillers: [
            'Zero autonomy—every decision requires approval from above',
            'Weak-willed leadership letting the organization drift aimlessly',
            'A culture where injustice and unfairness go unchallenged'
        ]
    },
    'T9': {
        type: 'T9',
        name: 'Harmony (Peace)',
        motivation: 'A drive for peace—"I want calm and harmony, inside and out"',
        description: `
An engine that avoids conflict and strives to maintain inner and outer peace.
Accepting and unprejudiced, you have the power to mediate and integrate diverse opinions.
You value living naturally, going with the flow without forcing anything.
        `.trim(),
        growthAdvice: 'Stop settling for "whatever." Express your opinions and anger clearly. Avoiding self-assertion to prevent conflict leads to passive aggression and disengagement. Assert your presence more boldly.',
        strengths: ['Acceptance', 'Peacefulness', 'Patience', 'Harmony'],
        weaknesses: ['Conflict avoidance', 'Procrastination', 'Passive aggression', 'Lack of assertiveness'],
        values: ['Peace', 'Harmony', 'Stability', 'Naturalness'],
        stressBehavior: 'Under pressure, you may shut down, escape into distractions, and become stubbornly immovable.',
        stressManual: {
            signs: [
                'You know what you should do but can\'t start. YouTube and games eat hours instead',
                '"I don\'t mind" increases when asked your opinion. You actually DO mind, but thinking about it feels exhausting',
                'Anger accumulates silently, then detonates without warning. Even you are shocked by the explosion—followed by deep regret'
            ],
            ngActions: [
                'Pretending problems don\'t exist. "It\'ll work itself out" isn\'t optimism—it\'s a sign you lack the energy to face things',
                'Endlessly bending to others\' priorities. "You decide" on repeat until you lose track of what YOU want',
                'Passive aggression—expressing unspoken frustration through attitude or silent treatment, slowly poisoning relationships'
            ],
            recovery: {
                quick: 'Decide one thing you want right now. It can be small—"I want tea." Noticing your own desire is the practice',
                medium: 'A long bath with favorite music. Soaking in comfort gradually thaws frozen emotions',
                full: 'A solo outing to a place you love. No compromising with anyone. Walking, eating, gazing at YOUR pace restores the self you\'d lost'
            },
        },
        loveStyle: {
            fallingPattern: 'Attracted to people who bring calm. Not dramatic romance—someone whose presence naturally relaxes you. Love doesn\'t "strike" but seeps in like warm water. By the time you notice, it\'s already deep.',
            attachmentType: 'Stability-seeking but prone to over-accommodating. "What do you want for dinner?" "Anything\'s fine." All decisions—dates, weekends—deferred to partner. Hidden resentment accumulates under "if you\'re happy, I\'m happy."',
            breakTrigger: 'Being ignored or treated as invisible hurts most. Yelling is better than not being heard at all. Years of "fine, whatever" suddenly snap—even you didn\'t see it coming. "I guess I stopped loving them" is the quiet realization.'
        },
        careerRisk: {
            trapPattern: 'Staying in comfortable positions too long. "No real complaints" masks "afraid to change." Peers pass you by while you remain in place.',
            quitTrigger: 'Years of suppressed frustration rupture without warning. Colleagues are stunned—they never guessed the "quiet one" was at breaking point.',
            prevention: 'Start small: voice your opinion. Pick the lunch restaurant, say one thing in a meeting. Exercising your voice moves your career too.'
        },
        moneyStyle: {
            lossPattern: '"It\'s fine as is" replaces negotiation entirely. Many have never attempted salary negotiation. "Better than fighting" costs you significantly over time.',
            negotiationHabit: 'The negotiation table is painful. "Either way is fine" escapes your lips and you accept whatever\'s offered before even stating your preference.',
            earningStrategy: 'Monetize your harmony-keeping ability—facilitator, mediator, project manager. The skill to hear everyone and synthesize is genuinely rare and valuable.'
        },
        motivationKillers: [
            'A high-conflict, competitive, tense environment',
            'Being treated as invisible—your presence ignored',
            'Being rushed and unable to work at your own pace'
        ]
    }
};

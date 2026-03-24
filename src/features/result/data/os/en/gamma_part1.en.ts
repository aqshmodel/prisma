
import type { OSContent } from '../types';

export const GammaOS_Part1_EN: Record<string, OSContent> = {
    'ESFp': {
        code: 'ESFp',
        name: 'The Politician (SEE)',
        catchphrase: 'A born negotiator who wields connections and power to reach the top',
        hashTag: '#BornNegotiator',
        aruaru: [
            'You click with strangers instantly. "You never seem shy, do you?" is a constant refrain',
            'You read emotions with thermometer-level accuracy—but tend to use that skill for manipulation',
            'When you want something, your persistence is relentless. "Giving up" isn\'t in your dictionary',
            'Boring environments make you visibly irritable—fast. No stimulation = bad mood',
            'Fashion and beauty are serious business. "First impressions are everything" is a genuine belief',
            'You express gratitude and affection candidly. For people you love, you give without reserve',
        ],
        description: `
With an approachable smile and sharp observational eye, this **master of human relations** slips into anyone's inner circle and builds a powerful network in the blink of an eye.
Life is an exciting game of figuring out who to team up with and how to move for maximum advantage.
Faithfully following desire, you pursue what you want with tenacious energy—yet somehow never get resented, thanks to an irresistible charm.
Your genius for reading the room and delivering exactly the words someone wants to hear makes you unrivaled in negotiation and persuasion.
On the flip side, logical consistency and rule-following aren't your thing, and you have a knack for changing promises on a whim based on mood.
        `.trim(),
        strength: `
・**Overwhelming interpersonal influence**: You befriend strangers in seconds and turn them into fans. Your diplomacy can convert even enemies into allies.
・**Lightning-fast situation reading**: You grasp power dynamics and stakeholder interests instantly, spot the key player, and find the shortest route to your goal.
・**Boldness and flexibility**: Unafraid of failure, you think on your feet and tackle one new challenge after another. Your adaptability to change is exceptional.
        `.trim(),
        weakness: `
・**Lack of planning**: Long-term thinking is a struggle. You jump at in-the-moment emotions or gains, then find consistency falling apart later.
・**Blurring boundaries**: Professional and personal lines get fuzzy. You may let personal likes and dislikes drive personnel decisions or bend rules.
・**Avoiding deep thought**: Complex theories or abstract concepts get dismissed as "boring and useless," leading you to proceed with shallow understanding.
        `.trim(),
        communication: `
Acknowledge their **presence and influence.**
"I'm asking YOU because you're the one who can do it" and "Impressive as always" feed their self-esteem effectively.
Rather than pointing out rigid logic or minor errors, keep the mood upbeat and fun—that's the real secret to success with them.
        `.trim(),
        leadershipStyle: 'Big Boss Leader: Moves people through personal trust and charisma. Takes good care of subordinates while demanding absolute loyalty.',
        decisionMaking: '"Do I want it?" and "Does it benefit my relationships?" are the criteria. Prioritizes gut feeling and personal likes over logic. Decides instantly—but may change course later.',
        bestMatch: 'INTp',
        worstMatch: 'ESFj',
        doCommunication: [
            'Compliment their appearance, fashion, and taste',
            'React enthusiastically—"Amazing!" "So cool!"—and keep the energy up',
            'Skip the fine logic—just show results or take action first'
        ],
        dontCommunication: [
            'Cornering them with "That\'s logically inconsistent" or "Show me the data"',
            'Ignoring their story or looking bored',
            'Drenching the mood with future risks and negative forecasts'
        ],
        color: 'yellow-500',
        params: {
            analysis: 3,
            innovation: 5,
            empathy: 9,
            execution: 9,
            adaptability: 9
        },
        workStyle: {
            mission: 'To expand your influence, involve many people, and seize success',
            style: '**Social & Active**. You\'d rather be out meeting people and negotiating than chained to a desk. Excellent at multitasking, you always have multiple deals spinning simultaneously.',
            motivation: '"Status" and "attention." Being treated as the central figure, standing out, and acquiring material abundance drive you forward.',
            management: 'A skilled motivator who draws out subordinates\' energy. "I know you can do it" gets them moving. But your moods change, so directions may shift—subordinates can feel whiplashed.',
            bestRoles: [
                { title: 'Sales / Account Executive', reason: 'Your innate ability to read psychology and use masterful persuasion to close deals.' },
                { title: 'PR / Public Relations', reason: 'Your network-building skills and talent for planting attractive images in media and public minds.' },
                { title: 'Producer', reason: 'Your negotiation power gathers diverse talent, launches projects, and muscles them to success.' }
            ],
            ngEnvironments: [
                'Desk-centric work with no opportunities to meet people',
                'Rigid rule-bound organizations that restrict freedom of movement',
                'Cultures where logic and data alone decide everything—no room for relationships'
            ],
            idealBoss: 'A boss who properly values your social skills and gives you a stage. Someone who says "This worked because of your connections" and acknowledges your influence. Micromanagers are suffocating.',
            idealSubordinate: 'Someone upbeat who can match your energy. A subordinate who says "Let\'s go!" with genuine enthusiasm gets your full support. But since your directions change often, flexibility is a must.',
            sideProjects: [
                { title: 'Influencer / Social Media Content', reason: 'Your natural magnetism translates directly.' },
                { title: 'Personal Stylist / Buyer', reason: 'Your trend-spotting eye and taste find a perfect outlet.' },
                { title: 'Networking Event Organizer', reason: 'Connecting people is your absolute specialty.' }
            ],
            teamBehavior: 'The team\'s mood-maker. "Come on, let\'s just try it" turns discussions into action. Great at keeping meetings lively, but weak on detailed minutes and follow-up. Expert at drawing out real talk "over drinks after work."',
            workEnergyPattern: 'Extrovert recharged by human contact. Mornings without appointments are slow, but having a meeting scheduled ignites the engine instantly. Night owl—after-5 networking events are your prime time.'
        },
        psychology: {
            coreDesire: 'To be loved, and to be free',
            stressResponse: 'When freedom is taken or you\'re ignored, fierce anger erupts. You may lash out at those around you, or cope through impulse shopping or binge eating.',
            recoveryMethod: 'Socializing and having fun. Throw a party, go drinking, take a trip. Noisy, energetic places recharge your batteries.',
            flowState: 'When a deal is going your way, or when you\'re the center of a group making everyone laugh. You feel like the protagonist of the world.',
            blindSpot: '**Logical consistency** and **time management.** Promises made on impulse get forgotten, double-bookings happen—sloppy management becomes a breeding ground for trouble.'
        },
        relationships: {
            communicationStyle: 'Friendly and forward. Close personal space, generous with physical contact. Skilled at showering compliments and making others feel great.',
            partnerQuality: 'You seek a **wise, quiet partner** who calmly stops your runaway train and gives intellectual advice. You respect and depend on someone who has the "deep insight" you lack.',
            conflictTrigger: 'Having your behavior restricted or being subjected to boring lectures triggers an explosion. Once you label someone "uptight" or "boring," you avoid them relentlessly.',
            advice: 'Your charm is a supreme weapon, but it can be mistaken for "superficiality." Building basic trust through keeping promises and being on time will make your popularity unshakable.',
            friendshipStyle: 'Anyone who brings fun is welcome as a friend. Your warmth lets you blend into any group. Often the life of parties and events—"It\'s always more fun when they\'re here." However, heavy emotional talks aren\'t your thing; you tend to dodge weighty topics.',
            familyRole: 'The family\'s "sunshine." You brighten any atmosphere instantly—a lifesaver when the family mood is dark. A natural charmer with parents, retaining youngest-child energy. Household chores and management aren\'t strengths, earning frequent "Get it together" comments. As a parent, you\'re a genius playmate—kids\' favorite.'
        },
        growth: {
            level1: {
                title: 'Keeping Promises',
                content: 'Stop accepting commitments on impulse. Only promise what you can keep—then keep it at all costs. Your trust balance will steadily grow.'
            },
            level2: {
                title: 'Reinforce with Logic',
                content: 'Build the habit of backing impulse with numbers and data. If you can\'t do it alone, find a trusted "strategist" to check your work.'
            },
            level3: {
                title: 'Noble Leader',
                content: 'Use your immense influence not for personal gain, but for your team and society. With charm AND substance, you become the leader everyone can\'t help but love.'
            },
            actionItems: [
                { level: 1, title: 'Schedule Management', description: 'Use a calendar app to manage appointments—eliminate double-bookings.' },
                { level: 1, title: 'Practice Saying "No"', description: 'Stop being all things to all people. Have the courage to clearly decline what you can\'t do.' },
                { level: 2, title: 'Hire a Strategist', description: 'Find a calm, critical-eyed partner who can handle the detailed calculations and planning you dislike.' },
                { level: 2, title: 'Consistency Check', description: 'Before speaking, take one second to ask: "Does this contradict what I just said?"' },
                { level: 3, title: 'Altruistic Spirit', description: 'Go out of your way for someone in need—even when there\'s nothing in it for you.' }
            ]
        },
        verbalHabits: {
            phrases: [
                'That sounds fun! Let\'s do it, let\'s do it!',
                'Ooh, that\'s so cool! Love it!',
                'Come on, it\'ll work out somehow',
                'Live in the now!',
                'We\'ll figure out the hard stuff later'
            ],
            innerVoice: [
                'I wonder what they think of me…',
                'What should I wear next? First impressions matter',
                'This bored vibe is unbearable. I need to change the atmosphere'
            ],
            triggerWords: [
                'Make a proper plan first',
                'That\'s kind of shallow, you know',
                'Maybe calm down a bit?'
            ]
        }
    },
    'INTp': {
        code: 'INTp',
        name: 'The Critic (ILI)',
        catchphrase: 'A sage who foresees the end of all things and quietly points to the optimal solution',
        hashTag: '#SageOfOptimization',
        aruaru: [
            '"That probably won\'t work" predictions are so accurate you\'re treated as a prophet',
            'You always assume the worst-case scenario—others call you pessimistic, apparently',
            'Talking with uninteresting people is agony. You can\'t see the end of the energy drain, so you escape to the restroom',
            'You\'re great at explaining "why it happens" but freeze when asked "so what should we do?"',
            'Watching inefficiency physically pains you, but you keep it to yourself',
            'Lying in bed thinking is pure bliss. You look idle, but your mind is at full throttle',
        ],
        description: `
A **detached strategist** who sees through surface phenomena to the underlying laws and causalities.
The world runs on predictable patterns, and you can accurately read historical flows and future risks.
Highly intelligent and erudite, you carry a nihilistic lens of "it's pointless anyway," tending to avoid proactive action.
Yet your sharp, critical advice is unerringly accurate—making you the ultimate advisor (consigliere) for impulsive leaders.
Outwardly reserved and often seen as cold, you harbor a quiet, deep passion within.
        `.trim(),
        strength: `
・**Future forecasting and risk avoidance**: You think long-term, predict worst-case outcomes, and present preventive measures before disaster strikes.
・**Intelligence that pierces the core**: With vast knowledge and keen insight, you instantly spot lies, inconsistencies, and systemic flaws that escape everyone else.
・**Pursuit of efficiency**: You despise wasted effort and inefficient processes, deriving the "optimal solution" for maximum results from minimum input.
        `.trim(),
        weakness: `
・**Lack of action**: Your analysis and critique are impeccable, but you become the "armchair critic"—reluctant to actually roll up your sleeves and execute.
・**Pessimism**: You default to cynicism, pouring cold water on new challenges and passionate momentum with "It'll fail anyway."
・**Poor emotional expression**: Communicating your feelings or giving empathetic responses is difficult, making your communication feel cold and bureaucratic.
        `.trim(),
        communication: `
Respect their **intelligence and expertise.**
Don't appeal to emotions—build trust through logical discussion and intellectual exchange.
"I'd like your advice" and "I want to hear your thoughts" will coax them off the bench to share brilliant wisdom.
        `.trim(),
        leadershipStyle: 'Strategic Advisor: Rather than waving the flag up front, the behind-the-scenes whisper-in-the-ear type. Points the way forward with data and logic.',
        decisionMaking: '"Will it profit?" and "Is the risk acceptable?" are the criteria. Strips out emotion and wishful thinking, judging on cold calculation. Takes time to decide.',
        bestMatch: 'ESFp',
        worstMatch: 'INTj',
        doCommunication: [
            'When their prediction or analysis proves right, acknowledge it: "You called it"',
            'Respect their need for quiet thinking time—maintain comfortable distance',
            'Discuss with concrete facts and data; if a logical inconsistency exists, own it'
        ],
        dontCommunication: [
            'Demanding "Cheer up!" or "Smile!"—forcing emotional display',
            'Subjecting them to endless shallow small talk or illogical pep talks',
            'Springing sudden schedule changes or dragging them into chaotic events'
        ],
        color: 'slate-500',
        params: {
            analysis: 10,
            innovation: 6,
            empathy: 2,
            execution: 3,
            adaptability: 5
        },
        workStyle: {
            mission: 'To eliminate inefficiency, optimize systems, and create lasting value',
            style: '**Quiet & Analytical**. You need a solo environment for deep focus, working at your own pace. Noisy offices and constant phone calls devastate your productivity.',
            motivation: '"Knowledge" and "efficiency." Having your intellectual curiosity satisfied, and seeing systems you designed actually run without waste, brings genuine joy.',
            management: 'Laissez-faire. Giving detailed instructions feels tedious, so your stance is "deliver results and I don\'t care how." Zero emotional support for subordinates.',
            bestRoles: [
                { title: 'Data Analyst / Strategist', reason: 'Your intellect excels at extracting meaningful patterns from massive data to build winning strategies.' },
                { title: 'Programmer / Systems Engineer', reason: 'Your aptitude for constructing logical structures and building bug-free, efficient systems.' },
                { title: 'Investor / Finance Professional', reason: 'Your ability to coolly analyze market trends and calculate risk-reward to steadily grow assets.' }
            ],
            ngEnvironments: [
                'Loud, crowded open-plan offices',
                'Environments where decisions are made on emotion, not logic',
                'Cultures that demand "just try it" without any analysis'
            ],
            idealBoss: 'A logical, intellectually capable boss you can have real debates with. Someone who says "Your analysis was right" and values your intellect. Emotional cheerleader bosses or "be more energetic" types are unbearable.',
            idealSubordinate: 'Someone who thinks independently and acts. Giving detailed instructions is too much bother—"I\'ll point the direction, you handle the rest." Emotional personal consultations cause you to freeze.',
            sideProjects: [
                { title: 'Investing / Asset Management', reason: 'Your analytical power translates directly into returns.' },
                { title: 'Blog / Analytical Writing', reason: 'Deep analysis preserved in writing brings genuine satisfaction.' },
                { title: 'Board Game / Strategy Game Design', reason: 'The joy of designing complex systems.' }
            ],
            teamBehavior: 'The team\'s consigliere. Rarely in the spotlight, but "That won\'t work" from you is startlingly accurate. You speak little in meetings, but when you do, the room goes silent. Facilitator role? Impossible.',
            workEnergyPattern: 'Total indoors type. People drain your energy, so mornings are for solo focus. Afternoon meetings should be avoided if possible. Late-night solo thinking is your most productive time.'
        },
        psychology: {
            coreDesire: 'To understand, and to have peace',
            stressResponse: 'Under emotional pressure, you retreat into your shell and reject others with cynical detachment. "You can\'t reason with fools" runs through your mind as you lower the mental shutters.',
            recoveryMethod: 'Solitude. Meet no one, read books, play games, immerse in hobbies. Intellectual energy recharges in isolation.',
            flowState: 'When solving a complex problem or absorbing knowledge in a field you love. Your brain runs at full speed and time vanishes.',
            blindSpot: '**Others\' feelings** and **physical health.** You may crush someone in a debate without noticing, or ruin your health through sedentary neglect.'
        },
        relationships: {
            communicationStyle: 'Wry and terse. But when you do speak, it cuts to the heart of the matter. Often sounds critical, but it\'s actually your way of trying to improve the situation.',
            partnerQuality: 'You seek a **bright, assertive partner** who drags you into the outside world and injects vitality. You\'re attracted to someone with the "action" and "passion" you lack, and secretly welcome being led.',
            conflictTrigger: 'Being shouted at or subjected to emotional meltdowns is your worst nightmare. Having your knowledge mocked or intellectual pride wounded stays with you for a long time.',
            advice: 'You\'re wise, but at risk of overthinking. While you wait for the perfect timing, opportunities slip away. Sometimes you need the "foolishness" to abandon calculation and take one intuitive step forward.',
            friendshipStyle: 'Friends must match your intellectual level. You can\'t endure trivial conversation, so the filter is naturally strict. Very few friends, but fierce loyalty to those who pass. "Quiet drinks for two" is your ideal friendship format. At group gatherings, you observe from the corner—or leave early.',
            familyRole: 'The "independent observer" within the family. You care deeply but are disastrously bad at showing it. Even when visiting, you tend to hole up in your room. Emotional interference from parents is uncomfortable—you want distance. In parenting, you encourage intellectual inquiry through constant "Why?" questions, but need to consciously increase physical affection.'
        },
        growth: {
            level1: {
                title: 'Restraining Criticism',
                content: 'Practice finding something to praise before pointing out flaws. Being right alone doesn\'t move people. Work on the "gift wrapping" of how you deliver truth.'
            },
            level2: {
                title: 'Converting to Action',
                content: 'Don\'t stop at analysis—commit to getting your hands dirty and producing results. Even failures are valuable "data points." Increasing your trial count is the fastest route to success.'
            },
            level3: {
                title: 'The Sage\'s Legacy',
                content: 'Systematize your knowledge and preserve it for posterity—or use your wisdom to guide the young as an educator. Your deep insight becomes humanity\'s shared asset.'
            },
            actionItems: [
                { level: 1, title: 'Positive Statements', description: 'Once a day, consciously voice an optimistic outlook or affirming opinion.' },
                { level: 1, title: 'Exercise Habit', description: 'Your head works overtime—force at least 20 minutes of daily walking to move your body.' },
                { level: 2, title: '"Just Start" Mindset', description: 'Even when the plan isn\'t perfect, adopt the experimental attitude of "just try it."' },
                { level: 2, title: 'Express Gratitude', description: 'Say "thank you" for emotional support and thoughtfulness—not just logical contributions.' },
                { level: 3, title: 'Publish Your Work', description: 'Compile your expertise and deep analysis into blog posts or papers and share them with the world.' }
            ]
        },
        verbalHabits: {
            phrases: [
                'That\'s going to fall apart eventually',
                'We should be looking further ahead, I think',
                '…Nah, let\'s not',
                'Based on the data, at least',
                'I feel like everyone\'s being way too optimistic'
            ],
            innerVoice: [
                'Why does no one consider the risk? Can they not see the danger?',
                'Exhausted from socializing. I need alone time',
                'There\'s a hole in that person\'s logic… should I point it out?'
            ],
            triggerWords: [
                'You\'re overthinking it! Lighten up!',
                'Don\'t be so pessimistic',
                'Try doing something without a strategy for once'
            ]
        }
    }
};

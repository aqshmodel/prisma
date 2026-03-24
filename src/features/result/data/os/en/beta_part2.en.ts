
import type { OSContent } from '../types';

export const BetaOS_Part2_EN: Record<string, OSContent> = {
    'ESTp': {
        code: 'ESTp',
        name: 'The Conqueror (SLE)',
        catchphrase: 'An indomitable fighter who overpowers adversity and achieves the objective',
        hashTag: '#IndomitableFighter',
        aruaru: [
            '"Just do it" is your catchphrase. Your body moves before a plan forms',
            'Your competitive drive is off the charts. Games, sports, debates—you can\'t rest until you win',
            'Danger raises your excitement. The worse the pinch, the better you perform',
            'Roundabout explanations and social niceties are hard. "So what?" slips out constantly',
            'You push through illness by sheer force. Showing weakness is unacceptable',
            'You unconsciously read power dynamics. Who\'s the boss and who follows—you know within seconds of meeting',
        ],
        description: `
No matter how dire the situation, this **ultimate field commander** pries open a breakthrough with ironclad will and overwhelming action.
Life is a "battle," and victory—tangible, visible results—brings intense satisfaction.
You strategize complex plans while simultaneously leading from the front lines without hesitation.
Being told "It's impossible" makes you burn hotter; obstacles are removed by brute force if necessary.
Your charisma as a leader pulls hesitant followers along, but you show zero mercy toward those who whine or make excuses.
        `.trim(),
        strength: `
・**Overwhelming breakthrough power**: No wall stops you. You deploy every available means with mental toughness fueled by adversity itself.
・**Sharp tactical eye**: You assess the situation in a flash and instinctively know "where to strike to win NOW." You seize opportunities and take the shortest path to the goal.
・**Commanding leadership**: With clear directives and an almost fearsome authority, you can instantly organize a disorderly crowd into a disciplined unit.
        `.trim(),
        weakness: `
・**Forceful unilateralism**: In pursuit of objectives, you may ignore consensus and bulldoze forward, provoking backlash.
・**Lack of sensitivity**: Understanding delicate emotions isn't your strength. You may inadvertently hurt people or dismiss vulnerability as "coddling."
・**Neglect of long-term perspective**: Over-focusing on "how to win NOW" makes you miss future risks, ethical concerns, and sustainability.
        `.trim(),
        communication: `
Approach with **conclusions and confidence.**
Meet their eyes, speak assertively, and deliver the point concisely—that's the key to earning their trust.
Vague attitude, hesitant voice, or excuse-making signals "weakness" to them—and marks you as prey.
        `.trim(),
        leadershipStyle: 'Boss-type Leader: Dominates the organization with overwhelming force, pulling subordinates forward. "Follow me"—and those who deliver are richly rewarded.',
        decisionMaking: '"Can we win?" and "Will it profit?" are the criteria. Unafraid of risk, aims for high returns. Decides instantly based on instinct and experience.',
        bestMatch: 'INFp',
        worstMatch: 'INFj',
        doCommunication: [
            'Cut straight to the conclusion—skip unnecessary preamble',
            'Praise their ability and track record directly and show respect',
            'Bring tough problems to them for advice—they love being relied upon'
        ],
        dontCommunication: [
            'Arguing back with "but" or "because" at every turn',
            'Subjecting them to long, inconclusive stories or emotional venting',
            'Actions that encroach on their territory or challenge their authority'
        ],
        color: 'red-600',
        params: {
            analysis: 7,
            innovation: 4,
            empathy: 2,
            execution: 10,
            adaptability: 8
        },
        workStyle: {
            mission: 'To complete impossible missions and reach the top through sheer ability',
            style: '**Powerful & Reactive**. Sitting still is torture—you\'re always moving, always directing. You show your true worth in high-pressure competition and emergency response.',
            motivation: '"Victory" and "dominance." Beating rivals, crushing tough targets, standing at the top—that\'s the thrill. You prefer work where results are visible in numbers.',
            management: 'Strict but fiercely protective. Pure meritocracy—high performers get elevated regardless of age, but anyone deemed incompetent is cut immediately.',
            bestRoles: [
                { title: 'CEO / Entrepreneur', reason: 'Your fearless decision-making and driving force cut through uncertain markets.' },
                { title: 'Sales Manager', reason: 'Your ability to rally a team and strategically conquer markets toward ambitious targets.' },
                { title: 'Crisis Manager', reason: 'Your leadership keeps its cool in chaos and resolves situations through sheer force of will.' }
            ],
            ngEnvironments: [
                'Bureaucratic environments where rules and paperwork kill speed',
                'Egalitarian systems where effort and apathy receive equal recognition',
                '"Read the room" and "get everyone\'s consensus" cultures'
            ],
            idealBoss: 'A boss who recognizes ability and promotes it. "Deliver results, any way you choose" is the perfect stance. You\'re loyal to anyone you consider stronger, but won\'t follow a timid leader.',
            idealSubordinate: 'Someone with the initiative to execute orders immediately. Excuses and complaints aren\'t accepted—but someone who says "Let me take that on" gets your full backing.',
            sideProjects: [
                { title: 'Sports Coach / Trainer', reason: 'Helping people who want to win—win—is deeply motivating.' },
                { title: 'Real Estate / Business Investment', reason: 'Taking risks and winning brings pure excitement.' },
                { title: 'Advisor / Consultant', reason: 'Being relied upon as a "trusted boss figure."' }
            ],
            teamBehavior: 'The team\'s commanding officer. In meetings: "What\'s the conclusion?" "So what do we do?" forces quick decisions. Hates drawn-out meetings—"Let\'s decide this in 3 minutes." Meetings end up shorter as a result.',
            workEnergyPattern: 'Full power all day—remarkable toughness. Morning to afternoon with zero drop in pace. However, desk-only days leave energy to spare. You come alive when you\'re in "the field."'
        },
        psychology: {
            coreDesire: 'To win, and to dominate',
            stressResponse: 'When things don\'t go your way, fierce anger erupts. You lash out at those around you—shouting, using authority to force submission. Internal anxiety is never shown to others.',
            recoveryMethod: 'Physical activity or winning a competition. Sweating through sports or dominating a game releases stress.',
            flowState: 'When locked in a razor-thin contest, or commanding a large project with everyone moving at your will. A feeling of omnipotence.',
            blindSpot: '**People\'s hearts** and **future costs.** Obsessed with winning, you may not notice your allies are hurt, or fail to foresee the consequences of forceful tactics.'
        },
        relationships: {
            communicationStyle: 'Tends toward intimidating, command-like speech. Loud voice, definitive phrasing. No malice—that\'s simply their "normal conversation."',
            partnerQuality: 'You seek a **gentle, slightly mysterious partner** who acknowledges your strength while offering spiritual peace. You\'re drawn to someone who introduces you to inner worlds you\'ve never explored.',
            conflictTrigger: 'Whining and tears irritate you. People who disobey your directives or scheme behind your back are absolutely intolerable.',
            advice: 'You\'re strong, but strength alone doesn\'t earn lasting loyalty. Occasionally remove the armor, show a vulnerability, or even just pretend to care about someone\'s feelings—your command will grow even stronger.',
            friendshipStyle: 'Friends are "action buddies." Drinking, sports, travel—bonds built through shared experience. Long calls and emotional talks aren\'t your thing, but your back says "Come to me when you\'re in trouble." Deeply loyal—favors are always returned. Many drinking buddies, but very few who see your true heart.',
            familyRole: 'The family\'s "protector." Ready to do anything to defend your family, though love is expressed through actions—earning money, solving problems—not words. Expressing affection verbally is extremely difficult. Parenting philosophy: "Be strong." But you have your moments of softness too.'
        },
        growth: {
            level1: {
                title: 'The Art of Listening',
                content: 'Build the patience to hear others out fully instead of dominating the conversation. Simply asking "What do you think?" will dramatically improve the cooperation you receive.'
            },
            level2: {
                title: 'Long-term Perspective',
                content: 'Look beyond immediate victories—factor in returns 3 and 5 years out. When you grasp the advanced strategy of "losing now to win later," you become unstoppable.'
            },
            level3: {
                title: 'The Merciful King',
                content: 'Evolve from ruling by force to leading with virtue. When your immense energy is used to protect the weak and pursue justice, true greatness is achieved.'
            },
            actionItems: [
                { level: 1, title: 'Practice Patience', description: 'Hold off on instant decisions—use the option of "sleeping on it." Reduce impulsive judgment errors.' },
                { level: 1, title: 'Soften Your Tone', description: 'Replace "Do it" with "Could you do this?" Make requests instead of commands.' },
                { level: 2, title: 'Accept a Loss', description: 'In small matters, deliberately lose a debate or let someone else take credit.' },
                { level: 2, title: 'Future Forecasting', description: 'Build the habit of asking yourself: "How will this action affect things one year from now?"' },
                { level: 3, title: 'Find a Mentor', description: 'Seek someone stronger than you, or a sage with completely different values. Learn humility.' }
            ]
        },
        verbalHabits: {
            phrases: [
                'Just shut up and try it',
                'If you have time to think, you have time to move',
                'This is wild, right?',
                'Eh, we\'ll figure it out',
                'Enough boring talk—let\'s go'
            ],
            innerVoice: [
                'Ugh, so dull. I need some stimulation',
                'I already see that person\'s weakness',
                'Results are everything—not theories'
            ],
            triggerWords: [
                'Maybe we should be a bit more careful…',
                'Let\'s think about this theoretically',
                'Consider other people\'s feelings too'
            ]
        }
    },
    'INFp': {
        code: 'INFp',
        name: 'The Visionary (IEI)',
        catchphrase: 'A dreamer who reads the flow of time and gives voice to the depths of the human heart',
        hashTag: '#DreamerPoet',
        aruaru: [
            'Lost in a completely different thought at random moments. "Are you listening?" is a familiar refrain',
            'Your intuition is eerily accurate. "I just had a feeling" predictions come true and stun everyone',
            'Your threshold for crying at music or movies is abnormally low. You\'ve cried on the train',
            'Self-care is hard—meals and sleep rhythms are chaotic. "I forgot to eat" is perfectly normal',
            'Choosing the right words takes time. You rewrite LINE replies multiple times and end up responding late',
            'You see the future so clearly that you can\'t start on what needs doing today. "Someday" is your mantra',
        ],
        description: `
Standing slightly apart from the world's noise, this **poet of the soul** quietly observes life's transitions and the subtleties of human emotion.
What matters isn't the visible facts, but the "meaning" and "premonition" behind them.
You possess an intuitive ability to foresee how events will unfold—your "I just have a feeling about this" predictions hit with startling accuracy.
Your heart is delicate and easily wounded, yet you also empathize profoundly with others' pain, offering gentle presence to those in despair.
Deadlines and competition stress you, but in creative expression and healing work, you radiate a singular brilliance.
        `.trim(),
        strength: `
・**Foresight and prophecy**: You sense shifts in cultural mood and trends through your skin, intuitively predicting what will trend and what will happen next.
・**Deep empathy**: You detect unspoken sadness and suffering, offering spiritual solace rather than logical solutions.
・**Adaptability and flexibility**: Like water, you change shape and blend naturally into any person or environment. You navigate the world by avoiding conflict with refined social grace.
        `.trim(),
        weakness: `
・**Lack of execution**: Gifted at articulating dreams and ideals, but short on the energy to translate them into concrete action. Many visions end as fantasy.
・**Mood swings**: Intense emotional waves create extreme gaps between productive and unproductive days. You may sink into melancholy and become unable to function for days.
・**Weakness to conflict**: Faced with harsh criticism or direct attack, you choose flight over fight. Procrastinating on real-world problem-solving often makes things worse.
        `.trim(),
        communication: `
Respect their **sensitivity and worldview.**
Speak gently and calmly, and be careful not to disrupt their pace.
"Be efficient" or "Face reality" will corner them and drive them into their shell.
        `.trim(),
        leadershipStyle: 'Soft Power Leader: Attracts people through charm and vision rather than authority, exerting influence gently. Moves the organization through atmosphere and feeling.',
        decisionMaking: '"How does it feel?" and "What future do I see?" are the criteria. Trusts intuition and premonition over logic. Tends to postpone decisions, waiting for the right timing (destiny).',
        bestMatch: 'ESTp',
        worstMatch: 'ESTj',
        doCommunication: [
            'Show genuine interest in their unique expressions and poetic word choices; demonstrate empathy',
            'Say "No rush" and give them the time and space to relax',
            'Enjoy conversations about abstract ideas, the spiritual world, and art together'
        ],
        dontCommunication: [
            'Commanding loudly or approaching with an intimidating attitude',
            'Harshly pursuing minor numerical errors or schedule delays',
            'Dismissing their dreams and premonitions outright as "unrealistic"'
        ],
        color: 'purple-400',
        params: {
            analysis: 2,
            innovation: 9,
            empathy: 9,
            execution: 2,
            adaptability: 8
        },
        workStyle: {
            mission: 'To give people dreams and healing, restoring spiritual richness',
            style: '**Own-pace & Creative**. Unbound by clocks, you work in concentrated bursts when the mood strikes. You prefer atmospheric settings—cafés or home—over sterile offices.',
            motivation: '"Aesthetic sense" and "spiritual connection." You find fulfillment in creating what you find beautiful and in knowing you\'ve touched someone\'s heart. Selling your soul for money is unthinkable.',
            management: 'You never force competition, instead respecting subordinates\' autonomy and sensibility. However, your instructions may be too abstract—"What am I supposed to do?" is a common confused reaction. You excel at setting mood.',
            bestRoles: [
                { title: 'Writer / Editor', reason: 'Your sharp sensitivity to language lets you weave stories and messages that resonate deeply.' },
                { title: 'Counselor / Therapist', reason: 'You sit with pain without judgment, creating space for emotional recovery.' },
                { title: 'Artist / Designer', reason: 'Your rich inner imagery and emotions are expressed as unique visual creations.' }
            ],
            ngEnvironments: [
                'High-pressure environments relentlessly driven by quotas and deadlines',
                'Data-supremacy cultures that dismiss intuition as "groundless"',
                'Ultra-competitive organizations where people climb over each other daily'
            ],
            idealBoss: 'A gentle boss who respects your pace. "Don\'t push yourself" gives you the most safety and comfort. Under an intimidating boss, you shrink and can\'t access your true ability.',
            idealSubordinate: 'Someone with similar sensibility who resonates with your worldview. "I get it" alone gives you courage. Since giving specific instructions is hard for you, people who read the air and move accordingly are invaluable.',
            sideProjects: [
                { title: 'Fiction / Poetry / Essay Writing', reason: 'A true calling for expressing inner richness.' },
                { title: 'Divination / Spiritual Work', reason: 'A field where your intuition shines.' },
                { title: 'Music Production / DTM', reason: 'The joy of converting emotions into sound.' }
            ],
            teamBehavior: 'The team\'s atmosphere sensor. You detect someone\'s bad mood faster than anyone. Quiet in meetings, but when you do speak, you verbalize "what everyone was thinking but nobody dared say." More listener than debater.',
            workEnergyPattern: 'Large mood swings—massive difference between "on" days and "off" days. Inspiration may strike at midnight, triggering a creative sprint. Fixed schedules are tough—flextime suits you best.'
        },
        psychology: {
            coreDesire: 'To be understood, and to keep dreaming',
            stressResponse: 'When confronted with harsh reality, you retreat into fantasy. You may stay in bed all day or loop tragic music for comfort. "I want to disappear" can become a recurring thought.',
            recoveryMethod: 'Immerse in beauty. Visit a gallery, walk in nature, drown in your favorite music. Having time to forget reality purifies the soul.',
            flowState: 'When writing a story, or discussing visions of the future. A sensation of transcending time and traveling through the spiritual world.',
            blindSpot: '**Practical life skills** and **willpower.** Your room may be perpetually messy, financial management elusive—a life that struggles to stay grounded.'
        },
        relationships: {
            communicationStyle: 'Calm and enigmatic. You avoid definitive statements, preferring ambiguous phrasing like "maybe" and "perhaps." An excellent listener who naturally spots others\' best qualities.',
            partnerQuality: 'You seek a **strong, dependable partner** who steadies your unstable heart and teaches you how to fight in the real world. Someone who takes the lead and pulls you along provides deep comfort.',
            conflictTrigger: 'Rough behavior and being dragged into endless competition repel you. Having your sensibility or aesthetics dismissed as "useless" causes you to quietly close your heart.',
            advice: 'Dreaming is wonderful, but reality matters too. Instead of only relying on others, gradually build the strength to stand on your own two feet. When you stop running from the unpleasant and face it head-on, your prophetic gift becomes the power to reshape reality.',
            friendshipStyle: 'You seek "soul twins" in friends. Surface-level chitchat is painful—only people who feel like they "truly understand the real me" qualify. Few in number but ocean-deep in bond. Communication rides your mood waves; you may suddenly send a long, letter-like message. Alone time is also sacred.',
            familyRole: 'The family\'s "emotional interpreter." You\'re the first to sense when someone in the family is struggling. Yet you often can\'t voice your own troubles—even to family. You tend to idealize parents, then feel disappointed by the real ones. In parenting, you cherish children\'s inner worlds, constantly telling them "It\'s OK to be yourself."'
        },
        growth: {
            level1: {
                title: 'Introducing Routine',
                content: 'Instead of riding your mood waves, create a minimal routine. Just fixing your "wake-up time" dramatically improves mental stability.'
            },
            level2: {
                title: 'Practical Problem-Solving',
                content: 'When problems arise, resist the urge to escape into fantasy. Build the habit of asking "What can I do RIGHT NOW?" Small actions accumulated are the only cure for anxiety.'
            },
            level3: {
                title: 'Prophet of the Age',
                content: 'Transcend personal daydreams to become a visionary who charts the future for society. Your intuition becomes a compass for people navigating turbulent times.'
            },
            actionItems: [
                { level: 1, title: 'Daily TODO List', description: 'Write down only 3 tasks for today and finish them all. Experience the feeling of completion.' },
                { level: 1, title: 'Movement', description: 'Walk or do yoga—physical motion anchors your mind (fantasy) to your body (reality).' },
                { level: 2, title: 'Speak Definitively', description: 'Practice replacing "I think maybe…" with "It is." Take ownership of your words.' },
                { level: 2, title: 'Start the Unpleasant Task', description: 'Spend just 5 minutes on a task you\'ve been postponing.' },
                { level: 3, title: 'Publish Your Work', description: 'Share a piece of writing or creation that expresses your inner world—without embarrassment—and receive feedback.' }
            ]
        },
        verbalHabits: {
            phrases: [
                'I feel something… fateful about this, you know?',
                'It might be too hard for me, but…',
                'Something feels… off, somehow',
                'It\'s OK—I\'m here for you',
                '…Yeah, sure, I guess'
            ],
            innerVoice: [
                'The world is so beautiful—why can\'t anyone else see it?',
                'If I show the real me, would they pull away…?',
                'Behind that smile, I can see sadness'
            ],
            triggerWords: [
                'You\'re overthinking this',
                'Face reality',
                'You think too much'
            ]
        }
    }
};

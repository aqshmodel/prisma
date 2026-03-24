
import type { OSContent } from '../types';

export const DeltaOS_Part1_EN: Record<string, OSContent> = {
    'ESTj': {
        code: 'ESTj',
        name: 'The Supervisor (LSE)',
        catchphrase: 'A field commander who upholds tradition, efficiency, and unwavering quality',
        hashTag: '#FieldCommander',
        aruaru: [
            '"I do what I say, and when I say it, I do it." Walk the talk is your life motto',
            'Your irritation toward people who miss deadlines is impossible to hide. It shows on your face',
            'Even on days off, you wake up early. "Doing nothing" is so hard you end up cleaning the house',
            '"I already told you that" comes up a lot. Your memory is too good—you remember exactly what people said',
            'You trust proven methods over new approaches. "What\'s the track record?" slips out automatically',
            'You\'re great at doing things for others, but terrible at verbalizing gratitude. You show it through action',
        ],
        description: `
A **genius of diligence** who is the walking definition of hard work and integrity.
The world, in your view, must be maintained through proper procedure and relentless improvement—laziness and irresponsibility are your greatest enemies.
Extremely practical, you prioritize "real-world practice over armchair theory." You are a professional who obsesses over every detail to deliver top-quality results.
You protect family and subordinates as people under your care, though your affection often comes as "nagging" or "guidance"—which can feel overbearing.
You don't know how to rest. Being constantly in motion and working is your default state.
        `.trim(),
        strength: `
・**Overwhelming operational ability**: No one surpasses you at organizing complex processes, cutting waste, and keeping systems running efficiently.
・**Uncompromising quality**: "If I'm doing it, I'm doing it perfectly." Your no-compromise work ethic earns absolute trust from everyone around you.
・**Reliable caretaking**: Despite grumbling, you can't leave struggling colleagues or family alone—you always show up with concrete solutions.
        `.trim(),
        weakness: `
・**Micromanagement**: Well-intentioned corrections become "my way is the right way" impositions on others.
・**Anxiety about the future**: Intangible predictions and abstract change trigger excessive worry, making you extremely risk-averse.
・**Unable to rest**: Relaxation doesn't come naturally. Even on weekends you pack in chores and errands, eventually collapsing from exhaustion.
        `.trim(),
        communication: `
Approach with **respect and specificity.**
Prepare before consulting—clearly communicate what you need and how. That's the secret to smooth dialogue.
Acknowledging their track record and years of hard work with appreciative words softens even their most stubborn stance.
        `.trim(),
        leadershipStyle: 'Hands-on Supervisor Leader: Works alongside the team, leading by example. Gives specific, detailed instructions with genuine passion for developing subordinates.',
        decisionMaking: '"Is it practical?" and "Is the quality high?" are the criteria. Values past successes and proven methods. Always chooses the safest, most reliable path.',
        bestMatch: 'INFj',
        worstMatch: 'INFp',
        doCommunication: [
            'Express gratitude for specific actions: "Thank you, that was a huge help"',
            'Show care for how hard they work—treat them to a massage or a nice meal',
            'Ask for advice on work procedures and planning'
        ],
        dontCommunication: [
            'Giving loose answers like "Good enough" or "I\'ll get to it later"',
            'Being late to commitments or leaving responsibilities unattended',
            'Pitching baseless dreams or unrealistic investment schemes'
        ],
        color: 'emerald-600',
        params: {
            analysis: 8,
            innovation: 3,
            empathy: 5,
            execution: 10,
            adaptability: 4
        },
        workStyle: {
            mission: 'To produce the highest quality work and maintain stable social infrastructure',
            style: '**Diligent & Quality-first**. You prefer working in an organized environment with systematic plans. Good at handling emergencies, but dislike unplanned changes.',
            motivation: '"Quality" and "stability." Satisfaction comes from having your work highly evaluated and living a rich, stable life.',
            management: 'Strict but a genuine educator who cares about subordinates\' growth. No detail escapes your eye, but you fairly recognize improvement. You despise slackers.',
            bestRoles: [
                { title: 'Manager / Director', reason: 'Your detailed grasp of on-the-ground situations and optimal resource allocation drive projects to success.' },
                { title: 'Chef / Craftsperson', reason: 'Uncompromising quality standards and stamina for perfecting daily routines.' },
                { title: 'Finance / Real Estate Management', reason: 'Your steadiness and risk management ability protect and steadily grow assets.' }
            ],
            ngEnvironments: [
                'Environments where speed is prioritized over quality and "good enough" is acceptable',
                'Organizations with vague instructions and frequent "just figure it out"',
                'Cultures where political savvy trumps effort and merit'
            ],
            idealBoss: 'A boss who\'s equally diligent and quality-focused. "This is the standard, follow it" — clear criteria are ideal. You can\'t stand bosses who slack off or break promises. If they share your work ethic, you give maximum loyalty.',
            idealSubordinate: 'Someone who executes instructions precisely and meets deadlines. If they say "I\'ll do it," they actually do it—that earns your trust. "Is \'good enough\' OK?" gets the reply "What does \'good enough\' even mean?"',
            sideProjects: [
                { title: 'DIY / Renovation', reason: 'The joy of hands-on quality pursuit.' },
                { title: 'Cooking Classes / Recipe Development', reason: 'A channel for sharing your quality obsession.' },
                { title: 'Budgeting / Frugality Advisor', reason: 'Systemize practical household knowledge.' }
            ],
            teamBehavior: 'The team\'s field supervisor. You meticulously track task progress and never let quality slip. In meetings, you push toward "So, specifically, what do we do?" action plans. Light on small talk, but the go-to person when someone\'s in trouble.',
            workEnergyPattern: 'Early-morning steady runner. Full power from dawn, maintaining pace until evening. Resting is uncomfortable—doing nothing triggers guilt. Needs to deliberately schedule rest as a "work task."'
        },
        psychology: {
            coreDesire: 'To be useful, and to elevate quality',
            stressResponse: 'When things go off-plan or your instructions are ignored, irritation rises and the nagging increases. Worst case, you erupt into shouting that intimidates everyone around you.',
            recoveryMethod: 'Eating well and getting quality sleep. Satisfying the five senses relieves stress. Saunas and hot springs work wonders.',
            flowState: 'When work is progressing smoothly and producing outstanding results. Or on weekends, fully immersed in a DIY project or cooking.',
            blindSpot: '**Sense of time** and **others\' feelings.** When absorbed in a task, you lose track of time. Your righteous logic can corner people without you realizing it.'
        },
        relationships: {
            communicationStyle: 'Frank and a touch preachy. But behind those words lies deep affection. You don\'t do flattery—you deliver truth as it is.',
            partnerQuality: 'You seek a **gentle, modest partner** who worries about your overwork and provides spiritual healing. You cherish and protect someone who has the "moral depth" you lack.',
            conflictTrigger: 'You can\'t tolerate laziness or people who talk big but don\'t act. Having your methods dismissed as "outdated" wounds your pride and triggers anger.',
            advice: 'You\'re a tireless worker, but the people around you don\'t have your stamina. Instead of demanding the same pace from colleagues and family, learn to enjoy "doing nothing" time—that\'s the secret to sustainability.',
            friendshipStyle: 'Friends are "trusted, proven allies." Bonds deepen through completing projects or overcoming challenges together. You trust promise-keepers and gradually fade out last-minute cancelers. You like friendships to run "on schedule"—surprises not needed. Regular dinner gatherings are preferred.',
            familyRole: 'The family\'s "field supervisor." You\'re the reliable one who handles home repairs, insurance renewals, and school paperwork. You manage the family\'s rhythm—emphasizing "early rising, greetings, tidiness." Filial piety is shown through action. In parenting, you value discipline, but need flexibility for children\'s "Why?" questions.'
        },
        growth: {
            level1: {
                title: 'Securing Rest',
                content: 'Tell yourself "Rest is part of the job" and force white space into your schedule. Letting go of the guilt of doing nothing is the first step toward mental growth.'
            },
            level2: {
                title: 'The Art of Delegation',
                content: 'Even when "I could do it faster myself," deliberately assign it and let people fail. Developing people is a more valuable investment than completing tasks yourself.'
            },
            level3: {
                title: 'The Great Patron',
                content: 'Step back from the front lines to watch over and nurture the next generation of leaders. Your vast experience and wisdom become lasting organizational assets.'
            },
            actionItems: [
                { level: 1, title: 'No-Overtime Day', description: 'Leave on time once a week and create space where you don\'t think about work at all.' },
                { level: 1, title: 'The 60% Standard', description: 'For trivial chores and errands, stop chasing perfection—60% is good enough.' },
                { level: 2, title: 'Talk About the Future', description: 'Beyond daily operations, discuss long-term dreams—"Where do we want to be next year?"—with your partner.' },
                { level: 2, title: 'Praise Habit', description: 'Before pointing out flaws, start by praising one good thing about the person.' },
                { level: 3, title: 'Community Contribution', description: 'Use your skills to participate in local activities or volunteering—give back to society.' }
            ]
        },
        verbalHabits: {
            phrases: [
                'This is how it should be done',
                'What\'s the deadline?',
                'Let\'s start with fact-checking',
                'That\'s in the manual, by the way',
                'Explain to me WHY that happened'
            ],
            innerVoice: [
                'At this rate, we\'ll miss the deadline… I need to move',
                'I can\'t understand why people don\'t follow the rules',
                'If I don\'t do it, who will? No choice'
            ],
            triggerWords: [
                'Good enough is fine',
                'Being a little late isn\'t a big deal, right?',
                'You don\'t need to try that hard…'
            ]
        }
    },
    'INFj': {
        code: 'INFj',
        name: 'The Humanist (EII)',
        catchphrase: 'A compassionate counselor who heals pain and guides spiritual growth',
        hashTag: '#CompassionateCounselor',
        aruaru: [
            'You\'re so sensitive to emotional shifts that riding a crowded train alone exhausts you',
            'You notice "that person seems to be hurting" but spend 30 minutes debating whether to say something',
            '"Is that right as a personal value?" is your lens for everything. Cost-benefit thinking isn\'t your thing',
            'Expressing anger is impossibly hard. When it overflows, tears come before words',
            'Animals and children gravitate to you naturally. "They always warm up to you" is a constant comment',
            'Putting your feelings into words takes time. You have a habit of processing through journaling',
        ],
        description: `
A **purifier of souls** who combines deep empathy with a high ethical compass.
In your ideal world, people understand and help each other—you truly despise conflict and hatred.
Extraordinarily sensitive, you feel others' emotions as your own, making it impossible to ignore someone in pain.
You often make self-sacrificing choices to avoid conflict and maintain harmony, and your inability to say "no" can be exploited.
A stoic seeker who pursues moral ideals and constantly desires spiritual growth within yourself.
        `.trim(),
        strength: `
・**Empathy and acceptance**: You embrace the heaviest worries and suffering without judgment. Countless people feel saved simply by talking to you.
・**Relationship mediation**: Skilled at stepping between conflicting parties, hearing both sides, and finding resolution. You are the linchpin of organizational peace.
・**Ethical compass**: You constantly ask "What is right as a human being?" serving as the organization's conscience that prevents profit-seeking from going off the rails.
        `.trim(),
        weakness: `
・**Weak self-assertion**: Fear of hurting others by voicing your opinion leads you to swallow what you want to say, accumulating stress.
・**Indecisiveness**: Searching for the option that satisfies everyone takes forever, earning you criticism for being wishy-washy.
・**Poor practical coping**: Handling competition, negotiation, and financial maneuvering—the "dirty" realities—is beyond your comfort zone. Tough environments break your spirit.
        `.trim(),
        communication: `
Respect their **goodwill and feelings.**
Speak in a calm tone—intimidation is strictly forbidden.
"You saved me" and "You're so kind" are the words that encourage them most.
        `.trim(),
        leadershipStyle: 'Servant Leader: Earns trust not through authority but by serving and supporting subordinates. Revered as a spiritual guide.',
        decisionMaking: '"Will nobody be hurt?" and "Is it ethically right?" are the criteria. Keeps discussing until everyone is satisfied, so speed is slow. Harmony always before efficiency.',
        bestMatch: 'ESTj',
        worstMatch: 'ESTp',
        doCommunication: [
            'Say "thank you" frequently for their kindness and consideration',
            'Provide a peaceful, conflict-free environment',
            'Respect their pace and never rush their decisions'
        ],
        dontCommunication: [
            'Shouting or using violent language',
            'Scolding harshly with "That\'s inefficient" or "Stop being soft"',
            'Gossiping or badmouthing others in their presence'
        ],
        color: 'sky-400',
        params: {
            analysis: 5,
            innovation: 4,
            empathy: 10,
            execution: 2,
            adaptability: 6
        },
        workStyle: {
            mission: 'To heal hearts and build a society filled with mutual understanding',
            style: '**Quiet & Harmony-first**. You prefer quiet, non-competitive environments where you can engage deeply with one person at a time. Quota-driven, speed-obsessed workplaces are your hell.',
            motivation: '"Gratitude" and "self-growth." Feeling that you\'ve helped someone and watching your own spiritual maturation bring happiness.',
            management: 'A trust-based leader who believes in people. You don\'t blame mistakes—you work together on improvement. However, you\'re defenseless against malicious subordinates and risk being exploited.',
            bestRoles: [
                { title: 'Counselor / Psychologist', reason: 'Your empathy reaches people\'s deepest psychology, guiding them toward root-level healing.' },
                { title: 'Librarian / Curator', reason: 'Preserving and sharing culture and knowledge in intellectual quiet brings spiritual fulfillment.' },
                { title: 'Teacher / Instructor', reason: 'Your patience and belief in each student\'s potential make you a natural educator.' }
            ],
            ngEnvironments: [
                'Fiercely competitive cultures where people tear each other down',
                'Quota-driven, speed-first workplaces with no time to truly connect with people',
                'Ethically bankrupt organizations where dishonest people prosper'
            ],
            idealBoss: 'A gentle boss who meets you at your level. "Don\'t push yourself" is a single phrase that saves you. An intimidating, anger-prone boss will break your heart. Someone who respects your inner world is ideal.',
            idealSubordinate: 'Someone honest who doesn\'t lie. You embrace subordinates who can say "Actually, I\'m struggling." Since your instructions tend to be abstract, you appreciate people who ask "So you mean this, right?"',
            sideProjects: [
                { title: 'Counseling / Psychology Content', reason: 'Your talent for sitting with people\'s hearts translates directly.' },
                { title: 'Essay / Journal Writing', reason: 'Practice putting your inner world into words.' },
                { title: 'Picture Books / Children\'s Content', reason: 'Your natural empathy with children shines.' }
            ],
            teamBehavior: 'The team\'s conscience. You\'re the first to notice when someone is suffering, but you spend so long agonizing over whether to say something that time passes. In meetings, you often become the mediator who absorbs both sides to avoid conflict.',
            workEnergyPattern: 'Recharges slowly in quiet environments. After deep one-on-one interactions, you need alone time. Most productive during quiet mornings; afternoon interpersonal work drains all energy.'
        },
        psychology: {
            coreDesire: 'To be in harmony, and to be good',
            stressResponse: 'Conflict and attacks cause intense distress. You may cry uncontrollably, or conversely numb your emotions and go "blank." Self-blame—"It\'s my fault"—comes easily.',
            recoveryMethod: 'Being alone. In a space where you don\'t need to consider anyone, reading or meditating restores inner peace.',
            flowState: 'When someone thanks you after you\'ve listened to their problems, or when you gain deep insight into the spiritual world. A soul-shaking experience.',
            blindSpot: '**Your own needs** and **physical assertiveness.** Living too much for others, you lose yourself. Unable to decline when you should, you end up being taken advantage of.'
        },
        relationships: {
            communicationStyle: 'Reserved and an excellent listener. You rarely talk about yourself but listen to others with genuine care. Word choice is meticulous—you take great pains not to wound.',
            partnerQuality: 'You seek a **sincere, hardworking partner** who protects your weaknesses and handles practical problems. You feel deep gratitude for—and devote yourself to—someone with the "execution" and "reliability" you lack.',
            conflictTrigger: 'Rough behavior and bullying are absolutely unforgivable. Usually gentle, you resist injustice with quiet but unwavering resolve.',
            advice: 'Kindness is a virtue, but you also need the strength to protect yourself. Learn that saying "no" isn\'t rejecting someone—it\'s respecting yourself. Only when YOU are happy can you make others happy.',
            friendshipStyle: 'Friends must connect at the soul\'s deepest level. Few in number, but each relationship is irreplaceable. Your empathy feels friends\' pain as your own—but this can drain you. Cherished as someone whose "mere presence is healing." You prefer one-on-one over groups.',
            familyRole: 'The family\'s "emotional cushion." You mediate conflicts and voice each person\'s unspoken feelings. You feel your family\'s happiness as your own, but excessive self-sacrifice leads to burnout. You try to be the "good child" for parents—sometimes delaying your rebellious phase. In parenting, you gently receive every emotion your child expresses.'
        },
        growth: {
            level1: {
                title: 'Setting Boundaries',
                content: 'Draw a mental line: "I\'ll do this much, but no further." Separating others\' problems from your own prevents burnout.'
            },
            level2: {
                title: 'Expressing Your Will',
                content: 'Practice stating your opinion clearly. Showing you\'re willing to fight when necessary reduces the unfair treatment you receive.'
            },
            level3: {
                title: 'Guide of Souls',
                content: 'Transcend individual counseling to become a spiritual leader who rights society\'s ethical compass. Your deep love and wisdom become a beacon of hope for a wounded world.'
            },
            actionItems: [
                { level: 1, title: 'Practice Declining', description: 'Even for small requests, build the experience of saying "I can\'t do that" when it\'s true.' },
                { level: 1, title: 'Emotion Journal', description: 'Write your feelings—including negatives—in a notebook as they are. Acknowledge your own emotions.' },
                { level: 2, title: 'Express Displeasure', description: 'When something bothers you, don\'t mask it with a smile. Say "I don\'t like that" with a straight face.' },
                { level: 2, title: 'Practical Solutions', description: 'When someone comes for advice, don\'t just empathize—ask "So what do we do?" and co-create an action plan.' },
                { level: 3, title: 'Share Your Philosophy', description: 'Share your vision of an ideal world through essays and talks—put your beliefs out into the public.' }
            ]
        },
        verbalHabits: {
            phrases: [
                'Everyone has something precious to them',
                'I wish the world could be a kinder place',
                'If there\'s anything I can do',
                'You don\'t have to push yourself, you know',
                '…Yeah. I feel something. I can\'t put it into words, though'
            ],
            innerVoice: [
                'What are they really feeling deep down?',
                'If I just endure it, everything will be fine… is what I keep telling myself',
                'The gap between ideals and reality is painful'
            ],
            triggerWords: [
                'That\'s just idealism',
                'You should probably be more pragmatic',
                'You\'re making too big a deal of it'
            ]
        }
    }
};

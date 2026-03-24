
import type { OSContent } from '../types';

export const BetaOS_Part1_EN: Record<string, OSContent> = {
    'ENFj': {
        code: 'ENFj',
        name: 'The Mentor (EIE)',
        catchphrase: 'A charismatic director who stirs souls and leads the crowd into a whirlwind of passion',
        hashTag: '#CharismaticDirector',
        aruaru: [
            'When you start talking, the air in the room shifts. For better or worse, you can\'t NOT be noticed',
            'When a friend confides a problem, you empathize even harder than they do. You\'re drained by the time you get home',
            'A constant sense of mission: "I have to do something about this situation." You can\'t rest even when told to',
            'Your social media posts are unconsciously dramatic—you narrate daily life like a novel',
            'Energetic in front of people, but the moment you\'re alone, the battery dies. The on-off switch is extreme',
            'You\'re great at finding words to encourage others—but terrible at encouraging yourself',
        ],
        description: `
A born **theatrical leader** who can move thousands with a single word or expression.
Life is an epic drama, and you are both the lead and the director.
You inject intense "meaning" and "passion" into mundane daily life, possessing the power to propel those around you toward a vision.
Beyond reading emotional subtleties, you amplify them and hack the collective mood—a quality shared with religious leaders and revolutionaries.
However, your emotional energy can overflow: you may cast yourself as the tragic protagonist over trivial matters, or drag everyone into dramatic turmoil.
        `.trim(),
        strength: `
・**Overwhelming expressiveness**: In presentations and speeches, you seize the audience's emotions. You have a gift for putting soul into words.
・**Insight into people**: You instantly read what someone needs and which words will move them, shape-shifting like a chameleon to win hearts.
・**Guiding toward the future**: Even in hardship, you speak of hope and function as a motivator who pushes team morale to its limits.
        `.trim(),
        weakness: `
・**Excessive dramatization**: You may blow up small mistakes or conflicts into world-ending events, exhausting everyone around you.
・**Disinterest in operational detail**: Brilliant at articulating visions, but extremely weak at—and quickly bored by—paperwork and hands-on tasks.
・**Ignoring physical limits**: You prioritize emotional highs over food and sleep, sometimes working (or playing) until you collapse.
        `.trim(),
        communication: `
Resonate with their **vision and emotions.**
"I'm moved" and "Your words gave me motivation" are their highest rewards.
Conversely, delivering cold facts in a businesslike tone or splashing cold water with "Calm down" or "You're overreacting" deeply wounds their pride.
        `.trim(),
        leadershipStyle: 'Mentor Leader: Raises a vision and nurtures each member\'s spiritual growth. Unifies the group\'s ideology and creates passionate followers.',
        decisionMaking: '"Does it have historical significance?" and "Is it emotionally right?" are the criteria. Prefers dramatic options. Decides less by logic, more by whether the story makes the heart tremble.',
        bestMatch: 'ISTj',
        worstMatch: 'ISTp',
        doCommunication: [
            'Praise their presentations and expressions with specific, heartfelt feedback',
            'Discuss grand dreams and ideals together, sharing emotional excitement',
            'Quietly support them with the detailed admin and scheduling they struggle with'
        ],
        dontCommunication: [
            'Interrupting mid-story with "What\'s the point?" or "Where\'s the data?"',
            'Mocking their passionate behavior as "theatrical" or "fake"',
            'Forcing them into solo, monotonous, unchanging routine work'
        ],
        color: 'purple-600',
        params: {
            analysis: 4,
            innovation: 8,
            empathy: 10,
            execution: 3,
            adaptability: 6
        },
        workStyle: {
            mission: 'To ignite people\'s hearts and spark movements that change the world',
            style: '**Dramatic & Emotional**. You shine on stage and in lively debate—not in quiet offices. You engage projects from multiple angles, switching between various personas (masks) rather than sticking to one role.',
            motivation: '"Making an impact." You want to feel that your words change people, transform organizations, and move eras. Your soul dies in behind-the-scenes work where nobody notices you.',
            management: 'A guru-like boss who captures hearts and creates devoted followers. You\'ll stay up until midnight counseling a subordinate\'s problems, but show a cold side toward traitors or unmotivated team members.',
            bestRoles: [
                { title: 'PR / Spokesperson', reason: 'Your expressive power shines as the face of an organization, winning public empathy and support.' },
                { title: 'Talent Development / Training Facilitator', reason: 'Your talent for drawing out potential and shifting mindsets makes you a natural mentor.' },
                { title: 'Creative Director', reason: 'You create services and products that carry stories that stir emotions—not just functionality.' }
            ],
            ngEnvironments: [
                'Environments where decisions are purely logical and human emotions are dismissed',
                'Work that keeps you behind the scenes with zero opportunities to be seen',
                'Dry cultures that dismiss passion and inspiration as "irrational"'
            ],
            idealBoss: 'A boss who recognizes your vision and gives you a stage. Someone who says "Your words changed the team" and values your influence. You thrive under a boss who grants wide autonomy, not one who micromanages.',
            idealSubordinate: 'Followers who resonate with your vision and say "I\'m with you." But yes-men alone aren\'t enough—someone who says "I\'ll handle the execution" and reliably delivers is ideal.',
            sideProjects: [
                { title: 'Public Speaking / Motivational Speaker', reason: 'Speaking in front of people is itself an energy source.' },
                { title: 'Writing / Column Author', reason: 'Your talent for moving hearts through words translates directly.' },
                { title: 'NPO / Social Activism', reason: 'Satisfies your desire to "change the world."' }
            ],
            teamBehavior: 'The team\'s spiritual pillar. When morale drops, you reignite it with "We can do this." High talk-time in meetings—logs can fill up with your words. Tendency to overdo the drama is the weakness.',
            workEnergyPattern: 'You draw energy from people, but crash the moment you\'re alone. Full power for interpersonal work in the morning; sharp drop during afternoon desk time. Solo time after work is essential recovery.'
        },
        psychology: {
            coreDesire: 'To express, and to make an impact',
            stressResponse: 'When ignored or unnoticed, you may take provocatively attention-seeking actions. Under extreme stress, you\'re consumed by loneliness—"Nobody understands me"—withdrawing while muttering grievances.',
            recoveryMethod: 'Emotional catharsis. Crying at a sad movie, talking all night with friends, performing on stage—having an outlet to explode your emotions purifies you.',
            flowState: 'When speaking before a crowd and becoming one with the audience. Or in the moment of creating emotionally powerful expression—writing, acting, video.',
            blindSpot: '**Practical details** and **physical limits.** Burning with ideals, you may miss budget or schedule breakdowns, or push until you physically collapse.'
        },
        relationships: {
            communicationStyle: 'Dramatic, heavy on metaphor and exaggeration. Even casual conversation is narrated like a scene from a play. You\'re not lying—it\'s your subjective truth.',
            partnerQuality: 'You seek a **calm, disciplined partner** who absorbs your emotional storms and provides realistic structure. You place absolute trust in someone who says "I understand what you mean, but here\'s reality."',
            conflictTrigger: 'Having your feelings belittled or being boxed into "normal people do X" sparks rebellion. Cynicism and sarcasm also provoke fierce counterattack.',
            advice: 'Your emotions are a powerful weapon, but running at full power constantly burns those around you. By occasionally turning down the emotional volume and speaking quietly, your words will reach deeper into people\'s hearts.',
            friendshipStyle: 'You seek "soul resonance" in friends. Surface-level relationships get cut quickly; you treasure a small number who share raw honesty. You naturally become the group leader and everyone\'s counselor—but carry an unspoken loneliness because you can\'t show YOUR vulnerabilities. Betrayal is unforgivable.',
            familyRole: 'The family\'s "spiritual pillar." Everyone leans on you in hard times, but the weight can crush you. You tend to project ideals onto parents—"You should do more." Passionate in child-rearing, deeply involved in children\'s growth, with strong opinions on educational philosophy.'
        },
        growth: {
            level1: {
                title: 'Landing in Reality',
                content: 'Don\'t just paint grand visions—take the "mundane first step" toward making them real. Discipline like straightening your shoes and being on time transforms charisma into the genuine article.'
            },
            level2: {
                title: 'Emotional Restraint',
                content: 'Instead of expressing every emotion immediately, learn to hold it and let it "age." Restrained emotion carries more persuasive power than an explosion.'
            },
            level3: {
                title: 'Prophet of the Age',
                content: 'Transcend personal emotion to become a voice for the zeitgeist. Your words become society\'s compass, a lighthouse guiding many toward a better future.'
            },
            actionItems: [
                { level: 1, title: 'Body Care', description: 'Listen to your body over your emotions. No matter how exhilarated you feel, sleep on schedule and eat nutritious food.' },
                { level: 1, title: 'Complete Admin Tasks', description: 'Don\'t dump expense reports and daily logs on others—finish them on time yourself and own the small win.' },
                { level: 2, title: 'Use Silence', description: 'Practice intentional pauses in conversation. Master controlling the room with "space" rather than volume of words.' },
                { level: 2, title: 'Verify the Facts', description: 'When tempted to dramatize, pause and ask "what are the objective facts?" Halve the exaggeration.' },
                { level: 3, title: 'Develop Successors', description: 'Don\'t let the org depend on your charisma. Leave behind a "culture" and "system" that keeps the passion burning after you\'re gone.' }
            ]
        },
        verbalHabits: {
            phrases: [
                'We can do this!',
                'This might be fate, you know',
                'Show more passion!',
                'I feel your pain—deeply',
                'Let\'s change the world. For real'
            ],
            innerVoice: [
                'How can I draw out these people\'s potential?',
                'Did the way I said that hurt them…?',
                'Nobody gets me. But I have to keep moving forward anyway'
            ],
            triggerWords: [
                'That\'s just idealism',
                'You don\'t really need to go that far',
                'Stop being so emotional'
            ]
        }
    },
    'ISTj': {
        code: 'ISTj',
        name: 'The Administrator (LSI)',
        catchphrase: 'A guardian who builds unshakable organizations with iron discipline and flawless logic',
        hashTag: '#IronGuardian',
        aruaru: [
            'Schedule changes are so hard that you decline last-minute invitations with "I have prior plans" (you don\'t)',
            'A junior\'s sloppy work bothers you so much that you redo it yourself',
            '"It\'s in the manual" is your signature line—and you\'re the one who wrote the manual',
            'Expressing emotions is hard; you show gratitude through actions. The frustration of not getting the message across is real',
            'People who break rules cause you unbearable stress. Internally, you\'re always irritated',
            'You love planning trips so much that the planning phase is the best part of the vacation',
        ],
        description: `
An **embodiment of discipline** who finds comfort when everything is in its proper place, with zero tolerance for ambiguity.
Rules aren't restraints to be endured—they're seawalls protecting the world from chaos.
With logical, meticulous thinking and an unmatched ability to execute plans precisely, once you commit to something, you see it through like a tank—no matter what.
You value organizational hierarchy and order, and take pride in fulfilling your role and responsibilities.
Jokes and unexpected surprises are not your strong suit, but in a crisis you become the most composed person in the room—calmly analyzing the situation and issuing precise directives like a trusted commander.
        `.trim(),
        strength: `
・**Flawless execution**: You plan down to the finest detail and deliver without compromise. Tasks assigned to you can be safely forgotten—they'll be done.
・**Logical organization**: You take scattered information or unclear processes and distill them into manuals and systems anyone can follow.
・**Unwavering responsibility**: You don't run from difficulty. You stand by your duties and will even take the blame to protect your team.
        `.trim(),
        weakness: `
・**Extreme inflexibility**: Clinging to rules and plans, you struggle to adapt flexibly to changing circumstances. Allowing an "exception" feels like defeat.
・**Harshness toward others**: Being strict with yourself, you demand the same discipline and perfection from others, unintentionally cornering colleagues.
・**Suspicion of the new**: You view unproven methods and unfamiliar change with deep wariness, sometimes becoming the resistance force blocking innovation.
        `.trim(),
        communication: `
Communicate with **facts and context—accurately.**
Avoid speculation or wishful thinking; speak with numbers and track records. That's the shortest path to their trust.
Promises and timeliness are absolute. Arriving late or missing a deadline is treated as a betrayal tantamount to character assassination.
        `.trim(),
        leadershipStyle: 'Commander Leader: Establishes clear chain of command and governs the organization with strict discipline. Enforces rewards and punishments, building an orderly, strong team.',
        decisionMaking: '"Does it comply with the rules?" and "Is it logically correct?" are the criteria. Values precedent and track record. Chooses the safest, most certain path. Decisive once made—but never reverses.',
        bestMatch: 'ENFj',
        worstMatch: 'ENFp',
        doCommunication: [
            'Maintain thorough reporting, communication, and consultation—keep processes transparent',
            'Execute instructions on time—or ahead of schedule—with precision',
            'Appreciate their management ability and the perfection of the systems they\'ve built'
        ],
        dontCommunication: [
            'Giving vague answers like "I\'ll wing it" or "We\'ll figure it out as we go"',
            'Breaking rules or changing procedures without clear justification',
            'Making emotional pleas or repeating excuses that don\'t hold up logically'
        ],
        color: 'slate-600',
        params: {
            analysis: 9,
            innovation: 2,
            empathy: 2,
            execution: 10,
            adaptability: 2
        },
        workStyle: {
            mission: 'To eliminate uncertainty and maintain a perfectly controlled, robust system',
            style: '**Meticulous & Completion-driven**. You prefer working in an organized environment, following clear procedures. Not a multitasker—you perfect one task before moving sequentially to the next.',
            motivation: '"Order" and "authority." You feel satisfaction when your sphere of control expands and everything proceeds according to plan. Social recognition like honors and rank are also important motivators.',
            management: 'Strict but caring. Your instructions are specific and easy to follow, and you\'re strong at protecting your people. However, subordinates who don\'t follow orders face zero mercy—handled as insubordinates.',
            bestRoles: [
                { title: 'Project Manager / Administrator', reason: 'Your ability to manage complex processes, optimize resources, and land projects on deadline is unmatched.' },
                { title: 'Quality Control / Auditing', reason: 'Your strictness maintains products and services at high standards by instantly detecting deviations.' },
                { title: 'Civil Servant / Government Official', reason: 'Executing duties fairly and precisely based on laws and regulations—supporting society\'s infrastructure—is your calling.' }
            ],
            ngEnvironments: [
                'Ambiguous rules where different people say different things',
                'Organizations where "read the room" outweighs stated policy',
                'Environments where sudden schedule changes are a daily occurrence, making planning impossible'
            ],
            idealBoss: 'A clear, consistent boss. "Do this, by this date, to this standard"—specific instructions are ideal. "Just make it work" is the worst possible directive. You swear absolute loyalty to a boss who keeps promises.',
            idealSubordinate: 'Someone who understands instructions precisely and follows them faithfully. You prefer subordinates who follow "established procedure" over "my own approach." Caution: pushing perfectionism too hard risks intimidating them.',
            sideProjects: [
                { title: 'Collection Management / Organization Consulting', reason: 'Your talent for organizing finds a direct outlet.' },
                { title: 'Manual Writing / Process Improvement', reason: 'Systematizing procedures is your ultimate specialty.' },
                { title: 'Financial Planning / Budgeting', reason: 'Your strength in managing numbers and maintaining order pays off.' }
            ],
            teamBehavior: 'The team\'s watchdog. Strict with rule-breakers, but gives full trust to those who follow through as agreed. In meetings, takes minutes, confirms decisions, and assigns tasks. Small talk is kept to a minimum.',
            workEnergyPattern: 'Steady, scheduled operation. You arrive at the same time every day and work at a constant pace. Unplanned interruptions cause stress, but on days that go according to plan, your energy never drops. Early-morning type.'
        },
        psychology: {
            coreDesire: 'To be orderly, and to be certain',
            stressResponse: 'When plans go awry or situations become uncontrollable, you experience intense anxiety. Rather than panicking, you become even more rigid—attacking others with nitpicking and fault-finding.',
            recoveryMethod: 'Organizing your environment. Cleaning your room, sorting documents, rearranging a collection. Restoring physical order restores mental order.',
            flowState: 'When executing a meticulous plan with zero deviation, or checking the integrity of complex data. You feel like a precision machine.',
            blindSpot: '**Unpredictable futures** and **others\' emotions.** You may miss emerging trends by clinging to past data, or poison team atmosphere by cornering people with "correctness."'
        },
        relationships: {
            communicationStyle: 'Concise and clear. You dislike roundabout phrasing and lead with the conclusion. Small talk doesn\'t come naturally, but once trust is established, you\'re direct, honest, and loyal for life.',
            partnerQuality: 'You secretly seek a **emotionally rich, dramatic partner** who melts your rigidity. You\'re drawn to someone who reaches through the sturdy cage of rules you\'ve built and pulls you outside.',
            conflictTrigger: 'Being lied to or having promises broken is what you hate most. Having your methods second-guessed constantly or being forced into inefficient approaches provokes fierce resistance.',
            advice: 'You\'re right, but the world doesn\'t run on logic alone. Sometimes you need "slack." Instead of white-knuckling the steering wheel, ease up a little—and you\'ll start enjoying unexpected scenery.',
            friendshipStyle: 'Friends are filtered to "trustworthy people" only. Relationships are long—many friendships span over a decade. Making new friends is hard, but once bonded, you maintain the relationship dutifully. In groups, you\'re "the one who always handles logistics." You arrive 5 minutes before the agreed time—always.',
            familyRole: 'The family\'s "pillar of stability." You support the household with steady income and a routine-driven lifestyle. Routine brings security; change meets resistance. Polite to parents, never missing holidays. Parenting is rule-based: "Keep your promises" is drilled in.'
        },
        growth: {
            level1: {
                title: 'Allowing Exceptions',
                content: 'Before saying "Rules say no," pause. Rules exist for people—people don\'t exist for rules. Flexibility is not weakness.'
            },
            level2: {
                title: 'Understanding Emotions',
                content: 'Learn that people are motivated not just by logical rewards, but by emotional buy-in. Adding one word of care for a colleague\'s "feelings" transforms your authority into charisma.'
            },
            level3: {
                title: 'The Wise Ruler',
                content: 'A leader who upholds discipline while embracing necessary change and evolving the organization. The systems you build become strong yet flexible—a lasting legacy.'
            },
            actionItems: [
                { level: 1, title: 'The 80% Rule', description: 'Not every task needs 100%. Consciously designate domains where "80% is good enough."' },
                { level: 1, title: 'Try Something New', description: 'Each week, introduce one small change—a different lunch, a different route—and practice tolerating the unfamiliar.' },
                { level: 2, title: 'Words of Gratitude', description: 'When receiving a report, don\'t just confirm facts—always add a "thank you" for the effort behind the work.' },
                { level: 2, title: 'Listen to Your Team', description: 'Before issuing instructions, ask "What do you think?" and try adopting at least one suggestion.' },
                { level: 3, title: 'Share the Vision', description: 'Beyond telling people "What to do," communicate "Why we\'re doing it"—ignite their intrinsic motivation.' }
            ]
        },
        verbalHabits: {
            phrases: [
                'That\'s what the rules say',
                'Let\'s follow the procedure',
                'Who\'s going to take responsibility for that?',
                'Get to the point',
                'We shouldn\'t change this lightly'
            ],
            innerVoice: [
                'This approach has risks… I should address them preemptively',
                'How can such basic things be this hard for people?',
                'Something\'s off. Let me double-check'
            ],
            triggerWords: [
                'Eh, it\'ll work out somehow',
                'Don\'t sweat the details so much',
                'Rules are just for show anyway'
            ]
        }
    }
};

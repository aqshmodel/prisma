
import type { OSContent } from '../types';

export const DeltaOS_Part2_EN: Record<string, OSContent> = {
    'ENFp': {
        code: 'ENFp',
        name: 'The Advocate (IEE)',
        catchphrase: 'A born motivator who believes in infinite potential and unlocks people\'s hidden talents',
        hashTag: '#BornMotivator',
        aruaru: [
            '"You can do it!" — you say it with total sincerity, while leaving your own stuff for later',
            'Your interests are so wide you can\'t explain what you "do." Bio writing is a nightmare',
            'You\'re a genius at spotting people\'s strengths—but your eagerness to tell them sometimes becomes meddling',
            'Schedule management is a lost cause. Double-booking is a chronic condition',
            'Even with strangers, you want to dive into deep topics. Surface-level drinking parties feel agonizing',
            'You have a gift for attracting life-changing encounters. Connecting people is your specialty',
        ],
        description: `
A bundle of curiosity, interested in absolutely everything—an **adventurous explorer** at heart.
Life is a journey to discover hidden possibilities and share moments of inspiration with others.
Extremely sociable, you befriend anyone instantly with an innate charm, and you excel at spotting and drawing out people's hidden talents.
Routine work and rigid schedules are your kryptonite—you're always in flight, seeking fresh stimulation and change.
You can be fickle, but your passion and abundance of ideas are a powerful catalyst for breaking through stagnation.
        `.trim(),
        strength: `
・**Discovering potential**: You instantly spot tiny opportunities and hidden qualities others overlook, encouraging people with "You can do it!"
・**Original ideas**: With unconventional, flexible thinking, you combine concepts from completely different fields to create new value.
・**Vast network**: Free of prejudice, you connect people from diverse backgrounds, becoming the hub that sparks creative chemistry.
        `.trim(),
        weakness: `
・**Lack of follow-through**: You love starting new things, but lose interest just as fast. Half-finished projects pile up.
・**Weak logical detail**: Driven by intuition and emotion, you struggle with precise calculations and logical consistency checks, inviting unexpected mistakes.
・**Emotional impulsiveness**: Your moods can shift, leading you to break promises on a whim or act impulsively, confusing those around you.
        `.trim(),
        communication: `
Find their **ideas and individuality** genuinely amusing.
"You're so unique" and "What a fascinating idea" are the ultimate compliments.
Binding them with rigid rules or crushing their dreams with "Face reality" steals their light.
        `.trim(),
        leadershipStyle: 'Inspirational Leader: Raises an exciting vision and draws out members\' motivation. Gives no micro-directives—welcomes free thinking.',
        decisionMaking: '"Is it interesting?" and "Does it excite me?" are the criteria. Bets on possibility over risk. Trusts intuition over logic for snap decisions—though may change course later.',
        bestMatch: 'ISTp',
        worstMatch: 'ISTj',
        doCommunication: [
            'Don\'t shoot down their wild ideas—ride along with "That\'s great!"',
            'Invite them to new places, trendy spots, and interesting events',
            'Empathize with their emotional stories and share the excitement'
        ],
        dontCommunication: [
            'Pressing with "Explain logically" or "Do you have data?"',
            'Forcing daily routine or unchanging, repetitive tasks',
            'Criticizing their personality or individuality as "abnormal"'
        ],
        color: 'orange-500',
        params: {
            analysis: 3,
            innovation: 10,
            empathy: 9,
            execution: 3,
            adaptability: 9
        },
        workStyle: {
            mission: 'To unlock people\'s potential and make the world more interesting',
            style: '**Free-spirited & Creative**. Set hours at a set desk is torture. Cafés, coworking spaces—you thrive working freely, whenever the mood strikes.',
            motivation: '"Novelty" and "connection." Joining new projects, meeting fascinating people, and seeing your ideas take shape bring genuine joy.',
            management: 'You relate to subordinates like friends. Great at sparking motivation, but lax on deadline and quality management—you need a detail-oriented deputy.',
            bestRoles: [
                { title: 'Marketing / Planning', reason: 'Your pulse on trends and creative ideas craft captivating promotions that grab hearts.' },
                { title: 'Journalist / Writer', reason: 'Your insatiable curiosity drives unique-angle reporting and content with a sense of mission.' },
                { title: 'Talent Scout / HR', reason: 'Your intuitive ability to read people\'s aptitudes and place them where they shine brightest.' }
            ],
            ngEnvironments: [
                'Routine-heavy environments where new ideas aren\'t welcome',
                'Bureaucratic organizations bound by detailed rules and processes',
                'Solo, silent workplaces with no human interaction'
            ],
            idealBoss: 'A boss who finds your ideas genuinely interesting. "Let\'s try that" is the ideal response. Under a boss who says "Face reality," your light fades. A wide enough vessel to give you freedom is essential.',
            idealSubordinate: 'A practical executor who turns your ideas into reality. "OK, let\'s do it this way" — someone who moves concretely is ideal. You generate ideas; they handle execution. That\'s the dream combo.',
            sideProjects: [
                { title: 'Community Building / Online Salon', reason: 'Your talent for connecting people translates directly.' },
                { title: 'Coaching / Mentoring', reason: 'The joy of unlocking others\' talents.' },
                { title: 'Podcast / Content Creation', reason: 'The more you talk, the more ideas flow.' }
            ],
            teamBehavior: 'The team\'s inspiration source. "How about this?" — you fire off ideas one after another, stimulating everyone. High talk-time in meetings with frequent tangents, but gems are buried in the detours. Task management is not your strength.',
            workEnergyPattern: 'Inconsistent type. Explosive energy when interested, but zero motion when not. Having a meeting scheduled fires up the engine. Mornings are tough—energy rises from afternoon into night.'
        },
        psychology: {
            coreDesire: 'To be free, and to be understood',
            stressResponse: 'When freedom is taken or you face constant denial, hysteria sets in. You may cry and scream, or conversely shut down completely. "I don\'t care anymore" — you may throw everything away.',
            recoveryMethod: 'Introducing new stimulation. Taking a trip, changing your hairstyle, starting a new hobby—injecting change refreshes your entire mood.',
            flowState: 'When ideas pour out in a brainstorming session, or when you instantly click with a stranger in deep conversation. A brain-sparking sensation.',
            blindSpot: '**Physical awareness** and **structural logic.** You may keep playing while ill without noticing, or try to push through a logically flawed plan on sheer momentum.'
        },
        relationships: {
            communicationStyle: 'Passionate and topic-rich. You tend to jump between subjects and sometimes drop the subject of a sentence, but listening to you is never boring. You have a generous spirit for entertaining others.',
            partnerQuality: 'You seek a **cool, dexterous partner** who finds your wild actions amusing while preparing realistic landing pads. You admire someone with "technical skill" and "composure" you lack.',
            conflictTrigger: 'Boring lectures and being forced to follow overly detailed rules trigger rebellion. "Take this seriously" earns the retort "I AM serious! (I just do it differently.)"',
            advice: 'Ideas only have value when realized. Build the "completion muscle" of finishing what you start. Creating a system to hand off to others when you lose interest is also a talent.',
            friendshipStyle: 'You choose friends by gut feel: "This person is interesting!" Genres are all over the map—you end up with friends across wildly different groups. You close distance with anyone instantly, but maintaining deep bonds is harder. Contact is sporadic—but even after six months apart, you reconnect with a bright "Long time no see!" like nothing happened.',
            familyRole: 'The family\'s "idea machine and mood-maker." Great at proposing family trips and weekend activities—though plans often fall through. Fiercely independent from parents early on, forging your own path. In parenting, you wholeheartedly affirm your children\'s dreams and potential, but tend to forget daily management (homework checks, etc.).'
        },
        growth: {
            level1: {
                title: 'Single-Point Focus',
                content: 'Before scattering your energy, discover the joy of completing ONE project. Reducing the pile of half-finished work raises your self-esteem.'
            },
            level2: {
                title: 'Building Logic',
                content: 'Instead of blurting ideas raw, build the habit of thinking through "Why does this work?" Adding logic as a weapon makes your persuasion unstoppable.'
            },
            level3: {
                title: 'Liberator of Talent',
                content: 'Move beyond personal enjoyment to become a producer who brings others\' talents into full bloom. Your intuition becomes a magic wand that discovers hidden gems and turns them into stars.'
            },
            actionItems: [
                { level: 1, title: 'Done List', description: 'Instead of a to-do list, write a "things I finished today" list and savor the sense of accomplishment.' },
                { level: 1, title: 'Phone Detox', description: 'To prevent multitasking, put your phone in another room while working. Focus on one thing.' },
                { level: 2, title: 'Structuring Practice', description: 'Before speaking, announce "I have 3 points" to force structure onto your thoughts.' },
                { level: 2, title: 'Expert Consultation', description: 'Before executing your idea, consult a domain professional and get realistic feedback.' },
                { level: 3, title: 'Community Building', description: 'Create a space where people with diverse talents can gather, interact, and co-create.' }
            ]
        },
        verbalHabits: {
            phrases: [
                'Hey hey, isn\'t this amazing?',
                'I think that person has THIS kind of potential',
                'Let\'s do it more freely!',
                'You only live once!',
                'Oh wait, let\'s try a different approach'
            ],
            innerVoice: [
                'This person doesn\'t even realize their own true charm…',
                'I jumped in again… but I just can\'t help it',
                'I need to finish this, but a new idea just popped up'
            ],
            triggerWords: [
                'Be realistic',
                'Again? You never stick with anything',
                'You\'re not a kid anymore'
            ]
        }
    },
    'ISTp': {
        code: 'ISTp',
        name: 'The Artisan (SLI)',
        catchphrase: 'A maestro who pursues functional beauty with refined skill and aesthetic sense',
        hashTag: '#MaestroOfFunction',
        aruaru: [
            'You can watch gadget and tool reviews forever. "The best thing about this is…" never stops',
            'Having your pace disrupted is peak stress. "Don\'t rush me" is the cry of your heart',
            'Dexterous hands produce high-quality DIY and cooking—but perfectionism makes everything take longer',
            'Solo action over group activity. Even travel is more comfortable alone',
            'You tinker without reading the manual. And somehow, it works out',
            'Your low emotional expression earns "I can\'t tell what you\'re thinking"—but inside, you\'re quite rich',
        ],
        description: `
A **solitary artisan** who delivers flawless work with efficient movement and outstanding technique.
What matters isn't social status or fame, but pursuing craft that meets your own standards and maintaining a comfortable living space.
Your senses are exceptionally sharp—dexterity, taste, touch, all five senses excel.
Few words and no empty pleasantries, yet you possess a clumsy kindness—silently lending a hand when someone is struggling.
You love efficiency, constantly devising ways to achieve maximum effect with minimum effort—a true **"energy-saving master."**
        `.trim(),
        strength: `
・**Outstanding technical skill**: Your sense for handling tools is superb. You deliver impressive results in hands-on domains—DIY, cooking, programming, and beyond.
・**Practical problem-solving**: You prioritize "how does it actually work" over abstract debate, and solve problems physically and calmly when trouble strikes.
・**Aesthetic sense and comfort**: You have excellent design sense, creating things that are both functional AND beautiful. Your talent for crafting cozy spaces is nothing short of genius.
        `.trim(),
        weakness: `
・**Difficulty expressing emotions**: Putting feelings into words is hard, giving off a somewhat cold impression. You tend to assume "they should know without me saying it."
・**Low initiative**: You won't budge for things that don't interest you or feel wasteful. Default mode is energy-saving, so it takes time to get motivated.
・**Indifference to the future**: Over-focused on making "right now" comfortable, you tend to postpone long-term career planning and goal-setting.
        `.trim(),
        communication: `
Appreciate their **skill and taste.**
Rather than verbal praise, showing genuine happiness using something they made or eating their cooking—that resonates most.
Don't over-interfere. Respect their alone time.
        `.trim(),
        leadershipStyle: 'Maestro Leader: Leads by example, not words. Educates subordinates by demonstrating skill. Cold toward those who lack ability.',
        decisionMaking: '"Is it practical?" and "Is it comfortable?" are the criteria. No wasted effort. Chooses the most efficient, satisfying method based on experience and senses.',
        bestMatch: 'ENFp',
        worstMatch: 'ENFj',
        doCommunication: [
            'Praise their cooking or creations with sensory words: "Delicious!" or "So easy to use!"',
            'Ask concrete questions: "How do I do this?" about procedures and techniques',
            'When silence stretches, don\'t force conversation—share the comfortable quiet'
        ],
        dontCommunication: [
            'Making excessive emotional demands: "Show more feelings!" or "Say you love me!"',
            'Imposing inefficient methods or trapping them in pointless, long meetings',
            'Barging into their private space and personal time uninvited'
        ],
        color: 'slate-500',
        params: {
            analysis: 7,
            innovation: 5,
            empathy: 3,
            execution: 9,
            adaptability: 5
        },
        workStyle: {
            mission: 'To hone craft and deliver functional, beautiful solutions',
            style: '**Craftsperson & Own-pace**. You work best with familiar tools at your own tempo, refining until satisfied. A quiet, interruption-free environment is essential.',
            motivation: '"Comfort" and "practical gain." Earn money through your skills, eat well, and enjoy your hobbies. You seek a simple, high-quality life.',
            management: 'Laissez-faire. You hate being micromanaged, so you don\'t micromanage others. "Watch and learn" is your stance, but you teach precisely when asked.',
            bestRoles: [
                { title: 'Engineer / Technician', reason: 'Your logical thinking and manual dexterity excel at building and repairing complex systems and machinery.' },
                { title: 'Designer / Creator', reason: 'Your pursuit of functional beauty produces products that are both usable and visually stunning.' },
                { title: 'Surgeon / Dentist', reason: 'Your intense concentration, precise handwork, and calm judgment solve concrete problems under pressure.' }
            ],
            ngEnvironments: [
                'Environments full of emotional conflict and shouting',
                'Workplaces that don\'t let you work at your own pace—constantly rushing you',
                'Political organizations where relationships outweigh technical skill in evaluations'
            ],
            idealBoss: 'A boss who recognizes your skill and lets you run. "I\'ll leave it to you" followed by actual hands-off management is ideal. Micromanaging or emotional bosses are painful. A boss who speaks the language of craft is best.',
            idealSubordinate: 'Someone who learns independently and acts on their own. Your "watch and learn" style means waiting around gets nothing. But ask "How do you do this?" and you\'ll teach with care.',
            sideProjects: [
                { title: 'DIY / Gadget Reviews', reason: 'Making things and evaluating quality come naturally.' },
                { title: 'Culinary Research / Recipe Development', reason: 'Your sharp five senses find a perfect outlet.' },
                { title: 'Repair / Maintenance Side Gig', reason: 'Your dexterous hands earn direct income.' }
            ],
            teamBehavior: 'The team\'s craftsperson. Quiet, but offers concrete fixes: "You can solve that by doing this." Uncomfortable in meetings—believes moving your hands is faster than abstract discussion. "Just try it and you\'ll see" is your catchphrase.',
            workEnergyPattern: 'Own-pace type. Stable energy when working at your rhythm, but performance plummets when rushed. Sensitive to loud noise and chitchat—quiet environments are a must. Consistent regardless of time of day.'
        },
        psychology: {
            coreDesire: 'To be comfortable, and to be competent',
            stressResponse: 'When caught in emotional conflict, you withdraw into your shell. You physically leave the scene or put on headphones to block the outside world. Under extreme stress, you turn sardonic and push everyone away.',
            recoveryMethod: 'Satisfying the five senses. Eating something delicious, soaking in a hot spring, getting a massage, napping on your favorite sofa. Physical pleasure heals the mind.',
            flowState: 'When fully immersed in a hobby or task, hands and body moving automatically. In the zone, you display astonishing concentration and speed.',
            blindSpot: '**Others\' emotions** and **expressing passion.** You may fail to sense what someone needs and respond coldly, or lose out because others misread your quiet dedication as lack of motivation.'
        },
        relationships: {
            communicationStyle: 'Taciturn—says only what\'s necessary. But you have a unique sense of humor, occasionally dropping dry one-liners that land perfectly. Incapable of lies or flattery.',
            partnerQuality: 'You seek a **sunny, free-spirited partner** who doesn\'t mind your stoicism and brightly engages you. You\'re drawn to someone who pulls you into the outside world and introduces fresh stimulation.',
            conflictTrigger: 'Hysterical crying and emotional accusations are your worst nightmare. Having your creations or meticulously developed processes criticized cuts deep.',
            advice: 'You carry love without saying it—but the other person doesn\'t know that. Occasionally making the effort to voice even a simple "thank you" will make your relationships dramatically smoother.',
            friendshipStyle: 'Friends center around "people who share the same hobby or activity." Riding bikes together, fishing, gaming—experience-based bonds. You prefer relationships where simply being in the same space feels comfortable, even without conversation. Groups larger than 2-3 are too much. You barely keep in contact, yet trust never wavers.',
            familyRole: 'The family\'s "repair person." Fixing appliances, organizing paperwork, maintaining the car—you support the family through practical action. Emotionally tone-deaf, you often hear "Tell us what you\'re feeling." Keeps distance from parents, but silently steps up when it counts. In parenting, the philosophy is "Try it yourself"—nurturing independence.'
        },
        growth: {
            level1: {
                title: 'Putting Feelings into Words',
                content: 'Practice verbalizing basic emotions—gratitude, apologies. It\'s important to convey not just your skill, but your heart, to others.'
            },
            level2: {
                title: 'Setting Goals',
                content: 'Think beyond "right now" to "Where do I want to be in one year?" Having long-term goals channels your exceptional skill into much larger achievements.'
            },
            level3: {
                title: 'The Maestro',
                content: 'Don\'t stop at personal satisfaction—pass your technique to future generations, preserving it as culture. Your creations and skills will continue enriching lives across the ages.'
            },
            actionItems: [
                { level: 1, title: 'Greeting Plus One', description: 'Beyond "Good morning," add one small comment—"Cold today, huh?"—to soften your impression.' },
                { level: 1, title: 'Give a Gift', description: 'On special occasions, give something handmade or a carefully chosen treat.' },
                { level: 2, title: 'Plan for the Future', description: 'Once a year, set aside time to think about your career plan and financial management.' },
                { level: 2, title: 'Teaching Practice', description: 'Verbalize your technique—write a manual or teach someone. Turn tacit knowledge into output.' },
                { level: 3, title: 'Master of the Workshop', description: 'Build a community or workshop around your craft and mentor the next generation of artisans.' }
            ]
        },
        verbalHabits: {
            phrases: [
                'Just try it and you\'ll see',
                'Showing is faster than explaining',
                'Well, it\'s safest if I just do it myself',
                'It\'s fine as is, isn\'t it?',
                '…Yeah, sure'
            ],
            innerVoice: [
                'With a few more tweaks, this tool would be perfect',
                'This is taking forever… can they just get to the point?',
                'Not enough alone time. I\'m going home early today, no excuses'
            ],
            triggerWords: [
                'Show a little more team spirit',
                'Put your feelings into words',
                'Why are you so cold?'
            ]
        }
    }
};


import type { OSContent } from '../types';

export const AlphaOS_Part1_EN: Record<string, OSContent> = {
    'ENTp': {
        code: 'ENTp',
        name: 'The Inventor (ILE)',
        catchphrase: 'A trickster of ideas who shatters convention and "tests" infinite possibilities',
        hashTag: '#IntellectualTrickster',
        aruaru: [
            '"This system could work so much better" is your catchphrase—but you never fix it yourself',
            'You derail conversations at least 3 times. You insist it\'s all connected',
            'New hobbies start with buying all the gear, then never opening the box',
            '"Is that actually true?" comes out too often and irritates people before you notice',
            'You hit peak performance the night before a deadline. It always works out, so you never learn',
            'During boring meetings, you\'re secretly brainstorming an entirely different project',
        ],
        description: `
**"What if…?"** is the spark plug that ignites your engine.
You get an intense thrill from questioning rules, traditions, and precedents—redefining things from a completely new angle.
The world is your laboratory, and every phenomenon is merely a hypothesis to test.
You share a flood of ideas, spark debates, and transform stagnant atmospheres like an **"intellectual storm."**
On the flip side, once a puzzle is solved or work becomes routine, you lose interest instantly and dash off to the next shiny thing, leaving a trail of unfinished projects behind.
        `.trim(),
        strength: `
・**Breakthrough 0→1 power**: Your ability to create value from nothing—to find a path through uncharted territory—is extraordinary.
・**Multi-angle perspective**: You observe one thing from several angles simultaneously, breaking deadlocks with "What if we combined A and B?"
・**Improvisation under chaos**: You thrive on surprises and chaos, crafting optimal solutions on the fly like a jazz musician.
        `.trim(),
        weakness: `
・**Follow-through deficit**: You feel satisfied the moment an idea is born, lacking the persistence to refine it into something practical or see it to completion.
・**Social radar bugs**: Driven by curiosity, you may ignore others' feelings and push debates or ask tactless questions that trip landmines.
・**Routine allergy**: Paperwork and repetitive tasks trigger something close to a physical rejection—your performance drops visibly.
        `.trim(),
        communication: `
Stimulating their **intellectual curiosity** is both the only and the best approach.
Ask "What do you think about this?" or share unexpected information—their eyes will light up immediately.
Conversely, shutting them down with "Just do as you're told" will either spark rebellion or cause a total mental shutdown.
        `.trim(),
        leadershipStyle: 'Visionary Innovator: Paints a grand future, excites the team with possibilities, and pushes them forward with "Let\'s just try it." Rarely gives detailed instructions.',
        decisionMaking: '"Is it interesting?" and "Is it new?" are the criteria. If the experimental value is high, risks get a green light. Bets on future possibility over past data.',
        bestMatch: 'ISFp',
        worstMatch: 'ISFj',
        doCommunication: [
            'Don\'t instantly dismiss wild ideas with "that\'s impossible." Receive them with "that would be fun if it worked" before discussing practical challenges',
            'Regularly share the latest gadgets, news, and tech trends that might catch their interest',
            'Keep administrative messages brief, and allocate generous time for brainstorming and discussion'
        ],
        dontCommunication: [
            'Rejecting proposals solely because "there\'s no precedent" or "policy says no"',
            'Interrupting with "So what\'s the conclusion?" or "Where are the numbers?" too aggressively',
            'Micromanaging schedules or nitpicking minor mistakes, stealing their freedom'
        ],
        color: 'sky-500',
        params: {
            analysis: 8,
            innovation: 10,
            empathy: 3,
            execution: 4,
            adaptability: 9
        },
        workStyle: {
            mission: 'To destroy "boredom" and "stagnation" and present humanity with new choices',
            style: '**Multitask & Sprint**. You juggle multiple projects, bouncing between them as interest dictates. Short, explosive bursts followed by rest (or switching tasks) are far more productive than steady, focused grinding.',
            motivation: 'The ultimate fuel is **"intellectual excitement."** More than money or status, discovering "I\'m the only one who noticed this" or "No one\'s ever done it this way" is what makes your soul tremble. Work "anyone could do" holds zero value.',
            management: 'A **hands-off** boss. Process doesn\'t matter if the results are "interesting." Too lazy for detailed guidance—heaven for self-starters, hell for instruction-waiters. You do appreciate quirky individuality in your team.',
            bestRoles: [
                { title: 'New Business Development / Startup Founder', reason: 'Your ability to cut through ambiguity and test hypotheses in high-uncertainty environments is unmatched.' },
                { title: 'Strategy Consultant / UX Researcher', reason: 'You uncover latent problems that even clients haven\'t noticed and propose unconventional, fundamental solutions.' },
                { title: 'Creative Director / Planner', reason: 'Your talent for combining disparate elements and your festival-like drive bring bold projects to life.' }
            ],
            ngEnvironments: [
                'Routine-centered work with no room for experimentation',
                'Organizations where novel proposals are killed with "no precedent"',
                'Bureaucratic systems where detailed reports and approval chains murder speed'
            ],
            idealBoss: 'A hands-off leader who sets the vision and lets you choose the method. "Do whatever you want, just deliver results." Even better if they respond to failures with "What did we learn?" instead of blame.',
            idealSubordinate: 'Self-starters who think for themselves. "Have you considered this approach?" counter-proposals are gold. You don\'t need reports—you want someone who brings you "interesting results."',
            sideProjects: [
                { title: 'Podcast / Content Creation', reason: '"I want to tell people what nobody else has noticed" satisfies your core itch. Niche topics fuel you most.' },
                { title: 'Prototyping / Technical Experiments', reason: '"Can this actually be done?" Testing it yourself is pure joy.' },
                { title: 'Freelance Consulting', reason: '"I never thought of it that way!" from clients is addictive.' }
            ],
            teamBehavior: 'The one who says "Isn\'t the whole premise wrong?" and flips the meeting. Unbeatable at ideation, terrible at note-taking and task tracking. Frequent tangents, but breakthroughs sometimes emerge from those detours.',
            workEnergyPattern: 'Classic sprinter. Terrifying focus when engaged, total collapse after a 30-minute interruption. Mornings are warm-up time; the engine hits full throttle from afternoon through late night. "9 AM start" is your nemesis.'
        },
        psychology: {
            coreDesire: 'To understand, and to test possibilities',
            stressResponse: 'When freedom is taken away or monotonous tasks are forced on you, your eyes go dead—like a lifeless doll. At extreme stress, you lose your usual logic and may retreat with mysterious physical symptoms (unexplained pain, chronic fatigue).',
            recoveryMethod: 'An **intellectual stroll**. Browse a bookstore, walk an unfamiliar neighborhood, watch videos in a genre you\'ve never tried. Feeding your brain fresh stimuli reconnects your mental synapses and restores energy.',
            flowState: 'When solving a fiendishly complex puzzle, or when a brilliant idea descends during a brainstorm. Brain chemicals fire and you forget to eat or sleep.',
            blindSpot: '**Body awareness** and **social subtlety**. You forget hunger mid-debate, or keep "winning" an argument without noticing the other person is hurt. Personal health management is also a weak spot.'
        },
        relationships: {
            communicationStyle: 'Rapid-fire speech with topics leaping everywhere. You love metaphors, jokes, and intellectual sparring—which you may mistake for a form of affection.',
            partnerQuality: 'You seek a partner with **motherly warmth** who can organize your scattered ideas (and room), feed you, and dress you. Rather than someone who matches wits, you\'re soothed by someone who teaches you the pleasures of the five senses.',
            conflictTrigger: 'Emotional hysteria or lectures backed by "common sense" make you go ice-cold. You mentally label them "unreasonable" and pull down the shutters.',
            advice: 'Your "being right" is like a knife—razor-sharp, but swinging it carelessly cuts the people you love. Learning that some moments need **kindness over correctness** will dramatically lower life\'s difficulty setting.',
            friendshipStyle: 'You curate a small, elite circle of "intellectually stimulating" friends. Small-talk-only friendships fade naturally, but you can resume with "as I was saying last time" even after 3 years. You reply late, but meet-ups feel instant. In groups, you\'re "the one who drops interesting topics."',
            familyRole: 'The "quirky free spirit" of the family. Relatives say "there you go again," but you\'re actually the most objective observer of family issues. You resent parental interference and achieve mental independence early. As a parent, you champion "let kids follow their interests" but struggle badly with practical care.'
        },
        growth: {
            level1: {
                title: 'The Habit of Completion',
                content: 'Don\'t stop at generating ideas—take ownership through to **"making it real."** Building the completion muscle through small daily tasks (doing the dishes, taking out the trash) trains your follow-through at work too.'
            },
            level2: {
                title: 'Empathy for Others',
                content: 'Stop treating debates as something to "win." Recognize that others have their own context and feelings, and seek **"solutions everyone can accept."** Opponents become collaborators.'
            },
            level3: {
                title: 'True Innovator',
                content: 'Evolve from idea-generator to change-maker—someone who implements ideas in society and genuinely transforms lives. Respect the teammates who cover your weaknesses (execution, people skills) and achieve greatness as a team leader.'
            },
            actionItems: [
                { level: 1, title: 'Small Completions', description: 'Once a day, finish one thing you\'ve left incomplete (read one chapter of an unfinished book, reply to that email, etc.).' },
                { level: 1, title: 'The 3-Second Pause', description: 'When you want to argue back, count to 3, breathe, and say out loud: "Hmm, that\'s an interesting angle."' },
                { level: 2, title: 'Gratitude Without Reason', description: 'Say "thank you" to someone who supports you (family, colleague, assistant)—no logical justification needed.' },
                { level: 2, title: 'Invest in Health', description: 'Fund your brain\'s performance: prioritize sleep quality and nutrition.' },
                { level: 3, title: 'Mentor the Next Generation', description: 'Generously share the seeds of your ideas with younger people, and watch them grow.' }
            ]
        },
        verbalHabits: {
            phrases: [
                'Oh, that reminds me of something—',
                'Think about it logically for a second',
                'I bet there\'s a more interesting way to do this',
                'Actually, that\'s not quite accurate',
                'Hold on, I just had a great idea'
            ],
            innerVoice: [
                'There has to be a more efficient way to do this',
                'How does nobody else see this contradiction?',
                'I need to look into a few more things about this'
            ],
            triggerWords: [
                'We can\'t do that—there\'s no precedent',
                'Stop overthinking and just do it properly',
                'Enough theory—what do you actually want?'
            ]
        }
    },
    'ISFp': {
        code: 'ISFp',
        name: 'The Mediator (SEI)',
        catchphrase: 'A guardian of peace who resolves conflicts and fills daily life with warmth and comfort',
        hashTag: '#GuardianOfPeace',
        aruaru: [
            'You try to mediate friends\' arguments but end up being both sides\' complaint listener',
            'You\'re so particular about lighting, temperature, and BGM that choosing a café takes 30 minutes',
            'You say "anything is fine" but actually have very clear preferences. You wish people would just read your mind',
            'When stressed, you either cook obsessively or rearrange the entire room',
            'You smile through hurtful comments but they hit you hard once you\'re home alone',
            'When you love something, you go ALL in. Your room is buried in merch',
        ],
        description: `
Just having them around somehow softens the atmosphere and dissolves tension. They carry a mysterious **"healing aura."**
Rather than fierce competition or ambitious goals, their top priority is how to make today as pleasant and enjoyable as possible—**"quality of life (QoL)"** above all.
With exceptionally sharp senses, they pursue physical comfort—delicious food, soft fabrics, beautiful interiors—with genius-level taste.
They instantly detect subtle emotional friction between people and patch things up with humor or a well-timed snack. They are the indispensable **"social lubricant"** of any team.
On the flip side, they struggle with high-pressure decisions and complex future planning, with a tendency to escape into pleasures and avoid anything unpleasant.
        `.trim(),
        strength: `
・**Outstanding diplomacy**: You make friends easily without creating enemies, maintaining a comfortable distance with everyone. Your lack of pretense makes negotiations smooth.
・**Creating beauty and comfort**: You have a gift for transforming any space into a pleasant, beautiful place—adding flowers to a drab office or brewing the perfect coffee.
・**Reading the room**: You sense tension or unhappiness in others instantly and defuse the atmosphere with perfectly timed humor—a natural mood-maker.
        `.trim(),
        weakness: `
・**Conflict avoidance**: To keep the peace, you may defer decisions, swallow your own opinions, and accommodate others until it becomes painful.
・**Lack of long-term planning**: Prioritizing present enjoyment, you tend to postpone career planning and the steady effort needed for the future.
・**Resistance to discipline**: You resist strict rules and deadlines, insisting on your own pace, which can lead others to see you as "unreliable."
        `.trim(),
        communication: `
Approach them with **kindness and empathy**.
Skip the complex logic and efficiency talk—start with sensory topics like the weather or a great lunch spot.
Surprise deadlines and raising your voice will make them withdraw and create emotional distance instantly. Ask with a smile, and they\'ll usually say yes.
        `.trim(),
        leadershipStyle: 'Harmony Leader: Attentive to each member\'s wellbeing and mood, maintaining a comfortable pace and warm atmosphere. Never fosters cutthroat competition.',
        decisionMaking: '"Will everyone be OK with this?" and "Does it feel right?" are the criteria. Would rather delay a decision than rock the boat. Prefers consensus and majority rule.',
        bestMatch: 'ENTp',
        worstMatch: 'ENTj',
        doCommunication: [
            'Specifically praise their taste, belongings, or thoughtfulness—"Great sense of style" or "That was so considerate"',
            'Chat about personal interests and hobbies, not just work, to create a relaxed atmosphere',
            'When giving feedback, soften your words: "This might be even better if…" instead of blunt criticism'
        ],
        dontCommunication: [
            'Dismissing their process or preferences as "inefficient" or "wasteful"',
            'Pressuring them with urgency or confrontational body language',
            'Calling their peacefulness "weak" or "indecisive" and pushing competition or conflict'
        ],
        color: 'emerald-400',
        params: {
            analysis: 3,
            innovation: 5,
            empathy: 9,
            execution: 6,
            adaptability: 8
        },
        workStyle: {
            mission: 'To eliminate conflict from the world and create a place where people live with smiles',
            style: '**Own-pace & Aesthetic**. You wilt in harsh environments. You work best in a relaxed mode—favorite music playing, favorite stationery at hand, managing your own mood. Slow to start near deadlines, but once the engine kicks in, you can deliver surprising focus.',
            motivation: 'The ultimate fuel is **"pleasure" and "gratitude."** If you know someone will be happy or the work itself feels good, you can push through. Tasks that involve suffering or serve no clear human purpose drain you completely.',
            management: 'You become an **overprotective parent** to reports. When they make mistakes you worry "Are you OK?" and sometimes do the work for them. Team mood is fantastic, but lack of strictness may let slackers slide.',
            bestRoles: [
                { title: 'Designer / Art Director', reason: 'Your sharp color sense and aesthetic eye create visuals and spaces that resonate emotionally.' },
                { title: 'Customer Support / Hospitality Expert', reason: 'Your empathetic, warm interactions create loyal fans and prevent escalations.' },
                { title: 'Internal Communications / Community Manager', reason: 'You naturally smooth interpersonal dynamics and create events that build open, healthy culture.' }
            ],
            ngEnvironments: [
                'Monotonous work that repeats endlessly with zero variety',
                'Performance-driven, competitive environments with cold human relationships',
                'Rigid, military-style organizations that tolerate zero "fun"'
            ],
            idealBoss: 'A kind boss who expresses gratitude in words. "Thanks, you really helped" is the ultimate energy boost. Someone who watches over you without pressure and celebrates wins together.',
            idealSubordinate: 'People who can articulate "this is what I need." Passive reports confuse you. Clear requests make the collaboration smooth. You excel at creating warm team atmosphere, so morale stays high.',
            sideProjects: [
                { title: 'Handmade Crafts / Art Sales', reason: 'Your aesthetic sense shines. The creation process itself is therapeutic.' },
                { title: 'Pet Sitting / Animal Care', reason: 'Your natural empathy for living creatures translates directly.' },
                { title: 'Interior Coordination', reason: 'Your gift for making spaces feel welcoming becomes a service.' }
            ],
            teamBehavior: 'The team\'s lubricant. You sense tension and defuse it with "Anyone want snacks?" Quiet in meetings, but in 1-on-1 afterward you share insights like "Actually, I was thinking…" Don\'t let these valuable inputs go unnoticed.',
            workEnergyPattern: 'Slow starter. Mornings are hazy; pace gradually builds in the afternoon. Deadline-eve crunch power is real, followed by a full day of recovery. Productivity rises when you\'re allowed your own rhythm.'
        },
        psychology: {
            coreDesire: 'To be comfortable, and to be loved',
            stressResponse: 'When confronted with conflict or aggression, you clam up and retreat into your own world. You may escape through overeating, oversleeping, or impulse shopping. "I can\'t be bothered" becomes your mantra, and you want to abandon everything.',
            recoveryMethod: '**Satisfy the five senses.** Eat a delicious cake, take an aromatic bath, sleep in a fluffy bed. Adjusting physical comfort—not reasoning—restores your mental health.',
            flowState: 'When creating something beautiful, or sharing a wonderful meal with close friends. You feel a peaceful, contented flow of time.',
            blindSpot: '**Future risk** and **efficiency**. To protect present comfort, you may reject necessary change and slowly boil like the proverbial frog. Watch out for the habit of endlessly dodging anything unpleasant.'
        },
        relationships: {
            communicationStyle: 'Soft and emotionally rich. A master listener whose well-timed nods and reactions make others feel great. Uses humor freely and never negates anyone.',
            partnerQuality: 'You seek an **imaginative, energetic partner** who can pull you out of indecision. Someone who says "Let\'s go there next!" and "Let\'s try this!" and shows you new worlds—you\'ll happily follow.',
            conflictTrigger: 'You bristle when someone disrupts your pace, rushes you, or barks commands. You also quietly lose respect for unhygienic behavior or insensitive remarks.',
            advice: 'You\'re a wonderful mediator, but swallowing your opinions forever will eventually lead to an explosion. Practice small acts of assertiveness: **"I want this."** Your being happy genuinely makes the people around you happy too.',
            friendshipStyle: 'You naturally gather friends who enjoy "sharing the present moment"—cafés, shopping, walks. Sensory experiences together are the highest form of friendship. Looks "wide and shallow" but 1-on-1 conversations go surprisingly deep. Always remembers birthdays.',
            familyRole: 'The "unsung hero" of the family. You keep the household running with chores and care, but frustration builds when it\'s taken for granted. Appears obedient to parents but holds firm personal aesthetics inside. As a parent, you nurture children\'s senses with rich experiential activities.'
        },
        growth: {
            level1: {
                title: 'The Courage to Say No',
                content: 'Stop accepting everything just to keep the peace. Saying no isn\'t rejecting someone—it\'s **drawing a boundary to protect your own time and energy.**'
            },
            level2: {
                title: 'Planting Seeds for the Future',
                content: 'Postpone a small pleasure today and invest in your future instead—studying for a qualification, saving money, whatever works. **Planned action** will erase your anxiety about what\'s ahead.'
            },
            level3: {
                title: 'Guardian of Love',
                content: 'Beyond going with the flow, gain the strength to fight when your loved ones need protection. Your healing power combined with inner fortitude makes you the ultimate supporter.'
            },
            actionItems: [
                { level: 1, title: 'Create a TODO List', description: 'Instead of keeping everything in your head, write tasks down and feel the satisfaction of crossing them off.' },
                { level: 1, title: 'Protect Your "Me Time"', description: 'Reserve at least one slot per week for solo enjoyment—not for anyone else\'s sake.' },
                { level: 2, title: 'A Small Challenge', description: 'Volunteer for a new hobby or a slightly-harder-than-usual task on your own initiative.' },
                { level: 2, title: 'State Your Preference', description: 'When choosing a lunch spot, say "I want this" instead of "anything is fine."' },
                { level: 3, title: 'Introduce Routine', description: 'Build confidence by keeping your own rituals—waking at a set time, tidying your space—consistently.' }
            ]
        },
        verbalHabits: {
            phrases: [
                'Sounds good to me!',
                'This place is so calming, isn\'t it?',
                'Oh, I totally get that. Me too.',
                'That\'s fine as it is, really',
                'Either way works for me'
            ],
            innerVoice: [
                'I want to make this moment feel nice for everyone',
                'That person looks a little down… maybe I should check in',
                'I\'ve over-committed again… but I can\'t say no now'
            ],
            triggerWords: [
                'Did you actually think before saying that?',
                'Just go at your own pace (sarcastically)',
                'Why are you crying over something like this?'
            ]
        }
    }
};

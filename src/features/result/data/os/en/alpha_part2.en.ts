
import type { OSContent } from '../types';

export const AlphaOS_Part2_EN: Record<string, OSContent> = {
    'ESFj': {
        code: 'ESFj',
        name: 'The Host (ESE)',
        catchphrase: 'A sun who engulfs people in overflowing passion and recharges their will to face tomorrow',
        hashTag: '#PassionateSun',
        aruaru: [
            'You never forget a birthday or anniversary. Your planner is packed with friends\' events',
            'Before someone even realizes they\'re down, you\'ve already handed them chocolate',
            'Unanswered group chats are unacceptable. You subtly follow up until everyone replies',
            'You can\'t leave a struggling person alone—though your meddling sometimes backfires',
            '"Let\'s have fun together!" is your motto. You always end up organizing the party, but secretly you\'re enjoying it most',
            'Not being thanked quietly stings. A single "thank you" fully restores you—you\'re that simple',
        ],
        description: `
The moment they walk into a room, the temperature rises two degrees—they carry an overwhelming **positive energy.**
A genius at creating celebrations, they pull everyone in and turn any moment into a festival. Silence and boredom are sins to them; they constantly fill every space with laughter and conversation.
Keenly attuned to others' emotions, they amplify joy twofold and charge at full speed to lift anyone feeling low—a living **"emotional amplifier."**
They can't resist helping someone in need, sometimes pouring in more care than the person asked for.
Prioritizing "Is everyone having fun?" over logical correctness, they wield massive influence as the organization's mood-maker.
        `.trim(),
        strength: `
・**Magnetic rallying power**: Their passion is contagious. When they say "Let's do it!" people move—logic not required.
・**Lightning-fast attentiveness**: Just as they notice an empty glass at a party before anyone else, they instantly detect and address small team needs and frustrations.
・**Limitless stamina**: Through brutal schedules they keep smiling and inspiring others—the ultimate tonic for an exhausted team.
        `.trim(),
        weakness: `
・**Emotional overload**: Intense mood swings can lead to outbursts or lashing out that freezes the atmosphere.
・**Unsolicited over-help**: Well-meaning actions sometimes become "unwanted favors" or feel intrusive, misjudging the right distance.
・**Lack of objectivity**: Strong like-dislike bias means logically valid criticism from someone you dislike gets completely tuned out.
        `.trim(),
        communication: `
React to their **passion and action.**
"That's awesome!" and "You're a lifesaver!" delivered with big reactions will fire them up even more.
Intellectual detachment or cool cynicism is forbidden—responding coolly to their enthusiasm registers as "rejection."
        `.trim(),
        leadershipStyle: 'Cheerleader Leader: Waves the flag at the front, passionately rallying members. "Let\'s push through together!" creates a family-like unity.',
        decisionMaking: '"Will everyone be happy?" and "Will it be exciting?" are the criteria. Tends to give the green light based on in-the-moment energy rather than data.',
        bestMatch: 'INTj',
        worstMatch: 'ESFp',
        doCommunication: [
            'Nod enthusiastically and react expressively to their stories',
            'Entrust them with organizing events and social gatherings, then show genuine appreciation',
            'When they give you a gift or do you a favor, express your delight generously—even exaggerate a little'
        ],
        dontCommunication: [
            'Checking your phone or listening blankly while they\'re passionately talking',
            'Telling them "be quiet" or "you\'re too loud"—negating their energy',
            'Betraying their kindness or coldly ignoring them'
        ],
        color: 'rose-500',
        params: {
            analysis: 3,
            innovation: 5,
            empathy: 10,
            execution: 9,
            adaptability: 6
        },
        workStyle: {
            mission: 'To energize people and spread circles of smiles and inspiration',
            style: '**Energetic & Hospitality-driven**. Working alone in silence drains you. Making calls, meeting people, moving around—that\'s what generates your power. Fast-paced and capable of multitasking, but prone to gaps in detailed checking work.',
            motivation: '"They were so happy!"—**reactions from others** are your fuel. You need to work close enough to see customers\' "thank you"s and colleagues\' smiles. Gratitude counts more than hitting targets.',
            management: 'A **passionate mentor** who treats reports like their own children. You dig into personal problems and support at full power. However, blurring personal and professional lines risks playing favorites.',
            bestRoles: [
                { title: 'Sales / Account Management', reason: 'Your personal charm and natural push make clients say "I want to buy from YOU"—not just the product.' },
                { title: 'Event Planner / PR', reason: 'The energy to plan crowd-pleasing events and the drive to handle every detail make you a natural.' },
                { title: 'Customer Success', reason: 'You celebrate customer wins as your own and build rock-solid relationships through close communication.' }
            ],
            ngEnvironments: [
                'Solo desk work with zero opportunities for human interaction',
                'A culture where only numbers matter and gratitude or feedback is absent',
                'Cold, transactional relationships where even small talk is frowned upon'
            ],
            idealBoss: 'A warm, human leader who sees your effort—not just outcomes. Someone who says "I\'m glad you\'re here" and acknowledges your very presence. Under a dry, emotion-free boss, you wilt.',
            idealSubordinate: 'Someone who actually says "thank you" out loud. That one phrase makes you think "I want to do even more for them." Conversely, a low-reaction report makes you worry "Do they dislike me?"',
            sideProjects: [
                { title: 'Event Planning / Community Management', reason: 'Your talent for gathering and energizing people translates directly.' },
                { title: 'Counseling / Coaching', reason: 'You\'re a natural listener, and gratitude comes back fast and direct.' },
                { title: 'Cooking Classes / Hospitality', reason: '"Making people happy" becomes direct income.' }
            ],
            teamBehavior: 'The team\'s sun. You brighten the atmosphere and check in with everyone. In meetings you speak up readily and draw out quiet members with "What do you think?" However, heated discussions can make you emotional and cost you objectivity.',
            workEnergyPattern: 'Charged by human interaction. Full throttle from morning, but solo desk work drains energy fast. Lunch chitchat is your recharge break. The office suits you far better than remote work.'
        },
        psychology: {
            coreDesire: 'To be loved, and to be needed',
            stressResponse: 'When ignored or unappreciated for too long, you either erupt in fierce anger or slam the door with "I\'m done!" Under extreme stress, you may spiral into victim mentality, acting as if you\'re the tragic heroine.',
            recoveryMethod: '**Talking to people**—nothing else comes close. Venting to friends, going out, karaoke. Releasing emotions externally restores you with astonishing speed.',
            flowState: 'When an event you planned has everyone buzzing, or you\'re showered with gratitude. You feel like the center of the universe, radiating omnipotence.',
            blindSpot: '**Time management** and **logical consistency**. Emotion drives you forward, so schedule estimates run loose and your statements can shift from day to day.'
        },
        relationships: {
            communicationStyle: 'Loud voice, animated gestures. Emotions are worn on your sleeve—thoughts appear on your face instantly. Easy to read because there\'s no hidden agenda, though keeping secrets may not be your forte.',
            partnerQuality: 'You seek a **quiet, intellectual partner** who can absorb your intense emotions and calmly organize them. If you\'re the accelerator, you want them to be smooth, reliable brakes.',
            conflictTrigger: 'Gossip behind your back or exclusion from the group triggers disproportionate reactions. Having your generosity coldly rejected deeply wounds your pride.',
            advice: 'Your energy is wonderful, but learn the **courage to pull back.** Others need alone time too. Sometimes, by simply being a little quieter, you\'ll find people wanting to talk to you even more.',
            friendshipStyle: 'A friendship-making genius—5 minutes with a stranger and you\'re friends. Often the group\'s center, always tapped to organize gatherings. Many friends but surprisingly few true confidants—you\'re searching for someone you can truly be vulnerable with. Your text game is almost too strong.',
            familyRole: 'The family\'s "mood-maker and caretaker." You handle all family events and relative relationships. Devoted to parents, but when gratitude is absent, "After everything I do!" explodes. Full participation in kids\' events—but letting go may be your biggest challenge.'
        },
        growth: {
            level1: {
                title: 'Embracing Silence',
                content: 'Don\'t fear pauses in conversation. Silence isn\'t "boring"—it might be **rest or reflection time.** Learn to respect others\' pace.'
            },
            level2: {
                title: 'Emotional Control',
                content: 'When anger flares, breathe deeply. Taking one second to think **"What happens if I say this?"** before acting on emotion prevents 90% of unnecessary conflict.'
            },
            level3: {
                title: 'True Supporter',
                content: 'Evolve from pushy helpfulness to refined hospitality—delivering what people truly need, when they need it. Your passion becomes a light that saves many.'
            },
            actionItems: [
                { level: 1, title: 'Practice Listening', description: 'Once a day, resist the urge to introduce topics and wait for the other person to speak first.' },
                { level: 1, title: 'Solo Time', description: 'Put down your phone for 15 minutes—disconnected from everyone—and face your inner self.' },
                { level: 2, title: 'Separate Facts from Feelings', description: 'When trouble hits, write down "what I feel (sad, frustrated)" separately from "what happened (facts)."' },
                { level: 2, title: 'Accept "No"', description: 'When an invitation is declined, don\'t leap to "they must hate me." Just think "bad timing" and move on.' },
                { level: 3, title: 'Reinforce with Logic', description: 'When making proposals, add just one supporting data point alongside your passion.' }
            ]
        },
        verbalHabits: {
            phrases: [
                'Hey hey, listen listen!',
                'That is SO awesome!',
                'Come on, let\'s all do it together!',
                'You OK? Tell me if anything\'s wrong',
                'Oh my god, this is the BEST!'
            ],
            innerVoice: [
                'Their birthday\'s coming up… what should I get them?',
                'Hello? Look at this! Your reaction is way too weak… be more excited!',
                'Wait, that person seems off today… did something happen?'
            ],
            triggerWords: [
                'That\'s someone else\'s problem',
                'Could you be a little quieter?',
                'It\'s not really any of your business'
            ]
        }
    },
    'INTj': {
        code: 'INTj',
        name: 'The Analyst (LII)',
        catchphrase: 'A cold-eyed seeker of truth who brings order to a chaotic world',
        hashTag: '#TruthSeeker',
        aruaru: [
            'You say "That doesn\'t make logical sense" during small talk and freeze the room. No ill intent',
            'Your bookshelf and bookmarks follow your own classification system. Others touching them is low-key stressful',
            '"What do you want for dinner?" gets a response based on nutritional balance and cost-efficiency—killing the mood',
            'When someone comes to you for emotional support, you offer solutions first. "That\'s not what I needed" follows',
            'Days without alone time quietly drain you. Recharging requires complete solitude',
            'When you dive into something interesting, Wikipedia link-hopping eats 3 hours before you notice',
        ],
        description: `
Unmoved by emotion, prejudice, or passing trends, this is the ultimate logical thinker—eyes fixed solely on the **"essential structure"** of things.
The world is a system written in complex equations, and deriving the solution brings supreme satisfaction.
You decompose "Why does this work this way?" down to the atomic level, harboring extreme distaste for contradiction and ambiguity.
Behind the cool, unapproachable exterior burns a fierce commitment to **"fairness"**—you protest quietly but firmly against unjust treatment or irrational discrimination.
Favoring a minimalist lifestyle stripped of waste, you take on the world armed with your single greatest weapon: your mind.
        `.trim(),
        strength: `
・**Penetrating analysis**: You organize complex information and untangle knotted problems to find their core—a master of spotting structural flaws no one else notices.
・**Unwavering fairness**: You judge based on facts and logic, without regard for status or feelings. You're the ideal person to write the rulebook.
・**System-building ability**: You create efficient frameworks and manuals that produce consistent results regardless of who operates them.
        `.trim(),
        weakness: `
・**Execution gap**: "Understanding" provides satisfaction, making the actual hands-on implementation feel tedious. You risk becoming all theory, no action.
・**Social awkwardness**: Factoring in emotions—that "illogical" variable—isn't your strength. You may corner people with cold logic or be misunderstood as heartless.
・**Rigidity to change**: Clinging to your carefully crafted theory or plan, you may freeze when hit with sudden spec changes or unexpected disruptions.
        `.trim(),
        communication: `
Approach with **logic and consistency.**
"Gut feeling" and "just power through it" won't fly. Explain clearly WHY something is needed and HOW it will be done—then they become your strongest ally.
Emotional pleas or pulling rank will backfire. They won't budge until they're genuinely convinced.
        `.trim(),
        leadershipStyle: 'Architect Leader: Designs flawless strategy and fair rules, building systems that run the organization automatically. Not interested in managing subordinates\' motivation.',
        decisionMaking: '"Is it logically sound?" and "Is it fair?" are the criteria. Zero room for favoritism. Gathers information and deliberates thoroughly—snap decisions are not their game.',
        bestMatch: 'ESFj',
        worstMatch: 'INTp',
        doCommunication: [
            'Share agendas and materials beforehand so they have time to think',
            'Acknowledge the sharpness of their analysis and ask them to tackle complex problems',
            'Provide a quiet environment and leave them undisturbed when they\'re focused'
        ],
        dontCommunication: [
            'Imposing vaguely defined concepts like "read the room" or "it\'s common sense"',
            'Springing sudden schedule changes or making illogical, unreasonable demands',
            'Forcing them to give emotional speeches in front of crowds or dragging them to social events'
        ],
        color: 'slate-500',
        params: {
            analysis: 10,
            innovation: 7,
            empathy: 2,
            execution: 4,
            adaptability: 3
        },
        workStyle: {
            mission: 'To rewrite the world into a beautifully organized, contradiction-free system',
            style: '**Logical & Own-pace**. You dislike noisy environments and prefer deep thinking in quiet spaces. Individual work leveraging your expertise—or projects with clearly defined roles—is where you shine over teamwork.',
            motivation: '"Discovering truth" and "autonomy." The intellectual thrill of cracking a hard problem, combined with a work environment where nobody interferes with your pace. Intellectual freedom matters far more than promotion or money.',
            management: 'A **fair judge** to subordinates. Zero favoritism—evaluation is based purely on output. Don\'t expect them to counsel personal worries or bond over drinks, though.',
            bestRoles: [
                { title: 'Systems Engineer / Programmer', reason: 'The logical world of code is your most comfortable habitat, and your talent for structuring directly applies.' },
                { title: 'Data Analyst / Researcher', reason: 'Extracting patterns from massive datasets and the hypothesis-testing process itself bring you joy.' },
                { title: 'Legal / Compliance', reason: 'Making impartial judgments based on rules and law, free from emotional interference, is your calling.' }
            ],
            ngEnvironments: [
                'Environments where decisions are driven by emotions rather than logic',
                'Cultures where frequent social events and office politics influence evaluations',
                'Open offices or forced-collaboration settings with zero alone time'
            ],
            idealBoss: 'A logical, consistent boss whose instructions are clear. Someone who explains the "why" behind every request. Emotional, inconsistent leadership is incomprehensible.',
            idealSubordinate: 'Someone who thinks independently and delivers conclusions. "Here are the results, backed by data" is the ideal report. Emotional personal problems are awkward, but technical debates get you fired up.',
            sideProjects: [
                { title: 'Blog / Technical Writing', reason: 'Systematizing and preserving knowledge gives you genuine satisfaction.' },
                { title: 'Freelance Data Analysis', reason: 'Finding patterns in complex data is pure, intrinsic fun.' },
                { title: 'Board Game / Puzzle Design', reason: 'Turning the joy of building logical structures into play.' }
            ],
            teamBehavior: 'Your specialty in meetings is finding "there\'s a hole in that logic." You speak infrequently, but when you do, it\'s precise. Small talk and icebreakers are painful—you\'d rather use that time to work. Team-building is outside your job description.',
            workEnergyPattern: 'Steady marathon runner. From morning on, you maintain a constant pace of deep focus and accumulate the most total output. Interruptions are your worst enemy—once broken, refocusing takes 30 minutes. Headphones on in a quiet environment = maximum power.'
        },
        psychology: {
            coreDesire: 'To understand, and to be autonomous',
            stressResponse: 'Emotional conflict or illogical orders cause you to shut down and withdraw. Under extreme stress, your usual composure collapses—you may throw a childlike tantrum or act impulsively.',
            recoveryMethod: 'Immerse in **your own world.** Read a challenging book, play a complex game, build a model kit. Uninterrupted time to yourself cools your overheated brain.',
            flowState: 'When pursuing the right answer in a logical domain—programming, analysis. Pure thought accelerating in total silence, with zero noise.',
            blindSpot: '**Others\' emotions** and **your body\'s demands.** You risk isolating yourself by dodging social interaction, or ruining your health by neglecting meals and sleep.'
        },
        relationships: {
            communicationStyle: 'Few words, spoken only when necessary. Expression tends to be rigid in pursuit of precision. Small talk is uncomfortable, but you become surprisingly talkative on topics within your expertise.',
            partnerQuality: 'You seek a **bright, emotionally rich partner** who laughs at your awkwardness and brings color and fun to your life. Living in a grayscale world, you\'re drawn to someone in vivid color.',
            conflictTrigger: 'Emotional outbursts and hysterical shouting provoke a mix of contempt and fear. Having your private space invaded is absolutely intolerable.',
            advice: 'You\'re right, but **"being right" alone doesn\'t move people.** Sometimes set logic aside and use emotional words—"thank you" and "I\'m sorry." Your intellectual value will reach far more people.',
            friendshipStyle: 'Extremely few friends—counting them on one hand is normal. But once accepted, the bond lasts decades. Trust doesn\'t waver even without contact. Small talk is hard, so the best friendship takes the form of "learning together" or "sharing a deep hobby." You almost always decline drinking invitations.',
            familyRole: 'The family\'s "strategic advisor." Quiet but delivers precise guidance on major decisions and career paths. Often perceived as "cold" due to limited emotional expression, but you\'re actually trying to logically optimize the family\'s happiness. In parenting, you pour energy into nurturing intellectual curiosity.'
        },
        growth: {
            level1: {
                title: 'A Step Toward Execution',
                content: 'Stop at mental simulation and move your hands. Even imperfect, **"a working rough draft"** is more valuable than **"perfection in your head."**'
            },
            level2: {
                title: 'Accepting Emotions',
                content: 'Understand that words carry **emotional messages** beyond logical meaning. Instead of dismissing feelings as "illogical," try treating the puzzle of "what are they really feeling?" as an interesting challenge.'
            },
            level3: {
                title: 'Builder of a Fair Society',
                content: 'Move beyond personal exploration to become an architect optimizing systems for organizations and society at large. Your fair frameworks protect the vulnerable and dramatically improve efficiency.'
            },
            actionItems: [
                { level: 1, title: 'Output Something', description: 'No matter how small, externalize what you\'ve thought or learned—as writing, code, or documentation.' },
                { level: 1, title: 'Practice Greetings', description: 'Even if "logically meaningless," treat morning greetings and "thank you"s as functional social lubricant, and practice them.' },
                { level: 2, title: 'Join Small Talk', description: 'Spend 5 minutes a day in "meaningless" small talk, nodding along and responding to others.' },
                { level: 2, title: 'Health Management', description: 'Recognize your body as the hardware supporting your mind. Introduce regular exercise and proper nutrition as a system.' },
                { level: 3, title: 'Teach Others', description: 'Don\'t hoard your knowledge—translate it into accessible language and share it to develop the next generation.' }
            ]
        },
        verbalHabits: {
            phrases: [
                'Doesn\'t that break the logic?',
                'Let\'s organize the premises first',
                'Do you have data for that?',
                'Let me think on it a bit more',
                'I understand the feeling, but factually speaking—'
            ],
            innerVoice: [
                'Why would anyone do it this inefficiently…',
                'Another day without talking to anyone. Best day ever',
                'I get what they\'re trying to say, but their premise is wrong'
            ],
            triggerWords: [
                'Don\'t overthink it, just go with it',
                'Just wing it, feel the vibe',
                'Everyone does it this way, so it must be right'
            ]
        }
    }
};


import type { OSContent } from '../types';

export const GammaOS_Part2_EN: Record<string, OSContent> = {
    'ENTj': {
        code: 'ENTj',
        name: 'The Pioneer (LIE)',
        catchphrase: 'A fearless innovator who reaches the future before anyone else',
        hashTag: '#FutureInnovator',
        aruaru: [
            'In meetings you say "So, what are we doing?" and demand the conclusion immediately. The small-talk portion is unbearable',
            'The thrill of clearing your to-do list is addictive. Even on days off, you\'re hunting for something to "finish"',
            'When someone else\'s work is slow, you can\'t help taking it over. Then you hit capacity overload',
            '"Does that even matter?" — you cut valueless things ruthlessly. No ill intent, but it shocks people',
            'Failure doesn\'t get you down. Your only thought is "What do I do next?"',
            'Planning matters less than execution speed. You "think while running"',
        ],
        description: `
"Time is money" in the flesh—a rational, energetic **embodiment of entrepreneurial spirit.**
Always scanning for new technology and business opportunities, you channel passion into acting first and generating profit faster than anyone.
Unafraid of failure, you operate at "try it and pivot if it doesn't work" speed, despising stagnation above all else.
You mercilessly discard old customs to maximize efficiency—because you believe change is the only path to survival.
Prone to becoming a workaholic, you sacrifice your health and personal life to chase ambitious targets.
        `.trim(),
        strength: `
・**Overwhelming bias for action**: You think while running. The moment you spot an opportunity, you pour in resources and ship—speed unmatched.
・**Rational judgment**: Unfazed by emotion, you identify break-even points and select the most efficient, profitable path with sharp business sense.
・**Future orientation**: Unburdened by past results, you always ask "What's coming next?" with the foresight to stay one step ahead of the era.
        `.trim(),
        weakness: `
・**Physical blindness**: You struggle to notice your own fatigue and pain, risking sudden collapse from overwork or neglecting personal grooming.
・**Emotional thinness**: Handling messy emotional dynamics or interpersonal drama is painful, earning you labels of "cold" or "calculating."
・**Impatience**: You lose interest quickly when results are slow, becoming irritated in situations demanding long-term nurturing or patient groundwork.
        `.trim(),
        communication: `
Be conscious of **speed and benefits.**
State the conclusion first, then show—in numbers—how it connects to profit and how efficient it is.
Avoid drawn-out small talk and emotional venting. Respect their time above all.
        `.trim(),
        leadershipStyle: 'Reform Leader: Constantly introduces new methods and overhauls organizational structure. Refuses to follow precedent and enforces results-based evaluation.',
        decisionMaking: '"Will it profit?" and "Is it efficient?" are the criteria. Emotion and relationships are secondary. Weighs risk against return and decides immediately if the math works.',
        bestMatch: 'ISFj',
        worstMatch: 'ISFp',
        doCommunication: [
            'Bring new business ideas or efficiency proposals',
            'Understand their busyness and keep conversations brief',
            'Praise their speed of decision and foresight'
        ],
        dontCommunication: [
            'Clinging to precedent with "We\'ve always done it this way"',
            'Opposing with emotional reasons or insisting on inefficient methods',
            'Commenting on their appearance or lifestyle habits with unsolicited detail'
        ],
        color: 'yellow-600',
        params: {
            analysis: 8,
            innovation: 8,
            empathy: 3,
            execution: 8,
            adaptability: 7
        },
        workStyle: {
            mission: 'To create new value and update society\'s systems for greater efficiency',
            style: '**Dynamic & Speedy**. You work actively—traveling the world, leveraging cutting-edge tools. Fast-changing industries and startup environments suit you perfectly.',
            motivation: '"Wealth" and "progress." Turning your ideas into money and making the world more convenient bring exhilaration. Stagnation is death.',
            management: 'A meritocratic leader. High performers get rapid promotion, but those who can\'t deliver receive cold indifference. Subordinates\' health and mental care aren\'t your forte—you need to delegate that.',
            bestRoles: [
                { title: 'CEO / Entrepreneur', reason: 'Your fearless risk-taking and driving force open new markets and scale organizations rapidly.' },
                { title: 'Consultant', reason: 'You uncover client inefficiencies, propose optimal improvements, and deliver profit.' },
                { title: 'Investor / Venture Capitalist', reason: 'Your eye for identifying promising technology and business models, then deploying capital for returns.' }
            ],
            ngEnvironments: [
                'Slow decision-making environments where consensus blocks all progress',
                'Organizations that reject new challenges with "There\'s no precedent"',
                'Cultures where tradition and relationships outweigh efficiency'
            ],
            idealBoss: 'A boss with speed and vision to match your own. A leader who can say "Just do it" with instant decisiveness. Indecisive bosses make you explode. If you recognize someone as more capable, you can humbly learn from them.',
            idealSubordinate: 'Someone fast-paced who commits to results. A subordinate who answers "On it" immediately is ideal. "Let me think about it" too often triggers irritation. Note: you tend to overlook their health.',
            sideProjects: [
                { title: 'Business Consulting / Advisory', reason: 'Efficiency proposals translate directly into income.' },
                { title: 'Investing / M&A Advisory', reason: 'Your foresight and risk assessment shine.' },
                { title: 'Online School / Course Creation', reason: 'Systematize knowledge and scale simultaneously.' }
            ],
            teamBehavior: 'The team\'s engine. "When can this be done?" "What were the results?" — you constantly chase progress. Meetings run at high speed; small talk is minimal. Efficient, but the team atmosphere can turn cutthroat.',
            workEnergyPattern: 'Workaholic type. Full throttle from morning to night, but blind to your body\'s signals. You claim to have "no expiration date," but regular rest is actually essential. Early-morning type.'
        },
        psychology: {
            coreDesire: 'To succeed, and to use time wisely',
            stressResponse: 'When work stalls or you\'re trapped in pointless meetings, extreme stress turns to aggression. Leg bouncing, openly sour expressions.',
            recoveryMethod: 'Moving your body in nature. Hiking, camping—digital detox that sharpens the senses refreshes you.',
            flowState: 'When conceptualizing a new business model, or after a risky investment decision pays off. Adrenaline surges and time seems to stop.',
            blindSpot: '**Health** and **family.** Your work obsession risks sacrificing family time and ignoring physical ailments until it\'s too late.'
        },
        relationships: {
            communicationStyle: 'Fast-talking and logical. You have humor, but it tends toward the sarcastic. You hate wasted conversation and are always seeking information.',
            partnerQuality: 'You seek a **sincere, domestically talented partner** who looks after your health and organizes your life. Drawn to moral grounding and stability you lack, you willingly follow their lead.',
            conflictTrigger: 'Laziness and unreliability provoke fierce anger. "If you don\'t care, quit" — you have the cold edge to cut people off.',
            advice: 'Success is wonderful, but it\'s meaningless if you lose your health or family. Sometimes stop, enjoy a slow meal, and think of time with loved ones as an "investment" worth protecting.',
            friendshipStyle: 'Friends are either "allies to win with" or "rivals who push you higher." You distance yourself from those who complain. Wide circle but shallow—most friendships lean toward "business partner." When friends consult you: "So what do you want to do?"—immediate solution mode. Sentimental time isn\'t your strength.',
            familyRole: 'The family\'s "CEO." You tend to run the household like a company—budgets, children\'s education strategy, career plans—all approached strategically. You treat parents as "equal partners" from early on. In parenting, you unconsciously demand "deliver results," needing practice in matching your children\'s pace.'
        },
        growth: {
            level1: {
                title: 'Health Management',
                content: 'Your body is your capital. Schedule regular check-ups, adequate sleep, and balanced meals as "business operations" in your calendar.'
            },
            level2: {
                title: 'Emotional Consideration',
                content: 'Efficiency isn\'t the only virtue. Valuing "wasteful"-looking communication and honoring people\'s feelings builds long-term trust—which accelerates business too.'
            },
            level3: {
                title: 'Sustainable Growth',
                content: 'Expand beyond short-term profit to consider environmental and social impact and responsibility to future generations. Your innovative power can save the world.'
            },
            actionItems: [
                { level: 1, title: 'Book Rest Time', description: 'Block half a day each weekend—phone off, fully disconnected from work—and force relaxation.' },
                { level: 1, title: 'Grooming Check', description: 'Each morning, look in the mirror and tidy your appearance. "How others see you" is a business skill too.' },
                { level: 2, title: 'Small Talk Time', description: 'Add a few minutes of casual icebreaker at the start of meetings to warm the atmosphere.' },
                { level: 2, title: 'Thank-You Letter', description: 'Write a letter or give a gift to your partner or family expressing everyday gratitude.' },
                { level: 3, title: 'Mentorship', description: 'Coach young entrepreneurs or juniors pro bono—give back your knowledge and experience to society.' }
            ]
        },
        verbalHabits: {
            phrases: [
                'That\'s inefficient. Let\'s fix it',
                'Work backward from the goal',
                'If you have an opinion, say it',
                'No time—conclusion first, please',
                'When will that be done?'
            ],
            innerVoice: [
                'This team\'s potential is nowhere near fully tapped',
                'It\'d be faster if I did it myself… but delegating matters too',
                'Every day\'s a battle. Stop moving, you lose'
            ],
            triggerWords: [
                'Yeah, eventually',
                'You don\'t need to go that far, do you?',
                'Maybe take a break? You\'re pushing too hard'
            ]
        }
    },
    'ISFj': {
        code: 'ISFj',
        name: 'The Guardian (ESI)',
        catchphrase: 'A sentinel of the sacred who protects loved ones with unwavering love and strict ethics',
        hashTag: '#SentinelOfTheSacred',
        aruaru: [
            'You\'re generous to others but even more so to your inner circle. You\'ll go the extra mile for family and close friends',
            '"Is that morally right?" is your yardstick. Your line between good and evil is razor-sharp',
            'Betrayal and lies are unforgivable. Once trust is lost, it never comes back',
            'You can\'t leave someone struggling alone—but when YOU\'RE struggling, asking for help is impossible',
            'Gift-giving etiquette is serious business. "That\'s just common courtesy" is your catchphrase',
            'Once you trust someone, your devotion is total. Quietly, but absolutely',
        ],
        description: `
With sincerity and fierce responsibility, you are a **moral guardian** who pledges unwavering loyalty to the people and values you've decided to protect.
Your world divides cleanly into trusted "insiders" and cautious "outsiders." For those you choose, no sacrifice is too great—but betrayers are never forgiven.
You treasures human decency and ethics above all, protesting injustice and immorality with a ferocity that belies your usual calm.
Prioritizing tradition and relationship quality over trends or efficiency, you find security in building a grounded, steady life.
        `.trim(),
        strength: `
・**Deep affection and devotion**: For those you've bonded with—family, close friends, your boss—you offer lifelong, unconditional support.
・**Sharp judge of character**: You intuitively sense whether someone is trustworthy or hiding malice. Your "eye for people" is remarkably reliable—scams have little chance.
・**Ethical integrity**: No matter how profitable the deal, you refuse to touch anything morally wrong. You are the organization's last line of compliance defense.
        `.trim(),
        weakness: `
・**Exclusivity and insularity**: High wariness toward outsiders makes you slow to open up. New environments and relationship changes are stressful.
・**Excessive judgment**: You may harshly condemn those who don't meet your moral standards, struggling to accept diverse values.
・**Narrow perspective**: You get caught up in immediate relationships and emotions, finding it difficult to step back for objective, big-picture assessment.
        `.trim(),
        communication: `
Show **sincerity and respect.**
Lying or trying to deceive is absolutely forbidden.
Behave courteously, keep promises, and gradually close the distance—that's the only way to open the door to their heart.
        `.trim(),
        leadershipStyle: 'Guardian Leader: Protects subordinates like family but maintains strict discipline. Leads by moral example and unites the team through trust.',
        decisionMaking: '"Is it right as a human being?" and "Can I trust this?" are the criteria. Ethics and emotional preferences outweigh cost-benefit analysis. When in doubt, consults someone trustworthy.',
        bestMatch: 'ENTj',
        worstMatch: 'ENTp',
        doCommunication: [
            'Show empathy for their care toward family and loved ones',
            'Interact with polite, respectful language',
            'Respect and never dismiss the rules and values they uphold'
        ],
        dontCommunication: [
            'Being overly familiar when not yet close, or prying into personal matters',
            'Displaying immoral or vulgar behavior in front of them',
            'Mocking their ways or traditions as "inefficient"'
        ],
        color: 'rose-600',
        params: {
            analysis: 4,
            innovation: 2,
            empathy: 9,
            execution: 9,
            adaptability: 3
        },
        workStyle: {
            mission: 'To uphold morality and order, and maintain a trustworthy community',
            style: '**Steady & Devoted**. You prefer quiet, supportive roles—back-office, human support—over flashy positions. Working with a small, trusted team is most comfortable.',
            motivation: '"Stability" and "trust." Feeling useful and needed drives you. Knowing that someone depends on you provides deep reassurance.',
            management: 'Strict but loving. You listen to subordinates\' personal concerns, but show tough guidance toward those who lie or slack off.',
            bestRoles: [
                { title: 'Healthcare / Social Worker', reason: 'Your high ethics and devotion find purpose in caring for the vulnerable.' },
                { title: 'Executive Assistant / Secretary', reason: 'You find fulfillment in perfectly supporting a trusted leader and shielding them from threats.' },
                { title: 'HR / Compliance Officer', reason: 'You function as the "gatekeeper" who upholds ethical standards and detects dishonest employees.' }
            ],
            ngEnvironments: [
                'Environments where unethical practices go unchallenged',
                '"Efficiency is everything" cultures that ignore human feelings',
                'High-turnover environments with no time to build trust'
            ],
            idealBoss: 'A sincere, reliable boss who keeps promises and protects their team. You can never trust a two-faced or politically manipulative leader. Once trust is established, you support them with your life.',
            idealSubordinate: 'Someone honest who doesn\'t lie. You cherish a subordinate who says "I\'m sorry, I made a mistake" openly. Those who dodge or cover up are "untrustworthy" and get cut.',
            sideProjects: [
                { title: 'Volunteering / Community Service', reason: 'Fulfills your desire to protect and help people.' },
                { title: 'Home Cooking Classes / Craft Workshops', reason: 'The joy of serving others meets your expertise.' },
                { title: 'Financial Planner', reason: 'Turn your household management strength into professional expertise.' }
            ],
            teamBehavior: 'The team\'s caretaker. You watch everyone\'s feelings and silently lend a hand to anyone struggling. Quiet in meetings, but offer the ethical perspective: "Is that really the right thing to do?"',
            workEnergyPattern: 'Steady marathon runner. Energy sustains as long as you work alongside trusted members. You need some alone time, but complete isolation is stressful. Morning type—most productive before noon.'
        },
        psychology: {
            coreDesire: 'To be useful, and to be protected',
            stressResponse: 'When betrayed by someone trusted or your values are denied, deep hurt transforms into intense anger. You may completely reject the person, making reconciliation impossible.',
            recoveryMethod: 'Spending time with loved ones. Eating good food with family or close friends, venting frustrations—these restore your emotional balance.',
            flowState: 'When caring for someone, or tidying a room to perfection. The moment you feel your territory is safe and protected.',
            blindSpot: '**New possibilities** and **efficiency.** Fear of change can cause you to miss opportunities, or stubbornly cling to inefficient methods and waste time.'
        },
        relationships: {
            communicationStyle: 'Polite and cautious. You withhold your true feelings until trust is established, but once you open up, you become passionately candid—sharing everything.',
            partnerQuality: 'You seek an **ambitious, sharp-minded partner** who leads you into new worlds and toward success. Drawn to the "drive" and "foresight" you lack, you support them with everything you have.',
            conflictTrigger: 'Rude behavior or returning kindness with ingratitude is absolutely unforgivable. Anyone who hurts the people you love faces your full, fierce opposition.',
            advice: 'You\'re a wonderful guardian, but sometimes you need to remove the armor and feel a new breeze. Not every stranger is an enemy. Opening your heart just a little will make your life richer and more enjoyable.',
            friendshipStyle: 'Friends are limited to "safe people," and making new ones takes time. But once trusted, you pledge "I\'m on your side no matter what." Friendships deepen through practical mutual support in hard times. In groups you\'re quiet—but you\'re the one silently carrying everyone\'s baggage.',
            familyRole: 'The family\'s "guardian deity." The unsung hero managing health, daily life, and family events. Traditions and seasonal customs are never missed. You\'re prepared to care for your parents until the end. Parenting is devoted—children\'s safety and security come first—but there\'s a tendency toward overprotection.'
        },
        growth: {
            level1: {
                title: 'Expanding Acceptance',
                content: 'Practice not labeling "people who think differently" as enemies. Instead, acknowledge "that\'s one way to see it." Accepting gray zones—instead of demanding black and white—brings peace of mind.'
            },
            level2: {
                title: 'Pursuing Efficiency',
                content: 'Working hard and producing results are different things. Learn to use modern tools or leverage others\' help to achieve big results with less effort.'
            },
            level3: {
                title: 'Guardian of Universal Love',
                content: 'Extend your deep love beyond your inner circle to all people—like a Mother Teresa figure. Your profound compassion becomes a light that heals the world and guides it forward.'
            },
            actionItems: [
                { level: 1, title: 'Try a New Place', description: 'Visit a restaurant you\'ve never been to instead of your usual spot. Introduce small adventures into daily life.' },
                { level: 1, title: 'Pause Before Reacting', description: 'When something upsets you, don\'t respond immediately—build the habit of "taking it home" first.' },
                { level: 2, title: 'Efficiency Tools', description: 'Learn keyboard shortcuts at work, or try a cleaning service—experience "buying time."' },
                { level: 2, title: 'Accepting Diversity', description: 'Read a book or watch a film by someone with completely different values. Practice "I may not understand, but I acknowledge their existence."' },
                { level: 3, title: 'Volunteer Work', description: 'Participate in activities that give your time and effort to complete strangers.' }
            ]
        },
        verbalHabits: {
            phrases: [
                'Leave it to me—I\'ll handle it',
                'As long as everyone\'s happy, that\'s enough',
                'I\'m a little worried about that…',
                'Don\'t push yourself too hard, OK?',
                'I\'ll always be cheering for you'
            ],
            innerVoice: [
                'I want to do something for them… but would it be unwanted help?',
                'I\'m putting myself last again… but others come first',
                'I have to keep my promise. Trust is everything'
            ],
            triggerWords: [
                'You worry too much about that',
                'Put yourself first for once',
                'Just handle that yourself'
            ]
        }
    }
};

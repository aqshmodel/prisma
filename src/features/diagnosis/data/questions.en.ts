import { type Question } from '../../../types/diagnosis';

/**
 * English version of 72 diagnostic questions.
 * Maintains same IDs, categories, and scoring logic as the Japanese original.
 */
export const QUESTIONS_EN: Question[] = [
    // OS Part (1-20): Cognitive & Work Style
    {
        id: 1,
        text: 'Speaking Up in Meetings',
        choiceA: 'I share my opinion first and lead the discussion toward a conclusion.',
        choiceB: 'I wait for others to share their views, organize the information, then contribute.',
        category: 'OS'
    },
    {
        id: 2,
        text: 'Attitude Toward Manuals',
        choiceA: 'They\'re guidelines—I adapt them flexibly depending on the situation.',
        choiceB: 'They\'re quality standards—I follow them closely to ensure consistency.',
        category: 'OS'
    },
    {
        id: 3,
        text: 'Priorities in a Crisis',
        choiceA: 'I prioritize making sure everyone feels heard and team morale stays up.',
        choiceB: 'I prioritize sorting out the facts and finding the most efficient solution.',
        category: 'OS'
    },
    {
        id: 4,
        text: 'What Makes Work Fulfilling',
        choiceA: 'Envisioning new possibilities and the excitement of expanding horizons.',
        choiceB: 'Hitting clear numerical targets and building a solid track record.',
        category: 'OS'
    },
    {
        id: 5,
        text: 'Schedule Management',
        choiceA: 'I like to assign tasks by the hour and keep everything on track.',
        choiceB: 'I prefer leaving room for flexibility and going with the flow of the day.',
        category: 'OS'
    },
    {
        id: 6,
        text: 'Breaking a Deadlock',
        choiceA: 'I go back to "first principles"—questioning the fundamental purpose.',
        choiceB: 'I focus on "what we can do now" and propose a concrete next step.',
        category: 'OS'
    },
    {
        id: 7,
        text: 'Ideal Boss',
        choiceA: 'Someone who empathizes with their team and communicates with warmth.',
        choiceB: 'Someone who judges fairly without emotion and evaluates by merit.',
        category: 'OS'
    },
    {
        id: 8,
        text: 'Behavior at Social Events',
        choiceA: 'I actively mingle with many people and expand my network.',
        choiceB: 'I have deep conversations with a few people or observe from the sidelines.',
        category: 'OS'
    },
    {
        id: 9,
        text: 'Evaluating a New Tool',
        choiceA: 'What future innovations could it enable? (Concept & potential)',
        choiceB: 'How does it fit into current workflows? Is it easy to use? (Practicality)',
        category: 'OS'
    },
    {
        id: 10,
        text: 'Evaluating Team Members',
        choiceA: 'Qualitative aspects: effort, attitude, and contribution to the team.',
        choiceB: 'Quantitative aspects: results, numbers, and skill level.',
        category: 'OS'
    },
    {
        id: 11,
        text: 'Planning Style',
        choiceA: 'I want to decide the details and reservations in advance for clarity.',
        choiceB: 'I just set the big picture and let discoveries and flow guide the rest.',
        category: 'OS'
    },
    {
        id: 12,
        text: 'Multitasking Tolerance',
        choiceA: 'I\'m good at rapid-fire responses in a busy, high-energy environment.',
        choiceB: 'I need blocks of uninterrupted focus time with external noise shut out.',
        category: 'OS'
    },
    {
        id: 13,
        text: 'Ideal Presentation Style',
        choiceA: 'Creative angles and compelling language that spark imagination.',
        choiceB: 'Well-organized data and structure that leaves no room for misunderstanding.',
        category: 'OS'
    },
    {
        id: 14,
        text: 'Making Tough Decisions',
        choiceA: 'My first thought is "How will this affect people emotionally?"',
        choiceB: 'My first thought is "Is this the rational choice for the organization?"',
        category: 'OS'
    },
    {
        id: 15,
        text: 'Work Approach',
        choiceA: 'A "planner"—I work backward from the goal and follow steps methodically.',
        choiceB: 'An "adapter"—I think on my feet and course-correct as I go.',
        category: 'OS'
    },
    {
        id: 16,
        text: 'Organization',
        choiceA: 'It may look messy, but I have my own system and know where everything is.',
        choiceB: 'I feel uneasy unless things are neatly organized in their designated spots.',
        category: 'OS'
    },
    {
        id: 17,
        text: 'Starting an Unfamiliar Task',
        choiceA: 'I search for past examples or manuals and follow proven patterns.',
        choiceB: 'I just dive in and figure it out through trial and error.',
        category: 'OS'
    },
    {
        id: 18,
        text: 'Honesty vs. Tact',
        choiceA: 'In a professional setting, delivering accurate facts should come first.',
        choiceB: 'Even when correct, you should avoid saying things that embarrass others.',
        category: 'OS'
    },
    {
        id: 19,
        text: 'Abstract Discussions',
        choiceA: 'I enjoy them. Even without a conclusion, the thinking process has value.',
        choiceB: 'I find them frustrating. Discussions without practical outcomes feel wasteful.',
        category: 'OS'
    },
    {
        id: 20,
        text: 'Deadlines',
        choiceA: 'I channel the pressure of a looming deadline into a focused final push.',
        choiceB: 'I finish well before the deadline and use the extra time for review.',
        category: 'OS'
    },

    // Subtype Part (21-44): Behavioral Tendencies
    {
        id: 21,
        text: 'Quality Standard',
        choiceA: 'I want to refine repeatedly until I\'m satisfied with perfect quality.',
        choiceB: 'I\'d rather ship at 60-70% and iterate based on feedback.',
        category: 'Subtype'
    },
    {
        id: 22,
        text: 'Sharing Ideas',
        choiceA: 'I share immediately and refine based on people\'s reactions.',
        choiceB: 'I develop my thinking logically and only share when I\'m confident.',
        category: 'Subtype'
    },
    {
        id: 23,
        text: 'Preferred Role',
        choiceA: '"Diplomat"—external negotiations, new partnerships, outward-facing work.',
        choiceB: '"Guardian"—internal quality control, enforcing standards, strengthening foundations.',
        category: 'Subtype'
    },
    {
        id: 24,
        text: 'Applying Rules',
        choiceA: 'Once established, rules should be followed consistently without exceptions.',
        choiceB: 'When rules no longer fit reality, they should be adapted on the ground.',
        category: 'Subtype'
    },
    {
        id: 25,
        text: 'Stressful Environment',
        choiceA: 'No change—same routine every day with zero stimulation.',
        choiceB: 'Constant change—policies shift daily and I can\'t work at my own pace.',
        category: 'Subtype'
    },
    {
        id: 26,
        text: 'Interpersonal Style',
        choiceA: 'I maintain my style and beliefs regardless of who I\'m dealing with.',
        choiceB: 'I adjust my behavior to match the other person\'s personality and position.',
        category: 'Subtype'
    },
    {
        id: 27,
        text: 'Purpose of Debate',
        choiceA: 'Finding common ground by incorporating different perspectives.',
        choiceB: 'Proving the validity of my argument through logic and persuasion.',
        category: 'Subtype'
    },
    {
        id: 28,
        text: 'Leadership Approach',
        choiceA: 'Cast a vision and set direction; delegate execution to the team.',
        choiceB: 'Lead by doing—roll up your sleeves and show the way through action.',
        category: 'Subtype'
    },
    {
        id: 29,
        text: 'Recovering from Failure',
        choiceA: 'I reflect deeply alone until I fully understand what went wrong.',
        choiceB: 'I talk to others or find distractions to shift my mood externally.',
        category: 'Subtype'
    },
    {
        id: 30,
        text: 'Depth of Thinking',
        choiceA: 'I go deep—drilling into a single specialty as far as I can.',
        choiceB: 'I go wide—connecting multiple related fields and covering broad ground.',
        category: 'Subtype'
    },
    {
        id: 31,
        text: 'Receiving Corrections',
        choiceA: '"If it improves things, great"—I apply the fix right away.',
        choiceB: '"My intent wasn\'t understood"—I want to discuss until I\'m convinced.',
        category: 'Subtype'
    },
    {
        id: 32,
        text: 'Ideal Team',
        choiceA: 'A stable team of seasoned pros who understand each other without words.',
        choiceB: 'A dynamic team with lively debates and constant change.',
        category: 'Subtype'
    },
    {
        id: 33,
        text: 'Preferred Phase',
        choiceA: 'Building something from nothing—the "0 to 1" launch phase.',
        choiceB: 'Optimizing and scaling what already exists—the "1 to 100" growth phase.',
        category: 'Subtype'
    },
    {
        id: 34,
        text: 'Timing Your Remarks',
        choiceA: 'I read the room and wait for the right moment to be heard.',
        choiceB: 'I speak up immediately with facts, even if it disrupts the mood.',
        category: 'Subtype'
    },
    {
        id: 35,
        text: 'Problem-Solving Approach',
        choiceA: 'See the big picture and intuitively zero in on "this looks suspicious."',
        choiceB: 'Build up from details—verify data points one by one to form the whole.',
        category: 'Subtype'
    },
    {
        id: 36,
        text: 'Work Outside Your Expertise',
        choiceA: 'I decline or redirect—I can\'t guarantee quality outside my strength.',
        choiceB: 'I accept—new experiences are valuable learning opportunities.',
        category: 'Subtype'
    },
    {
        id: 37,
        text: 'How Others Describe You',
        choiceA: 'I\'m often called "stubborn" or "particular."',
        choiceB: 'I\'m often called "flexible" or "a people-pleaser."',
        category: 'Subtype'
    },
    {
        id: 38,
        text: 'Focus Style',
        choiceA: 'I prefer long, uninterrupted sessions—full immersion, world shut out.',
        choiceB: 'I prefer mixing in breaks and varied tasks—keep the rhythm changing.',
        category: 'Subtype'
    },
    {
        id: 39,
        text: 'When Someone Asks for Advice',
        choiceA: 'I listen first and empathize with their feelings before anything else.',
        choiceB: 'I quickly analyze the situation and offer concrete solutions.',
        category: 'Subtype'
    },
    {
        id: 40,
        text: 'Level of Direction',
        choiceA: '"Leave it to me" autonomy—I\'m most motivated with freedom.',
        choiceB: 'Clear objectives and criteria—I can\'t act without knowing the purpose.',
        category: 'Subtype'
    },
    {
        id: 41,
        text: 'Skill Development',
        choiceA: 'Sharpen my strengths into an unbeatable weapon—go deep in one area.',
        choiceB: 'Eliminate weaknesses and build versatility—be prepared for anything.',
        category: 'Subtype'
    },
    {
        id: 42,
        text: 'Dealing with Silence',
        choiceA: 'I can\'t stand it—I\'ll break the silence and get conversation going.',
        choiceB: 'Silence is fine—I wait patiently until someone speaks up.',
        category: 'Subtype'
    },
    {
        id: 43,
        text: 'Dwelling on the Past',
        choiceA: 'I replay past events often, thinking about what I could have done differently.',
        choiceB: 'What\'s done is done—I move on and focus on the next action.',
        category: 'Subtype'
    },
    {
        id: 44,
        text: 'Worst-Case Scenario',
        choiceA: 'Being forced to do work that violates my values and aesthetic (self-betrayal).',
        choiceB: 'Being seen as "useless" or "incompetent" by others (loss of reputation).',
        category: 'Subtype'
    },

    // Engine Part (45-62): Motivation Drivers
    {
        id: 45,
        text: 'Project Priorities',
        choiceA: 'Even if it takes longer, I deliver flawless quality I can be proud of.',
        choiceB: 'Speed over perfection—get it to market fast and capture results.',
        category: 'Engine'
    },
    {
        id: 46,
        text: 'Being Relied On',
        choiceA: '"You saved me"—being appreciated as personal emotional support.',
        choiceB: '"Your insight is sharp"—being valued for expertise and analytical skill.',
        category: 'Engine'
    },
    {
        id: 47,
        text: 'Sense of Belonging',
        choiceA: 'I want to feel unity with the group and work toward shared goals.',
        choiceB: 'I want to stand out within the group and express my unique style.',
        category: 'Engine'
    },
    {
        id: 48,
        text: 'Ideal Work Environment',
        choiceA: 'Freedom to experiment with ideas—minimal oversight, maximum creativity.',
        choiceB: 'Decision-making power—I want authority to move people and organizations.',
        category: 'Engine'
    },
    {
        id: 49,
        text: 'Stance in Meetings',
        choiceA: 'I read the atmosphere and seek harmonious consensus without conflict.',
        choiceB: 'I speak up against errors no matter the mood—integrity over comfort.',
        category: 'Engine'
    },
    {
        id: 50,
        text: 'Leadership Style',
        choiceA: 'Build trust by caring for team members personally—a nurturing approach.',
        choiceB: 'Build trust through decisive action and overcoming challenges together.',
        category: 'Engine'
    },
    {
        id: 51,
        text: 'What Motivates You Most',
        choiceA: 'Visible success—winning contests, MVP awards, public recognition.',
        choiceB: 'Quiet depth—uninterrupted time to analyze complex topics until satisfied.',
        category: 'Engine'
    },
    {
        id: 52,
        text: 'What You Can\'t Stand',
        choiceA: 'Dull routine with zero novelty or excitement—sameness every day.',
        choiceB: 'Uniform systems where everyone is treated identically—no self-expression.',
        category: 'Engine'
    },
    {
        id: 53,
        text: 'Risk Management',
        choiceA: 'I prepare for worst-case scenarios and eliminate uncertainties methodically.',
        choiceB: 'I stay optimistic—"it\'ll work out"—and maintain my peace of mind.',
        category: 'Engine'
    },
    {
        id: 54,
        text: 'Work Standards',
        choiceA: 'Socially and ethically correct—aligned with rules and proper order.',
        choiceB: 'Aesthetically resonant—aligned with my personal taste and emotional depth.',
        category: 'Engine'
    },
    {
        id: 55,
        text: 'What Drives Action',
        choiceA: 'Helping someone in need—that\'s when I feel the most energy.',
        choiceB: 'Pursuing what excites me—fun and curiosity fuel my strongest drive.',
        category: 'Engine'
    },
    {
        id: 56,
        text: 'Definition of Winning',
        choiceA: 'Hit the target, beat the rival, prove competence—visible achievement.',
        choiceB: 'Maintain control, answer to no one, protect my territory—independence.',
        category: 'Engine'
    },
    {
        id: 57,
        text: 'Social Distance',
        choiceA: 'I keep a comfortable distance—observe objectively without getting entangled.',
        choiceB: 'I merge fully—blend into the group and enjoy the feeling of belonging.',
        category: 'Engine'
    },
    {
        id: 58,
        text: 'Professionalism',
        choiceA: 'Loyalty—fulfill the expected role and stay faithful to organizational decisions.',
        choiceB: 'Results—if shortcuts deliver better outcomes, I\'ll take them without hesitation.',
        category: 'Engine'
    },
    {
        id: 59,
        text: 'Thinking Pattern',
        choiceA: 'Find problems in the status quo and improve them one by one for perfection.',
        choiceB: 'Don\'t get stuck on one thing—keep generating new possibilities and ideas.',
        category: 'Engine'
    },
    {
        id: 60,
        text: 'Type of Connection',
        choiceA: 'Warm, nurturing bonds—like family, always caring for each other.',
        choiceB: 'Deep, soulful understanding—recognizing each other\'s solitude and sensitivity.',
        category: 'Engine'
    },
    {
        id: 61,
        text: 'How You Want to Be Known',
        choiceA: 'The "go-to brain"—respected for wisdom, insight, and deep knowledge.',
        choiceB: 'The "natural leader"—admired for action, presence, and dependability.',
        category: 'Engine'
    },
    {
        id: 62,
        text: 'Handling Trouble',
        choiceA: 'Immediately rally the team and coordinate resources to tackle it together.',
        choiceB: 'Stay calm, observe the situation, and wait for things to settle before acting.',
        category: 'Engine'
    },

    // Bias Part (63-72): Judgment Patterns
    {
        id: 63,
        text: 'Reacting to Contradictory Data',
        choiceA: 'On-the-ground intuition and context matter most. Data alone shouldn\'t change our course—we should trust our hypothesis and explore possibilities.',
        choiceB: 'No matter how confident we are, negative data means we could be wrong. We must face facts objectively and reconsider our plan from scratch.',
        category: 'Bias'
    },
    {
        id: 64,
        text: 'When a Rival Succeeds',
        choiceA: 'Their success was mostly luck—right place, right time. I analyze the environmental factors calmly.',
        choiceB: 'Even though I dislike admitting it, their success reflects genuine ability. I accept the facts.',
        category: 'Bias'
    },
    {
        id: 65,
        text: 'Deciding to Cut Losses',
        choiceA: 'We can\'t waste all the sweat and tears our team invested. I\'ll keep searching for a way to make it work.',
        choiceB: 'Past effort is a sunk cost—it shouldn\'t influence the decision. I make the cold call to stop and prevent future losses.',
        category: 'Bias'
    },
    {
        id: 66,
        text: 'Switching Tools',
        choiceA: 'We invested significantly in this—giving up too quickly is premature. It\'s our responsibility to make it work.',
        choiceB: 'Past investment is unrecoverable. If something better exists, switching immediately is the rational choice.',
        category: 'Bias'
    },
    {
        id: 67,
        text: 'Organizational Reform',
        choiceA: 'A leader should minimize disruption. Respect existing methods and improve gradually—soft landing.',
        choiceB: 'Short-term pain is an investment in the future. Execute radical change even if it hurts—hard landing.',
        category: 'Bias'
    },
    {
        id: 68,
        text: 'Transfer Opportunity',
        choiceA: 'My experience and network are most valuable here. Deepening expertise is my greatest contribution—I decline.',
        choiceB: 'Growth comes from new environments. I take the risk and broaden my horizons—I accept.',
        category: 'Bias'
    },
    {
        id: 69,
        text: 'Analyzing Success',
        choiceA: 'Our strategy and hard work paid off. I\'ll analyze what worked and confidently apply it next time.',
        choiceB: 'External factors—competitor mistakes, market trends, luck—also played a big role. I stay humble and vigilant.',
        category: 'Bias'
    },
    {
        id: 70,
        text: 'Analyzing Failure',
        choiceA: 'Structural issues—budget, coordination—were the main cause. Fixing the environment prevents recurrence.',
        choiceB: 'No excuses—our own poor judgment and skill gaps were responsible. Honest self-reflection is key.',
        category: 'Bias'
    },
    {
        id: 71,
        text: 'Dissenting in a Meeting',
        choiceA: 'Disrupting the team\'s momentum isn\'t worth it. Even with concerns, I respect the consensus and give it a try.',
        choiceB: 'Uncomfortable truths must be spoken. Voicing risks is a genuine contribution to the organization.',
        category: 'Bias'
    },
    {
        id: 72,
        text: 'Attitude Toward Tradition',
        choiceA: 'Long-standing traditions contain accumulated wisdom. They deserve respect and should generally be maintained.',
        choiceB: 'Traditions can breed complacency. We should always question "Is this still valid?" and verify from scratch.',
        category: 'Bias'
    }
];

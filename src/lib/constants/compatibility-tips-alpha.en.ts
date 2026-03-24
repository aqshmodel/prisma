import type { OSTypeCode } from '@/types/diagnosis';

type PairKey = `${OSTypeCode}-${OSTypeCode}`;

export const ALPHA_PAIR_TIPS_EN: Partial<Record<PairKey, string>> = {
    // ===== The Inventor (ILE/ENTp) as source =====
    // The Inventor (ILE/ENTp) × The Mediator (SEI/ISFp) — Dual
    'ENTp-ISFp': 'In a brainstorming session, ENTp fires off idea after idea while ISFp quietly jots notes, picking out only the feasible ones. Before you know it, a rough project plan has taken shape. Few words exchanged, yet no other pair is this perfectly in sync.',
    // The Inventor (ILE/ENTp) × The Host (ESE/ESFj) — Activity
    'ENTp-ESFj': 'At a social event, ENTp throws out a wild story and ESFj amplifies it with infectious laughter. Their energy spawns a new project on the spot — but three hours later, both are heading home with drained batteries.',
    // The Inventor (ILE/ENTp) × The Analyst (LII/INTj) — Mirror
    'ENTp-INTj': 'During a code review, ENTp proposes a novel architecture while INTj quietly stress-tests the logic. Their debate goes on and on — almost aligned but subtly off — yet that very gap occasionally yields unexpected breakthroughs.',
    // The Inventor (ILE/ENTp) → The Mentor (EIE/ENFj) — Benefit
    'ENTp-ENFj': 'ENFj hears ENTp\'s groundbreaking idea and is unconsciously swept into the vision. ENFj\'s organizational skills often carry it to fruition, but ENTp rarely reciprocates ENFj\'s proposals with the same intensity.',
    // The Inventor (ILE/ENTp) → The Inspector (LSI/ISTj) — Supervision
    'ENTp-ISTj': 'ENTp\'s casual remark — "Isn\'t that approach kind of inefficient?" — lands on ISTj as a dismissal of their carefully built work. Zero malice, yet ISTj feels strangely wounded.',
    // The Inventor (ILE/ENTp) × The Conqueror (SLE/ESTp) — Business
    'ENTp-ESTp': 'ENTp outlines a vision; ESTp takes immediate action. The tempo clicks, but underneath ENTp wishes they\'d had more planning time, while ESTp thinks ENTp overthinks. Surface cooperation hides a quiet frustration.',
    // The Inventor (ILE/ENTp) × The Poet (IEI/INFp) — Illusionary
    'ENTp-INFp': 'At first, deep conversation feels within reach. ENTp\'s inventiveness meets INFp\'s poetic interpretation, and the exchange turns philosophical — until practical tasks arrive and their rhythms mysteriously fall out of sync.',
    // The Inventor (ILE/ENTp) × The Politician (SEE/ESFp) — Super-Ego
    'ENTp-ESFp': 'ENTp\'s logical analysis bores ESFp; ESFp\'s instinct-driven decisions make ENTp question the basis. Mutual respect exists, but working together drains both mentally. Breaks are mandatory.',
    // The Inventor (ILE/ENTp) × The Critic (ILI/INTp) — Contrary
    'ENTp-INTp': 'Both strong in N, their initial sparks look identical — yet conclusions always diverge. ENTp expands possibilities while INTp flags risks. Constructive at best, parallel lines at worst.',
    // The Inventor (ILE/ENTp) × The Pioneer (LIE/ENTj) — Quasi-Identity
    'ENTp-ENTj': 'Shared intellectual curiosity masks a core difference: ENTp savors exploring possibilities; ENTj charges toward results. They vibe during planning, then puzzle over each other during execution.',
    // The Inventor (ILE/ENTp) × The Guardian (ESI/ISFj) — Conflict
    'ENTp-ISFj': 'The more ENTp talks big-picture vision, the more ISFj feels concrete steps and emotional nuance are being ignored. ISFj\'s meticulous planning feels suffocating to ENTp. Without a facilitator, alignment is elusive.',
    // The Director (LSE/ESTj) → The Inventor (ILE/ENTp) — Benefit (reverse)
    'ENTp-ESTj': 'ESTj\'s practical advice occasionally gives ENTp an unexpected angle. But ENTp\'s abstract musings rarely land with ESTj — influence stays mostly one-directional.',
    // The Humanist (EII/INFj) → The Inventor (ILE/ENTp) — Supervision (reverse)
    'ENTp-INFj': 'INFj\'s gentle question — "Did you consider how people feel?" — pokes the exact blind spot ENTp has been ignoring. ENTp knows it\'s well-intentioned but can\'t shake the discomfort.',
    // The Inventor (ILE/ENTp) × The Advocate (IEE/ENFp) — Kindred
    'ENTp-ENFp': 'Both Ne-dominant, their brainstorm leaves the whiteboard buried in sticky notes. Idea generation is thrilling — but neither excels at execution, so those grand plans may never get folded up.',
    // The Inventor (ILE/ENTp) × The Craftsman (SLI/ISTp) — Semi-Dual
    'ENTp-ISTp': 'ENTp\'s flashes of insight get quietly forged into reality by ISTp. Near-Dual comfort with one gap: at a critical moment, the follow-through falls just short. 80% bliss, 20% "almost."',

    // ===== The Mediator (SEI/ISFp) as source =====
    // The Mediator (SEI/ISFp) × The Inventor (ILE/ENTp) — Dual
    'ISFp-ENTp': 'ENTp has scattered the desk with papers; ISFp quietly sets a coffee beside them. ENTp might not even notice — and ISFp is fine with that. Unglamorous, but this comfort is irreplaceable.',
    // The Mediator (SEI/ISFp) × The Host (ESE/ESFj) — Mirror
    'ISFp-ESFj': 'Both use Fe and Si, but in mirror fashion. While ESFj pumps energy into the room, ISFp slips over to the person sitting alone. Same care instinct, different methods — and a mutual "why don\'t you do it MY way?" feeling.',
    // The Mediator (SEI/ISFp) × The Analyst (LII/INTj) — Activity
    'ISFp-INTj': 'ISFp\'s calm aura disarms INTj into dropping their guard and sharing honest thoughts. INTj\'s sharp analysis gives ISFp a fresh jolt. Great in short bursts, but overtime ISFp tires of INTj\'s coolness and INTj grows impatient with ISFp\'s vagueness.',
    // The Mentor (EIE/ENFj) → The Mediator (SEI/ISFp) — Supervision (reverse)
    'ISFp-ENFj': 'ISFp tries to follow ENFj\'s passionate leadership, but the pace is overwhelming. ENFj\'s probing questions inadvertently poke ISFp\'s vulnerable spots.',
    // The Inspector (LSI/ISTj) → The Mediator (SEI/ISFp) — Benefit (reverse)
    'ISFp-ISTj': 'ISTj\'s steady advice anchors ISFp and provides a comforting framework. ISTj\'s planning gives ISFp\'s actions structure — but ISFp\'s sensory feedback barely registers with ISTj.',
    // The Mediator (SEI/ISFp) × The Conqueror (SLE/ESTp) — Illusionary
    'ISFp-ESTp': 'ISFp finds ESTp\'s decisiveness reassuring; ESTp finds ISFp\'s softness healing. Sensory pleasures — meals, drives — are easily shared, but deeper values diverge like a mirage.',
    // The Mediator (SEI/ISFp) × The Poet (IEI/INFp) — Business
    'ISFp-INFp': 'Two gentle souls, yet ISFp focuses on present-moment comfort while INFp chases distant visions. They share a quiet space but look in different directions — collaboration works, but deep resonance is elusive.',
    // The Mediator (SEI/ISFp) × The Politician (SEE/ESFp) — Contrary
    'ISFp-ESFp': 'ISFp cultivates a cozy space; ESFp bolts outside seeking thrills. To ISFp, ESFp is restless; to ESFp, ISFp is stuck. Letting each other\'s pace exist without judgment is the key.',
    // The Mediator (SEI/ISFp) × The Critic (ILI/INTp) — Super-Ego
    'ISFp-INTp': 'INTp\'s sharp critique feels cold to ISFp; ISFp\'s emotional reasoning puzzles INTp. Each excels in the other\'s weakest zone — exhausting in tandem, but briefly enlightening.',
    // The Mediator (SEI/ISFp) × The Pioneer (LIE/ENTj) — Conflict
    'ISFp-ENTj': 'ENTj\'s relentless result-orientation leaves ISFp feeling abandoned. ISFp\'s delicate consideration reads as stalling to ENTj. Fundamentally misaligned — a mediator helps immensely.',
    // The Mediator (SEI/ISFp) × The Guardian (ESI/ISFj) — Quasi-Identity
    'ISFp-ISFj': 'Similar gentleness and caring instincts, but ISFp moves by reading the room while ISFj is driven by duty. Surface friendship comes easy; a lingering "they don\'t really get me" remains.',
    // The Director (LSE/ESTj) → The Mediator (SEI/ISFp) — Supervision (reverse)
    'ISFp-ESTj': 'ESTj\'s efficiency-driven directives feel like pressure to ISFp. ESTj means well — even expects good things — but ISFp\'s delicate sensors pick up harshness.',
    // The Humanist (EII/INFj) → The Mediator (SEI/ISFp) — Benefit
    'ISFp-INFj': 'INFj\'s idealism quietly sparks ISFp\'s hidden ambition. INFj\'s values add new color to ISFp\'s life — but ISFp\'s reciprocal influence is limited.',
    // The Mediator (SEI/ISFp) × The Advocate (IEE/ENFp) — Semi-Dual
    'ISFp-ENFp': 'ENFp\'s brightness and imagination let ISFp relax and lean in. Near-Dual warmth, yet when ISFp truly struggles, ENFp\'s support falls just a touch short. A tantalizingly close match.',
    // The Mediator (SEI/ISFp) × The Craftsman (SLI/ISTp) — Kindred
    'ISFp-ISTp': 'Both Si-strong, they share serene, quiet time beautifully — cooking, DIY, walks. But when challenges hit, both default to passive mode. Someone needs to wave the flag.',

    // ===== The Host (ESE/ESFj) as source =====
    // The Host (ESE/ESFj) × The Inventor (ILE/ENTp) — Activity
    'ESFj-ENTp': 'ESFj organizes a team outing and ENTp\'s quirky insights make it unforgettable. Their banter is peak entertainment — until a few hours in when both batteries die. Timing is everything.',
    // The Host (ESE/ESFj) × The Mediator (SEI/ISFp) — Mirror
    'ESFj-ISFp': 'ESFj energizes the whole room while ISFp quietly checks on the person sitting alone. Same care instinct, opposite approach — and each occasionally learns from the other\'s method.',
    // The Host (ESE/ESFj) × The Analyst (LII/INTj) — Dual
    'ESFj-INTj': 'When ESFj whips up an emotional whirlwind, INTj calmly directs traffic. When INTj fumbles for the right words, ESFj translates with a perfect analogy. A golden pair that naturally fills each other\'s gaps.',
    // The Host (ESE/ESFj) × The Mentor (EIE/ENFj) — Business
    'ESFj-ENFj': 'Both Fe-users, emotional synchronization is instant. Event management is flawless as a duo — but subtle tension over who leads can surface. Clarify roles early.',
    // The Host (ESE/ESFj) × The Inspector (LSI/ISTj) — Illusionary
    'ESFj-ISTj': 'ESFj\'s warm hospitality puts ISTj at ease; ISTj\'s meticulousness reassures ESFj. Daily interactions are pleasant — until a values discussion reveals a surprisingly wide gap.',
    // The Host (ESE/ESFj) → The Conqueror (SLE/ESTp) — Benefit
    'ESFj-ESTp': 'ESFj\'s passionate proposals move ESTp to action and results follow naturally. ESFj sets direction; ESTp executes on the ground. But ESTp\'s counter-proposals rarely resonate with ESFj — influence runs one way.',
    // The Host (ESE/ESFj) → The Poet (IEI/INFp) — Supervision
    'ESFj-INFp': 'ESFj\'s well-meaning "You should put yourself out there more!" inadvertently invades INFp\'s inner sanctum. No bad intent — but ESFj keeps unknowingly stepping on INFp\'s most sensitive ground.',
    // The Host (ESE/ESFj) × The Politician (SEE/ESFp) — Quasi-Identity
    'ESFj-ESFp': 'Similar social energy, but ESFj prioritizes group harmony while ESFp chases personal goals. Party crowd-pleasers both — yet when agendas clash, neither backs down.',
    // The Host (ESE/ESFj) × The Critic (ILI/INTp) — Conflict
    'ESFj-INTp': 'ESFj\'s emotionally rich communication collides head-on with INTp\'s cold analysis. ESFj thinks "so cold"; INTp thinks "too loud." Appreciating each other\'s strengths demands serious maturity.',
    // The Host (ESE/ESFj) × The Pioneer (LIE/ENTj) — Super-Ego
    'ESFj-ENTj': 'ENTj\'s laser focus on goals feels heartless to ESFj; ESFj\'s emotional reasoning strikes ENTj as inefficient. Mutual respect exists, but the combination is mentally taxing.',
    // The Host (ESE/ESFj) × The Guardian (ESI/ISFj) — Contrary
    'ESFj-ISFj': 'Both appear care-oriented on the surface, but ESFj\'s outgoing attentiveness and ISFj\'s inward sense of duty clash more than expected. ESFj sees "dark"; ISFj sees "noisy."',
    // The Host (ESE/ESFj) × The Director (LSE/ESTj) — Kindred
    'ESFj-ESTj': 'Shared practicality and efficiency create a natural alliance at work. Both are particular about methods, though, so "My way is right" tugs-of-war pop up in the details.',
    // The Host (ESE/ESFj) × The Humanist (EII/INFj) — Semi-Dual
    'ESFj-INFj': 'ESFj\'s brightness and INFj\'s depth complement each other 80% of the time. The gap: ESFj craves lively reactions that INFj can\'t always deliver; INFj yearns for introspective space that ESFj doesn\'t understand.',
    // The Advocate (IEE/ENFp) → The Host (ESE/ESFj) — Benefit (reverse)
    'ESFj-ENFp': 'ENFp\'s free-spirited ideas expand ESFj\'s world, but ENFp\'s spontaneity can derail ESFj\'s plans. ENFp\'s influence is large; ESFj\'s reciprocal impact is limited.',
    // The Host (ESE/ESFj) → The Craftsman (SLI/ISTp) — Supervision (reverse)
    'ESFj-ISTp': 'ISTp\'s quiet, craftsman-like style makes ESFj wish for "more communication" — but that very request hits ISTp\'s weakest point. ESFj\'s goodwill becomes ISTp\'s burden.',

    // ===== The Analyst (LII/INTj) as source =====
    // The Analyst (LII/INTj) × The Inventor (ILE/ENTp) — Mirror
    'INTj-ENTp': 'INTj pursues logical consistency while ENTp expands possibilities. They share a problem but attack it from mirror-opposite angles. Intellectually stimulating, though conclusions rarely align.',
    // The Analyst (LII/INTj) × The Mediator (SEI/ISFp) — Activity
    'INTj-ISFp': 'ISFp\'s gentle presence softens INTj\'s rigid air, occasionally drawing out a rare warmth. But over long stretches, INTj\'s logic tires ISFp, and the pace gap becomes too visible.',
    // The Analyst (LII/INTj) × The Host (ESE/ESFj) — Dual
    'INTj-ESFj': 'While INTj silently analyzes a problem, ESFj appears with perfectly timed tea. In return, INTj provides a crystal-clear decision axis when ESFj is lost. Quiet care that sustains each other\'s productivity.',
    // The Analyst (LII/INTj) × The Mentor (EIE/ENFj) — Illusionary
    'INTj-ENFj': 'INTj respects ENFj\'s intellectual depth; ENFj is moved by INTj\'s passion. Surface chemistry looks promising — but underneath, the logic-vs-emotion divide runs deep. A beautiful mirage.',
    // The Analyst (LII/INTj) × The Inspector (LSI/ISTj) — Business
    'INTj-ISTj': 'Both Ti-analytical and measured, data-driven debates flow smoothly. But INTj favors novel frameworks while ISTj relies on established rules — methodology clashes are frequent.',
    // The Conqueror (SLE/ESTp) → The Analyst (LII/INTj) — Supervision (reverse)
    'INTj-ESTp': 'ESTp\'s bold action can overwhelm INTj, making their own caution feel like weakness. No harm intended, but ESTp\'s presence alone destabilizes INTj\'s usual composure.',
    // The Poet (IEI/INFp) → The Analyst (LII/INTj) — Benefit (reverse)
    'INTj-INFp': 'INFp\'s poetic sensibility reveals to INTj a world logic alone can\'t reach. INFp\'s influence broadens INTj\'s horizons — but the reverse is limited, tilting the relationship one way.',
    // The Analyst (LII/INTj) × The Politician (SEE/ESFp) — Conflict
    'INTj-ESFp': 'ESFp charges ahead on instinct; INTj calls it reckless. INTj\'s careful planning looks timid to ESFp. Core values clash — a bridge-builder is needed for any productive exchange.',
    // The Analyst (LII/INTj) × The Critic (ILI/INTp) — Quasi-Identity
    'INTj-INTp': 'Both love deep intellectual exploration and can debate for hours. But INTj seeks systematic coherence while INTp focuses on future prediction. So similar yet subtly off — a perpetual "almost."',
    // The Analyst (LII/INTj) × The Pioneer (LIE/ENTj) — Contrary
    'INTj-ENTj': 'INTj perfects the theory; ENTj demands immediate implementation. Same curiosity, opposite tempos. INTj: "too hasty." ENTj: "too slow."',
    // The Analyst (LII/INTj) × The Guardian (ESI/ISFj) — Super-Ego
    'INTj-ISFj': 'INTj admires ISFj\'s sense of duty and moral conviction — but can\'t grasp emotion-based judgment. ISFj, in turn, finds INTj\'s logic-first approach cold. Much to learn, but proximity drains energy.',
    // The Analyst (LII/INTj) × The Director (LSE/ESTj) — Semi-Dual
    'INTj-ESTj': 'ESTj\'s execution power grounds INTj\'s theories in reality. Near-Dual comfort — except ESTj\'s efficiency-driven pace sometimes leaves INTj wishing for one more beat of breathing room.',
    // The Analyst (LII/INTj) × The Humanist (EII/INFj) — Kindred
    'INTj-INFj': 'Hours of quiet, deep conversation are pure joy for both. Philosophical all-nighters are natural — but neither excels at execution, so brilliant ideas risk remaining armchair theories. Recruit an action-oriented ally.',
    // The Advocate (IEE/ENFp) → The Analyst (LII/INTj) — Supervision (reverse)
    'INTj-ENFp': 'ENFp\'s freewheeling brainstorming can crack INTj\'s framework in useful ways — but the process feels like chaos to INTj. ENFp craves flexibility; INTj craves order. Sync is tricky.',
    // The Analyst (LII/INTj) → The Craftsman (SLI/ISTp) — Benefit
    'INTj-ISTp': 'ISTp gains concrete improvement hints from INTj\'s theoretical frameworks. INTj draws the blueprints; ISTp builds them. Natural flow, but ISTp\'s reverse influence on INTj is weak.',
};

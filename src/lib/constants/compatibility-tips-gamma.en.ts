import type { OSTypeCode } from '@/types/diagnosis';

type PairKey = `${OSTypeCode}-${OSTypeCode}`;

export const GAMMA_PAIR_TIPS_EN: Partial<Record<PairKey, string>> = {
    // ===== The Politician (SEE/ESFp) as source =====
    // The Politician (SEE/ESFp) × The Inventor (ILE/ENTp) — Super-Ego
    'ESFp-ENTp': 'When ENTp starts explaining theory, ESFp can\'t hide the boredom. ESFp\'s gut-driven decisions make ENTp question the basis. Short encounters offer fresh perspectives; long ones weigh heavy.',
    // The Politician (SEE/ESFp) × The Mediator (SEI/ISFp) — Contrary
    'ESFp-ISFp': 'ESFp chases new thrills while ISFp tends a cozy nest. Both sensory types, yet introversion vs. extroversion creates a clear split — ESFp feels bored, ISFp feels exhausted.',
    // The Politician (SEE/ESFp) × The Host (ESE/ESFj) — Quasi-Identity
    'ESFp-ESFj': 'Both shine at parties, but ESFj serves everyone\'s fun while ESFp pursues personal goals. Beneath the glamour, priorities are misaligned — discovered after the fact.',
    // The Politician (SEE/ESFp) × The Analyst (LII/INTj) — Conflict
    'ESFp-INTj': 'INTj\'s cautious planning is "overthinking" to ESFp; ESFp\'s momentum is "reckless" to INTj. Cognitive functions are perfectly opposite — each\'s strength is the other\'s blind spot. A mediator is a must.',
    // The Politician (SEE/ESFp) ← The Mentor (EIE/ENFj) — Benefit (reverse)
    'ESFp-ENFj': 'ENFj\'s grand vision unconsciously steers ESFp into action. ENFj\'s guidance maximizes ESFp\'s power — but ESFp\'s field instincts barely reach ENFj, tilting the relationship.',
    // The Politician (SEE/ESFp) ← The Inspector (LSI/ISTj) — Supervision (reverse)
    'ESFp-ISTj': 'ISTj\'s rule-following posture restricts ESFp\'s freedom. The more ISTj talks manuals, the more ESFp feels caged — ISTj\'s demands land squarely on ESFp\'s least capable zone.',
    // The Politician (SEE/ESFp) × The Conqueror (SLE/ESTp) — Kindred
    'ESFp-ESTp': 'Full-throttle Se action pair. Mountaineering or business — charging together creates unstoppable momentum. But cool judgment takes a backseat — a "runaway risk" combo.',
    // The Politician (SEE/ESFp) × The Poet (IEI/INFp) — Semi-Dual
    'ESFp-INFp': 'INFp\'s quiet intuition adds depth to ESFp\'s actions. Near-Dual comfort — but INFp sometimes can\'t keep up with ESFp\'s pace, or ESFp finds INFp\'s silence wanting.',
    // The Politician (SEE/ESFp) × The Critic (ILI/INTp) — Dual
    'ESFp-INTp': 'When ESFp reads the room and acts instantly, INTp is quietly forecasting what comes next. ESFp\'s instinct + INTp\'s analysis = a team that takes risks while avoiding fatal mistakes. Quiet trust builds over time.',
    // The Politician (SEE/ESFp) × The Pioneer (LIE/ENTj) — Activity
    'ESFp-ENTj': 'Together, projects accelerate dramatically. ESFp\'s people skills + ENTj\'s strategy = unbeatable sales team. But the high tempo doesn\'t last — focus energy on critical moments.',
    // The Politician (SEE/ESFp) × The Guardian (ESI/ISFj) — Mirror
    'ESFp-ISFj': 'ESFp charges forward; ISFj covers the rear. Same Fi and Se, reversed order — each learns from the other\'s method, though leadership tussles can arise.',
    // The Politician (SEE/ESFp) → The Director (LSE/ESTj) — Benefit
    'ESFp-ESTj': 'ESFp\'s charismatic people power energizes ESTj\'s operational team. ESFp\'s proposals often move ESTj — but ESTj\'s efficiency suggestions rarely resonate back. Influence is one-directional.',
    // The Politician (SEE/ESFp) → The Humanist (EII/INFj) — Supervision
    'ESFp-INFj': 'ESFp\'s direct communication style can pierce INFj\'s sensitive inner world. ESFp is just being candid — but INFj hears their ideals being rejected.',
    // The Politician (SEE/ESFp) × The Advocate (IEE/ENFp) — Business
    'ESFp-ENFp': 'Both sociable and active. Team vibe-building clicks — but ESFp chases concrete results while ENFp pursues human potential. Approach differences surface eventually.',
    // The Politician (SEE/ESFp) × The Craftsman (SLI/ISTp) — Illusionary
    'ESFp-ISTp': 'ESFp genuinely admires ISTp\'s craftsman skills; ISTp is grateful for ESFp\'s social prowess. Sensory pleasures are easily shared — but probing each other\'s core motivations is like chasing a mirage.',

    // ===== The Critic (ILI/INTp) as source =====
    // The Critic (ILI/INTp) × The Inventor (ILE/ENTp) — Contrary
    'INTp-ENTp': 'Both N-type explorers, but ENTp opens possibilities while INTp audits risks. Constructive when used as quality control — but with identical arguments and opposite conclusions, parallel lines emerge.',
    // The Critic (ILI/INTp) × The Mediator (SEI/ISFp) — Super-Ego
    'INTp-ISFp': 'ISFp\'s sensory care sometimes feels nice, but INTp\'s cold analysis can wound ISFp\'s sensitivity. Both learn from each other — at the cost of mental energy. Distance is key.',
    // The Critic (ILI/INTp) × The Host (ESE/ESFj) — Conflict
    'INTp-ESFj': 'ESFj\'s emotional waves and INTp\'s detached critique collide head-on. ESFj feels ignored; INTp wants to stay out of the emotional vortex. Finding middle ground is a struggle.',
    // The Critic (ILI/INTp) × The Analyst (LII/INTj) — Quasi-Identity
    'INTp-INTj': 'Hours of intellectual debate are a joy. Similar analytical muscle, but INTp focuses on prediction while INTj builds systems. A perpetual "almost clicks" feeling lingers.',
    // The Critic (ILI/INTp) ← The Mentor (EIE/ENFj) — Supervision (reverse)
    'INTp-ENFj': 'ENFj\'s emotional intensity scrambles INTp\'s cool circuits. ENFj\'s goodwill is understood — but the heat itself invades INTp\'s weakest zone. Distance keeps both comfortable.',
    // The Critic (ILI/INTp) ← The Inspector (LSI/ISTj) — Benefit (reverse)
    'INTp-ISTj': 'Watching ISTj\'s meticulous process management gives INTp hints for grounding abstractions. ISTj serves as a role model — but INTp\'s feedback doesn\'t fully land.',
    // The Critic (ILI/INTp) × The Conqueror (SLE/ESTp) — Semi-Dual
    'INTp-ESTp': 'INTp strategizes; ESTp executes on the spot. A near-Dual division of labor forms naturally — but ESTp\'s speed occasionally outpaces INTp\'s analysis, leaving a slight gap.',
    // The Critic (ILI/INTp) × The Poet (IEI/INFp) — Kindred
    'INTp-INFp': 'Shared Ni creates intuitive resonance — comfortable silence says it all. Peaceful coexistence, but neither pushes to action. Brilliant ideas may evaporate before dawn.',
    // The Critic (ILI/INTp) × The Politician (SEE/ESFp) — Dual
    'INTp-ESFp': 'While ESFp charges boldly, INTp calmly reads the outcomes ahead. ESFp\'s vitality + INTp\'s foresight = calculated risk-taking that avoids fatal blows. A quietly powerful partnership.',
    // The Critic (ILI/INTp) × The Pioneer (LIE/ENTj) — Mirror
    'INTp-ENTj': 'INTp flags long-term risks; ENTj immediately systematizes countermeasures. Mirror-complementary debates — but ENTj\'s speed vs. INTp\'s deliberation creates subtle tension.',
    // The Critic (ILI/INTp) × The Guardian (ESI/ISFj) — Activity
    'INTp-ISFj': 'ISFj\'s devoted reliability gives INTp unexpected comfort; ISFj is drawn to INTp\'s intellectual depth. Brief interactions stimulate — but extended time reveals gaps in care expectations.',
    // The Critic (ILI/INTp) × The Director (LSE/ESTj) — Supervision (reverse)
    'INTp-ESTj': 'ESTj\'s efficiency demands disrupt INTp\'s contemplative rhythm. ESTj is just doing business — but to INTp, it threatens internal freedom.',
    // The Critic (ILI/INTp) × The Humanist (EII/INFj) — Benefit (reverse)
    'INTp-INFj': 'INFj\'s value-rooted judgment adds a new axis to INTp\'s analysis. INFj\'s influence is quiet but reliably broadens perspective. Reverse influence is weaker.',
    // The Critic (ILI/INTp) × The Advocate (IEE/ENFp) — Illusionary
    'INTp-ENFp': 'ENFp\'s divergent ideas spark INTp\'s curiosity. Initial chemistry is fun — but ENFp\'s optimism and INTp\'s pessimism don\'t mesh, making deep collaboration tricky.',
    // The Critic (ILI/INTp) × The Craftsman (SLI/ISTp) — Business
    'INTp-ISTp': 'Both quiet specialists who respect each other\'s domain. Work proceeds without friction — but INTp focuses on strategic forecasting while ISTp optimizes operations. Same goal, fundamentally different methods.',

    // ===== The Pioneer (LIE/ENTj) as source =====
    // The Pioneer (LIE/ENTj) × The Inventor (ILE/ENTp) — Quasi-Identity
    'ENTj-ENTp': 'Early-project excitement creates instant rapport. But ENTj is obsessed with output while ENTp savors exploration. Entering execution reveals the priority gap.',
    // The Pioneer (LIE/ENTj) × The Mediator (SEI/ISFp) — Conflict
    'ENTj-ISFp': 'ENTj\'s result-driven push leaves ISFp\'s sensitivity behind. ISFp\'s modest proposals read as roundabout to ENTj. Without a bridge-builder, the relationship barely functions.',
    // The Pioneer (LIE/ENTj) × The Host (ESE/ESFj) — Super-Ego
    'ENTj-ESFj': 'ESFj sees ENTj\'s efficiency-first stance as cold; ENTj sees ESFj\'s emotion-first approach as detour. Each embodies what the other lacks — respect and exhaustion coexist.',
    // The Pioneer (LIE/ENTj) × The Analyst (LII/INTj) — Contrary
    'ENTj-INTj': 'ENTj pushes "Implement now!"; INTj resists "Theory isn\'t ready." Shared curiosity, opposite tempos. Mutual "Why won\'t you understand?" is frequent.',
    // The Pioneer (LIE/ENTj) × The Mentor (EIE/ENFj) — Kindred
    'ENTj-ENFj': 'Visionary brainstorming is thrilling. But ENTj moves organizations with systems; ENFj moves them with hearts. When methods diverge, a deep rift appears beneath surface agreement.',
    // The Pioneer (LIE/ENTj) × The Inspector (LSI/ISTj) — Semi-Dual
    'ENTj-ISTj': 'ISTj operationalizes ENTj\'s strategy beautifully. Near-Dual confidence — but ENTj\'s sudden pivots leave ISTj\'s meticulous plans in disarray. Close but never fully at rest.',
    // The Pioneer (LIE/ENTj) ← The Conqueror (SLE/ESTp) — Benefit (reverse)
    'ENTj-ESTp': 'ESTp\'s field execution is reassuring. Watching the strategy tested in real time is valuable — but ESTp\'s instinct-driven calls sometimes clash with ENTj\'s careful plan.',
    // The Pioneer (LIE/ENTj) → The Poet (IEI/INFp) — Supervision
    'ENTj-INFp': 'ENTj\'s routine requests for progress updates and efficiency pressure INFp\'s inner world. ENTj is simply managing — but for INFp, it strikes the weakest possible spot.',
    // The Pioneer (LIE/ENTj) × The Politician (SEE/ESFp) — Activity
    'ENTj-ESFp': 'ESFp\'s action + ENTj\'s strategic eye = explosive short-term thrust. An unstoppable negotiation/presentation tag-team — but tempo misaligns in longer projects.',
    // The Pioneer (LIE/ENTj) × The Critic (ILI/INTp) — Mirror
    'ENTj-INTp': 'ENTj provides forward momentum; INTp reads hidden risks ahead. Mirror-complementary — but ENTj\'s speed outpaces INTp\'s analysis, breeding quiet frustration.',
    // The Pioneer (LIE/ENTj) × The Guardian (ESI/ISFj) — Dual
    'ENTj-ISFj': 'ENTj earns boldly; ISFj anchors the home front. A traditional yet rock-solid partnership. ISFj\'s moral compass reins in ENTj\'s excesses; ENTj\'s decisiveness gives ISFj security.',
    // The Pioneer (LIE/ENTj) × The Director (LSE/ESTj) — Business
    'ENTj-ESTj': 'Both Te-users and operators. Shared language around targets and execution — but ENTj eyes new ventures while ESTj optimizes existing operations. Same words, different goals.',
    // The Pioneer (LIE/ENTj) × The Humanist (EII/INFj) — Illusionary
    'ENTj-INFj': 'INFj\'s deep insight stimulates ENTj intellectually; ENTj\'s execution power reassures INFj. Surface ideal-pair energy — but underlying judgment criteria (efficiency vs. ethics) diverge. A mirage.',
    // The Pioneer (LIE/ENTj) → The Advocate (IEE/ENFp) — Benefit
    'ENTj-ENFp': 'ENTj\'s strategic direction channels ENFp\'s energy. ENFp unconsciously follows ENTj\'s lead — but ENFp\'s relationship-focused feedback doesn\'t register with ENTj\'s efficiency brain.',
    // The Pioneer (LIE/ENTj) → The Craftsman (SLI/ISTp) — Supervision
    'ENTj-ISTp': 'ENTj\'s results demands threaten ISTp\'s self-paced craftsmanship. ENTj just wants efficiency — but ISTp experiences it as rhythm being destroyed.',

    // ===== The Guardian (ESI/ISFj) as source =====
    // The Guardian (ESI/ISFj) × The Inventor (ILE/ENTp) — Conflict
    'ISFj-ENTp': 'ISFj hears ENTp\'s bold vision and thinks "People\'s feelings are being left behind." ENTp finds ISFj\'s caution constricting. Without a facilitator, constructive dialogue is elusive.',
    // The Guardian (ESI/ISFj) × The Mediator (SEI/ISFp) — Quasi-Identity
    'ISFj-ISFp': 'Shared gentleness and caring, but ISFj acts from duty and conviction while ISFp reads the room. Surface compatibility is high — "Why would you decide THAT way?" lurks beneath.',
    // The Guardian (ESI/ISFj) × The Host (ESE/ESFj) — Contrary
    'ISFj-ESFj': 'Both care-oriented, but ISFj\'s quiet duty and ESFj\'s vocal passion miss each other. ISFj thinks "too loud"; ESFj thinks "too gloomy." Putting intentions into words helps.',
    // The Guardian (ESI/ISFj) × The Analyst (LII/INTj) — Super-Ego
    'ISFj-INTj': 'ISFj\'s moral instinct and INTj\'s logical analysis share deep honesty — but methods are polar opposites. Mutual respect with a nagging "Why THAT approach?" question.',
    // The Guardian (ESI/ISFj) × The Mentor (EIE/ENFj) — Semi-Dual
    'ISFj-ENFj': 'ISFj devotedly follows ENFj\'s direction — a natural fit. Quite comfortable, but ENFj\'s speed sometimes leaves ISFj breathless. Tantalizingly close to perfect.',
    // The Guardian (ESI/ISFj) × The Inspector (LSI/ISTj) — Kindred
    'ISFj-ISTj': 'Shared Si-grounded reliability creates stability. A dream team for manual-writing and QC — but both resist change, risking stagnation without outside stimulation.',
    // The Guardian (ESI/ISFj) → The Conqueror (SLE/ESTp) — Supervision
    'ISFj-ESTp': 'ISFj\'s moral standards, casually voiced, feel like shackles on ESTp\'s freedom. ISFj is simply calling out what\'s right — but for ESTp, it\'s a direct hit on a sore spot.',
    // The Guardian (ESI/ISFj) → The Poet (IEI/INFp) — Benefit
    'ISFj-INFp': 'ISFj\'s everyday care supports INFp\'s life, freeing INFp to dream. ISFj gives; INFp receives — yet INFp\'s visionary remarks sometimes unexpectedly soothe ISFj.',
    // The Guardian (ESI/ISFj) × The Politician (SEE/ESFp) — Mirror
    'ISFj-ESFp': 'ISFj defends; ESFp attacks. Same Fi and Se, reversed expression — each offers fresh perspective on the other\'s approach.',
    // The Guardian (ESI/ISFj) × The Critic (ILI/INTp) — Activity
    'ISFj-INTp': 'INTp\'s intellectual depth refreshes ISFj; ISFj\'s stability comforts INTp. Short exchanges are mutually beneficial — longer ones surface care-expectation temperature gaps.',
    // The Guardian (ESI/ISFj) × The Pioneer (LIE/ENTj) — Dual
    'ISFj-ENTj': 'ISFj\'s moral compass beautifully balances ENTj\'s bold decision-making. ISFj creates a stable base from which ENTj can take big swings. A naturally complementary, rock-solid pair.',
    // The Guardian (ESI/ISFj) × The Director (LSE/ESTj) — Illusionary
    'ISFj-ESTj': 'ESTj\'s reliable execution reassures ISFj; ISFj\'s thoughtful care soothes ESTj. High initial rapport — but deep down, efficiency vs. ethics creates a subtle misalignment.',
    // The Guardian (ESI/ISFj) × The Humanist (EII/INFj) — Business
    'ISFj-INFj': 'Both Fi-users who care deeply about values. Similar emotional sensitivity — but ISFj acts through tangible deeds while INFj pursues idealistic visions. Method differences bottleneck collaboration.',
    // The Guardian (ESI/ISFj) × The Advocate (IEE/ENFp) — Supervision (reverse)
    'ISFj-ENFp': 'ENFp\'s freewheeling ideas rattle ISFj\'s order. No malice — but ISFj feels their carefully built stability being threatened. Not over-adapting to ENFp\'s pace is self-care.',
    // The Guardian (ESI/ISFj) × The Craftsman (SLI/ISTp) — Benefit (reverse)
    'ISFj-ISTp': 'ISTp\'s steady craftsmanship gives ISFj a sense of stability. ISTp\'s solid work soothes ISFj\'s anxiety — but ISFj\'s emotional care doesn\'t register much with ISTp. One-sided comfort.',
};

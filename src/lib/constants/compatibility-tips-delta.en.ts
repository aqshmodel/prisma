import type { OSTypeCode } from '@/types/diagnosis';

type PairKey = `${OSTypeCode}-${OSTypeCode}`;

export const DELTA_PAIR_TIPS_EN: Partial<Record<PairKey, string>> = {
    // ===== The Director (LSE/ESTj) as source =====
    // The Director (LSE/ESTj) → The Inventor (ILE/ENTp) — Benefit
    'ESTj-ENTp': 'ESTj\'s practical know-how adds realism to ENTp\'s ideas. ENTp picks up unexpected hints — but ENTp\'s abstract replies don\'t land with ESTj, keeping influence one-way.',
    // The Director (LSE/ESTj) → The Mediator (SEI/ISFp) — Supervision
    'ESTj-ISFp': 'ESTj\'s efficiency-driven instructions feel like pressure to ISFp. ESTj means to coach with high expectations — but it hits ISFp\'s delicate side hard. Softening the delivery makes a big difference.',
    // The Director (LSE/ESTj) × The Host (ESE/ESFj) — Kindred
    'ESTj-ESFj': 'Shared brisk efficiency creates a natural workplace alliance. But ESTj prioritizes efficiency while ESFj prioritizes feelings — micro-clashes over judgment calls are frequent.',
    // The Director (LSE/ESTj) × The Analyst (LII/INTj) — Semi-Dual
    'ESTj-INTj': 'ESTj applies INTj\'s theories to the field — a natural and near-Dual comfortable flow. But ESTj\'s speed sometimes outpaces INTj\'s thinking. Close, but not a perfect fit.',
    // The Director (LSE/ESTj) × The Mentor (EIE/ENFj) — Super-Ego
    'ESTj-ENFj': 'ESTj\'s "give me numbers" collides with ENFj\'s "let me paint the vision." Each other\'s strengths feel alien — respect and exhaustion coexist. Fully separate domains is the realistic answer.',
    // The Director (LSE/ESTj) × The Inspector (LSI/ISTj) — Contrary
    'ESTj-ISTj': 'ESTj champions practical efficiency; ISTj champions logical consistency. Both look steady from the outside, but their obsessions differ subtly — "Why spend time THERE?" bounces back and forth.',
    // The Director (LSE/ESTj) × The Conqueror (SLE/ESTp) — Quasi-Identity
    'ESTj-ESTp': 'Both execution-strong, but ESTj uses plans and procedures while ESTp uses instinct and reflexes. Same goal, different roads — each sees the other\'s route as a detour.',
    // The Director (LSE/ESTj) × The Poet (IEI/INFp) — Conflict
    'ESTj-INFp': 'ESTj\'s efficiency-first and INFp\'s intuition-first clash at the root. ESTj sees laziness; INFp feels oppressed. They live in different worlds — closing the gap takes serious time.',
    // The Director (LSE/ESTj) ← The Politician (SEE/ESFp) — Benefit (reverse)
    'ESTj-ESFp': 'ESFp\'s charismatic people skills inject fresh energy into ESTj\'s rigid organization. ESFp\'s influence shifts the mood — but ESTj\'s feedback barely reaches ESFp. One-directional.',
    // The Director (LSE/ESTj) ← The Critic (ILI/INTp) — Supervision (reverse)
    'ESTj-INTp': 'ESTj\'s operational pace compresses INTp\'s reflection time. ESTj is simply doing their job — but INTp feels robbed of thinking space. Unintentioned cornering.',
    // The Director (LSE/ESTj) × The Pioneer (LIE/ENTj) — Business
    'ESTj-ENTj': 'Both Te-users who resonate around targets and execution. But ESTj optimizes the existing while ENTj pioneers the new. Same language, different goals — constant alignment is needed.',
    // The Director (LSE/ESTj) × The Guardian (ESI/ISFj) — Illusionary
    'ESTj-ISFj': 'ISFj\'s careful consideration soothes ESTj; ESTj\'s reliability reassures ISFj. High initial affinity — but deep down, the efficiency-vs-ethics priority difference slowly surfaces.',
    // The Director (LSE/ESTj) × The Humanist (EII/INFj) — Dual
    'ESTj-INFj': 'While ESTj efficiently handles tasks, INFj quietly watches over the ethical compass. ESTj\'s execution + INFj\'s insight = a team that achieves results with integrity.',
    // The Director (LSE/ESTj) × The Advocate (IEE/ENFp) — Activity
    'ESTj-ENFp': 'ENFp\'s free thinking sends a fresh breeze through ESTj\'s rigid framework. Short-term mutual stimulation — but ENFp\'s spontaneity and ESTj\'s planning will clash over time.',
    // The Director (LSE/ESTj) × The Craftsman (SLI/ISTp) — Mirror
    'ESTj-ISTp': 'ESTj standardizes processes; ISTp optimizes their own way. Same pragmatic orientation, but command-and-control vs. autonomous-craft — a mirror contrast. Mutual understanding, unmovable sticking points.',

    // ===== The Humanist (EII/INFj) as source =====
    // The Humanist (EII/INFj) → The Inventor (ILE/ENTp) — Supervision
    'INFj-ENTp': 'INFj\'s quiet remark — "Have you thought about how the other person feels?" — strikes the exact blind spot ENTp has been avoiding. Pure goodwill, yet ENTp squirms.',
    // The Humanist (EII/INFj) → The Mediator (SEI/ISFp) — Benefit
    'INFj-ISFp': 'INFj\'s idealism breathes new meaning into ISFp\'s everyday life. ISFp\'s quiet ambition stirs upon contact with INFj\'s values — but ISFp\'s reverse influence on INFj is limited.',
    // The Humanist (EII/INFj) × The Host (ESE/ESFj) — Semi-Dual
    'INFj-ESFj': 'ESFj\'s bright energy relaxes INFj; INFj\'s depth earns ESFj\'s trust. 80% comfort — but ESFj\'s demand for lively reactions can tire INFj.',
    // The Humanist (EII/INFj) × The Analyst (LII/INTj) — Kindred
    'INFj-INTj': 'Endless quiet intellectual conversation is pure bliss. Philosophy and social issues make all-night talks natural — but both prefer thinking to acting, so conclusions rarely take shape. Recruit a doer.',
    // The Humanist (EII/INFj) × The Mentor (EIE/ENFj) — Contrary
    'INFj-ENFj': 'Both treasure ideals, but INFj guards inner values while ENFj changes the outer world. Same passion, opposite directions — easy to misread yet deeply bonded when aligned.',
    // The Humanist (EII/INFj) × The Inspector (LSI/ISTj) — Super-Ego
    'INFj-ISTj': 'INFj finds ISTj\'s rules suffocating; ISTj finds INFj\'s idealism impractical. Polar-opposite strengths — immense learning potential, but immense energy drain too.',
    // The Humanist (EII/INFj) × The Conqueror (SLE/ESTp) — Conflict
    'INFj-ESTp': 'ESTp\'s force looks rough to INFj; INFj\'s delicate value judgments look indecisive to ESTp. Leading functions target each other\'s most fragile areas — friction is constant without effort.',
    // The Humanist (EII/INFj) × The Poet (IEI/INFp) — Quasi-Identity
    'INFj-INFp': 'Similar sensitivity and introspection create instant "I understand you." But INFj judges via Fi; INFp accepts via Ni. Stance differences quietly accumulate.',
    // The Humanist (EII/INFj) ← The Politician (SEE/ESFp) — Supervision (reverse)
    'INFj-ESFp': 'ESFp\'s blunt candor can pierce INFj\'s delicate inner world. ESFp is simply being honest — but INFj hears their treasured values being dismissed.',
    // The Humanist (EII/INFj) ← The Critic (ILI/INTp) — Benefit
    'INFj-INTp': 'INTp\'s cool analysis gives INFj\'s ideals realistic contour. INTp\'s objectivity makes INFj\'s values feel more grounded. Reverse influence is mild, but quiet trust emerges.',
    // The Humanist (EII/INFj) × The Pioneer (LIE/ENTj) — Illusionary
    'INFj-ENTj': 'INFj admires ENTj\'s execution power; ENTj values INFj\'s insight. Looks like an ideal pair — but underlying judgment axes (ethics vs. efficiency) gradually diverge.',
    // The Humanist (EII/INFj) × The Guardian (ESI/ISFj) — Business
    'INFj-ISFj': 'Both Fi-users with deep empathy. But INFj cares through idealistic vision; ISFj cares through concrete action. Same calling, different methods — collaboration rhythm mismatches.',
    // The Humanist (EII/INFj) × The Director (LSE/ESTj) — Dual
    'INFj-ESTj': 'ESTj efficiently shapes the environment; INFj fills it with purpose and direction. INFj\'s ideals become reality through ESTj\'s execution — mutual value deepens over time.',
    // The Humanist (EII/INFj) × The Advocate (IEE/ENFp) — Mirror
    'INFj-ENFp': 'What INFj feels within, ENFp nimbly spreads outward. Mirror-complementary and intellectually rich — but tempo differences and leadership ambiguity can cause hiccups.',
    // The Humanist (EII/INFj) × The Craftsman (SLI/ISTp) — Activity
    'INFj-ISTp': 'ISTp\'s honest craftsmanship comforts INFj; INFj\'s deep insight sparks ISTp\'s curiosity. Brief interactions are refreshing — but different communication-density needs surface over time.',

    // ===== The Advocate (IEE/ENFp) as source =====
    // The Advocate (IEE/ENFp) × The Inventor (ILE/ENTp) — Kindred
    'ENFp-ENTp': 'Full-throttle Ne brainstorm partners. Ideas expand endlessly — thrilling, but neither can land them. Sticky notes multiply on the whiteboard; execution needs a recruit.',
    // The Advocate (IEE/ENFp) × The Mediator (SEI/ISFp) — Semi-Dual
    'ENFp-ISFp': 'ISFp comfortably leans on ENFp\'s brightness and imagination. Near-Dual warmth — but when ISFp is truly in trouble, ENFp\'s support hits slightly off-target. Tantalizingly close.',
    // The Advocate (IEE/ENFp) → The Host (ESE/ESFj) — Benefit
    'ENFp-ESFj': 'ENFp\'s ideas expand ESFj\'s world; ESFj draws fresh plans from them. But ESFj\'s feedback has little effect on ENFp — influence flows one way.',
    // The Advocate (IEE/ENFp) → The Analyst (LII/INTj) — Supervision
    'ENFp-INTj': 'ENFp\'s unbounded ideas shake INTj\'s logical framework. ENFp just wants to explore — but INTj experiences it as intrusion into their carefully built order. Balance through distance.',
    // The Advocate (IEE/ENFp) × The Mentor (EIE/ENFj) — Quasi-Identity
    'ENFp-ENFj': 'Similar interpersonal energy, but ENFp fans out via Ne while ENFj laser-focuses via Ni. Great initial vibe — then "we work differently" becomes clear as projects progress.',
    // The Advocate (IEE/ENFp) × The Inspector (LSI/ISTj) — Conflict
    'ENFp-ISTj': 'ENFp\'s free spirit reads as chaos to ISTj; ISTj\'s rulebook reads as a cage to ENFp. Each other\'s existence is a mirror of their own weaknesses. Enormous effort needed to bridge the gap.',
    // The Advocate (IEE/ENFp) × The Conqueror (SLE/ESTp) — Super-Ego
    'ENFp-ESTp': 'ENFp\'s idealism strikes ESTp as ungrounded; ESTp\'s brute-force approach makes ENFp recoil. Mutual respect exists — long collaboration is mentally heavy.',
    // The Advocate (IEE/ENFp) × The Poet (IEI/INFp) — Contrary
    'ENFp-INFp': 'ENFp expands outward; INFp dives inward. Same N-world, opposite vectors — each thinks the other\'s style is "wasted potential." Acceptance brings relief.',
    // The Advocate (IEE/ENFp) × The Politician (SEE/ESFp) — Business
    'ENFp-ESFp': 'Both sociable and active — perfect for team-building vibes. But ENFp wants to unlock human potential while ESFp wants visible results. The approach gap runs deeper than expected.',
    // The Advocate (IEE/ENFp) × The Critic (ILI/INTp) — Illusionary
    'ENFp-INTp': 'INTp\'s intellectual edge piques ENFp\'s curiosity. Initial chemistry is fun — but ENFp\'s optimism and INTp\'s deep pondering diverge, keeping the relationship mirage-like.',
    // The Advocate (IEE/ENFp) ← The Pioneer (LIE/ENTj) — Benefit (reverse)
    'ENFp-ENTj': 'ENTj\'s strategic lens gives ENFp\'s scattered ideas direction. ENTj\'s influence is large — but ENFp\'s relationship-oriented feedback barely dents ENTj\'s efficiency brain.',
    // The Advocate (IEE/ENFp) ← The Guardian (ESI/ISFj) — Supervision (reverse)
    'ENFp-ISFj': 'ISFj\'s steady moral compass gently brakes ENFp\'s freewheeling. No ill intent — but ENFp feels their possibilities being constrained.',
    // The Advocate (IEE/ENFp) × The Director (LSE/ESTj) — Activity
    'ENFp-ESTj': 'ESTj\'s solidness + ENFp\'s creativity = short-term sparks. ENFp throws fresh angles; ESTj instantly processes them. Powerful in bursts — but tempo divergence becomes fatigue over time.',
    // The Advocate (IEE/ENFp) × The Humanist (EII/INFj) — Mirror
    'ENFp-INFj': 'ENFp gathers external possibilities; INFj filters them through internal values. Mirror-complementary deep dialogue — though tempo and leadership questions can wobble.',
    // The Advocate (IEE/ENFp) × The Craftsman (SLI/ISTp) — Dual
    'ENFp-ISTp': 'Visions ENFp paints are silently realized by ISTp. ENFp\'s creativity and ISTp\'s craftsmanship look like oil and water — yet complement each other more naturally than any other pair. Indispensable together.',

    // ===== The Craftsman (SLI/ISTp) as source =====
    // The Craftsman (SLI/ISTp) × The Inventor (ILE/ENTp) — Semi-Dual
    'ISTp-ENTp': 'ISTp\'s craftsman hands shape ENTp\'s sparks into reality. Near-Dual comfort — but ENTp\'s leaping pace outstrips ISTp\'s steady rhythm. 80% bliss, 20% "almost."',
    // The Craftsman (SLI/ISTp) × The Mediator (SEI/ISFp) — Kindred
    'ISTp-ISFp': 'Shared Si creates serene companionship. Best partners for hands-on work and making things — but when challenges hit, neither takes charge. Direction needs an outside push.',
    // The Craftsman (SLI/ISTp) ← The Host (ESE/ESFj) — Supervision (reverse)
    'ISTp-ESFj': 'ESFj\'s well-meaning "Let\'s talk more!" invades ISTp\'s weak zone. ESFj acts out of loneliness — but ISTp is guarding solo time.',
    // The Craftsman (SLI/ISTp) ← The Analyst (LII/INTj) — Benefit (reverse)
    'ISTp-INTj': 'INTj\'s theoretical framework gives ISTp actionable insights. INTj designs; ISTp builds on-site. Natural flow — but reverse influence is weak.',
    // The Craftsman (SLI/ISTp) × The Mentor (EIE/ENFj) — Conflict
    'ISTp-ENFj': 'ENFj\'s passionate communication doesn\'t reach ISTp\'s heart; ISTp\'s quiet craftsmanship reads as coldness to ENFj. Leading functions target each other\'s weakest zones. Distance is essential.',
    // The Craftsman (SLI/ISTp) × The Inspector (LSI/ISTj) — Quasi-Identity
    'ISTp-ISTj': 'Shared practical sensibility — tool care and prep-work resonate. But ISTj manages via rules; ISTp via feel. Similar enough that tiny differences stand out sharply.',
    // The Craftsman (SLI/ISTp) × The Conqueror (SLE/ESTp) — Contrary
    'ISTp-ESTp': 'ISTp holds the fort carefully; ESTp charges boldly. Same sensory axis, opposite outputs. ISTp: "too rough." ESTp: "too slow." Conscious complementing required.',
    // The Craftsman (SLI/ISTp) × The Poet (IEI/INFp) — Super-Ego
    'ISTp-INFp': 'ISTp admires INFp\'s abilities but finds sparse emotional expression lonely. Each shines in the other\'s weakest domain — togetherness is draining.',
    // The Craftsman (SLI/ISTp) × The Politician (SEE/ESFp) — Illusionary
    'ISTp-ESFp': 'ESFp\'s social savvy directly helps ISTp; ISTp\'s craftsmanship earns ESFp\'s respect. Sensory pleasures are shared easily — but exploring core motivations is like chasing a mirage.',
    // The Craftsman (SLI/ISTp) × The Critic (ILI/INTp) — Business
    'ISTp-INTp': 'Two quiet specialists who respect each other\'s turf. Work runs frictionlessly — but ISTp optimizes operations while INTp forecasts strategy. Same problem, fundamentally different lens.',
    // The Craftsman (SLI/ISTp) ← The Pioneer (LIE/ENTj) — Supervision (reverse)
    'ISTp-ENTj': 'ENTj\'s output demands threaten ISTp\'s self-paced craftsmanship. ENTj is just managing — but ISTp feels their rhythm being disrupted.',
    // The Craftsman (SLI/ISTp) ← The Guardian (ESI/ISFj) — Benefit
    'ISTp-ISFj': 'ISFj\'s steady care gives ISTp a comforting anchor. ISFj\'s daily thoughtfulness lets ISTp concentrate — but ISTp\'s gratitude doesn\'t always register with ISFj.',
    // The Craftsman (SLI/ISTp) × The Director (LSE/ESTj) — Mirror
    'ISTp-ESTj': 'ESTj standardizes; ISTp personalizes. Same pragmatic focus, opposite styles — standardization vs. autonomy. Understood but never fully yielded.',
    // The Craftsman (SLI/ISTp) × The Humanist (EII/INFj) — Activity
    'ISTp-INFj': 'INFj\'s deep insight stimulates ISTp; ISTp\'s quiet integrity reassures INFj. Brief contact is refreshing — but communication-density gaps show over longer stretches.',
    // The Craftsman (SLI/ISTp) × The Advocate (IEE/ENFp) — Dual
    'ISTp-ENFp': 'ENFp\'s sprawling vision meets ISTp\'s silent materialization. ENFp grounds the dreamer; ISTp gives direction to the builder. Polar opposites, yet the most naturally complementary golden pair.',
};

import type { OSTypeCode } from '@/types/diagnosis';

type PairKey = `${OSTypeCode}-${OSTypeCode}`;

export const BETA_PAIR_TIPS_EN: Partial<Record<PairKey, string>> = {
    // ===== The Mentor (EIE/ENFj) as source =====
    // The Mentor (EIE/ENFj) ← The Inventor (ILE/ENTp) — Benefit (reverse)
    'ENFj-ENTp': 'Exposure to ENTp\'s rule-breaking ideas adds a new weapon to ENFj\'s vision. But ENFj\'s passionate appeals get caught in ENTp\'s logic filter and don\'t land as hard as expected.',
    // The Mentor (EIE/ENFj) → The Mediator (SEI/ISFp) — Supervision
    'ENFj-ISFp': 'The more passionately ENFj paints their vision, the more ISFp feels their small world is being invalidated. ENFj means to inspire, but to ISFp it\'s pressure. Simply lowering the volume helps enormously.',
    // The Mentor (EIE/ENFj) × The Host (ESE/ESFj) — Business
    'ENFj-ESFj': 'Fe-to-Fe emotional sync is instantaneous. A powerhouse duo for event management — but ENFj charges toward grand visions while ESFj wants to tend to the person right in front of them. Strategy talks reveal temperature gaps.',
    // The Mentor (EIE/ENFj) × The Analyst (LII/INTj) — Illusionary
    'ENFj-INTj': 'INTj listens to ENFj\'s speech and silently deconstructs the logic. Surface respect is strong, but ENFj wilts under logical pressure, and INTj suffocates in emotional currents. A beautiful mirage.',
    // The Mentor (EIE/ENFj) × The Inspector (LSI/ISTj) — Dual
    'ENFj-ISTj': 'ENFj paints the big picture; ISTj draws the blueprint. ENFj\'s fire moves ISTj, and ISTj\'s steadiness reins in ENFj. Awkward at first, but over time, indispensable.',
    // The Mentor (EIE/ENFj) × The Conqueror (SLE/ESTp) — Activity
    'ENFj-ESTp': 'ENFj talks the future; ESTp moves the present. Short-burst projects produce explosive results, but both grow restless once routine sets in.',
    // The Mentor (EIE/ENFj) × The Poet (IEI/INFp) — Mirror
    'ENFj-INFp': 'Same Ni and Fe, reversed order. What ENFj wants to express outward, INFp deeply feels inward. Lots of "yes, that\'s it!" moments — but clashes when it comes to HOW to act.',
    // The Mentor (EIE/ENFj) → The Politician (SEE/ESFp) — Benefit
    'ENFj-ESFp': 'ENFj\'s vision-driven proposals ignite ESFp\'s action instinct. ESFp is unconsciously guided by ENFj\'s direction, but ESFp\'s reverse influence on ENFj is limited.',
    // The Mentor (EIE/ENFj) → The Critic (ILI/INTp) — Supervision
    'ENFj-INTp': 'ENFj\'s emotional intensity registers as incomprehensible noise for INTp. When ENFj tries to encourage, INTp\'s analytical circuits short out. Distance management is everything.',
    // The Mentor (EIE/ENFj) × The Pioneer (LIE/ENTj) — Kindred
    'ENFj-ENTj': 'Both vision-oriented, they lose track of time discussing grand plans. But ENFj leads with hearts and ENTj leads with systems — when methods diverge, competitive tension can surface.',
    // The Mentor (EIE/ENFj) × The Guardian (ESI/ISFj) — Semi-Dual
    'ENFj-ISFj': 'ISFj\'s devotion gives ENFj security; ENFj\'s leadership gives ISFj direction. Very comfortable — except when ENFj accelerates and ISFj can\'t keep up. Close, but just short of perfect.',
    // The Mentor (EIE/ENFj) × The Director (LSE/ESTj) — Super-Ego
    'ENFj-ESTj': 'ESTj meets ENFj\'s sweeping vision with "OK, but what specifically are we doing?" ENFj feels their dream is being crushed; ESTj thinks ENFj is ignoring reality. Separate domains for coexistence.',
    // The Mentor (EIE/ENFj) × The Humanist (EII/INFj) — Contrary
    'ENFj-INFj': 'Both idealists, but ENFj wants to change the outer world while INFj stays true to inner values. Opposite directions with similar passion — misunderstandings are easy, but bonds forged through alignment are strong.',
    // The Mentor (EIE/ENFj) × The Advocate (IEE/ENFp) — Quasi-Identity
    'ENFj-ENFp': 'Similar energy and communication skills spark quick rapport. But ENFj\'s Ni-focused laser and ENFp\'s Ne-divergent brainstorm mean project execution triggers "not what I expected" frustrations.',
    // The Mentor (EIE/ENFj) × The Craftsman (SLI/ISTp) — Conflict
    'ENFj-ISTp': 'ENFj\'s emotional appeals don\'t reach ISTp\'s heart; ISTp\'s quiet craftsmanship looks cold to ENFj. Leading functions target each other\'s weakest zones. Understanding takes patience and time.',

    // ===== The Inspector (LSI/ISTj) as source =====
    // The Inspector (LSI/ISTj) ← The Inventor (ILE/ENTp) — Supervision (reverse)
    'ISTj-ENTp': 'ENTp\'s freewheeling ideas shake ISTj\'s meticulous order. No malice intended, but ISTj feels the framework is under threat. Keeping distance lets ISTj learn from ENTp without the anxiety.',
    // The Inspector (LSI/ISTj) → The Mediator (SEI/ISFp) — Benefit
    'ISTj-ISFp': 'ISFp finds reassurance in ISTj\'s orderly scheduling. ISTj\'s structure frees ISFp to work at their own pace — though ISFp\'s gratitude doesn\'t always reach ISTj clearly.',
    // The Inspector (LSI/ISTj) × The Host (ESE/ESFj) — Illusionary
    'ISTj-ESFj': 'ESFj\'s warmth puts ISTj at ease; ISTj\'s reliability comforts ESFj. Daily life is pleasant — but deeper engagement reveals fundamentally different priorities. The illusion gradually fades.',
    // The Inspector (LSI/ISTj) × The Analyst (LII/INTj) — Business
    'ISTj-INTj': 'Both favor Ti-based analysis and cool-headed debate. But ISTj trusts established rules while INTj builds new frameworks — same data, different conclusions.',
    // The Inspector (LSI/ISTj) × The Mentor (EIE/ENFj) — Dual
    'ISTj-ENFj': 'ENFj\'s grand vision meets ISTj\'s timeline and resource plan. ENFj\'s fire ignites ISTj; ISTj\'s brakes save ENFj from runaway. Time together makes them irreplaceable partners.',
    // The Inspector (LSI/ISTj) × The Conqueror (SLE/ESTp) — Mirror
    'ISTj-ESTp': 'ISTj plans; ESTp adapts on the ground. Natural — until ISTj says "Why did you deviate?" and ESTp says "Let me improvise." Mirror-like: mutual understanding, mutual frustration.',
    // The Inspector (LSI/ISTj) × The Poet (IEI/INFp) — Activity
    'ISTj-INFp': 'INFp\'s inner world is refreshing for ISTj; ISTj\'s stability grounds INFp. Brief interactions sparkle — but extended collaboration exposes pace differences.',
    // The Inspector (LSI/ISTj) → The Politician (SEE/ESFp) — Supervision
    'ISTj-ESFp': 'ISTj\'s natural demand for rule compliance and reports feels like freedom being stolen to ESFp. ISTj just wants order — but ESFp sees a controlling cage.',
    // The Inspector (LSI/ISTj) → The Critic (ILI/INTp) — Benefit
    'ISTj-INTp': 'Watching ISTj\'s structured workflows gives INTp hints for grounding abstract thoughts in practice. ISTj serves as a model, but INTp\'s theoretical feedback barely registers with ISTj.',
    // The Inspector (LSI/ISTj) × The Pioneer (LIE/ENTj) — Semi-Dual
    'ISTj-ENTj': 'ISTj\'s operational backbone supports ENTj\'s fast decision-making. Near-Dual comfort — except ENTj\'s sudden pivots leave ISTj scrambling. Close, but never fully at ease.',
    // The Inspector (LSI/ISTj) × The Guardian (ESI/ISFj) — Kindred
    'ISTj-ISFj': 'Shared Si-grounded reliability makes them efficient at building systems and manuals. Stable and calm — but both struggle with change, risking stagnation without outside stimulation.',
    // The Inspector (LSI/ISTj) × The Director (LSE/ESTj) — Contrary
    'ISTj-ESTj': 'ISTj cares about logical rule consistency; ESTj cares about practical efficiency. Both look "steady" but prioritize differently — "Why are you obsessed with THAT?" pops up constantly.',
    // The Inspector (LSI/ISTj) × The Humanist (EII/INFj) — Super-Ego
    'ISTj-INFj': 'ISTj respects INFj\'s idealism but can\'t follow value-based judgment. INFj finds ISTj\'s rule-centrism suffocating. Mirror-opposite worldviews — much to learn, much to endure.',
    // The Inspector (LSI/ISTj) × The Advocate (IEE/ENFp) — Conflict
    'ISTj-ENFp': 'ENFp\'s unbridled imagination looks like chaos to ISTj; ISTj\'s rule-book feels like a prison to ENFp. Each other\'s existence forces confrontation with their own weak spots. Alignment demands serious effort.',
    // The Inspector (LSI/ISTj) × The Craftsman (SLI/ISTp) — Quasi-Identity
    'ISTj-ISTp': 'Both Si-users with shared practical sensibilities — tool maintenance and prep work resonate. But ISTj manages by rules; ISTp guards their own pace. "So close, yet slightly off."',

    // ===== The Conqueror (SLE/ESTp) as source =====
    // The Conqueror (SLE/ESTp) × The Inventor (ILE/ENTp) — Business
    'ESTp-ENTp': 'ESTp tries to bulldoze ENTp\'s concept into reality. Pace matches, but ENTp thinks "I wanted more refinement" while ESTp thinks "Stop overthinking." Surface teamwork, silent friction.',
    // The Conqueror (SLE/ESTp) × The Mediator (SEI/ISFp) — Illusionary
    'ESTp-ISFp': 'ESTp\'s decisiveness feels reliable to ISFp; ISFp\'s softness is healing for ESTp. Weekend outings are fun — but deep life conversations reveal different worlds. Comforting like a mirage.',
    // The Conqueror (SLE/ESTp) ← The Host (ESE/ESFj) — Benefit (reverse)
    'ESTp-ESFj': 'ESFj\'s emotional rallying cry sometimes sparks ESTp into action. ESFj\'s team spirit gets ESTp moving, but ESTp\'s feedback seldom reaches ESFj\'s heart.',
    // The Conqueror (SLE/ESTp) → The Analyst (LII/INTj) — Supervision
    'ESTp-INTj': 'ESTp\'s bold action can demolish INTj\'s theoretical plan. ESTp is just executing — but INTj feels their world is being destroyed and freezes. Without pace-matching, collision is inevitable.',
    // The Conqueror (SLE/ESTp) × The Mentor (EIE/ENFj) — Activity
    'ESTp-ENFj': 'Together, projects launch at breakneck speed. ENFj\'s vision + ESTp\'s firepower = awe-inspiring momentum. But it doesn\'t last — catch your breath before burnout.',
    // The Conqueror (SLE/ESTp) × The Inspector (LSI/ISTj) — Mirror
    'ESTp-ISTj': 'ESTp\'s on-the-ground improvisation meets ISTj\'s "that\'s not in the manual." Mirror-similar judgment, mirror-opposite execution. Understood but frustrated.',
    // The Conqueror (SLE/ESTp) × The Poet (IEI/INFp) — Dual
    'ESTp-INFp': 'When ESTp charges ahead, INFp senses the right moment for a quiet course correction. INFp\'s intuition and ESTp\'s action mesh silently — unspoken trust deepens over time.',
    // The Conqueror (SLE/ESTp) × The Politician (SEE/ESFp) — Kindred
    'ESTp-ESFp': 'Two Se-dominants — action power through the roof. Sports, work, adventures — they charge together. Problem: neither knows when to stop. Add a braking mechanism for the ultimate combo.',
    // The Conqueror (SLE/ESTp) × The Critic (ILI/INTp) — Semi-Dual
    'ESTp-INTp': 'INTp\'s strategic thinking gives direction to ESTp\'s raw action. Near-Dual comfort — but INTp\'s pace feels slow to ESTp. A tantalizingly close match with a remaining gap.',
    // The Conqueror (SLE/ESTp) → The Pioneer (LIE/ENTj) — Benefit
    'ESTp-ENTj': 'ENTj\'s strategy resonates with ESTp, who goes all-in on execution. ENTj\'s vision drives ESTp — but ESTp\'s field insights rarely feed back into ENTj\'s plans.',
    // The Conqueror (SLE/ESTp) ← The Guardian (ESI/ISFj) — Supervision (reverse)
    'ESTp-ISFj': 'ISFj\'s insistence on moral consideration feels like a handbrake to ESTp. ISFj is merely pointing out concerns — but for ESTp, it hits the one spot they\'d rather not be touched.',
    // The Conqueror (SLE/ESTp) × The Director (LSE/ESTj) — Quasi-Identity
    'ESTp-ESTj': 'Both execution-strong and field-savvy, yet ESTp runs on instinct and ESTj runs on plans. Looks similar, approaches opposite — "Your way is the long way around" is mutual.',
    // The Conqueror (SLE/ESTp) × The Humanist (EII/INFj) — Conflict
    'ESTp-INFj': 'ESTp\'s dynamic action looks rough to INFj; INFj\'s delicate consideration looks indecisive to ESTp. Values clash at the root — being natural around each other guarantees friction.',
    // The Conqueror (SLE/ESTp) × The Advocate (IEE/ENFp) — Super-Ego
    'ESTp-ENFp': 'ENFp\'s idealism strikes ESTp as "pipe dreams"; ESTp\'s force-first approach makes ENFp pull back. Each has what the other lacks. Respect is real, but long exposure exhausts.',
    // The Conqueror (SLE/ESTp) × The Craftsman (SLI/ISTp) — Contrary
    'ESTp-ISTp': 'ESTp attacks boldly; ISTp defends carefully. Same Se/Si axis, opposite deployment. ESTp: "too slow." ISTp: "too sloppy." Conscious complementing is needed.',

    // ===== The Poet (IEI/INFp) as source =====
    // The Poet (IEI/INFp) × The Inventor (ILE/ENTp) — Illusionary
    'INFp-ENTp': 'Amid ENTp\'s rapid-fire intellectual barrage, INFp drops a quiet remark that nails the core issue. Initially magnetic — but ENTp\'s speed tires INFp, and INFp\'s silence reads as boredom to ENTp.',
    // The Poet (IEI/INFp) × The Mediator (SEI/ISFp) — Business
    'INFp-ISFp': 'Both gentle introverts, but INFp drifts in future visions while ISFp arranges present comforts. Sharing space is stress-free — but deep chemical reactions are rare.',
    // The Poet (IEI/INFp) ← The Host (ESE/ESFj) — Supervision (reverse)
    'INFp-ESFj': 'ESFj\'s well-meaning "Cheer up!" and "Let\'s do this together!" can feel like INFp\'s inner world is being rudely spotlit. ESFj\'s extraverted care misaligns slightly with what INFp actually needs.',
    // The Poet (IEI/INFp) ← The Analyst (LII/INTj) — Benefit
    'INFp-INTj': 'INTj\'s logical framework gives structure to INFp\'s hazy vision. INTj\'s presence scaffolds INFp\'s creativity — but INFp\'s sensory feedback doesn\'t quite reach INTj.',
    // The Poet (IEI/INFp) × The Mentor (EIE/ENFj) — Mirror
    'INFp-ENFj': 'What INFp feels inside, ENFj voices outward. A strange resonance — like having your inner self voiced by another. Intellectually and emotionally stimulating, though method differences cause friction.',
    // The Poet (IEI/INFp) × The Inspector (LSI/ISTj) — Activity
    'INFp-ISTj': 'ISTj\'s stability grounds INFp; INFp\'s intuition widens ISTj\'s horizons. Short meetings or meals are sparkling — but long collaboration surfaces tempo clashes.',
    // The Poet (IEI/INFp) × The Conqueror (SLE/ESTp) — Dual
    'INFp-ESTp': 'While ESTp carves the path with force, INFp watches from behind, intuitively sensing whether the direction is right. Few words, but INFp\'s quiet navigation prevents ESTp\'s recklessness. Value deepens with time.',
    // The Poet (IEI/INFp) × The Politician (SEE/ESFp) — Semi-Dual
    'INFp-ESFp': 'ESFp\'s bright energy lifts INFp\'s moods. Near-Dual security — but INFp sometimes can\'t match ESFp\'s pace, and emotional follow-through is slightly insufficient.',
    // The Poet (IEI/INFp) × The Critic (ILI/INTp) — Kindred
    'INFp-INTp': 'Shared Ni lets them inhabit intuitive worlds together — comfortable silence is golden. Both respect each other\'s inner space, but shared lack of action means great ideas vanish into thin air.',
    // The Poet (IEI/INFp) ← The Pioneer (LIE/ENTj) — Supervision (reverse)
    'INFp-ENTj': 'ENTj\'s results-orientation pressures INFp\'s delicate inner world. ENTj\'s casual "So, what\'s the outcome?" sounds like interrogation to INFp. No bad intent — which makes it even harder to address.',
    // The Poet (IEI/INFp) ← The Guardian (ESI/ISFj) — Benefit (reverse)
    'INFp-ISFj': 'ISFj\'s devoted care creates a safe cocoon. ISFj handles daily details so INFp can focus on visions — but INFp\'s return contributions often fall short.',
    // The Poet (IEI/INFp) × The Director (LSE/ESTj) — Conflict
    'INFp-ESTj': 'ESTj\'s efficiency-first approach and INFp\'s intuitive time-sense collide head-on. To ESTj it looks like laziness; to INFp it feels like oppression. Mutual acceptance of different worldviews takes significant patience.',
    // The Poet (IEI/INFp) × The Humanist (EII/INFj) — Quasi-Identity
    'INFp-INFj': 'Similar sensitivity and intuition create instant "I get you" rapport. But INFp accepts situations via Ni; INFj judges via Fi. Subtle stance differences become quietly nagging over time.',
    // The Poet (IEI/INFp) × The Advocate (IEE/ENFp) — Contrary
    'INFp-ENFp': 'While INFp dives into inner visions, ENFp fans out to explore external possibilities. Same N-world, opposite directions — each questions the other\'s style without resolution.',
    // The Poet (IEI/INFp) × The Craftsman (SLI/ISTp) — Super-Ego
    'INFp-ISTp': 'INFp admires ISTp\'s quiet competence but feels lonely with ISTp\'s sparse emotional expression. Each excels in the other\'s weakest domain — time together is mentally draining.',
};

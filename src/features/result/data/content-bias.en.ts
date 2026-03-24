import { type BiasType } from '@/types/diagnosis';
import type { BiasContent } from './content-bias';

export const BIAS_CONTENT_EN: Record<BiasType, BiasContent> = {
    'Confirmation': {
        type: 'Confirmation',
        name: 'Confirmation Bias',
        warning: 'You tend to seek out information that supports your hypothesis while ignoring contradictory evidence.',
        detail: `
You unconsciously look at things through the lens of "I'm right," selectively gathering data that backs up your position.
For example, when pushing for a new initiative, you may only listen to supportive voices and dismiss risk concerns.
This can lead to a "naked emperor" situation where critical flaws go undetected as a project moves forward.
        `.trim(),
        countermeasure: 'Build a deliberate "devil\'s advocate" process into your workflow. Ask yourself: "If my hypothesis were wrong, what evidence would exist?" Assign someone on your team whose explicit role is to challenge assumptions.'
    },
    'SunkCost': {
        type: 'SunkCost',
        name: 'Sunk Cost Fallacy',
        warning: 'The "too much invested to quit" mentality prevents you from cutting losses on failing initiatives.',
        detail: `
A reluctance to write off past investments of time, money, and effort causes you to stick with a losing course—even when future losses are predictable.
"We've come this far" becomes an anchor to the past that clouds rational cost-benefit analysis.
The result: deepening losses and missed opportunities to exit before serious damage is done.
        `.trim(),
        countermeasure: 'Ask yourself: "If I were starting from zero today, would I make this same investment?" Past costs are unrecoverable. Shift your decision criteria from "past investment" to "future value."'
    },
    'Authority': {
        type: 'Authority',
        name: 'Authority Bias',
        warning: 'You risk blindly following experts or superiors without critically evaluating their reasoning.',
        detail: `
Titles, status, and track records can make someone's words feel unquestionable, leading you to follow their direction without scrutiny.
"The CEO said so" or "A famous consultant recommended it" becomes sufficient justification, even when the advice doesn't fit on-the-ground realities.
This breeds groupthink and erodes an organization's ability to self-correct.
        `.trim(),
        countermeasure: 'Judge ideas by "what was said," not "who said it." Even for authoritative opinions, verify the underlying data and logic. Develop the habit of evaluating arguments on their own merits.'
    },
    'Availability': {
        type: 'Availability',
        name: 'Availability Heuristic',
        warning: 'You may misjudge probabilities based on recent or vivid events rather than actual statistics.',
        detail: `
Easy-to-recall information—recent news, dramatic failures—gets overweighted, causing you to ignore statistical reality.
A single success story gets generalized into a rule, or a rare risk gets feared so strongly that real opportunities are missed.
        `.trim(),
        countermeasure: 'Don\'t rely on impressions and memory—always check objective numbers and statistical data. Be conscious of sample size: don\'t confuse N=1 (one anecdote) with N=all (a trend).'
    },
    'StatusQuo': {
        type: 'StatusQuo',
        name: 'Status Quo Bias',
        warning: 'You overestimate the risks of change and feel strong resistance to altering the current state.',
        detail: `
A desire to avoid unknown losses outweighs the potential for unknown gains, pushing you to choose "stay the same" even without rational justification.
"This has worked so far" becomes an excuse to ignore environmental shifts, leading to a slow-boiling-frog decline while the world evolves around you.
        `.trim(),
        countermeasure: 'Write down the specific risks of maintaining the status quo. Doing nothing is not a safe choice—it\'s a choice with its own risk: gradual decline. Recognize inaction as an active decision.'
    }
};

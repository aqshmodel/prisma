import type { CrossContent } from '../types';
import { getCrossKey } from '../types';

/**
 * ESTj (The Director / LSE) × All Engines — Cross descriptions
 *
 * ESTj traits: Te+Si. Diligent, upright, keeps promises, tradition-oriented, quality assurance.
 */
export const CROSS_ESTj_EN: Record<string, CrossContent> = {
    [getCrossKey('ESTj', 'T1')]: {
        osCode: 'ESTj',
        engineType: 'T1',
        title: 'The Quality Control Demon',
        description:
            'The most quintessentially "Director" combination. Refuses to compromise quality standards by even a millimeter — everything must run correctly and efficiently. Unmatched at ISO certification and process standardization, but rigidity is a weakness in fast-changing environments. "There\'s only one right way" is the creed — that unshakable stance gives the team security, but accepting new approaches can take time.',
    },
    [getCrossKey('ESTj', 'T2')]: {
        osCode: 'ESTj',
        engineType: 'T2',
        title: 'The Caring Squad Leader',
        description:
            'Looks after subordinates and juniors while keeping operations running perfectly. "Watch and learn" — leads by showing, then monitors growth. Taking on too much care creates a work-overload loop, but the joy when those they\'ve nurtured deliver results is priceless. T2\'s service spirit meets ESTj\'s guidance: "Under this person, you can grow with confidence." Clumsy with words, but warm at heart.',
    },
    [getCrossKey('ESTj', 'T3')]: {
        osCode: 'ESTj',
        engineType: 'T3',
        title: 'The Ironman of the Career Track',
        description:
            'Stacks results steadily and climbs the organizational ladder with certainty. T3\'s ambition meets ESTj\'s diligence: consistently top performance reviews. Excels as a player-manager — delivering personal results while leading. Fixation on titles can erode their natural earnestness, but a position earned on pure merit carries unshakable confidence. Leading by example is their greatest strength.',
    },
    [getCrossKey('ESTj', 'T4')]: {
        osCode: 'ESTj',
        engineType: 'T4',
        title: 'The Heritage Artisan',
        description:
            'Inherits and develops craft and traditional techniques with their own aesthetic sense. T4\'s artistry meets ESTj\'s practical skill: producing work that is both beautiful and functional. Solid exterior, but the obsession with finish quality is that of an artist. "Good enough" is impossible to say — strength and weakness alike. Traditional crafts, fine cuisine, precision machinery — "preserving the old while creating the new" comes naturally to them.',
    },
    [getCrossKey('ESTj', 'T5')]: {
        osCode: 'ESTj',
        engineType: 'T5',
        title: 'The Walking Operations Encyclopedia',
        description:
            'A living manual with encyclopedic knowledge of rules, procedures, and case history. T5\'s knowledge thirst meets ESTj\'s operational skill: instant, evidence-backed answers to any question. Invaluable for onboarding new hires. Knowledge accumulation can become an end in itself, delaying action. "Knowing is worthless without applying" — internalizing this multiplies team contribution.',
    },
    [getCrossKey('ESTj', 'T6')]: {
        osCode: 'ESTj',
        engineType: 'T6',
        title: 'The Crisis Management Sentinel',
        description:
            'A mass of responsibility dedicated to organizational safety. T6\'s vigilance meets ESTj\'s management: overwhelming trust in risk management and compliance. "What-if" preparation is always flawless — BCP design and disaster drills fall under their command. When anxiety runs hot, over-management stifles field autonomy; but when a real crisis hits, they come into their own, calmly containing the damage.',
    },
    [getCrossKey('ESTj', 'T7')]: {
        osCode: 'ESTj',
        engineType: 'T7',
        title: 'The Diligent Optimist',
        description:
            'Delivers rock-solid work, then goes all-in on fun during downtime — a life of sharp contrast. The friendliest ESTj: actively organizes company events and builds team atmosphere. "Full throttle at work AND play" is the motto; earned trust and sunny personality make them the office favorite. Fun-chasing can skew priorities, but their belief that "a fun workplace is the most productive" ends up lifting the whole team\'s performance.',
    },
    [getCrossKey('ESTj', 'T8')]: {
        osCode: 'ESTj',
        engineType: 'T8',
        title: 'The Iron-Fisted Field Commander',
        description:
            'Runs the organization with powerful execution and relentless responsibility. Never retreats from adversity — stands at the front to solve problems. T8\'s power meets ESTj\'s management: a charismatic commander who commands sole organizational trust. Excels at turning around troubled projects and burning issues. Authoritarianism risks creating yes-men; listening to others\' opinions makes them an unbeatable leader.',
    },
    [getCrossKey('ESTj', 'T9')]: {
        osCode: 'ESTj',
        engineType: 'T9',
        title: 'The Gentle Operator',
        description:
            'The most flexible and collaborative of all ESTjs. Values rules but implements them through team consensus rather than imposition. T9\'s harmony softens ESTj\'s rigidity: "If this person says so, I\'m on board" — naturally accepted leadership. Exquisite balance of strictness and kindness; leverages individual strengths while maintaining discipline. Too little strictness risks loosening order, but with calibration they become the ideal beloved manager.',
    },
};

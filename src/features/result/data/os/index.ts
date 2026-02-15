
import type { OSContent } from './types';
import { AlphaOS_Part1 } from './alpha_part1';
import { AlphaOS_Part2 } from './alpha_part2';
import { BetaOS_Part1 } from './beta_part1';
import { BetaOS_Part2 } from './beta_part2';
import { GammaOS_Part1 } from './gamma_part1';
import { GammaOS_Part2 } from './gamma_part2';
import { DeltaOS_Part1 } from './delta_part1';
import { DeltaOS_Part2 } from './delta_part2';
// Import other parts as created

// Combine all parts
export const OS_CONTENT_EXPANDED: Record<string, OSContent> = {
    ...AlphaOS_Part1,
    ...AlphaOS_Part2,
    ...BetaOS_Part1,
    ...BetaOS_Part2,
    ...GammaOS_Part1,
    ...GammaOS_Part2,
    ...DeltaOS_Part1,
    ...DeltaOS_Part2,
    // Add other parts here
};

export * from './types';

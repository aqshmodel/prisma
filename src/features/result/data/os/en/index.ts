
import type { OSContent } from '../types';
import { AlphaOS_Part1_EN } from './alpha_part1.en';
import { AlphaOS_Part2_EN } from './alpha_part2.en';
import { BetaOS_Part1_EN } from './beta_part1.en';
import { BetaOS_Part2_EN } from './beta_part2.en';
import { GammaOS_Part1_EN } from './gamma_part1.en';
import { GammaOS_Part2_EN } from './gamma_part2.en';
import { DeltaOS_Part1_EN } from './delta_part1.en';
import { DeltaOS_Part2_EN } from './delta_part2.en';

// Combine all English OS content parts
export const OS_CONTENT_EN: Record<string, OSContent> = {
    ...AlphaOS_Part1_EN,
    ...AlphaOS_Part2_EN,
    ...BetaOS_Part1_EN,
    ...BetaOS_Part2_EN,
    ...GammaOS_Part1_EN,
    ...GammaOS_Part2_EN,
    ...DeltaOS_Part1_EN,
    ...DeltaOS_Part2_EN,
};

import { describe, it, expect } from 'vitest';
import { calculateTeamPlan, STRIPE_PRICE_IDS } from '../utils/pricing';

describe('Team Pricing Logic', () => {
  it('should throw an error for less than 3 members', () => {
    expect(() => calculateTeamPlan(2)).toThrowError('チーム分析には最低3名のメンバーが必要です');
  });

  it('should return small plan for 3-6 members', () => {
    const minResult = calculateTeamPlan(3);
    const maxResult = calculateTeamPlan(6);
    
    expect(minResult.plan).toBe('small');
    expect(minResult.priceAmount).toBe(3300);
    expect(minResult.stripePriceId).toBe(STRIPE_PRICE_IDS.small);

    expect(maxResult.plan).toBe('small');
  });

  it('should return middle plan for 7-15 members', () => {
    const minResult = calculateTeamPlan(7);
    const maxResult = calculateTeamPlan(15);
    
    expect(minResult.plan).toBe('middle');
    expect(minResult.priceAmount).toBe(5500);
    expect(minResult.stripePriceId).toBe(STRIPE_PRICE_IDS.middle);

    expect(maxResult.plan).toBe('middle');
  });

  it('should return large plan for 16-30 members', () => {
    const minResult = calculateTeamPlan(16);
    const maxResult = calculateTeamPlan(30);
    
    expect(minResult.plan).toBe('large');
    expect(minResult.priceAmount).toBe(11000);
    expect(minResult.stripePriceId).toBe(STRIPE_PRICE_IDS.large);

    expect(maxResult.plan).toBe('large');
  });

  it('should return enterprise plan for more than 30 members', () => {
    const result = calculateTeamPlan(31);
    
    expect(result.plan).toBe('enterprise');
    expect(result.priceAmount).toBe(0);
    expect(result.stripePriceId).toBeNull();
  });
});

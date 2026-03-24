import { describe, it, expect } from 'vitest';
import { generateTeamPairs, TeamMember } from '../utils/pairs';

describe('Team Pairs Generator', () => {
  it('correctly generates (N * (N - 1)) / 2 pairs for 3 members', () => {
    const members: TeamMember[] = [
      { id: '1', name: 'A', typeCode: 'ENTp' },
      { id: '2', name: 'B', typeCode: 'ISFp' },
      { id: '3', name: 'C', typeCode: 'INTj' },
    ];
    
    const pairs = generateTeamPairs(members);
    
    // 3 members should generate 3 pairs
    expect(pairs.length).toBe(3);
    
    // A and B (ENTp and ISFp) should be Dual (5 stars)
    const pairAB = pairs.find(p => 
      (p.memberA.id === '1' && p.memberB.id === '2') || 
      (p.memberA.id === '2' && p.memberB.id === '1')
    );
    expect(pairAB?.relation?.type).toBe('Dual');
    
    // Pairs should be sorted by stars descending, so Dual (5) should be first
    expect(pairs[0].relation?.stars).toBeGreaterThanOrEqual(pairs[1].relation?.stars || 0);
  });

  it('handles invalid type codes gracefully', () => {
    const members: TeamMember[] = [
      { id: '1', name: 'A', typeCode: 'INVALID' },
      { id: '2', name: 'B', typeCode: 'ENTp' },
    ];
    
    const pairs = generateTeamPairs(members);
    expect(pairs.length).toBe(1);
    expect(pairs[0].relation).toBeNull();
  });
});

import type { OSTypeCode } from '@/types/diagnosis';
import { getCompatibility, RelationDefinition } from '@/lib/constants/compatibility';

export interface TeamMember {
  id: string; 
  name: string;
  typeCode: string;
  enneagram?: string;
}

export interface TeamPair {
  memberA: TeamMember;
  memberB: TeamMember;
  relation: RelationDefinition | null;
}

/**
 * チームメンバーのリストから、全ペア組み合わせを生成し相性ランク順にソートして返却する
 */
export function generateTeamPairs(members: TeamMember[]): TeamPair[] {
  const pairs: TeamPair[] = [];
  
  for (let i = 0; i < members.length; i++) {
    for (let j = i + 1; j < members.length; j++) {
      const memberA = members[i];
      const memberB = members[j];
      
      let relation: RelationDefinition | null = null;
      try {
        // 型アサーションを用いて既存の getCompatibility メソッドを呼び出す
        relation = getCompatibility(memberA.typeCode as OSTypeCode, memberB.typeCode as OSTypeCode);
      } catch (e) {
        // 未定義のタイプ等の場合はエラーを握り潰し、nullとして安全にフォールバック
      }
      
      // 不正なキーアクセスでundefinedが返った場合も防ぐ
      if (!relation) {
        relation = null;
      }
      
      pairs.push({
        memberA,
        memberB,
        relation,
      });
    }
  }
  
  // 相性が良い（★が多い）順にソートする
  return pairs.sort((a, b) => {
    const starsA = a.relation?.stars || 0;
    const starsB = b.relation?.stars || 0;
    return starsB - starsA;
  });
}

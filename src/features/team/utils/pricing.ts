export type TeamPlan = 'small' | 'middle' | 'large' | 'enterprise';

export interface PlanDetails {
  plan: TeamPlan;
  priceAmount: number;
  stripePriceId: string | null;
  maxMembers: number;
  minMembers: number;
}

// ユーザーから受領したStripeテスト用価格ID（将来的に環境変数化可能）
export const STRIPE_PRICE_IDS = {
  small: 'price_1TEUxiLi2uMaXCUag69OMTu7',
  middle: 'price_1TEUyrLi2uMaXCUaJtZMzPN3',
  large: 'price_1TEUzqLi2uMaXCUaKov49p02',
};

/**
 * メンバー数から適切なプランとStripe Price IDを計算する
 * サーバー・クライアント共通ロジックで利用し、料金の改ざんを防ぐ
 */
export function calculateTeamPlan(memberCount: number): PlanDetails {
  if (memberCount < 3) {
    throw new Error('チーム分析には最低3名のメンバーが必要です');
  }
  if (memberCount <= 6) {
    return { plan: 'small', priceAmount: 3300, stripePriceId: STRIPE_PRICE_IDS.small, minMembers: 3, maxMembers: 6 };
  }
  if (memberCount <= 15) {
    return { plan: 'middle', priceAmount: 5500, stripePriceId: STRIPE_PRICE_IDS.middle, minMembers: 7, maxMembers: 15 };
  }
  if (memberCount <= 30) {
    return { plan: 'large', priceAmount: 11000, stripePriceId: STRIPE_PRICE_IDS.large, minMembers: 16, maxMembers: 30 };
  }
  
  // 31名以上はお問い合わせ（エンタープライズプラン）となるため、決済IDはnullを返す
  return { plan: 'enterprise', priceAmount: 0, stripePriceId: null, minMembers: 31, maxMembers: Infinity };
}

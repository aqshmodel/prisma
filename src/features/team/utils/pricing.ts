export type TeamPlan = 'small' | 'middle' | 'large' | 'enterprise';

export interface PlanDetails {
  plan: TeamPlan;
  priceAmount: number;
  stripePriceId: string | null;
  maxMembers: number;
  minMembers: number;
}

// Stripeの価格IDを環境変数から取得（テスト・本番を分離）
// クライアント(TeamInputForm)とサーバー(API)両方で使うため NEXT_PUBLIC_ を付与
export const getStripePriceId = (plan: TeamPlan) => {
  switch (plan) {
    case 'small': return process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SMALL || '';
    case 'middle': return process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MIDDLE || '';
    case 'large': return process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_LARGE || '';
    default: return null;
  }
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
    return { plan: 'small', priceAmount: 3300, stripePriceId: getStripePriceId('small'), minMembers: 3, maxMembers: 6 };
  }
  if (memberCount <= 15) {
    return { plan: 'middle', priceAmount: 5500, stripePriceId: getStripePriceId('middle'), minMembers: 7, maxMembers: 15 };
  }
  if (memberCount <= 30) {
    return { plan: 'large', priceAmount: 11000, stripePriceId: getStripePriceId('large'), minMembers: 16, maxMembers: 30 };
  }
  
  // 31名以上はお問い合わせ（エンタープライズプラン）となるため、決済IDはnullを返す
  return { plan: 'enterprise', priceAmount: 0, stripePriceId: null, minMembers: 31, maxMembers: Infinity };
}

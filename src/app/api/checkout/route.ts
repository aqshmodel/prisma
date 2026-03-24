import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { dbAdmin } from '@/lib/firebase-admin';
import { teamInputSchema } from '@/features/team/utils/schema';
import { calculateTeamPlan } from '@/features/team/utils/pricing';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. バリデーション (Zod)
    const validationResult = teamInputSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input data', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const validData = validationResult.data;
    const membersCount = validData.members.length;

    // 2. サーバーサイドでの正しい金額とプランの再計算（改ざん防止）
    const planDetails = calculateTeamPlan(membersCount);

    if (planDetails.plan === 'enterprise' || !planDetails.stripePriceId) {
      return NextResponse.json(
        { error: 'Enterprise plan calculation should be handled via inquiry' },
        { status: 400 }
      );
    }

    // 3. Firestore に `pending` ステータスで注文データを先行保存 (Pre-save パターン)
    // これにより Stripe の metadata(500文字上限) エラーを回避する
    const orderRef = dbAdmin.collection('team_analysis_orders').doc();
    const orderId = orderRef.id;

    await orderRef.set({
      orderId,
      status: 'pending',
      planDetails,
      members: validData.members,
      leadInfo: validData.leadInfo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // 4. Stripe Checkout セッションを作成
    // ※実際のドメインではなく localhost や本番ドメインを動的に生成
    const origin = req.headers.get('origin') || 'http://localhost:3003';
    
    // Stripeからのリダイレクト先となるサンクスページ等（Part 3にて実装）
    const successUrl = `${origin}/team/result/checkout-success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/team/`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: planDetails.stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      // この orderId を Webhook で受け取って決済完了(paid)とし、結果URL用トークンを発行する
      client_reference_id: orderId, 
      customer_email: validData.leadInfo.email,
    });

    if (!session.url) {
      // 万一URLが生成されなかった場合の保険
      await orderRef.update({ status: 'failed_stripe_url_creation' });
      throw new Error('Failed to create stripe session url');
    }

    // クライアントへリダイレクト用URLを返却
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

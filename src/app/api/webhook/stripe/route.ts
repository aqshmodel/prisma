import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { dbAdmin } from '@/lib/firebase-admin';
import { v4 as uuidv4 } from 'uuid';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

// Stripeダッシュボードから取得したWebhookシークレット
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      // 送信元が確実にStripeであることを検証
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed:`, err.message);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // 決済完了イベントのハンドリング
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.client_reference_id; // API側で仕込んだFirestoreのDocumentID

      if (orderId) {
        // 推測不可能なUUIDを生成（結果ページの閲覧用セキュアキーとなる）
        const resultToken = uuidv4();
        
        // Firestoreのオーダーステータスを `paid` に更新
        await dbAdmin.collection('team_analysis_orders').doc(orderId).update({
          status: 'paid',
          stripeSessionId: session.id,
          resultToken: resultToken,
          paidAt: new Date().toISOString(),
        });
        
        console.log(`Payment successful for order: ${orderId}. Token generated.`);
      } else {
        console.error('checkout.session.completed event received, but no client_reference_id found.');
      }
    }

    // Stripe側に正常受信を素早く返す（200 OK）
    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook processing error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

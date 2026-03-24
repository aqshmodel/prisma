import { redirect } from 'next/navigation';
import { dbAdmin } from '@/lib/firebase-admin';

export default async function CheckoutSuccessPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const sessionId = typeof searchParams.session_id === 'string' ? searchParams.session_id : undefined;

  if (!sessionId) {
    redirect('/team');
  }

  // StripeのSessionIDをもとにFirestoreから該当オーダーを検索
  const snapshot = await dbAdmin.collection('team_analysis_orders')
    .where('stripeSessionId', '==', sessionId)
    .where('status', '==', 'paid')
    .limit(1)
    .get();

  // まだWebhookが到達していないか、処理中でDBに反映されていない場合
  // この画面で数秒待たせてリロードを促す（Polling UI）
  if (snapshot.empty) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">決済の完了を確認しています...</h1>
        <p className="text-slate-600 mb-8 max-w-md">
          クレジットカードの処理とAI分析の準備を行っています。<br />
          画面をリロードするか、このまま数秒間お待ちください。
        </p>
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        
        <script dangerouslySetInnerHTML={{
          __html: `
            setTimeout(function() {
              window.location.reload();
            }, 5000);
          `
        }} />
      </div>
    );
  }

  // 決済完了が確認できたら、セキュアな一意のトークンURLへ直近リダイレクト
  const orderData = snapshot.docs[0].data();
  const token = orderData.resultToken;

  if (token) {
    redirect(`/team/result/${token}`);
  } else {
    redirect('/team');
  }
}

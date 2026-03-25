import { notFound } from 'next/navigation';
import { dbAdmin } from '@/lib/firebase-admin';
import { generateTeamPairs } from '@/features/team/utils/pairs';
import type { TeamMember } from '@/features/team/utils/pairs';
import { PairCatalog } from '@/features/team/components/PairCatalog';
import { TeamVisualMap } from '@/features/team/components/TeamVisualMap';
import { AiAnalysisSection } from '@/features/team/components/AiAnalysisSection';
import { PdfExportButton } from '@/features/team/components/PdfExportButton';
import { Users, Calendar } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'チーム相性マップ分析結果 | Aqsh Prisma',
  robots: 'noindex, nofollow', // 検索エンジンにインデックスさせない（限定公開トークンURL）
};

interface TeamResultPageProps {
  params: Promise<{ token: string }>;
}

export default async function TeamResultPage(props: TeamResultPageProps) {
  const params = await props.params;
  const token = params.token;

  if (!token || typeof token !== 'string') {
    notFound();
  }

  // Firestoreからトークンに一致するオーダーを取得
  const snapshot = await dbAdmin.collection('team_analysis_orders')
    .where('resultToken', '==', token)
    .where('status', '==', 'paid')
    .limit(1)
    .get();

  if (snapshot.empty) {
    notFound();
  }

  const orderData = snapshot.docs[0].data();
  const leadInfo = orderData.leadInfo;
  
  // Firestoreから取得したメンバーにIDが付与されていない場合、明示的に割り当てる
  // ※Server Component→Client Componentへのシリアライズ後もIDが一貫するようにする
  const members = (orderData.members as TeamMember[]).map((m, i) => ({
    ...m,
    id: m.id || String(i),
  }));
  
  // チームペアの総当りリストを生成＆ソート
  const pairs = generateTeamPairs(members);
  
  // 決済日時のフォーマット
  const paidDate = new Date(orderData.paidAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-32 font-sans selection:bg-teal-200 selection:text-teal-900">
      <div id="report-container" className="container mx-auto px-2 sm:px-4 max-w-6xl">
        
        {/* レポートヘッダー */}
        <header className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200 mb-10 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold mb-4">
                <span>AI チーム相性分析レポート</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight mb-2">
                {leadInfo.companyName} 様
              </h1>
              <p className="text-slate-500 font-medium">担当者: {leadInfo.contactName} 様</p>
            </div>
            
            <div className="flex flex-col gap-3 md:items-end">
              <PdfExportButton targetId="report-container" filename={`aqsh-team-analysis-${leadInfo.companyName}`} />
              <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                <Users className="w-4 h-4 text-slate-400" />
                <span>対象メンバー数: <strong>{members.length}名</strong>（全{pairs.length}ペア）</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>分析日: {paidDate}</span>
              </div>
            </div>
          </div>
        </header>

        {/* AI キャプテンズ・レビュー */}
        <section className="mb-12" id="ai-analysis-section">
          <AiAnalysisSection token={token} />
        </section>

        {/* チーム相関マップ */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-teal-400 to-cyan-500 rounded-full rounded-tl-sm rounded-bl-sm"></div>
            <h2 className="text-2xl font-bold text-slate-800">チーム相関マップ</h2>
          </div>
          <p className="text-slate-600 mb-8 max-w-3xl">
            メンバー間の関係性を視覚的にマッピングしています。良い関係や刺激を与え合うペアを絞り込んで表示できます。
          </p>
          <TeamVisualMap members={members} pairs={pairs} />
        </section>

        {/* ペアカタログ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-teal-400 to-cyan-500 rounded-full rounded-tl-sm rounded-bl-sm"></div>
            <h2 className="text-2xl font-bold text-slate-800">全ペア・関係性カタログ</h2>
          </div>
          <p className="text-slate-600 mb-8 max-w-3xl">
            チーム内の全ての組み合わせにおける「相性関係」を一覧化しています。星の数（★）が多いほど自然に補完し合える良好な相性であり、少ないほど摩擦が起きやすい（あるいは大きく成長できる）相性を示しています。
          </p>
          
          <PairCatalog pairs={pairs} teamToken={token} />
        </section>
        
      </div>
    </div>
  );
}

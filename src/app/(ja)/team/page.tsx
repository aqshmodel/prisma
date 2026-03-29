import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Users, Presentation, MessageSquareText, FileText } from 'lucide-react';
import { TeamInputForm } from '@/features/team/components/TeamInputForm';

export const metadata: Metadata = {
  title: 'チーム相性マップ分析 | Aqsh Prisma (法人向け)',
  description: '組織の心理的安全性と生産性を最大化する、AI チーム相性マップ分析ツール。3名から30名までのチームにおけるすべての関係性をカタログ化し、Gemini搭載AIが組織の長所短所と改善策を提示します。',
  robots: 'index, follow', // toB SEOのためにインデックス
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-32">
        {/* ヒーローセクション */}
        <section className="container mx-auto px-4 max-w-5xl text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 text-teal-800 text-sm font-bold mb-6">
            <Users className="w-4 h-4" />
            <span>法人・チームリーダー向け機能</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            チームの<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">見えない摩擦</span>を<br className="hidden md:block" />
            データとAIで解き明かす。
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed text-left">
            メンバーの名前と16タイプを入力するだけで、全ペアの「相性カタログ」と「AIによる組織ケミストリー分析」を即座に生成。勘や経験に頼らない科学的なマネジメントを実現します。
          </p>

          <div className="mt-10 mb-4 animate-fade-in-up md:delay-100">
            <Link 
              href="/team/result/demo-test-token-12345/" 
              target="_blank" 
              className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
            >
              <FileText className="w-5 h-5" />
              実際のサンプルレポートを見る（無料）
            </Link>
          </div>
        </section>

        {/* 機能ハイライト */}
        <section className="container mx-auto px-4 max-w-4xl mb-20 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:border-teal-200 transition-colors">
            <div className="bg-teal-50 p-3 rounded-xl shrink-0">
              <Presentation className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">ビジュアル関係性マップ</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                チーム内の全ペアがどのような関係性（双対、衝突、活性化など）にあるかをひと目で把握できるマップを生成します。
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:border-cyan-200 transition-colors">
            <div className="bg-cyan-50 p-3 rounded-xl shrink-0">
              <MessageSquareText className="w-6 h-6 text-cyan-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">AI コンサルタント分析</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Google の最新AI「Gemini」が、メンバーのタイプ構成に基づき、具体的なコミュニケーションの処方箋や組織の強み・盲点をアドバイスします。
              </p>
            </div>
          </div>
        </section>

        {/* フォームセクション */}
        <section className="container mx-auto px-4">
          <TeamInputForm />
        </section>
      </div>
  );
}

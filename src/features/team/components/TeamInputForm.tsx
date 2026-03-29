'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, Building, User, Mail, Users, ArrowRight, ClipboardCheck, ExternalLink, Phone } from 'lucide-react';
import { teamInputSchema } from '../utils/schema';
import type { TeamInputFormValues } from '../utils/schema';
import { calculateTeamPlan } from '../utils/pricing';

const SOCIONICS_TYPES = [
  { code: 'ENTp', label: 'ENTp (ILE: 発明家)' },
  { code: 'ISFp', label: 'ISFp (SEI: 調停者)' },
  { code: 'ESFj', label: 'ESFj (ESE: 供応者)' },
  { code: 'INTj', label: 'INTj (LII: 分析家)' },
  { code: 'ENFj', label: 'ENFj (EIE: 教育者)' },
  { code: 'ISTj', label: 'ISTj (LSI: 管理者)' },
  { code: 'ESTp', label: 'ESTp (SLE: 発起人)' },
  { code: 'INFp', label: 'INFp (IEI: 心理学者)' },
  { code: 'ESFp', label: 'ESFp (SEE: 政治家)' },
  { code: 'INTp', label: 'INTp (ILI: 批評家)' },
  { code: 'ENTj', label: 'ENTj (LIE: 起業家)' },
  { code: 'ISFj', label: 'ISFj (ESI: 守護者)' },
  { code: 'ESTj', label: 'ESTj (LSE: 管理者)' },
  { code: 'INFj', label: 'INFj (EII: 人道主義者)' },
  { code: 'ENFp', label: 'ENFp (IEE: 心理学者)' },
  { code: 'ISTp', label: 'ISTp (SLI: 職人)' },
];

const ENNEAGRAM_TYPES = [
  { code: '1', label: 'タイプ1 (改革する人)' },
  { code: '2', label: 'タイプ2 (助ける人)' },
  { code: '3', label: 'タイプ3 (達成する人)' },
  { code: '4', label: 'タイプ4 (個性的な人)' },
  { code: '5', label: 'タイプ5 (調べる人)' },
  { code: '6', label: 'タイプ6 (忠実な人)' },
  { code: '7', label: 'タイプ7 (熱中する人)' },
  { code: '8', label: 'タイプ8 (挑戦する人)' },
  { code: '9', label: 'タイプ9 (平和をもたらす人)' },
];

export function TeamInputForm() {
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TeamInputFormValues>({
    resolver: zodResolver(teamInputSchema),
    defaultValues: {
      members: [
        { name: '', typeCode: '', enneagram: '' },
        { name: '', typeCode: '', enneagram: '' },
        { name: '', typeCode: '', enneagram: '' },
      ],
      leadInfo: {
        companyName: '',
        contactName: '',
        phoneNumber: '',
        email: '',
        emailConfirm: '',
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  });

  const members = watch('members');
  const membersCount = members?.length || 0;

  let planDetails = null;
  let planError = null;

  try {
    if (membersCount > 0) {
      planDetails = calculateTeamPlan(membersCount);
    }
  } catch (e: any) {
    planError = e.message;
  }

  const onSubmit = async (data: TeamInputFormValues) => {
    setApiError(null);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '決済の準備に失敗しました');
      }

      if (result.url) {
        // Stripeの安全なCheckout画面へリダイレクト
        window.location.href = result.url;
      } else {
        throw new Error('決済URLが取得できませんでした');
      }
    } catch (err: any) {
      setApiError(err.message || '決済の準備中にエラーが発生しました。時間をおいて再度お試しください。');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 max-w-5xl mx-auto">
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-teal-100 p-2.5 rounded-lg">
            <Users className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">1. チームメンバーの入力</h2>
            <p className="text-sm text-slate-500 mt-1">分析したい3名〜30名のメンバーを登録してください。</p>
          </div>
        </div>

        {/* 診断案内バナー */}
        <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-white p-2 rounded-full shrink-0 shadow-sm border border-teal-100">
              <ClipboardCheck className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">メンバーのタイプが分からない場合</p>
              <p className="text-xs text-slate-600 mt-1">まだ診断を受けていないメンバーには、以下のリンクを共有して無料診断を受けてもらってください。（診断時間 約12分）</p>
            </div>
          </div>
          <a href="/" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-white border border-teal-200 hover:border-teal-400 text-teal-700 text-sm font-bold py-2.5 px-5 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
            <span>診断ページを開く</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {errors.members?.root && (
          <p className="text-red-500 text-sm mb-4 font-medium px-4 py-3 bg-red-50 rounded-lg">
            {errors.members.root.message}
          </p>
        )}

        {/* スマホレイアウト対応のため、やや幅広（max-w-5xl）に調整 */}
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col lg:flex-row gap-3 items-start lg:items-center bg-slate-50 p-4 rounded-xl border border-slate-100 transition-colors focus-within:bg-white focus-within:border-teal-200">
              <div className="flex text-lg font-bold text-slate-300 w-8 shrink-0 select-none pb-2 lg:pb-0">
                {(index + 1).toString().padStart(2, '0')}
              </div>
              
              {/* 名前 */}
              <div className="flex-1 w-full relative">
                <input
                  type="text"
                  placeholder="メンバーの名前"
                  {...register(`members.${index}.name` as const)}
                  className={`w-full bg-white px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-teal-500 outline-none transition-shadow ${errors.members?.[index]?.name ? 'border-red-300' : 'border-slate-200'}`}
                />
                {errors.members?.[index]?.name && (
                  <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-1">{errors.members[index]?.name?.message}</p>
                )}
              </div>

              {/* 16タイプ (ソシオニクス) */}
              <div className="flex-1 w-full relative">
                <select
                  {...register(`members.${index}.typeCode` as const)}
                  className={`w-full bg-white px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-teal-500 outline-none transition-shadow appearance-none ${errors.members?.[index]?.typeCode ? 'border-red-300' : 'border-slate-200'}`}
                >
                  <option value="">ソシオニクス16タイプ</option>
                  {SOCIONICS_TYPES.map(t => (
                    <option key={t.code} value={t.code}>{t.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
                {errors.members?.[index]?.typeCode && (
                  <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-1">{errors.members[index]?.typeCode?.message}</p>
                )}
              </div>

              {/* エニアグラム (任意) */}
              <div className="flex-1 w-full relative">
                <select
                  {...register(`members.${index}.enneagram` as const)}
                  className={`w-full bg-white px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-teal-500 outline-none transition-shadow appearance-none border-slate-200`}
                >
                  <option value="">エニアグラム（任意）</option>
                  {ENNEAGRAM_TYPES.map(t => (
                    <option key={t.code} value={t.code}>{t.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
              </div>

              <div className="w-full lg:w-auto flex justify-end">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  disabled={fields.length <= 3}
                  className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                  aria-label="削除"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => append({ name: '', typeCode: '', enneagram: '' })}
          disabled={fields.length >= 30}
          className="mt-6 w-full py-4 border-2 border-dashed border-teal-200 text-teal-600 rounded-xl font-medium hover:bg-teal-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
          <span>メンバーを追加する</span>
        </button>
      </section>

      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-cyan-100 p-2.5 rounded-lg">
            <Building className="w-6 h-6 text-cyan-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">2. 法人・担当者情報</h2>
            <p className="text-sm text-slate-500 mt-1">分析結果と領収書の送付先となります。</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">会社名 <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Building className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                {...register('leadInfo.companyName')}
                placeholder="株式会社Aqsh"
                className={`w-full pl-11 pr-4 py-2.5 bg-slate-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none transition-shadow ${errors.leadInfo?.companyName ? 'border-red-300' : 'border-slate-200'}`}
              />
            </div>
            {errors.leadInfo?.companyName && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.leadInfo.companyName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">担当者名 <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                {...register('leadInfo.contactName')}
                placeholder="山田 太郎"
                className={`w-full pl-11 pr-4 py-2.5 bg-slate-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none transition-shadow ${errors.leadInfo?.contactName ? 'border-red-300' : 'border-slate-200'}`}
              />
            </div>
            {errors.leadInfo?.contactName && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.leadInfo.contactName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">電話番号 <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="tel"
                {...register('leadInfo.phoneNumber')}
                placeholder="03-1234-5678"
                className={`w-full pl-11 pr-4 py-2.5 bg-slate-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none transition-shadow ${errors.leadInfo?.phoneNumber ? 'border-red-300' : 'border-slate-200'}`}
              />
            </div>
            {errors.leadInfo?.phoneNumber && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.leadInfo.phoneNumber.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">メールアドレス <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="email"
                {...register('leadInfo.email')}
                placeholder="taro.yamada@example.com"
                className={`w-full pl-11 pr-4 py-2.5 bg-slate-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none transition-shadow ${errors.leadInfo?.email ? 'border-red-300' : 'border-slate-200'}`}
              />
            </div>
            {errors.leadInfo?.email && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.leadInfo.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">メールアドレス（確認） <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="email"
                {...register('leadInfo.emailConfirm')}
                placeholder="taro.yamada@example.com"
                className={`w-full pl-11 pr-4 py-2.5 bg-slate-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none transition-shadow ${errors.leadInfo?.emailConfirm ? 'border-red-300' : 'border-slate-200'}`}
                onPaste={(e) => {
                  e.preventDefault();
                  alert('入力ミスを防ぐため、コピーペーストはできません。');
                }}
              />
            </div>
            {errors.leadInfo?.emailConfirm && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.leadInfo.emailConfirm.message}</p>}
          </div>
        </div>
      </section>

      <section className="bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6 text-center">お支払い金額</h2>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8 text-center">
            {planError ? (
              <p className="text-amber-400 font-medium">{planError}</p>
            ) : planDetails?.plan === 'enterprise' ? (
              <div className="space-y-4">
                <p className="text-xl font-bold text-amber-300">31名以上のプラン（要お見積り）</p>
                <p className="text-slate-300 text-sm">大規模組織向けのカスタマイズプランをご案内します。お手数ですがお問い合わせください。</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-slate-400 font-medium">
                  {membersCount}名チーム分析 （{planDetails?.plan === 'small' ? 'スモール' : planDetails?.plan === 'middle' ? 'ミドル' : 'ラージ'}プラン）
                </p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-extrabold tracking-tight">¥{planDetails?.priceAmount.toLocaleString()}</span>
                  <span className="text-slate-400 font-medium text-lg">（税込）</span>
                </div>
              </div>
            )}
          </div>

          {apiError && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm mb-6 font-medium">
              {apiError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !!planError || planDetails?.plan === 'enterprise'}
            className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-300 hover:to-cyan-400 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span className="text-lg">決済画面へ進む</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          
          <div className="text-center mt-5 text-slate-400 text-xs space-y-1">
            <p>Stripeの安全な決済システムを使用します。</p>
            <p>購入後、すぐにAI相性マップをご覧いただけます。</p>
          </div>
        </div>
      </section>
    </form>
  );
}

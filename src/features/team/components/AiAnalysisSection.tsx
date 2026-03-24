'use client';

import { useState, useEffect, useCallback } from 'react';
import { Sparkles, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { FormattedText } from '@/components/ui/FormattedText';

// 簡易Markdownレンダラー
function SimpleMarkdown({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-2 leading-relaxed text-slate-700">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (line.startsWith('### ')) {
          return (
            <h3 key={i} className="text-lg font-bold text-slate-800 mt-8 mb-3 border-b border-slate-200 pb-2">
              {line.replace('### ', '')}
            </h3>
          );
        }
        if (line.startsWith('#### ')) {
          return <h4 key={i} className="text-md font-bold text-teal-800 mt-6 mb-2">{line.replace('#### ', '')}</h4>;
        }
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return <li key={i} className="ml-5 list-disc text-sm my-1 leading-loose"><FormattedText text={trimmed.replace(/^[-*]\s/, '')} disableGlossary /></li>;
        }
        if (trimmed.match(/^[0-9]+\.\s/)) {
          return <li key={i} className="ml-5 list-decimal text-sm text-slate-800 mt-2"><FormattedText text={trimmed.replace(/^[0-9]+\.\s/, '')} disableGlossary /></li>;
        }
        if (trimmed === '') return <div key={i} className="h-2"></div>;
        
        return <p key={i} className="text-sm leading-relaxed"><FormattedText text={line} disableGlossary /></p>;
      })}
    </div>
  );
}

export function AiAnalysisSection({ token }: { token: string }) {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [regenerating, setRegenerating] = useState(false);

  const fetchAnalysis = useCallback(async (forceRegen = false) => {
    try {
      if (forceRegen) {
        setRegenerating(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const res = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, forceRegen })
      });
      const result = await res.json();
      
      if (!res.ok) throw new Error(result.error || 'Failed to fetch AI analysis');
      
      setData(result.result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRegenerating(false);
    }
  }, [token]);

  useEffect(() => { fetchAnalysis(); }, [fetchAnalysis]);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 min-h-[240px] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-teal-400 animate-spin mb-4" />
        <p className="text-center font-bold text-slate-600">
          チームデータを分析しています...
        </p>
        <p className="text-center text-xs text-slate-400 mt-2">
          初回は30秒〜1分ほどかかる場合があります
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 rounded-3xl p-8 shadow-sm border border-rose-200 flex flex-col items-center justify-center">
        <AlertCircle className="w-10 h-10 text-rose-500 mb-4" />
        <p className="font-bold text-rose-800 mb-2">生成に失敗しました</p>
        <p className="text-sm text-rose-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-100">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI チーム所見レポート</span>
        </div>
        <button
          onClick={() => fetchAnalysis(true)}
          disabled={regenerating}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-600 font-medium transition-colors disabled:opacity-50"
          title="新しい文章で再生成します（API課金が発生します）"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${regenerating ? 'animate-spin' : ''}`} />
          {regenerating ? '再生成中...' : '再生成する'}
        </button>
      </div>
      
      {data && <SimpleMarkdown text={data} />}
    </div>
  );
}


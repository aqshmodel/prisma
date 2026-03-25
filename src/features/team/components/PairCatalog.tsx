'use client';

import { useState } from 'react';
import type { TeamPair, TeamMember } from '../utils/pairs';
import { Star, BookOpen, ArrowRight, Filter } from 'lucide-react';
import Link from 'next/link';
import { CROSS_CONTENT } from '@/features/result/data/cross';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { ENGINE_CONTENT } from '@/features/result/data/content-engine';
import type { OSTypeCode, EngineType } from '@/types/diagnosis';

interface PairCatalogProps {
  pairs: TeamPair[];
  teamToken?: string;
}

export function PairCatalog({ pairs, teamToken }: PairCatalogProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<string>('ALL');

  if (!pairs || pairs.length === 0) {
    return <div className="text-center p-8 text-slate-500">ペアデータがありません。</div>;
  }

  // ペアデータから全メンバーを抽出して一意にする
  const allMembersMap = new Map();
  pairs.forEach(p => {
    if (p.memberA) allMembersMap.set(p.memberA.id, p.memberA);
    if (p.memberB) allMembersMap.set(p.memberB.id, p.memberB);
  });
  const allMembers = Array.from(allMembersMap.values());

  // 選択されたメンバーが関与するペアのみをフィルタリング
  const filteredPairs = selectedMemberId === 'ALL' 
    ? pairs 
    : pairs.filter(p => p.memberA.id === selectedMemberId || p.memberB.id === selectedMemberId);

  // エニアグラム(1~9)からEngineType(T1~T9)へパースする関数
  const getEngineType = (enneagram?: string): EngineType | undefined => {
    if (!enneagram) return undefined;
    const match = enneagram.match(/^[1-9]$/);
    if (match) return `T${match[0]}` as EngineType;
    return undefined;
  };

  const getCrossData = (typeCode: string, enneagram?: string) => {
    const engine = getEngineType(enneagram);
    if (!engine) return null;
    return CROSS_CONTENT[`${typeCode}_${engine}`] || null;
  };

  const getMemberDisplayName = (member: TeamMember) => {
    const osData = OS_CONTENT[member.typeCode as OSTypeCode];
    const engineType = getEngineType(member.enneagram);
    const engineData = engineType ? ENGINE_CONTENT[engineType] : null;

    let osDisplay = member.typeCode;
    if (osData) {
      const match = osData.name.match(/(.+?)\s*\((.+?)\)/);
      if (match) {
        osDisplay = `${match[1]}（${member.typeCode} / ${match[2]}）`;
      } else {
        osDisplay = osData.name;
      }
    }

    if (engineData && member.enneagram) {
      const engineMatch = engineData.name.match(/(.+?)\s*\(/);
      const engineName = engineMatch ? engineMatch[1] : engineData.name;
      return `${osDisplay} × ${engineName}（T${member.enneagram}）`;
    }

    return osDisplay;
  };

  return (
    <div className="space-y-6">
      
      {/* 視点切り替えナビゲーション（30名対応のSelect UI） */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
              <Filter className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">視点を絞り込む</h3>
              <p className="text-xs text-slate-500 mt-0.5">特定のメンバーを中心とした関係性のみを抽出します</p>
            </div>
          </div>
          
          <div className="relative min-w-[260px]">
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              className="w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all cursor-pointer shadow-sm"
            >
              <option value="ALL">全体表示（全 {pairs.length} ペア）</option>
              <optgroup label="メンバー別 視点">
                {allMembers.map(member => (
                  <option key={member.id} value={member.id}>
                    👤 {member.name} 視点
                  </option>
                ))}
              </optgroup>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredPairs.map((pair, index) => {
          const rel = pair.relation;
          if (!rel) return null; // 未定義・パースエラーの場合はスキップ
          
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all flex flex-col h-full group">
              <div className="flex justify-between items-start mb-4">
                <div className="inline-flex flex-col items-center gap-1">
                  <span className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform">{rel.emoji}</span>
                  <div className="flex gap-0.5 mt-1">
                     {Array.from({ length: 5 }).map((_, i) => (
                       <Star 
                         key={i} 
                         className={`w-3.5 h-3.5 ${i < rel.stars ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200'}`} 
                       />
                     ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-block px-3 py-1 bg-teal-50 text-teal-700 font-bold text-xs rounded-full border border-teal-100 mb-1">
                    {rel.name}
                  </div>
                </div>
              </div>

              {/* メンバー個別取扱説明書エリア */}
              <div className="relative mb-5 mt-2">
                <div className="absolute left-1/2 top-8 -translate-x-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-sm border border-slate-100 flex items-center justify-center">
                  <span className="text-slate-300 font-black text-xs block leading-none w-3 h-3 text-center">×</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {[pair.memberA, pair.memberB].map((member, i) => {
                    const crossData = getCrossData(member.typeCode, member.enneagram);
                    return (
                      <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col relative h-full">
                        <div className="text-center mb-3">
                          <Link 
                            href={member.enneagram && teamToken
                              ? `/result?os=${member.typeCode}&engine=T${member.enneagram}&teamToken=${teamToken}` 
                              : `/types/${member.typeCode}`}
                            className="font-bold text-slate-800 text-sm line-clamp-1 hover:text-teal-600 transition-colors underline decoration-slate-200 hover:decoration-teal-400 underline-offset-2"
                          >
                            {member.name}
                          </Link>
                          <p className="text-[10px] text-slate-500 font-medium px-1.5 py-0.5 bg-white rounded mt-1 border border-slate-200 inline-block">
                            {getMemberDisplayName(member)}
                          </p>
                        </div>
                        
                        {crossData ? (
                          <div className="flex-1 flex flex-col">
                            <p className="text-[10px] font-bold text-teal-700 mb-1.5 leading-snug text-center border-b border-teal-100/50 pb-1.5 flex items-center justify-center gap-1">
                              <BookOpen className="w-3 h-3 text-teal-500" />
                              {crossData.title}
                            </p>
                            <p className="text-[10px] text-slate-600 leading-relaxed">
                              {crossData.description}
                            </p>
                          </div>
                        ) : (
                          <div className="flex-1 flex items-center justify-center pt-2 border-t border-slate-100">
                            <p className="text-[10px] text-slate-400 italic text-center">
                              エニアグラム未入力<br />(取扱説明書なし)
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 解説テキストエリア */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-2 leading-tight">{rel.summary}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {rel.workCompatibility.teamDynamics}
                  </p>
                </div>

                {/* この関係の強み */}
                {rel.strengths && rel.strengths.length > 0 && (
                  <div className="pt-3 border-t border-slate-100 mb-3">
                    <p className="text-xs font-semibold text-teal-700 mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block"></span>
                      この関係の強み
                    </p>
                    <ul className="space-y-1 pl-1">
                      {rel.strengths.map((s, si) => (
                        <li key={si} className="text-xs text-slate-600 leading-relaxed flex items-start gap-1.5">
                          <span className="text-teal-400 mt-0.5 text-[10px]">✓</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs font-semibold text-teal-700 mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block"></span>
                    組織での活かし方
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {rel.workCompatibility.roleAdvice}
                  </p>
                </div>

                {/* 摩擦ポイント */}
                {rel.workCompatibility.frictionPoint && (
                  <div className="pt-3 border-t border-slate-100 mt-3">
                    <p className="text-xs font-semibold text-amber-700 mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
                      気をつけたいポイント
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {rel.workCompatibility.frictionPoint}
                    </p>
                  </div>
                )}

                {/* 詳細ページへのリンク */}
                <div className="pt-4 mt-auto">
                  <Link 
                    href={`/types/${pair.memberA.typeCode}/compatibility/${pair.memberB.typeCode}`}
                    className="flex justify-center items-center gap-1.5 w-full py-2.5 bg-slate-50 hover:bg-teal-50 text-slate-600 hover:text-teal-700 text-xs font-bold rounded-xl transition-colors border border-slate-200 hover:border-teal-200"
                  >
                    このペアの相性詳細をより深く読む
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

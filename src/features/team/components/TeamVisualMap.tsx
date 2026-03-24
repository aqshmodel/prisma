'use client';

import { useMemo, useState } from 'react';
import { ReactFlow, Controls, Background, MarkerType } from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { TeamMember, TeamPair } from '../utils/pairs';

interface TeamVisualMapProps {
  members: TeamMember[];
  pairs: TeamPair[];
}

export function TeamVisualMap({ members, pairs }: TeamVisualMapProps) {
  const [filterType, setFilterType] = useState<'All' | 'Good' | 'Dynamic'>('Good');

  // 円周上にノードを配置するための計算
  const nodes: Node[] = useMemo(() => {
    const radius = Math.max(250, members.length * 35); // メンバーが多いほど半径を広げる
    const centerX = radius + 100;
    const centerY = radius + 100;

    return members.map((member, index) => {
      const angle = (index / members.length) * 2 * Math.PI - Math.PI / 2; // 12時の位置からスタート
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      return {
        id: member.id || String(index),
        position: { x, y },
        className: 'bg-white font-bold text-slate-800 shadow-lg border-2 border-teal-200 rounded-xl px-4 py-3 min-w-[120px] text-center',
        data: { 
          label: (
            <div>
              <div className="text-sm font-extrabold">{member.name}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">{member.typeCode}</div>
            </div>
          )
        },
      };
    });
  }, [members]);

  // ペアからエッジ（関係線）を生成
  const edges: Edge[] = useMemo(() => {
    return pairs
      .filter((pair) => {
        if (!pair.relation) return false;
        if (filterType === 'Good') {
          // 良い関係のみ（★4以上：双対、半双対、活性化など）
          return pair.relation.stars >= 4;
        }
        if (filterType === 'Dynamic') {
          // 変化や刺激の強い関係（活性化、恩恵、相克、超自我など）
          return ['Activity', 'Benefit', 'Contrary', 'SuperEgo'].includes(pair.relation.type);
        }
        return true; // All（全ペア）-> 人数が多いとスパゲッティ化するので注意
      })
      .map((pair) => {
        const isGood = pair.relation!.stars >= 4;
        const color = isGood ? '#2dd4bf' : '#94a3b8'; // teal-400 or slate-400

        return {
          id: `e-${pair.memberA.id}-${pair.memberB.id}`,
          source: pair.memberA.id || String(members.indexOf(pair.memberA)),
          target: pair.memberB.id || String(members.indexOf(pair.memberB)),
          label: pair.relation!.emoji + ' ' + pair.relation!.name,
          animated: pair.relation!.stars >= 4, // 良い関係はアニメーション
          style: { stroke: color, strokeWidth: isGood ? 3 : 1.5 },
          labelStyle: { fill: '#334155', fontWeight: 600, fontSize: 10 },
          labelBgStyle: { fill: 'rgba(255, 255, 255, 0.9)', padding: 4 },
          markerEnd: { type: MarkerType.ArrowClosed, color },
        };
      });
  }, [pairs, members, filterType]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        <button
          onClick={() => setFilterType('Good')}
          className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${filterType === 'Good' ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
        >
          最高・良好な関係のみ（★4以上）
        </button>
        <button
          onClick={() => setFilterType('Dynamic')}
          className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${filterType === 'Dynamic' ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
        >
          刺激・成長を促す関係
        </button>
        <button
          onClick={() => setFilterType('All')}
          className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${filterType === 'All' ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
        >
          全ペアを表示（複雑）
        </button>
      </div>
      
      <div className="w-full h-[600px] border-2 border-slate-100 rounded-3xl overflow-hidden bg-slate-50/50 relative shadow-inner">
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          fitView 
          minZoom={0.2}
          maxZoom={1.5}
        >
          <Background color="#cbd5e1" gap={24} />
          <Controls />
        </ReactFlow>
      </div>
      <p className="text-center text-sm text-slate-500 mt-2">※マウスホイールで拡大縮小、ドラッグでマップの移動が可能です。</p>
    </div>
  );
}

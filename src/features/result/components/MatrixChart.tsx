
import React from 'react';

import { OS_CONTENT } from '../data/content-os';
import type { OSTypeCode } from '../../../types/diagnosis';

interface MatrixChartProps {
    highlightCode: OSTypeCode;
}

// Map Tailwind colors to Hex (Reuse from RadarChart or duplicate)
const COLOR_MAP: Record<string, string> = {
    'sky-500': '#0ea5e9',
    'emerald-400': '#34d399',
    'orange-400': '#fb923c',
    'indigo-500': '#6366f1',
    'rose-500': '#f43f5e',
    'slate-600': '#475569',
    'red-600': '#dc2626',
    'violet-400': '#a78bfa',
    'amber-500': '#f59e0b',
    'blue-800': '#1e40af',
    'blue-600': '#2563eb',
    'teal-600': '#0d9488',
    'cyan-700': '#0e7490',
    'fuchsia-400': '#e879f9',
    'yellow-400': '#facc15',
    'gray-500': '#6b7280',
};

export const MatrixChart = React.memo<MatrixChartProps>(({ highlightCode }) => {
    const size = 300;
    const padding = 40;
    const plotSize = size - padding * 2;

    const data = Object.values(OS_CONTENT).map((os) => ({
        code: os.code,
        // Map 0-10 to plot coordinates
        // X: Analysis (Logic) -> Right
        // Y: Innovation (Intuition) -> Top
        x: (os.params.analysis / 10) * plotSize + padding,
        y: size - ((os.params.innovation / 10) * plotSize + padding), // Flip Y because SVG 0 is top
        color: COLOR_MAP[os.color] || '#cbd5e1',
        isTarget: os.code === highlightCode
    }));

    return (
        <div className="relative w-full max-w-[350px] aspect-square mx-auto flex items-center justify-center bg-white rounded-xl">
            {/* Labels */}
            <div className="absolute top-2 text-xs font-bold text-slate-400">Innovation (Vision)</div>
            <div className="absolute bottom-2 text-xs font-bold text-slate-400">Tradition (Reality)</div>
            <div className="absolute left-2 top-1/2 -rotate-90 origin-center text-xs font-bold text-slate-400">Empathy</div>
            <div className="absolute right-2 top-1/2 rotate-90 origin-center text-xs font-bold text-slate-400">Logic</div>

            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
                {/* Grid Lines */}
                <line x1={padding} y1={size / 2} x2={size - padding} y2={size / 2} stroke="#e2e8f0" strokeWidth="1" />
                <line x1={size / 2} y1={padding} x2={size / 2} y2={size - padding} stroke="#e2e8f0" strokeWidth="1" />

                {/* Quadrant Backgrounds (Optional) - subtle colored zones could go here */}

                {/* Points */}
                {data.map((p) => (
                    <g key={p.code}>
                        <circle
                            cx={p.x}
                            cy={p.y}
                            r={p.isTarget ? 8 : 4}
                            fill={p.isTarget ? p.color : '#cbd5e1'}
                            stroke={p.isTarget ? 'white' : 'none'}
                            strokeWidth={2}
                        />
                        {p.isTarget && (
                            <>
                                <circle
                                    cx={p.x}
                                    cy={p.y}
                                    r={8}
                                    fill="none"
                                    stroke={p.color}
                                    strokeWidth={2}
                                />
                                <text
                                    x={p.x}
                                    y={p.y - 12}
                                    textAnchor="middle"
                                    fontSize="12"
                                    fontWeight="bold"
                                    fill={p.color}
                                >
                                    You ({p.code})
                                </text>
                            </>
                        )}
                    </g>
                ))}
            </svg>
        </div>
    );
});

MatrixChart.displayName = 'MatrixChart';

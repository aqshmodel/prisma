
import React from 'react';


interface RadarChartProps {
    data: {
        analysis: number;
        innovation: number;
        empathy: number;
        execution: number;
        adaptability: number;
    };
    color: string; // Tailwind class name (e.g., 'sky-500')
}

// Map Tailwind colors to Hex for SVG usage
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

const LABELS = [
    { key: 'analysis', label: '論理・分析' },
    { key: 'innovation', label: '革新・創造' },
    { key: 'empathy', label: '共感・協調' },
    { key: 'execution', label: '実行・実務' },
    { key: 'adaptability', label: '柔軟・適応' },
];

export const RadarChart = React.memo<RadarChartProps>(({ data, color }) => {
    const hexColor = COLOR_MAP[color] || '#6366f1'; // Default to indigo if not found

    // Config
    const size = 300;
    const center = size / 2;
    const radius = 100;
    const maxVal = 10;

    // Helper to calculate points
    const getPoint = (value: number, index: number, total: number) => {
        const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
        const r = (value / maxVal) * radius;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return { x, y };
    };

    // Calculate polygon points
    const points = LABELS.map((item, i) => {
        // @ts-ignore
        const val = data[item.key] || 0;
        const { x, y } = getPoint(val, i, LABELS.length);
        return `${x},${y}`;
    }).join(' ');

    // Calculate label positions (slightly outside)
    const labelPoints = LABELS.map((item, i) => {
        const angle = (Math.PI * 2 * i) / LABELS.length - Math.PI / 2;
        const r = radius + 25; // Offset for text
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return { x, y, label: item.label, align: (x > center ? 'start' : x < center ? 'end' : 'middle') as "start" | "end" | "middle" | "inherit" | undefined };
    });

    // Background polygons (grid)
    const levels = [2, 4, 6, 8, 10];

    return (
        <div className="relative flex justify-center items-center w-full max-w-[350px] aspect-square mx-auto animate-scale-in">
            {/* Expanded viewBox to prevent label clipping (-50 to 350 includes 50px padding on all sides) */}
            <svg width="100%" height="100%" viewBox="-50 -50 400 400" className="overflow-visible">
                {/* Grid Levels */}
                {levels.map((level, idx) => (
                    <polygon
                        key={level}
                        points={LABELS.map((_, i) => {
                            const { x, y } = getPoint(level, i, LABELS.length);
                            return `${x},${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        className="opacity-0 animate-fade-in-up"
                        style={{ animationDelay: `${idx * 100}ms` }}
                    />
                ))}

                {/* Axis Lines */}
                {LABELS.map((_, i) => {
                    const { x, y } = getPoint(10, i, LABELS.length);
                    return (
                        <line
                            key={i}
                            x1={center}
                            y1={center}
                            x2={x}
                            y2={y}
                            stroke="#e2e8f0"
                            strokeWidth="1"
                            className="opacity-0 animate-fade-in-up"
                            style={{ animationDelay: '500ms' }}
                        />
                    );
                })}

                {/* Data Polygon */}
                <polygon
                    points={points}
                    fill={hexColor}
                    fillOpacity="0.2"
                    stroke={hexColor}
                    strokeWidth="3"
                    className="drop-shadow-md origin-center animate-scale-in"
                    style={{ animationDuration: '1s' }}
                />

                {/* Data Points */}
                {LABELS.map((item, i) => {
                    // @ts-ignore
                    const val = data[item.key] || 0;
                    const { x, y } = getPoint(val, i, LABELS.length);
                    return (
                        <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="5"
                            fill="white"
                            stroke={hexColor}
                            strokeWidth="2.5"
                            className="opacity-0 animate-scale-in"
                            style={{ animationDelay: `${800 + i * 100}ms` }}
                        />
                    );
                })}

                {/* Labels */}
                {labelPoints.map((p, i) => (
                    <text
                        key={i}
                        x={p.x}
                        y={p.y}
                        textAnchor={p.align}
                        dominantBaseline="middle"
                        fontSize="13"
                        fontWeight="600"
                        className="fill-slate-600 opacity-0 animate-fade-in-up"
                        style={{ animationDelay: `${1000 + i * 50}ms` }}
                    >
                        {p.label}
                    </text>
                ))}
            </svg>
        </div>
    );
});

RadarChart.displayName = 'RadarChart';

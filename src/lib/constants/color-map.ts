/**
 * Tailwind CSSクラス名 → HEXカラー値 の変換マップ
 *
 * ResultPage、TypeDetailPage、OGP画像生成等で、
 * データ層で定義されたTailwindカラー名をcanvasやインラインstyleの
 * HEX値に変換するために使用する。
 *
 * 新しいテーマカラーを追加した場合はここに追記すること。
 */
export const COLOR_MAP: Record<string, string> = {
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
    'teal-600': '#0ababa',
    'cyan-700': '#078282',
    'prisma-500': '#0ABAB5',
    'fuchsia-400': '#e879f9',
    'yellow-400': '#facc15',
    'gray-500': '#6b7280',
};

/**
 * Tailwindカラー名からHEX値を取得する。
 * マップに存在しない場合はフォールバック色を返す。
 */
export const resolveColor = (tailwindColor: string, fallback = '#6366f1'): string =>
    COLOR_MAP[tailwindColor] || fallback;

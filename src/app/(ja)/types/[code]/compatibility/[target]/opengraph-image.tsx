import { ImageResponse } from 'next/og';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { getCompatibility } from '@/lib/constants/compatibility';
import type { OSTypeCode } from '@/types/diagnosis';

export const runtime = 'nodejs';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const dynamic = 'force-static';
export { generateStaticParams } from './page';

async function fetchWithRetry(url: string, options: any, retries = 3, delay = 1000): Promise<Response> {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, options);
            if (res.ok) return res;
            if (res.status === 429) {
                // Rate limited, wait longer
                await new Promise(resolve => setTimeout(resolve, delay * 2));
                continue;
            }
            throw new Error(`HTTP error ${res.status}`);
        } catch (e) {
            if (i === retries - 1) throw e;
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        }
    }
    throw new Error('fetchWithRetry failed');
}

async function loadGoogleFont(text: string) {
    const userAgent = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1';
    const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&text=${encodeURIComponent(text)}`;

    try {
        const css = await fetchWithRetry(url, { headers: { 'User-Agent': userAgent } }).then(res => res.text());
        const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

        if (resource) {
            return await fetchWithRetry(resource[1], {}).then(res => res.arrayBuffer());
        }
    } catch (e) {
        console.error('Failed to load font:', e);
    }
    return null;
}

export default async function Image({ params }: { params: Promise<{ code: string; target: string }> }) {
    const { code, target } = await params;
    const sourceData = OS_CONTENT[code as keyof typeof OS_CONTENT];
    const targetData = OS_CONTENT[target as keyof typeof OS_CONTENT];

    if (!sourceData || !targetData) {
        return new Response('Not found', { status: 404 });
    }

    const relation = getCompatibility(code as OSTypeCode, target as OSTypeCode);
    const title = `${sourceData.name} × ${targetData.name}`;
    const subtitle = `【${relation.name}】${relation.emoji}`;
    const stars = '★'.repeat(relation.stars) + '☆'.repeat(5 - relation.stars);

    const fontText = Array.from(new Set((title + subtitle + stars + 'Aqsh Prisma相性診断').split(''))).join('');
    const fontData = await loadGoogleFont(fontText);

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f8fafc',
                    backgroundImage: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #fdf2f8 100%)',
                    fontFamily: '"Noto Sans JP"',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        top: 40,
                        left: 40,
                        alignItems: 'center',
                    }}
                >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                    <span style={{ fontSize: 26, fontWeight: 700, color: '#0f172a', marginLeft: 12 }}>
                        Aqsh Prisma
                    </span>
                </div>

                <div
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        top: 44,
                        right: 40,
                        fontSize: 18,
                        fontWeight: 700,
                        color: '#94a3b8',
                        letterSpacing: '0.1em',
                    }}
                >
                    相性診断
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 80px',
                        textAlign: 'center',
                    }}
                >
                    <h1 style={{ fontSize: 56, fontWeight: 700, color: '#0f172a', lineHeight: 1.2, marginBottom: 16 }}>
                        {title}
                    </h1>
                    <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0284c7', marginBottom: 12 }}>
                        {subtitle}
                    </h2>
                    <p style={{ fontSize: 32, color: '#f59e0b', letterSpacing: '0.15em' }}>
                        {stars}
                    </p>
                </div>

                <div
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        bottom: 40,
                        right: 40,
                        fontSize: 22,
                        fontWeight: 700,
                        color: '#64748b',
                    }}
                >
                    prisma.aqsh.co.jp
                </div>
            </div>
        ),
        {
            ...size,
            fonts: fontData ? [
                {
                    name: 'Noto Sans JP',
                    data: fontData,
                    style: 'normal' as const,
                    weight: 700 as const,
                },
            ] : undefined,
        }
    );
}

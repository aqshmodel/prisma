import { ImageResponse } from 'next/og';
import { OS_CONTENT } from '@/features/result/data/content-os';

export const runtime = 'nodejs';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const dynamic = 'force-static';

export function generateStaticParams() {
    return Object.keys(OS_CONTENT).map((code) => ({ code }));
}

async function loadGoogleFont(text: string) {
    const userAgent = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1';
    const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&text=${encodeURIComponent(text)}`;

    try {
        const css = await fetch(url, { headers: { 'User-Agent': userAgent } }).then(res => res.text());
        const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

        if (resource) {
            return await fetch(resource[1]).then(res => res.arrayBuffer());
        }
    } catch (e) {
        console.error('Failed to load font:', e);
    }
    return null;
}

export default async function Image({ params }: { params: Promise<{ code: string }> }) {
    const { code } = await params;
    const data = OS_CONTENT[code as keyof typeof OS_CONTENT];

    if (!data) {
        return new Response('Not found', { status: 404 });
    }

    const typeName = data.name.split('(')[0].trim();
    const typeCode = data.name.match(/\((.+)\)/)?.[1] || code;
    const catchphrase = data.catchphrase;
    const shareText = `私のタイプは「${typeName}」でした！`;

    const fontText = Array.from(new Set(
        (typeName + typeCode + catchphrase + shareText + 'Aqsh Prisma' + 'prisma.aqsh.co.jp' + code).split('')
    )).join('');
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
                    background: 'linear-gradient(135deg, #f0fdfa 0%, #e0f7fa 30%, #e8f5e9 60%, #f1f8e9 100%)',
                    fontFamily: '"Noto Sans JP"',
                    position: 'relative',
                }}
            >
                {/* Top-left: Logo */}
                <div
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        top: 36,
                        left: 44,
                        alignItems: 'center',
                    }}
                >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                    <span style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', marginLeft: 12 }}>
                        Aqsh Prisma
                    </span>
                </div>

                {/* Top-right: Share badge */}
                <div
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        top: 36,
                        right: 44,
                        padding: '6px 16px',
                        background: 'rgba(13, 148, 136, 0.1)',
                        border: '1px solid rgba(13, 148, 136, 0.3)',
                        borderRadius: 20,
                        fontSize: 16,
                        fontWeight: 700,
                        color: '#0d9488',
                    }}
                >
                    診断結果をシェア
                </div>

                {/* Center: Result */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 80px',
                        textAlign: 'center',
                        marginTop: 20,
                    }}
                >
                    <p style={{ fontSize: 22, fontWeight: 400, color: '#64748b', marginBottom: 8, letterSpacing: '0.1em' }}>
                        {shareText}
                    </p>
                    <h1 style={{ fontSize: 72, fontWeight: 700, color: '#0f172a', lineHeight: 1.1, marginBottom: 8 }}>
                        {typeName}
                    </h1>
                    <p style={{ fontSize: 20, fontWeight: 400, color: '#94a3b8', marginBottom: 24, letterSpacing: '0.15em' }}>
                        {typeCode} / {code}
                    </p>
                    <p style={{ fontSize: 24, fontWeight: 700, color: '#0d9488', lineHeight: 1.5, maxWidth: 800 }}>
                        {catchphrase}
                    </p>
                </div>

                {/* Bottom-right: URL */}
                <div
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        bottom: 36,
                        right: 44,
                        fontSize: 20,
                        fontWeight: 700,
                        color: '#94a3b8',
                    }}
                >
                    prisma.aqsh.co.jp
                </div>

                {/* Bottom-left: CTA */}
                <div
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        bottom: 36,
                        left: 44,
                        fontSize: 18,
                        fontWeight: 400,
                        color: '#64748b',
                    }}
                >
                    あなたのタイプも無料で診断 →
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
                    weight: 700,
                },
            ] : undefined,
        }
    );
}

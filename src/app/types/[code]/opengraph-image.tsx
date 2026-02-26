import { ImageResponse } from 'next/og';
import { OS_CONTENT } from '../../../features/result/data/content-os';

export const runtime = 'nodejs';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const dynamic = 'force-static';
export { generateStaticParams } from './page';

async function loadGoogleFont(text: string) {
    const userAgent = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1';
    const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&text=${encodeURIComponent(text)}`;

    try {
        const css = await fetch(url, { headers: { 'User-Agent': userAgent } }).then(res => res.text());
        const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

        if (resource) {
            const fontUrl = resource[1];
            return await fetch(fontUrl).then(res => res.arrayBuffer());
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

    const title = data.name;
    const subtitle = data.catchphrase;
    // 重複を弾いておく（フォントリクエストのサイズ削減）
    const fontText = Array.from(new Set((title + subtitle + 'Aqsh Prisma').split(''))).join('');
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
                    backgroundImage: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
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
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                    <span style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', marginLeft: 16 }}>
                        Aqsh Prisma
                    </span>
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
                    <h2 style={{ fontSize: 40, fontWeight: 700, color: '#0284c7', marginBottom: 20 }}>
                        {subtitle}
                    </h2>
                    <h1 style={{ fontSize: 64, fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                        {title}
                    </h1>
                </div>

                <div
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        bottom: 40,
                        right: 40,
                        alignItems: 'center',
                        fontSize: 24,
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
                    style: 'normal',
                    weight: 700,
                },
            ] : undefined,
        }
    );
}

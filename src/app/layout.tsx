import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Layout } from '../components/layout/Layout';
import { GoogleAnalytics } from '../components/GoogleAnalytics';
import { SITE_CONFIG } from '@/lib/constants/site-config';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

/**
 * プロジェクト全体のフォールバックとなるデフォルトメタデータ
 * 各ページで上書き（override）されない項目には、ここに定義された内容が反映されます。
 */
export const metadata: Metadata = {
    metadataBase: new URL(SITE_CONFIG.baseUrl),
    title: 'Aqsh Prisma | ソシオニクス×エニアグラム 無料性格診断',
    description: 'ソシオニクス16タイプとエニアグラム9タイプを組み合わせた無料性格診断。あなたの思考のクセと無意識の欲求を言語化し、人間関係・恋愛・キャリアの悩みに具体的な手がかりを提供します。',
    openGraph: {
        title: 'Aqsh Prisma | ソシオニクス×エニアグラム 無料性格診断',
        description: 'ソシオニクス16タイプとエニアグラム9タイプを組み合わせた無料性格診断。あなたの思考のクセと無意識の欲求を言語化し、人間関係・恋愛・キャリアの悩みに具体的な手がかりを提供します。',
        url: SITE_CONFIG.baseUrl + '/',
        siteName: SITE_CONFIG.name,
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'ja_JP',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Aqsh Prisma | ソシオニクス×エニアグラム 無料性格診断',
        description: 'ソシオニクス16タイプとエニアグラム9タイプを組み合わせた無料性格診断。あなたの思考のクセと無意識の欲求を言語化し、人間関係・恋愛・キャリアの悩みに具体的な手がかりを提供します。',
        images: ['/og-image.png'],
    },
    icons: {
        icon: '/favicon.png',
        shortcut: '/favicon.png',
        apple: '/favicon.png',
    },
};

/**
 * 全ページ共通のルートレイアウト (Server Component)
 * JSON-LD（組織情報等）や共通のナビゲーション枠、フォントの設定を行います。
 */
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    /**
     * WebSite および Organization の情報構造化データ
     * 検索エンジンがこのサイトを提供する運営元情報を正確にインデックスできるようにします。
     */
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.baseUrl + '/',
        logo: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.logo}`,
        sameAs: [
            'https://aqsh.co.jp/',
        ],
    };

    return (
        <html lang="ja" className={inter.variable} suppressHydrationWarning={true}>
            <head>
                {/* Google Fonts CDN: Noto Serif JP (自前ホスティングの58KiB CSS削減のため) */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="font-sans antialiased text-slate-800 bg-prisma-50 selection:bg-prisma-200 selection:text-prisma-900" suppressHydrationWarning={true}>
                <GoogleAnalytics />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {/* Noise Texture Overlay */}
                <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: 'url(/noise.svg)', willChange: 'transform' }}></div>

                <div className="relative z-10">
                    <Layout>{children}</Layout>
                </div>
            </body>
        </html>
    );
}

import type { Metadata } from 'next';
import { Inter, Noto_Serif_JP } from 'next/font/google';
import './globals.css';
import { Layout } from '../components/layout/Layout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoSerif = Noto_Serif_JP({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-serif'
});

/**
 * プロジェクト全体のフォールバックとなるデフォルトメタデータ
 * 各ページで上書き（override）されない項目には、ここに定義された内容が反映されます。
 */
export const metadata: Metadata = {
    metadataBase: new URL('https://prisma.aqsh.co.jp'),
    title: 'Aqsh Prisma | 無料16タイプ診断 ソシオニクス × ビジネス心理学',
    description: 'ソシオニクスとビジネス心理学に基づき、あなたのリーダーシップ特性と潜在リスクを可視化する次世代の組織診断ツール。',
    openGraph: {
        title: 'Aqsh Prisma | 無料16タイプ診断 ソシオニクス × ビジネス心理学',
        description: 'ソシオニクスとビジネス心理学に基づき、あなたのリーダーシップ特性と潜在リスクを可視化する次世代の組織診断ツール。',
        url: 'https://prisma.aqsh.co.jp/',
        siteName: 'Aqsh Prisma',
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
        title: 'Aqsh Prisma | 無料16タイプ診断 ソシオニクス × ビジネス心理学',
        description: 'ソシオニクスとビジネス心理学に基づき、あなたのリーダーシップ特性と潜在リスクを可視化する次世代の組織診断ツール。',
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
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Aqsh Prisma',
            url: 'https://prisma.aqsh.co.jp/',
            alternateName: ['Aqsh Prisma', 'Aqsh プリスマ'],
            description: 'ソシオニクスとビジネス心理学に基づき、あなたのリーダーシップ特性と潜在リスクを可視化する次世代の組織診断ツール。',
        },
        {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Aqsh Prisma',
            url: 'https://prisma.aqsh.co.jp/',
            logo: 'https://prisma.aqsh.co.jp/logo.png',
            sameAs: [
                'https://aqsh.co.jp/',
            ],
        }
    ];

    return (
        <html lang="ja" className={`${inter.variable} ${notoSerif.variable}`}>
            <body className="font-sans antialiased text-slate-800 bg-prisma-50 selection:bg-prisma-200 selection:text-prisma-900" suppressHydrationWarning={true}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {/* Noise Texture Overlay */}
                <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: 'url(/noise.svg)' }}></div>

                <div className="relative z-10">
                    <Layout>{children}</Layout>
                </div>
            </body>
        </html>
    );
}

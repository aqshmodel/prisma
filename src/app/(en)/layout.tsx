import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { EnLayout } from '@/components/layout/EnLayout';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { SITE_CONFIG } from '@/lib/constants/site-config';
import { LocaleProvider } from '@/lib/i18n';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

/**
 * 英語版のデフォルトメタデータ
 */
export const metadata: Metadata = {
    metadataBase: new URL(SITE_CONFIG.baseUrl),
    title: 'Free Personality Diagnostic | Aqsh Prisma',
    description: 'A free personality diagnostic combining 16 Socionics types and 9 Enneagram types. Discover your thinking patterns and unconscious motivations.',
    openGraph: {
        title: 'Free Personality Diagnostic | Aqsh Prisma',
        description: 'A free personality diagnostic combining 16 Socionics types and 9 Enneagram types.',
        url: SITE_CONFIG.baseUrl + '/en/',
        siteName: SITE_CONFIG.name,
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Personality Diagnostic | Aqsh Prisma',
        description: 'A free personality diagnostic combining 16 Socionics types and 9 Enneagram types.',
        images: ['/og-image.png'],
    },
    icons: {
        icon: '/favicon.png',
        shortcut: '/favicon.png',
        apple: '/favicon.png',
    },
};

/**
 * 英語版ルートレイアウト (Server Component)
 * Route Group (en) の全ページを包む。
 * - <html lang="en"> により、ブラウザとSEOが英語ページと認識する
 * - EnLayout は記事リンクを非表示にした英語版ヘッダー・フッター
 */
export default function EnRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
        <html lang="en" className={inter.variable} suppressHydrationWarning={true}>
            <head>
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
                <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: 'url(/noise.svg)', willChange: 'transform' }}></div>

                <div className="relative z-10">
                    <LocaleProvider locale="en">
                        <EnLayout>{children}</EnLayout>
                    </LocaleProvider>
                </div>
            </body>
        </html>
    );
}

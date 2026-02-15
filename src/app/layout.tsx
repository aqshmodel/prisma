import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Layout } from '../components/layout/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    metadataBase: new URL('https://prisma.aqsh.co.jp'),
    title: 'Aqsh Prisma | 組織シナジー最大化ツール',
    description: 'ソシオニクスとビジネス心理学に基づき、あなたのリーダーシップ特性と潜在リスクを可視化する次世代の組織診断ツール。',
    openGraph: {
        title: 'Aqsh Prisma | 組織シナジー最大化ツール',
        description: 'あなたのリーダーシップ特性と潜在リスクを可視化する次世代の組織診断ツール。',
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
        title: 'Aqsh Prisma | 組織シナジー最大化ツール',
        description: 'ソシオニクスとビジネス心理学に基づき、あなたのリーダーシップ特性と潜在リスクを可視化する次世代の組織診断ツール。',
        images: ['/og-image.png'],
    },
    icons: {
        icon: '/favicon.png',
        shortcut: '/favicon.png',
        apple: '/favicon.png',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja">
            <body className={inter.className} suppressHydrationWarning={true}>
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}

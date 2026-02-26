import type { MetadataRoute } from 'next';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { getAllArticles } from '@/features/articles/utils/mdx';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://prisma.aqsh.co.jp';
    const currentDate = new Date();

    // Static Routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/diagnosis`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/articles`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    // Dynamic Routes (16 Types)
    const typeRoutes: MetadataRoute.Sitemap = Object.keys(OS_CONTENT).map((code) => ({
        url: `${baseUrl}/types/${code}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // Dynamic Routes (Articles)
    const allArticles = getAllArticles();
    const articleRoutes: MetadataRoute.Sitemap = allArticles.map((article) => ({
        url: `${baseUrl}/articles/${article.slug}`,
        lastModified: new Date(article.date), // MDXの実際の更新日を使用（SEOベストプラクティス）
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [...staticRoutes, ...typeRoutes, ...articleRoutes];
}

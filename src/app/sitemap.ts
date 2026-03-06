import type { MetadataRoute } from 'next';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { getAllArticles } from '@/features/articles/utils/mdx';
import { SITE_CONFIG } from '@/lib/constants/site-config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_CONFIG.baseUrl;
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
        {
            url: `${baseUrl}/compatibility`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about/socionics`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about/enneagram`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about/methodology`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about/editorial-policy`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];

    // Dynamic Routes (16 Types)
    const typeRoutes: MetadataRoute.Sitemap = Object.keys(OS_CONTENT).map((code) => ({
        url: `${baseUrl}/types/${code}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // Dynamic Routes (Compatibility: 16×15=240 pages)
    const typeCodes = Object.keys(OS_CONTENT);
    const compatibilityRoutes: MetadataRoute.Sitemap = typeCodes.flatMap((code) =>
        typeCodes
            .filter((target) => target !== code)
            .map((target) => ({
                url: `${baseUrl}/types/${code}/compatibility/${target}`,
                lastModified: currentDate,
                changeFrequency: 'monthly' as const,
                priority: 0.6,
            }))
    );

    // Dynamic Routes (Articles)
    const allArticles = getAllArticles();
    const articleRoutes: MetadataRoute.Sitemap = allArticles.map((article) => ({
        url: `${baseUrl}/articles/${article.slug}`,
        lastModified: new Date(article.updatedAt || article.date), // MDXの更新日（なければ投稿日）を使用（SEOベストプラクティス）
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [...staticRoutes, ...typeRoutes, ...compatibilityRoutes, ...articleRoutes];
}

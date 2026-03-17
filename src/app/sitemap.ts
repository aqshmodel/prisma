import type { MetadataRoute } from 'next';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { getAllArticles } from '@/features/articles/utils/mdx';
import { buildUrl } from '@/lib/constants/site-config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date();

    // Static Routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: buildUrl('/'),
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: buildUrl('/diagnosis'),
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: buildUrl('/articles'),
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: buildUrl('/compatibility'),
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: buildUrl('/about/socionics'),
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: buildUrl('/about/enneagram'),
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: buildUrl('/about/methodology'),
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: buildUrl('/about/editorial-policy'),
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];

    // Dynamic Routes (16 Types)
    const typeRoutes: MetadataRoute.Sitemap = Object.keys(OS_CONTENT).map((code) => ({
        url: buildUrl(`/types/${code}`),
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
                url: buildUrl(`/types/${code}/compatibility/${target}`),
                lastModified: currentDate,
                changeFrequency: 'monthly' as const,
                priority: 0.6,
            }))
    );

    // Dynamic Routes (Articles)
    const allArticles = getAllArticles();
    const articleRoutes: MetadataRoute.Sitemap = allArticles.map((article) => ({
        url: buildUrl(`/articles/${article.slug}`),
        lastModified: new Date(article.updatedAt || article.date), // MDXの更新日（なければ投稿日）を使用（SEOベストプラクティス）
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [...staticRoutes, ...typeRoutes, ...compatibilityRoutes, ...articleRoutes];
}


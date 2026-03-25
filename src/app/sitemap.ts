import type { MetadataRoute } from 'next';
import { OS_CONTENT } from '@/features/result/data/content-os';
import { getAllArticles } from '@/features/articles/utils/mdx';
import { getGlossarySlugs } from '@/features/glossary/utils/glossary';
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
        {
            url: buildUrl('/glossary'),
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
    ];

    // Dynamic Routes (16 Types)
    const typeRoutes: MetadataRoute.Sitemap = Object.keys(OS_CONTENT).map((code) => ({
        url: buildUrl(`/types/${code}`),
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // Dynamic Routes (Type Articles: 16 pages)
    const typeArticleRoutes: MetadataRoute.Sitemap = Object.keys(OS_CONTENT).map((code) => ({
        url: buildUrl(`/types/${code}/articles`),
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.6,
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
        lastModified: new Date(article.updatedAt || article.date),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // Dynamic Routes (Glossary)
    const glossarySlugs = getGlossarySlugs();
    const glossaryRoutes: MetadataRoute.Sitemap = glossarySlugs.map((slug) => ({
        url: buildUrl(`/glossary/${slug}`),
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.5,
    }));

    // 動的ルート (シェア結果: 16ページ)
    const shareResultRoutes: MetadataRoute.Sitemap = Object.keys(OS_CONTENT).map((code) => ({
        url: buildUrl(`/result/share/${code}`),
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.3,
    }));

    // --- 英語版 (English Routes) ---

    // 英語版 静的ルート
    const enStaticRoutes: MetadataRoute.Sitemap = [
        { url: buildUrl('/en'), lastModified: currentDate, changeFrequency: 'weekly', priority: 1 },
        { url: buildUrl('/en/diagnosis'), lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
        { url: buildUrl('/en/result'), lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
        { url: buildUrl('/en/compatibility'), lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
        { url: buildUrl('/en/about/socionics'), lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
        { url: buildUrl('/en/about/enneagram'), lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
        { url: buildUrl('/en/about/methodology'), lastModified: currentDate, changeFrequency: 'monthly', priority: 0.6 },
        { url: buildUrl('/en/privacy'), lastModified: currentDate, changeFrequency: 'monthly', priority: 0.3 },
        { url: buildUrl('/en/terms'), lastModified: currentDate, changeFrequency: 'monthly', priority: 0.3 },
    ];

    // 英語版 動的ルート (16 types)
    const enTypeRoutes: MetadataRoute.Sitemap = typeCodes.map((code) => ({
        url: buildUrl(`/en/types/${code}`),
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // 英語版 動的ルート (Compatibility: 16×15=240 pages)
    const enCompatibilityRoutes: MetadataRoute.Sitemap = typeCodes.flatMap((code) =>
        typeCodes
            .filter((target) => target !== code)
            .map((target) => ({
                url: buildUrl(`/en/types/${code}/compatibility/${target}`),
                lastModified: currentDate,
                changeFrequency: 'monthly' as const,
                priority: 0.6,
            }))
    );

    return [
        ...staticRoutes,
        ...typeRoutes,
        ...typeArticleRoutes,
        ...compatibilityRoutes,
        ...articleRoutes,
        ...glossaryRoutes,
        ...shareResultRoutes,
        // English Routes
        ...enStaticRoutes,
        ...enTypeRoutes,
        ...enCompatibilityRoutes,
    ];
}


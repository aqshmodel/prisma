import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants/site-config';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/', '/admin/'],
        },
        sitemap: `${SITE_CONFIG.baseUrl}/sitemap.xml`,
    };
}

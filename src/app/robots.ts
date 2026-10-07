import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Route handlers proxy GitHub and Spotify. There is nothing there to index,
      // and a crawler walking them only spends the upstream rate limits.
      disallow: '/api/'
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url
  };
}

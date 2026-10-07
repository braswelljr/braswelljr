import type { MetadataRoute } from 'next';
import { getPublishedPosts } from 'lib/source';
import { siteConfig } from '@/config/site';

const STATIC_ROUTES = ['', '/about', '/projects', '/listen-with-me', '/blog'];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    lastModified: page.data.lastModified ?? new Date(page.data.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }));

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${siteConfig.url}${route}`,
      changeFrequency: 'weekly' as const,
      priority: route ? 0.8 : 1
    })),
    ...posts
  ];
}

import { loader, type InferPageType } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { blog as blogPosts } from '@content-source/server';

export const blog = loader(blogPosts.toFumadocsSource(), {
  baseUrl: '/blog',
  plugins: [lucideIconsPlugin()]
});

/**
 * Posts a visitor should be able to find: listed, in the sitemap, in the feed.
 *
 * A post with `published: false` stays reachable by its URL so a draft can be
 * shared for review, but it is only listed while developing.
 */
export function getPublishedPosts() {
  const pages = blog.getPages();
  if (process.env.NODE_ENV !== 'production') return pages;

  return pages.filter((page) => page.data.published !== false);
}

export async function getLLMText(page: InferPageType<typeof blog>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title}

${processed}`;
}

export function getPageImage(page: InferPageType<typeof blog>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/blog/${segments.join('/')}`
  };
}

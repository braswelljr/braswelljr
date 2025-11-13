import { loader, type InferPageType } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { blog as Posts } from 'content/generated';

export const blog = loader({
  baseUrl: '/blog',
  source: Posts.toFumadocsSource(),
  plugins: [lucideIconsPlugin()]
});

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

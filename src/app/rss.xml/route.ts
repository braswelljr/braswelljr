import { compareDesc } from 'date-fns';
import { getPublishedPosts } from 'lib/source';
import { siteConfig } from '@/config/site';

export const revalidate = false;

/** The five characters XML reserves, so a title with an ampersand cannot break
 *  the document for every reader. */
function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function GET() {
  const posts = getPublishedPosts().sort((a, b) =>
    compareDesc(new Date(a.data.date), new Date(b.data.date))
  );

  const items = posts
    .map((page) => {
      const url = `${siteConfig.url}${page.url}`;
      const categories = (page.data.tags ?? []).map(
        (tag) => `      <category>${escapeXml(tag)}</category>`
      );

      return [
        '    <item>',
        `      <title>${escapeXml(page.data.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(page.data.date).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(page.data.description ?? '')}</description>`,
        ...categories,
        '    </item>'
      ].join('\n');
    })
    .join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}/blog</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en</language>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(feed, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
  });
}

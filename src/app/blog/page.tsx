import { compareAsc } from 'date-fns';
import readingTime from 'reading-time';
import { blog } from 'lib/source';
import { BlogTimeline } from './_components/blog-timeline';

export default async function Page() {
  const pages = blog.getPages();

  const sorted = pages.sort((a, b) => compareAsc(new Date(b.data.date), new Date(a.data.date)));

  const posts = await Promise.all(
    sorted.map(async (d) => {
      const text = await d.data.getText('processed');
      const time = readingTime(text).text;

      return {
        title: d.data.title,
        description: d.data.description ?? '',
        date: new Date(d.data.date).toISOString(),
        tags: d.data.tags ?? [],
        slug: d.url,
        published: d.data.published ?? true,
        readingTime: time
      };
    })
  );

  return (
    <div className="px-4 py-10 pt-[calc(var(--fd-nav-height)+10px)]">
      <BlogTimeline posts={posts} />
    </div>
  );
}

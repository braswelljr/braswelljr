import { type Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGithubLastEdit } from 'fumadocs-core/content/github';
import { Callout } from 'fumadocs-ui/components/callout';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsPage } from 'fumadocs-ui/page';
import { FaGithub } from 'react-icons/fa6';
import { HiArrowLeft } from 'react-icons/hi';
import readingTime from 'reading-time';
import { blog, getPageImage } from 'lib/source';
import { getMDXComponents } from '@/components/mdx-components';
import { ScrollToTopWithBlog } from '@/components/scroll-top';
import { BlogPostContent } from '../_components/blog-post-content';

export default async function Page(props: PageProps<'/blog/[...slug]'>) {
  const params = await props.params;
  const page = blog.getPage(params.slug);
  if (!page) notFound();

  const text = await page.data.getText('processed');
  const MDX = page.data.body;

  const post = {
    ...page.data,
    path: page.path,
    slug: page.url,
    readingTime: readingTime(String(text)).text,
    date: new Date(page.data.date).toISOString()
  };

  const time = await getGithubLastEdit({
    owner: 'braswelljr',
    repo: 'braswelljr',
    path: `content/blog/${post.path}`
  });

  const tocOptions = {
    style: 'clerk' as const,
    enabled: true,
    header: (
      <div className="flex flex-col gap-1">
        <Link
          href="/blog"
          className="link-underline relative inline-flex max-w-max items-center gap-1 pb-1.5 text-xsm text-primary uppercase dark:text-secondary"
        >
          <HiArrowLeft className="size-3" />
          <span>Back to menu</span>
        </Link>
        <ScrollToTopWithBlog className="link-underline max-w-max text-xsm text-primary! dark:text-secondary!" />
      </div>
    ),
    footer:
      Array.isArray(post.resources) && post.resources?.length ? (
        <div className="mt-5">
          <h3 className="text-sm font-medium uppercase">Links and Resources</h3>
          <ol className="mt-2 list-disc space-y-2 pb-4 pl-4">
            {post.resources.map((resource, i) => (
              <li
                key={i}
                className="text-sm font-medium text-neutral-600 hover:text-primary hover:underline dark:text-neutral-400 dark:hover:text-secondary"
              >
                <Link href={resource.url}>{resource.title}</Link>
              </li>
            ))}
          </ol>
        </div>
      ) : undefined
  };

  return (
    <DocsPage
      toc={page.data.toc}
      lastUpdate={time ?? undefined}
      tableOfContent={{ ...tocOptions, style: 'clerk' }}
      tableOfContentPopover={{ ...tocOptions, style: 'clerk' }}
    >
      <BlogPostContent
        title={post.title}
        description={post.description ?? ''}
        date={post.date}
        tags={post.tags ?? []}
      >
        {/* MDX rendered on the server — no functions cross the boundary */}
        <MDX components={getMDXComponents({ a: createRelativeLink(blog, page) })} />

        <div className="space-y-1">
          <p>
            Published on{' '}
            {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(post.date))}
          </p>
          <p>{post.readingTime}</p>
        </div>

        <Callout
          type="warn"
          title="Found an Issue!"
          className="border-secondary! bg-secondary-100/50 backdrop-blur dark:bg-neutral-800/70 dark:text-secondary!"
        >
          <p>
            Find an issue with this post? Think you could clarify, update or add something? All my
            posts are available to edit on Github. Any fix, little or small, is appreciated!
          </p>
          <Link
            href={`https://github.com/braswelljr/braswelljr/blob/main/content/blog/${post.path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-4 inline-flex w-auto items-center gap-2 pb-1 text-base no-underline"
          >
            <FaGithub className="size-4" />
            Edit on GitHub
          </Link>
        </Callout>
      </BlogPostContent>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return blog.generateParams();
}

export async function generateMetadata(props: PageProps<'/blog/[...slug]'>): Promise<Metadata> {
  const params = await props.params;
  const page = blog.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url
    }
  };
}

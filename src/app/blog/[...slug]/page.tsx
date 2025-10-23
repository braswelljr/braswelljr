import { type Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaGithub } from 'react-icons/fa6';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { allBlogs } from 'content/generated';
import { subDays } from 'date-fns';
import { Callout } from 'fumadocs-ui/components/callout';
import { createMetadata } from 'lib/metadata';
import { getTableOfContents } from 'lib/toc';
import { cn } from 'lib/utils';
import moment from 'moment';
import { Mdx } from '~/components/mdx-components';
import { BlogPaginate } from '~/components/paginate';
import { TableOfContents } from '~/components/table-of-content';
import { Separator } from '~/components/ui/separator';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = allBlogs.find((page) => page.params === slug?.join('/'));

  if (!page) {
    return {};
  }

  return createMetadata({
    title: page.title,
    description: page.description,
    image: `/og?title=${page.title}&description=${page.description}`
  });
}

export async function generateStaticParams() {
  return allBlogs.map((blog) => ({ slug: blog.params.split('/') }));
}

export default async function Page({ params }: PageProps) {
  const slug = (await params)?.slug?.join('/') || '';
  const blog = allBlogs.find((blog) => blog?.params === slug);

  if (!blog) {
    return notFound();
  }

  const toc = await getTableOfContents(blog?.content);

  return (
    <main className={cn('relative pt-36 pb-6 md:pt-20 md:pb-10', toc && 'md:grid md:grid-cols-[1fr_250px] md:gap-6 lg:grid-cols-[1fr_300px]')}>
      <div className="mx-auto w-full min-w-0 px-5 md:pt-14 lg:pt-0">
        <div className="flex h-full min-h-[85vh] flex-1 flex-col justify-between">
          <div className="">
            <div className="space-y-2">
              {moment(blog.date).isAfter(subDays(new Date(), 150)) && (
                <div className="inline-flex h-6 w-auto items-center space-x-1 rounded-sm bg-orange-200 px-2.5 py-0.5 text-xs font-medium text-neutral-700 uppercase dark:bg-neutral-800 dark:text-orange-400">
                  <MdOutlineWorkspacePremium className="h-3 w-auto" />
                  <span>New</span>
                </div>
              )}
              <h1
                className={cn(
                  'scroll-m-20 bg-linear-to-l from-secondary to-primary bg-clip-text text-2xl leading-tight font-bold tracking-tight text-transparent uppercase sm:text-3xl md:text-4xl dark:to-primary'
                )}
              >
                {blog.title}
              </h1>
              {blog.description && <p className="text-lg">{blog.description}</p>}
            </div>
            {blog.tags && blog.tags?.length && (
              <div className="my-2 flex flex-wrap gap-2 py-6">
                {blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-sm bg-orange-200 px-2.5 py-0.5 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-orange-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {blog?.body && (
              <Mdx
                code={blog?.body}
                className="pt-8"
              />
            )}
          </div>
          <div className="mt-10 space-y-10">
            <div className="space-y-2">
              <p>Published on {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(blog.date)}</p>
              <p>{blog.readingTime}</p>
            </div>
            <Callout
              type="warn"
              title="Found an Issue!"
            >
              <p className="">
                Find an issue with this post? Think you could clarify, update or add something? All my posts are available to edit on Github. Any fix,
                little or small, is appreciated!
              </p>
              <Link
                href={`https://github.com/braswelljr/braswelljr/blob/main/content/blog/${blog.params}/index.mdx`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-4 inline-flex w-auto items-center gap-2 pb-1 text-base"
              >
                <FaGithub className="size-4" />
                Edit on GitHub
              </Link>
            </Callout>
            <Separator className="my-4 md:my-6" />
            <BlogPaginate
              blogs={allBlogs}
              activeBlog={blog}
            />
          </div>
        </div>
      </div>
      {toc && (
        <TableOfContents
          toc={toc}
          resources={blog?.resources}
        />
      )}
    </main>
  );
}

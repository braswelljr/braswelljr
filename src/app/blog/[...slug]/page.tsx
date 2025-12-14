import { type Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isAfter, subDays } from 'date-fns';
import { getGithubLastEdit } from 'fumadocs-core/content/github';
import { Callout } from 'fumadocs-ui/components/callout';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import { FaGithub } from 'react-icons/fa6';
import { HiArrowLeft } from 'react-icons/hi';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import readingTime from 'reading-time';
import { blog, getPageImage } from 'lib/source';
import { getMDXComponents } from '~/components/mdx-components';
import { ScrollToTopWithBlog } from '~/components/scroll-top';

export default async function Page(props: PageProps<'/blog/[...slug]'>) {
  const params = await props.params;
  const page = blog.getPage(params.slug);
  if (!page) notFound();

  if (!page) {
    return notFound();
  }

  const text = await page.data.getText('processed');

  const post = {
    ...page.data,
    path: page.path,
    slug: page.url,
    readingTime: readingTime(String(text)).text,
    params: page.path
  };

  const MDX = post.body;

  const time = await getGithubLastEdit({
    owner: 'braswelljr',
    repo: 'braswelljr',
    path: `content/blog/${post.path}`
  });

  const tocOptions = {
    style: 'clerk',
    enabled: true,
    header: (
      <div className="flex flex-col gap-1">
        <Link
          href="/blog"
          className="link-underline text-primary text-xsm dark:text-secondary relative inline-flex max-w-max items-center gap-1 pb-1.5 uppercase"
        >
          <HiArrowLeft className="size-3" />
          <span>Back to menu</span>
        </Link>
        <ScrollToTopWithBlog className="text-primary! text-xsm dark:text-secondary! link-underline max-w-max" />
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
                className="hover:text-primary dark:hover:text-secondary text-sm font-medium text-neutral-600 hover:underline dark:text-neutral-400"
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
      <div className="relative pt-[calc(var(--fd-nav-height)+15px)] lg:pt-[calc(var(--fd-nav-height)+5px)]">
        <div className="space-y-4">
          {isAfter(post.date, subDays(new Date(), 150)) && (
            <div className="bg-primary-100 dark:text-primary-400 inline-flex h-8 w-auto items-center gap-1 rounded-sm px-2.5 py-0.5 text-sm font-medium text-neutral-700 uppercase dark:bg-neutral-800">
              <MdOutlineWorkspacePremium className="h-3 w-auto" />
              <span>New</span>
            </div>
          )}
          <DocsTitle className="text-primary!">{page.data.title}</DocsTitle>
          <DocsDescription>{page.data.description}</DocsDescription>
          {post.tags && post.tags?.length && (
            <div className="my-2 flex flex-wrap gap-2 py-6">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-primary-100 dark:text-secondary text-primary inline-flex items-center rounded px-2.5 py-0.5 text-sm font-medium dark:bg-neutral-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <DocsBody>
          <MDX
            components={getMDXComponents({
              a: createRelativeLink(blog, page)
            })}
          />

          <div className="space-y-1">
            <p>Published on {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(post.date)}</p>
            <p>{post.readingTime}</p>
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
              href={`https://github.com/braswelljr/braswelljr/blob/main/content/blog/${post.path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-4 inline-flex w-auto items-center gap-2 pb-1 text-base no-underline"
            >
              <FaGithub className="size-4" />
              Edit on GitHub
            </Link>
          </Callout>
        </DocsBody>
      </div>
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

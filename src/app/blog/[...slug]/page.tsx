import '~/styles/mdx.css'

import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Mdx } from '@/components/mdx'
import { Separator } from '@/components/separator'
import { allBlogs } from 'contentlayer/generated'
import { getTableOfContents } from 'lib/toc'

import { BlogPaginate } from '~/components/paginate'
import { BlogTableOfContents } from '~/components/toc'

interface PageProps {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams(): Promise<PageProps['params'][]> {
  return allBlogs.map(blog => ({ slug: blog.slugAsParams.split('/') }))
}

export default async function BlogPage({ params }: PageProps) {
  const slug = params?.slug?.join('/') || ''
  const blog = allBlogs.find(blog => blog.slugAsParams === slug)

  if (!blog) {
    return notFound()
  }

  const toc = await getTableOfContents(blog.body.raw)

  return (
    <main className="relative pb-6 pt-32 md:grid md:grid-cols-[1fr_250px] md:gap-6 md:pb-10 md:pt-16 lg:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0 px-5 md:pt-14 lg:pt-0">
        <Mdx code={blog.body.code} />
        <Separator className="my-4 md:my-6" />
        <BlogPaginate blog={blog} />
      </div>
      <div className="hidden text-xs md:block xl:text-sm">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pr-2 pt-16">
          {/* back button */}
          <div className="mb-4 flex items-center">
            <Link
              href="/blog"
              className="group/link relative inline-flex items-center space-x-2 pb-1.5 pl-0.5 uppercase text-neutral-600 dark:text-neutral-400"
            >
              <svg
                className="h-5 w-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 10a1 1 0 010-1.414L11.586 4.5H4a1 1 0 110-2h8a1 1 0 011 1v8a1 1 0 11-2 0V6.414l-4.293 4.293a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Back to blog</span>
              <span
                className="absolute inset-x-0 bottom-1 h-0.5 w-0 bg-current transition-width group-hover/link:w-full"
                aria-hidden="true"
              />
            </Link>
          </div>
          {/* Table of contents */}
          <BlogTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  )
}

import '~/styles/mdx.css'
import { notFound } from 'next/navigation'
import { allBlogs } from 'contentlayer/generated'
import { getTableOfContents } from 'lib/toc'
import { cn } from 'lib/utils'
import { Mdx } from '~/components/mdx'
import { BlogPaginate } from '~/components/paginate'
import { Separator } from '~/components/separator'
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
        <div className="flex h-full min-h-[85vh] flex-1 flex-col  justify-between">
          <div className="">
            <div className="space-y-2">
              <h1
                className={cn(
                  'scroll-m-20 bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text text-2xl font-bold uppercase leading-tight tracking-tight text-transparent dark:to-[#ff7056] sm:text-3xl md:text-4xl'
                )}
              >
                {blog.title}
              </h1>
              {blog.description && <p className="text-muted-foreground text-lg">{blog.description}</p>}
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
            <Mdx code={blog.body.code} className="pt-8" />
          </div>
          <div className="">
            <Separator className="my-4 md:my-6" />
            <BlogPaginate blogs={allBlogs} activeBlog={blog} />
          </div>
        </div>
      </div>
      {/* Table of contents */}
      <BlogTableOfContents toc={toc} />
    </main>
  )
}

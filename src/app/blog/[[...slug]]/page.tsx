import '~/styles/mdx.css'
import { notFound } from 'next/navigation'
import { allBlogs } from 'contentlayer/generated'
import { getTableOfContents } from 'lib/toc'
import { Mdx } from '@/components/mdx'
import { BlogPaginate } from '~/components/paginate'
import { BlogTableOfContents } from '~/components/toc'
import { Separator } from '@/components/separator'

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
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_250px]">
      <div className="mx-auto w-full min-w-0">
        <Mdx code={blog.body.code} />
        <Separator className="my-4 md:my-6" />
        <BlogPaginate blog={blog} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <BlogTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  )
}

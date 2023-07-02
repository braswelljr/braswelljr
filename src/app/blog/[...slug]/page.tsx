import '~/styles/mdx.css'
import { notFound } from 'next/navigation'
import { allBlogs } from 'contentlayer/generated'
import { getTableOfContents } from 'lib/toc'
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
        <Mdx code={blog.body.code} className="min-h-[80vh]" />
        <Separator className="my-4 md:my-6" />
        <BlogPaginate blogs={allBlogs} activeBlog={blog} />
      </div>
      {/* Table of contents */}
      <BlogTableOfContents toc={toc} />
    </main>
  )
}

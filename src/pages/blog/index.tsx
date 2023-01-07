export default function Blog() {
  return (
    <div className="pt-10 pb-10 max-lg:pt-28">
      <div className="mx-auto max-w-xl px-4 text-gray-800 child:space-y-6 dark:text-neutral-100 sm:mt-14 sm:child:space-y-10">
        <h1 className="">Blog</h1>
      </div>
    </div>
  )
}

Blog.layoutProps = {
  meta: {
    title: 'Blog',
    description: 'All the latest Blog Posts.'
  }
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
  }

  return { props: {} }
}

'use client'

import 'swiper/swiper.min.css'
import 'swiper/css/autoplay'
import { ReactNode } from 'react'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Keyboard } from 'swiper'
import { ImBlog } from 'react-icons/im'
import { BlogSidebarNav } from '~/components/BlogSidebarNav'
import { ScrollArea } from '~/components/ScrollArea'
import { blogConfig } from '~/config/blog'
import { headerBackground } from '~/assets/backgrounds/blog'

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isIndexPage = pathname === '/blog'

  return (
    <div className="">
      {/* image header */}
      <Swiper
        modules={[Autoplay, Keyboard]}
        initialSlide={0}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        speed={300}
        autoplay={{
          delay: 15000,
          disableOnInteraction: false
        }}
        className="relative w-full"
      >
        {Object.entries(headerBackground).map(([key, value], index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[50vh] w-full overflow-hidden">
              <img
                src={value.image}
                alt={key}
                className="absolute top-0 left-0 h-full w-full object-cover object-center"
              />
              <div className="relative inset-0 z-[1] flex h-full w-full items-center justify-center bg-neutral-800/70">
                <div className="py-4 px-4">
                  <div className="flex items-center space-x-4">
                    <ImBlog className="h-6 w-auto text-white" />
                    <h1 className="bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text text-2xl font-bold uppercase leading-tight tracking-tight text-transparent dark:to-[#ff7056] sm:text-3xl md:text-4xl">
                      {pathname.split('/')[pathname.split('/').length - 1]}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* body */}
      <div
        className={clsx(
          'flex-1 items-start',
          isIndexPage
            ? 'px-4'
            : 'md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'
        )}
      >
        {!isIndexPage && (
          <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-r-neutral-100 dark:border-r-neutral-700 md:sticky md:block">
            <ScrollArea className="pr-6 lg:py-10">
              <BlogSidebarNav items={blogConfig.sidebarNav} />
            </ScrollArea>
          </aside>
        )}
        {children}
      </div>
    </div>
  )
}

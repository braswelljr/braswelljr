import clsx from 'clsx'

import { Separator } from '~/components/separator'

interface BlogPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string
  text?: string
}

export function BlogPageHeader({
  heading,
  text,
  className,
  children,
  ...props
}: BlogPageHeaderProps) {
  return (
    <>
      <div className={clsx('space-y-4', className)} {...props}>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {heading}
        </h1>
        {text && (
          <p className="max-w-[95%] text-xl text-neutral-800 dark:text-neutral-400">{text}</p>
        )}
      </div>
      {children}
      <Separator className="my-4 md:my-6" />
    </>
  )
}

'use client'

import * as React from 'react'
import clsx from 'clsx'

import { CodeBlockWrapper } from '~/components/CodeBlockWrapper'

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
}

export function ComponentSource({ children, className }: ComponentSourceProps) {
  return (
    <CodeBlockWrapper
      expandButtonTitle="View Primitive"
      className={clsx('my-6 overflow-hidden rounded-md', className)}
    >
      {children}
    </CodeBlockWrapper>
  )
}

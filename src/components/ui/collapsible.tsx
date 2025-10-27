'use client';

import { forwardRef } from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { cn } from 'lib/utils';

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    className={cn(
      'data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden text-sm transition-all',
      className
    )}
    {...props}
  />
));

CollapsibleContent.displayName = CollapsiblePrimitive.CollapsibleContent.displayName;

export { Collapsible, CollapsibleContent, CollapsibleTrigger };

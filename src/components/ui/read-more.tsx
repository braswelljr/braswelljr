'use client';

import { ComponentProps, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from 'lib/utils';
import { Button } from './button';

type ReadMoreProps = ComponentProps<'div'> & {
  text?: string;
  maxLength?: number;
  className?: string;
  expandText?: string;
  collapseText?: string;
  showIcon?: boolean;
};

export function ReadMore({
  text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  maxLength = 150,
  className = '',
  expandText = 'Read more',
  collapseText = 'Read less',
  showIcon = true,
  ...props
}: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldTruncate = text.length > maxLength;
  const displayText = isExpanded || !shouldTruncate ? text : `${text.slice(0, maxLength)}...`;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      {...props}
      className={cn(`space-y-2`, className)}
    >
      <div className="overflow-hidden transition-all duration-500 ease-in-out">
        <p className="leading-relaxed whitespace-pre-wrap">
          {displayText}{' '}
          {shouldTruncate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              className="h-auto bg-transparent! p-0 font-medium text-primary transition-all duration-300 hover:text-primary/80"
            >
              {isExpanded ? collapseText : expandText}
              {showIcon && (
                <span className="ml-1 inline-block transition-transform duration-300">
                  {isExpanded ? (
                    <ChevronUp className="inline h-4 w-4" />
                  ) : (
                    <ChevronDown className="inline h-4 w-4" />
                  )}
                </span>
              )}
            </Button>
          )}
        </p>
      </div>
    </div>
  );
}

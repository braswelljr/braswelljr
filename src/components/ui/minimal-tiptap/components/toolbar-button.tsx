import * as React from 'react';
import { cn } from 'lib/utils';
import { Toggle } from '../../toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../tooltip';

interface ToolbarButtonProps extends React.ComponentProps<typeof Toggle> {
  isActive?: boolean;
  tooltip?: string;
  tooltipOptions?: React.ComponentProps<typeof TooltipContent>;
}

export const ToolbarButton = ({
  isActive,
  children,
  tooltip,
  className,
  tooltipOptions,
  ...props
}: ToolbarButtonProps) => {
  const toggleButton = (
    <Toggle
      className={cn({ 'bg-neutral-100 dark:bg-neutral-800': isActive }, className)}
      {...props}
    >
      {children}
    </Toggle>
  );

  if (!tooltip) {
    return toggleButton;
  }

  return (
    <Tooltip>
      <TooltipTrigger render={toggleButton} />
      <TooltipContent {...tooltipOptions}>
        <div className="flex flex-col items-center text-center">{tooltip}</div>
      </TooltipContent>
    </Tooltip>
  );
};

ToolbarButton.displayName = 'ToolbarButton';

export default ToolbarButton;

'use client';

import {
  createContext,
  useContext,
  useMemo,
  type ButtonHTMLAttributes,
  type ComponentProps,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactNode
} from 'react';
import { Slot } from '@radix-ui/react-slot';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { addDays, format, isSameDay, isToday } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from 'lib/utils';
import { Button } from './button';

// Context for sharing state between components
type MiniCalendarContextType = {
  selectedDate: Date | null | undefined;
  onDateSelect: (date: Date) => void;
  startDate: Date;
  onNavigate: (direction: 'prev' | 'next') => void;
  days: number;
};
const MiniCalendarContext = createContext<MiniCalendarContextType | null>(
  {} as MiniCalendarContextType
);

function useMiniCalendar() {
  const context = useContext(MiniCalendarContext);
  if (!context) {
    throw new Error('MiniCalendar components must be used within MiniCalendar');
  }
  return context;
}

// Helper function to get array of consecutive dates
function getDays(startDate: Date, count: number): Date[] {
  const days: Date[] = [];
  for (let i = 0; i < count; i++) {
    days.push(addDays(startDate, i));
  }
  return days;
}

// Helper function to format date
function formatDate(date: Date) {
  const month = format(date, 'MMM');
  const day = format(date, 'd');
  return { month, day };
}

export type MiniCalendarProps = HTMLAttributes<HTMLDivElement> & {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  startDate?: Date;
  defaultStartDate?: Date;
  onStartDateChange?: (date: Date | undefined) => void;
  days?: number;
};

export const MiniCalendar = ({
  value,
  defaultValue,
  onValueChange,
  startDate,
  defaultStartDate = new Date(),
  onStartDateChange,
  days = 5,
  className,
  children,
  ...props
}: MiniCalendarProps) => {
  const [selectedDate, setSelectedDate] = useControllableState<Date | undefined>({
    prop: value,
    defaultProp: defaultValue,
    onChange: onValueChange
  });
  const [currentStartDate, setCurrentStartDate] = useControllableState({
    prop: startDate,
    defaultProp: defaultStartDate,
    onChange: onStartDateChange
  });
  const handleDateSelect = (date: Date) => setSelectedDate(date);
  const handleNavigate = (direction: 'prev' | 'next') => {
    const newStartDate = addDays(
      currentStartDate || new Date(),
      direction === 'next' ? days : -days
    );
    setCurrentStartDate(newStartDate);
  };
  const contextValue: MiniCalendarContextType = useMemo(
    () => ({
      selectedDate: selectedDate || null,
      onDateSelect: handleDateSelect,
      startDate: currentStartDate || new Date(),
      onNavigate: handleNavigate,
      days
    }),
    [selectedDate, currentStartDate, handleDateSelect, handleNavigate, days]
  );

  return (
    <MiniCalendarContext.Provider value={contextValue}>
      <div
        className={cn(
          'flex items-center gap-2 rounded-lg border bg-neutral-400 p-2 dark:bg-neutral-700',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </MiniCalendarContext.Provider>
  );
};

export type MiniCalendarNavigationProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  direction: 'prev' | 'next';
  render?: React.ReactElement;
};

export const MiniCalendarNavigation = ({
  direction,
  render,
  children,
  onClick,
  ...props
}: MiniCalendarNavigationProps) => {
  const { onNavigate } = useMiniCalendar();
  const Icon = direction === 'prev' ? ChevronLeftIcon : ChevronRightIcon;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onNavigate(direction);
    onClick?.(event);
  };

  if (render) {
    return (
      <Slot
        onClick={handleClick}
        {...props}
      >
        {render}
      </Slot>
    );
  }

  return (
    <Button
      onClick={handleClick}
      size="icon"
      type="button"
      variant="ghost"
      {...props}
    >
      {children ?? <Icon className="size-4" />}
    </Button>
  );
};

export type MiniCalendarDaysProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children: (date: Date) => ReactNode;
};

export const MiniCalendarDays = ({ className, children, ...props }: MiniCalendarDaysProps) => {
  const { startDate, days: dayCount } = useMiniCalendar();
  const days = getDays(startDate, dayCount);
  return (
    <div
      className={cn('flex items-center gap-1', className)}
      {...props}
    >
      {days.map((date) => children(date))}
    </div>
  );
};

export type MiniCalendarDayProps = ComponentProps<typeof Button> & {
  date: Date;
};

export const MiniCalendarDay = ({ date, className, ...props }: MiniCalendarDayProps) => {
  const { selectedDate, onDateSelect } = useMiniCalendar();
  const { month, day } = formatDate(date);
  const isSelected = selectedDate && isSameDay(date, selectedDate);
  const isTodayDate = isToday(date);

  return (
    <Button
      className={cn(
        'h-auto min-w-12 flex-col gap-0 p-2 text-xs',
        isTodayDate && !isSelected && 'bg-accent',
        className
      )}
      onClick={() => onDateSelect(date)}
      size="sm"
      type="button"
      variant={isSelected ? 'default' : 'ghost'}
      {...props}
    >
      <span className={cn('text-xs font-medium', isSelected && 'text-zinc-600 dark:text-zinc-300')}>
        {month}
      </span>
      <span className="text-sm font-semibold">{day}</span>
    </Button>
  );
};

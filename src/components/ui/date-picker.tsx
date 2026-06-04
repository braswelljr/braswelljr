'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { cn } from 'lib/utils';
import { Calendar } from './calendar';
import { Field, FieldError } from './field';
import { Label } from './label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

type DatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
  label?: string;
  placeholder?: string;
  className?: string;
};

export function DatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  placeholder = 'Pick a date',
  className,
  ...props
}: DatePickerProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      {...props}
      render={({ field, fieldState }) => (
        <Field className={cn('', className)}>
          {label && (
            <Label
              htmlFor={name}
              className="text-sm font-medium text-neutral-900 dark:text-neutral-50"
            >
              {label}
            </Label>
          )}
          <Popover>
            <PopoverTrigger
              render={(props) => (
                <button
                  {...props}
                  type="button"
                  id={name}
                  className={cn(
                    'flex w-full items-center gap-2 border border-neutral-200 bg-white px-3 py-2 text-left text-sm ring-offset-white placeholder:text-neutral-500 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/50 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus:border-neutral-300 dark:focus:ring-neutral-300/50 [&>svg]:size-4 [&>svg]:text-neutral-500 dark:[&>svg]:text-neutral-400',
                    fieldState.error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                  )}
                >
                  <CalendarIcon />
                  <span className="flex-1">
                    {field.value ? format(new Date(field.value), 'PPP') : placeholder}
                  </span>
                </button>
              )}
            />
            <PopoverContent
              className="w-auto p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  if (date) {
                    // Format as YYYY-MM-DD for HTML date input compatibility
                    field.onChange(format(date, 'yyyy-MM-dd'));
                  } else {
                    field.onChange('');
                  }
                }}
              />
            </PopoverContent>
          </Popover>
          {fieldState.error && (
            <FieldError
              errors={[fieldState.error]}
              className="text-sm text-red-500"
            />
          )}
        </Field>
      )}
    />
  );
}

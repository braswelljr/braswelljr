'use client';

import React from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { cn } from 'lib/utils';
import 'react-phone-number-input/style.css';
import { Input, InputProps } from './input';

export type PhoneNumberInputProps = RPNInput.Props<React.InputHTMLAttributes<HTMLInputElement>> & {
  /** Custom Input component (defaults to local Input) */
  Input?: React.ComponentType<InputProps>;
  /** Custom flag renderer — must be a functional component */
  FlagComponent?: (props: RPNInput.FlagProps & { className?: string }) => React.JSX.Element;
  /** Custom country select renderer */
  CountrySelectComponent?: React.ComponentType<CountrySelectProps>;
  /** Show or hide country flag */
  showFlag?: boolean;
  /** Show or hide country select dropdown */
  showCountrySelect?: boolean;
  /** Default selected country */
  defaultCountry?: RPNInput.Country;
  /** Extra classnames for outer container */
  className?: string;
  /** Custom placeholder */
  placeholder?: string;
  classNames?: {
    base?: string;
    flag?: string;
    input?: string;
    select?: string;
  };
};

export function PhoneNumberInput({
  Input: CustomInput,
  FlagComponent: CustomFlag,
  CountrySelectComponent: CustomSelect,
  showFlag = true,
  showCountrySelect = true,
  defaultCountry = 'GH',
  className,
  placeholder = 'Enter phone number',
  classNames,
  ...props
}: PhoneNumberInputProps) {
  const MemoizedFlagComponent = React.useMemo(() => {
    if (!showFlag) return undefined;

    const WrappedFlag = Object.assign(
      (flagProps: RPNInput.FlagProps) =>
        CustomFlag ? (
          <CustomFlag
            {...flagProps}
            className={classNames?.flag}
          />
        ) : (
          <FlagComponent
            {...flagProps}
            className={classNames?.flag}
          />
        ),
      { displayName: 'MemoizedFlagComponent' }
    );

    return WrappedFlag;
  }, [showFlag, CustomFlag, classNames?.flag]);

  const MemoizedSelectComponent = React.useMemo(() => {
    if (!showCountrySelect) return undefined;

    const Select = CustomSelect ?? CountrySelect;

    const WrappedSelect = Object.assign(
      (selectProps: any) => (
        <Select
          {...selectProps}
          className={classNames?.select}
        />
      ),
      { displayName: 'MemoizedSelectComponent' }
    );

    return WrappedSelect;
  }, [showCountrySelect, CustomSelect, classNames?.select]);

  const MemoizedInputComponent = React.useMemo(() => {
    const InputComponent = CustomInput ?? Input;

    const WrappedInput = React.forwardRef<HTMLInputElement, InputProps>((inputProps, ref) => (
      <InputComponent
        {...inputProps}
        ref={ref}
        className={cn(
          '-ml-px rounded-l-none shadow-none ring-offset-2 focus:ring focus:ring-neutral-500 focus-visible:z-10',
          classNames?.input
        )}
      />
    ));

    WrappedInput.displayName = 'MemoizedInputComponent';
    return WrappedInput;
  }, [CustomInput, classNames?.input]);

  return (
    <RPNInput.default
      {...props}
      defaultCountry={defaultCountry}
      international
      className={cn('flex rounded-lg shadow-xs shadow-black/4', className, classNames?.base)}
      flagComponent={MemoizedFlagComponent}
      countrySelectComponent={MemoizedSelectComponent}
      inputComponent={MemoizedInputComponent}
      id="phone-number-input"
      placeholder={placeholder}
    />
  );
}

export type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: { label: string; value: RPNInput.Country }[];
  className?: string;
};

const CountrySelect = ({ disabled, value, onChange, options, className }: CountrySelectProps) => {
  return (
    <div
      className={cn(
        'relative inline-flex items-center self-stretch rounded-l border py-2 ps-3 pe-2 transition-shadow focus-within:z-10 focus-within:ring-2 focus-within:ring-offset-2 focus-within:outline-hidden focus:ring-1 focus:ring-neutral-400/20 focus:ring-offset-2 has-disabled:pointer-events-none has-disabled:opacity-50 dark:ring-offset-neutral-800 dark:focus:ring-neutral-800/20',
        className
      )}
    >
      <div
        className="inline-flex items-center gap-1"
        aria-hidden="true"
      >
        <FlagComponent
          country={value}
          countryName={value}
          aria-hidden="true"
        />
        <span className="/80">
          <ChevronDown
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>
      </div>
      <select
        disabled={disabled}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          onChange(event.target.value as RPNInput.Country)
        }
        className="absolute inset-0 bg-neutral-100 text-sm opacity-0 dark:bg-neutral-950"
        aria-label="Select country"
      >
        <option
          key="default"
          value=""
        >
          Select a country
        </option>
        {options
          .filter((x) => x.value)
          .map((option, i) => (
            <option
              key={option.value ?? `empty-${i}`}
              value={option.value}
            >
              {option.label} {option.value && `+${RPNInput.getCountryCallingCode(option.value)}`}
            </option>
          ))}
      </select>
    </div>
  );
};

const FlagComponent = ({
  country,
  countryName,
  className
}: RPNInput.FlagProps & { className?: string }) => {
  const Flag = flags[country];

  return (
    <span className={cn('w-5 overflow-hidden rounded-xs', className)}>
      {Flag ? (
        <Flag title={countryName} />
      ) : (
        <Phone
          size={16}
          aria-hidden="true"
          role="presentation"
        />
      )}
    </span>
  );
};

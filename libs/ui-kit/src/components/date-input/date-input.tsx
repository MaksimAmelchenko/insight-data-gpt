import React, { createElement, forwardRef } from 'react';
import clsx from 'clsx';

import { CalendarIcon } from '../icons';
import { Clear, Input, InputProps } from '../input/input';
import { DatePicker } from '../date-picker/date-picker';

import styles from './data-input.module.scss';

export interface DateInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  value: Date | null;
  onChange: (value: Date | null) => unknown;
  dateFormat: string;
  showMonthYearPicker?: boolean;
  isClearable?: boolean;
  locale?: string;
}

export function DateInput({
  value,
  onChange,
  dateFormat,
  showMonthYearPicker,
  locale,
  className,
  ...rest
}: DateInputProps) {
  const handleCleanClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div className={clsx(styles.root, className)}>
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat={dateFormat}
        strictParsing
        showMonthYearPicker={showMonthYearPicker}
        customInput={createElement<any>(CustomInput, { ...rest, onCleanClick: handleCleanClick })}
        locale={locale}
      />
    </div>
  );
}

const CustomInput = forwardRef<HTMLElement, any>(({ isClearable = true, onCleanClick, ...props }, ref) => {
  return (
    <Input {...props} startIcon={<CalendarIcon />} endAdornment={isClearable && <Clear onClick={onCleanClick} />} />
  );
});

import React from 'react';
import ReactDatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.scss';

import en from 'date-fns/locale/en-US';
import ru from 'date-fns/locale/ru';
import de from 'date-fns/locale/de';

registerLocale('en', en);
registerLocale('ru', ru);
registerLocale('de', de);

export { ReactDatePickerProps as DatePickerProps };

export function DatePicker<WithRange extends boolean | undefined = undefined>(
  props: ReactDatePickerProps<never, WithRange>,
): JSX.Element {
  return (
    <ReactDatePicker<never, WithRange>
      showPopperArrow={false}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      {...props}
    />
  );
}

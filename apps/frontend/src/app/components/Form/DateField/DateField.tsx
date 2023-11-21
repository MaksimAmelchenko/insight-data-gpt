import React, { useCallback } from 'react';
import { useField, useFormikContext } from 'formik';

import { DateInput, DateInputProps } from '@org/ui-kit';

export interface DateFieldProps extends Omit<DateInputProps, 'value' | 'onChange'> {
  name: string;
}

export function DateField(props: DateFieldProps): JSX.Element {
  const [formikProps, meta] = useField(props.name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const joinedProps = { ...props, ...formikProps };
  const isError = Boolean(meta.error);
  const { name } = props;
  const handleChange = useCallback(
    (value: Date | null) => {
      setFieldValue(name, value);
      setFieldTouched(name, true, false);
    },
    [name, setFieldTouched, setFieldValue]
  );

  return <DateInput {...joinedProps} onChange={handleChange} errorText={isError ? meta.error : ''} />;
}

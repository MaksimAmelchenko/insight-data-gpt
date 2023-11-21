import React, { forwardRef } from 'react';
import { useField } from 'formik';

import { InputProps, Input } from '@org/ui-kit';

export interface IFormInputProps extends Omit<InputProps, 'value'> {
  name: string;
  className?: string;
}

export const InputField = forwardRef<HTMLInputElement, IFormInputProps>((props, ref) => {
  const [formikProps, meta] = useField(props.name);
  const joinedProps = { ...props, ...formikProps };
  const isError = Boolean(meta.error);

  return <Input {...joinedProps} errorText={isError ? meta.error : ''} ref={ref} />;
});

InputField.displayName = 'InputField';

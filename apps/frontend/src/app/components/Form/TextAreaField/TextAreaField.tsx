import React, { forwardRef } from 'react';
import { useField } from 'formik';

import { TextArea, TextAreaProps } from '@org/ui-kit';

export interface FormTextAreaProps extends Omit<TextAreaProps, 'value'> {
  name: string;
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, FormTextAreaProps>((props, ref) => {
  const [formikProps, meta] = useField(props.name);
  const joinedProps = { ...props, ...formikProps };
  const isError = Boolean(meta.error);

  return <TextArea {...joinedProps} errorText={isError ? meta.error : ''} />;
});

TextAreaField.displayName = 'FormTextArea';

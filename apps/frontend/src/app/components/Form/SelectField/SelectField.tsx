import React, { useCallback } from 'react';
import { useField, useFormikContext } from 'formik';

import { ISelectOption, isMulti, Select, SelectProps } from '@org/ui-kit';
import { OnChangeValue } from 'react-select/dist/declarations/src/types';

export interface FormSelectProps<IsMulti extends boolean> extends Omit<SelectProps<IsMulti>, 'value'> {
  name: string;
}

export function SelectField<IsMulti extends boolean = false>(props: FormSelectProps<IsMulti>): JSX.Element {
  const [formikProps, meta] = useField<IsMulti extends true ? string[] : string | null>(props.name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const joinedProps = { ...props, ...formikProps };
  const isError = Boolean(meta.error);
  const error = isError ? meta.error : '';

  const { options, name } = props;

  const value: ISelectOption[] | (ISelectOption | null) = Array.isArray(meta.value)
    ? options.filter(({ value }) => (meta.value as string[]).includes(value))
    : meta.value === null
    ? null
    : options.find(({ value }) => value === meta.value) || null;

  const handleChange = useCallback(
    (newValue: OnChangeValue<ISelectOption, IsMulti>) => {
      setFieldValue(name, isMulti(newValue) ? newValue.map(({ value }) => value) : newValue?.value || null);
    },
    [name, setFieldValue]
  );

  const handleBlur = useCallback(() => {
    setFieldTouched(name, true);
  }, [name, setFieldTouched]);

  return <Select<IsMulti> {...joinedProps} value={value} onChange={handleChange} error={error} onBlur={handleBlur} />;
}

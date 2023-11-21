import React, { forwardRef, useId } from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import clsx from 'clsx';

import styles from './text-area.module.scss';

export interface TextAreaProps extends TextareaAutosizeProps {
  label?: string;
  value: string;
  helperText?: string;
  errorText?: string;
  className?: string;
  autoSize?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const {
    errorText,
    helperText,
    label,
    name,
    value,
    minRows = 2,
    className,
    autoSize = true,
    ...textAreaProps
  } = props;
  const id = useId();

  const isError = Boolean(errorText);

  const message = isError ? errorText : helperText;
  return (
    <div className={clsx(styles.root, isError && styles.root_error, className)}>
      <label className={clsx(styles.root__label)} htmlFor={id}>
        {label}
      </label>
      {autoSize ? (
        <TextareaAutosize
          {...textAreaProps}
          minRows={minRows}
          id={id}
          name={name}
          value={value}
          className={clsx(styles.root__textArea, styles.textArea, isError && styles.textArea_error)}
          ref={ref}
        />
      ) : (
        <textarea
          {...textAreaProps}
          id={id}
          name={name}
          value={value}
          className={clsx(styles.root__textArea, styles.textArea, isError && styles.textArea_error)}
          ref={ref}
        />
      )}
      {message && <p className={styles.root__helperText}>{message}</p>}
    </div>
  );
});

TextArea.displayName = 'TextArea';

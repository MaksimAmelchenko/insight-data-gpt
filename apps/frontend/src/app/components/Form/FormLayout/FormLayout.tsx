import React from 'react';
import clsx from 'clsx';

import styles from './FormLayout.module.scss';

export const FormLayout: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => {
  return <div className={clsx(styles.root, className)}>{children}</div>;
};

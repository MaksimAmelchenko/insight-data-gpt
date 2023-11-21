import React from 'react';
import clsx from 'clsx';

import styles from './Loader.module.scss';

interface LoaderProps {
  className?: string;
}

export function Loader({ className }: LoaderProps): React.ReactElement {
  return <div className={clsx(styles.root, className)}>Loading...</div>;
}

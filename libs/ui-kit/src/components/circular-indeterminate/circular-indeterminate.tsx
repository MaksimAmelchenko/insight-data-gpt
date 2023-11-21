import React from 'react';

import styles from './circular-indeterminate.module.scss';

export function CircularIndeterminate(): JSX.Element {
  return (
    <div className={styles.container}>
      <div>Loading...</div>
    </div>
  );
}

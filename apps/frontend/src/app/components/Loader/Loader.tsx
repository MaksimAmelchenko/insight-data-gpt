import React from 'react';

import { CircularIndeterminate, cn } from '@org/ui-kit';

interface LoaderProps {
  className?: string;
}

export function Loader({ className }: LoaderProps): React.ReactElement {
  return (
    <div className={cn('h-[200px]', className)}>
      <CircularIndeterminate />
    </div>
  );
}

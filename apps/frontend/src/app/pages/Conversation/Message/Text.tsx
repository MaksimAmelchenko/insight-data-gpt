import React from 'react';

import { cn } from '@org/ui-kit';

export interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export function Text({ children, className }: TextProps): React.ReactElement {
  return (
    <div
      className={cn(
        'flex min-h-[20px] flex-col items-start gap-3 overflow-x-auto whitespace-pre-wrap break-words [.text-message+&]:mt-5',
        className
      )}
    >
      {children}
    </div>
  );
}

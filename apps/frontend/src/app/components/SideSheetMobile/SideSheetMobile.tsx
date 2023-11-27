import React from 'react';
import { observer } from 'mobx-react-lite';

import { Loader } from '../Loader/Loader';
import { cn, Sheet, SheetContent } from '@org/ui-kit';

export interface SideSheetMobileProps {
  side?: 'left' | 'right';
  open: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  onOpenChange?: (open: boolean) => void;
  isFullScreen?: boolean;
  className?: string;
}

export const SideSheetMobile = observer<SideSheetMobileProps>(
  ({ side = 'right', open, onOpenChange, onClick, isFullScreen = true, className, children }) => {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side={side} className={cn('p-0', isFullScreen && 'w-full', className)} onClick={onClick}>
          <React.Suspense fallback={<Loader />}>
            {/**/}
            {open && <> {children} </>}
          </React.Suspense>
        </SheetContent>
      </Sheet>
    );
  }
);

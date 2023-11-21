import React, { useState } from 'react';

import { Button, XCloseIcon } from '@org/ui-kit';

export function NavFeaturedCard(): React.ReactElement | null {
  const [isOpen, setIsOpen] = useState(true);

  const handleNavFeaturedCardClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="NavFeaturedCard flex h-40 flex-col items-start justify-start gap-4 self-stretch rounded-lg bg-gray-50 px-4 py-5">
      <div className="TextAndSupportingText relative flex h-16 flex-col items-start justify-start gap-1">
        <div className="TextWrap  inline-flex items-start justify-start gap-1 self-stretch pr-6">
          <div className="Text shrink grow basis-0 text-sm font-semibold leading-tight text-gray-900">Used space</div>
        </div>
        <div
          className="ButtonCloseX absolute right-[-6px] top-[-14px] flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg p-2"
          onClick={handleNavFeaturedCardClose}
        >
          <div className="XClose svg-full relative h-5 w-5">
            <XCloseIcon />
          </div>
        </div>

        <div className="SupportingText self-stretch text-sm font-normal leading-tight text-slate-600">
          Your team has used 80% of your available space. Need more?
        </div>
      </div>
      <div className="ProgressBar inline-flex items-center justify-start gap-3 self-stretch">
        <div className="ProgressBar relative h-2 w-full rounded-lg">
          <div className="Background absolute left-0 top-0 h-2 w-full rounded-full bg-gray-200" />
          <div className="Progress absolute left-0 top-0 h-2 w-10/12 rounded-full bg-indigo-500" />
        </div>
      </div>
      <div className="Actions inline-flex items-start justify-start gap-3">
        <Button variant="linkGray" size="sm" onClick={handleNavFeaturedCardClose}>
          Dismiss
        </Button>
        <Button variant="linkColor" size="sm">
          Upgrade plan
        </Button>
      </div>
    </div>
  );
}

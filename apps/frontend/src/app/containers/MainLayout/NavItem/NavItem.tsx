import React from 'react';

import { Link } from '@org/ui-kit';

export interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}
export function NavItem({ icon, label, href, onClick }: NavItemProps): React.ReactElement {
  if (href) {
    return (
      <Link
        className="NavItemBase inline-flex w-full cursor-pointer items-center justify-start gap-2 self-stretch rounded-md bg-white px-3 py-2 hover:bg-gray-100"
        href={href}
      >
        <div className="Content flex h-6 shrink grow basis-0 items-center justify-start gap-3">
          <div className="h-6 w-6">{icon}</div>
          <div className="Text text-base font-semibold leading-normal text-slate-700">{label}</div>
        </div>
      </Link>
    );
  }

  return (
    <div
      className="NavItemBase inline-flex cursor-pointer items-center justify-start gap-2 self-stretch rounded-md bg-white px-3 py-2 hover:bg-gray-100"
      onClick={onClick}
    >
      <div className="Content flex h-6 shrink grow basis-0 items-center justify-start gap-3">
        <div className="h-6 w-6">{icon}</div>
        <div className="Text font-['Inter'] text-base font-semibold leading-normal text-slate-700">{label}</div>
      </div>
    </div>
  );
}

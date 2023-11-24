import React from 'react';
import { Link } from '@org/ui-kit';

import { cn } from '@org/ui-kit';

export interface ConversationNavItemProps {
  title: string;
  href: string;
  active?: boolean;
}

export function ConversationNavItem({ title, active, href }: ConversationNavItemProps): React.ReactElement {
  return (
    <Link
      href={href}
      className={cn(
        'NavItemBase relative flex items-center justify-start gap-2 rounded-md bg-white px-3 py-2 hover:bg-gray-100',
        active && 'bg-gray-100'
      )}
      title={title}
    >
      <div className="Text relative grow truncate text-base text-slate-700">
        {title}
        {/*<div className="absolute bottom-0 right-0 top-0 w-8 bg-gradient-to-l from-white to-transparent"></div>*/}
      </div>
    </Link>
  );
}

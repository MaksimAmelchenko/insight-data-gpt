import React from 'react';
import { Link } from '@org/ui-kit';

export interface ConversationNavItemProps {
  title: string;
  href: string;
}

export function ConversationNavItem({ title, href }: ConversationNavItemProps): React.ReactElement {
  return (
    <Link
      href={href}
      className="NavItemBase flex items-center justify-start gap-2 rounded-md bg-white px-3 py-2 hover:bg-gray-100"
    >
      <div className="Text text-base text-slate-700">{title}</div>
    </Link>
  );
}

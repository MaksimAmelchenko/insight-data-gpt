import React from 'react';
import { observer } from 'mobx-react-lite';

import { Chart } from './Chart';
import { ContentType, IMessage } from '../../types/conversation';
import { Markdown } from './Markdown';
import { ReactComponent as LogoIcon } from '../../icons/logo.svg';
import { Text } from './Text';
import { cn } from '@org/ui-kit';

export interface MessageProps {
  message: IMessage;
  className?: string;
}

const View: Record<ContentType, React.FC<{ children: string }>> = {
  [ContentType.Text]: Text,
  [ContentType.Markdown]: Markdown,
  [ContentType.Chart]: Chart,
};

export const Message = observer<MessageProps>(({ message, className }) => {
  const { role, contentType, content } = message;
  const ViewComponent = View[contentType];

  return (
    <div className={cn('flex gap-3 py-2 px-4 text-base md:gap-6 md:px-6 lg:px-6 w-full', className)}>
      <div className="relative flex shrink-0">
        <div className="pt-0.5">
          {role === 'user' ? (
            <img alt="User" loading="lazy" className="h-6 w-6 rounded-full" src="https://i.pravatar.cc/150?img=56" />
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-[2rem] bg-amber-200 text-gray-900">
              <LogoIcon className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
      <div className="flex grow flex-col overflow-x-hidden">
        <div className="select-none font-semibold">{role === 'user' ? 'You' : 'InsightDataGPT'}</div>
        <ViewComponent>{content}</ViewComponent>
      </div>
    </div>
  );
});

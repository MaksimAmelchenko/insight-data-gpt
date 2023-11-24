import React from 'react';
import { observer } from 'mobx-react-lite';

import { Chart } from './Chart';
import { ContentType, IMessage } from '../../../types/conversation';
import { Markdown } from './Markdown';
import { ReactComponent as LogoIcon } from '../../../icons/logo.svg';
import { Text } from './Text';

export interface MessageProps {
  message: IMessage;
}

const View: Record<ContentType, React.FC<{ children: string }>> = {
  [ContentType.Text]: Text,
  [ContentType.Markdown]: Markdown,
  [ContentType.Chart]: Chart,
};

export const Message = observer<MessageProps>(({ message }) => {
  const { role, contentType, content } = message;
  const ViewComponent = View[contentType];

  return (
    <div className="w-full">
      <div className="m-auto justify-center p-4 text-base md:gap-6 md:py-6">
        <div className="mx-auto flex flex-1 gap-3 text-base md:max-w-3xl md:gap-6 md:px-5  lg:max-w-[40rem] lg:px-1 xl:max-w-[48rem] xl:px-5">
          <div className="relative flex shrink-0 flex-col items-end">
            <div>
              <div className="pt-0.5">
                {role === 'user' ? (
                  <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
                    <div className="relative flex">
                      <img
                        alt="User"
                        loading="lazy"
                        className="h-6 w-6 rounded-sm"
                        src="https://i.pravatar.cc/150?img=56"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-[2rem] bg-amber-200 text-gray-900">
                    <LogoIcon className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="relative flex w-full flex-col lg:w-[calc(100%-115px)]">
            <div className="select-none font-semibold">{role === 'user' ? 'You' : 'InsightDataGPT'}</div>
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex max-w-full grow flex-col gap-0">
                <ViewComponent>{content}</ViewComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

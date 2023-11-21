import React from 'react';

import { TextArea } from '@org/ui-kit';

import { ReactComponent as LogoIcon } from '../../icons/logo.svg';

function Home(): React.ReactElement {
  const [message, setMessage] = React.useState('');

  const handleStartConversation = () => {
    console.log('Start conversation:' + message);
    setMessage('');
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      <div className="container inset-0 flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-amber-200 text-gray-900">
            <LogoIcon className="h-12 w-auto" />
          </div>
          <div className="mb-5 text-2xl font-medium">How can I help you today?</div>
        </div>
      </div>

      <div className="container flex shrink flex-col items-center justify-center">
        <TextArea
          name="message"
          value={message}
          minRows={1}
          placeholder="Message InsightDataGPT..."
          onChange={event => {
            setMessage(event.currentTarget.value);
          }}
          onKeyDown={event => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              handleStartConversation();
            }
            console.log('Not Enter');
          }}
        />
        <div className="relative p-2 text-center text-xs text-gray-600 dark:text-gray-300 md:px-[60px]">
          <span>InsightDataGPT can make mistakes. Consider checking important information.</span>
        </div>
      </div>
    </div>
  );
}

export default Home;

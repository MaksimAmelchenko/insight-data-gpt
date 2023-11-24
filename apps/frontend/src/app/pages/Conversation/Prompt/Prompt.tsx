import React, { useState } from 'react';

import { TextArea } from '@org/ui-kit';

export interface PromptProps {
  onSubmit: (text: string) => void;
}

export function Prompt({ onSubmit }: PromptProps): React.ReactElement {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!message) {
      return;
    }
    onSubmit(message);
    setMessage('');
  };

  return (
    <div className="container flex shrink flex-col items-center justify-center md:max-w-3xl lg:max-w-[50rem] xl:max-w-[60rem]">
      <TextArea
        name="message"
        value={message}
        autoFocus
        minRows={1}
        placeholder="Message InsightDataGPT..."
        onChange={event => {
          setMessage(event.currentTarget.value);
        }}
        onKeyDown={event => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
          }
        }}
      />
      <div className="relative p-2 text-center text-xs text-gray-600 dark:text-gray-300 md:px-[60px]">
        <span>InsightDataGPT can make mistakes. Consider checking important information.</span>
      </div>
    </div>
  );
}

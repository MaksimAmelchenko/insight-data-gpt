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
    <div>
      <TextArea
        name="message"
        value={message}
        autoFocus
        minRows={1}
        placeholder="Message InsightDataGPT..."
        onChange={event => {
          setMessage(event.currentTarget.value);
        }}
        className="w-full"
        onKeyDown={event => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
          }
        }}
      />
      <div className="py-2 text-center text-[10px] text-gray-600 sm:text-xs">
        InsightDataGPT can make mistakes. Consider checking important information.
      </div>
    </div>
  );
}

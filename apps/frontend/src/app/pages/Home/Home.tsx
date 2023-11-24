import React from 'react';

import { ConversationRepository } from '../../stores/conversation-repository';
import { Prompt } from '../Conversation/Prompt/Prompt';
import { ReactComponent as LogoIcon } from '../../icons/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../core/hooks/use-store';

function Home(): React.ReactElement {
  const conversationRepository = useStore(ConversationRepository);

  const navigate = useNavigate();

  const handleStartConversation = async (message: string) => {
    const conversation = await conversationRepository.startConversation({ message });
    navigate(`/conversations/${conversation.id}`);
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      <div className="container flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-amber-200 text-gray-900">
            <LogoIcon className="h-12 w-auto" />
          </div>
          <div className="mb-5 text-2xl font-medium">How can I help you today?</div>
        </div>
        <Prompt onSubmit={handleStartConversation} />
      </div>
    </div>
  );
}

export default Home;

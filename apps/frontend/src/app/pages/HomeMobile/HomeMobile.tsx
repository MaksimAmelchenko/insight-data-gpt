import React from 'react';
import { observer } from 'mobx-react-lite';

import { AppBar } from '../../components/AppBar/AppBar';
import { AppBarButton } from '../../components/AppBar/AppBarButton/AppBarButton';
import { AppStore } from '../../stores/app-store';
import { ConversationRepository } from '../../stores/conversation-repository';
import { Menu03Icon } from '@org/ui-kit';
import { Prompt } from '../../components/Prompt/Prompt';
import { ReactComponent as LogoIcon } from '../../icons/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../core/hooks/use-store';

export const HomeMobile = observer(() => {
  const conversationRepository = useStore(ConversationRepository);

  const navigate = useNavigate();

  const handleStartConversation = async (message: string) => {
    const conversation = await conversationRepository.startConversation({ message });
    navigate(`/conversations/${conversation.id}`);
  };

  return (
    <div className="pb-safe-bottom flex h-full flex-col">
      <AppBar title="Insight Data GPT" />

      <main className="relative flex h-full w-full flex-1 flex-col overflow-hidden">
        <div className="container flex flex-1 flex-col items-center justify-center px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-amber-200 text-gray-900">
              <LogoIcon className="h-12 w-auto" />
            </div>
            <div className="mb-5 text-2xl font-medium">How can I help you today?</div>
          </div>
          <Prompt onSubmit={handleStartConversation} />
        </div>
      </main>
    </div>
  );
});

export default HomeMobile;

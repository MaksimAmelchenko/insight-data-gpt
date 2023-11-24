import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';

import { ConversationRepository } from '../../stores/conversation-repository';
import { Message } from './Message/Message';
import { Prompt } from './Prompt/Prompt';
import { useStore } from '../../core/hooks/use-store';

const Conversation = observer(() => {
  const conversationRepository = useStore(ConversationRepository);
  const { conversationId } = useParams<'conversationId'>();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleAddMessage = async (message: string) => {
    if (!conversationId) {
      return;
    }
    await conversationRepository.addMessage(conversationId, message);

    requestAnimationFrame(() => {
      containerRef.current?.scrollTo({
        top: containerRef.current?.scrollHeight,
        behavior: 'smooth',
      });
    });
  };

  const conversation = conversationId && conversationRepository.getConversation(conversationId);

  // if open new conversation, then scroll to bottom instantly
  useEffect(() => {
    requestAnimationFrame(() => {
      containerRef.current?.scrollTo({
        top: containerRef.current?.scrollHeight,
        behavior: 'instant',
      });
    });
  }, [conversationId]);

  // scroll to bottom when new chunk of messages is loaded
  useEffect(() => {
    if (!conversation) {
      return;
    }

    const dispose = reaction(
      () => conversation.messages[conversation.messages.length - 1].content,
      () => {
        requestAnimationFrame(() => {
          containerRef.current?.scrollTo({
            top: containerRef.current?.scrollHeight,
            behavior: 'smooth',
          });
        });
      }
    );

    return () => dispose();
  }, [conversation]);

  if (!conversation) {
    return <Navigate to="/" />;
  }

  const { messages } = conversation;

  return (
    <div className="relative flex h-full w-full flex-col gap-4 overflow-hidden">
      <div className="flex flex-1 flex-col overflow-auto" ref={containerRef}>
        {messages.map(message => {
          return <Message message={message} key={message.id} />;
        })}
      </div>

      <Prompt onSubmit={handleAddMessage} />
    </div>
  );
});

export default Conversation;

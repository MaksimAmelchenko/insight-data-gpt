import { action, makeObservable, observable } from 'mobx';

import { ConversationEntity, IConversation, IMessage } from '../../types/conversation';
import { Message } from './message';
import { TDateTime } from '../../types';

export class Conversation implements IConversation {
  id: string;
  title: string;
  messages: IMessage[];
  createdAt: TDateTime;
  updatedAt: TDateTime;

  constructor({ id, title, messages, createdAt, updatedAt }: ConversationEntity) {
    makeObservable(this, {
      messages: observable.shallow,
      addMessage: action,
      mergeMessage: action,
    });

    this.id = id;
    this.title = title;
    this.messages = messages;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  addMessage(message: IMessage): void {
    this.messages.push(new Message(message));
  }

  getMessage(messageId: string): IMessage | undefined {
    return this.messages.find(({ id }) => id === messageId);
  }

  mergeMessage(message: IMessage): void {
    const m = this.getMessage(message.id)
    if (m) {
      m.mergeContent(message.content);
    } else {
      this.addMessage(message);
    }
  }
}

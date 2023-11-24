import { action, makeObservable, observable } from 'mobx';

import { ContentType, IMessage, MessageEntity } from '../../types/conversation';
import { TDateTime } from '../../types';

export class Message implements IMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  contentType: ContentType;
  content: string;
  createdAt: TDateTime;
  updatedAt: TDateTime;

  constructor({ id, conversationId, role, contentType, content, createdAt, updatedAt }: MessageEntity) {
    makeObservable(this, {
      content: observable,
      mergeContent: action,
    });

    this.id = id;
    this.conversationId = conversationId;
    this.role = role;
    this.contentType = contentType;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  mergeContent(content: string): void {
    this.content = content;
  }
}

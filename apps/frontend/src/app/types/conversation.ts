import { Message } from '../stores/models/message';
import { TDateTime } from './index';

export interface ConversationDTO {
  id: string;
  title: string;
  messages: MessageDTO[];
  createdAt: TDateTime;
  updatedAt: TDateTime;
}

export interface MessageDTO {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  contentType: ContentType;
  content: string;
  createdAt: TDateTime;
  updatedAt: TDateTime;
}

export enum ContentType {
  Text = 'text',
  Markdown = 'markdown',
  Chart = 'chart',
}

export interface ConversationEntity extends Omit<ConversationDTO, 'messages'> {
  messages: Message[];
}

export interface IConversation extends ConversationEntity {
  addMessage(message: IMessage): void;
}

export interface MessageEntity extends MessageDTO {}

export interface IMessage extends MessageEntity {
  mergeContent(content: string): void;
}

export interface GetConversationsResponse {
  conversations: ConversationDTO[];
}

export interface CreateConversationData {
  message: string;
}

export interface CreateConversationResponse {
  conversation: ConversationDTO;
}

export interface IConversationApi {
  getConversations: () => Promise<GetConversationsResponse>;
  createConversation: (data: CreateConversationData) => Promise<CreateConversationResponse>;
  addMessage: (conversationId: string, message: string) => Promise<{ message: MessageDTO }>;
}

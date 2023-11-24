import { IRequestContext, TDateTime } from '../../types/app';

export interface IConversationDAO {
  id: string;
  userId: string;
  title: string;
  messages: MessageDAO[];
  createdAt: TDateTime;
  updatedAt: TDateTime;
}

type BaseMessage = {
  id: string;
  userId: string;
  conversationId: string;
  role: 'user' | 'assistant';
  createdAt: TDateTime;
  updatedAt: TDateTime;
};

type TextMessage = BaseMessage & {
  contentType: ContentType.Text;
  content: string;
};

type MarkdownMessage = BaseMessage & {
  contentType: ContentType.Markdown;
  content: string;
};

type ChartMessage = BaseMessage & {
  contentType: ContentType.Chart;
  content: unknown;
};

export type MessageDAO = TextMessage | MarkdownMessage | ChartMessage;

export enum ContentType {
  Text = 'text',
  Markdown = 'markdown',
  Chart = 'chart',
}

export interface CreateMessageData {
  role: 'user' | 'assistant';
  contentType: ContentType;
  content: string;
}

export interface IConversationEntity extends IConversationDAO {}
export interface IConversation extends IConversationEntity {}
export interface ConversationDTO extends IConversation {}

export type MessageEntity = MessageDAO;
export type Message = MessageEntity;
export type MessageDTO = Message;

export interface CreateConversationRepositoryData {
  message: string;
}

export type CreateConversationServiceData = CreateConversationRepositoryData;

export type UpdateConversationRepositoryChanges = Partial<{
  [key: string]: any;
}>;

export type UpdateConversationServiceChanges = UpdateConversationRepositoryChanges;

export interface IConversationRepository {
  createConversation(
    ctx: IRequestContext,
    userId: string,
    data: CreateConversationRepositoryData
  ): Promise<IConversationDAO>;

  getConversation(ctx: IRequestContext, userId: string, conversationId: string): Promise<IConversationDAO | undefined>;

  getConversations(ctx: IRequestContext, userId: string): Promise<IConversationDAO[]>;

  updateConversation(
    ctx: IRequestContext,
    userId: string,
    conversationId: string,
    changes: UpdateConversationRepositoryChanges
  ): Promise<IConversationDAO>;

  addMessage(ctx: IRequestContext, userId: string, conversationId: string, message: MessageDAO): Promise<MessageDAO>;

  updateMessageContent(
    ctx: IRequestContext,
    userId: string,
    conversationId: string,
    messageId: string,
    content: string
  ): Promise<MessageDAO>;

  deleteConversation(ctx: IRequestContext, userId: string, conversationId: string): Promise<void>;
}

export interface IConversationService {
  createConversation(ctx: IRequestContext, userId: string, data: CreateConversationServiceData): Promise<IConversation>;

  getConversation(ctx: IRequestContext, userId: string, conversationId: string): Promise<IConversation>;

  updateConversation(
    ctx: IRequestContext,
    userId: string,
    conversationId: string,
    changes: UpdateConversationServiceChanges
  ): Promise<IConversation>;

  addMessage(
    ctx: IRequestContext<unknown, true>,
    userId: string,
    conversationId: string,
    data: CreateMessageData
  ): Promise<Message>;

  deleteConversation(ctx: IRequestContext, userId: string, conversationId: string): Promise<void>;
}

export interface IConversationMapper {
  toDomain(conversation: IConversationDAO): IConversation;
  toDTO(conversation: IConversation): ConversationDTO;
}

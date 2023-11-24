import * as uuid from 'uuid';
import { PassThrough } from 'node:stream';

import { NotFoundError } from '../../libs/errors';
import {
  IConversationRepository,
  IConversationService,
  CreateConversationServiceData,
  IConversation,
  UpdateConversationServiceChanges,
  MessageDAO,
  ContentType,
  Message,
  CreateMessageData,
} from './types';
import { IRequestContext } from '../../types/app';
import { conversationMapper } from './conversation.mapper';
import { conversationRepository } from './conversation.repository';

import mockedResponses from './mocks';

import { increasingStringParts } from './increasing-string-parts';

let counter = 0;

class ConversationServiceImpl implements IConversationService {
  private conversationRepository: IConversationRepository;

  // keep clients in memory to implement Server-Sent Events
  private clients: Map<string, PassThrough> = new Map();

  constructor({ conversationRepository }: { conversationRepository: IConversationRepository }) {
    this.conversationRepository = conversationRepository;
  }

  async createConversation(
    ctx: IRequestContext<unknown, true>,
    userId: string,
    data: CreateConversationServiceData
  ): Promise<IConversation> {
    const { id: conversationId } = await this.conversationRepository.createConversation(ctx, userId, data);
    const { message } = data;

    await this.addMessage(ctx, userId, conversationId, {
      role: 'user',
      contentType: ContentType.Text,
      content: message,
    });

    return this.getConversation(ctx, userId, conversationId);
  }

  async getConversation(
    ctx: IRequestContext<unknown, false>,
    userId: string,
    conversationId: string
  ): Promise<IConversation> {
    const conversationDAO = await this.conversationRepository.getConversation(ctx, userId, conversationId);
    if (!conversationDAO) {
      throw new NotFoundError('Conversation not found');
    }

    return conversationMapper.toDomain(conversationDAO);
  }

  async getConversations(ctx: IRequestContext<unknown, false>, userId: string): Promise<IConversation[]> {
    const conversationDAOs = await this.conversationRepository.getConversations(ctx, userId);
    return conversationDAOs.map(conversationDAO => conversationMapper.toDomain(conversationDAO));
  }

  async updateConversation(
    ctx: IRequestContext<unknown, true>,
    userId: string,
    conversationId: string,
    changes: UpdateConversationServiceChanges
  ): Promise<IConversation> {
    await this.conversationRepository.updateConversation(ctx, userId, conversationId, changes);

    return this.getConversation(ctx, userId, conversationId);
  }

  async addMessage(
    ctx: IRequestContext<unknown, true>,
    userId: string,
    conversationId: string,
    data: CreateMessageData
  ): Promise<Message> {
    const { sessionId } = ctx;
    const { role, contentType, content } = data;
    const messageDAO: MessageDAO = {
      id: uuid.v4(),
      userId,
      conversationId,
      role,
      contentType,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await this.conversationRepository.addMessage(ctx, userId, conversationId, messageDAO);

    this.publishMessage(sessionId, messageDAO);

    if (role === 'user') {
      this.askAssistant(ctx, userId, conversationId, messageDAO).catch(console.error);
    }

    return messageDAO;
  }

  async mergeMessage(
    ctx: IRequestContext<unknown, true>,
    userId: string,
    conversationId: string,
    message: MessageDAO
  ): Promise<Message> {
    const { sessionId } = ctx;
    const conversationDAO = await this.conversationRepository.getConversation(ctx, userId, conversationId);
    if (!conversationDAO) {
      throw new NotFoundError('Conversation not found');
    }
    let messageDAO = conversationDAO.messages.find(({ id }) => id === message.id);

    if (!messageDAO) {
      messageDAO = await this.conversationRepository.addMessage(ctx, userId, conversationId, message);
      this.publishMessage(sessionId, message);
    } else {
      messageDAO.content = message.content;
    }

    this.publishMessage(sessionId, messageDAO);
    return messageDAO;
  }

  async deleteConversation(ctx: IRequestContext<unknown, true>, userId: string, conversationId: string): Promise<void> {
    await this.getConversation(ctx, userId, conversationId);

    return this.conversationRepository.deleteConversation(ctx, userId, conversationId);
  }

  subscribeToMessages(ctx: IRequestContext<unknown, true>, sessionId: string, stream: PassThrough): any {
    this.clients.set(sessionId, stream);

    return e => {
      console.log('unsubscribe', { e });
      this.clients.delete(sessionId);
    };
  }

  publishMessage(sessionId: string, message: Message): void {
    const client = this.clients.get(sessionId);
    if (!client) {
      return;
    }
    client.write(`data: ${JSON.stringify(message)}\n\n`);
  }

  async askAssistant(
    ctx: IRequestContext<unknown, true>,
    userId: string,
    conversationId: string,
    message: Message
  ): Promise<void> {
    // take a random response from the mocked responses
    // const response = mockedResponses[Math.floor(Math.random() * mockedResponses.length)];

    // take a response from the mocked responses in order
    const response = mockedResponses[counter++ % mockedResponses.length];

    const { contentType, content } = response;

    const assistantMessage: MessageDAO = {
      id: uuid.v4(),
      userId,
      conversationId,
      role: 'assistant',
      contentType,
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const step = contentType === ContentType.Chart ? 1000 : 50;

    // emulate chunked response
    const stringifiedContent = typeof content === 'string' ? content : JSON.stringify(content);
    for await (const part of increasingStringParts(stringifiedContent, step, 300)) {
      assistantMessage.content = part;
      await this.mergeMessage(ctx, userId, conversationId, assistantMessage);
    }
  }
}

export const conversationService = new ConversationServiceImpl({ conversationRepository });

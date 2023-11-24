import * as uuid from 'uuid';

import {
  CreateConversationRepositoryData,
  IConversationDAO,
  IConversationRepository,
  MessageDAO,
  UpdateConversationRepositoryChanges,
} from './types';
import { IRequestContext } from '../../types/app';
import { NotFoundError } from '../../libs/errors';

// "store" for conversations
// it is not a real store, just a variable for demo purposes
let conversations: IConversationDAO[] = [];

class ConversationRepositoryImpl implements IConversationRepository {
  async createConversation(
    ctx: IRequestContext,
    userId: string,
    data: CreateConversationRepositoryData
  ): Promise<IConversationDAO> {
    ctx.log.trace({ data }, 'try to create conversation');

    const conversationId = uuid.v4();

    conversations.push({
      id: conversationId,
      userId,
      title: `Conversation ${new Date().toISOString()}`,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    ctx.log.info({ conversationId }, 'created conversation');

    return (await this.getConversation(ctx, userId, conversationId)) as IConversationDAO;
  }

  async getConversation(
    ctx: IRequestContext,
    userId: string,
    conversationId: string
  ): Promise<IConversationDAO | undefined> {
    ctx.log.trace({ conversationId }, 'try to get conversation');

    // return ConversationDAO.query(ctx.trx).findById(conversationId);
    return conversations.find(conversation => conversation.id === conversationId);
  }

  async getConversations(ctx: IRequestContext): Promise<IConversationDAO[]> {
    ctx.log.trace('try to get all conversations');
    // return ConversationDAO.query(ctx.trx);
    return conversations;
  }

  async updateConversation(
    ctx: IRequestContext,
    userId: string,
    conversationId: string,
    changes: UpdateConversationRepositoryChanges
  ): Promise<IConversationDAO> {
    ctx.log.trace({ conversationId, changes }, 'try to update conversation');

    // await ConversationDAO.query(ctx.trx)
    //   .patch({
    //     name,
    //   })
    //   .where({
    //     id: conversationId,
    //   });

    ctx.log.info({ conversationId }, 'updated conversation');

    return (await this.getConversation(ctx, userId, conversationId)) as IConversationDAO;
  }

  async addMessage(
    ctx: IRequestContext,
    userId: string,
    conversationId: string,
    message: MessageDAO
  ): Promise<MessageDAO> {
    ctx.log.trace({ conversationId, message }, 'try to add message to conversation');
    const conversation = await this.getConversation(ctx, userId, conversationId);

    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }
    conversation.messages.push(message);

    ctx.log.info({ conversationId }, 'added message to conversation');

    return message;
  }

  async updateMessageContent(
    ctx: IRequestContext,
    userId: string,
    conversationId: string,
    messageId: string,
    content: string
  ): Promise<MessageDAO> {
    ctx.log.trace({ conversationId, content }, 'try to update message in conversation');
    const conversation = await this.getConversation(ctx, userId, conversationId);

    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }
    const messageIndex = conversation.messages.findIndex(message => message.id === messageId);

    if (messageIndex === -1) {
      throw new NotFoundError('Message not found');
    }
    const message = conversation.messages[messageIndex];
    message.content = content;

    ctx.log.info({ conversationId, messageId }, 'updated message in conversation');

    return message;
  }

  async deleteConversation(ctx: IRequestContext, userId: string, conversationId: string): Promise<void> {
    ctx.log.trace({ conversationId }, 'try to delete conversation');

    // await ConversationDAO.query(ctx.trx).deleteById(conversationId);
    conversations = conversations.filter(conversation => conversation.id !== conversationId);
  }
}

export const conversationRepository = new ConversationRepositoryImpl();

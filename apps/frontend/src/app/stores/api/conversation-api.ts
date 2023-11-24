import { ApiRepository } from '../api-repository';

import {
  CreateConversationData,
  CreateConversationResponse,
  GetConversationsResponse,
  IConversationApi,
  MessageDTO,
} from '../../types/conversation';

export class ConversationApi extends ApiRepository implements IConversationApi {
  static override storeName = 'ConversationApi';

  createConversation(data: CreateConversationData): Promise<CreateConversationResponse> {
    return this.fetch<CreateConversationResponse>({
      method: 'POST',
      url: '/v1/conversations',
      body: data,
    });
  }

  getConversations(): Promise<GetConversationsResponse> {
    return this.fetch<GetConversationsResponse>({
      method: 'GET',
      url: '/v1/conversations',
    });
  }

  addMessage(conversationId: string, message: string): Promise<{ message: MessageDTO }> {
    return this.fetch<{ message: MessageDTO }>({
      method: 'POST',
      url: `/v1/conversations/${conversationId}/messages`,
      body: {
        message,
      },
    });
  }
}

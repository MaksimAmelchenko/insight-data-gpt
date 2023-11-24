import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { parseISO } from 'date-fns';

import { AuthRepository } from './auth-repository';
import { Conversation } from './models/conversation';
import { ConversationDTO, CreateConversationData, IConversationApi, IMessage } from '../types/conversation';
import { MainStore } from '../core/main-store';
import { ManageableStore } from '../core/manageable-store';
import { Message } from './models/message';

const apiServer = process.env.NX_API_SERVER;

export class ConversationRepository extends ManageableStore {
  static storeName = 'ConversationRepository';
  _conversations: Conversation[] = [];

  constructor(mainStore: MainStore, private api: IConversationApi) {
    super(mainStore);
    makeObservable(this, {
      _conversations: observable,
      conversations: computed,
      clear: action,
    });
  }

  private decode(conversationDTO: ConversationDTO): Conversation {
    const { messages: messageDTOs, ...rest } = conversationDTO;
    const messages = messageDTOs.map(message => new Message(message));
    return new Conversation({ ...rest, messages });
  }

  getConversation(conversationId: string): Conversation | undefined {
    return this._conversations.find(({ id }) => id === conversationId);
  }

  async fetchConversations(): Promise<void> {
    const { conversations } = await this.api.getConversations();
    runInAction(() => {
      this._conversations = conversations.map(conversation => this.decode(conversation));
    });
  }

  async startConversation(data: CreateConversationData): Promise<Conversation> {
    const { conversation: conversationDTO } = await this.api.createConversation(data);
    const conversation = this.decode(conversationDTO);
    runInAction(() => {
      this._conversations.push(conversation);
    });
    return conversation;
  }

  async addMessage(conversationId: string, text: string): Promise<void> {
    await this.api.addMessage(conversationId, text);
  }

  mergeMessage(message: IMessage): void {
    const conversation = this.getConversation(message.conversationId);
    if (!conversation) {
      return;
    }

    conversation.mergeMessage(message);
  }

  get conversations(): Conversation[] {
    return this._conversations
      .slice()
      .sort((a, b) => parseISO(b.updatedAt).getTime() - parseISO(a.updatedAt).getTime());
  }

  subscribeToMessages() {
    const accessToken = this.getStore(AuthRepository).accessToken;
    const events = new EventSource(`${apiServer}/v1/conversations/messages?accessToken=${accessToken}`);

    events.onmessage = event => {
      const message = JSON.parse(event.data);

      const conversation = this.getConversation(message.conversationId);
      if (!conversation) {
        // console.info('Conversation not found', message);
        return;
      }
      this.mergeMessage(new Message(message));
    };
  }

  clear(): void {
    this._conversations = [];
  }
}

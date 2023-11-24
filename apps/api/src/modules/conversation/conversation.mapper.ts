import { IConversation, IConversationDAO, ConversationDTO, IConversationMapper } from './types';

class ConversationMapperImpl implements IConversationMapper {
  toDomain(conversationDAO: IConversationDAO): IConversation {
    return {
      ...conversationDAO,
    };
  }

  toDTO(conversation: IConversation): ConversationDTO {
    return {
      ...conversation,
    };
  }
}

export const conversationMapper = new ConversationMapperImpl();

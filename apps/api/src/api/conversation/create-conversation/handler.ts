import { ConversationDTO, CreateConversationServiceData } from '../../../modules/conversation/types';
import { IRequestContext } from '../../../types/app';
import { IResponse } from '../../../libs/rest-api/types';
import { conversationMapper } from '../../../modules/conversation/conversation.mapper';
import { conversationService } from '../../../modules/conversation/conversation.service';

export async function handler(
  ctx: IRequestContext<CreateConversationServiceData, true>
): Promise<IResponse<{ conversation: ConversationDTO }>> {
  const {
    user: { id: userId },
    params,
  } = ctx;
  const conversation = await conversationService.createConversation(ctx, userId, params);

  return {
    body: {
      conversation: conversationMapper.toDTO(conversation),
    },
  };
}

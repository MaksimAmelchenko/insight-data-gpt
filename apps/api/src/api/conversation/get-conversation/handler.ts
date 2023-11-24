import { ConversationDTO } from '../../../modules/conversation/types';
import { IRequestContext } from '../../../types/app';
import { IResponse } from '../../../libs/rest-api/types';
import { conversationMapper } from '../../../modules/conversation/conversation.mapper';
import { conversationService } from '../../../modules/conversation/conversation.service';

interface RequestParams {
  conversationId: string;
}

export async function handler(
  ctx: IRequestContext<RequestParams, true>
): Promise<IResponse<{ conversation: ConversationDTO }>> {
  const {
    user,
    params: { conversationId },
  } = ctx;
  const conversation = await conversationService.getConversation(ctx, user.id, conversationId);

  return {
    body: {
      conversation: conversationMapper.toDTO(conversation),
    },
  };
}

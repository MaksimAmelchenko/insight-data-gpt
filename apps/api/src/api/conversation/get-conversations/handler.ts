import { ConversationDTO } from '../../../modules/conversation/types';
import { IRequestContext } from '../../../types/app';
import { IResponse } from '../../../libs/rest-api/types';
import { conversationMapper } from '../../../modules/conversation/conversation.mapper';
import { conversationService } from '../../../modules/conversation/conversation.service';

export async function handler(
  ctx: IRequestContext<unknown, true>
): Promise<IResponse<{ conversations: ConversationDTO[] }>> {
  const { user } = ctx;
  const conversations = await conversationService.getConversations(ctx, user.id);

  return {
    body: {
      conversations: conversations.map(conversation => conversationMapper.toDTO(conversation)),
    },
  };
}

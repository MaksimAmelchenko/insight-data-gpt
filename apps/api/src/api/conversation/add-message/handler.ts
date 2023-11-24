import { StatusCodes } from 'http-status-codes';

import { ContentType } from '../../../modules/conversation/types';
import { IAccepted } from '../../../libs/rest-api/types';
import { IRequestContext } from '../../../types/app';
import { conversationService } from '../../../modules/conversation/conversation.service';

export async function handler(ctx: IRequestContext<any, true>): Promise<IAccepted> {
  const {
    user,
    params: { conversationId, message },
  } = ctx;
  await conversationService.addMessage(ctx, user.id, conversationId, {
    role: 'user',
    contentType: ContentType.Text,
    content: message,
  });

  return {
    status: StatusCodes.ACCEPTED,
  };
}

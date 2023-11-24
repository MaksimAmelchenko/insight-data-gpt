import { handler } from './handler';
import { RestMethod, RestRouteOptions } from '../../../libs/rest-api/types';

import { deleteConversationParamsSchema } from './params.schema';

export const deleteConversation: RestRouteOptions = {
  method: RestMethod.Delete,
  uri: '/v1/conversations/:conversationId',
  handler,
  schemas: {
    params: deleteConversationParamsSchema,
  },
};

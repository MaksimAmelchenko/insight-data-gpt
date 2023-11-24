import { handler } from './handler';
import { RestMethod, RestRouteOptions } from '../../../libs/rest-api/types';

import { getConversationParamsSchema } from './params.schema';
import { getConversationResponseSchema } from './response.schema';

export const getConversation: RestRouteOptions = {
  method: RestMethod.Get,
  uri: '/v1/conversations/:conversationId',
  handler,
  schemas: {
    params: getConversationParamsSchema,
    response: getConversationResponseSchema,
  },
};

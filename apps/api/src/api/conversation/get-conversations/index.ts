import { handler } from './handler';
import { RestMethod, RestRouteOptions } from '../../../libs/rest-api/types';

import { getConversationsParamsSchema } from './params.schema';
import { getConversationsResponseSchema } from './response.schema';

export const getConversations: RestRouteOptions = {
  method: RestMethod.Get,
  uri: '/v1/conversations',
  handler,
  schemas: {
    params: getConversationsParamsSchema,
    response: getConversationsResponseSchema,
  },
};

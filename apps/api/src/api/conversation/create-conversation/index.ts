import { handler } from './handler';
import { RestMethod, RestRouteOptions } from '../../../libs/rest-api/types';
import { createConversationParamsSchema } from './params.schema';
import { createConversationResponseSchema } from './response.schema';

export const createConversationRoute: RestRouteOptions = {
  method: RestMethod.Post,
  uri: '/v1/conversations',
  handler,
  schemas: {
    params: createConversationParamsSchema,
    response: createConversationResponseSchema,
  },
};

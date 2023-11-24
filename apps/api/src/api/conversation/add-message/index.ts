import { handler } from './handler';
import { RestMethod, RestRouteOptions } from '../../../libs/rest-api/types';

import { addMessageParamsSchema } from './params.schema';

export const addMessageRoute: RestRouteOptions = {
  method: RestMethod.Post,
  uri: '/v1/conversations/:conversationId/messages',
  handler,
  schemas: {
    params: addMessageParamsSchema,
  },
};

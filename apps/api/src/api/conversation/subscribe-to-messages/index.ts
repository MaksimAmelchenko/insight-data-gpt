import { handler } from './handler';
import { RestMethod, RestRouteOptions } from '../../../libs/rest-api/types';

export const subscribeToMessagesRoute: RestRouteOptions = {
  method: RestMethod.Get,
  uri: '/v1/conversations/messages',
  handler,
};

import { handler } from './handler';
import { RestMethod, RestRouteOptions } from '../../../libs/rest-api/types';

import { deleteProfileParamsSchema } from './params.schema';

export const deleteProfile: RestRouteOptions = {
  method: RestMethod.Delete,
  uri: '/v1/profile',
  handler,
  schemas: {
    params: deleteProfileParamsSchema,
  },
};

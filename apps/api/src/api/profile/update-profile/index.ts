import { handler } from './handler';
import { RestMethod, RestRouteOptions } from '../../../libs/rest-api/types';
import { updateProfileParamsSchema } from './params.schema';
import { updateProfileResponseSchema } from './response.schema';

export const updateProfile: RestRouteOptions = {
  method: RestMethod.Patch,
  uri: '/v1/profile',
  handler,
  schemas: {
    params: updateProfileParamsSchema,
    response: updateProfileResponseSchema,
  },
};

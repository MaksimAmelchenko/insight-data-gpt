import { OpenAPIV3_1 } from 'openapi-types';

import { id } from '../../../common/schemas/parameters/id';

export const addMessageParamsSchema: OpenAPIV3_1.SchemaObject = {
  type: 'object',
  properties: {
    conversationId: id,
    message: {
      type: 'string',
      minLength: 1,
    },
  },
  additionalProperties: false,
};

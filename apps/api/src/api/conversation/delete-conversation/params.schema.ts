import { OpenAPIV3_1 } from 'openapi-types';

import { id } from '../../../common/schemas/parameters/id';

export const deleteConversationParamsSchema: OpenAPIV3_1.SchemaObject = {
  type: 'object',
  properties: {
    conversationId: id,
  },
  additionalProperties: false,
  required: ['conversationId'],
};

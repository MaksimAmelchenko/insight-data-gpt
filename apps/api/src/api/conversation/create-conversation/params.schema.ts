import { OpenAPIV3_1 } from 'openapi-types';

export const createConversationParamsSchema: OpenAPIV3_1.SchemaObject = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      minLength: 1,
    },
  },
  additionalProperties: false,
};

import { OpenAPIV3_1 } from 'openapi-types';

import { conversationSchema } from '../conversation.schema';

export const getConversationsResponseSchema: OpenAPIV3_1.SchemaObject = {
  type: 'object',
  properties: {
    conversations: {
      type: 'array',
      items: conversationSchema,
    }
  },
  additionalProperties: false,
  required: ['conversations'],
};

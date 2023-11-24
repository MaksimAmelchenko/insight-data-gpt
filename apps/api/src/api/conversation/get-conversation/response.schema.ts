import { OpenAPIV3_1 } from 'openapi-types';

import { conversationSchema } from '../conversation.schema';

export const getConversationResponseSchema: OpenAPIV3_1.SchemaObject = {
  type: 'object',
  properties: {
    conversation: conversationSchema,
  },
  additionalProperties: false,
  required: ['conversation'],
};

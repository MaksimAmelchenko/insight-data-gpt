import { OpenAPIV3_1 } from 'openapi-types';

import { ContentType } from '../../modules/conversation/types';
import { dateTime } from '../../common/schemas/fields/date-time';
import { id } from '../../common/schemas/fields/id';

export const conversationSchema: OpenAPIV3_1.SchemaObject = {
  type: 'object',
  properties: {
    id,
    tile: {
      type: 'string',
    },
    messages: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id,
          role: {
            type: 'string',
            enum: ['assistant', 'user'],
          },
          contentType: {
            type: 'string',
            enum: [ContentType.Text, ContentType.Markdown, ContentType.Chart],
          },
          content: {
            type: ['string', 'object'],
          },
          createdAt: dateTime,
          updatedAt: dateTime,
        },
      },
    },
    createdAt: dateTime,
    updatedAt: dateTime,
  },
  // additionalProperties: false,
  required: [
    //
    'id',
    'title',
    'messages',
    'createdAt',
    'updatedAt',
  ],
};

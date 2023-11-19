import { OpenAPIV3_1 } from 'openapi-types';

import { id } from '../../../common/schemas/fields/id';
import { dateTime } from '../../../common/schemas/fields/date-time';

export const sessionSchema: OpenAPIV3_1.SchemaObject = {
  type: 'object',
  properties: {
    id,
    userId: id,
    lastAccessTime: dateTime,
    ip: {
      type: 'string',
    },
    requestsCount: {
      type: 'integer',
    },
    userAgent: {
      type: 'string',
    },
    isActive: {
      type: 'boolean',
    },
    createdAt: dateTime,
    updatedAt: dateTime,
  },
  additionalProperties: false,
  required: [
    //
    'userId',
    'ip',
    'requestsCount',
    'lastAccessTime',
    'isActive',
    'userAgent',
  ],
};

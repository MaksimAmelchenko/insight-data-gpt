import { OpenAPIV3_1 } from 'openapi-types';

import { dateTime } from '../../../common/schemas/fields/date-time';
import { email } from '../../../common/schemas/fields/email';

export const userDAOSchema: OpenAPIV3_1.SchemaObject = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    email,
    password: {
      type: 'string',
    },
    isEmailSubscription: {
      type: 'boolean',
    },
    createdAt: dateTime,
    updatedAt: dateTime,
  },
  additionalProperties: false,
  required: [
    'id',
    'name',
    'email',
    'password',
    'isEmailSubscription',
  ],
};

import { OpenAPIV3_1 } from 'openapi-types';

import { email } from './fields/email';
import { id } from './fields/id';

export const profileSchema: OpenAPIV3_1.SchemaObject = {
  type: 'object',
  properties: {
    id,
    name: {
      type: 'string',
      example: 'John Doe',
      minLength: 1,
    },
    email,
  },
  required: ['id', 'name', 'email'],
  additionalProperties: false,
};

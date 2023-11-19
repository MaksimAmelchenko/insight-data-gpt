import { OpenAPIV3_1 } from 'openapi-types';

import { email } from '../../common/schemas/fields/email';
import { id } from '../../common/schemas/fields/id';

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
    isEmailSubscription: {
      type: 'boolean',
    },
  },
  additionalProperties: false,
  required: [
    //
    'id',
    'name',
    'email',
    'isEmailSubscription',
  ],
};

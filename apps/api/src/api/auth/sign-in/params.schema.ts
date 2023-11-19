import { OpenAPIV3_1 } from 'openapi-types';

export const signInParamsSchema: OpenAPIV3_1.SchemaObject = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 1,
      example: 'john',
    },
    password: {
      type: 'string',
      minLength: 1,
      example: '123456',
    },
  },
  required: ['username', 'password'],
  additionalProperties: false,
};

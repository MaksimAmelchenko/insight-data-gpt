import { OpenAPIV3_1 } from 'openapi-types';

export const deleteProfileParamsSchema: OpenAPIV3_1.SchemaObject = {
  type: 'object',
  properties: {
    password: {
      type: 'string',
      minLength: 1,
    },
  },
  additionalProperties: false,
  required: ['password'],
};

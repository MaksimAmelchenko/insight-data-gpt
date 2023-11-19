import { OpenAPIV3_1 } from 'openapi-types';

export const updateProfileParamsSchema: OpenAPIV3_1.SchemaObject = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
  },
  additionalProperties: false,
};

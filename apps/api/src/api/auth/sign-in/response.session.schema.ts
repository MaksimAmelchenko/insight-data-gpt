import { OpenAPIV3_1 } from 'openapi-types';

export const sessionSchema: OpenAPIV3_1.SchemaObject = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
      description: 'Bearer Token',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiIwM2FmNjIyOS05ZmQyLTRiMmMtYWFkOS1kMjk0MGIwZWE0OGMiLCJpYXQiOjE2NjQ4MTE3NjV9.QtnyKcHngBfOiqY-WpsfXuoPWi0fxQLVu09LSQ-eVoU',
    },
  },
  additionalProperties: false,
  required: ['accessToken'],
};

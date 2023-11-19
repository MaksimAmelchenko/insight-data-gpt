import { OpenAPIV3_1 } from 'openapi-types';

import { header } from '../header';
import { sessionSchema } from '../../api/auth/sign-in/response.session.schema';
import { signInParamsSchema } from '../../api/auth/sign-in/params.schema';
import { signInResponseSchema } from '../../api/auth/sign-in/response.schema';
import { signOutParamsSchema } from '../../api/auth/sign-out/params.schema';
import { signOutResponseSchema } from '../../api/auth/sign-out/response.schema';

const auth: OpenAPIV3_1.Document = {
  ...header,
  tags: [
    {
      name: 'auth',
      description: '',
    },
  ],
  paths: {
    '/sign-in': {
      post: {
        tags: ['auth'],
        summary: '',
        description: '',
        requestBody: {
          content: {
            'application/json': {
              schema: signInParamsSchema,
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: signInResponseSchema,
              },
            },
          },
        },
      },
    } as OpenAPIV3_1.PathsObject,
    '/sign-out': {
      post: {
        tags: ['auth'],
        summary: '',
        description: '',
        requestBody: {
          content: {
            'application/json': {
              schema: signOutParamsSchema,
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: signOutResponseSchema,
              },
            },
          },
        },
      },
    } as OpenAPIV3_1.PathsObject,
  },
  components: {
    schemas: {
      session: sessionSchema,
    },
    parameters: {},
  },
};

export { auth };
export default auth;

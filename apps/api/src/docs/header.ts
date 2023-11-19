import { OpenAPIV3_1 } from 'openapi-types';

// const pkg = require('../package.json');

export const header: Pick<OpenAPIV3_1.Document, 'openapi' | 'info' | 'servers'> = {
  openapi: '3.1.0',
  info: {
    title: 'Chat.io Swagger',
    description: '',
    contact: { email: 'dev@chat.io' },
    // version: pkg.version,
    version: '1.0.0',
  },
  servers: [
    {
      url: 'https://chat.io/api/{basePath}',
      variables: {
        basePath: {
          default: 'v1',
        },
      },
    },
  ],
};

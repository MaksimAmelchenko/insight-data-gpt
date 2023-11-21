import { OpenAPIV3_1 } from 'openapi-types';

// const pkg = require('../package.json');

export const header: Pick<OpenAPIV3_1.Document, 'openapi' | 'info' | 'servers'> = {
  openapi: '3.1.0',
  info: {
    title: 'InsightDataGPT API',
    description: '',
    contact: { email: 'dev@insightdata.ai' },
    // version: pkg.version,
    version: '1.0.0',
  },
  servers: [
    {
      url: 'https://insightdata.ai/api/{basePath}',
      variables: {
        basePath: {
          default: 'v1',
        },
      },
    },
  ],
};

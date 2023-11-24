import { OpenAPIV3_1 } from 'openapi-types';

import { auth } from './auth/swagger';
import { conversation } from './conversation/swagger';
import { header } from './header';
import { profile } from './profile/swagger';

const swagger: OpenAPIV3_1.Document = {
  ...header,
  tags: [
    //
    ...(auth.tags || []),
    ...(profile.tags || []),
    ...(conversation.tags || []),
  ],
  paths: {
    ...auth.paths,
    ...profile.paths,
    ...conversation.paths,
  },
  components: {
    schemas: {
      ...(auth.components?.schemas || {}),
      ...(profile.components?.schemas || {}),
      ...(conversation.components?.schemas || {}),
    },
    parameters: {
      ...(auth.components?.parameters || {}),
      ...(profile.components?.parameters || {}),
      ...(conversation.components?.parameters || {}),
    },
  },
};

export default swagger;

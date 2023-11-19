import { OpenAPIV3_1 } from 'openapi-types';

import { auth } from './auth/swagger';
import { header } from './header';
import { profile } from './profile/swagger';

const swagger: OpenAPIV3_1.Document = {
  ...header,
  tags: [
    //
    ...(auth.tags || []),
    ...(profile.tags || []),
  ],
  paths: {
    ...auth.paths,
    ...profile.paths,
  },
  components: {
    schemas: {
      ...(auth.components?.schemas || {}),
      ...(profile.components?.schemas || {}),
    },
    parameters: {
      ...(auth.components?.parameters || {}),
      ...(profile.components?.parameters || {}),
    },
  },
};

export default swagger;

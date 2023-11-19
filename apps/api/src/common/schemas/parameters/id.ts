import { OpenAPIV3_1 } from 'openapi-types';

import { id as idField } from '../fields/id';

export const id: OpenAPIV3_1.SchemaObject = {
  ...idField,
  description: 'Taken from path',
};

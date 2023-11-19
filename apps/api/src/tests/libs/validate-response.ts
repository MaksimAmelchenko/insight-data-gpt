import supertest from 'supertest';
import { OpenAPIV3_1 } from 'openapi-types';

import { ajv } from '../../libs/ajv';

export function validateResponse(response: supertest.Response, schema: OpenAPIV3_1.SchemaObject): void {
  const validate = ajv.compile(schema);
  if (!validate(response.body)) {
    console.log(
      '[ERROR] response is: ',
      JSON.stringify(response.body, null, 2),
      JSON.stringify(ajv.errorsText(validate.errors), null, 2),
    );
    throw new Error(ajv.errorsText(validate.errors));
  }
}

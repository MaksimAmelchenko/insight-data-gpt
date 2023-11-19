import supertest from 'supertest';
import { StatusCodes } from 'http-status-codes';

import { TSignInResponse } from '../../types/auth';
import { signInResponseSchema } from '../../api/auth/sign-in/response.schema';
import { validateResponse } from './validate-response';

export async function signIn(
  request: supertest.SuperTest<supertest.Test>,
  username: string,
  password: string
): Promise<TSignInResponse> {
  const response: supertest.Response = await request
    .post('/v1/sign-in')
    .send({
      username,
      password,
    })
    .expect(StatusCodes.OK);

  validateResponse(response, signInResponseSchema);

  return response.body;
}

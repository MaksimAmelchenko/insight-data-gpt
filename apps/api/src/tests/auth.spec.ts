// NODE_ENV=development-test-local ./node_modules/.bin/mocha --require ts-node/register --exit ./tests/auth.ts

import http from 'node:http';
import supertest from 'supertest';
import { StatusCodes } from 'http-status-codes';

import { IRequestContext } from '../types/app';
import { app } from '../main';
import { createRequestContext } from './libs/create-request-context';
import { createUser } from './libs/create-user';
import { deleteUser } from './libs/delete-user';
import { errorResponseSchema } from '../common/schemas/error.response.schema';
import { signInResponseSchema } from '../api/auth/sign-in/response.schema';
import { validateResponse } from './libs/validate-response';

let server: http.Server;
let request: supertest.SuperTest<supertest.Test>;

const username = 'test@chat.io';
const password = 'password';

let ctx: IRequestContext<never, true>;

describe('Auth', function (): void {
  // this.timeout(10000);

  beforeAll(async () => {
    ctx = (await createRequestContext()) as IRequestContext<never, true>;

    server = app.listen();
    request = supertest(server);
    await deleteUser(ctx, username);
  });

  afterAll(async () => {
    server.close();
  });

  beforeEach(async () => {
    await createUser(ctx, {
      username,
      password,
    });
  });

  afterEach(async () => {
    await deleteUser(ctx, username);
  });

  describe('User Sign In', () => {
    it('should sign in by lower-cased username', async () => {
      const response: supertest.Response = await request
        .post('/v1/sign-in')
        .send({
          username: ` ${username.toUpperCase()} `,
          password,
        })
        .expect(StatusCodes.OK);

      validateResponse(response, signInResponseSchema);
    });

    it('should not sign in by wrong username', async () => {
      const response: supertest.Response = await request
        .post('/v1/sign-in')
        .send({
          username: 'wrongUsername',
          password,
        })
        .expect(StatusCodes.UNAUTHORIZED);

      validateResponse(response, errorResponseSchema);
    });

    it('should not sign in by wrong password', async () => {
      const response: supertest.Response = await request
        .post('/v1/sign-in')
        .send({
          username,
          password: 'wrongPassword',
        })
        .expect(StatusCodes.UNAUTHORIZED);

      validateResponse(response, errorResponseSchema);
    });
  });
});

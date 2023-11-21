import { ApiRepository } from '../api-repository';
import { IAuthApi } from '../auth-repository';
import { SessionResponse } from '../../types/auth';

export class AuthApi extends ApiRepository implements IAuthApi {
  static override storeName = 'AuthApi';

  logIn(username: string, password: string): Promise<SessionResponse> {
    return this.fetch<SessionResponse>({
      url: '/v1/sign-in',
      method: 'POST',
      body: {
        username,
        password,
      },
    });
  }

  logOut(): Promise<void> {
    return this.fetch<void>({
      url: '/v1/sign-out',
      method: 'POST',
    });
  }
}

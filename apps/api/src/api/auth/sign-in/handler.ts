import { IRequestContext } from '../../../types/app';
import { Auth } from '../../../services/auth';
import { SessionResponse } from '../../../types/auth';
import { IResponse } from '../../../libs/rest-api/types';

export async function handler(
  ctx: IRequestContext<{ username: string; password: string }, false>
): Promise<IResponse<SessionResponse>> {
  const { username, password } = ctx.params;
  const { accessToken }: SessionResponse = await Auth.signIn(ctx, username, password);

  return {
    body: {
      accessToken,
    },
  };
}

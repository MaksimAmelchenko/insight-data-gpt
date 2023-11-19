import { IRequestContext } from '../../../types/app';
import { Session } from '../../session/model/session';
import { SessionService } from '../../session';
import { TSignInResponse } from '../../../types/auth';
import { authenticateUser } from './authenticate-user';

export async function signIn(ctx: IRequestContext, username: string, password: string): Promise<TSignInResponse> {
  const { userAgent, ip } = ctx.additionalParams;

  const user = await authenticateUser(ctx, username, password);

  const session: Session = await SessionService.createSession(ctx, user.id, {
    userAgent,
    ip,
  });

  const token = SessionService.getJwt(session.id);

  return {
    authorization: token,
  };
}

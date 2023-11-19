import { IJwtPayload } from '../../services/session/types';
import { IRequestContext } from '../../types/app';
import { Session } from '../../services/session/model/session';
import { SessionService } from '../../services/session';
import { UnauthorizedError } from '../errors';
import { resolveAuthorizationHeader } from './resolve-authorization-header';
import { signOutRouteOptions } from '../../api/auth/sign-out';
import { userService } from '../../modules/user/user.service';

const notUpdateAccessTimeRoutes: string[] = [signOutRouteOptions.uri];

export async function authorize(
  ctx: IRequestContext<unknown, true>,
  authorizationHeader: string,
  url: string
): Promise<void> {
  const token = resolveAuthorizationHeader(authorizationHeader);

  let sessionId: string;
  try {
    const payload: IJwtPayload = SessionService.verifyJwt(token);
    sessionId = payload.sessionId;
  } catch (err) {
    throw new UnauthorizedError({ code: 'jsonWebTokenError' });
  }
  const session: Session = await SessionService.getSession(ctx, sessionId);

  const user = await userService.getUser(ctx, session.userId);

  if (signOutRouteOptions.uri !== url) {
    if (!session.isActive) {
      throw new UnauthorizedError('Session is closed', { code: 'sessionClosed' });
    }
  }

  const isUpdateAccessTime = !notUpdateAccessTimeRoutes.includes(url);
  if (isUpdateAccessTime) {
    // we don't need to wait for this operation
    SessionService.updateSessionAccessTime(ctx, session.id).catch(err => {
      ctx.log.error({ err }, 'Update session access time error');
    });
  }

  ctx.sessionId = session.id;
  ctx.user = user;

  ctx.log = ctx.log.child(
    {
      sessionId: ctx.sessionId,
      userId: ctx.user.id,
    },
    true
  );
}

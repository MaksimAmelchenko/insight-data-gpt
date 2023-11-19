import { raw } from 'objection';

import { IRequestContext } from '../../../../types/app';
import { Session } from '../../model/session';
import { UpdateSessionGatewayChanges } from '../../types';

export async function updateSession(
  ctx: IRequestContext,
  sessionId: string,
  changes: UpdateSessionGatewayChanges
): Promise<Session> {
  ctx.log.trace({ changes }, 'try to update session');

  return Session.query(ctx.trx).patchAndFetchById(sessionId, {
    ...changes,
    requestsCount: raw('requests_count + 1'),
  });
}

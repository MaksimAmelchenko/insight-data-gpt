import { PassThrough } from 'stream';

import { ByPass } from '../../../libs/rest-api/types';
import { IRequestContext, IRouterContext } from '../../../types/app';
import { conversationService } from '../../../modules/conversation/conversation.service';

export async function handler(ctx: IRequestContext<any, true>, routerContext: IRouterContext): Promise<ByPass> {
  const { sessionId } = ctx;
  const stream = new PassThrough();
  const unsubscribe = conversationService.subscribeToMessages(ctx, sessionId, stream);

  routerContext.req.on('finish', unsubscribe);
  routerContext.req.on('close', unsubscribe);

  // routerContext.request.socket.setTimeout(0);
  // routerContext.req.socket.setNoDelay(true);
  // routerContext.req.socket.setKeepAlive(true);
  // routerContext.req.setTimeout(0);

  routerContext.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  routerContext.body = stream;
  routerContext.type = 'text/event-stream';

  stream.write(': init\n\n');

  return {
    byPass: true,
  };
}

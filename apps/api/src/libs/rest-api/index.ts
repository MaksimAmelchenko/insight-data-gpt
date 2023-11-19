import Router from 'koa-router';

import { RestRouteOptions } from './types';
import { RestRoute } from './route';
import { IRouterContext } from '../../types/app';

function restRouteHandler<P, IsAuthorized extends boolean>(route: RestRoute<P, IsAuthorized>) {
  return async (ctx: IRouterContext, next: any) => {
    // try {
    //   await route.checkAccess(ctx);
    // } catch (error) {
    //   return sendError(ctx, { code: 403, error });
    // }

    return route.handler(ctx, next);
  };
}

export function getRestApi<P = unknown>(
  restRouteOptions: (RestRouteOptions<P, true> | RestRouteOptions<P, false>)[]
): Router.IMiddleware {
  const restRouter = restRouteOptions.reduce<Router<any, any>>((router, routeOptions) => {
    const routeUri: string = routeOptions.uri.startsWith('/') ? routeOptions.uri : `/${routeOptions.uri}`;
    const { method, methods } = routeOptions;
    const handler = restRouteHandler(new RestRoute(routeOptions));

    if (method) {
      (router as any)[method.toLowerCase()](routeUri, handler);
    } else {
      methods!.forEach(m => (router as any)[m.toLowerCase()](routeUri, handler));
    }
    return router;
  }, new Router());

  return restRouter.routes();
}

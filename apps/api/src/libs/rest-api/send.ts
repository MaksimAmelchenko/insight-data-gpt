import { ByPass, IContent, IResponse } from './types';
import { IRouterContext } from '../../types/app';

export function isContent(response: IResponse): response is IContent<any> {
  return 'body' in response;
}

export function isByPass(response: IResponse): response is ByPass {
  return 'byPass' in response;
}

export function send(routerContext: IRouterContext, response: IResponse): void {
  if (isByPass(response)) {
    console.log('isByPass');
    return;
  }

  if (isContent(response)) {
    const { body = {}, contentType = 'application/json; charset=utf-8', status = 200, ETag } = response;

    routerContext.status = status;
    routerContext.body = body;
    routerContext.set('Content-Type', contentType);
    if (ETag) {
      routerContext.set('ETag', ETag);
    }
    return;
  }

  routerContext.status = response.status;
}

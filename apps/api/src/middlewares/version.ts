import config from '../libs/config';

export default function (ctx: any, next: any) {
  const version = config.get('version');
  ctx.set('X-Version', version);
  return next();
}

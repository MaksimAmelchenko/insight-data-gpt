export default function (ctx: any, next: any) {
  if (ctx.path !== '/favicon.ico') {
    return next();
  }
}

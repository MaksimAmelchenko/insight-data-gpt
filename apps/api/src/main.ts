/* eslint-disable @typescript-eslint/no-var-requires */

import Koa from 'koa';
import { Model } from 'objection';
import helmet from 'koa-helmet';
import mount from 'koa-mount';
import serve from 'koa-static';

import config from './libs/config';
import { knex } from './knex';
import { log, logMiddleware, requestLogMiddleware } from './libs/log';
// import { sentryErrorHandler } from './libs/sentry';

import { authApi } from './api/auth';
import { healthCheck } from './api/health-check';
import { profileApi } from './api/profile';

const app: Koa = new Koa();

app.proxy = true;
Model.knex(knex);

app.use(helmet());
app.use(healthCheck.routes());
app.use(require('./middlewares/version').default);
app.use(require('./middlewares/cors').default);
app.use(require('./middlewares/favicon').default);
app.use(require('./middlewares/response-time').default);
app.use(logMiddleware(log));
app.use(require('./middlewares/errors').default);
app.use(requestLogMiddleware());
app.use(require('./middlewares/body-parser').default);

app.use(authApi);
app.use(profileApi);

// serve docs
app.use(async (ctx, next) => {
  if (ctx.path.endsWith('/docs')) {
    ctx.redirect('/docs/');
    return;
  }
  return next();
});

app.use(async (ctx, next) => {
  // GA does not work with this header
  ctx.res.removeHeader('content-security-policy');
  return next();
});

app.use(serve(`${__dirname}/public`));

const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
app.use(mount('/docs', serve(pathToSwaggerUi)));

app.use(async (ctx, next) => {
  if (ctx.path.endsWith('swagger.json')) {
    ctx.body = require(`.${ctx.path.replace('.json', '')}`).default;
    return;
  }
  return next();
});
//

if (require.main === module) {
  const port: number = config.get('port');
  const http = require('http');
  const server = http.createServer(app.callback());

  // app.on('error', (err, ctx) => sentryErrorHandler(err, ctx));

  server.listen(port, () => log.info(`Server started on ${port}`));
}

export { app };

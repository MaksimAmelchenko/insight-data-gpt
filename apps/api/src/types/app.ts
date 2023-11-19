import Bunyan from 'bunyan';
import Cookies from 'cookies';
import Koa from 'koa';
import Router from 'koa-router';
import { IUser } from '../modules/user/types';
import { Knex } from 'knex';

export type ILogger = Bunyan;

export type IRouterContext = Router.RouterContext<any, ContextCustomT>;

export type IRequestContext<P = unknown, isAuthorized extends boolean = false> = {
  params: P;
  additionalParams?: any;
  cookies: Cookies;
  trx?: Knex.Transaction;
} & ContextCustomT &
  (isAuthorized extends true ? IAuthorizedRequestContext : INotAuthorizedRequestContext);

export interface ContextCustomT {
  requestId: string;
  log: ILogger;
}

interface INotAuthorizedRequestContext {}

interface IAuthorizedRequestContext {
  sessionId: string;
  user: IUser;
}

export type Middleware = Koa.Middleware<any, ContextCustomT>;

export type KoaContext = Koa.ParameterizedContext<any, ContextCustomT>;

export interface IError {
  code: string;
  status: number;
  message: string;
  moreInfo?: string;
  stack?: string;
  data?: any;
}

export type TDate = string;
export type TDateTime = string;
export type TUrl = string;
export type THtml = string;
export type TMarkdown = string;
export type TText = string;
export type TJson = any;

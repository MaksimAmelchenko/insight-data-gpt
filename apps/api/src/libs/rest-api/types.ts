import { StatusCodes } from 'http-status-codes';
import { OpenAPIV3_1 } from 'openapi-types';
import { RequestHandler } from 'express';
import { ValidateFunction } from 'ajv';

import { IRequestContext, IRouterContext } from '../../types/app';

export type Schemas = {
  params?: OpenAPIV3_1.SchemaObject;
  response?: OpenAPIV3_1.SchemaObject;
};

export type SchemasValidators = {
  params: ValidateFunction;
  response: ValidateFunction;
};

export enum RestMethod {
  Get = 'GET',
  Post = 'POST',
  Patch = 'PATCH',
  Put = 'PUT',
  Delete = 'DELETE',
}

export interface RestRouteOptions<P = any, IsAuthorized extends boolean = true> {
  method?: RestMethod;
  methods?: RestMethod[];
  uri: string;
  uploader?: RequestHandler;
  onEnter?: (routerContext: IRouterContext, requestContext: IRequestContext<P, IsAuthorized>) => Promise<void>;
  schemas?: Schemas;
  handler: (ctx: IRequestContext<P, IsAuthorized>, routeCtx: IRouterContext, next: () => any) => Promise<IResponse>;
  isNeedAuthorization?: boolean;
  // permissions?: App.Permissions;
}

export interface IRestRoute {
  handler(ctx: IRouterContext, next?: () => any): Promise<any>;
}

export interface ICommonResponse {
  ETag?: string;
}

export interface IContent<T> extends ICommonResponse {
  body: T;
  status?: number;
  contentType?: string;
}

export interface IAccepted {
  status: StatusCodes.ACCEPTED;
}

export interface INoContent {
  status: StatusCodes.NO_CONTENT;
}

export interface INotModified {
  status: StatusCodes.NOT_MODIFIED;
}

export type IResponse<T = Record<string, any> | string> = IContent<T> | IAccepted | INoContent | INotModified;

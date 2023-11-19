import { JSONSchema, Model, ModelOptions, QueryContext, Validator } from 'objection';

import { ISession } from '../types';
import { TDateTime } from '../../../types/app';
import { ajvValidator } from '../../../libs/ajv';
import { sessionSchema } from './session.schema';

export class Session extends Model implements ISession {
  static tableName = 'core$.session';
  static jsonSchema = sessionSchema as JSONSchema;

  readonly id: string;
  readonly userId: string;
  isActive: boolean;
  ip: string;
  userAgent: string;
  requestsCount: number;
  lastAccessTime: TDateTime;
  createdAt: TDateTime;
  updatedAt: TDateTime;

  static createValidator(): Validator {
    return ajvValidator;
  }

  async $beforeInsert(queryContext: QueryContext) {
    await super.$beforeInsert(queryContext);
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  async $beforeUpdate(opt: ModelOptions, queryContext: QueryContext) {
    await super.$beforeUpdate(opt, queryContext);
    this.updatedAt = new Date().toISOString();
  }
}

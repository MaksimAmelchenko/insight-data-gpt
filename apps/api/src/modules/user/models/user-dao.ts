import { JSONSchema, Model, ModelOptions, QueryContext, Validator } from 'objection';

import { IUserDAO } from '../types';
import { TDateTime } from '../../../types/app';
import { ajvValidator } from '../../../libs/ajv';
import { userDAOSchema } from './user-dao.schema';

export class UserDAO extends Model implements IUserDAO {
  static tableName = 'core$.user';
  static jsonSchema = userDAOSchema as JSONSchema;

  readonly id: string;
  name: string;
  email: string;
  password: string;
  isEmailSubscription: boolean;
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

import * as uuid from 'uuid';
import { raw } from 'objection';

import { CreateUserRepositoryData, IUserDAO, UpdateUserRepositoryChanges, UserRepository } from './types';
import { IRequestContext } from '../../types/app';
import { UserDAO } from './models/user-dao';

class UserRepositoryImpl implements UserRepository {
  async createUser(ctx: IRequestContext, data: CreateUserRepositoryData): Promise<IUserDAO> {
    ctx.log.trace({ data }, 'try to create user');

    const { name, email, password, isEmailSubscription } = data;
    const userId = uuid.v4();

    const userDAO = await UserDAO.query(ctx.trx).insert({
      id: userId,
      name,
      email,
      password,
      isEmailSubscription,
    });

    ctx.log.info({ userId: userDAO.id }, 'created user');

    return (await this.getUser(ctx, userDAO.id)) as IUserDAO;
  }

  async getUser(ctx: IRequestContext, userId: string): Promise<IUserDAO | undefined> {
    ctx.log.trace({ userId }, 'try to get user');

    return UserDAO.query(ctx.trx).findById(userId);
  }

  async getUserByUsername(ctx: IRequestContext, username: string): Promise<IUserDAO | undefined> {
    ctx.log.trace({ username }, 'try to get user by username');
    return UserDAO.query(ctx.trx).findOne(raw('upper(email) = ?', [username.trim().toUpperCase()]));
  }

  async getUsers(ctx: IRequestContext): Promise<UserDAO[]> {
    ctx.log.trace('try to get all users');
    return UserDAO.query(ctx.trx);
  }

  async updateUser(ctx: IRequestContext, userId: string, changes: UpdateUserRepositoryChanges): Promise<IUserDAO> {
    ctx.log.trace({ userId, changes }, 'try to update user');
    const { name, password, isEmailSubscription } = changes;

    await UserDAO.query(ctx.trx)
      .patch({
        name,
        password,
        isEmailSubscription,
      })
      .where({
        id: userId,
      });

    ctx.log.info({ userId }, 'updated user');

    return (await this.getUser(ctx, userId)) as IUserDAO;
  }

  async deleteUser(ctx: IRequestContext, userId: string): Promise<void> {
    ctx.log.trace({ userId }, 'try to delete user');

    await UserDAO.query(ctx.trx).deleteById(userId);
  }
}

export const userRepository = new UserRepositoryImpl();

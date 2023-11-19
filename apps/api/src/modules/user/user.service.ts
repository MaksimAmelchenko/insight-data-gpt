import bcrypt from 'bcryptjs';

import { AccessDeniedError, NotFoundError, UnauthorizedError } from '../../libs/errors';
import {
  ChangePasswordServiceParams,
  CreateUserServiceData,
  DeleteUserServiceParams,
  IUser,
  UpdateUserServiceChanges,
  UserRepository,
  UserService,
} from './types';
import { IRequestContext } from '../../types/app';
import { hashPassword } from '../../services/auth/methods/hash-password';
import { userMapper } from './user.mapper';
import { userRepository } from './user.repository';

class UserServiceImpl implements UserService {
  private userRepository: UserRepository;

  constructor({ userRepository }: { userRepository: UserRepository }) {
    this.userRepository = userRepository;
  }

  async createUser(ctx: IRequestContext<unknown, true>, data: CreateUserServiceData): Promise<IUser> {
    const userDAO = await this.userRepository.createUser(ctx, data);

    return this.getUser(ctx, userDAO.id);
  }

  async getUser(ctx: IRequestContext<unknown, false>, userId: string): Promise<IUser> {
    const userDAO = await this.userRepository.getUser(ctx, userId);
    if (!userDAO) {
      throw new NotFoundError('User not found');
    }

    return userMapper.toDomain(userDAO);
  }

  async updateUser(
    ctx: IRequestContext<unknown, true>,
    userId: string,
    changes: UpdateUserServiceChanges
  ): Promise<IUser> {
    if (userId !== ctx.user.id) {
      throw new AccessDeniedError();
    }

    await this.userRepository.updateUser(ctx, userId, changes);

    return this.getUser(ctx, userId);
  }

  async changePassword(
    ctx: IRequestContext<unknown, true>,
    userId: string,
    params: ChangePasswordServiceParams
  ): Promise<void> {
    if (userId !== ctx.user.id) {
      throw new AccessDeniedError();
    }
    const { password, newPassword } = params;

    const user = await this.getUser(ctx, userId);

    const isValidPassword: boolean = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid password');
    }

    const hashedPassword = await hashPassword(newPassword);

    await this.userRepository.updateUser(ctx, userId, {
      password: hashedPassword,
    });
  }

  async deleteUser(
    ctx: IRequestContext<unknown, true>,
    userId: string,
    { password }: DeleteUserServiceParams
  ): Promise<void> {
    if (userId !== ctx.user.id) {
      throw new AccessDeniedError();
    }

    const user = await this.getUser(ctx, userId);

    const isValidPassword: boolean = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid password');
    }

    return this.userRepository.deleteUser(ctx, userId);
  }
}

export const userService = new UserServiceImpl({ userRepository });

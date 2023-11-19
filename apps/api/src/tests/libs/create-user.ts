import { IRequestContext } from '../../types/app';
import { IUser } from '../../modules/user/types';
import { hashPassword } from '../../services/auth/methods/hash-password';
import { userMapper } from '../../modules/user/user.mapper';
import { userRepository } from '../../modules/user/user.repository';

export interface CreateUser {
  username: string;
  password: string;
}

export async function createUser(ctx: IRequestContext, { username, password }: CreateUser): Promise<IUser> {
  const hashedPassword = await hashPassword(password);

  const user = await userRepository.createUser(ctx, {
    name: username,
    email: username,
    password: hashedPassword,
    isEmailSubscription: true,
  });

  return userMapper.toDomain(user);
}

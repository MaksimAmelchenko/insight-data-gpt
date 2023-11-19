import { IProfile, IUser, IUserDAO, IUserDTO, UserMapper } from './types';
import { User } from './models/user';

class UserMapperImpl implements UserMapper {
  toDomain(userDAO: IUserDAO): IUser {
    const { id, name, email, password, isEmailSubscription, createdAt, updatedAt } = userDAO;
    return new User({
      id,
      name,
      email,
      password,
      isEmailSubscription,
      createdAt,
      updatedAt,
    });
  }

  toDTO({ id, name, email }: IUser): IUserDTO {
    return {
      id,
      name,
      email,
    };
  }

  toProfile(user: IUser): IProfile {
    const { id, name, email, isEmailSubscription } = user;
    return {
      id,
      name,
      email,
      isEmailSubscription,
    };
  }
}

export const userMapper = new UserMapperImpl();

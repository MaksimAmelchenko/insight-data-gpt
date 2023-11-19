import { IRequestContext, TDateTime } from '../../types/app';

export interface IUserDAO {
  id: string;
  name: string;
  email: string;
  password: string;
  isEmailSubscription: boolean;
  createdAt: TDateTime;
  updatedAt: TDateTime;
}

export interface IUserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  isEmailSubscription: boolean;
  createdAt: TDateTime;
  updatedAt: TDateTime;
}

export interface IUser extends IUserEntity {}

export interface IUserDTO {
  id: string;
  name: string;
  email: string;
}

export interface IProfile {
  id: string;
  name: string;
  email: string;
  isEmailSubscription: boolean;
}

export interface CreateUserRepositoryData {
  name: string;
  email: string;
  password: string;
  isEmailSubscription: boolean;
}

export type CreateUserServiceData = CreateUserRepositoryData;

export type UpdateUserRepositoryChanges = Partial<{
  name: string;
  password: string;
  isEmailSubscription: boolean;
}>;

export type UpdateUserServiceChanges = Omit<UpdateUserRepositoryChanges, 'password'>;

export type ChangePasswordServiceParams = {
  password: string;
  newPassword: string;
};

export type DeleteUserServiceParams = {
  password: string;
};

export interface UserRepository {
  createUser(ctx: IRequestContext, data: CreateUserRepositoryData): Promise<IUserDAO>;

  getUser(ctx: IRequestContext, userId: string): Promise<IUserDAO | undefined>;

  getUsers(ctx: IRequestContext): Promise<IUserDAO[]>;

  updateUser(ctx: IRequestContext, userId: string, changes: UpdateUserRepositoryChanges): Promise<IUserDAO>;

  deleteUser(ctx: IRequestContext, userId: string): Promise<void>;
}

export interface UserService {
  createUser(ctx: IRequestContext, data: CreateUserServiceData): Promise<IUser>;

  getUser(ctx: IRequestContext, userId: string): Promise<IUser>;

  updateUser(ctx: IRequestContext, userId: string, changes: UpdateUserServiceChanges): Promise<IUser>;

  changePassword(
    ctx: IRequestContext<unknown, true>,
    userId: string,
    params: ChangePasswordServiceParams
  ): Promise<void>;

  deleteUser(ctx: IRequestContext, userId: string, params: DeleteUserServiceParams): Promise<void>;
}

export interface UserMapper {
  toDomain(user: IUserDAO): IUser;
  toDTO(user: IUser): IUserDTO;
  toProfile(user: IUser): IProfile;
}

import { IUser, IUserEntity } from '../types';
import { TDateTime } from '../../../types/app';

export class User implements IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isEmailSubscription: boolean;
  createdAt: TDateTime;
  updatedAt: TDateTime;

  constructor({ id, name, email, password, isEmailSubscription, createdAt, updatedAt }: IUserEntity) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.isEmailSubscription = isEmailSubscription;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

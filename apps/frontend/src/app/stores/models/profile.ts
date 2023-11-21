import { IProfile } from '../../types/profile';

export class Profile implements IProfile {
  id: string;
  name: string;
  email: string;

  constructor({ id, name, email }: IProfile) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

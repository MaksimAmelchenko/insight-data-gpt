import { action, makeObservable, observable } from 'mobx';

import { AuthRepository } from './auth-repository';
import { DeleteProfileParams, IProfileApi, IProfileDTO, UpdateProfileChanges } from '../types/profile';
import { MainStore } from '../core/main-store';
import { ManageableStore } from '../core/manageable-store';
import { Profile } from './models/profile';
import { useStore } from '../core/hooks/use-store';

export class ProfileRepository extends ManageableStore {
  static storeName = 'ProfileRepository';
  profile: Profile | null = null;

  constructor(mainStore: MainStore, private api: IProfileApi) {
    super(mainStore);
    makeObservable(this, {
      profile: observable,
      consume: action,
      clear: action,
    });
  }

  consume({ id, name, email }: IProfileDTO): void {
    this.profile = new Profile({
      id,
      name,
      email,
    });
  }

  async getProfile(): Promise<void> {
    const { profile } = await this.api.getProfile();
    this.consume(profile);
  }

  async updateProfile(changes: UpdateProfileChanges): Promise<void> {
    return this.api.updateProfile(changes).then(({ profile }) => {
      this.consume(profile);
    });
  }

  async deleteProfile(params: DeleteProfileParams): Promise<void> {
    return this.api.deleteProfile(params).then(() => {
      this.getStore(AuthRepository).clearAuth();
    });
  }

  clear(): void {
    this.profile = null;
  }
}

export function useProfile(): Profile | null {
  const profileRepository = useStore(ProfileRepository);
  return profileRepository.profile;
}

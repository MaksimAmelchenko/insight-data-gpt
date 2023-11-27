import { ApiRepository } from '../api-repository';

import {
  DeleteProfileParams,
  GetProfileResponse,
  IProfileApi,
  UpdateProfileChanges,
  UpdateProfileResponse,
} from '../../types/profile';

export class ProfileApi extends ApiRepository implements IProfileApi {
  static override storeName = 'ProfileApi';

  getProfile(): Promise<GetProfileResponse> {
    return this.fetch<GetProfileResponse>({
      method: 'GET',
      url: `/v1/profile`,
    });
  }

  updateProfile(changes: UpdateProfileChanges): Promise<UpdateProfileResponse> {
    return this.fetch<UpdateProfileResponse>({
      method: 'PATCH',
      url: `/v1/profile`,
      body: changes,
    });
  }

  deleteProfile(params: DeleteProfileParams): Promise<void> {
    return this.fetch<void>({
      method: 'DELETE',
      url: `/v1/profile`,
      body: params,
    });
  }
}

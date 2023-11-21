export interface IProfileDTO {
  id: string;
  name: string;
  email: string;
}

export interface IProfile extends IProfileDTO {}

export interface GetProfileResponse {
  profile: IProfileDTO;
}

export type UpdateProfileChanges = Partial<{
  name: string;
}>;

export interface UpdateProfileResponse {
  profile: IProfileDTO;
}

export type DeleteProfileParams = {
  password: string;
};

export interface IProfileApi {
  getProfile: () => Promise<GetProfileResponse>;
  updateProfile: (changes: UpdateProfileChanges) => Promise<UpdateProfileResponse>;
  deleteProfile: (params: DeleteProfileParams) => Promise<void>;
}

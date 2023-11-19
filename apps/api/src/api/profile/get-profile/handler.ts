import { IProfile } from '../../../modules/user/types';
import { IRequestContext } from '../../../types/app';
import { IResponse } from '../../../libs/rest-api/types';
import { userMapper } from '../../../modules/user/user.mapper';

export async function handler(ctx: IRequestContext<unknown, true>): Promise<IResponse<{ profile: IProfile }>> {
  const { user } = ctx;

  return {
    body: {
      profile: userMapper.toProfile(user),
    },
  };
}

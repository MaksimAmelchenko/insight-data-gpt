import { getRestApi } from '../../libs/rest-api';

import { signInRouteOptions } from './sign-in';
import { signOutRouteOptions } from './sign-out';

export const authApi = getRestApi([
  //
  signInRouteOptions,
  signOutRouteOptions,
]);

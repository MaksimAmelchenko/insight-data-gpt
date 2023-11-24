import { action, computed, makeObservable, observable } from 'mobx';

import { CommonStorageStore } from './common-storage-store';

import { SessionResponse } from '../types/auth';
import { MainStore } from '../core/main-store';
import { ManageableStore } from '../core/manageable-store';
import { SessionStorageStore } from './session-storage-store';
import { ProfileRepository } from './profile-repository';

export interface IAuthApi {
  logIn: (username: string, password: string) => Promise<SessionResponse>;
  logOut: () => Promise<void>;
}

interface ISignInParams {
  username: string;
  password: string;
}

export class AuthRepository extends ManageableStore {
  static storeName = 'AuthRepository';

  accessToken: string | null = null;

  constructor(mainStore: MainStore, private api: IAuthApi) {
    super(mainStore);
    makeObservable<AuthRepository, 'processGrant'>(this, {
      accessToken: observable,
      hasAuth: computed,
      processGrant: action,
      clear: action,
    });

    const commonStorageStore = this.getStore(CommonStorageStore);
    const sessionStorageStore = this.getStore(SessionStorageStore);
    const username = commonStorageStore.get('username');
    const accessToken = sessionStorageStore.get('accessToken');
    if (accessToken && username) {
      // TODO handle the error
      this.processLogin(accessToken, username);
    }
  }

  /**
   * Whether we signed in under any user or not
   * @return {boolean}
   */
  get hasAuth(): boolean {
    return Boolean(this.accessToken);
  }

  /**
   * Do log-in request to API, and remembers returned data
   * @param {ISignInParams} params
   * @return {Promise<void>}
   */
  async logIn({ username, password }: ISignInParams): Promise<void> {
    const { accessToken } = await this.api.logIn(username, password);
    return await this.processLogin(accessToken, username);
  }

  /**
   * Sign out of current session
   * Also clears all repositories on successful operation
   */

  logOut(): Promise<boolean> {
    this.api.logOut().catch(() => {});
    this.clearAuth();
    return Promise.resolve(true);
  }

  // /**
  //  * Clear all auth data, logical logout for the client
  //  * For real logout, please use SignOut method
  //  */

  clearAuth(): void {
    this._mainStore.clearStores();
  }

  clear(): void {
    this.accessToken = null;
    this.getStore(SessionStorageStore).removeItem('token');
  }

  async processLogin(accessToken: string, username: string): Promise<void> {
    this.getStore(CommonStorageStore).set('username', username);
    return this.processGrant(accessToken);
  }

  private async processGrant(accessToken: string): Promise<void> {
    this.accessToken = accessToken;
    this.getStore(SessionStorageStore).set('accessToken', accessToken);
    await Promise.all([
      //
      this.getStore(ProfileRepository).getProfile(),
    ]);
  }
}

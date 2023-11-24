import { AuthApi } from '../stores/api/auth-api';
import { AuthRepository } from '../stores/auth-repository';
import { CommonStorageStore } from '../stores/common-storage-store';
import { ConversationApi } from '../stores/api/conversation-api';
import { ConversationRepository } from '../stores/conversation-repository';
import { MainStore } from './main-store';
import { ProfileApi } from '../stores/api/profile-api';
import { ProfileRepository } from '../stores/profile-repository';
import { SessionStorageStore } from '../stores/session-storage-store';

/**
 * Helper to initialize DI
 * @return {MainStore}
 */

export function initializeMainStore(): MainStore {
  const mainStore = new MainStore();
  new CommonStorageStore(mainStore);
  new SessionStorageStore(mainStore);

  new ProfileRepository(mainStore, new ProfileApi(mainStore));
  new AuthRepository(mainStore, new AuthApi(mainStore));
  new ConversationRepository(mainStore, new ConversationApi(mainStore));

  if (process.env.NODE_ENV === 'development') {
    (window as any).mainStore = mainStore;
  }
  return mainStore;
}

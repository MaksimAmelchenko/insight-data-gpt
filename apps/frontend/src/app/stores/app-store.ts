import { action, makeObservable, observable } from 'mobx';

import { MainStore } from '../core/main-store';
import { ManageableStore } from '../core/manageable-store';
import { SideSheet } from '../pages/SettingsMobile/types';

export class AppStore extends ManageableStore {
  static storeName = 'AppStore';

  isOpenedSettings = false;
  isOpenedSidebar = false;

  settingSideSheet: SideSheet = SideSheet.None;

  constructor(mainStore: MainStore) {
    super(mainStore);
    makeObservable(this, {
      isOpenedSettings: observable,
      isOpenedSidebar: observable,

      openSettings: action,
      closeSettings: action,

      openSidebar: action,
      closeSidebar: action,
      clear: action,
    });
  }

  openSidebar(): void {
    this.isOpenedSidebar = true;
  }

  closeSidebar(): void {
    this.isOpenedSidebar = false;
  }

  openSettings(sideSheet: SideSheet, params: any = null): void {
    this.isOpenedSettings = true;
    this.settingSideSheet = sideSheet;
  }

  closeSettings(): void {
    this.isOpenedSettings = false;
    this.settingSideSheet = SideSheet.None;
  }

  clear(): void {}
}

import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { AppStore } from '../../stores/app-store';
import { AuthRepository } from '../../stores/auth-repository';
import { BackButton, Header } from '../../components/Header/Header';
import { CreditCard01Icon, LogOut01Icon, User01Icon } from '@org/ui-kit';
import { MenuItem } from './MenuItem/MenuItem';
import { ProfileMobile } from '../ProfileMobile/ProfileMobile';
import { SettingsMobileProps, SideSheet } from './types';
import { SideSheetBody } from '../../components/SideSheetMobile/SideSheetBody/SideSheetBody';
import { analytics } from '../../lib/analytics';
import { useStore } from '../../core/hooks/use-store';

import styles from './SettingsMobile.module.scss';

export const SettingsMobile = observer<SettingsMobileProps>(({ onClose }) => {
  const authRepository = useStore(AuthRepository);
  const appStore = useStore(AppStore);
  const [sideSheet, setSideSheet] = useState<SideSheet>(appStore.settingSideSheet);

  useEffect(() => {
    analytics.view({
      page_title: 'settings-mobile',
    });
  }, []);

  const handleMenuItemClick = useCallback((menuItemId: string) => {
    const sideSheet = menuItemId as SideSheet;
    setSideSheet(sideSheet);
  }, []);

  const handleCloseSideSheet = useCallback(() => {
    setSideSheet(SideSheet.None);
  }, []);

  return (
    <>
      <Header title="Settings" startAdornment={<BackButton onClick={onClose} />} />
      <SideSheetBody className={styles.root}>
        <section className={styles.menuSection}>
          <div className={styles.menuSection__content}>
            <MenuItem
              menuItemId={SideSheet.Profile}
              icon={<User01Icon />}
              text="Profile settings"
              onClick={handleMenuItemClick}
            />
            <MenuItem
              menuItemId={SideSheet.Billing}
              icon={<CreditCard01Icon />}
              text="Billing & plans"
              onClick={handleMenuItemClick}
            />
            <MenuItem
              menuItemId="signOut"
              icon={<LogOut01Icon />}
              text="Log out"
              expandButton={false}
              onClick={() => authRepository.logOut()}
            />
          </div>
        </section>
      </SideSheetBody>

      <ProfileMobile open={sideSheet === SideSheet.Profile} onClose={handleCloseSideSheet} />

      {/*<BillingMobile open={sideSheet === SideSheet.Billing} onClose={handleCloseSideSheet} />*/}
    </>
  );
});

export default SettingsMobile;

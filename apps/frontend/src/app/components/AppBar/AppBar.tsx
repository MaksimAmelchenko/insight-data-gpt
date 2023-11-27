import React from 'react';
import { observer } from 'mobx-react-lite';

import { AppBarButton } from './AppBarButton/AppBarButton';
import { AppStore } from '../../stores/app-store';
import { Menu03Icon, MessageQuestionSquareIcon, Settings02Icon } from '@org/ui-kit';
import { SettingsMobileLazy } from '../../pages/SettingsMobile/SettingsMobileLazy';
import { SideSheetMobile } from '../SideSheetMobile/SideSheetMobile';
import { useStore } from '../../core/hooks/use-store';

import styles from './AppBar.module.scss';
import { SideSheet } from '../../pages/SettingsMobile/types';
import { useNavigate } from 'react-router-dom';

export interface AppBarProps {
  title: string;
  // startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export const AppBar = observer<AppBarProps>(({ title, endAdornment: EndAdornment }) => {
  const appStore = useStore(AppStore);

  const navigate = useNavigate();

  const handleSettingsClick = () => {
    appStore.openSettings(SideSheet.None);
  };

  const handleSettingsClose = () => {
    appStore.closeSettings();
  };

  return (
    <>
      <header className={styles.root}>
        <AppBarButton
          icon={<Menu03Icon />}
          onClick={() => {
            appStore.openSidebar();
          }}
        />
        <div className={styles.root__title} onClick={() => navigate('/')}>
          {title}
        </div>
        {EndAdornment}
        {Boolean(EndAdornment) && <div className={styles.root__separator} />}
        <AppBarButton icon={<MessageQuestionSquareIcon />} href="/help" />
        <AppBarButton icon={<Settings02Icon />} onClick={handleSettingsClick} />
      </header>

      <SideSheetMobile open={appStore.isOpenedSettings}>
        <SettingsMobileLazy onClose={handleSettingsClose} />
      </SideSheetMobile>
    </>
  );
});

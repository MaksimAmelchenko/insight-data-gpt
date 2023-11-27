import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { BackButton, Header } from '../../components/Header/Header';
import { MainSettings } from './MainSettings/MainSettings';
import { ProfileRepository } from '../../stores/profile-repository';
import { SideSheetBody } from '../../components/SideSheetMobile/SideSheetBody/SideSheetBody';
import { analytics } from '../../lib/analytics';
import { useStore } from '../../core/hooks/use-store';

import styles from './ProfileMobileContent.module.scss';

export interface ProfileMobileContentProps {
  onClose: () => void;
}

export const ProfileMobileContent = observer<ProfileMobileContentProps>(({ onClose }) => {
  const profileRepository = useStore(ProfileRepository);

  useEffect(() => {
    analytics.view({
      page_title: 'profile-mobile',
    });
  }, []);

  const { profile } = profileRepository;

  if (!profile) {
    return null;
  }

  return (
    <>
      <Header title="Profile" startAdornment={<BackButton onClick={onClose} />} />
      <SideSheetBody className={styles.main}>
        <MainSettings />
      </SideSheetBody>
    </>
  );
});

export default ProfileMobileContent;

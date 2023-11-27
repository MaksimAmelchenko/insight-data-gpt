import React, { Suspense, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { matchPath, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { AppStore } from '../../stores/app-store';
import { ConversationMobileLazy } from '../../pages/ConversationMobile/ConversationMobileLazy';
import { ConversationRepository } from '../../stores/conversation-repository';
import { HomeMobileLazy } from '../../pages/HomeMobile/HomeMobileLazy';
import { Loader } from '../../components/Loader/Loader';
import { ProfileRepository } from '../../stores/profile-repository';
import { SideSheet } from '../../pages/SettingsMobile/types';
import { SidebarMobile } from '../../components/SidebarMobile/SidebarMobile';
import { useStore } from '../../core/hooks/use-store';

export const MainLayoutMobile = observer(() => {
  const appStore = useStore(AppStore);
  const profileRepository = useStore(ProfileRepository);
  const conversationRepository = useStore(ConversationRepository);

  const location = useLocation();
  useEffect(() => {
    conversationRepository.fetchConversations();
    conversationRepository.subscribeToMessages();
  }, [conversationRepository]);

  const { profile } = profileRepository;

  useEffect(() => {
    const { pathname } = location;

    {
      const match = matchPath('/settings/:sideSheet', pathname);

      if (match && match.params.sideSheet) {
        const { sideSheet } = match.params;
        appStore.openSettings(sideSheet as SideSheet, { pathname });
        return;
      }
    }
  }, [appStore, location]);

  if (!profile) {
    return <Loader />;
  }

  return (
    <div className="fixed inset-0 h-full overflow-y-auto overflow-x-hidden">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/conversations/:conversationId" element={<ConversationMobileLazy />} />
          <Route path="/" element={<HomeMobileLazy />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
      <SidebarMobile />
    </div>
  );
});

export default MainLayoutMobile;

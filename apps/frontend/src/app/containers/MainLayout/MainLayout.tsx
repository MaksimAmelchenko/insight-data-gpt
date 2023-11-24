import React, { Suspense, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Routes, Route, Navigate, useMatch } from 'react-router-dom';

import { AuthRepository } from '../../stores/auth-repository';
import { ConversationLazy } from '../../pages/Conversation/ConversationLazy';
import { ConversationNavItem } from './ConversationNavItem/ConversationNavItem';
import { ConversationRepository } from '../../stores/conversation-repository';
import { HomeLazy } from '../../pages/Home/HomeLazy';
import { Image, IconButton, LifeBuoy01Icon, LogOut01Icon, Settings02Icon } from '@org/ui-kit';
import { Loader } from '../../components/Loader/Loader';
import { NavFeaturedCard } from './NavFeaturedCard/NavFeaturedCard';
import { NavItem } from './NavItem/NavItem';
import { ProfileRepository } from '../../stores/profile-repository';
import { useStore } from '../../core/hooks/use-store';

import { ReactComponent as LogoIcon } from '../../icons/logo.svg';

export const MainLayout = observer(() => {
  const authRepository = useStore(AuthRepository);
  const conversationRepository = useStore(ConversationRepository);
  const profileRepository = useStore(ProfileRepository);

  const match = useMatch('/conversations/:conversationId');
  const { conversationId } = match?.params ?? {};

  useEffect(() => {
    conversationRepository.fetchConversations();
    conversationRepository.subscribeToMessages();
  }, [conversationRepository]);

  const { profile } = profileRepository;

  if (!profile) {
    return <Loader />;
  }

  const { conversations } = conversationRepository;

  return (
    <div className="flex">
      <aside className="SidebarNavigation flex w-72 items-start justify-start border-r border-gray-200 bg-white">
        <div className="Content flex h-full w-full flex-col">
          <div className="Header w-full px-4 pb-4 pt-2">
            <NavItem href="/" icon={<LogoIcon />} label="InsightDataGPT" />
          </div>

          <div className="Navigation flex flex-1 flex-col gap-1 px-4">
            {conversations.map(conversation => (
              <ConversationNavItem
                key={conversation.id}
                active={conversation.id === conversationId}
                href={`/conversations/${conversation.id}`}
                title={conversation.title}
              />
            ))}
          </div>

          <div className="Footer flex flex-col items-start justify-start gap-6 px-4 pb-8">
            <div className="Navigation flex h-20 flex-col items-start justify-start gap-1 self-stretch">
              <NavItem href="/support" icon={<LifeBuoy01Icon />} label="Support" />
              <NavItem icon={<Settings02Icon />} label="Settings" />
            </div>

            <NavFeaturedCard />

            <div className="Account relative inline-flex w-full items-start justify-start gap-4 border-t border-gray-200 px-2 pt-6">
              <div className="AvatarLabelGroup flex h-10 shrink grow basis-0 items-center justify-start gap-3">
                <div className="Avatar relative h-10 w-10 overflow-hidden rounded-full">
                  <div className="ContrastBorder absolute left-0 top-0 h-10 w-10 rounded-full border border-black/10" />
                  <Image src="https://i.pravatar.cc/150?img=56" alt="Avatar" />
                </div>

                <div className="TextAndSupportingText inline-flex flex-col items-start justify-start">
                  <div className="Text text-sm font-semibold leading-tight text-slate-700">John Doe</div>
                  <div className="SupportingText  text-sm font-normal leading-tight text-slate-600">john.doe@di.ai</div>
                </div>
              </div>

              <IconButton
                onClick={() => {
                  authRepository.logOut();
                }}
              >
                <LogOut01Icon />
              </IconButton>
            </div>
          </div>
        </div>
      </aside>

      <div className="h-screen grow overflow-hidden bg-gray-50">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/conversations/:conversationId" element={<ConversationLazy />} />
            <Route path="/" element={<HomeLazy />} />
            {/*<Route path="/profile" element={<ProfileLazy />} />*/}

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
});

export default MainLayout;

import React from 'react';
import { observer } from 'mobx-react-lite';
import { useMatch } from 'react-router-dom';

import { AppStore } from '../../stores/app-store';
import { ConversationNavItem } from '../../containers/MainLayout/ConversationNavItem/ConversationNavItem';
import { ConversationRepository } from '../../stores/conversation-repository';
import { NavFeaturedCard } from '../../containers/MainLayout/NavFeaturedCard/NavFeaturedCard';
import { NavItem } from '../../containers/MainLayout/NavItem/NavItem';
import { ReactComponent as LogoIcon } from '../../icons/logo.svg';
import { SideSheetMobile } from '../SideSheetMobile/SideSheetMobile';
import { useStore } from '../../core/hooks/use-store';

export const SidebarMobile = observer(() => {
  const appStore = useStore(AppStore);
  const conversationRepository = useStore(ConversationRepository);

  const match = useMatch('/conversations/:conversationId');
  const { conversationId } = match?.params ?? {};

  const { conversations } = conversationRepository;
  return (
    <SideSheetMobile
      open={appStore.isOpenedSidebar}
      side="left"
      isFullScreen={false}
      onOpenChange={open => appStore.closeSidebar()}
      onClick={() => appStore.closeSidebar()}
      className="flex flex-col gap-2 p-4"
    >
      <div className="Header pb-4">
        <NavItem href="/" icon={<LogoIcon className="h-full w-full" />} label="InsightDataGPT" />
      </div>

      <div className="flex-1 overflow-auto pb-4">
        {conversations.map(conversation => {
          return (
            <ConversationNavItem
              key={conversation.id}
              active={conversation.id === conversationId}
              href={`/conversations/${conversation.id}`}
              title={conversation.title}
            />
          );
        })}
      </div>

      <NavFeaturedCard />
    </SideSheetMobile>
  );
});

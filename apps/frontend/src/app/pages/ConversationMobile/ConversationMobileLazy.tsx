import React, { lazy } from 'react';

const ConversationMobile = lazy(() => import(/* webpackChunkName: "conversation-mobile" */ './ConversationMobile'));

export const ConversationMobileLazy = () => <ConversationMobile />;

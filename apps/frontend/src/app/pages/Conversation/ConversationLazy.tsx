import React, { lazy } from 'react';

const Conversation = lazy(() => import(/* webpackChunkName: "conversation" */ './Conversation'));

export const ConversationLazy = () => <Conversation />;

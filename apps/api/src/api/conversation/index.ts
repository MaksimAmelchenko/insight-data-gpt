import { getRestApi } from '../../libs/rest-api';

import { addMessageRoute } from './add-message';
import { createConversationRoute } from './create-conversation';
import { deleteConversation } from './delete-conversation';
import { getConversations } from './get-conversations';
import { subscribeToMessagesRoute } from './subscribe-to-messages';

export const conversationApi = getRestApi([
  addMessageRoute,
  createConversationRoute,
  deleteConversation,
  getConversations,
  subscribeToMessagesRoute,
]);

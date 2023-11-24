import { OpenAPIV3_1 } from 'openapi-types';

import { addMessageParamsSchema } from '../../api/conversation/add-message/params.schema';
import { createConversationParamsSchema } from '../../api/conversation/create-conversation/params.schema';
import { createConversationResponseSchema } from '../../api/conversation/create-conversation/response.schema';
import { deleteConversationParamsSchema } from '../../api/conversation/delete-conversation/params.schema';
import { deleteProfileParamsSchema } from '../../api/profile/delete-profile/params.schema';
import { getConversationParamsSchema } from '../../api/conversation/get-conversation/params.schema';
import { getConversationResponseSchema } from '../../api/conversation/get-conversation/response.schema';
import { getConversationsParamsSchema } from '../../api/conversation/get-conversations/params.schema';
import { getConversationsResponseSchema } from '../../api/conversation/get-conversations/response.schema';
import { header } from '../header';
import { conversationSchema } from '../../api/conversation/conversation.schema';

const conversation: OpenAPIV3_1.Document = {
  ...header,
  tags: [
    {
      name: 'conversation',
      description: '',
    },
  ],
  paths: {
    '/conversations': {
      get: {
        tags: ['conversation'],
        summary: '',
        description: '',
        requestBody: {
          content: {
            'application/json': {
              schema: getConversationsParamsSchema,
            },
          },
        },
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: getConversationsResponseSchema,
              },
            },
          },
        },
      },
      post: {
        tags: ['conversation'],
        summary: '',
        description: '',
        requestBody: {
          content: {
            'application/json': {
              schema: createConversationParamsSchema,
            },
          },
        },
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: createConversationResponseSchema,
              },
            },
          },
        },
      },
      delete: {
        tags: ['profile'],
        summary: '',
        description: '',
        requestBody: {
          content: {
            'application/json': {
              schema: deleteProfileParamsSchema,
            },
          },
        },
        responses: {
          204: {
            description: 'Successful operation',
          },
        },
      },
    } as OpenAPIV3_1.PathsObject,
    '/conversations/:conversationId': {
      get: {
        tags: ['conversation'],
        summary: '',
        description: '',
        requestBody: {
          content: {
            'application/json': {
              schema: getConversationParamsSchema,
            },
          },
        },
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: getConversationResponseSchema,
              },
            },
          },
        },
      },
      delete: {
        tags: ['conversation'],
        summary: '',
        description: '',
        requestBody: {
          content: {
            'application/json': {
              schema: deleteConversationParamsSchema,
            },
          },
        },
        responses: {
          204: {
            description: 'Successful operation',
          },
        },
      },
    } as OpenAPIV3_1.PathsObject,
    '/conversations/:conversationId/messages': {
      post: {
        tags: ['conversation'],
        summary: '',
        description: '',
        requestBody: {
          content: {
            'application/json': {
              schema: addMessageParamsSchema,
            },
          },
        },
        responses: {
          202: {
            description: 'Successful operation',
          },
        },
      },
    } as OpenAPIV3_1.PathsObject,
  },
  components: {
    schemas: {
      Conversation: conversationSchema,
    },
    parameters: {},
  },
};

export { conversation };
export default conversation;

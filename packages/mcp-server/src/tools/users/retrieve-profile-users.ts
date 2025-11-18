// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'spotted-ts-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'users',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/users/{user_id}',
  operationId: 'get-users-profile',
};

export const tool: Tool = {
  name: 'retrieve_profile_users',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet public profile information about a Spotify user.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/user_retrieve_profile_response',\n  $defs: {\n    user_retrieve_profile_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user.\\n'\n        },\n        display_name: {\n          type: 'string',\n          description: 'The name displayed on the user\\'s profile. `null` if not available.\\n'\n        },\n        external_urls: {\n          $ref: '#/$defs/external_url_object'\n        },\n        followers: {\n          $ref: '#/$defs/followers_object'\n        },\n        href: {\n          type: 'string',\n          description: 'A link to the Web API endpoint for this user.\\n'\n        },\n        images: {\n          type: 'array',\n          description: 'The user\\'s profile image.\\n',\n          items: {\n            $ref: '#/$defs/image_object'\n          }\n        },\n        type: {\n          type: 'string',\n          description: 'The object type.',\n          enum: [            'user'\n          ]\n        },\n        uri: {\n          type: 'string',\n          description: 'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user.\\n'\n        }\n      }\n    },\n    external_url_object: {\n      type: 'object',\n      properties: {\n        spotify: {\n          type: 'string',\n          description: 'The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object.\\n'\n        }\n      }\n    },\n    followers_object: {\n      type: 'object',\n      properties: {\n        href: {\n          type: 'string',\n          description: 'This will always be set to null, as the Web API does not support it at the moment.\\n'\n        },\n        total: {\n          type: 'integer',\n          description: 'The total number of followers.\\n'\n        }\n      }\n    },\n    image_object: {\n      type: 'object',\n      properties: {\n        height: {\n          type: 'integer',\n          description: 'The image height in pixels.\\n'\n        },\n        url: {\n          type: 'string',\n          description: 'The source URL of the image.\\n'\n        },\n        width: {\n          type: 'integer',\n          description: 'The image width in pixels.\\n'\n        }\n      },\n      required: [        'height',\n        'url',\n        'width'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
        title: 'User ID',
        description: "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['user_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const { user_id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.users.retrieveProfile(user_id)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };

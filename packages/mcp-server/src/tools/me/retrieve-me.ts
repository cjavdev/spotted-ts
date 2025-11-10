// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'spotted-ts-mcp/filtering';
import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/me',
  operationId: 'get-current-users-profile',
};

export const tool: Tool = {
  name: 'retrieve_me',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet detailed profile information about the current user (including the\ncurrent user's username).\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/me_retrieve_response',\n  $defs: {\n    me_retrieve_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for the user.\\n'\n        },\n        country: {\n          type: 'string',\n          description: 'The country of the user, as set in the user\\'s account profile. An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\\n'\n        },\n        display_name: {\n          type: 'string',\n          description: 'The name displayed on the user\\'s profile. `null` if not available.\\n'\n        },\n        email: {\n          type: 'string',\n          description: 'The user\\'s email address, as entered by the user when creating their account. _**Important!** This email address is unverified; there is no proof that it actually belongs to the user._ _This field is only available when the current user has granted access to the [user-read-email](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\\n'\n        },\n        explicit_content: {\n          type: 'object',\n          description: 'The user\\'s explicit content settings. _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\\n',\n          properties: {\n            filter_enabled: {\n              type: 'boolean',\n              description: 'When `true`, indicates that explicit content should not be played.\\n'\n            },\n            filter_locked: {\n              type: 'boolean',\n              description: 'When `true`, indicates that the explicit content setting is locked and can\\'t be changed by the user.\\n'\n            }\n          }\n        },\n        external_urls: {\n          $ref: '#/$defs/external_url_object'\n        },\n        followers: {\n          $ref: '#/$defs/followers_object'\n        },\n        href: {\n          type: 'string',\n          description: 'A link to the Web API endpoint for this user.\\n'\n        },\n        images: {\n          type: 'array',\n          description: 'The user\\'s profile image.',\n          items: {\n            $ref: '#/$defs/image_object'\n          }\n        },\n        product: {\n          type: 'string',\n          description: 'The user\\'s Spotify subscription level: \"premium\", \"free\", etc. (The subscription level \"open\" can be considered the same as \"free\".) _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\\n'\n        },\n        type: {\n          type: 'string',\n          description: 'The object type: \"user\"\\n'\n        },\n        uri: {\n          type: 'string',\n          description: 'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the user.\\n'\n        }\n      }\n    },\n    external_url_object: {\n      type: 'object',\n      properties: {\n        spotify: {\n          type: 'string',\n          description: 'The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object.\\n'\n        }\n      }\n    },\n    followers_object: {\n      type: 'object',\n      properties: {\n        href: {\n          type: 'string',\n          description: 'This will always be set to null, as the Web API does not support it at the moment.\\n'\n        },\n        total: {\n          type: 'integer',\n          description: 'The total number of followers.\\n'\n        }\n      }\n    },\n    image_object: {\n      type: 'object',\n      properties: {\n        height: {\n          type: 'integer',\n          description: 'The image height in pixels.\\n'\n        },\n        url: {\n          type: 'string',\n          description: 'The source URL of the image.\\n'\n        },\n        width: {\n          type: 'integer',\n          description: 'The image width in pixels.\\n'\n        }\n      },\n      required: [        'height',\n        'url',\n        'width'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const { jq_filter } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.me.retrieve()));
};

export default { metadata, tool, handler };

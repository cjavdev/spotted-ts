// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'spotted-ts-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'browse',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/browse/featured-playlists',
  operationId: 'get-featured-playlists',
};

export const tool: Tool = {
  name: 'get_featured_playlists_browse',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/browse_get_featured_playlists_response',\n  $defs: {\n    browse_get_featured_playlists_response: {\n      type: 'object',\n      properties: {\n        message: {\n          type: 'string',\n          description: 'The localized message of a playlist.\\n'\n        },\n        playlists: {\n          $ref: '#/$defs/paging_playlist_object'\n        }\n      }\n    },\n    paging_playlist_object: {\n      type: 'object',\n      properties: {\n        href: {\n          type: 'string',\n          description: 'A link to the Web API endpoint returning the full result of the request\\n'\n        },\n        limit: {\n          type: 'integer',\n          description: 'The maximum number of items in the response (as set in the query or by default).\\n'\n        },\n        next: {\n          type: 'string',\n          description: 'URL to the next page of items. ( `null` if none)\\n'\n        },\n        offset: {\n          type: 'integer',\n          description: 'The offset of the items returned (as set in the query or by default)\\n'\n        },\n        previous: {\n          type: 'string',\n          description: 'URL to the previous page of items. ( `null` if none)\\n'\n        },\n        total: {\n          type: 'integer',\n          description: 'The total number of items available to return.\\n'\n        },\n        items: {\n          type: 'array',\n          items: {\n            $ref: '#/$defs/simplified_playlist_object'\n          }\n        }\n      },\n      required: [        'href',\n        'limit',\n        'next',\n        'offset',\n        'previous',\n        'total'\n      ]\n    },\n    simplified_playlist_object: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\\n'\n        },\n        collaborative: {\n          type: 'boolean',\n          description: '`true` if the owner allows other users to modify the playlist.\\n'\n        },\n        description: {\n          type: 'string',\n          description: 'The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`.\\n'\n        },\n        external_urls: {\n          $ref: '#/$defs/external_url_object'\n        },\n        href: {\n          type: 'string',\n          description: 'A link to the Web API endpoint providing full details of the playlist.\\n'\n        },\n        images: {\n          type: 'array',\n          description: 'Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._\\n',\n          items: {\n            $ref: '#/$defs/image_object'\n          }\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the playlist.\\n'\n        },\n        owner: {\n          allOf: [            {\n              $ref: '#/$defs/playlist_user_object'\n            }\n          ],\n          description: 'The user who owns the playlist\\n'\n        },\n        published: {\n          type: 'boolean',\n          description: 'The playlist\\'s public/private status (if it is added to the user\\'s profile): `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\\n'\n        },\n        snapshot_id: {\n          type: 'string',\n          description: 'The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version\\n'\n        },\n        tracks: {\n          $ref: '#/$defs/playlist_tracks_ref_object'\n        },\n        type: {\n          type: 'string',\n          description: 'The object type: \"playlist\"\\n'\n        },\n        uri: {\n          type: 'string',\n          description: 'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\\n'\n        }\n      }\n    },\n    external_url_object: {\n      type: 'object',\n      properties: {\n        spotify: {\n          type: 'string',\n          description: 'The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object.\\n'\n        }\n      }\n    },\n    image_object: {\n      type: 'object',\n      properties: {\n        height: {\n          type: 'integer',\n          description: 'The image height in pixels.\\n'\n        },\n        url: {\n          type: 'string',\n          description: 'The source URL of the image.\\n'\n        },\n        width: {\n          type: 'integer',\n          description: 'The image width in pixels.\\n'\n        }\n      },\n      required: [        'height',\n        'url',\n        'width'\n      ]\n    },\n    playlist_user_object: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user.\\n'\n        },\n        external_urls: {\n          $ref: '#/$defs/external_url_object'\n        },\n        href: {\n          type: 'string',\n          description: 'A link to the Web API endpoint for this user.\\n'\n        },\n        type: {\n          type: 'string',\n          description: 'The object type.',\n          enum: [            'user'\n          ]\n        },\n        uri: {\n          type: 'string',\n          description: 'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user.\\n'\n        }\n      }\n    },\n    playlist_tracks_ref_object: {\n      type: 'object',\n      properties: {\n        href: {\n          type: 'string',\n          description: 'A link to the Web API endpoint where full details of the playlist\\'s tracks can be retrieved.\\n'\n        },\n        total: {\n          type: 'integer',\n          description: 'Number of tracks in the playlist.\\n'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'integer',
        title: 'Limit',
        description: 'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
      },
      locale: {
        type: 'string',
        title: 'Locale',
        description:
          'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
      },
      offset: {
        type: 'integer',
        title: 'Offset',
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
      },
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
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.browse.getFeaturedPlaylists(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };

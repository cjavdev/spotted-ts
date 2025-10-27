// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'spotted-ts-mcp/filtering';
import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'browse',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/browse/new-releases',
  operationId: 'get-new-releases',
};

export const tool: Tool = {
  name: 'get_new_releases_browse',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/browse_get_new_releases_response',\n  $defs: {\n    browse_get_new_releases_response: {\n      type: 'object',\n      properties: {\n        albums: {\n          type: 'object',\n          properties: {\n            href: {\n              type: 'string',\n              description: 'A link to the Web API endpoint returning the full result of the request\\n'\n            },\n            items: {\n              type: 'array',\n              items: {\n                type: 'object',\n                properties: {\n                  id: {\n                    type: 'string',\n                    description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the album.\\n'\n                  },\n                  album_type: {\n                    type: 'string',\n                    description: 'The type of the album.',\n                    enum: [                      'album',\n                      'single',\n                      'compilation'\n                    ]\n                  },\n                  artists: {\n                    type: 'array',\n                    description: 'The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.\\n',\n                    items: {\n                      $ref: '#/$defs/simplified_artist_object'\n                    }\n                  },\n                  available_markets: {\n                    type: 'array',\n                    description: 'The markets in which the album is available: [ISO 3166-1 alpha-2 country codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _**NOTE**: an album is considered available in a market when at least 1 of its tracks is available in that market._\\n',\n                    items: {\n                      type: 'string'\n                    }\n                  },\n                  external_urls: {\n                    $ref: '#/$defs/external_url_object'\n                  },\n                  href: {\n                    type: 'string',\n                    description: 'A link to the Web API endpoint providing full details of the album.\\n'\n                  },\n                  images: {\n                    type: 'array',\n                    description: 'The cover art for the album in various sizes, widest first.\\n',\n                    items: {\n                      $ref: '#/$defs/image_object'\n                    }\n                  },\n                  name: {\n                    type: 'string',\n                    description: 'The name of the album. In case of an album takedown, the value may be an empty string.\\n'\n                  },\n                  release_date: {\n                    type: 'string',\n                    description: 'The date the album was first released.\\n'\n                  },\n                  release_date_precision: {\n                    type: 'string',\n                    description: 'The precision with which `release_date` value is known.',\n                    enum: [                      'year',\n                      'month',\n                      'day'\n                    ]\n                  },\n                  total_tracks: {\n                    type: 'integer',\n                    description: 'The number of tracks in the album.'\n                  },\n                  type: {\n                    type: 'string',\n                    description: 'The object type.',\n                    enum: [                      'album'\n                    ]\n                  },\n                  uri: {\n                    type: 'string',\n                    description: 'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the album.\\n'\n                  },\n                  restrictions: {\n                    $ref: '#/$defs/album_restriction_object'\n                  }\n                },\n                required: [                  'id',\n                  'album_type',\n                  'artists',\n                  'available_markets',\n                  'external_urls',\n                  'href',\n                  'images',\n                  'name',\n                  'release_date',\n                  'release_date_precision',\n                  'total_tracks',\n                  'type',\n                  'uri'\n                ]\n              }\n            },\n            limit: {\n              type: 'integer',\n              description: 'The maximum number of items in the response (as set in the query or by default).\\n'\n            },\n            next: {\n              type: 'string',\n              description: 'URL to the next page of items. ( `null` if none)\\n'\n            },\n            offset: {\n              type: 'integer',\n              description: 'The offset of the items returned (as set in the query or by default)\\n'\n            },\n            previous: {\n              type: 'string',\n              description: 'URL to the previous page of items. ( `null` if none)\\n'\n            },\n            total: {\n              type: 'integer',\n              description: 'The total number of items available to return.\\n'\n            }\n          },\n          required: [            'href',\n            'items',\n            'limit',\n            'next',\n            'offset',\n            'previous',\n            'total'\n          ]\n        }\n      },\n      required: [        'albums'\n      ]\n    },\n    simplified_artist_object: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\\n'\n        },\n        external_urls: {\n          $ref: '#/$defs/external_url_object'\n        },\n        href: {\n          type: 'string',\n          description: 'A link to the Web API endpoint providing full details of the artist.\\n'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the artist.\\n'\n        },\n        type: {\n          type: 'string',\n          description: 'The object type.',\n          enum: [            'artist'\n          ]\n        },\n        uri: {\n          type: 'string',\n          description: 'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\\n'\n        }\n      }\n    },\n    external_url_object: {\n      type: 'object',\n      properties: {\n        spotify: {\n          type: 'string',\n          description: 'The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object.\\n'\n        }\n      }\n    },\n    image_object: {\n      type: 'object',\n      properties: {\n        height: {\n          type: 'integer',\n          description: 'The image height in pixels.\\n'\n        },\n        url: {\n          type: 'string',\n          description: 'The source URL of the image.\\n'\n        },\n        width: {\n          type: 'integer',\n          description: 'The image width in pixels.\\n'\n        }\n      },\n      required: [        'height',\n        'url',\n        'width'\n      ]\n    },\n    album_restriction_object: {\n      type: 'object',\n      properties: {\n        reason: {\n          type: 'string',\n          description: 'The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user\\'s subscription type, or when the user\\'s account is set to not play explicit content.\\nAdditional reasons may be added in the future.',\n          enum: [            'market',\n            'product',\n            'explicit'\n          ]\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'integer',
        title: 'Limit',
        description: 'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.browse.getNewReleases(body)));
};

export default { metadata, tool, handler };

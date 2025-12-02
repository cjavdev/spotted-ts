// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'spotted-ts-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'albums',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/albums/{id}/tracks',
  operationId: 'get-an-albums-tracks',
};

export const tool: Tool = {
  name: 'list_tracks_albums',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet Spotify catalog information about an album’s tracks.\nOptional parameters can be used to limit the number of tracks returned.\n\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    href: {\n      type: 'string',\n      description: 'A link to the Web API endpoint returning the full result of the request\\n'\n    },\n    limit: {\n      type: 'integer',\n      description: 'The maximum number of items in the response (as set in the query or by default).\\n'\n    },\n    next: {\n      type: 'string',\n      description: 'URL to the next page of items. ( `null` if none)\\n'\n    },\n    offset: {\n      type: 'integer',\n      description: 'The offset of the items returned (as set in the query or by default)\\n'\n    },\n    previous: {\n      type: 'string',\n      description: 'URL to the previous page of items. ( `null` if none)\\n'\n    },\n    total: {\n      type: 'integer',\n      description: 'The total number of items available to return.\\n'\n    },\n    items: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/simplified_track_object'\n      }\n    }\n  },\n  required: [    'href',\n    'limit',\n    'next',\n    'offset',\n    'previous',\n    'total'\n  ],\n  $defs: {\n    simplified_track_object: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\\n'\n        },\n        artists: {\n          type: 'array',\n          description: 'The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist.',\n          items: {\n            $ref: '#/$defs/simplified_artist_object'\n          }\n        },\n        available_markets: {\n          type: 'array',\n          description: 'A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\\n',\n          items: {\n            type: 'string'\n          }\n        },\n        disc_number: {\n          type: 'integer',\n          description: 'The disc number (usually `1` unless the album consists of more than one disc).'\n        },\n        duration_ms: {\n          type: 'integer',\n          description: 'The track length in milliseconds.'\n        },\n        explicit: {\n          type: 'boolean',\n          description: 'Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown).'\n        },\n        external_urls: {\n          $ref: '#/$defs/external_url_object'\n        },\n        href: {\n          type: 'string',\n          description: 'A link to the Web API endpoint providing full details of the track.'\n        },\n        is_local: {\n          type: 'boolean',\n          description: 'Whether or not the track is from a local file.\\n'\n        },\n        is_playable: {\n          type: 'boolean',\n          description: 'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied. If `true`, the track is playable in the given market. Otherwise `false`.\\n'\n        },\n        linked_from: {\n          $ref: '#/$defs/linked_track_object'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the track.'\n        },\n        preview_url: {\n          type: 'string',\n          description: 'A URL to a 30 second preview (MP3 format) of the track.\\n'\n        },\n        restrictions: {\n          $ref: '#/$defs/track_restriction_object'\n        },\n        track_number: {\n          type: 'integer',\n          description: 'The number of the track. If an album has several discs, the track number is the number on the specified disc.\\n'\n        },\n        type: {\n          type: 'string',\n          description: 'The object type: \"track\".\\n'\n        },\n        uri: {\n          type: 'string',\n          description: 'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\\n'\n        }\n      }\n    },\n    simplified_artist_object: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\\n'\n        },\n        external_urls: {\n          $ref: '#/$defs/external_url_object'\n        },\n        href: {\n          type: 'string',\n          description: 'A link to the Web API endpoint providing full details of the artist.\\n'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the artist.\\n'\n        },\n        type: {\n          type: 'string',\n          description: 'The object type.',\n          enum: [            'artist'\n          ]\n        },\n        uri: {\n          type: 'string',\n          description: 'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\\n'\n        }\n      }\n    },\n    external_url_object: {\n      type: 'object',\n      properties: {\n        spotify: {\n          type: 'string',\n          description: 'The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object.\\n'\n        }\n      }\n    },\n    linked_track_object: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\\n'\n        },\n        external_urls: {\n          $ref: '#/$defs/external_url_object'\n        },\n        href: {\n          type: 'string',\n          description: 'A link to the Web API endpoint providing full details of the track.\\n'\n        },\n        type: {\n          type: 'string',\n          description: 'The object type: \"track\".\\n'\n        },\n        uri: {\n          type: 'string',\n          description: 'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\\n'\n        }\n      }\n    },\n    track_restriction_object: {\n      type: 'object',\n      properties: {\n        reason: {\n          type: 'string',\n          description: 'The reason for the restriction. Supported values:\\n- `market` - The content item is not available in the given market.\\n- `product` - The content item is not available for the user\\'s subscription type.\\n- `explicit` - The content item is explicit and the user\\'s account is set to not play explicit content.\\n\\nAdditional reasons may be added in the future.\\n**Note**: If you use this field, make sure that your application safely handles unknown values.\\n'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        title: 'Spotify Album ID',
        description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the album.\n',
      },
      limit: {
        type: 'integer',
        title: 'Limit',
        description: 'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
      },
      market: {
        type: 'string',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
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
    required: ['id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  const response = await client.albums.listTracks(id, body).asResponse();
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
  } catch (error) {
    if (error instanceof Spotted.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };

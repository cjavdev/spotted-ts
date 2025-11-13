// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'spotted-ts-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'shows',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/shows/{id}/episodes',
  operationId: 'get-a-shows-episodes',
};

export const tool: Tool = {
  name: 'list_episodes_shows',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.\n\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    href: {\n      type: 'string',\n      description: 'A link to the Web API endpoint returning the full result of the request\\n'\n    },\n    limit: {\n      type: 'integer',\n      description: 'The maximum number of items in the response (as set in the query or by default).\\n'\n    },\n    next: {\n      type: 'string',\n      description: 'URL to the next page of items. ( `null` if none)\\n'\n    },\n    offset: {\n      type: 'integer',\n      description: 'The offset of the items returned (as set in the query or by default)\\n'\n    },\n    previous: {\n      type: 'string',\n      description: 'URL to the previous page of items. ( `null` if none)\\n'\n    },\n    total: {\n      type: 'integer',\n      description: 'The total number of items available to return.\\n'\n    },\n    items: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/simplified_episode_object'\n      }\n    }\n  },\n  required: [    'href',\n    'limit',\n    'next',\n    'offset',\n    'previous',\n    'total'\n  ],\n  $defs: {\n    simplified_episode_object: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.\\n'\n        },\n        audio_preview_url: {\n          type: 'string',\n          description: 'A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.\\n'\n        },\n        description: {\n          type: 'string',\n          description: 'A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\\n'\n        },\n        duration_ms: {\n          type: 'integer',\n          description: 'The episode length in milliseconds.\\n'\n        },\n        explicit: {\n          type: 'boolean',\n          description: 'Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown).\\n'\n        },\n        external_urls: {\n          $ref: '#/$defs/external_url_object'\n        },\n        href: {\n          type: 'string',\n          description: 'A link to the Web API endpoint providing full details of the episode.\\n'\n        },\n        html_description: {\n          type: 'string',\n          description: 'A description of the episode. This field may contain HTML tags.\\n'\n        },\n        images: {\n          type: 'array',\n          description: 'The cover art for the episode in various sizes, widest first.\\n',\n          items: {\n            $ref: '#/$defs/image_object'\n          }\n        },\n        is_externally_hosted: {\n          type: 'boolean',\n          description: 'True if the episode is hosted outside of Spotify\\'s CDN.\\n'\n        },\n        is_playable: {\n          type: 'boolean',\n          description: 'True if the episode is playable in the given market. Otherwise false.\\n'\n        },\n        languages: {\n          type: 'array',\n          description: 'A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.\\n',\n          items: {\n            type: 'string'\n          }\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the episode.\\n'\n        },\n        release_date: {\n          type: 'string',\n          description: 'The date the episode was first released, for example `\"1981-12-15\"`. Depending on the precision, it might be shown as `\"1981\"` or `\"1981-12\"`.\\n'\n        },\n        release_date_precision: {\n          type: 'string',\n          description: 'The precision with which `release_date` value is known.',\n          enum: [            'year',\n            'month',\n            'day'\n          ]\n        },\n        type: {\n          type: 'string',\n          description: 'The object type.',\n          enum: [            'episode'\n          ]\n        },\n        uri: {\n          type: 'string',\n          description: 'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the episode.\\n'\n        },\n        language: {\n          type: 'string',\n          description: 'The language used in the episode, identified by a [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. This field is deprecated and might be removed in the future. Please use the `languages` field instead.\\n'\n        },\n        restrictions: {\n          $ref: '#/$defs/episode_restriction_object'\n        },\n        resume_point: {\n          $ref: '#/$defs/resume_point_object'\n        }\n      },\n      required: [        'id',\n        'audio_preview_url',\n        'description',\n        'duration_ms',\n        'explicit',\n        'external_urls',\n        'href',\n        'html_description',\n        'images',\n        'is_externally_hosted',\n        'is_playable',\n        'languages',\n        'name',\n        'release_date',\n        'release_date_precision',\n        'type',\n        'uri'\n      ]\n    },\n    external_url_object: {\n      type: 'object',\n      properties: {\n        spotify: {\n          type: 'string',\n          description: 'The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object.\\n'\n        }\n      }\n    },\n    image_object: {\n      type: 'object',\n      properties: {\n        height: {\n          type: 'integer',\n          description: 'The image height in pixels.\\n'\n        },\n        url: {\n          type: 'string',\n          description: 'The source URL of the image.\\n'\n        },\n        width: {\n          type: 'integer',\n          description: 'The image width in pixels.\\n'\n        }\n      },\n      required: [        'height',\n        'url',\n        'width'\n      ]\n    },\n    episode_restriction_object: {\n      type: 'object',\n      properties: {\n        reason: {\n          type: 'string',\n          description: 'The reason for the restriction. Supported values:\\n- `market` - The content item is not available in the given market.\\n- `product` - The content item is not available for the user\\'s subscription type.\\n- `explicit` - The content item is explicit and the user\\'s account is set to not play explicit content.\\n\\nAdditional reasons may be added in the future.\\n**Note**: If you use this field, make sure that your application safely handles unknown values.\\n'\n        }\n      }\n    },\n    resume_point_object: {\n      type: 'object',\n      properties: {\n        fully_played: {\n          type: 'boolean',\n          description: 'Whether or not the episode has been fully played by the user.\\n'\n        },\n        resume_position_ms: {\n          type: 'integer',\n          description: 'The user\\'s most recent position in the episode in milliseconds.\\n'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        title: 'Spotify Show ID',
        description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
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
  const response = await client.shows.listEpisodes(id, body).asResponse();
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };

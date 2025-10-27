// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'spotted-ts-mcp/filtering';
import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me.shows',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/me/shows',
  operationId: 'get-users-saved-shows',
};

export const tool: Tool = {
  name: 'list_me_shows',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.\n\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    href: {\n      type: 'string',\n      description: 'A link to the Web API endpoint returning the full result of the request\\n'\n    },\n    items: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/show_list_response'\n      }\n    },\n    limit: {\n      type: 'integer',\n      description: 'The maximum number of items in the response (as set in the query or by default).\\n'\n    },\n    next: {\n      type: 'string',\n      description: 'URL to the next page of items. ( `null` if none)\\n'\n    },\n    offset: {\n      type: 'integer',\n      description: 'The offset of the items returned (as set in the query or by default)\\n'\n    },\n    previous: {\n      type: 'string',\n      description: 'URL to the previous page of items. ( `null` if none)\\n'\n    },\n    total: {\n      type: 'integer',\n      description: 'The total number of items available to return.\\n'\n    }\n  },\n  required: [    'href',\n    'items',\n    'limit',\n    'next',\n    'offset',\n    'previous',\n    'total'\n  ],\n  $defs: {\n    show_list_response: {\n      type: 'object',\n      properties: {\n        added_at: {\n          type: 'string',\n          description: 'The date and time the show was saved.\\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\\n',\n          format: 'date-time'\n        },\n        show: {\n          $ref: '#/$defs/show_base'\n        }\n      }\n    },\n    show_base: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the show.\\n'\n        },\n        available_markets: {\n          type: 'array',\n          description: 'A list of the countries in which the show can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\\n',\n          items: {\n            type: 'string'\n          }\n        },\n        copyrights: {\n          type: 'array',\n          description: 'The copyright statements of the show.\\n',\n          items: {\n            $ref: '#/$defs/copyright_object'\n          }\n        },\n        description: {\n          type: 'string',\n          description: 'A description of the show. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\\n'\n        },\n        explicit: {\n          type: 'boolean',\n          description: 'Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown).\\n'\n        },\n        external_urls: {\n          $ref: '#/$defs/external_url_object'\n        },\n        href: {\n          type: 'string',\n          description: 'A link to the Web API endpoint providing full details of the show.\\n'\n        },\n        html_description: {\n          type: 'string',\n          description: 'A description of the show. This field may contain HTML tags.\\n'\n        },\n        images: {\n          type: 'array',\n          description: 'The cover art for the show in various sizes, widest first.\\n',\n          items: {\n            $ref: '#/$defs/image_object'\n          }\n        },\n        is_externally_hosted: {\n          type: 'boolean',\n          description: 'True if all of the shows episodes are hosted outside of Spotify\\'s CDN. This field might be `null` in some cases.\\n'\n        },\n        languages: {\n          type: 'array',\n          description: 'A list of the languages used in the show, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.\\n',\n          items: {\n            type: 'string'\n          }\n        },\n        media_type: {\n          type: 'string',\n          description: 'The media type of the show.\\n'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the episode.\\n'\n        },\n        publisher: {\n          type: 'string',\n          description: 'The publisher of the show.\\n'\n        },\n        total_episodes: {\n          type: 'integer',\n          description: 'The total number of episodes in the show.\\n'\n        },\n        type: {\n          type: 'string',\n          description: 'The object type.',\n          enum: [            'show'\n          ]\n        },\n        uri: {\n          type: 'string',\n          description: 'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the show.\\n'\n        }\n      },\n      required: [        'id',\n        'available_markets',\n        'copyrights',\n        'description',\n        'explicit',\n        'external_urls',\n        'href',\n        'html_description',\n        'images',\n        'is_externally_hosted',\n        'languages',\n        'media_type',\n        'name',\n        'publisher',\n        'total_episodes',\n        'type',\n        'uri'\n      ]\n    },\n    copyright_object: {\n      type: 'object',\n      properties: {\n        text: {\n          type: 'string',\n          description: 'The copyright text for this content.\\n'\n        },\n        type: {\n          type: 'string',\n          description: 'The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright.\\n'\n        }\n      }\n    },\n    external_url_object: {\n      type: 'object',\n      properties: {\n        spotify: {\n          type: 'string',\n          description: 'The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object.\\n'\n        }\n      }\n    },\n    image_object: {\n      type: 'object',\n      properties: {\n        height: {\n          type: 'integer',\n          description: 'The image height in pixels.\\n'\n        },\n        url: {\n          type: 'string',\n          description: 'The source URL of the image.\\n'\n        },\n        width: {\n          type: 'integer',\n          description: 'The image width in pixels.\\n'\n        }\n      },\n      required: [        'height',\n        'url',\n        'width'\n      ]\n    }\n  }\n}\n```",
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
  const response = await client.me.shows.list(body).asResponse();
  return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
};

export default { metadata, tool, handler };

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'spotted-ts-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'audiobooks',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/audiobooks',
  operationId: 'get-multiple-audiobooks',
};

export const tool: Tool = {
  name: 'bulk_retrieve_audiobooks',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet Spotify catalog information for several audiobooks identified by their Spotify IDs. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/audiobook_bulk_retrieve_response',\n  $defs: {\n    audiobook_bulk_retrieve_response: {\n      type: 'object',\n      properties: {\n        audiobooks: {\n          type: 'array',\n          items: {\n            allOf: [              {\n                $ref: '#/$defs/audiobook_base'\n              }\n            ]\n          }\n        }\n      },\n      required: [        'audiobooks'\n      ]\n    },\n    audiobook_base: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.\\n'\n        },\n        authors: {\n          type: 'array',\n          description: 'The author(s) for the audiobook.\\n',\n          items: {\n            $ref: '#/$defs/author_object'\n          }\n        },\n        available_markets: {\n          type: 'array',\n          description: 'A list of the countries in which the audiobook can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\\n',\n          items: {\n            type: 'string'\n          }\n        },\n        copyrights: {\n          type: 'array',\n          description: 'The copyright statements of the audiobook.\\n',\n          items: {\n            $ref: '#/$defs/copyright_object'\n          }\n        },\n        description: {\n          type: 'string',\n          description: 'A description of the audiobook. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\\n'\n        },\n        explicit: {\n          type: 'boolean',\n          description: 'Whether or not the audiobook has explicit content (true = yes it does; false = no it does not OR unknown).\\n'\n        },\n        external_urls: {\n          $ref: '#/$defs/external_url_object'\n        },\n        href: {\n          type: 'string',\n          description: 'A link to the Web API endpoint providing full details of the audiobook.\\n'\n        },\n        html_description: {\n          type: 'string',\n          description: 'A description of the audiobook. This field may contain HTML tags.\\n'\n        },\n        images: {\n          type: 'array',\n          description: 'The cover art for the audiobook in various sizes, widest first.\\n',\n          items: {\n            $ref: '#/$defs/image_object'\n          }\n        },\n        languages: {\n          type: 'array',\n          description: 'A list of the languages used in the audiobook, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.\\n',\n          items: {\n            type: 'string'\n          }\n        },\n        media_type: {\n          type: 'string',\n          description: 'The media type of the audiobook.\\n'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the audiobook.\\n'\n        },\n        narrators: {\n          type: 'array',\n          description: 'The narrator(s) for the audiobook.\\n',\n          items: {\n            $ref: '#/$defs/narrator_object'\n          }\n        },\n        publisher: {\n          type: 'string',\n          description: 'The publisher of the audiobook.\\n'\n        },\n        total_chapters: {\n          type: 'integer',\n          description: 'The number of chapters in this audiobook.\\n'\n        },\n        type: {\n          type: 'string',\n          description: 'The object type.',\n          enum: [            'audiobook'\n          ]\n        },\n        uri: {\n          type: 'string',\n          description: 'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.\\n'\n        },\n        edition: {\n          type: 'string',\n          description: 'The edition of the audiobook.\\n'\n        }\n      },\n      required: [        'id',\n        'authors',\n        'available_markets',\n        'copyrights',\n        'description',\n        'explicit',\n        'external_urls',\n        'href',\n        'html_description',\n        'images',\n        'languages',\n        'media_type',\n        'name',\n        'narrators',\n        'publisher',\n        'total_chapters',\n        'type',\n        'uri'\n      ]\n    },\n    author_object: {\n      type: 'object',\n      properties: {\n        name: {\n          type: 'string',\n          description: 'The name of the author.\\n'\n        }\n      }\n    },\n    copyright_object: {\n      type: 'object',\n      properties: {\n        text: {\n          type: 'string',\n          description: 'The copyright text for this content.\\n'\n        },\n        type: {\n          type: 'string',\n          description: 'The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright.\\n'\n        }\n      }\n    },\n    external_url_object: {\n      type: 'object',\n      properties: {\n        spotify: {\n          type: 'string',\n          description: 'The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object.\\n'\n        }\n      }\n    },\n    image_object: {\n      type: 'object',\n      properties: {\n        height: {\n          type: 'integer',\n          description: 'The image height in pixels.\\n'\n        },\n        url: {\n          type: 'string',\n          description: 'The source URL of the image.\\n'\n        },\n        width: {\n          type: 'integer',\n          description: 'The image width in pixels.\\n'\n        }\n      },\n      required: [        'height',\n        'url',\n        'width'\n      ]\n    },\n    narrator_object: {\n      type: 'object',\n      properties: {\n        name: {\n          type: 'string',\n          description: 'The name of the Narrator.\\n'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      ids: {
        type: 'string',
        title: 'Spotify Audiobook IDs',
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
      },
      market: {
        type: 'string',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['ids'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.audiobooks.bulkRetrieve(body)));
  } catch (error) {
    if (error instanceof Spotted.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };

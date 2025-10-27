// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'spotted-ts-mcp/filtering';
import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'artists',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/artists',
  operationId: 'get-multiple-artists',
};

export const tool: Tool = {
  name: 'list_artists',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet Spotify catalog information for several artists based on their Spotify IDs.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/artist_list_response',\n  $defs: {\n    artist_list_response: {\n      type: 'object',\n      properties: {\n        artists: {\n          type: 'array',\n          items: {\n            $ref: '#/$defs/artist_object'\n          }\n        }\n      },\n      required: [        'artists'\n      ]\n    },\n    artist_object: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\\n'\n        },\n        external_urls: {\n          $ref: '#/$defs/external_url_object'\n        },\n        followers: {\n          $ref: '#/$defs/followers_object'\n        },\n        genres: {\n          type: 'array',\n          description: 'A list of the genres the artist is associated with. If not yet classified, the array is empty.\\n',\n          items: {\n            type: 'string'\n          }\n        },\n        href: {\n          type: 'string',\n          description: 'A link to the Web API endpoint providing full details of the artist.\\n'\n        },\n        images: {\n          type: 'array',\n          description: 'Images of the artist in various sizes, widest first.\\n',\n          items: {\n            $ref: '#/$defs/image_object'\n          }\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the artist.\\n'\n        },\n        popularity: {\n          type: 'integer',\n          description: 'The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist\\'s popularity is calculated from the popularity of all the artist\\'s tracks.\\n'\n        },\n        type: {\n          type: 'string',\n          description: 'The object type.',\n          enum: [            'artist'\n          ]\n        },\n        uri: {\n          type: 'string',\n          description: 'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\\n'\n        }\n      }\n    },\n    external_url_object: {\n      type: 'object',\n      properties: {\n        spotify: {\n          type: 'string',\n          description: 'The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object.\\n'\n        }\n      }\n    },\n    followers_object: {\n      type: 'object',\n      properties: {\n        href: {\n          type: 'string',\n          description: 'This will always be set to null, as the Web API does not support it at the moment.\\n'\n        },\n        total: {\n          type: 'integer',\n          description: 'The total number of followers.\\n'\n        }\n      }\n    },\n    image_object: {\n      type: 'object',\n      properties: {\n        height: {\n          type: 'integer',\n          description: 'The image height in pixels.\\n'\n        },\n        url: {\n          type: 'string',\n          description: 'The source URL of the image.\\n'\n        },\n        width: {\n          type: 'integer',\n          description: 'The image width in pixels.\\n'\n        }\n      },\n      required: [        'height',\n        'url',\n        'width'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      ids: {
        type: 'string',
        title: 'Spotify Artist IDs',
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the artists. Maximum: 50 IDs.\n',
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.artists.list(body)));
};

export default { metadata, tool, handler };

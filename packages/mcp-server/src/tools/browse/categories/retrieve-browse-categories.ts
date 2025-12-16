// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'spotted-ts-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'browse.categories',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/browse/categories/{category_id}',
  operationId: 'get-a-category',
};

export const tool: Tool = {
  name: 'retrieve_browse_categories',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/category_retrieve_response',\n  $defs: {\n    category_retrieve_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) of the category.\\n'\n        },\n        href: {\n          type: 'string',\n          description: 'A link to the Web API endpoint returning full details of the category.\\n'\n        },\n        icons: {\n          type: 'array',\n          description: 'The category icon, in various sizes.\\n',\n          items: {\n            $ref: '#/$defs/image_object'\n          }\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the category.\\n'\n        },\n        published: {\n          type: 'boolean',\n          description: 'The playlist\\'s public/private status (if it should be added to the user\\'s profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\\n'\n        }\n      },\n      required: [        'id',\n        'href',\n        'icons',\n        'name'\n      ]\n    },\n    image_object: {\n      type: 'object',\n      properties: {\n        height: {\n          type: 'integer',\n          description: 'The image height in pixels.\\n'\n        },\n        url: {\n          type: 'string',\n          description: 'The source URL of the image.\\n'\n        },\n        width: {\n          type: 'integer',\n          description: 'The image width in pixels.\\n'\n        },\n        published: {\n          type: 'boolean',\n          description: 'The playlist\\'s public/private status (if it should be added to the user\\'s profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\\n'\n        }\n      },\n      required: [        'height',\n        'url',\n        'width'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      category_id: {
        type: 'string',
        title: 'Category ID',
        description:
          'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
      },
      locale: {
        type: 'string',
        title: 'Locale',
        description:
          'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['category_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const { category_id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await client.browse.categories.retrieve(category_id, body)),
    );
  } catch (error) {
    if (error instanceof Spotted.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };

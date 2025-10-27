// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me.albums',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/me/albums',
  operationId: 'remove-albums-user',
};

export const tool: Tool = {
  name: 'remove_me_albums',
  description: "Remove one or more albums from the current user's 'Your Music' library.\n",
  inputSchema: {
    type: 'object',
    properties: {
      query_ids: {
        type: 'string',
        title: 'Spotify Album IDs',
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
      },
      body_ids: {
        type: 'array',
        description:
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
        items: {
          type: 'string',
        },
      },
    },
    required: ['query_ids'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.me.albums.remove(body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

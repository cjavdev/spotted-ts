// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me.shows',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/me/shows',
  operationId: 'save-shows-user',
};

export const tool: Tool = {
  name: 'save_me_shows',
  description: "Save one or more shows to current Spotify user's library.\n",
  inputSchema: {
    type: 'object',
    properties: {
      query_ids: {
        type: 'string',
        title: 'Ids',
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
      },
      body_ids: {
        type: 'array',
        description:
          'A JSON array of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).  \nA maximum of 50 items can be specified in one request. *Note: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored.*',
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
  const response = await client.me.shows.save(body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

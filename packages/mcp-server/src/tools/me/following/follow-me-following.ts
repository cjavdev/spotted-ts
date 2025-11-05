// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me.following',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/me/following',
  operationId: 'follow-artists-users',
};

export const tool: Tool = {
  name: 'follow_me_following',
  description: 'Add the current user as a follower of one or more artists or other Spotify users.\n',
  inputSchema: {
    type: 'object',
    properties: {
      ids: {
        type: 'array',
        description:
          'A JSON array of the artist or user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nFor example: `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50 IDs can be sent in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
        items: {
          type: 'string',
        },
      },
    },
    required: ['ids'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.me.following.follow(body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

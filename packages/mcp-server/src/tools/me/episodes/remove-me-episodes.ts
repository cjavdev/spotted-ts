// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me.episodes',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/me/episodes',
  operationId: 'remove-episodes-user',
};

export const tool: Tool = {
  name: 'remove_me_episodes',
  description:
    "Remove one or more episodes from the current user's library.<br/>\nThis API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).\n",
  inputSchema: {
    type: 'object',
    properties: {
      ids: {
        type: 'array',
        description:
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
        items: {
          type: 'string',
        },
      },
    },
    required: [],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.me.episodes.remove(body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me.audiobooks',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/me/audiobooks',
  operationId: 'save-audiobooks-user',
};

export const tool: Tool = {
  name: 'save_me_audiobooks',
  description: "Save one or more audiobooks to the current Spotify user's library.\n",
  inputSchema: {
    type: 'object',
    properties: {
      ids: {
        type: 'string',
        title: 'Spotify Audiobook IDs',
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
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
  const response = await client.me.audiobooks.save(body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

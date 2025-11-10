// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me.player.queue',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/me/player/queue',
  operationId: 'get-queue',
};

export const tool: Tool = {
  name: 'get_player_me_queue',
  description: "Get the list of objects that make up the user's queue.\n",
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  return asTextContentResult(await client.me.player.queue.get());
};

export default { metadata, tool, handler };

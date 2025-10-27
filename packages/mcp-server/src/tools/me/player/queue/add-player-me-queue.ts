// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me.player.queue',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/me/player/queue',
  operationId: 'add-to-queue',
};

export const tool: Tool = {
  name: 'add_player_me_queue',
  description:
    "Add an item to be played next in the user's current playback queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
  inputSchema: {
    type: 'object',
    properties: {
      uri: {
        type: 'string',
        title: 'Spotify URI',
        description: 'The uri of the item to add to the queue. Must be a track or an episode uri.\n',
      },
      device_id: {
        type: 'string',
        title: 'Device ID',
        description:
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
      },
    },
    required: ['uri'],
  },
  annotations: {},
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.me.player.queue.add(body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me.player',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/me/player/shuffle',
  operationId: 'toggle-shuffle-for-users-playback',
};

export const tool: Tool = {
  name: 'toggle_shuffle_me_player',
  description:
    'Toggle shuffle on or off for user’s playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
  inputSchema: {
    type: 'object',
    properties: {
      state: {
        type: 'boolean',
        title: 'State',
        description:
          "**true** : Shuffle user's playback.<br/>\n**false** : Do not shuffle user's playback.\n",
      },
      device_id: {
        type: 'string',
        title: 'Device ID',
        description:
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
      },
    },
    required: ['state'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.me.player.toggleShuffle(body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

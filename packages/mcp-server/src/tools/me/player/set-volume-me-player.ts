// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me.player',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/me/player/volume',
  operationId: 'set-volume-for-users-playback',
};

export const tool: Tool = {
  name: 'set_volume_me_player',
  description:
    'Set the volume for the user’s current playback device. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
  inputSchema: {
    type: 'object',
    properties: {
      volume_percent: {
        type: 'integer',
        title: 'Volume %',
        description: 'The volume to set. Must be a value from 0 to 100 inclusive.\n',
      },
      device_id: {
        type: 'string',
        title: 'Device ID',
        description:
          "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
      },
    },
    required: ['volume_percent'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.me.player.setVolume(body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

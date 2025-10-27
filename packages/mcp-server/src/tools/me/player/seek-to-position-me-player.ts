// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me.player',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/me/player/seek',
  operationId: 'seek-to-position-in-currently-playing-track',
};

export const tool: Tool = {
  name: 'seek_to_position_me_player',
  description:
    'Seeks to the given position in the user’s currently playing track. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
  inputSchema: {
    type: 'object',
    properties: {
      position_ms: {
        type: 'integer',
        title: 'Position (ms)',
        description:
          'The position in milliseconds to seek to. Must be a\npositive number. Passing in a position that is greater than the length of\nthe track will cause the player to start playing the next song.\n',
      },
      device_id: {
        type: 'string',
        title: 'Device ID',
        description:
          "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
      },
    },
    required: ['position_ms'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.me.player.seekToPosition(body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

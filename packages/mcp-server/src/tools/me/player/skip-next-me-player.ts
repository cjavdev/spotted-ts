// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me.player',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/me/player/next',
  operationId: 'skip-users-playback-to-next-track',
};

export const tool: Tool = {
  name: 'skip_next_me_player',
  description:
    'Skips to next track in the user’s queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
  inputSchema: {
    type: 'object',
    properties: {
      device_id: {
        type: 'string',
        title: 'Device ID',
        description:
          "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
      },
    },
    required: [],
  },
  annotations: {},
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.me.player.skipNext(body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

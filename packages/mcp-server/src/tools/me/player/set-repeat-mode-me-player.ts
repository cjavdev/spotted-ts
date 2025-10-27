// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me.player',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/me/player/repeat',
  operationId: 'set-repeat-mode-on-users-playback',
};

export const tool: Tool = {
  name: 'set_repeat_mode_me_player',
  description:
    "Set the repeat mode for the user's playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
  inputSchema: {
    type: 'object',
    properties: {
      state: {
        type: 'string',
        title: 'State',
        description:
          '**track**, **context** or **off**.<br/>\n**track** will repeat the current track.<br/>\n**context** will repeat the current context.<br/>\n**off** will turn repeat off.\n',
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
  const response = await client.me.player.setRepeatMode(body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

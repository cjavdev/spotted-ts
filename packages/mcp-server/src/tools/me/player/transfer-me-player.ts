// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me.player',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/me/player',
  operationId: 'transfer-a-users-playback',
};

export const tool: Tool = {
  name: 'transfer_me_player',
  description:
    'Transfer playback to a new device and optionally begin playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
  inputSchema: {
    type: 'object',
    properties: {
      device_ids: {
        type: 'array',
        description:
          'A JSON array containing the ID of the device on which playback should be started/transferred.<br/>For example:`{device_ids:["74ASZWbe4lXaubB36ztrGX"]}`<br/>_**Note**: Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return `400 Bad Request`_\n',
        items: {
          type: 'string',
        },
      },
      play: {
        type: 'boolean',
        description:
          '**true**: ensure playback happens on new device.<br/>**false** or not provided: keep the current playback state.\n',
      },
      published: {
        type: 'boolean',
        description:
          "The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
      },
    },
    required: ['device_ids'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.me.player.transfer(body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

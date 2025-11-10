// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me.player',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/me/player/play',
  operationId: 'start-a-users-playback',
};

export const tool: Tool = {
  name: 'start_playback_me_player',
  description:
    "Start a new context or resume current playback on the user's active device. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
  inputSchema: {
    type: 'object',
    properties: {
      device_id: {
        type: 'string',
        title: 'Device ID',
        description:
          "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
      },
      context_uri: {
        type: 'string',
        description:
          'Optional. Spotify URI of the context to play.\nValid contexts are albums, artists & playlists.\n`{context_uri:"spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"}`\n',
      },
      offset: {
        type: 'object',
        description:
          'Optional. Indicates from where in the context playback should start. Only available when context_uri corresponds to an album or playlist object\n"position" is zero based and can’t be negative. Example: `"offset": {"position": 5}`\n"uri" is a string representing the uri of the item to start at. Example: `"offset": {"uri": "spotify:track:1301WleyT98MSxVHPZCA6M"}`\n',
        additionalProperties: true,
      },
      position_ms: {
        type: 'integer',
        description:
          'Indicates from what position to start playback. Must be a positive number. Passing in a position that is greater than the length of the track will cause the player to start playing the next song.\n',
      },
      uris: {
        type: 'array',
        description:
          'Optional. A JSON array of the Spotify track URIs to play.\nFor example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]}`\n',
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
  const response = await client.me.player.startPlayback(body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

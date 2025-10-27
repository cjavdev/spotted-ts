// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'playlists.followers',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/playlists/{playlist_id}/followers',
  operationId: 'unfollow-playlist',
};

export const tool: Tool = {
  name: 'unfollow_playlists_followers',
  description: 'Remove the current user as a follower of a playlist.\n',
  inputSchema: {
    type: 'object',
    properties: {
      playlist_id: {
        type: 'string',
        title: 'Playlist ID',
        description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
      },
    },
    required: ['playlist_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const { playlist_id, ...body } = args as any;
  const response = await client.playlists.followers.unfollow(playlist_id).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

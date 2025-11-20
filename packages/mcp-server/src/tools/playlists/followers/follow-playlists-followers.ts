// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'playlists.followers',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/playlists/{playlist_id}/followers',
  operationId: 'follow-playlist',
};

export const tool: Tool = {
  name: 'follow_playlists_followers',
  description: 'Add the current user as a follower of a playlist.\n',
  inputSchema: {
    type: 'object',
    properties: {
      playlist_id: {
        type: 'string',
        title: 'Playlist ID',
        description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
      },
      '$.components.schemas.*.properties.published': {
        type: 'boolean',
        description:
          "Defaults to `true`. If `true` the playlist will be included in user's public playlists (added to profile), if `false` it will remain private. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
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
  const response = await client.playlists.followers.follow(playlist_id, body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

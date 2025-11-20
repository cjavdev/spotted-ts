// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'playlists',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/playlists/{playlist_id}',
  operationId: 'change-playlist-details',
};

export const tool: Tool = {
  name: 'update_playlists',
  description:
    "Change a playlist's name and public/private state. (The user must, of\ncourse, own the playlist.)\n",
  inputSchema: {
    type: 'object',
    properties: {
      playlist_id: {
        type: 'string',
        title: 'Playlist ID',
        description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
      },
      collaborative: {
        type: 'boolean',
        description:
          'If `true`, the playlist will become collaborative and other users will be able to modify the playlist in their Spotify client. <br/>\n_**Note**: You can only set `collaborative` to `true` on non-public playlists._\n',
      },
      description: {
        type: 'string',
        description: 'Value for playlist description as displayed in Spotify Clients and in the Web API.\n',
      },
      name: {
        type: 'string',
        description: 'The new name for the playlist, for example `"My New Playlist Title"`\n',
      },
      public: {
        type: 'boolean',
        description:
          "The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
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
  const response = await client.playlists.update(playlist_id, body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

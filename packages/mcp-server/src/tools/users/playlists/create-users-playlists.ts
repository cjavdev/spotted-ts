// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'users.playlists',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/users/{user_id}/playlists',
  operationId: 'create-playlist',
};

export const tool: Tool = {
  name: 'create_users_playlists',
  description:
    'Create a playlist for a Spotify user. (The playlist will be empty until\nyou [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)\nEach user is generally limited to a maximum of 11000 playlists.\n',
  inputSchema: {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
        title: 'User ID',
        description: "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
      },
      name: {
        type: 'string',
        description:
          'The name for the new playlist, for example `"Your Coolest Playlist"`. This name does not need to be unique; a user may have several playlists with the same name.\n',
      },
      collaborative: {
        type: 'boolean',
        description:
          'Defaults to `false`. If `true` the playlist will be collaborative. _**Note**: to create a collaborative playlist you must also set `public` to `false`. To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](/documentation/web-api/concepts/scopes/#list-of-scopes)._\n',
      },
      description: {
        type: 'string',
        description: 'value for playlist description as displayed in Spotify Clients and in the Web API.\n',
      },
      public: {
        type: 'boolean',
        description:
          "Defaults to `true`. The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private. To be able to create private playlists, the user must have granted the `playlist-modify-private` [scope](/documentation/web-api/concepts/scopes/#list-of-scopes). For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
      },
    },
    required: ['user_id', 'name'],
  },
  annotations: {},
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const { user_id, ...body } = args as any;
  return asTextContentResult(await client.users.playlists.create(user_id, body));
};

export default { metadata, tool, handler };

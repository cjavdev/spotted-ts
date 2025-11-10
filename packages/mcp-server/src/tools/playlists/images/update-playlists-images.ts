// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'playlists.images',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/playlists/{playlist_id}/images',
  operationId: 'upload-custom-playlist-cover',
};

export const tool: Tool = {
  name: 'update_playlists_images',
  description: 'Replace the image used to represent a specific playlist.\n',
  inputSchema: {
    type: 'object',
    properties: {
      playlist_id: {
        type: 'string',
        title: 'Playlist ID',
        description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
      },
      body: {
        type: 'string',
        description: 'Base64 encoded JPEG image data, maximum payload size is 256 KB.',
      },
    },
    required: ['playlist_id', 'body'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const { playlist_id, body, ...body } = args as any;
  const response = await client.playlists.images.update(playlist_id, body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

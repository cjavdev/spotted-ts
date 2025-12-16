// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me.tracks',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/me/tracks',
  operationId: 'save-tracks-user',
};

export const tool: Tool = {
  name: 'save_me_tracks',
  description: "Save one or more tracks to the current user's 'Your Music' library.\n",
  inputSchema: {
    type: 'object',
    properties: {
      ids: {
        type: 'array',
        description:
          'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `timestamped_ids` is present in the body, any IDs listed in the query parameters (deprecated) or the `ids` field in the body will be ignored._\n',
        items: {
          type: 'string',
        },
      },
      published: {
        type: 'boolean',
        description:
          "The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
      },
      timestamped_ids: {
        type: 'array',
        description:
          "A JSON array of objects containing track IDs with their corresponding timestamps. Each object must include a track ID and an `added_at` timestamp. This allows you to specify when tracks were added to maintain a specific chronological order in the user's library.<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `timestamped_ids` is present in the body, any IDs listed in the query parameters (deprecated) or the `ids` field in the body will be ignored._\n",
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description:
                'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
            },
            added_at: {
              type: 'string',
              description:
                "The timestamp when the track was added to the library. Use ISO 8601 format with UTC timezone (e.g., `2023-01-15T14:30:00Z`). You can specify past timestamps to insert tracks at specific positions in the library's chronological order. The API uses minute-level granularity for ordering, though the timestamp supports millisecond precision.\n",
              format: 'date-time',
            },
          },
          required: ['id', 'added_at'],
        },
      },
    },
    required: ['ids'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.me.tracks.save(body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

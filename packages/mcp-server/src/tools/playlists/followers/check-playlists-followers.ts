// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'spotted-ts-mcp/filtering';
import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'playlists.followers',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/playlists/{playlist_id}/followers/contains',
  operationId: 'check-if-user-follows-playlist',
};

export const tool: Tool = {
  name: 'check_playlists_followers',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCheck to see if the current user is following a specified playlist.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/follower_check_response',\n  $defs: {\n    follower_check_response: {\n      type: 'array',\n      items: {\n        type: 'boolean'\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      playlist_id: {
        type: 'string',
        title: 'Playlist ID',
        description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
      },
      ids: {
        type: 'string',
        title: 'Spotify user IDs',
        description:
          "**Deprecated** A single item list containing current user's [Spotify Username](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 1 id.\n",
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['playlist_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const { playlist_id, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.playlists.followers.check(playlist_id, body)),
  );
};

export default { metadata, tool, handler };

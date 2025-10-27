// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'spotted-ts-mcp/filtering';
import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'playlists.tracks',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/playlists/{playlist_id}/tracks',
  operationId: 'add-tracks-to-playlist',
};

export const tool: Tool = {
  name: 'add_playlists_tracks',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nAdd one or more items to a user's playlist.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/track_add_response',\n  $defs: {\n    track_add_response: {\n      type: 'object',\n      properties: {\n        snapshot_id: {\n          type: 'string'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      playlist_id: {
        type: 'string',
        title: 'Playlist ID',
        description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
      },
      query_position: {
        type: 'integer',
        title: 'Position (append by default)',
        description:
          'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n',
      },
      query_uris: {
        type: 'string',
        title: 'Spotify Track URIs',
        description:
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add, can be track or episode URIs. For example:<br/>`uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be added in one request. <br/>\n_**Note**: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below._\n',
      },
      body_position: {
        type: 'integer',
        description:
          'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0` ; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they appear in the uris array. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"], "position": 3}`\n',
      },
      body_uris: {
        type: 'array',
        description:
          'A JSON array of the [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}`<br/>A maximum of 100 items can be added in one request. _**Note**: if the `uris` parameter is present in the query string, any URIs listed here in the body will be ignored._\n',
        items: {
          type: 'string',
        },
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
  annotations: {},
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const { playlist_id, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.playlists.tracks.add(playlist_id, body)),
  );
};

export default { metadata, tool, handler };

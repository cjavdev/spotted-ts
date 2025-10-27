// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'playlists',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/playlists/{playlist_id}',
  operationId: 'get-playlist',
};

export const tool: Tool = {
  name: 'retrieve_playlists',
  description: 'Get a playlist owned by a Spotify user.\n',
  inputSchema: {
    type: 'object',
    properties: {
      playlist_id: {
        type: 'string',
        title: 'Playlist ID',
        description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
      },
      additional_types: {
        type: 'string',
        title: 'Additional Types',
        description:
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
      },
      fields: {
        type: 'string',
        title: 'Fields',
        description:
          "Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the playlist''s description and URI: `fields=description,uri`. A dot\nseparator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder: `fields=tracks.items(added_at,added_by.id)`.\nUse multiple parentheses to drill down into nested objects, for example: `fields=tracks.items(track(name,href,album(name,href)))`.\nFields can be excluded by prefixing them with an exclamation mark, for example:\n`fields=tracks.items(track(name,href,album(!name,href)))`\n",
      },
      market: {
        type: 'string',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      },
    },
    required: ['playlist_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const { playlist_id, ...body } = args as any;
  return asTextContentResult(await client.playlists.retrieve(playlist_id, body));
};

export default { metadata, tool, handler };

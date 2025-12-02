// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'playlists.tracks',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/playlists/{playlist_id}/tracks',
  operationId: 'get-playlists-tracks',
};

export const tool: Tool = {
  name: 'list_playlists_tracks',
  description: 'Get full details of the items of a playlist owned by a Spotify user.\n',
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
          'Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n',
      },
      limit: {
        type: 'integer',
        title: 'Limit',
        description: 'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 100.\n',
      },
      market: {
        type: 'string',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      },
      offset: {
        type: 'integer',
        title: 'Offset',
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
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
  const response = await client.playlists.tracks.list(playlist_id, body).asResponse();
  try {
    return asTextContentResult(await response.json());
  } catch (error) {
    if (error instanceof Spotted.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };

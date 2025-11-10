// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'tracks',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/tracks/{id}',
  operationId: 'get-track',
};

export const tool: Tool = {
  name: 'retrieve_tracks',
  description: 'Get Spotify catalog information for a single track identified by its\nunique Spotify ID.\n',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        title: 'Spotify Track ID',
        description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
      },
      market: {
        type: 'string',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      },
    },
    required: ['id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await client.tracks.retrieve(id, body));
};

export default { metadata, tool, handler };

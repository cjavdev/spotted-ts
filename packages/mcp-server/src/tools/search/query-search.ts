// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'search',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/search',
  operationId: 'search',
};

export const tool: Tool = {
  name: 'query_search',
  description:
    'Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks\nthat match a keyword string. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
  inputSchema: {
    type: 'object',
    properties: {
      q: {
        type: 'string',
        title: 'Query',
        description:
          'Your search query.\n\nYou can narrow down your search using field filters. The available filters are `album`, `artist`, `track`, `year`, `upc`, `tag:hipster`, `tag:new`, `isrc`, and `genre`. Each field filter only applies to certain result types.\n\nThe `artist` and `year` filters can be used while searching albums, artists and tracks. You can filter on a single `year` or a range (e.g. 1955-1960).<br />\nThe `album` filter can be used while searching albums and tracks.<br />\nThe `genre` filter can be used while searching artists and tracks.<br />\nThe `isrc` and `track` filters can be used while searching tracks.<br />\nThe `upc`, `tag:new` and `tag:hipster` filters can only be used while searching albums. The `tag:new` filter will return albums released in the past two weeks and `tag:hipster` can be used to return only albums with the lowest 10% popularity.<br />\n',
      },
      type: {
        type: 'array',
        title: 'Item type',
        description:
          'A comma-separated list of item types to search across. Search results include hits\nfrom all the specified item types. For example: `q=abacab&type=album,track` returns\nboth albums and tracks matching "abacab".\n',
        items: {
          type: 'string',
          enum: ['album', 'artist', 'playlist', 'track', 'show', 'episode', 'audiobook'],
        },
      },
      include_external: {
        type: 'string',
        title: 'Include External',
        description:
          'If `include_external=audio` is specified it signals that the client can play externally hosted audio content, and marks\nthe content as playable in the response. By default externally hosted audio content is marked as unplayable in the response.',
        enum: ['audio'],
      },
      limit: {
        type: 'integer',
        title: 'Limit',
        description: 'The maximum number of results to return in each item type.\n',
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
          'The index of the first result to return. Use\nwith limit to get the next page of search results.\n',
      },
    },
    required: ['q', 'type'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.search.query(body));
};

export default { metadata, tool, handler };

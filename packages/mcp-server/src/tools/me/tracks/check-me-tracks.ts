// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'spotted-ts-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me.tracks',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/me/tracks/contains',
  operationId: 'check-users-saved-tracks',
};

export const tool: Tool = {
  name: 'check_me_tracks',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCheck if one or more tracks is already saved in the current Spotify user's 'Your Music' library.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/track_check_response',\n  $defs: {\n    track_check_response: {\n      type: 'array',\n      items: {\n        type: 'boolean'\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      ids: {
        type: 'string',
        title: 'Spotify Track IDs',
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['ids'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.me.tracks.check(body)));
  } catch (error) {
    if (error instanceof Spotted.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };

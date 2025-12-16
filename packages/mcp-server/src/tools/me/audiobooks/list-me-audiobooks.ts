// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me.audiobooks',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/me/audiobooks',
  operationId: 'get-users-saved-audiobooks',
};

export const tool: Tool = {
  name: 'list_me_audiobooks',
  description: "Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.\n",
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'integer',
        title: 'Limit',
        description: 'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
      },
      offset: {
        type: 'integer',
        title: 'Offset',
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.me.audiobooks.list(body).asResponse();
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

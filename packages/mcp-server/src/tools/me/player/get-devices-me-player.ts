// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'spotted-ts-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'me.player',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/me/player/devices',
  operationId: 'get-a-users-available-devices',
};

export const tool: Tool = {
  name: 'get_devices_me_player',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet information about a user’s available Spotify Connect devices. Some device models are not supported and will not be listed in the API response.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/player_get_devices_response',\n  $defs: {\n    player_get_devices_response: {\n      type: 'object',\n      properties: {\n        devices: {\n          type: 'array',\n          items: {\n            $ref: '#/$defs/device_object'\n          }\n        }\n      },\n      required: [        'devices'\n      ]\n    },\n    device_object: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The device ID. This ID is unique and persistent to some extent. However, this is not guaranteed and any cached `device_id` should periodically be cleared out and refetched as necessary.'\n        },\n        is_active: {\n          type: 'boolean',\n          description: 'If this device is the currently active device.'\n        },\n        is_private_session: {\n          type: 'boolean',\n          description: 'If this device is currently in a private session.'\n        },\n        is_restricted: {\n          type: 'boolean',\n          description: 'Whether controlling this device is restricted. At present if this is \"true\" then no Web API commands will be accepted by this device.'\n        },\n        name: {\n          type: 'string',\n          description: 'A human-readable name for the device. Some devices have a name that the user can configure (e.g. \\\\\"Loudest speaker\\\\\") and some devices have a generic name associated with the manufacturer or device model.'\n        },\n        supports_volume: {\n          type: 'boolean',\n          description: 'If this device can be used to set the volume.'\n        },\n        type: {\n          type: 'string',\n          description: 'Device type, such as \"computer\", \"smartphone\" or \"speaker\".'\n        },\n        volume_percent: {\n          type: 'integer',\n          description: 'The current volume in percent.'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Spotted, args: Record<string, unknown> | undefined) => {
  const { jq_filter } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.me.player.getDevices()));
  } catch (error) {
    if (error instanceof Spotted.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };

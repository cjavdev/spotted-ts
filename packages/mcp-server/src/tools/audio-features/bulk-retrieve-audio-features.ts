// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'spotted-ts-mcp/filtering';
import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'audio_features',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/audio-features',
  operationId: 'get-several-audio-features',
};

export const tool: Tool = {
  name: 'bulk_retrieve_audio_features',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet audio features for multiple tracks based on their Spotify IDs.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/audio_feature_bulk_retrieve_response',\n  $defs: {\n    audio_feature_bulk_retrieve_response: {\n      type: 'object',\n      properties: {\n        audio_features: {\n          type: 'array',\n          items: {\n            type: 'object',\n            properties: {\n              id: {\n                type: 'string',\n                description: 'The Spotify ID for the track.\\n'\n              },\n              acousticness: {\n                type: 'number',\n                description: 'A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.\\n'\n              },\n              analysis_url: {\n                type: 'string',\n                description: 'A URL to access the full audio analysis of this track. An access token is required to access this data.\\n'\n              },\n              danceability: {\n                type: 'number',\n                description: 'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.\\n'\n              },\n              duration_ms: {\n                type: 'integer',\n                description: 'The duration of the track in milliseconds.\\n'\n              },\n              energy: {\n                type: 'number',\n                description: 'Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.\\n'\n              },\n              instrumentalness: {\n                type: 'number',\n                description: 'Predicts whether a track contains no vocals. \"Ooh\" and \"aah\" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly \"vocal\". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.\\n'\n              },\n              key: {\n                type: 'integer',\n                description: 'The key the track is in. Integers map to pitches using standard [Pitch Class notation](https://en.wikipedia.org/wiki/Pitch_class). E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.\\n'\n              },\n              liveness: {\n                type: 'number',\n                description: 'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.\\n'\n              },\n              loudness: {\n                type: 'number',\n                description: 'The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.\\n'\n              },\n              mode: {\n                type: 'integer',\n                description: 'Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.\\n'\n              },\n              speechiness: {\n                type: 'number',\n                description: 'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.\\n'\n              },\n              tempo: {\n                type: 'number',\n                description: 'The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.\\n'\n              },\n              time_signature: {\n                type: 'integer',\n                description: 'An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of \"3/4\", to \"7/4\".'\n              },\n              track_href: {\n                type: 'string',\n                description: 'A link to the Web API endpoint providing full details of the track.\\n'\n              },\n              type: {\n                type: 'string',\n                description: 'The object type.',\n                enum: [                  'audio_features'\n                ]\n              },\n              uri: {\n                type: 'string',\n                description: 'The Spotify URI for the track.\\n'\n              },\n              valence: {\n                type: 'number',\n                description: 'A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).\\n'\n              }\n            }\n          }\n        }\n      },\n      required: [        'audio_features'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      ids: {
        type: 'string',
        title: 'Spotify Track IDs',
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n',
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.audioFeatures.bulkRetrieve(body)));
};

export default { metadata, tool, handler };

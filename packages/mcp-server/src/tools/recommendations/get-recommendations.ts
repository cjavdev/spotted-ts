// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'spotted-ts-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Spotted from 'spotted-ts';

export const metadata: Metadata = {
  resource: 'recommendations',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/recommendations',
  operationId: 'get-recommendations',
};

export const tool: Tool = {
  name: 'get_recommendations',
  description:
    'Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.\n\nFor artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.\n',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'integer',
        title: 'Limit',
        description:
          'The target size of the list of recommended tracks. For seeds with unusually small pools or when highly restrictive filtering is applied, it may be impossible to generate the requested number of recommended tracks. Debugging information for such cases is available in the response. Default: 20\\. Minimum: 1\\. Maximum: 100.\n',
      },
      market: {
        type: 'string',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      },
      max_acousticness: {
        type: 'number',
        title: 'Max. Acousticness',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      },
      max_danceability: {
        type: 'number',
        title: 'Max. Danceability',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      },
      max_duration_ms: {
        type: 'integer',
        title: 'Max. Duration (ms)',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      },
      max_energy: {
        type: 'number',
        title: 'Max. Energy',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      },
      max_instrumentalness: {
        type: 'number',
        title: 'Max. Instrumentalness',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      },
      max_key: {
        type: 'integer',
        title: 'Max. Key',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      },
      max_liveness: {
        type: 'number',
        title: 'Max. Liveness',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      },
      max_loudness: {
        type: 'number',
        title: 'Max. Loudness',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      },
      max_mode: {
        type: 'integer',
        title: 'Max. Mode',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      },
      max_popularity: {
        type: 'integer',
        title: 'Max. Popularity',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      },
      max_speechiness: {
        type: 'number',
        title: 'Max. Speechiness',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      },
      max_tempo: {
        type: 'number',
        title: 'Max. Tempo',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      },
      max_time_signature: {
        type: 'integer',
        title: 'Max. Time Signature',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      },
      max_valence: {
        type: 'number',
        title: 'Max. Valence',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      },
      min_acousticness: {
        type: 'number',
        title: 'Min. Acousticness',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      },
      min_danceability: {
        type: 'number',
        title: 'Min. Danceability',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      },
      min_duration_ms: {
        type: 'integer',
        title: 'Min. Duration (ms)',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      },
      min_energy: {
        type: 'number',
        title: 'Min. Energy',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      },
      min_instrumentalness: {
        type: 'number',
        title: 'Min. Instrumentalness',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      },
      min_key: {
        type: 'integer',
        title: 'Min. Key',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      },
      min_liveness: {
        type: 'number',
        title: 'Min. Liveness',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      },
      min_loudness: {
        type: 'number',
        title: 'Min. Loudness',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      },
      min_mode: {
        type: 'integer',
        title: 'Min. Mode',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      },
      min_popularity: {
        type: 'integer',
        title: 'Min. Popularity',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      },
      min_speechiness: {
        type: 'number',
        title: 'Min. Speechiness',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      },
      min_tempo: {
        type: 'number',
        title: 'Min. Tempo',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      },
      min_time_signature: {
        type: 'integer',
        title: 'Min. Time Signature',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      },
      min_valence: {
        type: 'number',
        title: 'Min. Valence',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      },
      seed_artists: {
        type: 'string',
        title: 'Spotify Artist ID Seeds',
        description:
          'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for seed artists.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_genres` and `seed_tracks` are not set_.\n',
      },
      seed_genres: {
        type: 'string',
        title: 'Genres Seeds',
        description:
          'A comma separated list of any genres in the set of [available genre seeds](/documentation/web-api/reference/get-recommendation-genres). Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_tracks` are not set_.\n',
      },
      seed_tracks: {
        type: 'string',
        title: 'Spotify Track ID Seeds',
        description:
          'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for a seed track.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_genres` are not set_.\n',
      },
      target_acousticness: {
        type: 'number',
        title: 'Target Acousticness',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      },
      target_danceability: {
        type: 'number',
        title: 'Target Danceability',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      },
      target_duration_ms: {
        type: 'integer',
        title: 'Target Duration (ms)',
        description: 'Target duration of the track (ms)',
      },
      target_energy: {
        type: 'number',
        title: 'Target Energy',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      },
      target_instrumentalness: {
        type: 'number',
        title: 'Target Instrumentalness',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      },
      target_key: {
        type: 'integer',
        title: 'Target Key',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      },
      target_liveness: {
        type: 'number',
        title: 'Target Liveness',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      },
      target_loudness: {
        type: 'number',
        title: 'Target Loudness',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      },
      target_mode: {
        type: 'integer',
        title: 'Target Mode',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      },
      target_popularity: {
        type: 'integer',
        title: 'Target Popularity',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      },
      target_speechiness: {
        type: 'number',
        title: 'Target Speechiness',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      },
      target_tempo: {
        type: 'number',
        title: 'Target Tempo',
        description: 'Target tempo (BPM)',
      },
      target_time_signature: {
        type: 'integer',
        title: 'Target Time Signature',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      },
      target_valence: {
        type: 'number',
        title: 'Target Valence',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
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
  return asTextContentResult(await client.recommendations.get(body));
};

export default { metadata, tool, handler };

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Recommendations extends APIResource {
  /**
   * Recommendations are generated based on the available information for a given
   * seed entity and matched against similar artists and tracks. If there is
   * sufficient information about the provided seeds, a list of tracks will be
   * returned together with pool size details.
   *
   * For artists and tracks that are very new or obscure there might not be enough
   * data to generate a list of tracks.
   *
   * @deprecated
   */
  get(
    query: RecommendationGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<RecommendationGetResponse> {
    return this._client.get('/recommendations', { query, ...options });
  }

  /**
   * Retrieve a list of available genres seed parameter values for
   * [recommendations](/documentation/web-api/reference/get-recommendations).
   *
   * @deprecated
   */
  listAvailableGenreSeeds(
    options?: RequestOptions,
  ): APIPromise<RecommendationListAvailableGenreSeedsResponse> {
    return this._client.get('/recommendations/available-genre-seeds', options);
  }
}

export interface RecommendationGetResponse {
  /**
   * An array of recommendation seed objects.
   */
  seeds: Array<RecommendationGetResponse.Seed>;

  /**
   * An array of track objects ordered according to the parameters supplied.
   */
  tracks: Array<Shared.TrackObject>;

  /**
   * The playlist's public/private status (if it should be added to the user's
   * profile or not): `true` the playlist will be public, `false` the playlist will
   * be private, `null` the playlist status is not relevant. For more about
   * public/private status, see
   * [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  published?: boolean;
}

export namespace RecommendationGetResponse {
  export interface Seed {
    /**
     * The id used to select this seed. This will be the same as the string used in the
     * `seed_artists`, `seed_tracks` or `seed_genres` parameter.
     */
    id?: string;

    /**
     * The number of tracks available after min\_\* and max\_\* filters have been
     * applied.
     */
    afterFilteringSize?: number;

    /**
     * The number of tracks available after relinking for regional availability.
     */
    afterRelinkingSize?: number;

    /**
     * A link to the full track or artist data for this seed. For tracks this will be a
     * link to a Track Object. For artists a link to an Artist Object. For genre seeds,
     * this value will be `null`.
     */
    href?: string;

    /**
     * The number of recommended tracks available for this seed.
     */
    initialPoolSize?: number;

    /**
     * The playlist's public/private status (if it should be added to the user's
     * profile or not): `true` the playlist will be public, `false` the playlist will
     * be private, `null` the playlist status is not relevant. For more about
     * public/private status, see
     * [Working with Playlists](/documentation/web-api/concepts/playlists)
     */
    published?: boolean;

    /**
     * The entity type of this seed. One of `artist`, `track` or `genre`.
     */
    type?: string;
  }
}

export interface RecommendationListAvailableGenreSeedsResponse {
  genres: Array<string>;
}

export interface RecommendationGetParams {
  /**
   * The target size of the list of recommended tracks. For seeds with unusually
   * small pools or when highly restrictive filtering is applied, it may be
   * impossible to generate the requested number of recommended tracks. Debugging
   * information for such cases is available in the response. Default: 20\. Minimum:
   * 1\. Maximum: 100.
   */
  limit?: number;

  /**
   * An
   * [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
   * If a country code is specified, only content that is available in that market
   * will be returned.<br/> If a valid user access token is specified in the request
   * header, the country associated with the user account will take priority over
   * this parameter.<br/> _**Note**: If neither market or user country are provided,
   * the content is considered unavailable for the client._<br/> Users can view the
   * country that is associated with their account in the
   * [account settings](https://www.spotify.com/account/overview/).
   */
  market?: string;

  /**
   * For each tunable track attribute, a hard ceiling on the selected track
   * attribute’s value can be provided. See tunable track attributes below for the
   * list of available options. For example, `max_instrumentalness=0.35` would filter
   * out most tracks that are likely to be instrumental.
   */
  max_acousticness?: number;

  /**
   * For each tunable track attribute, a hard ceiling on the selected track
   * attribute’s value can be provided. See tunable track attributes below for the
   * list of available options. For example, `max_instrumentalness=0.35` would filter
   * out most tracks that are likely to be instrumental.
   */
  max_danceability?: number;

  /**
   * For each tunable track attribute, a hard ceiling on the selected track
   * attribute’s value can be provided. See tunable track attributes below for the
   * list of available options. For example, `max_instrumentalness=0.35` would filter
   * out most tracks that are likely to be instrumental.
   */
  max_duration_ms?: number;

  /**
   * For each tunable track attribute, a hard ceiling on the selected track
   * attribute’s value can be provided. See tunable track attributes below for the
   * list of available options. For example, `max_instrumentalness=0.35` would filter
   * out most tracks that are likely to be instrumental.
   */
  max_energy?: number;

  /**
   * For each tunable track attribute, a hard ceiling on the selected track
   * attribute’s value can be provided. See tunable track attributes below for the
   * list of available options. For example, `max_instrumentalness=0.35` would filter
   * out most tracks that are likely to be instrumental.
   */
  max_instrumentalness?: number;

  /**
   * For each tunable track attribute, a hard ceiling on the selected track
   * attribute’s value can be provided. See tunable track attributes below for the
   * list of available options. For example, `max_instrumentalness=0.35` would filter
   * out most tracks that are likely to be instrumental.
   */
  max_key?: number;

  /**
   * For each tunable track attribute, a hard ceiling on the selected track
   * attribute’s value can be provided. See tunable track attributes below for the
   * list of available options. For example, `max_instrumentalness=0.35` would filter
   * out most tracks that are likely to be instrumental.
   */
  max_liveness?: number;

  /**
   * For each tunable track attribute, a hard ceiling on the selected track
   * attribute’s value can be provided. See tunable track attributes below for the
   * list of available options. For example, `max_instrumentalness=0.35` would filter
   * out most tracks that are likely to be instrumental.
   */
  max_loudness?: number;

  /**
   * For each tunable track attribute, a hard ceiling on the selected track
   * attribute’s value can be provided. See tunable track attributes below for the
   * list of available options. For example, `max_instrumentalness=0.35` would filter
   * out most tracks that are likely to be instrumental.
   */
  max_mode?: number;

  /**
   * For each tunable track attribute, a hard ceiling on the selected track
   * attribute’s value can be provided. See tunable track attributes below for the
   * list of available options. For example, `max_instrumentalness=0.35` would filter
   * out most tracks that are likely to be instrumental.
   */
  max_popularity?: number;

  /**
   * For each tunable track attribute, a hard ceiling on the selected track
   * attribute’s value can be provided. See tunable track attributes below for the
   * list of available options. For example, `max_instrumentalness=0.35` would filter
   * out most tracks that are likely to be instrumental.
   */
  max_speechiness?: number;

  /**
   * For each tunable track attribute, a hard ceiling on the selected track
   * attribute’s value can be provided. See tunable track attributes below for the
   * list of available options. For example, `max_instrumentalness=0.35` would filter
   * out most tracks that are likely to be instrumental.
   */
  max_tempo?: number;

  /**
   * For each tunable track attribute, a hard ceiling on the selected track
   * attribute’s value can be provided. See tunable track attributes below for the
   * list of available options. For example, `max_instrumentalness=0.35` would filter
   * out most tracks that are likely to be instrumental.
   */
  max_time_signature?: number;

  /**
   * For each tunable track attribute, a hard ceiling on the selected track
   * attribute’s value can be provided. See tunable track attributes below for the
   * list of available options. For example, `max_instrumentalness=0.35` would filter
   * out most tracks that are likely to be instrumental.
   */
  max_valence?: number;

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s
   * value can be provided. See tunable track attributes below for the list of
   * available options. For example, `min_tempo=140` would restrict results to only
   * those tracks with a tempo of greater than 140 beats per minute.
   */
  min_acousticness?: number;

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s
   * value can be provided. See tunable track attributes below for the list of
   * available options. For example, `min_tempo=140` would restrict results to only
   * those tracks with a tempo of greater than 140 beats per minute.
   */
  min_danceability?: number;

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s
   * value can be provided. See tunable track attributes below for the list of
   * available options. For example, `min_tempo=140` would restrict results to only
   * those tracks with a tempo of greater than 140 beats per minute.
   */
  min_duration_ms?: number;

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s
   * value can be provided. See tunable track attributes below for the list of
   * available options. For example, `min_tempo=140` would restrict results to only
   * those tracks with a tempo of greater than 140 beats per minute.
   */
  min_energy?: number;

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s
   * value can be provided. See tunable track attributes below for the list of
   * available options. For example, `min_tempo=140` would restrict results to only
   * those tracks with a tempo of greater than 140 beats per minute.
   */
  min_instrumentalness?: number;

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s
   * value can be provided. See tunable track attributes below for the list of
   * available options. For example, `min_tempo=140` would restrict results to only
   * those tracks with a tempo of greater than 140 beats per minute.
   */
  min_key?: number;

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s
   * value can be provided. See tunable track attributes below for the list of
   * available options. For example, `min_tempo=140` would restrict results to only
   * those tracks with a tempo of greater than 140 beats per minute.
   */
  min_liveness?: number;

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s
   * value can be provided. See tunable track attributes below for the list of
   * available options. For example, `min_tempo=140` would restrict results to only
   * those tracks with a tempo of greater than 140 beats per minute.
   */
  min_loudness?: number;

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s
   * value can be provided. See tunable track attributes below for the list of
   * available options. For example, `min_tempo=140` would restrict results to only
   * those tracks with a tempo of greater than 140 beats per minute.
   */
  min_mode?: number;

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s
   * value can be provided. See tunable track attributes below for the list of
   * available options. For example, `min_tempo=140` would restrict results to only
   * those tracks with a tempo of greater than 140 beats per minute.
   */
  min_popularity?: number;

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s
   * value can be provided. See tunable track attributes below for the list of
   * available options. For example, `min_tempo=140` would restrict results to only
   * those tracks with a tempo of greater than 140 beats per minute.
   */
  min_speechiness?: number;

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s
   * value can be provided. See tunable track attributes below for the list of
   * available options. For example, `min_tempo=140` would restrict results to only
   * those tracks with a tempo of greater than 140 beats per minute.
   */
  min_tempo?: number;

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s
   * value can be provided. See tunable track attributes below for the list of
   * available options. For example, `min_tempo=140` would restrict results to only
   * those tracks with a tempo of greater than 140 beats per minute.
   */
  min_time_signature?: number;

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s
   * value can be provided. See tunable track attributes below for the list of
   * available options. For example, `min_tempo=140` would restrict results to only
   * those tracks with a tempo of greater than 140 beats per minute.
   */
  min_valence?: number;

  /**
   * A comma separated list of
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for seed
   * artists. Up to 5 seed values may be provided in any combination of
   * `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required
   * if `seed_genres` and `seed_tracks` are not set_.
   */
  seed_artists?: string;

  /**
   * A comma separated list of any genres in the set of
   * [available genre seeds](/documentation/web-api/reference/get-recommendation-genres).
   * Up to 5 seed values may be provided in any combination of `seed_artists`,
   * `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists`
   * and `seed_tracks` are not set_.
   */
  seed_genres?: string;

  /**
   * A comma separated list of
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for a seed
   * track. Up to 5 seed values may be provided in any combination of `seed_artists`,
   * `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists`
   * and `seed_genres` are not set_.
   */
  seed_tracks?: string;

  /**
   * For each of the tunable track attributes (below) a target value may be provided.
   * Tracks with the attribute values nearest to the target values will be preferred.
   * For example, you might request `target_energy=0.6` and
   * `target_danceability=0.8`. All target values will be weighed equally in ranking
   * results.
   */
  target_acousticness?: number;

  /**
   * For each of the tunable track attributes (below) a target value may be provided.
   * Tracks with the attribute values nearest to the target values will be preferred.
   * For example, you might request `target_energy=0.6` and
   * `target_danceability=0.8`. All target values will be weighed equally in ranking
   * results.
   */
  target_danceability?: number;

  /**
   * Target duration of the track (ms)
   */
  target_duration_ms?: number;

  /**
   * For each of the tunable track attributes (below) a target value may be provided.
   * Tracks with the attribute values nearest to the target values will be preferred.
   * For example, you might request `target_energy=0.6` and
   * `target_danceability=0.8`. All target values will be weighed equally in ranking
   * results.
   */
  target_energy?: number;

  /**
   * For each of the tunable track attributes (below) a target value may be provided.
   * Tracks with the attribute values nearest to the target values will be preferred.
   * For example, you might request `target_energy=0.6` and
   * `target_danceability=0.8`. All target values will be weighed equally in ranking
   * results.
   */
  target_instrumentalness?: number;

  /**
   * For each of the tunable track attributes (below) a target value may be provided.
   * Tracks with the attribute values nearest to the target values will be preferred.
   * For example, you might request `target_energy=0.6` and
   * `target_danceability=0.8`. All target values will be weighed equally in ranking
   * results.
   */
  target_key?: number;

  /**
   * For each of the tunable track attributes (below) a target value may be provided.
   * Tracks with the attribute values nearest to the target values will be preferred.
   * For example, you might request `target_energy=0.6` and
   * `target_danceability=0.8`. All target values will be weighed equally in ranking
   * results.
   */
  target_liveness?: number;

  /**
   * For each of the tunable track attributes (below) a target value may be provided.
   * Tracks with the attribute values nearest to the target values will be preferred.
   * For example, you might request `target_energy=0.6` and
   * `target_danceability=0.8`. All target values will be weighed equally in ranking
   * results.
   */
  target_loudness?: number;

  /**
   * For each of the tunable track attributes (below) a target value may be provided.
   * Tracks with the attribute values nearest to the target values will be preferred.
   * For example, you might request `target_energy=0.6` and
   * `target_danceability=0.8`. All target values will be weighed equally in ranking
   * results.
   */
  target_mode?: number;

  /**
   * For each of the tunable track attributes (below) a target value may be provided.
   * Tracks with the attribute values nearest to the target values will be preferred.
   * For example, you might request `target_energy=0.6` and
   * `target_danceability=0.8`. All target values will be weighed equally in ranking
   * results.
   */
  target_popularity?: number;

  /**
   * For each of the tunable track attributes (below) a target value may be provided.
   * Tracks with the attribute values nearest to the target values will be preferred.
   * For example, you might request `target_energy=0.6` and
   * `target_danceability=0.8`. All target values will be weighed equally in ranking
   * results.
   */
  target_speechiness?: number;

  /**
   * Target tempo (BPM)
   */
  target_tempo?: number;

  /**
   * For each of the tunable track attributes (below) a target value may be provided.
   * Tracks with the attribute values nearest to the target values will be preferred.
   * For example, you might request `target_energy=0.6` and
   * `target_danceability=0.8`. All target values will be weighed equally in ranking
   * results.
   */
  target_time_signature?: number;

  /**
   * For each of the tunable track attributes (below) a target value may be provided.
   * Tracks with the attribute values nearest to the target values will be preferred.
   * For example, you might request `target_energy=0.6` and
   * `target_danceability=0.8`. All target values will be weighed equally in ranking
   * results.
   */
  target_valence?: number;
}

export declare namespace Recommendations {
  export {
    type RecommendationGetResponse as RecommendationGetResponse,
    type RecommendationListAvailableGenreSeedsResponse as RecommendationListAvailableGenreSeedsResponse,
    type RecommendationGetParams as RecommendationGetParams,
  };
}

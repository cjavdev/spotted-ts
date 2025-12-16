// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { CursorURLPage, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Tracks extends APIResource {
  /**
   * Get a list of the songs saved in the current Spotify user's 'Your Music'
   * library.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const trackListResponse of client.me.tracks.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: TrackListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TrackListResponsesCursorURLPage, TrackListResponse> {
    return this._client.getAPIList('/me/tracks', CursorURLPage<TrackListResponse>, { query, ...options });
  }

  /**
   * Check if one or more tracks is already saved in the current Spotify user's 'Your
   * Music' library.
   *
   * @example
   * ```ts
   * const response = await client.me.tracks.check({
   *   ids: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
   * });
   * ```
   */
  check(query: TrackCheckParams, options?: RequestOptions): APIPromise<TrackCheckResponse> {
    return this._client.get('/me/tracks/contains', { query, ...options });
  }

  /**
   * Remove one or more tracks from the current user's 'Your Music' library.
   *
   * @example
   * ```ts
   * await client.me.tracks.remove();
   * ```
   */
  remove(body: TrackRemoveParams | null | undefined = {}, options?: RequestOptions): APIPromise<void> {
    return this._client.delete('/me/tracks', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Save one or more tracks to the current user's 'Your Music' library.
   *
   * @example
   * ```ts
   * await client.me.tracks.save({ ids: ['string'] });
   * ```
   */
  save(body: TrackSaveParams, options?: RequestOptions): APIPromise<void> {
    return this._client.put('/me/tracks', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type TrackListResponsesCursorURLPage = CursorURLPage<TrackListResponse>;

export interface TrackListResponse {
  /**
   * The date and time the track was saved. Timestamps are returned in ISO 8601
   * format as Coordinated Universal Time (UTC) with a zero offset:
   * YYYY-MM-DDTHH:MM:SSZ. If the time is imprecise (for example, the date/time of an
   * album release), an additional field indicates the precision; see for example,
   * release_date in an album object.
   */
  added_at?: string;

  /**
   * The playlist's public/private status (if it should be added to the user's
   * profile or not): `true` the playlist will be public, `false` the playlist will
   * be private, `null` the playlist status is not relevant. For more about
   * public/private status, see
   * [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  published?: boolean;

  /**
   * Information about the track.
   */
  track?: Shared.TrackObject;
}

export type TrackCheckResponse = Array<boolean>;

export interface TrackListParams {
  /**
   * The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
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
   * The index of the first item to return. Default: 0 (the first item). Use with
   * limit to get the next set of items.
   */
  offset?: number;
}

export interface TrackCheckParams {
  /**
   * A comma-separated list of the
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example:
   * `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.
   */
  ids: string;
}

export interface TrackRemoveParams {
  /**
   * A JSON array of the
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example:
   * `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items
   * can be specified in one request. _**Note**: if the `ids` parameter is present in
   * the query string, any IDs listed here in the body will be ignored._
   */
  ids?: Array<string>;

  /**
   * The playlist's public/private status (if it should be added to the user's
   * profile or not): `true` the playlist will be public, `false` the playlist will
   * be private, `null` the playlist status is not relevant. For more about
   * public/private status, see
   * [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  published?: boolean;

  [k: string]: unknown;
}

export interface TrackSaveParams {
  /**
   * A JSON array of the
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example:
   * `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items
   * can be specified in one request. _**Note**: if the `timestamped_ids` is present
   * in the body, any IDs listed in the query parameters (deprecated) or the `ids`
   * field in the body will be ignored._
   */
  ids: Array<string>;

  /**
   * The playlist's public/private status (if it should be added to the user's
   * profile or not): `true` the playlist will be public, `false` the playlist will
   * be private, `null` the playlist status is not relevant. For more about
   * public/private status, see
   * [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  published?: boolean;

  /**
   * A JSON array of objects containing track IDs with their corresponding
   * timestamps. Each object must include a track ID and an `added_at` timestamp.
   * This allows you to specify when tracks were added to maintain a specific
   * chronological order in the user's library.<br/>A maximum of 50 items can be
   * specified in one request. _**Note**: if the `timestamped_ids` is present in the
   * body, any IDs listed in the query parameters (deprecated) or the `ids` field in
   * the body will be ignored._
   */
  timestamped_ids?: Array<TrackSaveParams.TimestampedID>;

  [k: string]: unknown;
}

export namespace TrackSaveParams {
  export interface TimestampedID {
    /**
     * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
     * track.
     */
    id: string;

    /**
     * The timestamp when the track was added to the library. Use ISO 8601 format with
     * UTC timezone (e.g., `2023-01-15T14:30:00Z`). You can specify past timestamps to
     * insert tracks at specific positions in the library's chronological order. The
     * API uses minute-level granularity for ordering, though the timestamp supports
     * millisecond precision.
     */
    added_at: string;
  }
}

export declare namespace Tracks {
  export {
    type TrackListResponse as TrackListResponse,
    type TrackCheckResponse as TrackCheckResponse,
    type TrackListResponsesCursorURLPage as TrackListResponsesCursorURLPage,
    type TrackListParams as TrackListParams,
    type TrackCheckParams as TrackCheckParams,
    type TrackRemoveParams as TrackRemoveParams,
    type TrackSaveParams as TrackSaveParams,
  };
}

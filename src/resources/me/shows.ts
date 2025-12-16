// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { CursorURLPage, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Shows extends APIResource {
  /**
   * Get a list of shows saved in the current Spotify user's library. Optional
   * parameters can be used to limit the number of shows returned.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const showListResponse of client.me.shows.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ShowListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ShowListResponsesCursorURLPage, ShowListResponse> {
    return this._client.getAPIList('/me/shows', CursorURLPage<ShowListResponse>, { query, ...options });
  }

  /**
   * Check if one or more shows is already saved in the current Spotify user's
   * library.
   *
   * @example
   * ```ts
   * const response = await client.me.shows.check({
   *   ids: '5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ',
   * });
   * ```
   */
  check(query: ShowCheckParams, options?: RequestOptions): APIPromise<ShowCheckResponse> {
    return this._client.get('/me/shows/contains', { query, ...options });
  }

  /**
   * Delete one or more shows from current Spotify user's library.
   *
   * @example
   * ```ts
   * await client.me.shows.remove();
   * ```
   */
  remove(body: ShowRemoveParams | null | undefined = {}, options?: RequestOptions): APIPromise<void> {
    return this._client.delete('/me/shows', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Save one or more shows to current Spotify user's library.
   *
   * @example
   * ```ts
   * await client.me.shows.save();
   * ```
   */
  save(body: ShowSaveParams | null | undefined = {}, options?: RequestOptions): APIPromise<void> {
    return this._client.put('/me/shows', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type ShowListResponsesCursorURLPage = CursorURLPage<ShowListResponse>;

export interface ShowListResponse {
  /**
   * The date and time the show was saved. Timestamps are returned in ISO 8601 format
   * as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ. If
   * the time is imprecise (for example, the date/time of an album release), an
   * additional field indicates the precision; see for example, release_date in an
   * album object.
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
   * Information about the show.
   */
  show?: Shared.ShowBase;
}

export type ShowCheckResponse = Array<boolean>;

export interface ShowListParams {
  /**
   * The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   */
  limit?: number;

  /**
   * The index of the first item to return. Default: 0 (the first item). Use with
   * limit to get the next set of items.
   */
  offset?: number;
}

export interface ShowCheckParams {
  /**
   * A comma-separated list of the
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows.
   * Maximum: 50 IDs.
   */
  ids: string;
}

export interface ShowRemoveParams {
  /**
   * A JSON array of the
   * [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * A maximum of 50 items can be specified in one request. _Note: if the `ids`
   * parameter is present in the query string, any IDs listed here in the body will
   * be ignored._
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
}

export interface ShowSaveParams {
  /**
   * A JSON array of the
   * [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * A maximum of 50 items can be specified in one request. _Note: if the `ids`
   * parameter is present in the query string, any IDs listed here in the body will
   * be ignored._
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
}

export declare namespace Shows {
  export {
    type ShowListResponse as ShowListResponse,
    type ShowCheckResponse as ShowCheckResponse,
    type ShowListResponsesCursorURLPage as ShowListResponsesCursorURLPage,
    type ShowListParams as ShowListParams,
    type ShowCheckParams as ShowCheckParams,
    type ShowRemoveParams as ShowRemoveParams,
    type ShowSaveParams as ShowSaveParams,
  };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Following extends APIResource {
  /**
   * Get the current user's followed artists.
   *
   * @example
   * ```ts
   * const response = await client.me.following.bulkRetrieve({
   *   type: 'artist',
   * });
   * ```
   */
  bulkRetrieve(
    query: FollowingBulkRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<FollowingBulkRetrieveResponse> {
    return this._client.get('/me/following', { query, ...options });
  }

  /**
   * Check to see if the current user is following one or more artists or other
   * Spotify users.
   *
   * **Note:** This endpoint is deprecated. Use
   * [Check User's Saved Items](/documentation/web-api/reference/check-library-contains)
   * instead.
   *
   * @deprecated
   */
  check(query: FollowingCheckParams, options?: RequestOptions): APIPromise<FollowingCheckResponse> {
    return this._client.get('/me/following/contains', { query, ...options });
  }

  /**
   * Add the current user as a follower of one or more artists or other Spotify
   * users.
   *
   * **Note:** This endpoint is deprecated. Use
   * [Save Items to Library](/documentation/web-api/reference/save-library-items)
   * instead.
   *
   * @deprecated
   */
  follow(body: FollowingFollowParams, options?: RequestOptions): APIPromise<void> {
    return this._client.put('/me/following', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Remove the current user as a follower of one or more artists or other Spotify
   * users.
   *
   * **Note:** This endpoint is deprecated. Use
   * [Remove Items from Library](/documentation/web-api/reference/remove-library-items)
   * instead.
   *
   * @deprecated
   */
  unfollow(
    body: FollowingUnfollowParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    return this._client.delete('/me/following', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface FollowingBulkRetrieveResponse {
  artists: FollowingBulkRetrieveResponse.Artists;
}

export namespace FollowingBulkRetrieveResponse {
  export interface Artists {
    /**
     * The cursors used to find the next set of items.
     */
    cursors?: Artists.Cursors;

    /**
     * A link to the Web API endpoint returning the full result of the request.
     */
    href?: string;

    items?: Array<Shared.ArtistObject>;

    /**
     * The maximum number of items in the response (as set in the query or by default).
     */
    limit?: number;

    /**
     * URL to the next page of items. ( `null` if none)
     */
    next?: string;

    /**
     * The playlist's public/private status (if it should be added to the user's
     * profile or not): `true` the playlist will be public, `false` the playlist will
     * be private, `null` the playlist status is not relevant. For more about
     * public/private status, see
     * [Working with Playlists](/documentation/web-api/concepts/playlists)
     */
    published?: boolean;

    /**
     * The total number of items available to return.
     */
    total?: number;
  }

  export namespace Artists {
    /**
     * The cursors used to find the next set of items.
     */
    export interface Cursors {
      /**
       * The cursor to use as key to find the next page of items.
       */
      after?: string;

      /**
       * The cursor to use as key to find the previous page of items.
       */
      before?: string;

      /**
       * The playlist's public/private status (if it should be added to the user's
       * profile or not): `true` the playlist will be public, `false` the playlist will
       * be private, `null` the playlist status is not relevant. For more about
       * public/private status, see
       * [Working with Playlists](/documentation/web-api/concepts/playlists)
       */
      published?: boolean;
    }
  }
}

export type FollowingCheckResponse = Array<boolean>;

export interface FollowingBulkRetrieveParams {
  /**
   * The ID type: currently only `artist` is supported.
   */
  type: 'artist';

  /**
   * The last artist ID retrieved from the previous request.
   */
  after?: string;

  /**
   * The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   */
  limit?: number;
}

export interface FollowingCheckParams {
  /**
   * A comma-separated list of the artist or the user
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) to check. For
   * example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50
   * IDs can be sent in one request.
   */
  ids: string;

  /**
   * The ID type: either `artist` or `user`.
   */
  type: 'artist' | 'user';
}

export interface FollowingFollowParams {
  /**
   * A JSON array of the artist or user
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example:
   * `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50
   * IDs can be sent in one request. _**Note**: if the `ids` parameter is present in
   * the query string, any IDs listed here in the body will be ignored._
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

  [k: string]: unknown;
}

export interface FollowingUnfollowParams {
  /**
   * A JSON array of the artist or user
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example:
   * `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50
   * IDs can be sent in one request. _**Note**: if the `ids` parameter is present in
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

export declare namespace Following {
  export {
    type FollowingBulkRetrieveResponse as FollowingBulkRetrieveResponse,
    type FollowingCheckResponse as FollowingCheckResponse,
    type FollowingBulkRetrieveParams as FollowingBulkRetrieveParams,
    type FollowingCheckParams as FollowingCheckParams,
    type FollowingFollowParams as FollowingFollowParams,
    type FollowingUnfollowParams as FollowingUnfollowParams,
  };
}

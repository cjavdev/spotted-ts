// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { CursorURLPage, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Albums extends APIResource {
  /**
   * Get a list of the albums saved in the current Spotify user's 'Your Music'
   * library.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const albumListResponse of client.me.albums.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: AlbumListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AlbumListResponsesCursorURLPage, AlbumListResponse> {
    return this._client.getAPIList('/me/albums', CursorURLPage<AlbumListResponse>, { query, ...options });
  }

  /**
   * Check if one or more albums is already saved in the current Spotify user's 'Your
   * Music' library.
   *
   * **Note:** This endpoint is deprecated. Use
   * [Check User's Saved Items](/documentation/web-api/reference/check-library-contains)
   * instead.
   *
   * @deprecated
   */
  check(query: AlbumCheckParams, options?: RequestOptions): APIPromise<AlbumCheckResponse> {
    return this._client.get('/me/albums/contains', { query, ...options });
  }

  /**
   * Remove one or more albums from the current user's 'Your Music' library.
   *
   * **Note:** This endpoint is deprecated. Use
   * [Remove Items from Library](/documentation/web-api/reference/remove-library-items)
   * instead.
   *
   * @deprecated
   */
  remove(body: AlbumRemoveParams | null | undefined = {}, options?: RequestOptions): APIPromise<void> {
    return this._client.delete('/me/albums', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Save one or more albums to the current user's 'Your Music' library.
   *
   * **Note:** This endpoint is deprecated. Use
   * [Save Items to Library](/documentation/web-api/reference/save-library-items)
   * instead.
   *
   * @deprecated
   */
  save(body: AlbumSaveParams | null | undefined = {}, options?: RequestOptions): APIPromise<void> {
    return this._client.put('/me/albums', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type AlbumListResponsesCursorURLPage = CursorURLPage<AlbumListResponse>;

export interface AlbumListResponse {
  /**
   * The date and time the album was saved Timestamps are returned in ISO 8601 format
   * as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ. If
   * the time is imprecise (for example, the date/time of an album release), an
   * additional field indicates the precision; see for example, release_date in an
   * album object.
   */
  added_at?: string;

  /**
   * Information about the album.
   */
  album?: AlbumListResponse.Album;

  /**
   * The playlist's public/private status (if it should be added to the user's
   * profile or not): `true` the playlist will be public, `false` the playlist will
   * be private, `null` the playlist status is not relevant. For more about
   * public/private status, see
   * [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  published?: boolean;
}

export namespace AlbumListResponse {
  /**
   * Information about the album.
   */
  export interface Album {
    /**
     * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
     * album.
     */
    id: string;

    /**
     * The type of the album.
     */
    album_type: 'album' | 'single' | 'compilation';

    /**
     * @deprecated The markets in which the album is available:
     * [ISO 3166-1 alpha-2 country codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
     * _**NOTE**: an album is considered available in a market when at least 1 of its
     * tracks is available in that market._
     */
    available_markets: Array<string>;

    /**
     * Known external URLs for this album.
     */
    external_urls: Shared.ExternalURLObject;

    /**
     * A link to the Web API endpoint providing full details of the album.
     */
    href: string;

    /**
     * The cover art for the album in various sizes, widest first.
     */
    images: Array<Shared.ImageObject>;

    /**
     * The name of the album. In case of an album takedown, the value may be an empty
     * string.
     */
    name: string;

    /**
     * The date the album was first released.
     */
    release_date: string;

    /**
     * The precision with which `release_date` value is known.
     */
    release_date_precision: 'year' | 'month' | 'day';

    /**
     * The number of tracks in the album.
     */
    total_tracks: number;

    /**
     * The object type.
     */
    type: 'album';

    /**
     * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
     * album.
     */
    uri: string;

    /**
     * The artists of the album. Each artist object includes a link in `href` to more
     * detailed information about the artist.
     */
    artists?: Array<Shared.SimplifiedArtistObject>;

    /**
     * The copyright statements of the album.
     */
    copyrights?: Array<Shared.CopyrightObject>;

    /**
     * @deprecated Known external IDs for the album.
     */
    external_ids?: Shared.ExternalIDObject;

    /**
     * @deprecated **Deprecated** The array is always empty.
     */
    genres?: Array<string>;

    /**
     * @deprecated The label associated with the album.
     */
    label?: string;

    /**
     * @deprecated The popularity of the album. The value will be between 0 and 100,
     * with 100 being the most popular.
     */
    popularity?: number;

    /**
     * The playlist's public/private status (if it should be added to the user's
     * profile or not): `true` the playlist will be public, `false` the playlist will
     * be private, `null` the playlist status is not relevant. For more about
     * public/private status, see
     * [Working with Playlists](/documentation/web-api/concepts/playlists)
     */
    published?: boolean;

    /**
     * Included in the response when a content restriction is applied.
     */
    restrictions?: Shared.AlbumRestrictionObject;

    /**
     * The tracks of the album.
     */
    tracks?: Album.Tracks;
  }

  export namespace Album {
    /**
     * The tracks of the album.
     */
    export interface Tracks {
      /**
       * A link to the Web API endpoint returning the full result of the request
       */
      href: string;

      /**
       * The maximum number of items in the response (as set in the query or by default).
       */
      limit: number;

      /**
       * URL to the next page of items. ( `null` if none)
       */
      next: string | null;

      /**
       * The offset of the items returned (as set in the query or by default)
       */
      offset: number;

      /**
       * URL to the previous page of items. ( `null` if none)
       */
      previous: string | null;

      /**
       * The total number of items available to return.
       */
      total: number;

      items?: Array<Shared.SimplifiedTrackObject>;

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

export type AlbumCheckResponse = Array<boolean>;

export interface AlbumListParams {
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

export interface AlbumCheckParams {
  /**
   * A comma-separated list of the
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums.
   * Maximum: 20 IDs.
   */
  ids: string;
}

export interface AlbumRemoveParams {
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

export interface AlbumSaveParams {
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

export declare namespace Albums {
  export {
    type AlbumListResponse as AlbumListResponse,
    type AlbumCheckResponse as AlbumCheckResponse,
    type AlbumListResponsesCursorURLPage as AlbumListResponsesCursorURLPage,
    type AlbumListParams as AlbumListParams,
    type AlbumCheckParams as AlbumCheckParams,
    type AlbumRemoveParams as AlbumRemoveParams,
    type AlbumSaveParams as AlbumSaveParams,
  };
}

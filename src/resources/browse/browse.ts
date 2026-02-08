// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as CategoriesAPI from './categories';
import {
  Categories,
  CategoryGetPlaylistsParams,
  CategoryGetPlaylistsResponse,
  CategoryListParams,
  CategoryListResponse,
  CategoryListResponsesCursorURLPage,
  CategoryRetrieveParams,
  CategoryRetrieveResponse,
} from './categories';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Browse extends APIResource {
  categories: CategoriesAPI.Categories = new CategoriesAPI.Categories(this._client);

  /**
   * Get a list of Spotify featured playlists (shown, for example, on a Spotify
   * player's 'Browse' tab).
   *
   * @deprecated
   */
  getFeaturedPlaylists(
    query: BrowseGetFeaturedPlaylistsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BrowseGetFeaturedPlaylistsResponse> {
    return this._client.get('/browse/featured-playlists', { query, ...options });
  }

  /**
   * Get a list of new album releases featured in Spotify (shown, for example, on a
   * Spotify player’s “Browse” tab).
   *
   * @deprecated
   */
  getNewReleases(
    query: BrowseGetNewReleasesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BrowseGetNewReleasesResponse> {
    return this._client.get('/browse/new-releases', { query, ...options });
  }
}

export interface BrowseGetFeaturedPlaylistsResponse {
  /**
   * The localized message of a playlist.
   */
  message?: string;

  playlists?: Shared.PagingPlaylistObject;

  /**
   * The playlist's public/private status (if it should be added to the user's
   * profile or not): `true` the playlist will be public, `false` the playlist will
   * be private, `null` the playlist status is not relevant. For more about
   * public/private status, see
   * [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  published?: boolean;
}

export interface BrowseGetNewReleasesResponse {
  albums: BrowseGetNewReleasesResponse.Albums;
}

export namespace BrowseGetNewReleasesResponse {
  export interface Albums {
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

    items?: Array<Albums.Item>;

    /**
     * The playlist's public/private status (if it should be added to the user's
     * profile or not): `true` the playlist will be public, `false` the playlist will
     * be private, `null` the playlist status is not relevant. For more about
     * public/private status, see
     * [Working with Playlists](/documentation/web-api/concepts/playlists)
     */
    published?: boolean;
  }

  export namespace Albums {
    export interface Item {
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
       * The artists of the album. Each artist object includes a link in `href` to more
       * detailed information about the artist.
       */
      artists: Array<Shared.SimplifiedArtistObject>;

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
    }
  }
}

export interface BrowseGetFeaturedPlaylistsParams {
  /**
   * The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   */
  limit?: number;

  /**
   * The desired language, consisting of an
   * [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an
   * [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2),
   * joined by an underscore. For example: `es_MX`, meaning &quot;Spanish
   * (Mexico)&quot;. Provide this parameter if you want the category strings returned
   * in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the
   * specified language is not available, the category strings returned will be in
   * the Spotify default language (American English)._
   */
  locale?: string;

  /**
   * The index of the first item to return. Default: 0 (the first item). Use with
   * limit to get the next set of items.
   */
  offset?: number;
}

export interface BrowseGetNewReleasesParams {
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

Browse.Categories = Categories;

export declare namespace Browse {
  export {
    type BrowseGetFeaturedPlaylistsResponse as BrowseGetFeaturedPlaylistsResponse,
    type BrowseGetNewReleasesResponse as BrowseGetNewReleasesResponse,
    type BrowseGetFeaturedPlaylistsParams as BrowseGetFeaturedPlaylistsParams,
    type BrowseGetNewReleasesParams as BrowseGetNewReleasesParams,
  };

  export {
    Categories as Categories,
    type CategoryRetrieveResponse as CategoryRetrieveResponse,
    type CategoryListResponse as CategoryListResponse,
    type CategoryGetPlaylistsResponse as CategoryGetPlaylistsResponse,
    type CategoryListResponsesCursorURLPage as CategoryListResponsesCursorURLPage,
    type CategoryRetrieveParams as CategoryRetrieveParams,
    type CategoryListParams as CategoryListParams,
    type CategoryGetPlaylistsParams as CategoryGetPlaylistsParams,
  };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Categories extends APIResource {
  /**
   * Get a single category used to tag items in Spotify (on, for example, the Spotify
   * player’s “Browse” tab).
   */
  retrieve(
    categoryID: string,
    query: CategoryRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CategoryRetrieveResponse> {
    return this._client.get(path`/browse/categories/${categoryID}`, { query, ...options });
  }

  /**
   * Get a list of categories used to tag items in Spotify (on, for example, the
   * Spotify player’s “Browse” tab).
   */
  list(
    query: CategoryListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CategoryListResponse> {
    return this._client.get('/browse/categories', { query, ...options });
  }

  /**
   * Get a list of Spotify playlists tagged with a particular category.
   *
   * @deprecated
   */
  getPlaylists(
    categoryID: string,
    query: CategoryGetPlaylistsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CategoryGetPlaylistsResponse> {
    return this._client.get(path`/browse/categories/${categoryID}/playlists`, { query, ...options });
  }
}

export interface CategoryRetrieveResponse {
  /**
   * The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) of
   * the category.
   */
  id: string;

  /**
   * A link to the Web API endpoint returning full details of the category.
   */
  href: string;

  /**
   * The category icon, in various sizes.
   */
  icons: Array<Shared.ImageObject>;

  /**
   * The name of the category.
   */
  name: string;
}

export interface CategoryListResponse {
  categories: CategoryListResponse.Categories;
}

export namespace CategoryListResponse {
  export interface Categories {
    /**
     * A link to the Web API endpoint returning the full result of the request
     */
    href: string;

    items: Array<Categories.Item>;

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
  }

  export namespace Categories {
    export interface Item {
      /**
       * The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) of
       * the category.
       */
      id: string;

      /**
       * A link to the Web API endpoint returning full details of the category.
       */
      href: string;

      /**
       * The category icon, in various sizes.
       */
      icons: Array<Shared.ImageObject>;

      /**
       * The name of the category.
       */
      name: string;
    }
  }
}

export interface CategoryGetPlaylistsResponse {
  /**
   * The localized message of a playlist.
   */
  message?: string;

  playlists?: Shared.PagingPlaylistObject;
}

export interface CategoryRetrieveParams {
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
}

export interface CategoryListParams {
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

export interface CategoryGetPlaylistsParams {
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

export declare namespace Categories {
  export {
    type CategoryRetrieveResponse as CategoryRetrieveResponse,
    type CategoryListResponse as CategoryListResponse,
    type CategoryGetPlaylistsResponse as CategoryGetPlaylistsResponse,
    type CategoryRetrieveParams as CategoryRetrieveParams,
    type CategoryListParams as CategoryListParams,
    type CategoryGetPlaylistsParams as CategoryGetPlaylistsParams,
  };
}

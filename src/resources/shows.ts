// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { SimplifiedEpisodeObjectsCursorURLPage } from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorURLPage, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Shows extends APIResource {
  /**
   * Get Spotify catalog information for a single show identified by its unique
   * Spotify ID.
   */
  retrieve(
    id: string,
    query: ShowRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ShowRetrieveResponse> {
    return this._client.get(path`/shows/${id}`, { query, ...options });
  }

  /**
   * Get Spotify catalog information for several shows based on their Spotify IDs.
   *
   * @deprecated
   */
  bulkRetrieve(
    query: ShowBulkRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<ShowBulkRetrieveResponse> {
    return this._client.get('/shows', { query, ...options });
  }

  /**
   * Get Spotify catalog information about an show’s episodes. Optional parameters
   * can be used to limit the number of episodes returned.
   */
  listEpisodes(
    id: string,
    query: ShowListEpisodesParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SimplifiedEpisodeObjectsCursorURLPage, Shared.SimplifiedEpisodeObject> {
    return this._client.getAPIList(
      path`/shows/${id}/episodes`,
      CursorURLPage<Shared.SimplifiedEpisodeObject>,
      { query, ...options },
    );
  }
}

export interface ShowRetrieveResponse extends Shared.ShowBase {
  /**
   * The episodes of the show.
   */
  episodes: ShowRetrieveResponse.Episodes;
}

export namespace ShowRetrieveResponse {
  /**
   * The episodes of the show.
   */
  export interface Episodes {
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

    items?: Array<Shared.SimplifiedEpisodeObject>;

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

export interface ShowBulkRetrieveResponse {
  shows: Array<Shared.ShowBase>;
}

export interface ShowRetrieveParams {
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
}

export interface ShowBulkRetrieveParams {
  /**
   * A comma-separated list of the
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows.
   * Maximum: 50 IDs.
   */
  ids: string;

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
}

export interface ShowListEpisodesParams {
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

export declare namespace Shows {
  export {
    type ShowRetrieveResponse as ShowRetrieveResponse,
    type ShowBulkRetrieveResponse as ShowBulkRetrieveResponse,
    type ShowRetrieveParams as ShowRetrieveParams,
    type ShowBulkRetrieveParams as ShowBulkRetrieveParams,
    type ShowListEpisodesParams as ShowListEpisodesParams,
  };
}

export { type SimplifiedEpisodeObjectsCursorURLPage };

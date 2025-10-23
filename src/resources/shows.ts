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
   */
  list(query: ShowListParams, options?: RequestOptions): APIPromise<ShowListResponse> {
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

export interface ShowRetrieveResponse {
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the show.
   */
  id: string;

  /**
   * A list of the countries in which the show can be played, identified by their
   * [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.
   */
  available_markets: Array<string>;

  /**
   * The copyright statements of the show.
   */
  copyrights: Array<Shared.CopyrightObject>;

  /**
   * A description of the show. HTML tags are stripped away from this field, use
   * `html_description` field in case HTML tags are needed.
   */
  description: string;

  /**
   * The episodes of the show.
   */
  episodes: ShowRetrieveResponse.Episodes;

  /**
   * Whether or not the show has explicit content (true = yes it does; false = no it
   * does not OR unknown).
   */
  explicit: boolean;

  /**
   * External URLs for this show.
   */
  external_urls: Shared.ExternalURLObject;

  /**
   * A link to the Web API endpoint providing full details of the show.
   */
  href: string;

  /**
   * A description of the show. This field may contain HTML tags.
   */
  html_description: string;

  /**
   * The cover art for the show in various sizes, widest first.
   */
  images: Array<Shared.ImageObject>;

  /**
   * True if all of the shows episodes are hosted outside of Spotify's CDN. This
   * field might be `null` in some cases.
   */
  is_externally_hosted: boolean;

  /**
   * A list of the languages used in the show, identified by their
   * [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.
   */
  languages: Array<string>;

  /**
   * The media type of the show.
   */
  media_type: string;

  /**
   * The name of the episode.
   */
  name: string;

  /**
   * The publisher of the show.
   */
  publisher: string;

  /**
   * The total number of episodes in the show.
   */
  total_episodes: number;

  /**
   * The object type.
   */
  type: 'show';

  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * show.
   */
  uri: string;
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

    items: Array<Shared.SimplifiedEpisodeObject>;

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
}

export interface ShowListResponse {
  shows: Array<ShowListResponse.Show>;
}

export namespace ShowListResponse {
  export interface Show {
    /**
     * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the show.
     */
    id: string;

    /**
     * A list of the countries in which the show can be played, identified by their
     * [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.
     */
    available_markets: Array<string>;

    /**
     * The copyright statements of the show.
     */
    copyrights: Array<Shared.CopyrightObject>;

    /**
     * A description of the show. HTML tags are stripped away from this field, use
     * `html_description` field in case HTML tags are needed.
     */
    description: string;

    /**
     * Whether or not the show has explicit content (true = yes it does; false = no it
     * does not OR unknown).
     */
    explicit: boolean;

    /**
     * External URLs for this show.
     */
    external_urls: Shared.ExternalURLObject;

    /**
     * A link to the Web API endpoint providing full details of the show.
     */
    href: string;

    /**
     * A description of the show. This field may contain HTML tags.
     */
    html_description: string;

    /**
     * The cover art for the show in various sizes, widest first.
     */
    images: Array<Shared.ImageObject>;

    /**
     * True if all of the shows episodes are hosted outside of Spotify's CDN. This
     * field might be `null` in some cases.
     */
    is_externally_hosted: boolean;

    /**
     * A list of the languages used in the show, identified by their
     * [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.
     */
    languages: Array<string>;

    /**
     * The media type of the show.
     */
    media_type: string;

    /**
     * The name of the episode.
     */
    name: string;

    /**
     * The publisher of the show.
     */
    publisher: string;

    /**
     * The total number of episodes in the show.
     */
    total_episodes: number;

    /**
     * The object type.
     */
    type: 'show';

    /**
     * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
     * show.
     */
    uri: string;
  }
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

export interface ShowListParams {
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
    type ShowListResponse as ShowListResponse,
    type ShowRetrieveParams as ShowRetrieveParams,
    type ShowListParams as ShowListParams,
    type ShowListEpisodesParams as ShowListEpisodesParams,
  };
}

export { type SimplifiedEpisodeObjectsCursorURLPage };

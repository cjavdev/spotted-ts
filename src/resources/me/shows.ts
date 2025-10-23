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
   * await client.me.shows.remove({
   *   ids: '5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ',
   * });
   * ```
   */
  remove(params: ShowRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { ids, market } = params;
    return this._client.delete('/me/shows', {
      query: { ids, market },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Save one or more shows to current Spotify user's library.
   *
   * @example
   * ```ts
   * await client.me.shows.save({
   *   ids: '5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ',
   * });
   * ```
   */
  save(params: ShowSaveParams, options?: RequestOptions): APIPromise<void> {
    const { ids } = params;
    return this._client.put('/me/shows', {
      query: { ids },
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
   * Information about the show.
   */
  show?: ShowListResponse.Show;
}

export namespace ShowListResponse {
  /**
   * Information about the show.
   */
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

export interface ShowSaveParams {
  /**
   * A comma-separated list of the
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows.
   * Maximum: 50 IDs.
   */
  ids: string;
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

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { CursorURLPage, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Episodes extends APIResource {
  /**
   * Get a list of the episodes saved in the current Spotify user's library.<br/>
   * This API endpoint is in **beta** and could change without warning. Please share
   * any feedback that you have, or issues that you discover, in our
   * [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const episodeListResponse of client.me.episodes.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: EpisodeListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<EpisodeListResponsesCursorURLPage, EpisodeListResponse> {
    return this._client.getAPIList('/me/episodes', CursorURLPage<EpisodeListResponse>, { query, ...options });
  }

  /**
   * Check if one or more episodes is already saved in the current Spotify user's
   * 'Your Episodes' library.<br/> This API endpoint is in **beta** and could change
   * without warning. Please share any feedback that you have, or issues that you
   * discover, in our
   * [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer)..
   *
   * @example
   * ```ts
   * const response = await client.me.episodes.check({
   *   ids: '77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf',
   * });
   * ```
   */
  check(query: EpisodeCheckParams, options?: RequestOptions): APIPromise<EpisodeCheckResponse> {
    return this._client.get('/me/episodes/contains', { query, ...options });
  }

  /**
   * Remove one or more episodes from the current user's library.<br/> This API
   * endpoint is in **beta** and could change without warning. Please share any
   * feedback that you have, or issues that you discover, in our
   * [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
   *
   * @example
   * ```ts
   * await client.me.episodes.remove({
   *   query_ids:
   *     '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
   * });
   * ```
   */
  remove(params: EpisodeRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { query_ids, ...body } = params;
    return this._client.delete('/me/episodes', {
      query: { ids: query_ids },
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Save one or more episodes to the current user's library.<br/> This API endpoint
   * is in **beta** and could change without warning. Please share any feedback that
   * you have, or issues that you discover, in our
   * [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
   *
   * @example
   * ```ts
   * await client.me.episodes.save({
   *   query_ids:
   *     '77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf',
   * });
   * ```
   */
  save(params: EpisodeSaveParams, options?: RequestOptions): APIPromise<void> {
    const { query_ids, ...body } = params;
    return this._client.put('/me/episodes', {
      query: { ids: query_ids },
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type EpisodeListResponsesCursorURLPage = CursorURLPage<EpisodeListResponse>;

export interface EpisodeListResponse {
  /**
   * The date and time the episode was saved. Timestamps are returned in ISO 8601
   * format as Coordinated Universal Time (UTC) with a zero offset:
   * YYYY-MM-DDTHH:MM:SSZ.
   */
  added_at?: string;

  /**
   * Information about the episode.
   */
  episode?: Shared.EpisodeObject;
}

export type EpisodeCheckResponse = Array<boolean>;

export interface EpisodeListParams {
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

export interface EpisodeCheckParams {
  /**
   * A comma-separated list of the
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the
   * episodes. Maximum: 50 IDs.
   */
  ids: string;
}

export interface EpisodeRemoveParams {
  /**
   * Query param: A comma-separated list of the
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example:
   * `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.
   */
  query_ids: string;

  /**
   * Body param: A JSON array of the
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum
   * of 50 items can be specified in one request. _**Note**: if the `ids` parameter
   * is present in the query string, any IDs listed here in the body will be
   * ignored._
   */
  body_ids?: Array<string>;

  [k: string]: unknown;
}

export interface EpisodeSaveParams {
  /**
   * Query param: A comma-separated list of the
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 50
   * IDs.
   */
  query_ids: string;

  /**
   * Body param: A JSON array of the
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum
   * of 50 items can be specified in one request. _**Note**: if the `ids` parameter
   * is present in the query string, any IDs listed here in the body will be
   * ignored._
   */
  body_ids?: Array<string>;

  [k: string]: unknown;
}

export declare namespace Episodes {
  export {
    type EpisodeListResponse as EpisodeListResponse,
    type EpisodeCheckResponse as EpisodeCheckResponse,
    type EpisodeListResponsesCursorURLPage as EpisodeListResponsesCursorURLPage,
    type EpisodeListParams as EpisodeListParams,
    type EpisodeCheckParams as EpisodeCheckParams,
    type EpisodeRemoveParams as EpisodeRemoveParams,
    type EpisodeSaveParams as EpisodeSaveParams,
  };
}

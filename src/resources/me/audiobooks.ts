// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AudiobooksAPI from '../audiobooks';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { CursorURLPage, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Audiobooks extends APIResource {
  /**
   * Get a list of the audiobooks saved in the current Spotify user's 'Your Music'
   * library.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const audiobookListResponse of client.me.audiobooks.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: AudiobookListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AudiobookListResponsesCursorURLPage, AudiobookListResponse> {
    return this._client.getAPIList('/me/audiobooks', CursorURLPage<AudiobookListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Check if one or more audiobooks are already saved in the current Spotify user's
   * library.
   *
   * @example
   * ```ts
   * const response = await client.me.audiobooks.check({
   *   ids: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe',
   * });
   * ```
   */
  check(query: AudiobookCheckParams, options?: RequestOptions): APIPromise<AudiobookCheckResponse> {
    return this._client.get('/me/audiobooks/contains', { query, ...options });
  }

  /**
   * Remove one or more audiobooks from the Spotify user's library.
   *
   * @example
   * ```ts
   * await client.me.audiobooks.remove({
   *   ids: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe',
   * });
   * ```
   */
  remove(params: AudiobookRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { ids } = params;
    return this._client.delete('/me/audiobooks', {
      query: { ids },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Save one or more audiobooks to the current Spotify user's library.
   *
   * @example
   * ```ts
   * await client.me.audiobooks.save({
   *   ids: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe',
   * });
   * ```
   */
  save(params: AudiobookSaveParams, options?: RequestOptions): APIPromise<void> {
    const { ids } = params;
    return this._client.put('/me/audiobooks', {
      query: { ids },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type AudiobookListResponsesCursorURLPage = CursorURLPage<AudiobookListResponse>;

export interface AudiobookListResponse {
  /**
   * The date and time the audiobook was saved Timestamps are returned in ISO 8601
   * format as Coordinated Universal Time (UTC) with a zero offset:
   * YYYY-MM-DDTHH:MM:SSZ. If the time is imprecise (for example, the date/time of an
   * album release), an additional field indicates the precision; see for example,
   * release_date in an album object.
   */
  added_at?: string;

  /**
   * Information about the audiobook.
   */
  audiobook?: AudiobookListResponse.Audiobook;

  /**
   * The playlist's public/private status (if it should be added to the user's
   * profile or not): `true` the playlist will be public, `false` the playlist will
   * be private, `null` the playlist status is not relevant. For more about
   * public/private status, see
   * [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  published?: boolean;
}

export namespace AudiobookListResponse {
  /**
   * Information about the audiobook.
   */
  export interface Audiobook extends Shared.AudiobookBase {
    /**
     * The chapters of the audiobook.
     */
    chapters: Audiobook.Chapters;
  }

  export namespace Audiobook {
    /**
     * The chapters of the audiobook.
     */
    export interface Chapters {
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

      items?: Array<AudiobooksAPI.SimplifiedChapterObject>;

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

export type AudiobookCheckResponse = Array<boolean>;

export interface AudiobookListParams {
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

export interface AudiobookCheckParams {
  /**
   * A comma-separated list of the
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example:
   * `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.
   */
  ids: string;
}

export interface AudiobookRemoveParams {
  /**
   * A comma-separated list of the
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example:
   * `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.
   */
  ids: string;
}

export interface AudiobookSaveParams {
  /**
   * A comma-separated list of the
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example:
   * `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.
   */
  ids: string;
}

export declare namespace Audiobooks {
  export {
    type AudiobookListResponse as AudiobookListResponse,
    type AudiobookCheckResponse as AudiobookCheckResponse,
    type AudiobookListResponsesCursorURLPage as AudiobookListResponsesCursorURLPage,
    type AudiobookListParams as AudiobookListParams,
    type AudiobookCheckParams as AudiobookCheckParams,
    type AudiobookRemoveParams as AudiobookRemoveParams,
    type AudiobookSaveParams as AudiobookSaveParams,
  };
}

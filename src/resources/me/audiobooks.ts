// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
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
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * audiobook.
   */
  id: string;

  /**
   * The author(s) for the audiobook.
   */
  authors: Array<Shared.AuthorObject>;

  /**
   * A list of the countries in which the audiobook can be played, identified by
   * their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
   * code.
   */
  available_markets: Array<string>;

  /**
   * The copyright statements of the audiobook.
   */
  copyrights: Array<Shared.CopyrightObject>;

  /**
   * A description of the audiobook. HTML tags are stripped away from this field, use
   * `html_description` field in case HTML tags are needed.
   */
  description: string;

  /**
   * Whether or not the audiobook has explicit content (true = yes it does; false =
   * no it does not OR unknown).
   */
  explicit: boolean;

  /**
   * External URLs for this audiobook.
   */
  external_urls: Shared.ExternalURLObject;

  /**
   * A link to the Web API endpoint providing full details of the audiobook.
   */
  href: string;

  /**
   * A description of the audiobook. This field may contain HTML tags.
   */
  html_description: string;

  /**
   * The cover art for the audiobook in various sizes, widest first.
   */
  images: Array<Shared.ImageObject>;

  /**
   * A list of the languages used in the audiobook, identified by their
   * [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.
   */
  languages: Array<string>;

  /**
   * The media type of the audiobook.
   */
  media_type: string;

  /**
   * The name of the audiobook.
   */
  name: string;

  /**
   * The narrator(s) for the audiobook.
   */
  narrators: Array<Shared.NarratorObject>;

  /**
   * The publisher of the audiobook.
   */
  publisher: string;

  /**
   * The number of chapters in this audiobook.
   */
  total_chapters: number;

  /**
   * The object type.
   */
  type: 'audiobook';

  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * audiobook.
   */
  uri: string;

  /**
   * The edition of the audiobook.
   */
  edition?: string;
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

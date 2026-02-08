// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Chapters extends APIResource {
  /**
   * Get Spotify catalog information for a single audiobook chapter. Chapters are
   * only available within the US, UK, Canada, Ireland, New Zealand and Australia
   * markets.
   */
  retrieve(
    id: string,
    query: ChapterRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ChapterRetrieveResponse> {
    return this._client.get(path`/chapters/${id}`, { query, ...options });
  }

  /**
   * Get Spotify catalog information for several audiobook chapters identified by
   * their Spotify IDs. Chapters are only available within the US, UK, Canada,
   * Ireland, New Zealand and Australia markets.
   *
   * @deprecated
   */
  bulkRetrieve(
    query: ChapterBulkRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<ChapterBulkRetrieveResponse> {
    return this._client.get('/chapters', { query, ...options });
  }
}

export interface ChapterRetrieveResponse {
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * chapter.
   */
  id: string;

  /**
   * @deprecated A URL to a 30 second preview (MP3 format) of the chapter. `null` if
   * not available.
   */
  audio_preview_url: string | null;

  /**
   * The audiobook for which the chapter belongs.
   */
  audiobook: Shared.AudiobookBase;

  /**
   * The number of the chapter
   */
  chapter_number: number;

  /**
   * A description of the chapter. HTML tags are stripped away from this field, use
   * `html_description` field in case HTML tags are needed.
   */
  description: string;

  /**
   * The chapter length in milliseconds.
   */
  duration_ms: number;

  /**
   * Whether or not the chapter has explicit content (true = yes it does; false = no
   * it does not OR unknown).
   */
  explicit: boolean;

  /**
   * External URLs for this chapter.
   */
  external_urls: Shared.ExternalURLObject;

  /**
   * A link to the Web API endpoint providing full details of the chapter.
   */
  href: string;

  /**
   * A description of the chapter. This field may contain HTML tags.
   */
  html_description: string;

  /**
   * The cover art for the chapter in various sizes, widest first.
   */
  images: Array<Shared.ImageObject>;

  /**
   * True if the chapter is playable in the given market. Otherwise false.
   */
  is_playable: boolean;

  /**
   * A list of the languages used in the chapter, identified by their
   * [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
   */
  languages: Array<string>;

  /**
   * The name of the chapter.
   */
  name: string;

  /**
   * The date the chapter was first released, for example `"1981-12-15"`. Depending
   * on the precision, it might be shown as `"1981"` or `"1981-12"`.
   */
  release_date: string;

  /**
   * The precision with which `release_date` value is known.
   */
  release_date_precision: 'year' | 'month' | 'day';

  /**
   * The object type.
   */
  type: 'episode';

  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * chapter.
   */
  uri: string;

  /**
   * @deprecated A list of the countries in which the chapter can be played,
   * identified by their
   * [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.
   */
  available_markets?: Array<string>;

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
  restrictions?: Shared.ChapterRestrictionObject;

  /**
   * The user's most recent position in the chapter. Set if the supplied access token
   * is a user token and has the scope 'user-read-playback-position'.
   */
  resume_point?: Shared.ResumePointObject;
}

export interface ChapterBulkRetrieveResponse {
  chapters: Array<ChapterBulkRetrieveResponse.Chapter>;
}

export namespace ChapterBulkRetrieveResponse {
  export interface Chapter {
    /**
     * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
     * chapter.
     */
    id: string;

    /**
     * @deprecated A URL to a 30 second preview (MP3 format) of the chapter. `null` if
     * not available.
     */
    audio_preview_url: string | null;

    /**
     * The audiobook for which the chapter belongs.
     */
    audiobook: Shared.AudiobookBase;

    /**
     * The number of the chapter
     */
    chapter_number: number;

    /**
     * A description of the chapter. HTML tags are stripped away from this field, use
     * `html_description` field in case HTML tags are needed.
     */
    description: string;

    /**
     * The chapter length in milliseconds.
     */
    duration_ms: number;

    /**
     * Whether or not the chapter has explicit content (true = yes it does; false = no
     * it does not OR unknown).
     */
    explicit: boolean;

    /**
     * External URLs for this chapter.
     */
    external_urls: Shared.ExternalURLObject;

    /**
     * A link to the Web API endpoint providing full details of the chapter.
     */
    href: string;

    /**
     * A description of the chapter. This field may contain HTML tags.
     */
    html_description: string;

    /**
     * The cover art for the chapter in various sizes, widest first.
     */
    images: Array<Shared.ImageObject>;

    /**
     * True if the chapter is playable in the given market. Otherwise false.
     */
    is_playable: boolean;

    /**
     * A list of the languages used in the chapter, identified by their
     * [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
     */
    languages: Array<string>;

    /**
     * The name of the chapter.
     */
    name: string;

    /**
     * The date the chapter was first released, for example `"1981-12-15"`. Depending
     * on the precision, it might be shown as `"1981"` or `"1981-12"`.
     */
    release_date: string;

    /**
     * The precision with which `release_date` value is known.
     */
    release_date_precision: 'year' | 'month' | 'day';

    /**
     * The object type.
     */
    type: 'episode';

    /**
     * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
     * chapter.
     */
    uri: string;

    /**
     * @deprecated A list of the countries in which the chapter can be played,
     * identified by their
     * [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.
     */
    available_markets?: Array<string>;

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
    restrictions?: Shared.ChapterRestrictionObject;

    /**
     * The user's most recent position in the chapter. Set if the supplied access token
     * is a user token and has the scope 'user-read-playback-position'.
     */
    resume_point?: Shared.ResumePointObject;
  }
}

export interface ChapterRetrieveParams {
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

export interface ChapterBulkRetrieveParams {
  /**
   * A comma-separated list of the
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example:
   * `ids=0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU`. Maximum: 50 IDs.
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

export declare namespace Chapters {
  export {
    type ChapterRetrieveResponse as ChapterRetrieveResponse,
    type ChapterBulkRetrieveResponse as ChapterBulkRetrieveResponse,
    type ChapterRetrieveParams as ChapterRetrieveParams,
    type ChapterBulkRetrieveParams as ChapterBulkRetrieveParams,
  };
}

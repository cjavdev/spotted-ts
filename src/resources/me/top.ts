// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { ArtistObjectsCursorURLPage, TrackObjectsCursorURLPage } from '../shared';
import { CursorURLPage, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';

export class Top extends APIResource {
  /**
   * Get the current user's top artists based on calculated affinity.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const artistObject of client.me.top.listTopArtists()) {
   *   // ...
   * }
   * ```
   */
  listTopArtists(
    query: TopListTopArtistsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ArtistObjectsCursorURLPage, Shared.ArtistObject> {
    return this._client.getAPIList('/me/top/artists', CursorURLPage<Shared.ArtistObject>, {
      query,
      ...options,
    });
  }

  /**
   * Get the current user's top tracks based on calculated affinity.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const trackObject of client.me.top.listTopTracks()) {
   *   // ...
   * }
   * ```
   */
  listTopTracks(
    query: TopListTopTracksParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TrackObjectsCursorURLPage, Shared.TrackObject> {
    return this._client.getAPIList('/me/top/tracks', CursorURLPage<Shared.TrackObject>, {
      query,
      ...options,
    });
  }
}

export interface TopListTopArtistsParams {
  /**
   * The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   */
  limit?: number;

  /**
   * The index of the first item to return. Default: 0 (the first item). Use with
   * limit to get the next set of items.
   */
  offset?: number;

  /**
   * Over what time frame the affinities are computed. Valid values: `long_term`
   * (calculated from ~1 year of data and including all new data as it becomes
   * available), `medium_term` (approximately last 6 months), `short_term`
   * (approximately last 4 weeks). Default: `medium_term`
   */
  time_range?: string;
}

export interface TopListTopTracksParams {
  /**
   * The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   */
  limit?: number;

  /**
   * The index of the first item to return. Default: 0 (the first item). Use with
   * limit to get the next set of items.
   */
  offset?: number;

  /**
   * Over what time frame the affinities are computed. Valid values: `long_term`
   * (calculated from ~1 year of data and including all new data as it becomes
   * available), `medium_term` (approximately last 6 months), `short_term`
   * (approximately last 4 weeks). Default: `medium_term`
   */
  time_range?: string;
}

export declare namespace Top {
  export {
    type TopListTopArtistsParams as TopListTopArtistsParams,
    type TopListTopTracksParams as TopListTopTracksParams,
  };
}

export { type ArtistObjectsCursorURLPage, type TrackObjectsCursorURLPage };

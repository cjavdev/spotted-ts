// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { CursorURLPage, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Top extends APIResource {
  /**
   * Get the current user's top artists or tracks based on calculated affinity.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const topListResponse of client.me.top.list(
   *   'artists',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    type: 'artists' | 'tracks',
    query: TopListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TopListResponsesCursorURLPage, TopListResponse> {
    return this._client.getAPIList(path`/me/top/${type}`, CursorURLPage<TopListResponse>, {
      query,
      ...options,
    });
  }
}

export type TopListResponsesCursorURLPage = CursorURLPage<TopListResponse>;

export type TopListResponse = Shared.ArtistObject | Shared.TrackObject;

export interface TopListParams {
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
    type TopListResponse as TopListResponse,
    type TopListResponsesCursorURLPage as TopListResponsesCursorURLPage,
    type TopListParams as TopListParams,
  };
}

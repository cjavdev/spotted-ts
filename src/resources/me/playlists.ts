// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { SimplifiedPlaylistObjectsCursorURLPage } from '../shared';
import { CursorURLPage, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';

export class Playlists extends APIResource {
  /**
   * Get a list of the playlists owned or followed by the current Spotify user.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const simplifiedPlaylistObject of client.me.playlists.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: PlaylistListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SimplifiedPlaylistObjectsCursorURLPage, Shared.SimplifiedPlaylistObject> {
    return this._client.getAPIList('/me/playlists', CursorURLPage<Shared.SimplifiedPlaylistObject>, {
      query,
      ...options,
    });
  }
}

export interface PlaylistListParams {
  /**
   * The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   */
  limit?: number;

  /**
   * 'The index of the first playlist to return. Default: 0 (the first object).
   * Maximum offset: 100.000\. Use with `limit` to get the next set of playlists.'
   */
  offset?: number;
}

export declare namespace Playlists {
  export { type PlaylistListParams as PlaylistListParams };
}

export { type SimplifiedPlaylistObjectsCursorURLPage };

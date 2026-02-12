// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Followers extends APIResource {
  /**
   * Check to see if the current user is following a specified playlist.
   *
   * **Note:** This endpoint is deprecated. Use
   * [Check User's Saved Items](/documentation/web-api/reference/check-library-contains)
   * instead.
   *
   * @deprecated
   */
  check(
    playlistID: string,
    query: FollowerCheckParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FollowerCheckResponse> {
    return this._client.get(path`/playlists/${playlistID}/followers/contains`, { query, ...options });
  }

  /**
   * Add the current user as a follower of a playlist.
   *
   * **Note:** This endpoint is deprecated. Use
   * [Save Items to Library](/documentation/web-api/reference/save-library-items)
   * instead.
   *
   * @deprecated
   */
  follow(
    playlistID: string,
    body: FollowerFollowParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    return this._client.put(path`/playlists/${playlistID}/followers`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Remove the current user as a follower of a playlist.
   *
   * **Note:** This endpoint is deprecated. Use
   * [Remove Items from Library](/documentation/web-api/reference/remove-library-items)
   * instead.
   *
   * @deprecated
   */
  unfollow(playlistID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/playlists/${playlistID}/followers`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type FollowerCheckResponse = Array<boolean>;

export interface FollowerCheckParams {
  /**
   * **Deprecated** A single item list containing current user's
   * [Spotify Username](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 1
   * id.
   */
  ids?: string;
}

export interface FollowerFollowParams {
  /**
   * The playlist's public/private status (if it should be added to the user's
   * profile or not): `true` the playlist will be public, `false` the playlist will
   * be private, `null` the playlist status is not relevant. For more about
   * public/private status, see
   * [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  published?: boolean;

  [k: string]: unknown;
}

export declare namespace Followers {
  export {
    type FollowerCheckResponse as FollowerCheckResponse,
    type FollowerCheckParams as FollowerCheckParams,
    type FollowerFollowParams as FollowerFollowParams,
  };
}

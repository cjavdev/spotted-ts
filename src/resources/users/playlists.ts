// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { SimplifiedPlaylistObjectsCursorURLPage } from '../shared';
import { APIPromise } from '../../core/api-promise';
import { CursorURLPage, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Playlists extends APIResource {
  /**
   * Create a playlist for a Spotify user. (The playlist will be empty until you
   * [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).) Each
   * user is generally limited to a maximum of 11000 playlists.
   *
   * @example
   * ```ts
   * const playlist = await client.users.playlists.create(
   *   'smedjan',
   *   { name: 'New Playlist' },
   * );
   * ```
   */
  create(
    userID: string,
    body: PlaylistCreateParams,
    options?: RequestOptions,
  ): APIPromise<PlaylistCreateResponse> {
    return this._client.post(path`/users/${userID}/playlists`, { body, ...options });
  }

  /**
   * Get a list of the playlists owned or followed by a Spotify user.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const simplifiedPlaylistObject of client.users.playlists.list(
   *   'smedjan',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    userID: string,
    query: PlaylistListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SimplifiedPlaylistObjectsCursorURLPage, Shared.SimplifiedPlaylistObject> {
    return this._client.getAPIList(
      path`/users/${userID}/playlists`,
      CursorURLPage<Shared.SimplifiedPlaylistObject>,
      { query, ...options },
    );
  }
}

export interface PlaylistCreateResponse {
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * playlist.
   */
  id?: string;

  /**
   * `true` if the owner allows other users to modify the playlist.
   */
  collaborative?: boolean;

  /**
   * The playlist description. _Only returned for modified, verified playlists,
   * otherwise_ `null`.
   */
  description?: string | null;

  /**
   * Known external URLs for this playlist.
   */
  external_urls?: Shared.ExternalURLObject;

  /**
   * Information about the followers of the playlist.
   */
  followers?: Shared.FollowersObject;

  /**
   * A link to the Web API endpoint providing full details of the playlist.
   */
  href?: string;

  /**
   * Images for the playlist. The array may be empty or contain up to three images.
   * The images are returned by size in descending order. See
   * [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**:
   * If returned, the source URL for the image (`url`) is temporary and will expire
   * in less than a day._
   */
  images?: Array<Shared.ImageObject>;

  /**
   * The name of the playlist.
   */
  name?: string;

  /**
   * The user who owns the playlist
   */
  owner?: PlaylistCreateResponse.Owner;

  /**
   * The playlist's public/private status (if it should be added to the user's
   * profile or not): `true` the playlist will be public, `false` the playlist will
   * be private, `null` the playlist status is not relevant. For more about
   * public/private status, see
   * [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  published?: boolean;

  /**
   * The version identifier for the current playlist. Can be supplied in other
   * requests to target a specific playlist version
   */
  snapshot_id?: string;

  /**
   * The tracks of the playlist.
   */
  tracks?: PlaylistCreateResponse.Tracks;

  /**
   * The object type: "playlist"
   */
  type?: string;

  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * playlist.
   */
  uri?: string;
}

export namespace PlaylistCreateResponse {
  /**
   * The user who owns the playlist
   */
  export interface Owner extends Shared.PlaylistUserObject {
    /**
     * The name displayed on the user's profile. `null` if not available.
     */
    display_name?: string | null;
  }

  /**
   * The tracks of the playlist.
   */
  export interface Tracks {
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

    items?: Array<Shared.PlaylistTrackObject>;

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

export interface PlaylistCreateParams {
  /**
   * The name for the new playlist, for example `"Your Coolest Playlist"`. This name
   * does not need to be unique; a user may have several playlists with the same
   * name.
   */
  name: string;

  /**
   * Defaults to `false`. If `true` the playlist will be collaborative. _**Note**: to
   * create a collaborative playlist you must also set `public` to `false`. To create
   * collaborative playlists you must have granted `playlist-modify-private` and
   * `playlist-modify-public`
   * [scopes](/documentation/web-api/concepts/scopes/#list-of-scopes)._
   */
  collaborative?: boolean;

  /**
   * value for playlist description as displayed in Spotify Clients and in the Web
   * API.
   */
  description?: string;

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

export interface PlaylistListParams {
  /**
   * The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   */
  limit?: number;

  /**
   * The index of the first playlist to return. Default: 0 (the first object).
   * Maximum offset: 100.000\. Use with `limit` to get the next set of playlists.
   */
  offset?: number;
}

export declare namespace Playlists {
  export {
    type PlaylistCreateResponse as PlaylistCreateResponse,
    type PlaylistCreateParams as PlaylistCreateParams,
    type PlaylistListParams as PlaylistListParams,
  };
}

export { type SimplifiedPlaylistObjectsCursorURLPage };

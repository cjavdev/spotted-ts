// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as PlaylistsAPI from './playlists';
import { PlaylistCreateParams, PlaylistCreateResponse, PlaylistListParams, Playlists } from './playlists';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Users extends APIResource {
  playlists: PlaylistsAPI.Playlists = new PlaylistsAPI.Playlists(this._client);

  /**
   * Get public profile information about a Spotify user.
   *
   * @example
   * ```ts
   * const response = await client.users.retrieveProfile(
   *   'smedjan',
   * );
   * ```
   */
  retrieveProfile(userID: string, options?: RequestOptions): APIPromise<UserRetrieveProfileResponse> {
    return this._client.get(path`/users/${userID}`, options);
  }
}

export interface UserRetrieveProfileResponse {
  /**
   * The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this
   * user.
   */
  id?: string;

  /**
   * The name displayed on the user's profile. `null` if not available.
   */
  display_name?: string | null;

  /**
   * Known public external URLs for this user.
   */
  external_urls?: Shared.ExternalURLObject;

  /**
   * Information about the followers of this user.
   */
  followers?: Shared.FollowersObject;

  /**
   * A link to the Web API endpoint for this user.
   */
  href?: string;

  /**
   * The user's profile image.
   */
  images?: Array<Shared.ImageObject>;

  /**
   * The playlist's public/private status (if it should be added to the user's
   * profile or not): `true` the playlist will be public, `false` the playlist will
   * be private, `null` the playlist status is not relevant. For more about
   * public/private status, see
   * [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  published?: boolean;

  /**
   * The object type.
   */
  type?: 'user';

  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this
   * user.
   */
  uri?: string;
}

Users.Playlists = Playlists;

export declare namespace Users {
  export { type UserRetrieveProfileResponse as UserRetrieveProfileResponse };

  export {
    Playlists as Playlists,
    type PlaylistCreateResponse as PlaylistCreateResponse,
    type PlaylistCreateParams as PlaylistCreateParams,
    type PlaylistListParams as PlaylistListParams,
  };
}

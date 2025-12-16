// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as FollowersAPI from './followers';
import { FollowerCheckParams, FollowerCheckResponse, FollowerFollowParams, Followers } from './followers';
import * as ImagesAPI from './images';
import { ImageListResponse, Images } from './images';
import * as TracksAPI from './tracks';
import {
  TrackAddParams,
  TrackAddResponse,
  TrackListParams,
  TrackRemoveParams,
  TrackRemoveResponse,
  TrackUpdateParams,
  TrackUpdateResponse,
  Tracks as TracksAPITracks,
} from './tracks';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Playlists extends APIResource {
  tracks: TracksAPI.Tracks = new TracksAPI.Tracks(this._client);
  followers: FollowersAPI.Followers = new FollowersAPI.Followers(this._client);
  images: ImagesAPI.Images = new ImagesAPI.Images(this._client);

  /**
   * Get a playlist owned by a Spotify user.
   *
   * @example
   * ```ts
   * const playlist = await client.playlists.retrieve(
   *   '3cEYpjA9oz9GiPac4AsH4n',
   * );
   * ```
   */
  retrieve(
    playlistID: string,
    query: PlaylistRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PlaylistRetrieveResponse> {
    return this._client.get(path`/playlists/${playlistID}`, { query, ...options });
  }

  /**
   * Change a playlist's name and public/private state. (The user must, of course,
   * own the playlist.)
   *
   * @example
   * ```ts
   * await client.playlists.update('3cEYpjA9oz9GiPac4AsH4n');
   * ```
   */
  update(
    playlistID: string,
    body: PlaylistUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    return this._client.put(path`/playlists/${playlistID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface PlaylistRetrieveResponse {
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
  owner?: PlaylistRetrieveResponse.Owner;

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
  tracks?: PlaylistRetrieveResponse.Tracks;

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

export namespace PlaylistRetrieveResponse {
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

export interface PlaylistRetrieveParams {
  /**
   * A comma-separated list of item types that your client supports besides the
   * default `track` type. Valid types are: `track` and `episode`.<br/> _**Note**:
   * This parameter was introduced to allow existing clients to maintain their
   * current behaviour and might be deprecated in the future._<br/> In addition to
   * providing this parameter, make sure that your client properly handles cases of
   * new types in the future by checking against the `type` field of each object.
   */
  additional_types?: string;

  /**
   * Filters for the query: a comma-separated list of the fields to return. If
   * omitted, all fields are returned. For example, to get just the playlist''s
   * description and URI: `fields=description,uri`. A dot separator can be used to
   * specify non-reoccurring fields, while parentheses can be used to specify
   * reoccurring fields within objects. For example, to get just the added date and
   * user ID of the adder: `fields=tracks.items(added_at,added_by.id)`. Use multiple
   * parentheses to drill down into nested objects, for example:
   * `fields=tracks.items(track(name,href,album(name,href)))`. Fields can be excluded
   * by prefixing them with an exclamation mark, for example:
   * `fields=tracks.items(track(name,href,album(!name,href)))`
   */
  fields?: string;

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

export interface PlaylistUpdateParams {
  /**
   * If `true`, the playlist will become collaborative and other users will be able
   * to modify the playlist in their Spotify client. <br/> _**Note**: You can only
   * set `collaborative` to `true` on non-public playlists._
   */
  collaborative?: boolean;

  /**
   * Value for playlist description as displayed in Spotify Clients and in the Web
   * API.
   */
  description?: string;

  /**
   * The new name for the playlist, for example `"My New Playlist Title"`
   */
  name?: string;

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

Playlists.Tracks = TracksAPITracks;
Playlists.Followers = Followers;
Playlists.Images = Images;

export declare namespace Playlists {
  export {
    type PlaylistRetrieveResponse as PlaylistRetrieveResponse,
    type PlaylistRetrieveParams as PlaylistRetrieveParams,
    type PlaylistUpdateParams as PlaylistUpdateParams,
  };

  export {
    TracksAPITracks as Tracks,
    type TrackUpdateResponse as TrackUpdateResponse,
    type TrackAddResponse as TrackAddResponse,
    type TrackRemoveResponse as TrackRemoveResponse,
    type TrackUpdateParams as TrackUpdateParams,
    type TrackListParams as TrackListParams,
    type TrackAddParams as TrackAddParams,
    type TrackRemoveParams as TrackRemoveParams,
  };

  export {
    Followers as Followers,
    type FollowerCheckResponse as FollowerCheckResponse,
    type FollowerCheckParams as FollowerCheckParams,
    type FollowerFollowParams as FollowerFollowParams,
  };

  export { Images as Images, type ImageListResponse as ImageListResponse };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as Shared from '../../shared';
import * as QueueAPI from './queue';
import { Queue, QueueAddParams, QueueGetResponse } from './queue';
import { APIPromise } from '../../../core/api-promise';
import { CursorURLPage, PagePromise } from '../../../core/pagination';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';

export class Player extends APIResource {
  queue: QueueAPI.Queue = new QueueAPI.Queue(this._client);

  /**
   * Get the object currently being played on the user's Spotify account.
   *
   * @example
   * ```ts
   * const response =
   *   await client.me.player.getCurrentlyPlaying();
   * ```
   */
  getCurrentlyPlaying(
    query: PlayerGetCurrentlyPlayingParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PlayerGetCurrentlyPlayingResponse> {
    return this._client.get('/me/player/currently-playing', { query, ...options });
  }

  /**
   * Get information about a user’s available Spotify Connect devices. Some device
   * models are not supported and will not be listed in the API response.
   *
   * @example
   * ```ts
   * const response = await client.me.player.getDevices();
   * ```
   */
  getDevices(options?: RequestOptions): APIPromise<PlayerGetDevicesResponse> {
    return this._client.get('/me/player/devices', options);
  }

  /**
   * Get information about the user’s current playback state, including track or
   * episode, progress, and active device.
   *
   * @example
   * ```ts
   * const response = await client.me.player.getState();
   * ```
   */
  getState(
    query: PlayerGetStateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PlayerGetStateResponse> {
    return this._client.get('/me/player', { query, ...options });
  }

  /**
   * Get tracks from the current user's recently played tracks. _**Note**: Currently
   * doesn't support podcast episodes._
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const playerListRecentlyPlayedResponse of client.me.player.listRecentlyPlayed()) {
   *   // ...
   * }
   * ```
   */
  listRecentlyPlayed(
    query: PlayerListRecentlyPlayedParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<PlayerListRecentlyPlayedResponsesCursorURLPage, PlayerListRecentlyPlayedResponse> {
    return this._client.getAPIList(
      '/me/player/recently-played',
      CursorURLPage<PlayerListRecentlyPlayedResponse>,
      { query, ...options },
    );
  }

  /**
   * Pause playback on the user's account. This API only works for users who have
   * Spotify Premium. The order of execution is not guaranteed when you use this API
   * with other Player API endpoints.
   *
   * @example
   * ```ts
   * await client.me.player.pausePlayback();
   * ```
   */
  pausePlayback(
    params: PlayerPausePlaybackParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { device_id } = params ?? {};
    return this._client.put('/me/player/pause', {
      query: { device_id },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Seeks to the given position in the user’s currently playing track. This API only
   * works for users who have Spotify Premium. The order of execution is not
   * guaranteed when you use this API with other Player API endpoints.
   *
   * @example
   * ```ts
   * await client.me.player.seekToPosition({
   *   position_ms: 25000,
   * });
   * ```
   */
  seekToPosition(params: PlayerSeekToPositionParams, options?: RequestOptions): APIPromise<void> {
    const { position_ms, device_id } = params;
    return this._client.put('/me/player/seek', {
      query: { position_ms, device_id },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Set the repeat mode for the user's playback. This API only works for users who
   * have Spotify Premium. The order of execution is not guaranteed when you use this
   * API with other Player API endpoints.
   *
   * @example
   * ```ts
   * await client.me.player.setRepeatMode({ state: 'context' });
   * ```
   */
  setRepeatMode(params: PlayerSetRepeatModeParams, options?: RequestOptions): APIPromise<void> {
    const { state, device_id } = params;
    return this._client.put('/me/player/repeat', {
      query: { state, device_id },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Set the volume for the user’s current playback device. This API only works for
   * users who have Spotify Premium. The order of execution is not guaranteed when
   * you use this API with other Player API endpoints.
   *
   * @example
   * ```ts
   * await client.me.player.setVolume({ volume_percent: 50 });
   * ```
   */
  setVolume(params: PlayerSetVolumeParams, options?: RequestOptions): APIPromise<void> {
    const { volume_percent, device_id } = params;
    return this._client.put('/me/player/volume', {
      query: { volume_percent, device_id },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Skips to next track in the user’s queue. This API only works for users who have
   * Spotify Premium. The order of execution is not guaranteed when you use this API
   * with other Player API endpoints.
   *
   * @example
   * ```ts
   * await client.me.player.skipNext();
   * ```
   */
  skipNext(params: PlayerSkipNextParams | null | undefined = {}, options?: RequestOptions): APIPromise<void> {
    const { device_id } = params ?? {};
    return this._client.post('/me/player/next', {
      query: { device_id },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Skips to previous track in the user’s queue. This API only works for users who
   * have Spotify Premium. The order of execution is not guaranteed when you use this
   * API with other Player API endpoints.
   *
   * @example
   * ```ts
   * await client.me.player.skipPrevious();
   * ```
   */
  skipPrevious(
    params: PlayerSkipPreviousParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { device_id } = params ?? {};
    return this._client.post('/me/player/previous', {
      query: { device_id },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Start a new context or resume current playback on the user's active device. This
   * API only works for users who have Spotify Premium. The order of execution is not
   * guaranteed when you use this API with other Player API endpoints.
   *
   * @example
   * ```ts
   * await client.me.player.startPlayback();
   * ```
   */
  startPlayback(
    params: PlayerStartPlaybackParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { device_id, ...body } = params ?? {};
    return this._client.put('/me/player/play', {
      query: { device_id },
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Toggle shuffle on or off for user’s playback. This API only works for users who
   * have Spotify Premium. The order of execution is not guaranteed when you use this
   * API with other Player API endpoints.
   *
   * @example
   * ```ts
   * await client.me.player.toggleShuffle({ state: true });
   * ```
   */
  toggleShuffle(params: PlayerToggleShuffleParams, options?: RequestOptions): APIPromise<void> {
    const { state, device_id } = params;
    return this._client.put('/me/player/shuffle', {
      query: { state, device_id },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Transfer playback to a new device and optionally begin playback. This API only
   * works for users who have Spotify Premium. The order of execution is not
   * guaranteed when you use this API with other Player API endpoints.
   *
   * @example
   * ```ts
   * await client.me.player.transfer({
   *   device_ids: ['74ASZWbe4lXaubB36ztrGX'],
   * });
   * ```
   */
  transfer(body: PlayerTransferParams, options?: RequestOptions): APIPromise<void> {
    return this._client.put('/me/player', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type PlayerListRecentlyPlayedResponsesCursorURLPage = CursorURLPage<PlayerListRecentlyPlayedResponse>;

export interface ContextObject {
  /**
   * External URLs for this context.
   */
  external_urls?: Shared.ExternalURLObject;

  /**
   * A link to the Web API endpoint providing full details of the track.
   */
  href?: string;

  /**
   * The playlist's public/private status (if it should be added to the user's
   * profile or not): `true` the playlist will be public, `false` the playlist will
   * be private, `null` the playlist status is not relevant. For more about
   * public/private status, see
   * [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  published?: boolean;

  /**
   * The object type, e.g. "artist", "playlist", "album", "show".
   */
  type?: string;

  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * context.
   */
  uri?: string;
}

export interface DeviceObject {
  /**
   * The device ID. This ID is unique and persistent to some extent. However, this is
   * not guaranteed and any cached `device_id` should periodically be cleared out and
   * refetched as necessary.
   */
  id?: string | null;

  /**
   * If this device is the currently active device.
   */
  is_active?: boolean;

  /**
   * If this device is currently in a private session.
   */
  is_private_session?: boolean;

  /**
   * Whether controlling this device is restricted. At present if this is "true" then
   * no Web API commands will be accepted by this device.
   */
  is_restricted?: boolean;

  /**
   * A human-readable name for the device. Some devices have a name that the user can
   * configure (e.g. \"Loudest speaker\") and some devices have a generic name
   * associated with the manufacturer or device model.
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

  /**
   * If this device can be used to set the volume.
   */
  supports_volume?: boolean;

  /**
   * Device type, such as "computer", "smartphone" or "speaker".
   */
  type?: string;

  /**
   * The current volume in percent.
   */
  volume_percent?: number | null;
}

export interface PlayerGetCurrentlyPlayingResponse {
  /**
   * Allows to update the user interface based on which playback actions are
   * available within the current context.
   */
  actions?: PlayerGetCurrentlyPlayingResponse.Actions;

  /**
   * A Context Object. Can be `null`.
   */
  context?: ContextObject;

  /**
   * The object type of the currently playing item. Can be one of `track`, `episode`,
   * `ad` or `unknown`.
   */
  currently_playing_type?: string;

  /**
   * If something is currently playing, return `true`.
   */
  is_playing?: boolean;

  /**
   * The currently playing track or episode. Can be `null`.
   */
  item?: Shared.TrackObject | Shared.EpisodeObject;

  /**
   * Progress into the currently playing track or episode. Can be `null`.
   */
  progress_ms?: number;

  /**
   * The playlist's public/private status (if it should be added to the user's
   * profile or not): `true` the playlist will be public, `false` the playlist will
   * be private, `null` the playlist status is not relevant. For more about
   * public/private status, see
   * [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  published?: boolean;

  /**
   * Unix Millisecond Timestamp when data was fetched
   */
  timestamp?: number;
}

export namespace PlayerGetCurrentlyPlayingResponse {
  /**
   * Allows to update the user interface based on which playback actions are
   * available within the current context.
   */
  export interface Actions {
    /**
     * Interrupting playback. Optional field.
     */
    interrupting_playback?: boolean;

    /**
     * Pausing. Optional field.
     */
    pausing?: boolean;

    /**
     * The playlist's public/private status (if it should be added to the user's
     * profile or not): `true` the playlist will be public, `false` the playlist will
     * be private, `null` the playlist status is not relevant. For more about
     * public/private status, see
     * [Working with Playlists](/documentation/web-api/concepts/playlists)
     */
    published?: boolean;

    /**
     * Resuming. Optional field.
     */
    resuming?: boolean;

    /**
     * Seeking playback location. Optional field.
     */
    seeking?: boolean;

    /**
     * Skipping to the next context. Optional field.
     */
    skipping_next?: boolean;

    /**
     * Skipping to the previous context. Optional field.
     */
    skipping_prev?: boolean;

    /**
     * Toggling repeat context flag. Optional field.
     */
    toggling_repeat_context?: boolean;

    /**
     * Toggling repeat track flag. Optional field.
     */
    toggling_repeat_track?: boolean;

    /**
     * Toggling shuffle flag. Optional field.
     */
    toggling_shuffle?: boolean;

    /**
     * Transfering playback between devices. Optional field.
     */
    transferring_playback?: boolean;
  }
}

export interface PlayerGetDevicesResponse {
  devices: Array<DeviceObject>;
}

export interface PlayerGetStateResponse {
  /**
   * Allows to update the user interface based on which playback actions are
   * available within the current context.
   */
  actions?: PlayerGetStateResponse.Actions;

  /**
   * A Context Object. Can be `null`.
   */
  context?: ContextObject;

  /**
   * The object type of the currently playing item. Can be one of `track`, `episode`,
   * `ad` or `unknown`.
   */
  currently_playing_type?: string;

  /**
   * The device that is currently active.
   */
  device?: DeviceObject;

  /**
   * If something is currently playing, return `true`.
   */
  is_playing?: boolean;

  /**
   * The currently playing track or episode. Can be `null`.
   */
  item?: Shared.TrackObject | Shared.EpisodeObject;

  /**
   * Progress into the currently playing track or episode. Can be `null`.
   */
  progress_ms?: number;

  /**
   * The playlist's public/private status (if it should be added to the user's
   * profile or not): `true` the playlist will be public, `false` the playlist will
   * be private, `null` the playlist status is not relevant. For more about
   * public/private status, see
   * [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  published?: boolean;

  /**
   * off, track, context
   */
  repeat_state?: string;

  /**
   * If shuffle is on or off.
   */
  shuffle_state?: boolean;

  /**
   * Unix Millisecond Timestamp when playback state was last changed (play, pause,
   * skip, scrub, new song, etc.).
   */
  timestamp?: number;
}

export namespace PlayerGetStateResponse {
  /**
   * Allows to update the user interface based on which playback actions are
   * available within the current context.
   */
  export interface Actions {
    /**
     * Interrupting playback. Optional field.
     */
    interrupting_playback?: boolean;

    /**
     * Pausing. Optional field.
     */
    pausing?: boolean;

    /**
     * The playlist's public/private status (if it should be added to the user's
     * profile or not): `true` the playlist will be public, `false` the playlist will
     * be private, `null` the playlist status is not relevant. For more about
     * public/private status, see
     * [Working with Playlists](/documentation/web-api/concepts/playlists)
     */
    published?: boolean;

    /**
     * Resuming. Optional field.
     */
    resuming?: boolean;

    /**
     * Seeking playback location. Optional field.
     */
    seeking?: boolean;

    /**
     * Skipping to the next context. Optional field.
     */
    skipping_next?: boolean;

    /**
     * Skipping to the previous context. Optional field.
     */
    skipping_prev?: boolean;

    /**
     * Toggling repeat context flag. Optional field.
     */
    toggling_repeat_context?: boolean;

    /**
     * Toggling repeat track flag. Optional field.
     */
    toggling_repeat_track?: boolean;

    /**
     * Toggling shuffle flag. Optional field.
     */
    toggling_shuffle?: boolean;

    /**
     * Transfering playback between devices. Optional field.
     */
    transferring_playback?: boolean;
  }
}

export interface PlayerListRecentlyPlayedResponse {
  /**
   * The context the track was played from.
   */
  context?: ContextObject;

  /**
   * The date and time the track was played.
   */
  played_at?: string;

  /**
   * The playlist's public/private status (if it should be added to the user's
   * profile or not): `true` the playlist will be public, `false` the playlist will
   * be private, `null` the playlist status is not relevant. For more about
   * public/private status, see
   * [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  published?: boolean;

  /**
   * The track the user listened to.
   */
  track?: Shared.TrackObject;
}

export interface PlayerGetCurrentlyPlayingParams {
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

export interface PlayerGetStateParams {
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

export interface PlayerListRecentlyPlayedParams {
  /**
   * A Unix timestamp in milliseconds. Returns all items after (but not including)
   * this cursor position. If `after` is specified, `before` must not be specified.
   */
  after?: number;

  /**
   * A Unix timestamp in milliseconds. Returns all items before (but not including)
   * this cursor position. If `before` is specified, `after` must not be specified.
   */
  before?: number;

  /**
   * The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   */
  limit?: number;
}

export interface PlayerPausePlaybackParams {
  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  device_id?: string;
}

export interface PlayerSeekToPositionParams {
  /**
   * The position in milliseconds to seek to. Must be a positive number. Passing in a
   * position that is greater than the length of the track will cause the player to
   * start playing the next song.
   */
  position_ms: number;

  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  device_id?: string;
}

export interface PlayerSetRepeatModeParams {
  /**
   * **track**, **context** or **off**.<br/> **track** will repeat the current
   * track.<br/> **context** will repeat the current context.<br/> **off** will turn
   * repeat off.
   */
  state: string;

  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  device_id?: string;
}

export interface PlayerSetVolumeParams {
  /**
   * The volume to set. Must be a value from 0 to 100 inclusive.
   */
  volume_percent: number;

  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  device_id?: string;
}

export interface PlayerSkipNextParams {
  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  device_id?: string;
}

export interface PlayerSkipPreviousParams {
  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  device_id?: string;
}

export interface PlayerStartPlaybackParams {
  /**
   * Query param: The id of the device this command is targeting. If not supplied,
   * the user's currently active device is the target.
   */
  device_id?: string;

  /**
   * Body param: Optional. Spotify URI of the context to play. Valid contexts are
   * albums, artists & playlists.
   * `{context_uri:"spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"}`
   */
  context_uri?: string;

  /**
   * Body param: Optional. Indicates from where in the context playback should start.
   * Only available when context_uri corresponds to an album or playlist object
   * "position" is zero based and can’t be negative. Example:
   * `"offset": {"position": 5}` "uri" is a string representing the uri of the item
   * to start at. Example:
   * `"offset": {"uri": "spotify:track:1301WleyT98MSxVHPZCA6M"}`
   */
  offset?: { [key: string]: unknown };

  /**
   * Body param: Indicates from what position to start playback. Must be a positive
   * number. Passing in a position that is greater than the length of the track will
   * cause the player to start playing the next song.
   */
  position_ms?: number;

  /**
   * Body param: The playlist's public/private status (if it should be added to the
   * user's profile or not): `true` the playlist will be public, `false` the playlist
   * will be private, `null` the playlist status is not relevant. For more about
   * public/private status, see
   * [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  published?: boolean;

  /**
   * Body param: Optional. A JSON array of the Spotify track URIs to play. For
   * example:
   * `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]}`
   */
  uris?: Array<string>;

  [k: string]: unknown;
}

export interface PlayerToggleShuffleParams {
  /**
   * **true** : Shuffle user's playback.<br/> **false** : Do not shuffle user's
   * playback.
   */
  state: boolean;

  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  device_id?: string;
}

export interface PlayerTransferParams {
  /**
   * A JSON array containing the ID of the device on which playback should be
   * started/transferred.<br/>For
   * example:`{device_ids:["74ASZWbe4lXaubB36ztrGX"]}`<br/>_**Note**: Although an
   * array is accepted, only a single device_id is currently supported. Supplying
   * more than one will return `400 Bad Request`_
   */
  device_ids: Array<string>;

  /**
   * **true**: ensure playback happens on new device.<br/>**false** or not provided:
   * keep the current playback state.
   */
  play?: boolean;

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

Player.Queue = Queue;

export declare namespace Player {
  export {
    type ContextObject as ContextObject,
    type DeviceObject as DeviceObject,
    type PlayerGetCurrentlyPlayingResponse as PlayerGetCurrentlyPlayingResponse,
    type PlayerGetDevicesResponse as PlayerGetDevicesResponse,
    type PlayerGetStateResponse as PlayerGetStateResponse,
    type PlayerListRecentlyPlayedResponse as PlayerListRecentlyPlayedResponse,
    type PlayerListRecentlyPlayedResponsesCursorURLPage as PlayerListRecentlyPlayedResponsesCursorURLPage,
    type PlayerGetCurrentlyPlayingParams as PlayerGetCurrentlyPlayingParams,
    type PlayerGetStateParams as PlayerGetStateParams,
    type PlayerListRecentlyPlayedParams as PlayerListRecentlyPlayedParams,
    type PlayerPausePlaybackParams as PlayerPausePlaybackParams,
    type PlayerSeekToPositionParams as PlayerSeekToPositionParams,
    type PlayerSetRepeatModeParams as PlayerSetRepeatModeParams,
    type PlayerSetVolumeParams as PlayerSetVolumeParams,
    type PlayerSkipNextParams as PlayerSkipNextParams,
    type PlayerSkipPreviousParams as PlayerSkipPreviousParams,
    type PlayerStartPlaybackParams as PlayerStartPlaybackParams,
    type PlayerToggleShuffleParams as PlayerToggleShuffleParams,
    type PlayerTransferParams as PlayerTransferParams,
  };

  export { Queue as Queue, type QueueGetResponse as QueueGetResponse, type QueueAddParams as QueueAddParams };
}

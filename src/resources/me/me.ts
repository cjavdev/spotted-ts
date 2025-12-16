// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as AlbumsAPI from './albums';
import {
  AlbumCheckParams,
  AlbumCheckResponse,
  AlbumListParams,
  AlbumListResponse,
  AlbumListResponsesCursorURLPage,
  AlbumRemoveParams,
  AlbumSaveParams,
  Albums,
} from './albums';
import * as AudiobooksAPI from './audiobooks';
import {
  AudiobookCheckParams,
  AudiobookCheckResponse,
  AudiobookListParams,
  AudiobookListResponse,
  AudiobookListResponsesCursorURLPage,
  AudiobookRemoveParams,
  AudiobookSaveParams,
  Audiobooks,
} from './audiobooks';
import * as EpisodesAPI from './episodes';
import {
  EpisodeCheckParams,
  EpisodeCheckResponse,
  EpisodeListParams,
  EpisodeListResponse,
  EpisodeListResponsesCursorURLPage,
  EpisodeRemoveParams,
  EpisodeSaveParams,
  Episodes,
} from './episodes';
import * as FollowingAPI from './following';
import {
  Following,
  FollowingBulkRetrieveParams,
  FollowingBulkRetrieveResponse,
  FollowingCheckParams,
  FollowingCheckResponse,
  FollowingFollowParams,
  FollowingUnfollowParams,
} from './following';
import * as PlaylistsAPI from './playlists';
import { PlaylistListParams, Playlists } from './playlists';
import * as ShowsAPI from './shows';
import {
  ShowCheckParams,
  ShowCheckResponse,
  ShowListParams,
  ShowListResponse,
  ShowListResponsesCursorURLPage,
  ShowRemoveParams,
  ShowSaveParams,
  Shows,
} from './shows';
import * as TopAPI from './top';
import { Top, TopListTopArtistsParams, TopListTopTracksParams } from './top';
import * as TracksAPI from './tracks';
import {
  TrackCheckParams,
  TrackCheckResponse,
  TrackListParams,
  TrackListResponse,
  TrackListResponsesCursorURLPage,
  TrackRemoveParams,
  TrackSaveParams,
  Tracks,
} from './tracks';
import * as PlayerAPI from './player/player';
import {
  ContextObject,
  DeviceObject,
  Player,
  PlayerGetCurrentlyPlayingParams,
  PlayerGetCurrentlyPlayingResponse,
  PlayerGetDevicesResponse,
  PlayerGetStateParams,
  PlayerGetStateResponse,
  PlayerListRecentlyPlayedParams,
  PlayerListRecentlyPlayedResponse,
  PlayerListRecentlyPlayedResponsesCursorURLPage,
  PlayerPausePlaybackParams,
  PlayerSeekToPositionParams,
  PlayerSetRepeatModeParams,
  PlayerSetVolumeParams,
  PlayerSkipNextParams,
  PlayerSkipPreviousParams,
  PlayerStartPlaybackParams,
  PlayerToggleShuffleParams,
  PlayerTransferParams,
} from './player/player';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Me extends APIResource {
  audiobooks: AudiobooksAPI.Audiobooks = new AudiobooksAPI.Audiobooks(this._client);
  playlists: PlaylistsAPI.Playlists = new PlaylistsAPI.Playlists(this._client);
  top: TopAPI.Top = new TopAPI.Top(this._client);
  albums: AlbumsAPI.Albums = new AlbumsAPI.Albums(this._client);
  tracks: TracksAPI.Tracks = new TracksAPI.Tracks(this._client);
  episodes: EpisodesAPI.Episodes = new EpisodesAPI.Episodes(this._client);
  shows: ShowsAPI.Shows = new ShowsAPI.Shows(this._client);
  following: FollowingAPI.Following = new FollowingAPI.Following(this._client);
  player: PlayerAPI.Player = new PlayerAPI.Player(this._client);

  /**
   * Get detailed profile information about the current user (including the current
   * user's username).
   *
   * @example
   * ```ts
   * const me = await client.me.retrieve();
   * ```
   */
  retrieve(options?: RequestOptions): APIPromise<MeRetrieveResponse> {
    return this._client.get('/me', options);
  }
}

export interface MeRetrieveResponse {
  /**
   * The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * user.
   */
  id?: string;

  /**
   * The country of the user, as set in the user's account profile. An
   * [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
   * _This field is only available when the current user has granted access to the
   * [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes)
   * scope._
   */
  country?: string;

  /**
   * The name displayed on the user's profile. `null` if not available.
   */
  display_name?: string;

  /**
   * The user's email address, as entered by the user when creating their account.
   * _**Important!** This email address is unverified; there is no proof that it
   * actually belongs to the user._ _This field is only available when the current
   * user has granted access to the
   * [user-read-email](/documentation/web-api/concepts/scopes/#list-of-scopes)
   * scope._
   */
  email?: string;

  /**
   * The user's explicit content settings. _This field is only available when the
   * current user has granted access to the
   * [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes)
   * scope._
   */
  explicit_content?: MeRetrieveResponse.ExplicitContent;

  /**
   * Known external URLs for this user.
   */
  external_urls?: Shared.ExternalURLObject;

  /**
   * Information about the followers of the user.
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
   * The user's Spotify subscription level: "premium", "free", etc. (The subscription
   * level "open" can be considered the same as "free".) _This field is only
   * available when the current user has granted access to the
   * [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes)
   * scope._
   */
  product?: string;

  /**
   * The playlist's public/private status (if it should be added to the user's
   * profile or not): `true` the playlist will be public, `false` the playlist will
   * be private, `null` the playlist status is not relevant. For more about
   * public/private status, see
   * [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  published?: boolean;

  /**
   * The object type: "user"
   */
  type?: string;

  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * user.
   */
  uri?: string;
}

export namespace MeRetrieveResponse {
  /**
   * The user's explicit content settings. _This field is only available when the
   * current user has granted access to the
   * [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes)
   * scope._
   */
  export interface ExplicitContent {
    /**
     * When `true`, indicates that explicit content should not be played.
     */
    filter_enabled?: boolean;

    /**
     * When `true`, indicates that the explicit content setting is locked and can't be
     * changed by the user.
     */
    filter_locked?: boolean;

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

Me.Audiobooks = Audiobooks;
Me.Playlists = Playlists;
Me.Top = Top;
Me.Albums = Albums;
Me.Tracks = Tracks;
Me.Episodes = Episodes;
Me.Shows = Shows;
Me.Following = Following;
Me.Player = Player;

export declare namespace Me {
  export { type MeRetrieveResponse as MeRetrieveResponse };

  export {
    Audiobooks as Audiobooks,
    type AudiobookListResponse as AudiobookListResponse,
    type AudiobookCheckResponse as AudiobookCheckResponse,
    type AudiobookListResponsesCursorURLPage as AudiobookListResponsesCursorURLPage,
    type AudiobookListParams as AudiobookListParams,
    type AudiobookCheckParams as AudiobookCheckParams,
    type AudiobookRemoveParams as AudiobookRemoveParams,
    type AudiobookSaveParams as AudiobookSaveParams,
  };

  export { Playlists as Playlists, type PlaylistListParams as PlaylistListParams };

  export {
    Top as Top,
    type TopListTopArtistsParams as TopListTopArtistsParams,
    type TopListTopTracksParams as TopListTopTracksParams,
  };

  export {
    Albums as Albums,
    type AlbumListResponse as AlbumListResponse,
    type AlbumCheckResponse as AlbumCheckResponse,
    type AlbumListResponsesCursorURLPage as AlbumListResponsesCursorURLPage,
    type AlbumListParams as AlbumListParams,
    type AlbumCheckParams as AlbumCheckParams,
    type AlbumRemoveParams as AlbumRemoveParams,
    type AlbumSaveParams as AlbumSaveParams,
  };

  export {
    Tracks as Tracks,
    type TrackListResponse as TrackListResponse,
    type TrackCheckResponse as TrackCheckResponse,
    type TrackListResponsesCursorURLPage as TrackListResponsesCursorURLPage,
    type TrackListParams as TrackListParams,
    type TrackCheckParams as TrackCheckParams,
    type TrackRemoveParams as TrackRemoveParams,
    type TrackSaveParams as TrackSaveParams,
  };

  export {
    Episodes as Episodes,
    type EpisodeListResponse as EpisodeListResponse,
    type EpisodeCheckResponse as EpisodeCheckResponse,
    type EpisodeListResponsesCursorURLPage as EpisodeListResponsesCursorURLPage,
    type EpisodeListParams as EpisodeListParams,
    type EpisodeCheckParams as EpisodeCheckParams,
    type EpisodeRemoveParams as EpisodeRemoveParams,
    type EpisodeSaveParams as EpisodeSaveParams,
  };

  export {
    Shows as Shows,
    type ShowListResponse as ShowListResponse,
    type ShowCheckResponse as ShowCheckResponse,
    type ShowListResponsesCursorURLPage as ShowListResponsesCursorURLPage,
    type ShowListParams as ShowListParams,
    type ShowCheckParams as ShowCheckParams,
    type ShowRemoveParams as ShowRemoveParams,
    type ShowSaveParams as ShowSaveParams,
  };

  export {
    Following as Following,
    type FollowingBulkRetrieveResponse as FollowingBulkRetrieveResponse,
    type FollowingCheckResponse as FollowingCheckResponse,
    type FollowingBulkRetrieveParams as FollowingBulkRetrieveParams,
    type FollowingCheckParams as FollowingCheckParams,
    type FollowingFollowParams as FollowingFollowParams,
    type FollowingUnfollowParams as FollowingUnfollowParams,
  };

  export {
    Player as Player,
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
}

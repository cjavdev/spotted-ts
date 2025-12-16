// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as Shared from '../../shared';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';

export class Queue extends APIResource {
  /**
   * Add an item to be played next in the user's current playback queue. This API
   * only works for users who have Spotify Premium. The order of execution is not
   * guaranteed when you use this API with other Player API endpoints.
   *
   * @example
   * ```ts
   * await client.me.player.queue.add({
   *   uri: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
   * });
   * ```
   */
  add(params: QueueAddParams, options?: RequestOptions): APIPromise<void> {
    const { uri, device_id } = params;
    return this._client.post('/me/player/queue', {
      query: { uri, device_id },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get the list of objects that make up the user's queue.
   *
   * @example
   * ```ts
   * const queue = await client.me.player.queue.get();
   * ```
   */
  get(options?: RequestOptions): APIPromise<QueueGetResponse> {
    return this._client.get('/me/player/queue', options);
  }
}

export interface QueueGetResponse {
  /**
   * The currently playing track or episode. Can be `null`.
   */
  currently_playing?: Shared.TrackObject | Shared.EpisodeObject;

  /**
   * The playlist's public/private status (if it should be added to the user's
   * profile or not): `true` the playlist will be public, `false` the playlist will
   * be private, `null` the playlist status is not relevant. For more about
   * public/private status, see
   * [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  published?: boolean;

  /**
   * The tracks or episodes in the queue. Can be empty.
   */
  queue?: Array<Shared.TrackObject | Shared.EpisodeObject>;
}

export interface QueueAddParams {
  /**
   * The uri of the item to add to the queue. Must be a track or an episode uri.
   */
  uri: string;

  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  device_id?: string;
}

export declare namespace Queue {
  export { type QueueGetResponse as QueueGetResponse, type QueueAddParams as QueueAddParams };
}

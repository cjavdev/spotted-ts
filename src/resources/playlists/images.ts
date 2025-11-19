// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Images extends APIResource {
  /**
   * Get the current image associated with a specific playlist.
   *
   * @example
   * ```ts
   * const imageObjects = await client.playlists.images.list(
   *   '3cEYpjA9oz9GiPac4AsH4n',
   * );
   * ```
   */
  list(playlistID: string, options?: RequestOptions): APIPromise<ImageListResponse> {
    return this._client.get(path`/playlists/${playlistID}/images`, options);
  }
}

export type ImageListResponse = Array<Shared.ImageObject>;

export declare namespace Images {
  export { type ImageListResponse as ImageListResponse };
}

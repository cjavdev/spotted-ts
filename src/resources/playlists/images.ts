// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Images extends APIResource {
  /**
   * Replace the image used to represent a specific playlist.
   *
   * @example
   * ```ts
   * const image = await client.playlists.images.update(
   *   '3cEYpjA9oz9GiPac4AsH4n',
   *   fs.createReadStream('path/to/file'),
   * );
   *
   * const content = await image.blob();
   * console.log(content);
   * ```
   */
  update(
    playlistID: string,
    body: string | ArrayBuffer | ArrayBufferView | Blob | DataView,
    options?: RequestOptions,
  ): APIPromise<Response> {
    return this._client.put(path`/playlists/${playlistID}/images`, {
      body: body,
      ...options,
      headers: buildHeaders([
        { 'Content-Type': 'image/jpeg', Accept: 'application/binary' },
        options?.headers,
      ]),
      __binaryResponse: true,
    });
  }

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

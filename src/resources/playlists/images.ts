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
   *   {
   *     body: '/9j/2wCEABoZGSccJz4lJT5CLy8vQkc9Ozs9R0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0cBHCcnMyYzPSYmPUc9Mj1HR0dEREdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR//dAAQAAf/uAA5BZG9iZQBkwAAAAAH/wAARCAABAAEDACIAAREBAhEB/8QASwABAQAAAAAAAAAAAAAAAAAAAAYBAQAAAAAAAAAAAAAAAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwAAARECEQA/AJgAH//Z',
   *   },
   * );
   *
   * const content = await image.blob();
   * console.log(content);
   * ```
   */
  update(playlistID: string, params: ImageUpdateParams, options?: RequestOptions): APIPromise<Response> {
    const { body } = params;
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

export interface ImageUpdateParams {
  /**
   * Base64 encoded JPEG image data, maximum payload size is 256 KB.
   */
  body: string;
}

export declare namespace Images {
  export { type ImageListResponse as ImageListResponse, type ImageUpdateParams as ImageUpdateParams };
}

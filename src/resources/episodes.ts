// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Episodes extends APIResource {
  /**
   * Get Spotify catalog information for a single episode identified by its unique
   * Spotify ID.
   */
  retrieve(
    id: string,
    query: EpisodeRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Shared.EpisodeObject> {
    return this._client.get(path`/episodes/${id}`, { query, ...options });
  }

  /**
   * Get Spotify catalog information for several episodes based on their Spotify IDs.
   */
  bulkRetrieve(
    query: EpisodeBulkRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<EpisodeBulkRetrieveResponse> {
    return this._client.get('/episodes', { query, ...options });
  }
}

export interface EpisodeBulkRetrieveResponse {
  episodes: Array<Shared.EpisodeObject>;
}

export interface EpisodeRetrieveParams {
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

export interface EpisodeBulkRetrieveParams {
  /**
   * A comma-separated list of the
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the
   * episodes. Maximum: 50 IDs.
   */
  ids: string;

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

export declare namespace Episodes {
  export {
    type EpisodeBulkRetrieveResponse as EpisodeBulkRetrieveResponse,
    type EpisodeRetrieveParams as EpisodeRetrieveParams,
    type EpisodeBulkRetrieveParams as EpisodeBulkRetrieveParams,
  };
}

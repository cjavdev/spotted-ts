// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Markets extends APIResource {
  /**
   * Get the list of markets where Spotify is available.
   *
   * @deprecated
   */
  list(options?: RequestOptions): APIPromise<MarketListResponse> {
    return this._client.get('/markets', options);
  }
}

export interface MarketListResponse {
  markets?: Array<string>;
}

export declare namespace Markets {
  export { type MarketListResponse as MarketListResponse };
}

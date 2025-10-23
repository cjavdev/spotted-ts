// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Spotted } from '../client';

export abstract class APIResource {
  protected _client: Spotted;

  constructor(client: Spotted) {
    this._client = client;
  }
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Spotted from 'spotted-ts';

const client = new Spotted({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource playlists', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.me.playlists.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.me.playlists.list({ limit: 10, offset: 5 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Spotted.NotFoundError);
  });
});

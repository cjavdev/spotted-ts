// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Spotted from 'spotted-ts';

const client = new Spotted({
  clientID: 'My Client ID',
  clientSecret: 'My Client Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource followers', () => {
  // Prism tests are disabled
  test.skip('check', async () => {
    const responsePromise = client.playlists.followers.check('3cEYpjA9oz9GiPac4AsH4n');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('check: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.playlists.followers.check(
        '3cEYpjA9oz9GiPac4AsH4n',
        { ids: 'jmperezperez' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Spotted.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('follow', async () => {
    const responsePromise = client.playlists.followers.follow('3cEYpjA9oz9GiPac4AsH4n');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('follow: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.playlists.followers.follow(
        '3cEYpjA9oz9GiPac4AsH4n',
        { public: false },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Spotted.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('unfollow', async () => {
    const responsePromise = client.playlists.followers.unfollow('3cEYpjA9oz9GiPac4AsH4n');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});

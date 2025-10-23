// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Spotted from 'spotted';

const client = new Spotted({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource playlists', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.users.playlists.create('smedjan', { name: 'New Playlist' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.users.playlists.create('smedjan', {
      name: 'New Playlist',
      collaborative: true,
      description: 'New playlist description',
      public: false,
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.users.playlists.list('smedjan');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.users.playlists.list('smedjan', { limit: 10, offset: 5 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Spotted.NotFoundError);
  });
});

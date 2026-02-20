// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Spotted from 'spotted-ts';

const client = new Spotted({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource top', () => {
  // Mock server tests are disabled
  test.skip('listTopArtists', async () => {
    const responsePromise = client.me.top.listTopArtists();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listTopArtists: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.me.top.listTopArtists(
        {
          limit: 10,
          offset: 5,
          time_range: 'medium_term',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Spotted.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('listTopTracks', async () => {
    const responsePromise = client.me.top.listTopTracks();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listTopTracks: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.me.top.listTopTracks(
        {
          limit: 10,
          offset: 5,
          time_range: 'medium_term',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Spotted.NotFoundError);
  });
});

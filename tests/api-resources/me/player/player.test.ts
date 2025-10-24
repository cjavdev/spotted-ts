// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Spotted from 'spotted';

const client = new Spotted({
  clientID: 'My Client ID',
  clientSecret: 'My Client Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource player', () => {
  // Prism tests are disabled
  test.skip('getCurrentlyPlaying', async () => {
    const responsePromise = client.me.player.getCurrentlyPlaying();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getCurrentlyPlaying: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.me.player.getCurrentlyPlaying(
        { additional_types: 'additional_types', market: 'ES' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Spotted.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('getDevices', async () => {
    const responsePromise = client.me.player.getDevices();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getState', async () => {
    const responsePromise = client.me.player.getState();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getState: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.me.player.getState(
        { additional_types: 'additional_types', market: 'ES' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Spotted.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('listRecentlyPlayed', async () => {
    const responsePromise = client.me.player.listRecentlyPlayed();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('listRecentlyPlayed: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.me.player.listRecentlyPlayed(
        { after: 1484811043508, before: 0, limit: 10 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Spotted.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('pausePlayback', async () => {
    const responsePromise = client.me.player.pausePlayback();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('pausePlayback: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.me.player.pausePlayback(
        { device_id: '0d1841b0976bae2a3a310dd74c0f3df354899bc8' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Spotted.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('seekToPosition: only required params', async () => {
    const responsePromise = client.me.player.seekToPosition({ position_ms: 25000 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('seekToPosition: required and optional params', async () => {
    const response = await client.me.player.seekToPosition({
      position_ms: 25000,
      device_id: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
    });
  });

  // Prism tests are disabled
  test.skip('setRepeatMode: only required params', async () => {
    const responsePromise = client.me.player.setRepeatMode({ state: 'context' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('setRepeatMode: required and optional params', async () => {
    const response = await client.me.player.setRepeatMode({
      state: 'context',
      device_id: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
    });
  });

  // Prism tests are disabled
  test.skip('setVolume: only required params', async () => {
    const responsePromise = client.me.player.setVolume({ volume_percent: 50 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('setVolume: required and optional params', async () => {
    const response = await client.me.player.setVolume({
      volume_percent: 50,
      device_id: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
    });
  });

  // Prism tests are disabled
  test.skip('skipNext', async () => {
    const responsePromise = client.me.player.skipNext();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('skipNext: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.me.player.skipNext(
        { device_id: '0d1841b0976bae2a3a310dd74c0f3df354899bc8' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Spotted.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('skipPrevious', async () => {
    const responsePromise = client.me.player.skipPrevious();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('skipPrevious: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.me.player.skipPrevious(
        { device_id: '0d1841b0976bae2a3a310dd74c0f3df354899bc8' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Spotted.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('startPlayback', async () => {
    const responsePromise = client.me.player.startPlayback();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('startPlayback: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.me.player.startPlayback(
        {
          device_id: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
          context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',
          offset: { position: 'bar' },
          position_ms: 0,
          uris: ['string'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Spotted.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('toggleShuffle: only required params', async () => {
    const responsePromise = client.me.player.toggleShuffle({ state: true });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('toggleShuffle: required and optional params', async () => {
    const response = await client.me.player.toggleShuffle({
      state: true,
      device_id: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
    });
  });

  // Prism tests are disabled
  test.skip('transfer: only required params', async () => {
    const responsePromise = client.me.player.transfer({ device_ids: ['74ASZWbe4lXaubB36ztrGX'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('transfer: required and optional params', async () => {
    const response = await client.me.player.transfer({ device_ids: ['74ASZWbe4lXaubB36ztrGX'], play: true });
  });
});

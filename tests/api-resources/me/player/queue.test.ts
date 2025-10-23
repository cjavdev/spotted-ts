// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Spotted from 'spotted';

const client = new Spotted({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource queue', () => {
  // Prism tests are disabled
  test.skip('add: only required params', async () => {
    const responsePromise = client.me.player.queue.add({ uri: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('add: required and optional params', async () => {
    const response = await client.me.player.queue.add({
      uri: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
      device_id: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
    });
  });

  // Prism tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.me.player.queue.get();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Spotted from 'spotted-ts';

const client = new Spotted({
  clientID: 'My Client ID',
  clientSecret: 'My Client Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource search', () => {
  // Prism tests are disabled
  test.skip('search: only required params', async () => {
    const responsePromise = client.search.search({
      q: 'remaster%20track:Doxy%20artist:Miles%20Davis',
      type: ['album'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('search: required and optional params', async () => {
    const response = await client.search.search({
      q: 'remaster%20track:Doxy%20artist:Miles%20Davis',
      type: ['album'],
      include_external: 'audio',
      limit: 10,
      market: 'ES',
      offset: 5,
    });
  });
});

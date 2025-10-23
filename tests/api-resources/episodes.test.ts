// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Spotted from 'spotted';

const client = new Spotted({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource episodes', () => {
  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.episodes.retrieve('512ojhOuo1ktJprKbVcKyQ');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.episodes.retrieve(
        '512ojhOuo1ktJprKbVcKyQ',
        { market: 'ES' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Spotted.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.episodes.list({ ids: '77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: required and optional params', async () => {
    const response = await client.episodes.list({
      ids: '77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf',
      market: 'ES',
    });
  });
});

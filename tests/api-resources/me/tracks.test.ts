// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Spotted from 'spotted-ts';

const client = new Spotted({
  clientID: 'My Client ID',
  clientSecret: 'My Client Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tracks', () => {
  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.me.tracks.list();
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
      client.me.tracks.list({ limit: 10, market: 'ES', offset: 5 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Spotted.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('check: only required params', async () => {
    const responsePromise = client.me.tracks.check({
      ids: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
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
  test.skip('check: required and optional params', async () => {
    const response = await client.me.tracks.check({
      ids: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
    });
  });

  // Prism tests are disabled
  test.skip('remove', async () => {
    const responsePromise = client.me.tracks.remove();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('remove: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.me.tracks.remove({ ids: ['string'], published: true }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Spotted.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('save: only required params', async () => {
    const responsePromise = client.me.tracks.save({ ids: ['string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('save: required and optional params', async () => {
    const response = await client.me.tracks.save({
      ids: ['string'],
      published: true,
      timestamped_ids: [{ id: 'id', added_at: '2019-12-27T18:11:19.117Z' }],
    });
  });
});

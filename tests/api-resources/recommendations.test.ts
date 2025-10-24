// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Spotted from 'spotted-ts';

const client = new Spotted({
  clientID: 'My Client ID',
  clientSecret: 'My Client Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource recommendations', () => {
  // Prism tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.recommendations.get();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('get: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.recommendations.get(
        {
          limit: 10,
          market: 'ES',
          max_acousticness: 0,
          max_danceability: 0,
          max_duration_ms: 0,
          max_energy: 0,
          max_instrumentalness: 0,
          max_key: 0,
          max_liveness: 0,
          max_loudness: 0,
          max_mode: 0,
          max_popularity: 0,
          max_speechiness: 0,
          max_tempo: 0,
          max_time_signature: 0,
          max_valence: 0,
          min_acousticness: 0,
          min_danceability: 0,
          min_duration_ms: 0,
          min_energy: 0,
          min_instrumentalness: 0,
          min_key: 0,
          min_liveness: 0,
          min_loudness: 0,
          min_mode: 0,
          min_popularity: 0,
          min_speechiness: 0,
          min_tempo: 0,
          min_time_signature: 11,
          min_valence: 0,
          seed_artists: '4NHQUGzhtTLFvgF5SZesLK',
          seed_genres: 'classical,country',
          seed_tracks: '0c6xIDDpzE81m2q797ordA',
          target_acousticness: 0,
          target_danceability: 0,
          target_duration_ms: 0,
          target_energy: 0,
          target_instrumentalness: 0,
          target_key: 0,
          target_liveness: 0,
          target_loudness: 0,
          target_mode: 0,
          target_popularity: 0,
          target_speechiness: 0,
          target_tempo: 0,
          target_time_signature: 0,
          target_valence: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Spotted.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('listAvailableGenreSeeds', async () => {
    const responsePromise = client.recommendations.listAvailableGenreSeeds();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});

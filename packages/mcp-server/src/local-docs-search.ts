// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'retrieve',
    endpoint: '/albums/{id}',
    httpMethod: 'get',
    summary: 'Get Album\n',
    description: 'Get Spotify catalog information for a single album.\n',
    stainlessPath: '(resource) albums > (method) retrieve',
    qualified: 'client.albums.retrieve',
    params: ['id: string;', 'market?: string;'],
    response:
      "{ id: string; album_type: 'album' | 'single' | 'compilation'; available_markets: string[]; external_urls: { published?: boolean; spotify?: string; }; href: string; images: { height: number; url: string; width: number; published?: boolean; }[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; artists?: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; copyrights?: { published?: boolean; text?: string; type?: string; }[]; external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }; genres?: string[]; label?: string; popularity?: number; published?: boolean; restrictions?: { published?: boolean; reason?: 'market' | 'product' | 'explicit'; }; tracks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: object[]; published?: boolean; }; }",
    markdown:
      "## retrieve\n\n`client.albums.retrieve(id: string, market?: string): { id: string; album_type: 'album' | 'single' | 'compilation'; available_markets: string[]; external_urls: external_url_object; href: string; images: image_object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; artists?: simplified_artist_object[]; copyrights?: copyright_object[]; external_ids?: external_id_object; genres?: string[]; label?: string; popularity?: number; published?: boolean; restrictions?: album_restriction_object; tracks?: object; }`\n\n**get** `/albums/{id}`\n\nGet Spotify catalog information for a single album.\n\n\n### Parameters\n\n- `id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the album.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n### Returns\n\n- `{ id: string; album_type: 'album' | 'single' | 'compilation'; available_markets: string[]; external_urls: { published?: boolean; spotify?: string; }; href: string; images: { height: number; url: string; width: number; published?: boolean; }[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; artists?: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; copyrights?: { published?: boolean; text?: string; type?: string; }[]; external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }; genres?: string[]; label?: string; popularity?: number; published?: boolean; restrictions?: { published?: boolean; reason?: 'market' | 'product' | 'explicit'; }; tracks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: object[]; published?: boolean; }; }`\n\n  - `id: string`\n  - `album_type: 'album' | 'single' | 'compilation'`\n  - `available_markets: string[]`\n  - `external_urls: { published?: boolean; spotify?: string; }`\n  - `href: string`\n  - `images: { height: number; url: string; width: number; published?: boolean; }[]`\n  - `name: string`\n  - `release_date: string`\n  - `release_date_precision: 'year' | 'month' | 'day'`\n  - `total_tracks: number`\n  - `type: 'album'`\n  - `uri: string`\n  - `artists?: { id?: string; external_urls?: { published?: boolean; spotify?: string; }; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]`\n  - `copyrights?: { published?: boolean; text?: string; type?: string; }[]`\n  - `external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }`\n  - `genres?: string[]`\n  - `label?: string`\n  - `popularity?: number`\n  - `published?: boolean`\n  - `restrictions?: { published?: boolean; reason?: 'market' | 'product' | 'explicit'; }`\n  - `tracks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { id?: string; artists?: object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_urls?: object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: object; name?: string; preview_url?: string; published?: boolean; restrictions?: object; track_number?: number; type?: string; uri?: string; }[]; published?: boolean; }`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst album = await client.albums.retrieve('4aawyAB9vmqN3uQ7FjRGTy');\n\nconsole.log(album);\n```",
  },
  {
    name: 'bulk_retrieve',
    endpoint: '/albums',
    httpMethod: 'get',
    summary: 'Get Several Albums\n',
    description: 'Get Spotify catalog information for multiple albums identified by their Spotify IDs.\n',
    stainlessPath: '(resource) albums > (method) bulk_retrieve',
    qualified: 'client.albums.bulkRetrieve',
    params: ['ids: string;', 'market?: string;'],
    response:
      "{ albums: { id: string; album_type: 'album' | 'single' | 'compilation'; available_markets: string[]; external_urls: object; href: string; images: object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; artists?: object[]; copyrights?: object[]; external_ids?: object; genres?: string[]; label?: string; popularity?: number; published?: boolean; restrictions?: object; tracks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: simplified_track_object[]; published?: boolean; }; }[]; }",
    markdown:
      "## bulk_retrieve\n\n`client.albums.bulkRetrieve(ids: string, market?: string): { albums: object[]; }`\n\n**get** `/albums`\n\nGet Spotify catalog information for multiple albums identified by their Spotify IDs.\n\n\n### Parameters\n\n- `ids: string`\n  A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n### Returns\n\n- `{ albums: { id: string; album_type: 'album' | 'single' | 'compilation'; available_markets: string[]; external_urls: object; href: string; images: object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; artists?: object[]; copyrights?: object[]; external_ids?: object; genres?: string[]; label?: string; popularity?: number; published?: boolean; restrictions?: object; tracks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: simplified_track_object[]; published?: boolean; }; }[]; }`\n\n  - `albums: { id: string; album_type: 'album' | 'single' | 'compilation'; available_markets: string[]; external_urls: { published?: boolean; spotify?: string; }; href: string; images: { height: number; url: string; width: number; published?: boolean; }[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; artists?: { id?: string; external_urls?: object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; copyrights?: { published?: boolean; text?: string; type?: string; }[]; external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }; genres?: string[]; label?: string; popularity?: number; published?: boolean; restrictions?: { published?: boolean; reason?: 'market' | 'product' | 'explicit'; }; tracks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { id?: string; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: string; uri?: string; }[]; published?: boolean; }; }[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.albums.bulkRetrieve({ ids: '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'list_tracks',
    endpoint: '/albums/{id}/tracks',
    httpMethod: 'get',
    summary: 'Get Album Tracks\n',
    description:
      'Get Spotify catalog information about an album’s tracks.\nOptional parameters can be used to limit the number of tracks returned.\n',
    stainlessPath: '(resource) albums > (method) list_tracks',
    qualified: 'client.albums.listTracks',
    params: ['id: string;', 'limit?: number;', 'market?: string;', 'offset?: number;'],
    response:
      "{ id?: string; artists?: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_urls?: { published?: boolean; spotify?: string; }; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; name?: string; preview_url?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; track_number?: number; type?: string; uri?: string; }",
    markdown:
      "## list_tracks\n\n`client.albums.listTracks(id: string, limit?: number, market?: string, offset?: number): { id?: string; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: string; uri?: string; }`\n\n**get** `/albums/{id}/tracks`\n\nGet Spotify catalog information about an album’s tracks.\nOptional parameters can be used to limit the number of tracks returned.\n\n\n### Parameters\n\n- `id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the album.\n\n\n- `limit?: number`\n  The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n- `offset?: number`\n  The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n\n\n### Returns\n\n- `{ id?: string; artists?: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_urls?: { published?: boolean; spotify?: string; }; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; name?: string; preview_url?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; track_number?: number; type?: string; uri?: string; }`\n\n  - `id?: string`\n  - `artists?: { id?: string; external_urls?: { published?: boolean; spotify?: string; }; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]`\n  - `available_markets?: string[]`\n  - `disc_number?: number`\n  - `duration_ms?: number`\n  - `explicit?: boolean`\n  - `external_urls?: { published?: boolean; spotify?: string; }`\n  - `href?: string`\n  - `is_local?: boolean`\n  - `is_playable?: boolean`\n  - `linked_from?: { id?: string; external_urls?: { published?: boolean; spotify?: string; }; href?: string; published?: boolean; type?: string; uri?: string; }`\n  - `name?: string`\n  - `preview_url?: string`\n  - `published?: boolean`\n  - `restrictions?: { published?: boolean; reason?: string; }`\n  - `track_number?: number`\n  - `type?: string`\n  - `uri?: string`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\n// Automatically fetches more pages as needed.\nfor await (const simplifiedTrackObject of client.albums.listTracks('4aawyAB9vmqN3uQ7FjRGTy')) {\n  console.log(simplifiedTrackObject);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/artists/{id}',
    httpMethod: 'get',
    summary: 'Get Artist\n',
    description:
      'Get Spotify catalog information for a single artist identified by their unique Spotify ID.\n',
    stainlessPath: '(resource) artists > (method) retrieve',
    qualified: 'client.artists.retrieve',
    params: ['id: string;'],
    response:
      "{ id?: string; external_urls?: { published?: boolean; spotify?: string; }; followers?: { href?: string; published?: boolean; total?: number; }; genres?: string[]; href?: string; images?: { height: number; url: string; width: number; published?: boolean; }[]; name?: string; popularity?: number; published?: boolean; type?: 'artist'; uri?: string; }",
    markdown:
      "## retrieve\n\n`client.artists.retrieve(id: string): { id?: string; external_urls?: external_url_object; followers?: followers_object; genres?: string[]; href?: string; images?: image_object[]; name?: string; popularity?: number; published?: boolean; type?: 'artist'; uri?: string; }`\n\n**get** `/artists/{id}`\n\nGet Spotify catalog information for a single artist identified by their unique Spotify ID.\n\n\n### Parameters\n\n- `id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n\n\n### Returns\n\n- `{ id?: string; external_urls?: { published?: boolean; spotify?: string; }; followers?: { href?: string; published?: boolean; total?: number; }; genres?: string[]; href?: string; images?: { height: number; url: string; width: number; published?: boolean; }[]; name?: string; popularity?: number; published?: boolean; type?: 'artist'; uri?: string; }`\n\n  - `id?: string`\n  - `external_urls?: { published?: boolean; spotify?: string; }`\n  - `followers?: { href?: string; published?: boolean; total?: number; }`\n  - `genres?: string[]`\n  - `href?: string`\n  - `images?: { height: number; url: string; width: number; published?: boolean; }[]`\n  - `name?: string`\n  - `popularity?: number`\n  - `published?: boolean`\n  - `type?: 'artist'`\n  - `uri?: string`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst artistObject = await client.artists.retrieve('0TnOYISbd1XYRBk9myaseg');\n\nconsole.log(artistObject);\n```",
  },
  {
    name: 'bulk_retrieve',
    endpoint: '/artists',
    httpMethod: 'get',
    summary: 'Get Several Artists\n',
    description: 'Get Spotify catalog information for several artists based on their Spotify IDs.\n',
    stainlessPath: '(resource) artists > (method) bulk_retrieve',
    qualified: 'client.artists.bulkRetrieve',
    params: ['ids: string;'],
    response:
      "{ artists: { id?: string; external_urls?: external_url_object; followers?: followers_object; genres?: string[]; href?: string; images?: image_object[]; name?: string; popularity?: number; published?: boolean; type?: 'artist'; uri?: string; }[]; }",
    markdown:
      "## bulk_retrieve\n\n`client.artists.bulkRetrieve(ids: string): { artists: artist_object[]; }`\n\n**get** `/artists`\n\nGet Spotify catalog information for several artists based on their Spotify IDs.\n\n\n### Parameters\n\n- `ids: string`\n  A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the artists. Maximum: 50 IDs.\n\n\n### Returns\n\n- `{ artists: { id?: string; external_urls?: external_url_object; followers?: followers_object; genres?: string[]; href?: string; images?: image_object[]; name?: string; popularity?: number; published?: boolean; type?: 'artist'; uri?: string; }[]; }`\n\n  - `artists: { id?: string; external_urls?: { published?: boolean; spotify?: string; }; followers?: { href?: string; published?: boolean; total?: number; }; genres?: string[]; href?: string; images?: { height: number; url: string; width: number; published?: boolean; }[]; name?: string; popularity?: number; published?: boolean; type?: 'artist'; uri?: string; }[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.artists.bulkRetrieve({ ids: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'list_albums',
    endpoint: '/artists/{id}/albums',
    httpMethod: 'get',
    summary: "Get Artist's Albums\n",
    description: "Get Spotify catalog information about an artist's albums.\n",
    stainlessPath: '(resource) artists > (method) list_albums',
    qualified: 'client.artists.listAlbums',
    params: [
      'id: string;',
      'include_groups?: string;',
      'limit?: number;',
      'market?: string;',
      'offset?: number;',
    ],
    response:
      "{ id: string; album_group: 'album' | 'single' | 'compilation' | 'appears_on'; album_type: 'album' | 'single' | 'compilation'; artists: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets: string[]; external_urls: { published?: boolean; spotify?: string; }; href: string; images: { height: number; url: string; width: number; published?: boolean; }[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: { published?: boolean; reason?: 'market' | 'product' | 'explicit'; }; }",
    markdown:
      "## list_albums\n\n`client.artists.listAlbums(id: string, include_groups?: string, limit?: number, market?: string, offset?: number): { id: string; album_group: 'album' | 'single' | 'compilation' | 'appears_on'; album_type: 'album' | 'single' | 'compilation'; artists: simplified_artist_object[]; available_markets: string[]; external_urls: external_url_object; href: string; images: image_object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: album_restriction_object; }`\n\n**get** `/artists/{id}/albums`\n\nGet Spotify catalog information about an artist's albums.\n\n\n### Parameters\n\n- `id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n\n\n- `include_groups?: string`\n  A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. <br/>\nValid values are:<br/>- `album`<br/>- `single`<br/>- `appears_on`<br/>- `compilation`<br/>For example: `include_groups=album,single`.\n\n\n- `limit?: number`\n  The maximum number of items to return. Default: 5. Minimum: 1. Maximum: 10.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n- `offset?: number`\n  The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n\n\n### Returns\n\n- `{ id: string; album_group: 'album' | 'single' | 'compilation' | 'appears_on'; album_type: 'album' | 'single' | 'compilation'; artists: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets: string[]; external_urls: { published?: boolean; spotify?: string; }; href: string; images: { height: number; url: string; width: number; published?: boolean; }[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: { published?: boolean; reason?: 'market' | 'product' | 'explicit'; }; }`\n\n  - `id: string`\n  - `album_group: 'album' | 'single' | 'compilation' | 'appears_on'`\n  - `album_type: 'album' | 'single' | 'compilation'`\n  - `artists: { id?: string; external_urls?: { published?: boolean; spotify?: string; }; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]`\n  - `available_markets: string[]`\n  - `external_urls: { published?: boolean; spotify?: string; }`\n  - `href: string`\n  - `images: { height: number; url: string; width: number; published?: boolean; }[]`\n  - `name: string`\n  - `release_date: string`\n  - `release_date_precision: 'year' | 'month' | 'day'`\n  - `total_tracks: number`\n  - `type: 'album'`\n  - `uri: string`\n  - `published?: boolean`\n  - `restrictions?: { published?: boolean; reason?: 'market' | 'product' | 'explicit'; }`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\n// Automatically fetches more pages as needed.\nfor await (const artistListAlbumsResponse of client.artists.listAlbums('0TnOYISbd1XYRBk9myaseg')) {\n  console.log(artistListAlbumsResponse);\n}\n```",
  },
  {
    name: 'list_related_artists',
    endpoint: '/artists/{id}/related-artists',
    httpMethod: 'get',
    summary: "Get Artist's Related Artists\n",
    description:
      "Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's listening history.\n",
    stainlessPath: '(resource) artists > (method) list_related_artists',
    qualified: 'client.artists.listRelatedArtists',
    params: ['id: string;'],
    response:
      "{ artists: { id?: string; external_urls?: external_url_object; followers?: followers_object; genres?: string[]; href?: string; images?: image_object[]; name?: string; popularity?: number; published?: boolean; type?: 'artist'; uri?: string; }[]; }",
    markdown:
      "## list_related_artists\n\n`client.artists.listRelatedArtists(id: string): { artists: artist_object[]; }`\n\n**get** `/artists/{id}/related-artists`\n\nGet Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's listening history.\n\n\n### Parameters\n\n- `id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n\n\n### Returns\n\n- `{ artists: { id?: string; external_urls?: external_url_object; followers?: followers_object; genres?: string[]; href?: string; images?: image_object[]; name?: string; popularity?: number; published?: boolean; type?: 'artist'; uri?: string; }[]; }`\n\n  - `artists: { id?: string; external_urls?: { published?: boolean; spotify?: string; }; followers?: { href?: string; published?: boolean; total?: number; }; genres?: string[]; href?: string; images?: { height: number; url: string; width: number; published?: boolean; }[]; name?: string; popularity?: number; published?: boolean; type?: 'artist'; uri?: string; }[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.artists.listRelatedArtists('0TnOYISbd1XYRBk9myaseg');\n\nconsole.log(response);\n```",
  },
  {
    name: 'top_tracks',
    endpoint: '/artists/{id}/top-tracks',
    httpMethod: 'get',
    summary: "Get Artist's Top Tracks\n",
    description: "Get Spotify catalog information about an artist's top tracks by country.\n",
    stainlessPath: '(resource) artists > (method) top_tracks',
    qualified: 'client.artists.topTracks',
    params: ['id: string;', 'market?: string;'],
    response:
      "{ tracks: { id?: string; album?: object; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: external_id_object; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: 'track'; uri?: string; }[]; }",
    markdown:
      "## top_tracks\n\n`client.artists.topTracks(id: string, market?: string): { tracks: track_object[]; }`\n\n**get** `/artists/{id}/top-tracks`\n\nGet Spotify catalog information about an artist's top tracks by country.\n\n\n### Parameters\n\n- `id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n### Returns\n\n- `{ tracks: { id?: string; album?: object; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: external_id_object; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: 'track'; uri?: string; }[]; }`\n\n  - `tracks: { id?: string; album?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: object[]; available_markets: string[]; external_urls: object; href: string; images: object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: object; }; artists?: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }; external_urls?: { published?: boolean; spotify?: string; }; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; track_number?: number; type?: 'track'; uri?: string; }[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.artists.topTracks('0TnOYISbd1XYRBk9myaseg');\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/shows/{id}',
    httpMethod: 'get',
    summary: 'Get Show\n',
    description: 'Get Spotify catalog information for a single show identified by its\nunique Spotify ID.\n',
    stainlessPath: '(resource) shows > (method) retrieve',
    qualified: 'client.shows.retrieve',
    params: ['id: string;', 'market?: string;'],
    response:
      "{ id: string; available_markets: string[]; copyrights: object[]; description: string; explicit: boolean; external_urls: object; href: string; html_description: string; images: object[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }",
    markdown:
      "## retrieve\n\n`client.shows.retrieve(id: string, market?: string): object`\n\n**get** `/shows/{id}`\n\nGet Spotify catalog information for a single show identified by its\nunique Spotify ID.\n\n\n### Parameters\n\n- `id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n### Returns\n\n- `{ id: string; available_markets: string[]; copyrights: object[]; description: string; explicit: boolean; external_urls: object; href: string; html_description: string; images: object[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst show = await client.shows.retrieve('38bS44xjbVVZ3No3ByF1dJ');\n\nconsole.log(show);\n```",
  },
  {
    name: 'bulk_retrieve',
    endpoint: '/shows',
    httpMethod: 'get',
    summary: 'Get Several Shows\n',
    description: 'Get Spotify catalog information for several shows based on their Spotify IDs.\n',
    stainlessPath: '(resource) shows > (method) bulk_retrieve',
    qualified: 'client.shows.bulkRetrieve',
    params: ['ids: string;', 'market?: string;'],
    response:
      "{ shows: { id: string; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }[]; }",
    markdown:
      "## bulk_retrieve\n\n`client.shows.bulkRetrieve(ids: string, market?: string): { shows: show_base[]; }`\n\n**get** `/shows`\n\nGet Spotify catalog information for several shows based on their Spotify IDs.\n\n\n### Parameters\n\n- `ids: string`\n  A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n### Returns\n\n- `{ shows: { id: string; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }[]; }`\n\n  - `shows: { id: string; available_markets: string[]; copyrights: { published?: boolean; text?: string; type?: string; }[]; description: string; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.shows.bulkRetrieve({ ids: '5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'list_episodes',
    endpoint: '/shows/{id}/episodes',
    httpMethod: 'get',
    summary: 'Get Show Episodes\n',
    description:
      'Get Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.\n',
    stainlessPath: '(resource) shows > (method) list_episodes',
    qualified: 'client.shows.listEpisodes',
    params: ['id: string;', 'limit?: number;', 'market?: string;', 'offset?: number;'],
    response:
      "{ id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }; }",
    markdown:
      "## list_episodes\n\n`client.shows.listEpisodes(id: string, limit?: number, market?: string, offset?: number): { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: episode_restriction_object; resume_point?: resume_point_object; }`\n\n**get** `/shows/{id}/episodes`\n\nGet Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.\n\n\n### Parameters\n\n- `id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n\n\n- `limit?: number`\n  The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n- `offset?: number`\n  The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n\n\n### Returns\n\n- `{ id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }; }`\n\n  - `id: string`\n  - `audio_preview_url: string`\n  - `description: string`\n  - `duration_ms: number`\n  - `explicit: boolean`\n  - `external_urls: { published?: boolean; spotify?: string; }`\n  - `href: string`\n  - `html_description: string`\n  - `images: { height: number; url: string; width: number; published?: boolean; }[]`\n  - `is_externally_hosted: boolean`\n  - `is_playable: boolean`\n  - `languages: string[]`\n  - `name: string`\n  - `release_date: string`\n  - `release_date_precision: 'year' | 'month' | 'day'`\n  - `type: 'episode'`\n  - `uri: string`\n  - `language?: string`\n  - `published?: boolean`\n  - `restrictions?: { published?: boolean; reason?: string; }`\n  - `resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\n// Automatically fetches more pages as needed.\nfor await (const simplifiedEpisodeObject of client.shows.listEpisodes('38bS44xjbVVZ3No3ByF1dJ')) {\n  console.log(simplifiedEpisodeObject);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/episodes/{id}',
    httpMethod: 'get',
    summary: 'Get Episode\n',
    description:
      'Get Spotify catalog information for a single episode identified by its\nunique Spotify ID.\n',
    stainlessPath: '(resource) episodes > (method) retrieve',
    qualified: 'client.episodes.retrieve',
    params: ['id: string;', 'market?: string;'],
    response:
      "{ id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: { id: string; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }; }",
    markdown:
      "## retrieve\n\n`client.episodes.retrieve(id: string, market?: string): { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: show_base; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: episode_restriction_object; resume_point?: resume_point_object; }`\n\n**get** `/episodes/{id}`\n\nGet Spotify catalog information for a single episode identified by its\nunique Spotify ID.\n\n\n### Parameters\n\n- `id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n### Returns\n\n- `{ id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: { id: string; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }; }`\n\n  - `id: string`\n  - `audio_preview_url: string`\n  - `description: string`\n  - `duration_ms: number`\n  - `explicit: boolean`\n  - `external_urls: { published?: boolean; spotify?: string; }`\n  - `href: string`\n  - `html_description: string`\n  - `images: { height: number; url: string; width: number; published?: boolean; }[]`\n  - `is_externally_hosted: boolean`\n  - `is_playable: boolean`\n  - `languages: string[]`\n  - `name: string`\n  - `release_date: string`\n  - `release_date_precision: 'year' | 'month' | 'day'`\n  - `show: { id: string; available_markets: string[]; copyrights: { published?: boolean; text?: string; type?: string; }[]; description: string; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }`\n  - `type: 'episode'`\n  - `uri: string`\n  - `language?: string`\n  - `published?: boolean`\n  - `restrictions?: { published?: boolean; reason?: string; }`\n  - `resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst episodeObject = await client.episodes.retrieve('512ojhOuo1ktJprKbVcKyQ');\n\nconsole.log(episodeObject);\n```",
  },
  {
    name: 'bulk_retrieve',
    endpoint: '/episodes',
    httpMethod: 'get',
    summary: 'Get Several Episodes\n',
    description: 'Get Spotify catalog information for several episodes based on their Spotify IDs.\n',
    stainlessPath: '(resource) episodes > (method) bulk_retrieve',
    qualified: 'client.episodes.bulkRetrieve',
    params: ['ids: string;', 'market?: string;'],
    response:
      "{ episodes: { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: show_base; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: episode_restriction_object; resume_point?: resume_point_object; }[]; }",
    markdown:
      "## bulk_retrieve\n\n`client.episodes.bulkRetrieve(ids: string, market?: string): { episodes: episode_object[]; }`\n\n**get** `/episodes`\n\nGet Spotify catalog information for several episodes based on their Spotify IDs.\n\n\n### Parameters\n\n- `ids: string`\n  A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n### Returns\n\n- `{ episodes: { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: show_base; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: episode_restriction_object; resume_point?: resume_point_object; }[]; }`\n\n  - `episodes: { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: { id: string; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }; }[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.episodes.bulkRetrieve({ ids: '77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/audiobooks/{id}',
    httpMethod: 'get',
    summary: 'Get an Audiobook\n',
    description:
      'Get Spotify catalog information for a single audiobook. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
    stainlessPath: '(resource) audiobooks > (method) retrieve',
    qualified: 'client.audiobooks.retrieve',
    params: ['id: string;', 'market?: string;'],
    response:
      "{ id: string; authors: object[]; available_markets: string[]; copyrights: object[]; description: string; explicit: boolean; external_urls: object; href: string; html_description: string; images: object[]; languages: string[]; media_type: string; name: string; narrators: object[]; publisher: string; total_chapters: number; type: 'audiobook'; uri: string; edition?: string; published?: boolean; }",
    markdown:
      "## retrieve\n\n`client.audiobooks.retrieve(id: string, market?: string): object`\n\n**get** `/audiobooks/{id}`\n\nGet Spotify catalog information for a single audiobook. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n\n\n### Parameters\n\n- `id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n### Returns\n\n- `{ id: string; authors: object[]; available_markets: string[]; copyrights: object[]; description: string; explicit: boolean; external_urls: object; href: string; html_description: string; images: object[]; languages: string[]; media_type: string; name: string; narrators: object[]; publisher: string; total_chapters: number; type: 'audiobook'; uri: string; edition?: string; published?: boolean; }`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst audiobook = await client.audiobooks.retrieve('7iHfbu1YPACw6oZPAFJtqe');\n\nconsole.log(audiobook);\n```",
  },
  {
    name: 'bulk_retrieve',
    endpoint: '/audiobooks',
    httpMethod: 'get',
    summary: 'Get Several Audiobooks\n',
    description:
      'Get Spotify catalog information for several audiobooks identified by their Spotify IDs. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
    stainlessPath: '(resource) audiobooks > (method) bulk_retrieve',
    qualified: 'client.audiobooks.bulkRetrieve',
    params: ['ids: string;', 'market?: string;'],
    response:
      "{ audiobooks: { id: string; authors: author_object[]; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; languages: string[]; media_type: string; name: string; narrators: narrator_object[]; publisher: string; total_chapters: number; type: 'audiobook'; uri: string; edition?: string; published?: boolean; }[]; }",
    markdown:
      "## bulk_retrieve\n\n`client.audiobooks.bulkRetrieve(ids: string, market?: string): { audiobooks: audiobook_base[]; }`\n\n**get** `/audiobooks`\n\nGet Spotify catalog information for several audiobooks identified by their Spotify IDs. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n\n\n### Parameters\n\n- `ids: string`\n  A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n### Returns\n\n- `{ audiobooks: { id: string; authors: author_object[]; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; languages: string[]; media_type: string; name: string; narrators: narrator_object[]; publisher: string; total_chapters: number; type: 'audiobook'; uri: string; edition?: string; published?: boolean; }[]; }`\n\n  - `audiobooks: { id: string; authors: { name?: string; published?: boolean; }[]; available_markets: string[]; copyrights: { published?: boolean; text?: string; type?: string; }[]; description: string; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; languages: string[]; media_type: string; name: string; narrators: { name?: string; published?: boolean; }[]; publisher: string; total_chapters: number; type: 'audiobook'; uri: string; edition?: string; published?: boolean; }[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.audiobooks.bulkRetrieve({ ids: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'list_chapters',
    endpoint: '/audiobooks/{id}/chapters',
    httpMethod: 'get',
    summary: 'Get Audiobook Chapters\n',
    description:
      "Get Spotify catalog information about an audiobook's chapters. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n",
    stainlessPath: '(resource) audiobooks > (method) list_chapters',
    qualified: 'client.audiobooks.listChapters',
    params: ['id: string;', 'limit?: number;', 'market?: string;', 'offset?: number;'],
    response:
      "{ id: string; audio_preview_url: string; chapter_number: number; description: string; duration_ms: number; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; type: 'episode'; uri: string; available_markets?: string[]; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }; }",
    markdown:
      "## list_chapters\n\n`client.audiobooks.listChapters(id: string, limit?: number, market?: string, offset?: number): { id: string; audio_preview_url: string; chapter_number: number; description: string; duration_ms: number; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; type: 'episode'; uri: string; available_markets?: string[]; published?: boolean; restrictions?: chapter_restriction_object; resume_point?: resume_point_object; }`\n\n**get** `/audiobooks/{id}/chapters`\n\nGet Spotify catalog information about an audiobook's chapters. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n\n\n### Parameters\n\n- `id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n\n\n- `limit?: number`\n  The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n- `offset?: number`\n  The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n\n\n### Returns\n\n- `{ id: string; audio_preview_url: string; chapter_number: number; description: string; duration_ms: number; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; type: 'episode'; uri: string; available_markets?: string[]; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }; }`\n\n  - `id: string`\n  - `audio_preview_url: string`\n  - `chapter_number: number`\n  - `description: string`\n  - `duration_ms: number`\n  - `explicit: boolean`\n  - `external_urls: { published?: boolean; spotify?: string; }`\n  - `href: string`\n  - `html_description: string`\n  - `images: { height: number; url: string; width: number; published?: boolean; }[]`\n  - `is_playable: boolean`\n  - `languages: string[]`\n  - `name: string`\n  - `release_date: string`\n  - `release_date_precision: 'year' | 'month' | 'day'`\n  - `type: 'episode'`\n  - `uri: string`\n  - `available_markets?: string[]`\n  - `published?: boolean`\n  - `restrictions?: { published?: boolean; reason?: string; }`\n  - `resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\n// Automatically fetches more pages as needed.\nfor await (const simplifiedChapterObject of client.audiobooks.listChapters('7iHfbu1YPACw6oZPAFJtqe')) {\n  console.log(simplifiedChapterObject);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/me',
    httpMethod: 'get',
    summary: "Get Current User's Profile\n",
    description:
      "Get detailed profile information about the current user (including the\ncurrent user's username).\n",
    stainlessPath: '(resource) me > (method) retrieve',
    qualified: 'client.me.retrieve',
    response:
      '{ id?: string; country?: string; display_name?: string; email?: string; explicit_content?: { filter_enabled?: boolean; filter_locked?: boolean; published?: boolean; }; external_urls?: { published?: boolean; spotify?: string; }; followers?: { href?: string; published?: boolean; total?: number; }; href?: string; images?: { height: number; url: string; width: number; published?: boolean; }[]; product?: string; published?: boolean; type?: string; uri?: string; }',
    markdown:
      "## retrieve\n\n`client.me.retrieve(): { id?: string; country?: string; display_name?: string; email?: string; explicit_content?: object; external_urls?: external_url_object; followers?: followers_object; href?: string; images?: image_object[]; product?: string; published?: boolean; type?: string; uri?: string; }`\n\n**get** `/me`\n\nGet detailed profile information about the current user (including the\ncurrent user's username).\n\n\n### Returns\n\n- `{ id?: string; country?: string; display_name?: string; email?: string; explicit_content?: { filter_enabled?: boolean; filter_locked?: boolean; published?: boolean; }; external_urls?: { published?: boolean; spotify?: string; }; followers?: { href?: string; published?: boolean; total?: number; }; href?: string; images?: { height: number; url: string; width: number; published?: boolean; }[]; product?: string; published?: boolean; type?: string; uri?: string; }`\n\n  - `id?: string`\n  - `country?: string`\n  - `display_name?: string`\n  - `email?: string`\n  - `explicit_content?: { filter_enabled?: boolean; filter_locked?: boolean; published?: boolean; }`\n  - `external_urls?: { published?: boolean; spotify?: string; }`\n  - `followers?: { href?: string; published?: boolean; total?: number; }`\n  - `href?: string`\n  - `images?: { height: number; url: string; width: number; published?: boolean; }[]`\n  - `product?: string`\n  - `published?: boolean`\n  - `type?: string`\n  - `uri?: string`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst me = await client.me.retrieve();\n\nconsole.log(me);\n```",
  },
  {
    name: 'list',
    endpoint: '/me/audiobooks',
    httpMethod: 'get',
    summary: "Get User's Saved Audiobooks\n",
    description: "Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.\n",
    stainlessPath: '(resource) me.audiobooks > (method) list',
    qualified: 'client.me.audiobooks.list',
    params: ['limit?: number;', 'offset?: number;'],
    response:
      "{ added_at?: string; audiobook?: { id: string; authors: author_object[]; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; languages: string[]; media_type: string; name: string; narrators: narrator_object[]; publisher: string; total_chapters: number; type: 'audiobook'; uri: string; edition?: string; published?: boolean; }; published?: boolean; }",
    markdown:
      "## list\n\n`client.me.audiobooks.list(limit?: number, offset?: number): { added_at?: string; audiobook?: audiobook_base; published?: boolean; }`\n\n**get** `/me/audiobooks`\n\nGet a list of the audiobooks saved in the current Spotify user's 'Your Music' library.\n\n\n### Parameters\n\n- `limit?: number`\n  The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n\n\n- `offset?: number`\n  The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n\n\n### Returns\n\n- `{ added_at?: string; audiobook?: { id: string; authors: author_object[]; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; languages: string[]; media_type: string; name: string; narrators: narrator_object[]; publisher: string; total_chapters: number; type: 'audiobook'; uri: string; edition?: string; published?: boolean; }; published?: boolean; }`\n\n  - `added_at?: string`\n  - `audiobook?: { id: string; authors: { name?: string; published?: boolean; }[]; available_markets: string[]; copyrights: { published?: boolean; text?: string; type?: string; }[]; description: string; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; languages: string[]; media_type: string; name: string; narrators: { name?: string; published?: boolean; }[]; publisher: string; total_chapters: number; type: 'audiobook'; uri: string; edition?: string; published?: boolean; }`\n  - `published?: boolean`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\n// Automatically fetches more pages as needed.\nfor await (const audiobookListResponse of client.me.audiobooks.list()) {\n  console.log(audiobookListResponse);\n}\n```",
  },
  {
    name: 'check',
    endpoint: '/me/audiobooks/contains',
    httpMethod: 'get',
    summary: "Check User's Saved Audiobooks\n",
    description:
      "Check if one or more audiobooks are already saved in the current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
    stainlessPath: '(resource) me.audiobooks > (method) check',
    qualified: 'client.me.audiobooks.check',
    params: ['ids: string;'],
    response: 'boolean[]',
    markdown:
      "## check\n\n`client.me.audiobooks.check(ids: string): boolean[]`\n\n**get** `/me/audiobooks/contains`\n\nCheck if one or more audiobooks are already saved in the current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n\n\n### Parameters\n\n- `ids: string`\n  A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n\n\n### Returns\n\n- `boolean[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.me.audiobooks.check({ ids: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'remove',
    endpoint: '/me/audiobooks',
    httpMethod: 'delete',
    summary: "Remove User's Saved Audiobooks\n",
    description:
      "Remove one or more audiobooks from the Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
    stainlessPath: '(resource) me.audiobooks > (method) remove',
    qualified: 'client.me.audiobooks.remove',
    params: ['ids: string;'],
    markdown:
      "## remove\n\n`client.me.audiobooks.remove(ids: string): void`\n\n**delete** `/me/audiobooks`\n\nRemove one or more audiobooks from the Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n\n\n### Parameters\n\n- `ids: string`\n  A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.audiobooks.remove({ ids: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe' })\n```",
  },
  {
    name: 'save',
    endpoint: '/me/audiobooks',
    httpMethod: 'put',
    summary: 'Save Audiobooks for Current User\n',
    description:
      "Save one or more audiobooks to the current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
    stainlessPath: '(resource) me.audiobooks > (method) save',
    qualified: 'client.me.audiobooks.save',
    params: ['ids: string;'],
    markdown:
      "## save\n\n`client.me.audiobooks.save(ids: string): void`\n\n**put** `/me/audiobooks`\n\nSave one or more audiobooks to the current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n\n\n### Parameters\n\n- `ids: string`\n  A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.audiobooks.save({ ids: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe' })\n```",
  },
  {
    name: 'list',
    endpoint: '/me/playlists',
    httpMethod: 'get',
    summary: "Get Current User's Playlists\n",
    description: 'Get a list of the playlists owned or followed by the current Spotify\nuser.\n',
    stainlessPath: '(resource) me.playlists > (method) list',
    qualified: 'client.me.playlists.list',
    params: ['limit?: number;', 'offset?: number;'],
    response:
      "{ id?: string; collaborative?: boolean; description?: string; external_urls?: { published?: boolean; spotify?: string; }; href?: string; images?: { height: number; url: string; width: number; published?: boolean; }[]; items?: { href?: string; published?: boolean; total?: number; }; name?: string; owner?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: 'user'; uri?: string; }; published?: boolean; snapshot_id?: string; tracks?: { href?: string; published?: boolean; total?: number; }; type?: string; uri?: string; }",
    markdown:
      "## list\n\n`client.me.playlists.list(limit?: number, offset?: number): { id?: string; collaborative?: boolean; description?: string; external_urls?: external_url_object; href?: string; images?: image_object[]; items?: playlist_tracks_ref_object; name?: string; owner?: playlist_user_object; published?: boolean; snapshot_id?: string; tracks?: playlist_tracks_ref_object; type?: string; uri?: string; }`\n\n**get** `/me/playlists`\n\nGet a list of the playlists owned or followed by the current Spotify\nuser.\n\n\n### Parameters\n\n- `limit?: number`\n  The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n\n\n- `offset?: number`\n  'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.'\n\n\n### Returns\n\n- `{ id?: string; collaborative?: boolean; description?: string; external_urls?: { published?: boolean; spotify?: string; }; href?: string; images?: { height: number; url: string; width: number; published?: boolean; }[]; items?: { href?: string; published?: boolean; total?: number; }; name?: string; owner?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: 'user'; uri?: string; }; published?: boolean; snapshot_id?: string; tracks?: { href?: string; published?: boolean; total?: number; }; type?: string; uri?: string; }`\n\n  - `id?: string`\n  - `collaborative?: boolean`\n  - `description?: string`\n  - `external_urls?: { published?: boolean; spotify?: string; }`\n  - `href?: string`\n  - `images?: { height: number; url: string; width: number; published?: boolean; }[]`\n  - `items?: { href?: string; published?: boolean; total?: number; }`\n  - `name?: string`\n  - `owner?: { id?: string; external_urls?: { published?: boolean; spotify?: string; }; href?: string; published?: boolean; type?: 'user'; uri?: string; }`\n  - `published?: boolean`\n  - `snapshot_id?: string`\n  - `tracks?: { href?: string; published?: boolean; total?: number; }`\n  - `type?: string`\n  - `uri?: string`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\n// Automatically fetches more pages as needed.\nfor await (const simplifiedPlaylistObject of client.me.playlists.list()) {\n  console.log(simplifiedPlaylistObject);\n}\n```",
  },
  {
    name: 'list_top_artists',
    endpoint: '/me/top/artists',
    httpMethod: 'get',
    summary: "Get User's Top Artists\n",
    description: "Get the current user's top artists based on calculated affinity.\n",
    stainlessPath: '(resource) me.top > (method) list_top_artists',
    qualified: 'client.me.top.listTopArtists',
    params: ['limit?: number;', 'offset?: number;', 'time_range?: string;'],
    response:
      "{ id?: string; external_urls?: { published?: boolean; spotify?: string; }; followers?: { href?: string; published?: boolean; total?: number; }; genres?: string[]; href?: string; images?: { height: number; url: string; width: number; published?: boolean; }[]; name?: string; popularity?: number; published?: boolean; type?: 'artist'; uri?: string; }",
    markdown:
      "## list_top_artists\n\n`client.me.top.listTopArtists(limit?: number, offset?: number, time_range?: string): { id?: string; external_urls?: external_url_object; followers?: followers_object; genres?: string[]; href?: string; images?: image_object[]; name?: string; popularity?: number; published?: boolean; type?: 'artist'; uri?: string; }`\n\n**get** `/me/top/artists`\n\nGet the current user's top artists based on calculated affinity.\n\n\n### Parameters\n\n- `limit?: number`\n  The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n\n\n- `offset?: number`\n  The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n\n\n- `time_range?: string`\n  Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n\n\n### Returns\n\n- `{ id?: string; external_urls?: { published?: boolean; spotify?: string; }; followers?: { href?: string; published?: boolean; total?: number; }; genres?: string[]; href?: string; images?: { height: number; url: string; width: number; published?: boolean; }[]; name?: string; popularity?: number; published?: boolean; type?: 'artist'; uri?: string; }`\n\n  - `id?: string`\n  - `external_urls?: { published?: boolean; spotify?: string; }`\n  - `followers?: { href?: string; published?: boolean; total?: number; }`\n  - `genres?: string[]`\n  - `href?: string`\n  - `images?: { height: number; url: string; width: number; published?: boolean; }[]`\n  - `name?: string`\n  - `popularity?: number`\n  - `published?: boolean`\n  - `type?: 'artist'`\n  - `uri?: string`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\n// Automatically fetches more pages as needed.\nfor await (const artistObject of client.me.top.listTopArtists()) {\n  console.log(artistObject);\n}\n```",
  },
  {
    name: 'list_top_tracks',
    endpoint: '/me/top/tracks',
    httpMethod: 'get',
    summary: "Get User's Top Tracks\n",
    description: "Get the current user's top tracks based on calculated affinity.\n",
    stainlessPath: '(resource) me.top > (method) list_top_tracks',
    qualified: 'client.me.top.listTopTracks',
    params: ['limit?: number;', 'offset?: number;', 'time_range?: string;'],
    response:
      "{ id?: string; album?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: object[]; available_markets: string[]; external_urls: object; href: string; images: object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: object; }; artists?: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }; external_urls?: { published?: boolean; spotify?: string; }; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; track_number?: number; type?: 'track'; uri?: string; }",
    markdown:
      "## list_top_tracks\n\n`client.me.top.listTopTracks(limit?: number, offset?: number, time_range?: string): { id?: string; album?: object; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: external_id_object; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: 'track'; uri?: string; }`\n\n**get** `/me/top/tracks`\n\nGet the current user's top tracks based on calculated affinity.\n\n\n### Parameters\n\n- `limit?: number`\n  The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n\n\n- `offset?: number`\n  The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n\n\n- `time_range?: string`\n  Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n\n\n### Returns\n\n- `{ id?: string; album?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: object[]; available_markets: string[]; external_urls: object; href: string; images: object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: object; }; artists?: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }; external_urls?: { published?: boolean; spotify?: string; }; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; track_number?: number; type?: 'track'; uri?: string; }`\n\n  - `id?: string`\n  - `album?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: { id?: string; external_urls?: object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets: string[]; external_urls: { published?: boolean; spotify?: string; }; href: string; images: { height: number; url: string; width: number; published?: boolean; }[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: { published?: boolean; reason?: 'market' | 'product' | 'explicit'; }; }`\n  - `artists?: { id?: string; external_urls?: { published?: boolean; spotify?: string; }; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]`\n  - `available_markets?: string[]`\n  - `disc_number?: number`\n  - `duration_ms?: number`\n  - `explicit?: boolean`\n  - `external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }`\n  - `external_urls?: { published?: boolean; spotify?: string; }`\n  - `href?: string`\n  - `is_local?: boolean`\n  - `is_playable?: boolean`\n  - `linked_from?: { id?: string; external_urls?: { published?: boolean; spotify?: string; }; href?: string; published?: boolean; type?: string; uri?: string; }`\n  - `name?: string`\n  - `popularity?: number`\n  - `preview_url?: string`\n  - `published?: boolean`\n  - `restrictions?: { published?: boolean; reason?: string; }`\n  - `track_number?: number`\n  - `type?: 'track'`\n  - `uri?: string`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\n// Automatically fetches more pages as needed.\nfor await (const trackObject of client.me.top.listTopTracks()) {\n  console.log(trackObject);\n}\n```",
  },
  {
    name: 'list',
    endpoint: '/me/albums',
    httpMethod: 'get',
    summary: "Get User's Saved Albums\n",
    description: "Get a list of the albums saved in the current Spotify user's 'Your Music' library.\n",
    stainlessPath: '(resource) me.albums > (method) list',
    qualified: 'client.me.albums.list',
    params: ['limit?: number;', 'market?: string;', 'offset?: number;'],
    response:
      "{ added_at?: string; album?: { id: string; album_type: 'album' | 'single' | 'compilation'; available_markets: string[]; external_urls: object; href: string; images: object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; artists?: object[]; copyrights?: object[]; external_ids?: object; genres?: string[]; label?: string; popularity?: number; published?: boolean; restrictions?: object; tracks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: simplified_track_object[]; published?: boolean; }; }; published?: boolean; }",
    markdown:
      "## list\n\n`client.me.albums.list(limit?: number, market?: string, offset?: number): { added_at?: string; album?: object; published?: boolean; }`\n\n**get** `/me/albums`\n\nGet a list of the albums saved in the current Spotify user's 'Your Music' library.\n\n\n### Parameters\n\n- `limit?: number`\n  The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n- `offset?: number`\n  The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n\n\n### Returns\n\n- `{ added_at?: string; album?: { id: string; album_type: 'album' | 'single' | 'compilation'; available_markets: string[]; external_urls: object; href: string; images: object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; artists?: object[]; copyrights?: object[]; external_ids?: object; genres?: string[]; label?: string; popularity?: number; published?: boolean; restrictions?: object; tracks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: simplified_track_object[]; published?: boolean; }; }; published?: boolean; }`\n\n  - `added_at?: string`\n  - `album?: { id: string; album_type: 'album' | 'single' | 'compilation'; available_markets: string[]; external_urls: { published?: boolean; spotify?: string; }; href: string; images: { height: number; url: string; width: number; published?: boolean; }[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; artists?: { id?: string; external_urls?: object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; copyrights?: { published?: boolean; text?: string; type?: string; }[]; external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }; genres?: string[]; label?: string; popularity?: number; published?: boolean; restrictions?: { published?: boolean; reason?: 'market' | 'product' | 'explicit'; }; tracks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { id?: string; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: string; uri?: string; }[]; published?: boolean; }; }`\n  - `published?: boolean`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\n// Automatically fetches more pages as needed.\nfor await (const albumListResponse of client.me.albums.list()) {\n  console.log(albumListResponse);\n}\n```",
  },
  {
    name: 'check',
    endpoint: '/me/albums/contains',
    httpMethod: 'get',
    summary: "Check User's Saved Albums\n",
    description:
      "Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
    stainlessPath: '(resource) me.albums > (method) check',
    qualified: 'client.me.albums.check',
    params: ['ids: string;'],
    response: 'boolean[]',
    markdown:
      "## check\n\n`client.me.albums.check(ids: string): boolean[]`\n\n**get** `/me/albums/contains`\n\nCheck if one or more albums is already saved in the current Spotify user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n\n\n### Parameters\n\n- `ids: string`\n  A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n\n\n### Returns\n\n- `boolean[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.me.albums.check({ ids: '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'remove',
    endpoint: '/me/albums',
    httpMethod: 'delete',
    summary: "Remove Users' Saved Albums\n",
    description:
      "Remove one or more albums from the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
    stainlessPath: '(resource) me.albums > (method) remove',
    qualified: 'client.me.albums.remove',
    params: ['ids?: string[];', 'published?: boolean;'],
    markdown:
      "## remove\n\n`client.me.albums.remove(ids?: string[], published?: boolean): void`\n\n**delete** `/me/albums`\n\nRemove one or more albums from the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n\n\n### Parameters\n\n- `ids?: string[]`\n  A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `[\"4iV5W9uYEdYUVa79Axb7Rh\", \"1301WleyT98MSxVHPZCA6M\"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n\n\n- `published?: boolean`\n  The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.albums.remove()\n```",
  },
  {
    name: 'save',
    endpoint: '/me/albums',
    httpMethod: 'put',
    summary: 'Save Albums for Current User\n',
    description:
      "Save one or more albums to the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
    stainlessPath: '(resource) me.albums > (method) save',
    qualified: 'client.me.albums.save',
    params: ['ids?: string[];', 'published?: boolean;'],
    markdown:
      "## save\n\n`client.me.albums.save(ids?: string[], published?: boolean): void`\n\n**put** `/me/albums`\n\nSave one or more albums to the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n\n\n### Parameters\n\n- `ids?: string[]`\n  A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `[\"4iV5W9uYEdYUVa79Axb7Rh\", \"1301WleyT98MSxVHPZCA6M\"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n\n\n- `published?: boolean`\n  The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.albums.save()\n```",
  },
  {
    name: 'list',
    endpoint: '/me/tracks',
    httpMethod: 'get',
    summary: "Get User's Saved Tracks\n",
    description: "Get a list of the songs saved in the current Spotify user's 'Your Music' library.\n",
    stainlessPath: '(resource) me.tracks > (method) list',
    qualified: 'client.me.tracks.list',
    params: ['limit?: number;', 'market?: string;', 'offset?: number;'],
    response:
      "{ added_at?: string; published?: boolean; track?: { id?: string; album?: object; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: external_id_object; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: 'track'; uri?: string; }; }",
    markdown:
      "## list\n\n`client.me.tracks.list(limit?: number, market?: string, offset?: number): { added_at?: string; published?: boolean; track?: track_object; }`\n\n**get** `/me/tracks`\n\nGet a list of the songs saved in the current Spotify user's 'Your Music' library.\n\n\n### Parameters\n\n- `limit?: number`\n  The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n- `offset?: number`\n  The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n\n\n### Returns\n\n- `{ added_at?: string; published?: boolean; track?: { id?: string; album?: object; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: external_id_object; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: 'track'; uri?: string; }; }`\n\n  - `added_at?: string`\n  - `published?: boolean`\n  - `track?: { id?: string; album?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: object[]; available_markets: string[]; external_urls: object; href: string; images: object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: object; }; artists?: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }; external_urls?: { published?: boolean; spotify?: string; }; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; track_number?: number; type?: 'track'; uri?: string; }`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\n// Automatically fetches more pages as needed.\nfor await (const trackListResponse of client.me.tracks.list()) {\n  console.log(trackListResponse);\n}\n```",
  },
  {
    name: 'check',
    endpoint: '/me/tracks/contains',
    httpMethod: 'get',
    summary: "Check User's Saved Tracks\n",
    description:
      "Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
    stainlessPath: '(resource) me.tracks > (method) check',
    qualified: 'client.me.tracks.check',
    params: ['ids: string;'],
    response: 'boolean[]',
    markdown:
      "## check\n\n`client.me.tracks.check(ids: string): boolean[]`\n\n**get** `/me/tracks/contains`\n\nCheck if one or more tracks is already saved in the current Spotify user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n\n\n### Parameters\n\n- `ids: string`\n  A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n\n\n### Returns\n\n- `boolean[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.me.tracks.check({ ids: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'remove',
    endpoint: '/me/tracks',
    httpMethod: 'delete',
    summary: "Remove User's Saved Tracks\n",
    description:
      "Remove one or more tracks from the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
    stainlessPath: '(resource) me.tracks > (method) remove',
    qualified: 'client.me.tracks.remove',
    params: ['ids?: string[];', 'published?: boolean;'],
    markdown:
      "## remove\n\n`client.me.tracks.remove(ids?: string[], published?: boolean): void`\n\n**delete** `/me/tracks`\n\nRemove one or more tracks from the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n\n\n### Parameters\n\n- `ids?: string[]`\n  A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `[\"4iV5W9uYEdYUVa79Axb7Rh\", \"1301WleyT98MSxVHPZCA6M\"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n\n\n- `published?: boolean`\n  The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.tracks.remove()\n```",
  },
  {
    name: 'save',
    endpoint: '/me/tracks',
    httpMethod: 'put',
    summary: 'Save Tracks for Current User\n',
    description:
      "Save one or more tracks to the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
    stainlessPath: '(resource) me.tracks > (method) save',
    qualified: 'client.me.tracks.save',
    params: [
      'ids: string[];',
      'published?: boolean;',
      'timestamped_ids?: { id: string; added_at: string; }[];',
    ],
    markdown:
      "## save\n\n`client.me.tracks.save(ids: string[], published?: boolean, timestamped_ids?: { id: string; added_at: string; }[]): void`\n\n**put** `/me/tracks`\n\nSave one or more tracks to the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n\n\n### Parameters\n\n- `ids: string[]`\n  A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `[\"4iV5W9uYEdYUVa79Axb7Rh\", \"1301WleyT98MSxVHPZCA6M\"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `timestamped_ids` is present in the body, any IDs listed in the query parameters (deprecated) or the `ids` field in the body will be ignored._\n\n\n- `published?: boolean`\n  The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n\n\n- `timestamped_ids?: { id: string; added_at: string; }[]`\n  A JSON array of objects containing track IDs with their corresponding timestamps. Each object must include a track ID and an `added_at` timestamp. This allows you to specify when tracks were added to maintain a specific chronological order in the user's library.<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `timestamped_ids` is present in the body, any IDs listed in the query parameters (deprecated) or the `ids` field in the body will be ignored._\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.tracks.save({ ids: ['string'] })\n```",
  },
  {
    name: 'list',
    endpoint: '/me/episodes',
    httpMethod: 'get',
    summary: "Get User's Saved Episodes\n",
    description: "Get a list of the episodes saved in the current Spotify user's library.\n",
    stainlessPath: '(resource) me.episodes > (method) list',
    qualified: 'client.me.episodes.list',
    params: ['limit?: number;', 'market?: string;', 'offset?: number;'],
    response:
      "{ added_at?: string; episode?: { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: show_base; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: episode_restriction_object; resume_point?: resume_point_object; }; published?: boolean; }",
    markdown:
      "## list\n\n`client.me.episodes.list(limit?: number, market?: string, offset?: number): { added_at?: string; episode?: episode_object; published?: boolean; }`\n\n**get** `/me/episodes`\n\nGet a list of the episodes saved in the current Spotify user's library.\n\n\n### Parameters\n\n- `limit?: number`\n  The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n- `offset?: number`\n  The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n\n\n### Returns\n\n- `{ added_at?: string; episode?: { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: show_base; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: episode_restriction_object; resume_point?: resume_point_object; }; published?: boolean; }`\n\n  - `added_at?: string`\n  - `episode?: { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: { id: string; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }; }`\n  - `published?: boolean`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\n// Automatically fetches more pages as needed.\nfor await (const episodeListResponse of client.me.episodes.list()) {\n  console.log(episodeListResponse);\n}\n```",
  },
  {
    name: 'check',
    endpoint: '/me/episodes/contains',
    httpMethod: 'get',
    summary: "Check User's Saved Episodes\n",
    description:
      "Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
    stainlessPath: '(resource) me.episodes > (method) check',
    qualified: 'client.me.episodes.check',
    params: ['ids: string;'],
    response: 'boolean[]',
    markdown:
      "## check\n\n`client.me.episodes.check(ids: string): boolean[]`\n\n**get** `/me/episodes/contains`\n\nCheck if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n\n\n### Parameters\n\n- `ids: string`\n  A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n\n\n### Returns\n\n- `boolean[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.me.episodes.check({ ids: '77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'remove',
    endpoint: '/me/episodes',
    httpMethod: 'delete',
    summary: "Remove User's Saved Episodes\n",
    description:
      "Remove one or more episodes from the current user's library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
    stainlessPath: '(resource) me.episodes > (method) remove',
    qualified: 'client.me.episodes.remove',
    params: ['ids?: string[];', 'published?: boolean;'],
    markdown:
      "## remove\n\n`client.me.episodes.remove(ids?: string[], published?: boolean): void`\n\n**delete** `/me/episodes`\n\nRemove one or more episodes from the current user's library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n\n\n### Parameters\n\n- `ids?: string[]`\n  A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n\n\n- `published?: boolean`\n  The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.episodes.remove()\n```",
  },
  {
    name: 'save',
    endpoint: '/me/episodes',
    httpMethod: 'put',
    summary: 'Save Episodes for Current User\n',
    description:
      "Save one or more episodes to the current user's library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
    stainlessPath: '(resource) me.episodes > (method) save',
    qualified: 'client.me.episodes.save',
    params: ['ids: string[];', 'published?: boolean;'],
    markdown:
      "## save\n\n`client.me.episodes.save(ids: string[], published?: boolean): void`\n\n**put** `/me/episodes`\n\nSave one or more episodes to the current user's library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n\n\n### Parameters\n\n- `ids: string[]`\n  A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n\n\n- `published?: boolean`\n  The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.episodes.save({ ids: ['string'] })\n```",
  },
  {
    name: 'list',
    endpoint: '/me/shows',
    httpMethod: 'get',
    summary: "Get User's Saved Shows\n",
    description:
      "Get a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.\n",
    stainlessPath: '(resource) me.shows > (method) list',
    qualified: 'client.me.shows.list',
    params: ['limit?: number;', 'offset?: number;'],
    response:
      "{ added_at?: string; published?: boolean; show?: { id: string; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }; }",
    markdown:
      "## list\n\n`client.me.shows.list(limit?: number, offset?: number): { added_at?: string; published?: boolean; show?: show_base; }`\n\n**get** `/me/shows`\n\nGet a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.\n\n\n### Parameters\n\n- `limit?: number`\n  The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n\n\n- `offset?: number`\n  The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n\n\n### Returns\n\n- `{ added_at?: string; published?: boolean; show?: { id: string; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }; }`\n\n  - `added_at?: string`\n  - `published?: boolean`\n  - `show?: { id: string; available_markets: string[]; copyrights: { published?: boolean; text?: string; type?: string; }[]; description: string; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\n// Automatically fetches more pages as needed.\nfor await (const showListResponse of client.me.shows.list()) {\n  console.log(showListResponse);\n}\n```",
  },
  {
    name: 'check',
    endpoint: '/me/shows/contains',
    httpMethod: 'get',
    summary: "Check User's Saved Shows\n",
    description:
      "Check if one or more shows is already saved in the current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
    stainlessPath: '(resource) me.shows > (method) check',
    qualified: 'client.me.shows.check',
    params: ['ids: string;'],
    response: 'boolean[]',
    markdown:
      "## check\n\n`client.me.shows.check(ids: string): boolean[]`\n\n**get** `/me/shows/contains`\n\nCheck if one or more shows is already saved in the current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n\n\n### Parameters\n\n- `ids: string`\n  A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n\n\n### Returns\n\n- `boolean[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.me.shows.check({ ids: '5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'remove',
    endpoint: '/me/shows',
    httpMethod: 'delete',
    summary: "Remove User's Saved Shows\n",
    description:
      "Delete one or more shows from current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
    stainlessPath: '(resource) me.shows > (method) remove',
    qualified: 'client.me.shows.remove',
    params: ['ids?: string[];', 'published?: boolean;'],
    markdown:
      "## remove\n\n`client.me.shows.remove(ids?: string[], published?: boolean): void`\n\n**delete** `/me/shows`\n\nDelete one or more shows from current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n\n\n### Parameters\n\n- `ids?: string[]`\n  A JSON array of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).  \nA maximum of 50 items can be specified in one request. *Note: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored.*\n\n- `published?: boolean`\n  The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.shows.remove()\n```",
  },
  {
    name: 'save',
    endpoint: '/me/shows',
    httpMethod: 'put',
    summary: 'Save Shows for Current User\n',
    description:
      "Save one or more shows to current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
    stainlessPath: '(resource) me.shows > (method) save',
    qualified: 'client.me.shows.save',
    params: ['ids?: string[];', 'published?: boolean;'],
    markdown:
      "## save\n\n`client.me.shows.save(ids?: string[], published?: boolean): void`\n\n**put** `/me/shows`\n\nSave one or more shows to current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n\n\n### Parameters\n\n- `ids?: string[]`\n  A JSON array of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).  \nA maximum of 50 items can be specified in one request. *Note: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored.*\n\n- `published?: boolean`\n  The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.shows.save()\n```",
  },
  {
    name: 'bulk_retrieve',
    endpoint: '/me/following',
    httpMethod: 'get',
    summary: 'Get Followed Artists\n',
    description: "Get the current user's followed artists.\n",
    stainlessPath: '(resource) me.following > (method) bulk_retrieve',
    qualified: 'client.me.following.bulkRetrieve',
    params: ["type: 'artist';", 'after?: string;', 'limit?: number;'],
    response:
      '{ artists: { cursors?: { after?: string; before?: string; published?: boolean; }; href?: string; items?: object[]; limit?: number; next?: string; published?: boolean; total?: number; }; }',
    markdown:
      "## bulk_retrieve\n\n`client.me.following.bulkRetrieve(type: 'artist', after?: string, limit?: number): { artists: object; }`\n\n**get** `/me/following`\n\nGet the current user's followed artists.\n\n\n### Parameters\n\n- `type: 'artist'`\n  The ID type: currently only `artist` is supported.\n\n- `after?: string`\n  The last artist ID retrieved from the previous request.\n\n\n- `limit?: number`\n  The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n\n\n### Returns\n\n- `{ artists: { cursors?: { after?: string; before?: string; published?: boolean; }; href?: string; items?: object[]; limit?: number; next?: string; published?: boolean; total?: number; }; }`\n\n  - `artists: { cursors?: { after?: string; before?: string; published?: boolean; }; href?: string; items?: { id?: string; external_urls?: object; followers?: object; genres?: string[]; href?: string; images?: object[]; name?: string; popularity?: number; published?: boolean; type?: 'artist'; uri?: string; }[]; limit?: number; next?: string; published?: boolean; total?: number; }`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.me.following.bulkRetrieve({ type: 'artist' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'check',
    endpoint: '/me/following/contains',
    httpMethod: 'get',
    summary: 'Check If User Follows Artists or Users\n',
    description:
      "Check to see if the current user is following one or more artists or other Spotify users.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
    stainlessPath: '(resource) me.following > (method) check',
    qualified: 'client.me.following.check',
    params: ['ids: string;', "type: 'artist' | 'user';"],
    response: 'boolean[]',
    markdown:
      "## check\n\n`client.me.following.check(ids: string, type: 'artist' | 'user'): boolean[]`\n\n**get** `/me/following/contains`\n\nCheck to see if the current user is following one or more artists or other Spotify users.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n\n\n### Parameters\n\n- `ids: string`\n  A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) to check. For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n\n\n- `type: 'artist' | 'user'`\n  The ID type: either `artist` or `user`.\n\n### Returns\n\n- `boolean[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.me.following.check({ ids: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6', type: 'artist' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'follow',
    endpoint: '/me/following',
    httpMethod: 'put',
    summary: 'Follow Artists or Users\n',
    description:
      'Add the current user as a follower of one or more artists or other Spotify users.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n',
    stainlessPath: '(resource) me.following > (method) follow',
    qualified: 'client.me.following.follow',
    params: ['ids: string[];', 'published?: boolean;'],
    markdown:
      "## follow\n\n`client.me.following.follow(ids: string[], published?: boolean): void`\n\n**put** `/me/following`\n\nAdd the current user as a follower of one or more artists or other Spotify users.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n\n\n### Parameters\n\n- `ids: string[]`\n  A JSON array of the artist or user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nFor example: `{ids:[\"74ASZWbe4lXaubB36ztrGX\", \"08td7MxkoHQkXnWAYD8d6Q\"]}`. A maximum of 50 IDs can be sent in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n\n\n- `published?: boolean`\n  The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.following.follow({ ids: ['string'] })\n```",
  },
  {
    name: 'unfollow',
    endpoint: '/me/following',
    httpMethod: 'delete',
    summary: 'Unfollow Artists or Users\n',
    description:
      'Remove the current user as a follower of one or more artists or other Spotify users.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n',
    stainlessPath: '(resource) me.following > (method) unfollow',
    qualified: 'client.me.following.unfollow',
    params: ['ids?: string[];', 'published?: boolean;'],
    markdown:
      '## unfollow\n\n`client.me.following.unfollow(ids?: string[], published?: boolean): void`\n\n**delete** `/me/following`\n\nRemove the current user as a follower of one or more artists or other Spotify users.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n\n\n### Parameters\n\n- `ids?: string[]`\n  A JSON array of the artist or user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50 IDs can be sent in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n\n\n- `published?: boolean`\n  The playlist\'s public/private status (if it should be added to the user\'s profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n\n\n### Example\n\n```typescript\nimport Spotted from \'spotted-ts\';\n\nconst client = new Spotted();\n\nawait client.me.following.unfollow()\n```',
  },
  {
    name: 'get_currently_playing',
    endpoint: '/me/player/currently-playing',
    httpMethod: 'get',
    summary: 'Get Currently Playing Track\n',
    description: "Get the object currently being played on the user's Spotify account.\n",
    stainlessPath: '(resource) me.player > (method) get_currently_playing',
    qualified: 'client.me.player.getCurrentlyPlaying',
    params: ['additional_types?: string;', 'market?: string;'],
    response:
      '{ actions?: { interrupting_playback?: boolean; pausing?: boolean; published?: boolean; resuming?: boolean; seeking?: boolean; skipping_next?: boolean; skipping_prev?: boolean; toggling_repeat_context?: boolean; toggling_repeat_track?: boolean; toggling_shuffle?: boolean; transferring_playback?: boolean; }; context?: object; currently_playing_type?: string; is_playing?: boolean; item?: object | object; progress_ms?: number; published?: boolean; timestamp?: number; }',
    markdown:
      "## get_currently_playing\n\n`client.me.player.getCurrentlyPlaying(additional_types?: string, market?: string): { actions?: object; context?: context_object; currently_playing_type?: string; is_playing?: boolean; item?: track_object | episode_object; progress_ms?: number; published?: boolean; timestamp?: number; }`\n\n**get** `/me/player/currently-playing`\n\nGet the object currently being played on the user's Spotify account.\n\n\n### Parameters\n\n- `additional_types?: string`\n  A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n### Returns\n\n- `{ actions?: { interrupting_playback?: boolean; pausing?: boolean; published?: boolean; resuming?: boolean; seeking?: boolean; skipping_next?: boolean; skipping_prev?: boolean; toggling_repeat_context?: boolean; toggling_repeat_track?: boolean; toggling_shuffle?: boolean; transferring_playback?: boolean; }; context?: { external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; currently_playing_type?: string; is_playing?: boolean; item?: { id?: string; album?: object; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: external_id_object; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: 'track'; uri?: string; } | { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: show_base; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: episode_restriction_object; resume_point?: resume_point_object; }; progress_ms?: number; published?: boolean; timestamp?: number; }`\n\n  - `actions?: { interrupting_playback?: boolean; pausing?: boolean; published?: boolean; resuming?: boolean; seeking?: boolean; skipping_next?: boolean; skipping_prev?: boolean; toggling_repeat_context?: boolean; toggling_repeat_track?: boolean; toggling_shuffle?: boolean; transferring_playback?: boolean; }`\n  - `context?: { external_urls?: { published?: boolean; spotify?: string; }; href?: string; published?: boolean; type?: string; uri?: string; }`\n  - `currently_playing_type?: string`\n  - `is_playing?: boolean`\n  - `item?: { id?: string; album?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: object[]; available_markets: string[]; external_urls: object; href: string; images: object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: object; }; artists?: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }; external_urls?: { published?: boolean; spotify?: string; }; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; track_number?: number; type?: 'track'; uri?: string; } | { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: { id: string; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }; }`\n  - `progress_ms?: number`\n  - `published?: boolean`\n  - `timestamp?: number`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.me.player.getCurrentlyPlaying();\n\nconsole.log(response);\n```",
  },
  {
    name: 'get_devices',
    endpoint: '/me/player/devices',
    httpMethod: 'get',
    summary: 'Get Available Devices\n',
    description:
      'Get information about a user’s available Spotify Connect devices. Some device models are not supported and will not be listed in the API response.\n',
    stainlessPath: '(resource) me.player > (method) get_devices',
    qualified: 'client.me.player.getDevices',
    response:
      '{ devices: { id?: string; is_active?: boolean; is_private_session?: boolean; is_restricted?: boolean; name?: string; published?: boolean; supports_volume?: boolean; type?: string; volume_percent?: number; }[]; }',
    markdown:
      "## get_devices\n\n`client.me.player.getDevices(): { devices: device_object[]; }`\n\n**get** `/me/player/devices`\n\nGet information about a user’s available Spotify Connect devices. Some device models are not supported and will not be listed in the API response.\n\n\n### Returns\n\n- `{ devices: { id?: string; is_active?: boolean; is_private_session?: boolean; is_restricted?: boolean; name?: string; published?: boolean; supports_volume?: boolean; type?: string; volume_percent?: number; }[]; }`\n\n  - `devices: { id?: string; is_active?: boolean; is_private_session?: boolean; is_restricted?: boolean; name?: string; published?: boolean; supports_volume?: boolean; type?: string; volume_percent?: number; }[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.me.player.getDevices();\n\nconsole.log(response);\n```",
  },
  {
    name: 'get_state',
    endpoint: '/me/player',
    httpMethod: 'get',
    summary: 'Get Playback State\n',
    description:
      'Get information about the user’s current playback state, including track or episode, progress, and active device.\n',
    stainlessPath: '(resource) me.player > (method) get_state',
    qualified: 'client.me.player.getState',
    params: ['additional_types?: string;', 'market?: string;'],
    response:
      '{ actions?: { interrupting_playback?: boolean; pausing?: boolean; published?: boolean; resuming?: boolean; seeking?: boolean; skipping_next?: boolean; skipping_prev?: boolean; toggling_repeat_context?: boolean; toggling_repeat_track?: boolean; toggling_shuffle?: boolean; transferring_playback?: boolean; }; context?: object; currently_playing_type?: string; device?: object; is_playing?: boolean; item?: object | object; progress_ms?: number; published?: boolean; repeat_state?: string; shuffle_state?: boolean; timestamp?: number; }',
    markdown:
      "## get_state\n\n`client.me.player.getState(additional_types?: string, market?: string): { actions?: object; context?: context_object; currently_playing_type?: string; device?: device_object; is_playing?: boolean; item?: track_object | episode_object; progress_ms?: number; published?: boolean; repeat_state?: string; shuffle_state?: boolean; timestamp?: number; }`\n\n**get** `/me/player`\n\nGet information about the user’s current playback state, including track or episode, progress, and active device.\n\n\n### Parameters\n\n- `additional_types?: string`\n  A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n### Returns\n\n- `{ actions?: { interrupting_playback?: boolean; pausing?: boolean; published?: boolean; resuming?: boolean; seeking?: boolean; skipping_next?: boolean; skipping_prev?: boolean; toggling_repeat_context?: boolean; toggling_repeat_track?: boolean; toggling_shuffle?: boolean; transferring_playback?: boolean; }; context?: { external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; currently_playing_type?: string; device?: { id?: string; is_active?: boolean; is_private_session?: boolean; is_restricted?: boolean; name?: string; published?: boolean; supports_volume?: boolean; type?: string; volume_percent?: number; }; is_playing?: boolean; item?: { id?: string; album?: object; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: external_id_object; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: 'track'; uri?: string; } | { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: show_base; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: episode_restriction_object; resume_point?: resume_point_object; }; progress_ms?: number; published?: boolean; repeat_state?: string; shuffle_state?: boolean; timestamp?: number; }`\n\n  - `actions?: { interrupting_playback?: boolean; pausing?: boolean; published?: boolean; resuming?: boolean; seeking?: boolean; skipping_next?: boolean; skipping_prev?: boolean; toggling_repeat_context?: boolean; toggling_repeat_track?: boolean; toggling_shuffle?: boolean; transferring_playback?: boolean; }`\n  - `context?: { external_urls?: { published?: boolean; spotify?: string; }; href?: string; published?: boolean; type?: string; uri?: string; }`\n  - `currently_playing_type?: string`\n  - `device?: { id?: string; is_active?: boolean; is_private_session?: boolean; is_restricted?: boolean; name?: string; published?: boolean; supports_volume?: boolean; type?: string; volume_percent?: number; }`\n  - `is_playing?: boolean`\n  - `item?: { id?: string; album?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: object[]; available_markets: string[]; external_urls: object; href: string; images: object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: object; }; artists?: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }; external_urls?: { published?: boolean; spotify?: string; }; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; track_number?: number; type?: 'track'; uri?: string; } | { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: { id: string; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }; }`\n  - `progress_ms?: number`\n  - `published?: boolean`\n  - `repeat_state?: string`\n  - `shuffle_state?: boolean`\n  - `timestamp?: number`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.me.player.getState();\n\nconsole.log(response);\n```",
  },
  {
    name: 'list_recently_played',
    endpoint: '/me/player/recently-played',
    httpMethod: 'get',
    summary: 'Get Recently Played Tracks\n',
    description:
      "Get tracks from the current user's recently played tracks.\n_**Note**: Currently doesn't support podcast episodes._\n",
    stainlessPath: '(resource) me.player > (method) list_recently_played',
    qualified: 'client.me.player.listRecentlyPlayed',
    params: ['after?: number;', 'before?: number;', 'limit?: number;'],
    response:
      "{ context?: { external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; played_at?: string; published?: boolean; track?: { id?: string; album?: object; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: external_id_object; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: 'track'; uri?: string; }; }",
    markdown:
      "## list_recently_played\n\n`client.me.player.listRecentlyPlayed(after?: number, before?: number, limit?: number): { context?: context_object; played_at?: string; published?: boolean; track?: track_object; }`\n\n**get** `/me/player/recently-played`\n\nGet tracks from the current user's recently played tracks.\n_**Note**: Currently doesn't support podcast episodes._\n\n\n### Parameters\n\n- `after?: number`\n  A Unix timestamp in milliseconds. Returns all items\nafter (but not including) this cursor position. If `after` is specified, `before`\nmust not be specified.\n\n\n- `before?: number`\n  A Unix timestamp in milliseconds. Returns all items\nbefore (but not including) this cursor position. If `before` is specified,\n`after` must not be specified.\n\n\n- `limit?: number`\n  The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n\n\n### Returns\n\n- `{ context?: { external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; played_at?: string; published?: boolean; track?: { id?: string; album?: object; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: external_id_object; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: 'track'; uri?: string; }; }`\n\n  - `context?: { external_urls?: { published?: boolean; spotify?: string; }; href?: string; published?: boolean; type?: string; uri?: string; }`\n  - `played_at?: string`\n  - `published?: boolean`\n  - `track?: { id?: string; album?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: object[]; available_markets: string[]; external_urls: object; href: string; images: object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: object; }; artists?: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }; external_urls?: { published?: boolean; spotify?: string; }; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; track_number?: number; type?: 'track'; uri?: string; }`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\n// Automatically fetches more pages as needed.\nfor await (const playerListRecentlyPlayedResponse of client.me.player.listRecentlyPlayed()) {\n  console.log(playerListRecentlyPlayedResponse);\n}\n```",
  },
  {
    name: 'pause_playback',
    endpoint: '/me/player/pause',
    httpMethod: 'put',
    summary: 'Pause Playback\n',
    description:
      "Pause playback on the user's account. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
    stainlessPath: '(resource) me.player > (method) pause_playback',
    qualified: 'client.me.player.pausePlayback',
    params: ['device_id?: string;'],
    markdown:
      "## pause_playback\n\n`client.me.player.pausePlayback(device_id?: string): void`\n\n**put** `/me/player/pause`\n\nPause playback on the user's account. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n\n\n### Parameters\n\n- `device_id?: string`\n  The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.player.pausePlayback()\n```",
  },
  {
    name: 'seek_to_position',
    endpoint: '/me/player/seek',
    httpMethod: 'put',
    summary: 'Seek To Position\n',
    description:
      'Seeks to the given position in the user’s currently playing track. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
    stainlessPath: '(resource) me.player > (method) seek_to_position',
    qualified: 'client.me.player.seekToPosition',
    params: ['position_ms: number;', 'device_id?: string;'],
    markdown:
      "## seek_to_position\n\n`client.me.player.seekToPosition(position_ms: number, device_id?: string): void`\n\n**put** `/me/player/seek`\n\nSeeks to the given position in the user’s currently playing track. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n\n\n### Parameters\n\n- `position_ms: number`\n  The position in milliseconds to seek to. Must be a\npositive number. Passing in a position that is greater than the length of\nthe track will cause the player to start playing the next song.\n\n\n- `device_id?: string`\n  The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.player.seekToPosition({ position_ms: 25000 })\n```",
  },
  {
    name: 'set_repeat_mode',
    endpoint: '/me/player/repeat',
    httpMethod: 'put',
    summary: 'Set Repeat Mode\n',
    description:
      "Set the repeat mode for the user's playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
    stainlessPath: '(resource) me.player > (method) set_repeat_mode',
    qualified: 'client.me.player.setRepeatMode',
    params: ['state: string;', 'device_id?: string;'],
    markdown:
      "## set_repeat_mode\n\n`client.me.player.setRepeatMode(state: string, device_id?: string): void`\n\n**put** `/me/player/repeat`\n\nSet the repeat mode for the user's playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n\n\n### Parameters\n\n- `state: string`\n  **track**, **context** or **off**.<br/>\n**track** will repeat the current track.<br/>\n**context** will repeat the current context.<br/>\n**off** will turn repeat off.\n\n\n- `device_id?: string`\n  The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.player.setRepeatMode({ state: 'context' })\n```",
  },
  {
    name: 'set_volume',
    endpoint: '/me/player/volume',
    httpMethod: 'put',
    summary: 'Set Playback Volume\n',
    description:
      'Set the volume for the user’s current playback device. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
    stainlessPath: '(resource) me.player > (method) set_volume',
    qualified: 'client.me.player.setVolume',
    params: ['volume_percent: number;', 'device_id?: string;'],
    markdown:
      "## set_volume\n\n`client.me.player.setVolume(volume_percent: number, device_id?: string): void`\n\n**put** `/me/player/volume`\n\nSet the volume for the user’s current playback device. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n\n\n### Parameters\n\n- `volume_percent: number`\n  The volume to set. Must be a value from 0 to 100 inclusive.\n\n\n- `device_id?: string`\n  The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.player.setVolume({ volume_percent: 50 })\n```",
  },
  {
    name: 'skip_next',
    endpoint: '/me/player/next',
    httpMethod: 'post',
    summary: 'Skip To Next\n',
    description:
      'Skips to next track in the user’s queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
    stainlessPath: '(resource) me.player > (method) skip_next',
    qualified: 'client.me.player.skipNext',
    params: ['device_id?: string;'],
    markdown:
      "## skip_next\n\n`client.me.player.skipNext(device_id?: string): void`\n\n**post** `/me/player/next`\n\nSkips to next track in the user’s queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n\n\n### Parameters\n\n- `device_id?: string`\n  The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.player.skipNext()\n```",
  },
  {
    name: 'skip_previous',
    endpoint: '/me/player/previous',
    httpMethod: 'post',
    summary: 'Skip To Previous\n',
    description:
      'Skips to previous track in the user’s queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
    stainlessPath: '(resource) me.player > (method) skip_previous',
    qualified: 'client.me.player.skipPrevious',
    params: ['device_id?: string;'],
    markdown:
      "## skip_previous\n\n`client.me.player.skipPrevious(device_id?: string): void`\n\n**post** `/me/player/previous`\n\nSkips to previous track in the user’s queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n\n\n### Parameters\n\n- `device_id?: string`\n  The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.player.skipPrevious()\n```",
  },
  {
    name: 'start_playback',
    endpoint: '/me/player/play',
    httpMethod: 'put',
    summary: 'Start/Resume Playback\n',
    description:
      "Start a new context or resume current playback on the user's active device. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
    stainlessPath: '(resource) me.player > (method) start_playback',
    qualified: 'client.me.player.startPlayback',
    params: [
      'device_id?: string;',
      'context_uri?: string;',
      'offset?: object;',
      'position_ms?: number;',
      'published?: boolean;',
      'uris?: string[];',
    ],
    markdown:
      '## start_playback\n\n`client.me.player.startPlayback(device_id?: string, context_uri?: string, offset?: object, position_ms?: number, published?: boolean, uris?: string[]): void`\n\n**put** `/me/player/play`\n\nStart a new context or resume current playback on the user\'s active device. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n\n\n### Parameters\n\n- `device_id?: string`\n  The id of the device this command is targeting. If not supplied, the user\'s currently active device is the target.\n\n- `context_uri?: string`\n  Optional. Spotify URI of the context to play.\nValid contexts are albums, artists & playlists.\n`{context_uri:"spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"}`\n\n\n- `offset?: object`\n  Optional. Indicates from where in the context playback should start. Only available when context_uri corresponds to an album or playlist object\n"position" is zero based and can’t be negative. Example: `"offset": {"position": 5}`\n"uri" is a string representing the uri of the item to start at. Example: `"offset": {"uri": "spotify:track:1301WleyT98MSxVHPZCA6M"}`\n\n\n- `position_ms?: number`\n  Indicates from what position to start playback. Must be a positive number. Passing in a position that is greater than the length of the track will cause the player to start playing the next song.\n\n\n- `published?: boolean`\n  The playlist\'s public/private status (if it should be added to the user\'s profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n\n\n- `uris?: string[]`\n  Optional. A JSON array of the Spotify track URIs to play.\nFor example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]}`\n\n\n### Example\n\n```typescript\nimport Spotted from \'spotted-ts\';\n\nconst client = new Spotted();\n\nawait client.me.player.startPlayback()\n```',
  },
  {
    name: 'toggle_shuffle',
    endpoint: '/me/player/shuffle',
    httpMethod: 'put',
    summary: 'Toggle Playback Shuffle\n',
    description:
      'Toggle shuffle on or off for user’s playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
    stainlessPath: '(resource) me.player > (method) toggle_shuffle',
    qualified: 'client.me.player.toggleShuffle',
    params: ['state: boolean;', 'device_id?: string;'],
    markdown:
      "## toggle_shuffle\n\n`client.me.player.toggleShuffle(state: boolean, device_id?: string): void`\n\n**put** `/me/player/shuffle`\n\nToggle shuffle on or off for user’s playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n\n\n### Parameters\n\n- `state: boolean`\n  **true** : Shuffle user's playback.<br/>\n**false** : Do not shuffle user's playback.\n\n\n- `device_id?: string`\n  The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.player.toggleShuffle({ state: true })\n```",
  },
  {
    name: 'transfer',
    endpoint: '/me/player',
    httpMethod: 'put',
    summary: 'Transfer Playback\n',
    description:
      'Transfer playback to a new device and optionally begin playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
    stainlessPath: '(resource) me.player > (method) transfer',
    qualified: 'client.me.player.transfer',
    params: ['device_ids: string[];', 'play?: boolean;', 'published?: boolean;'],
    markdown:
      "## transfer\n\n`client.me.player.transfer(device_ids: string[], play?: boolean, published?: boolean): void`\n\n**put** `/me/player`\n\nTransfer playback to a new device and optionally begin playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n\n\n### Parameters\n\n- `device_ids: string[]`\n  A JSON array containing the ID of the device on which playback should be started/transferred.<br/>For example:`{device_ids:[\"74ASZWbe4lXaubB36ztrGX\"]}`<br/>_**Note**: Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return `400 Bad Request`_\n\n\n- `play?: boolean`\n  **true**: ensure playback happens on new device.<br/>**false** or not provided: keep the current playback state.\n\n\n- `published?: boolean`\n  The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.player.transfer({ device_ids: ['74ASZWbe4lXaubB36ztrGX'] })\n```",
  },
  {
    name: 'add',
    endpoint: '/me/player/queue',
    httpMethod: 'post',
    summary: 'Add Item to Playback Queue\n',
    description:
      "Add an item to be played next in the user's current playback queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
    stainlessPath: '(resource) me.player.queue > (method) add',
    qualified: 'client.me.player.queue.add',
    params: ['uri: string;', 'device_id?: string;'],
    markdown:
      "## add\n\n`client.me.player.queue.add(uri: string, device_id?: string): void`\n\n**post** `/me/player/queue`\n\nAdd an item to be played next in the user's current playback queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n\n\n### Parameters\n\n- `uri: string`\n  The uri of the item to add to the queue. Must be a track or an episode uri.\n\n\n- `device_id?: string`\n  The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.me.player.queue.add({ uri: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh' })\n```",
  },
  {
    name: 'get',
    endpoint: '/me/player/queue',
    httpMethod: 'get',
    summary: "Get the User's Queue\n",
    description: "Get the list of objects that make up the user's queue.\n",
    stainlessPath: '(resource) me.player.queue > (method) get',
    qualified: 'client.me.player.queue.get',
    response: '{ currently_playing?: object | object; published?: boolean; queue?: object | object[]; }',
    markdown:
      "## get\n\n`client.me.player.queue.get(): { currently_playing?: track_object | episode_object; published?: boolean; queue?: track_object | episode_object[]; }`\n\n**get** `/me/player/queue`\n\nGet the list of objects that make up the user's queue.\n\n\n### Returns\n\n- `{ currently_playing?: { id?: string; album?: object; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: external_id_object; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: 'track'; uri?: string; } | { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: show_base; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: episode_restriction_object; resume_point?: resume_point_object; }; published?: boolean; queue?: { id?: string; album?: object; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: external_id_object; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: 'track'; uri?: string; } | { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: show_base; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: episode_restriction_object; resume_point?: resume_point_object; }[]; }`\n\n  - `currently_playing?: { id?: string; album?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: object[]; available_markets: string[]; external_urls: object; href: string; images: object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: object; }; artists?: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }; external_urls?: { published?: boolean; spotify?: string; }; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; track_number?: number; type?: 'track'; uri?: string; } | { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: { id: string; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }; }`\n  - `published?: boolean`\n  - `queue?: { id?: string; album?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: object[]; available_markets: string[]; external_urls: object; href: string; images: object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: object; }; artists?: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }; external_urls?: { published?: boolean; spotify?: string; }; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; track_number?: number; type?: 'track'; uri?: string; } | { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: { id: string; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }; }[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst queue = await client.me.player.queue.get();\n\nconsole.log(queue);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/chapters/{id}',
    httpMethod: 'get',
    summary: 'Get a Chapter\n',
    description:
      'Get Spotify catalog information for a single audiobook chapter. Chapters are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
    stainlessPath: '(resource) chapters > (method) retrieve',
    qualified: 'client.chapters.retrieve',
    params: ['id: string;', 'market?: string;'],
    response:
      "{ id: string; audio_preview_url: string; audiobook: { id: string; authors: author_object[]; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; languages: string[]; media_type: string; name: string; narrators: narrator_object[]; publisher: string; total_chapters: number; type: 'audiobook'; uri: string; edition?: string; published?: boolean; }; chapter_number: number; description: string; duration_ms: number; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; type: 'episode'; uri: string; available_markets?: string[]; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }; }",
    markdown:
      "## retrieve\n\n`client.chapters.retrieve(id: string, market?: string): { id: string; audio_preview_url: string; audiobook: audiobook_base; chapter_number: number; description: string; duration_ms: number; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; type: 'episode'; uri: string; available_markets?: string[]; published?: boolean; restrictions?: chapter_restriction_object; resume_point?: resume_point_object; }`\n\n**get** `/chapters/{id}`\n\nGet Spotify catalog information for a single audiobook chapter. Chapters are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n\n\n### Parameters\n\n- `id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the chapter.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n### Returns\n\n- `{ id: string; audio_preview_url: string; audiobook: { id: string; authors: author_object[]; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; languages: string[]; media_type: string; name: string; narrators: narrator_object[]; publisher: string; total_chapters: number; type: 'audiobook'; uri: string; edition?: string; published?: boolean; }; chapter_number: number; description: string; duration_ms: number; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; type: 'episode'; uri: string; available_markets?: string[]; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }; }`\n\n  - `id: string`\n  - `audio_preview_url: string`\n  - `audiobook: { id: string; authors: { name?: string; published?: boolean; }[]; available_markets: string[]; copyrights: { published?: boolean; text?: string; type?: string; }[]; description: string; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; languages: string[]; media_type: string; name: string; narrators: { name?: string; published?: boolean; }[]; publisher: string; total_chapters: number; type: 'audiobook'; uri: string; edition?: string; published?: boolean; }`\n  - `chapter_number: number`\n  - `description: string`\n  - `duration_ms: number`\n  - `explicit: boolean`\n  - `external_urls: { published?: boolean; spotify?: string; }`\n  - `href: string`\n  - `html_description: string`\n  - `images: { height: number; url: string; width: number; published?: boolean; }[]`\n  - `is_playable: boolean`\n  - `languages: string[]`\n  - `name: string`\n  - `release_date: string`\n  - `release_date_precision: 'year' | 'month' | 'day'`\n  - `type: 'episode'`\n  - `uri: string`\n  - `available_markets?: string[]`\n  - `published?: boolean`\n  - `restrictions?: { published?: boolean; reason?: string; }`\n  - `resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst chapter = await client.chapters.retrieve('0D5wENdkdwbqlrHoaJ9g29');\n\nconsole.log(chapter);\n```",
  },
  {
    name: 'bulk_retrieve',
    endpoint: '/chapters',
    httpMethod: 'get',
    summary: 'Get Several Chapters\n',
    description:
      'Get Spotify catalog information for several audiobook chapters identified by their Spotify IDs. Chapters are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
    stainlessPath: '(resource) chapters > (method) bulk_retrieve',
    qualified: 'client.chapters.bulkRetrieve',
    params: ['ids: string;', 'market?: string;'],
    response:
      "{ chapters: { id: string; audio_preview_url: string; audiobook: object; chapter_number: number; description: string; duration_ms: number; explicit: boolean; external_urls: object; href: string; html_description: string; images: object[]; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; type: 'episode'; uri: string; available_markets?: string[]; published?: boolean; restrictions?: object; resume_point?: object; }[]; }",
    markdown:
      "## bulk_retrieve\n\n`client.chapters.bulkRetrieve(ids: string, market?: string): { chapters: object[]; }`\n\n**get** `/chapters`\n\nGet Spotify catalog information for several audiobook chapters identified by their Spotify IDs. Chapters are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n\n\n### Parameters\n\n- `ids: string`\n  A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU`. Maximum: 50 IDs.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n### Returns\n\n- `{ chapters: { id: string; audio_preview_url: string; audiobook: object; chapter_number: number; description: string; duration_ms: number; explicit: boolean; external_urls: object; href: string; html_description: string; images: object[]; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; type: 'episode'; uri: string; available_markets?: string[]; published?: boolean; restrictions?: object; resume_point?: object; }[]; }`\n\n  - `chapters: { id: string; audio_preview_url: string; audiobook: { id: string; authors: object[]; available_markets: string[]; copyrights: object[]; description: string; explicit: boolean; external_urls: object; href: string; html_description: string; images: object[]; languages: string[]; media_type: string; name: string; narrators: object[]; publisher: string; total_chapters: number; type: 'audiobook'; uri: string; edition?: string; published?: boolean; }; chapter_number: number; description: string; duration_ms: number; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; type: 'episode'; uri: string; available_markets?: string[]; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }; }[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.chapters.bulkRetrieve({ ids: '0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/tracks/{id}',
    httpMethod: 'get',
    summary: 'Get Track\n',
    description: 'Get Spotify catalog information for a single track identified by its\nunique Spotify ID.\n',
    stainlessPath: '(resource) tracks > (method) retrieve',
    qualified: 'client.tracks.retrieve',
    params: ['id: string;', 'market?: string;'],
    response:
      "{ id?: string; album?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: object[]; available_markets: string[]; external_urls: object; href: string; images: object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: object; }; artists?: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }; external_urls?: { published?: boolean; spotify?: string; }; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; track_number?: number; type?: 'track'; uri?: string; }",
    markdown:
      "## retrieve\n\n`client.tracks.retrieve(id: string, market?: string): { id?: string; album?: object; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: external_id_object; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: 'track'; uri?: string; }`\n\n**get** `/tracks/{id}`\n\nGet Spotify catalog information for a single track identified by its\nunique Spotify ID.\n\n\n### Parameters\n\n- `id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n### Returns\n\n- `{ id?: string; album?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: object[]; available_markets: string[]; external_urls: object; href: string; images: object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: object; }; artists?: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }; external_urls?: { published?: boolean; spotify?: string; }; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; track_number?: number; type?: 'track'; uri?: string; }`\n\n  - `id?: string`\n  - `album?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: { id?: string; external_urls?: object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets: string[]; external_urls: { published?: boolean; spotify?: string; }; href: string; images: { height: number; url: string; width: number; published?: boolean; }[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: { published?: boolean; reason?: 'market' | 'product' | 'explicit'; }; }`\n  - `artists?: { id?: string; external_urls?: { published?: boolean; spotify?: string; }; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]`\n  - `available_markets?: string[]`\n  - `disc_number?: number`\n  - `duration_ms?: number`\n  - `explicit?: boolean`\n  - `external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }`\n  - `external_urls?: { published?: boolean; spotify?: string; }`\n  - `href?: string`\n  - `is_local?: boolean`\n  - `is_playable?: boolean`\n  - `linked_from?: { id?: string; external_urls?: { published?: boolean; spotify?: string; }; href?: string; published?: boolean; type?: string; uri?: string; }`\n  - `name?: string`\n  - `popularity?: number`\n  - `preview_url?: string`\n  - `published?: boolean`\n  - `restrictions?: { published?: boolean; reason?: string; }`\n  - `track_number?: number`\n  - `type?: 'track'`\n  - `uri?: string`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst trackObject = await client.tracks.retrieve('11dFghVXANMlKmJXsNCbNl');\n\nconsole.log(trackObject);\n```",
  },
  {
    name: 'bulk_retrieve',
    endpoint: '/tracks',
    httpMethod: 'get',
    summary: 'Get Several Tracks\n',
    description: 'Get Spotify catalog information for multiple tracks based on their Spotify IDs.\n',
    stainlessPath: '(resource) tracks > (method) bulk_retrieve',
    qualified: 'client.tracks.bulkRetrieve',
    params: ['ids: string;', 'market?: string;'],
    response:
      "{ tracks: { id?: string; album?: object; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: external_id_object; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: 'track'; uri?: string; }[]; }",
    markdown:
      "## bulk_retrieve\n\n`client.tracks.bulkRetrieve(ids: string, market?: string): { tracks: track_object[]; }`\n\n**get** `/tracks`\n\nGet Spotify catalog information for multiple tracks based on their Spotify IDs.\n\n\n### Parameters\n\n- `ids: string`\n  A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n### Returns\n\n- `{ tracks: { id?: string; album?: object; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: external_id_object; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: 'track'; uri?: string; }[]; }`\n\n  - `tracks: { id?: string; album?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: object[]; available_markets: string[]; external_urls: object; href: string; images: object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: object; }; artists?: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }; external_urls?: { published?: boolean; spotify?: string; }; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; track_number?: number; type?: 'track'; uri?: string; }[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.tracks.bulkRetrieve({ ids: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'query',
    endpoint: '/search',
    httpMethod: 'get',
    summary: 'Search for Item\n',
    description:
      'Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks\nthat match a keyword string. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
    stainlessPath: '(resource) search > (method) query',
    qualified: 'client.search.query',
    params: [
      'q: string;',
      "type: 'album' | 'artist' | 'playlist' | 'track' | 'show' | 'episode' | 'audiobook'[];",
      "include_external?: 'audio';",
      'limit?: number;',
      'market?: string;',
      'offset?: number;',
    ],
    response:
      '{ albums?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: object[]; published?: boolean; }; artists?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: artist_object[]; published?: boolean; }; audiobooks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: audiobook_base[]; published?: boolean; }; episodes?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: simplified_episode_object[]; published?: boolean; }; playlists?: object; shows?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: show_base[]; published?: boolean; }; tracks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: track_object[]; published?: boolean; }; }',
    markdown:
      "## query\n\n`client.search.query(q: string, type: 'album' | 'artist' | 'playlist' | 'track' | 'show' | 'episode' | 'audiobook'[], include_external?: 'audio', limit?: number, market?: string, offset?: number): { albums?: object; artists?: object; audiobooks?: object; episodes?: object; playlists?: paging_playlist_object; shows?: object; tracks?: object; }`\n\n**get** `/search`\n\nGet Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks\nthat match a keyword string. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n\n\n### Parameters\n\n- `q: string`\n  Your search query.\n\nYou can narrow down your search using field filters. The available filters are `album`, `artist`, `track`, `year`, `upc`, `tag:hipster`, `tag:new`, `isrc`, and `genre`. Each field filter only applies to certain result types.\n\nThe `artist` and `year` filters can be used while searching albums, artists and tracks. You can filter on a single `year` or a range (e.g. 1955-1960).<br />\nThe `album` filter can be used while searching albums and tracks.<br />\nThe `genre` filter can be used while searching artists and tracks.<br />\nThe `isrc` and `track` filters can be used while searching tracks.<br />\nThe `upc`, `tag:new` and `tag:hipster` filters can only be used while searching albums. The `tag:new` filter will return albums released in the past two weeks and `tag:hipster` can be used to return only albums with the lowest 10% popularity.<br />\n\n\n- `type: 'album' | 'artist' | 'playlist' | 'track' | 'show' | 'episode' | 'audiobook'[]`\n  A comma-separated list of item types to search across. Search results include hits\nfrom all the specified item types. For example: `q=abacab&type=album,track` returns\nboth albums and tracks matching \"abacab\".\n\n\n- `include_external?: 'audio'`\n  If `include_external=audio` is specified it signals that the client can play externally hosted audio content, and marks\nthe content as playable in the response. By default externally hosted audio content is marked as unplayable in the response.\n\n- `limit?: number`\n  The maximum number of results to return in each item type.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n- `offset?: number`\n  The index of the first result to return. Use\nwith limit to get the next page of search results.\n\n\n### Returns\n\n- `{ albums?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: simplified_artist_object[]; available_markets: string[]; external_urls: external_url_object; href: string; images: image_object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: album_restriction_object; }[]; published?: boolean; }; artists?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: object[]; published?: boolean; }; audiobooks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: object[]; published?: boolean; }; episodes?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: object[]; published?: boolean; }; playlists?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: simplified_playlist_object[]; published?: boolean; }; shows?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: object[]; published?: boolean; }; tracks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: object[]; published?: boolean; }; }`\n\n  - `albums?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets: string[]; external_urls: { published?: boolean; spotify?: string; }; href: string; images: { height: number; url: string; width: number; published?: boolean; }[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: { published?: boolean; reason?: 'market' | 'product' | 'explicit'; }; }[]; published?: boolean; }`\n  - `artists?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { id?: string; external_urls?: object; followers?: object; genres?: string[]; href?: string; images?: object[]; name?: string; popularity?: number; published?: boolean; type?: 'artist'; uri?: string; }[]; published?: boolean; }`\n  - `audiobooks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { id: string; authors: object[]; available_markets: string[]; copyrights: object[]; description: string; explicit: boolean; external_urls: object; href: string; html_description: string; images: object[]; languages: string[]; media_type: string; name: string; narrators: object[]; publisher: string; total_chapters: number; type: 'audiobook'; uri: string; edition?: string; published?: boolean; }[]; published?: boolean; }`\n  - `episodes?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: object; href: string; html_description: string; images: object[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: object; resume_point?: object; }[]; published?: boolean; }`\n  - `playlists?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { id?: string; collaborative?: boolean; description?: string; external_urls?: external_url_object; href?: string; images?: image_object[]; items?: playlist_tracks_ref_object; name?: string; owner?: playlist_user_object; published?: boolean; snapshot_id?: string; tracks?: playlist_tracks_ref_object; type?: string; uri?: string; }[]; published?: boolean; }`\n  - `shows?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { id: string; available_markets: string[]; copyrights: object[]; description: string; explicit: boolean; external_urls: object; href: string; html_description: string; images: object[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }[]; published?: boolean; }`\n  - `tracks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { id?: string; album?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: simplified_artist_object[]; available_markets: string[]; external_urls: external_url_object; href: string; images: image_object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: album_restriction_object; }; artists?: object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: object; external_urls?: object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: object; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: object; track_number?: number; type?: 'track'; uri?: string; }[]; published?: boolean; }`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.search.query({ q: 'remaster%20track:Doxy%20artist:Miles%20Davis', type: ['album'] });\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/playlists/{playlist_id}',
    httpMethod: 'get',
    summary: 'Get Playlist\n',
    description: 'Get a playlist owned by a Spotify user.\n',
    stainlessPath: '(resource) playlists > (method) retrieve',
    qualified: 'client.playlists.retrieve',
    params: ['playlist_id: string;', 'additional_types?: string;', 'fields?: string;', 'market?: string;'],
    response:
      "{ id?: string; collaborative?: boolean; description?: string; external_urls?: { published?: boolean; spotify?: string; }; followers?: { href?: string; published?: boolean; total?: number; }; href?: string; images?: { height: number; url: string; width: number; published?: boolean; }[]; items?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: object[]; published?: boolean; }; name?: string; owner?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: 'user'; uri?: string; }; published?: boolean; snapshot_id?: string; tracks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: object[]; published?: boolean; }; type?: string; uri?: string; }",
    markdown:
      "## retrieve\n\n`client.playlists.retrieve(playlist_id: string, additional_types?: string, fields?: string, market?: string): { id?: string; collaborative?: boolean; description?: string; external_urls?: external_url_object; followers?: followers_object; href?: string; images?: image_object[]; items?: object; name?: string; owner?: playlist_user_object; published?: boolean; snapshot_id?: string; tracks?: object; type?: string; uri?: string; }`\n\n**get** `/playlists/{playlist_id}`\n\nGet a playlist owned by a Spotify user.\n\n\n### Parameters\n\n- `playlist_id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n\n\n- `additional_types?: string`\n  A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n\n\n- `fields?: string`\n  Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the playlist''s description and URI: `fields=description,uri`. A dot\nseparator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder: `fields=tracks.items(added_at,added_by.id)`.\nUse multiple parentheses to drill down into nested objects, for example: `fields=tracks.items(track(name,href,album(name,href)))`.\nFields can be excluded by prefixing them with an exclamation mark, for example:\n`fields=tracks.items(track(name,href,album(!name,href)))`\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n### Returns\n\n- `{ id?: string; collaborative?: boolean; description?: string; external_urls?: { published?: boolean; spotify?: string; }; followers?: { href?: string; published?: boolean; total?: number; }; href?: string; images?: { height: number; url: string; width: number; published?: boolean; }[]; items?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: object[]; published?: boolean; }; name?: string; owner?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: 'user'; uri?: string; }; published?: boolean; snapshot_id?: string; tracks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: object[]; published?: boolean; }; type?: string; uri?: string; }`\n\n  - `id?: string`\n  - `collaborative?: boolean`\n  - `description?: string`\n  - `external_urls?: { published?: boolean; spotify?: string; }`\n  - `followers?: { href?: string; published?: boolean; total?: number; }`\n  - `href?: string`\n  - `images?: { height: number; url: string; width: number; published?: boolean; }[]`\n  - `items?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { added_at?: string; added_by?: object; is_local?: boolean; item?: object | object; published?: boolean; track?: object | object; }[]; published?: boolean; }`\n  - `name?: string`\n  - `owner?: { id?: string; external_urls?: { published?: boolean; spotify?: string; }; href?: string; published?: boolean; type?: 'user'; uri?: string; }`\n  - `published?: boolean`\n  - `snapshot_id?: string`\n  - `tracks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { added_at?: string; added_by?: object; is_local?: boolean; item?: object | object; published?: boolean; track?: object | object; }[]; published?: boolean; }`\n  - `type?: string`\n  - `uri?: string`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst playlist = await client.playlists.retrieve('3cEYpjA9oz9GiPac4AsH4n');\n\nconsole.log(playlist);\n```",
  },
  {
    name: 'update',
    endpoint: '/playlists/{playlist_id}',
    httpMethod: 'put',
    summary: 'Change Playlist Details\n',
    description:
      "Change a playlist's name and public/private state. (The user must, of\ncourse, own the playlist.)\n",
    stainlessPath: '(resource) playlists > (method) update',
    qualified: 'client.playlists.update',
    params: [
      'playlist_id: string;',
      'collaborative?: boolean;',
      'description?: string;',
      'name?: string;',
      'published?: boolean;',
    ],
    markdown:
      "## update\n\n`client.playlists.update(playlist_id: string, collaborative?: boolean, description?: string, name?: string, published?: boolean): void`\n\n**put** `/playlists/{playlist_id}`\n\nChange a playlist's name and public/private state. (The user must, of\ncourse, own the playlist.)\n\n\n### Parameters\n\n- `playlist_id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n\n\n- `collaborative?: boolean`\n  If `true`, the playlist will become collaborative and other users will be able to modify the playlist in their Spotify client. <br/>\n_**Note**: You can only set `collaborative` to `true` on non-public playlists._\n\n\n- `description?: string`\n  Value for playlist description as displayed in Spotify Clients and in the Web API.\n\n\n- `name?: string`\n  The new name for the playlist, for example `\"My New Playlist Title\"`\n\n\n- `published?: boolean`\n  The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.playlists.update('3cEYpjA9oz9GiPac4AsH4n')\n```",
  },
  {
    name: 'update',
    endpoint: '/playlists/{playlist_id}/tracks',
    httpMethod: 'put',
    summary: 'Update Playlist Items [DEPRECATED]\n',
    description:
      "**Deprecated:** Use [Update Playlist Items](/documentation/web-api/reference/reorder-or-replace-playlists-items) instead.\n\nEither reorder or replace items in a playlist depending on the request's parameters.\nTo reorder items, include `range_start`, `insert_before`, `range_length` and `snapshot_id` in the request's body.\nTo replace items, include `uris` as either a query parameter or in the request's body.\nReplacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.\n<br/>\n**Note**: Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters.\nThese operations can't be applied together in a single request.\n",
    stainlessPath: '(resource) playlists.tracks > (method) update',
    qualified: 'client.playlists.tracks.update',
    params: [
      'playlist_id: string;',
      'insert_before?: number;',
      'published?: boolean;',
      'range_length?: number;',
      'range_start?: number;',
      'snapshot_id?: string;',
      'uris?: string[];',
    ],
    response: '{ snapshot_id?: string; }',
    markdown:
      "## update\n\n`client.playlists.tracks.update(playlist_id: string, insert_before?: number, published?: boolean, range_length?: number, range_start?: number, snapshot_id?: string, uris?: string[]): { snapshot_id?: string; }`\n\n**put** `/playlists/{playlist_id}/tracks`\n\n**Deprecated:** Use [Update Playlist Items](/documentation/web-api/reference/reorder-or-replace-playlists-items) instead.\n\nEither reorder or replace items in a playlist depending on the request's parameters.\nTo reorder items, include `range_start`, `insert_before`, `range_length` and `snapshot_id` in the request's body.\nTo replace items, include `uris` as either a query parameter or in the request's body.\nReplacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.\n<br/>\n**Note**: Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters.\nThese operations can't be applied together in a single request.\n\n\n### Parameters\n\n- `playlist_id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n\n\n- `insert_before?: number`\n  The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0.\n\n\n- `published?: boolean`\n  The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n\n\n- `range_length?: number`\n  The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2.\n\n\n- `range_start?: number`\n  The position of the first item to be reordered.\n\n\n- `snapshot_id?: string`\n  The playlist's snapshot ID against which you want to make the changes.\n\n\n- `uris?: string[]`\n\n### Returns\n\n- `{ snapshot_id?: string; }`\n\n  - `snapshot_id?: string`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst track = await client.playlists.tracks.update('3cEYpjA9oz9GiPac4AsH4n');\n\nconsole.log(track);\n```",
  },
  {
    name: 'list',
    endpoint: '/playlists/{playlist_id}/tracks',
    httpMethod: 'get',
    summary: 'Get Playlist Items [DEPRECATED]\n',
    description:
      '**Deprecated:** Use [Get Playlist Items](/documentation/web-api/reference/get-playlists-items) instead.\n\nGet full details of the items of a playlist owned by a Spotify user.\n',
    stainlessPath: '(resource) playlists.tracks > (method) list',
    qualified: 'client.playlists.tracks.list',
    params: [
      'playlist_id: string;',
      'additional_types?: string;',
      'fields?: string;',
      'limit?: number;',
      'market?: string;',
      'offset?: number;',
    ],
    response:
      '{ added_at?: string; added_by?: object; is_local?: boolean; item?: object | object; published?: boolean; track?: object | object; }',
    markdown:
      "## list\n\n`client.playlists.tracks.list(playlist_id: string, additional_types?: string, fields?: string, limit?: number, market?: string, offset?: number): { added_at?: string; added_by?: playlist_user_object; is_local?: boolean; item?: track_object | episode_object; published?: boolean; track?: track_object | episode_object; }`\n\n**get** `/playlists/{playlist_id}/tracks`\n\n**Deprecated:** Use [Get Playlist Items](/documentation/web-api/reference/get-playlists-items) instead.\n\nGet full details of the items of a playlist owned by a Spotify user.\n\n\n### Parameters\n\n- `playlist_id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n\n\n- `additional_types?: string`\n  A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n\n\n- `fields?: string`\n  Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n\n\n- `limit?: number`\n  The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 100.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n- `offset?: number`\n  The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n\n\n### Returns\n\n- `{ added_at?: string; added_by?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: 'user'; uri?: string; }; is_local?: boolean; item?: { id?: string; album?: object; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: external_id_object; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: 'track'; uri?: string; } | { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: show_base; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: episode_restriction_object; resume_point?: resume_point_object; }; published?: boolean; track?: { id?: string; album?: object; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: external_id_object; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: 'track'; uri?: string; } | { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: show_base; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: episode_restriction_object; resume_point?: resume_point_object; }; }`\n\n  - `added_at?: string`\n  - `added_by?: { id?: string; external_urls?: { published?: boolean; spotify?: string; }; href?: string; published?: boolean; type?: 'user'; uri?: string; }`\n  - `is_local?: boolean`\n  - `item?: { id?: string; album?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: object[]; available_markets: string[]; external_urls: object; href: string; images: object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: object; }; artists?: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }; external_urls?: { published?: boolean; spotify?: string; }; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; track_number?: number; type?: 'track'; uri?: string; } | { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: { id: string; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }; }`\n  - `published?: boolean`\n  - `track?: { id?: string; album?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: object[]; available_markets: string[]; external_urls: object; href: string; images: object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: object; }; artists?: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }; external_urls?: { published?: boolean; spotify?: string; }; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; track_number?: number; type?: 'track'; uri?: string; } | { id: string; audio_preview_url: string; description: string; duration_ms: number; explicit: boolean; external_urls: { published?: boolean; spotify?: string; }; href: string; html_description: string; images: { height: number; url: string; width: number; published?: boolean; }[]; is_externally_hosted: boolean; is_playable: boolean; languages: string[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; show: { id: string; available_markets: string[]; copyrights: copyright_object[]; description: string; explicit: boolean; external_urls: external_url_object; href: string; html_description: string; images: image_object[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; total_episodes: number; type: 'show'; uri: string; published?: boolean; }; type: 'episode'; uri: string; language?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; resume_point?: { fully_played?: boolean; published?: boolean; resume_position_ms?: number; }; }`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\n// Automatically fetches more pages as needed.\nfor await (const playlistTrackObject of client.playlists.tracks.list('3cEYpjA9oz9GiPac4AsH4n')) {\n  console.log(playlistTrackObject);\n}\n```",
  },
  {
    name: 'add',
    endpoint: '/playlists/{playlist_id}/tracks',
    httpMethod: 'post',
    summary: 'Add Items to Playlist [DEPRECATED]\n',
    description:
      "**Deprecated:** Use [Add Items to Playlist](/documentation/web-api/reference/add-items-to-playlist) instead.\n\nAdd one or more items to a user's playlist.\n",
    stainlessPath: '(resource) playlists.tracks > (method) add',
    qualified: 'client.playlists.tracks.add',
    params: ['playlist_id: string;', 'position?: number;', 'published?: boolean;', 'uris?: string[];'],
    response: '{ snapshot_id?: string; }',
    markdown:
      '## add\n\n`client.playlists.tracks.add(playlist_id: string, position?: number, published?: boolean, uris?: string[]): { snapshot_id?: string; }`\n\n**post** `/playlists/{playlist_id}/tracks`\n\n**Deprecated:** Use [Add Items to Playlist](/documentation/web-api/reference/add-items-to-playlist) instead.\n\nAdd one or more items to a user\'s playlist.\n\n\n### Parameters\n\n- `playlist_id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n\n\n- `position?: number`\n  The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0` ; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they appear in the uris array. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"], "position": 3}`\n\n\n- `published?: boolean`\n  The playlist\'s public/private status (if it should be added to the user\'s profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n\n\n- `uris?: string[]`\n  A JSON array of the [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}`<br/>A maximum of 100 items can be added in one request. _**Note**: if the `uris` parameter is present in the query string, any URIs listed here in the body will be ignored._\n\n\n### Returns\n\n- `{ snapshot_id?: string; }`\n\n  - `snapshot_id?: string`\n\n### Example\n\n```typescript\nimport Spotted from \'spotted-ts\';\n\nconst client = new Spotted();\n\nconst response = await client.playlists.tracks.add(\'3cEYpjA9oz9GiPac4AsH4n\');\n\nconsole.log(response);\n```',
  },
  {
    name: 'remove',
    endpoint: '/playlists/{playlist_id}/tracks',
    httpMethod: 'delete',
    summary: 'Remove Playlist Items [DEPRECATED]\n',
    description:
      "**Deprecated:** Use [Remove Playlist Items](/documentation/web-api/reference/remove-items-playlist) instead.\n\nRemove one or more items from a user's playlist.\n",
    stainlessPath: '(resource) playlists.tracks > (method) remove',
    qualified: 'client.playlists.tracks.remove',
    params: [
      'playlist_id: string;',
      'tracks: { uri?: string; }[];',
      'published?: boolean;',
      'snapshot_id?: string;',
    ],
    response: '{ snapshot_id?: string; }',
    markdown:
      '## remove\n\n`client.playlists.tracks.remove(playlist_id: string, tracks: { uri?: string; }[], published?: boolean, snapshot_id?: string): { snapshot_id?: string; }`\n\n**delete** `/playlists/{playlist_id}/tracks`\n\n**Deprecated:** Use [Remove Playlist Items](/documentation/web-api/reference/remove-items-playlist) instead.\n\nRemove one or more items from a user\'s playlist.\n\n\n### Parameters\n\n- `playlist_id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n\n\n- `tracks: { uri?: string; }[]`\n  An array of objects containing [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) of the tracks or episodes to remove.\nFor example: `{ "tracks": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once.\n\n\n- `published?: boolean`\n  The playlist\'s public/private status (if it should be added to the user\'s profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n\n\n- `snapshot_id?: string`\n  The playlist\'s snapshot ID against which you want to make the changes.\nThe API will validate that the specified items exist and in the specified positions and make the changes,\neven if more recent changes have been made to the playlist.\n\n\n### Returns\n\n- `{ snapshot_id?: string; }`\n\n  - `snapshot_id?: string`\n\n### Example\n\n```typescript\nimport Spotted from \'spotted-ts\';\n\nconst client = new Spotted();\n\nconst track = await client.playlists.tracks.remove(\'3cEYpjA9oz9GiPac4AsH4n\', { tracks: [{}] });\n\nconsole.log(track);\n```',
  },
  {
    name: 'check',
    endpoint: '/playlists/{playlist_id}/followers/contains',
    httpMethod: 'get',
    summary: 'Check if Current User Follows Playlist\n',
    description:
      "Check to see if the current user is following a specified playlist.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
    stainlessPath: '(resource) playlists.followers > (method) check',
    qualified: 'client.playlists.followers.check',
    params: ['playlist_id: string;', 'ids?: string;'],
    response: 'boolean[]',
    markdown:
      "## check\n\n`client.playlists.followers.check(playlist_id: string, ids?: string): boolean[]`\n\n**get** `/playlists/{playlist_id}/followers/contains`\n\nCheck to see if the current user is following a specified playlist.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n\n\n### Parameters\n\n- `playlist_id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n\n\n- `ids?: string`\n  **Deprecated** A single item list containing current user's [Spotify Username](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 1 id.\n\n\n### Returns\n\n- `boolean[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.playlists.followers.check('3cEYpjA9oz9GiPac4AsH4n');\n\nconsole.log(response);\n```",
  },
  {
    name: 'follow',
    endpoint: '/playlists/{playlist_id}/followers',
    httpMethod: 'put',
    summary: 'Follow Playlist\n',
    description:
      'Add the current user as a follower of a playlist.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n',
    stainlessPath: '(resource) playlists.followers > (method) follow',
    qualified: 'client.playlists.followers.follow',
    params: ['playlist_id: string;', 'published?: boolean;'],
    markdown:
      "## follow\n\n`client.playlists.followers.follow(playlist_id: string, published?: boolean): void`\n\n**put** `/playlists/{playlist_id}/followers`\n\nAdd the current user as a follower of a playlist.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n\n\n### Parameters\n\n- `playlist_id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n\n\n- `published?: boolean`\n  The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.playlists.followers.follow('3cEYpjA9oz9GiPac4AsH4n')\n```",
  },
  {
    name: 'unfollow',
    endpoint: '/playlists/{playlist_id}/followers',
    httpMethod: 'delete',
    summary: 'Unfollow Playlist\n',
    description:
      'Remove the current user as a follower of a playlist.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n',
    stainlessPath: '(resource) playlists.followers > (method) unfollow',
    qualified: 'client.playlists.followers.unfollow',
    params: ['playlist_id: string;'],
    markdown:
      "## unfollow\n\n`client.playlists.followers.unfollow(playlist_id: string): void`\n\n**delete** `/playlists/{playlist_id}/followers`\n\nRemove the current user as a follower of a playlist.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n\n\n### Parameters\n\n- `playlist_id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nawait client.playlists.followers.unfollow('3cEYpjA9oz9GiPac4AsH4n')\n```",
  },
  {
    name: 'update',
    endpoint: '/playlists/{playlist_id}/images',
    httpMethod: 'put',
    summary: 'Add Custom Playlist Cover Image\n',
    description: 'Replace the image used to represent a specific playlist.\n',
    stainlessPath: '(resource) playlists.images > (method) update',
    qualified: 'client.playlists.images.update',
    params: ['playlist_id: string;', 'body: string;'],
    response: 'string',
    markdown:
      "## update\n\n`client.playlists.images.update(playlist_id: string, body: string): string`\n\n**put** `/playlists/{playlist_id}/images`\n\nReplace the image used to represent a specific playlist.\n\n\n### Parameters\n\n- `playlist_id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n\n\n- `body: string`\n  Base64 encoded JPEG image data, maximum payload size is 256 KB.\n\n### Returns\n\n- `string`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst image = await client.playlists.images.update('3cEYpjA9oz9GiPac4AsH4n', fs.createReadStream('path/to/file'));\n\nconsole.log(image);\n\nconst content = await image.blob()\nconsole.log(content)\n```",
  },
  {
    name: 'list',
    endpoint: '/playlists/{playlist_id}/images',
    httpMethod: 'get',
    summary: 'Get Playlist Cover Image\n',
    description: 'Get the current image associated with a specific playlist.\n',
    stainlessPath: '(resource) playlists.images > (method) list',
    qualified: 'client.playlists.images.list',
    params: ['playlist_id: string;'],
    response: '{ height: number; url: string; width: number; published?: boolean; }[]',
    markdown:
      "## list\n\n`client.playlists.images.list(playlist_id: string): object[]`\n\n**get** `/playlists/{playlist_id}/images`\n\nGet the current image associated with a specific playlist.\n\n\n### Parameters\n\n- `playlist_id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n\n\n### Returns\n\n- `{ height: number; url: string; width: number; published?: boolean; }[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst imageObjects = await client.playlists.images.list('3cEYpjA9oz9GiPac4AsH4n');\n\nconsole.log(imageObjects);\n```",
  },
  {
    name: 'retrieve_profile',
    endpoint: '/users/{user_id}',
    httpMethod: 'get',
    summary: "Get User's Profile\n",
    description: 'Get public profile information about a Spotify user.\n',
    stainlessPath: '(resource) users > (method) retrieve_profile',
    qualified: 'client.users.retrieveProfile',
    params: ['user_id: string;'],
    response:
      "{ id?: string; display_name?: string; external_urls?: { published?: boolean; spotify?: string; }; followers?: { href?: string; published?: boolean; total?: number; }; href?: string; images?: { height: number; url: string; width: number; published?: boolean; }[]; published?: boolean; type?: 'user'; uri?: string; }",
    markdown:
      "## retrieve_profile\n\n`client.users.retrieveProfile(user_id: string): { id?: string; display_name?: string; external_urls?: external_url_object; followers?: followers_object; href?: string; images?: image_object[]; published?: boolean; type?: 'user'; uri?: string; }`\n\n**get** `/users/{user_id}`\n\nGet public profile information about a Spotify user.\n\n\n### Parameters\n\n- `user_id: string`\n  The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n\n\n### Returns\n\n- `{ id?: string; display_name?: string; external_urls?: { published?: boolean; spotify?: string; }; followers?: { href?: string; published?: boolean; total?: number; }; href?: string; images?: { height: number; url: string; width: number; published?: boolean; }[]; published?: boolean; type?: 'user'; uri?: string; }`\n\n  - `id?: string`\n  - `display_name?: string`\n  - `external_urls?: { published?: boolean; spotify?: string; }`\n  - `followers?: { href?: string; published?: boolean; total?: number; }`\n  - `href?: string`\n  - `images?: { height: number; url: string; width: number; published?: boolean; }[]`\n  - `published?: boolean`\n  - `type?: 'user'`\n  - `uri?: string`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.users.retrieveProfile('smedjan');\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/users/{user_id}/playlists',
    httpMethod: 'post',
    summary: 'Create Playlist for user\n',
    description:
      '**Deprecated**: Use [Create Playlist](/documentation/web-api/reference/create-playlist) instead.\n\nCreate a playlist for a Spotify user. (The playlist will be empty until\nyou [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)\nEach user is generally limited to a maximum of 11000 playlists.\n',
    stainlessPath: '(resource) users.playlists > (method) create',
    qualified: 'client.users.playlists.create',
    params: [
      'user_id: string;',
      'name: string;',
      'collaborative?: boolean;',
      'description?: string;',
      'published?: boolean;',
    ],
    response:
      "{ id?: string; collaborative?: boolean; description?: string; external_urls?: { published?: boolean; spotify?: string; }; followers?: { href?: string; published?: boolean; total?: number; }; href?: string; images?: { height: number; url: string; width: number; published?: boolean; }[]; items?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: object[]; published?: boolean; }; name?: string; owner?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: 'user'; uri?: string; }; published?: boolean; snapshot_id?: string; tracks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: object[]; published?: boolean; }; type?: string; uri?: string; }",
    markdown:
      "## create\n\n`client.users.playlists.create(user_id: string, name: string, collaborative?: boolean, description?: string, published?: boolean): { id?: string; collaborative?: boolean; description?: string; external_urls?: external_url_object; followers?: followers_object; href?: string; images?: image_object[]; items?: object; name?: string; owner?: playlist_user_object; published?: boolean; snapshot_id?: string; tracks?: object; type?: string; uri?: string; }`\n\n**post** `/users/{user_id}/playlists`\n\n**Deprecated**: Use [Create Playlist](/documentation/web-api/reference/create-playlist) instead.\n\nCreate a playlist for a Spotify user. (The playlist will be empty until\nyou [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)\nEach user is generally limited to a maximum of 11000 playlists.\n\n\n### Parameters\n\n- `user_id: string`\n  The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n\n\n- `name: string`\n  The name for the new playlist, for example `\"Your Coolest Playlist\"`. This name does not need to be unique; a user may have several playlists with the same name.\n\n\n- `collaborative?: boolean`\n  Defaults to `false`. If `true` the playlist will be collaborative. _**Note**: to create a collaborative playlist you must also set `public` to `false`. To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](/documentation/web-api/concepts/scopes/#list-of-scopes)._\n\n\n- `description?: string`\n  value for playlist description as displayed in Spotify Clients and in the Web API.\n\n\n- `published?: boolean`\n  The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n\n\n### Returns\n\n- `{ id?: string; collaborative?: boolean; description?: string; external_urls?: { published?: boolean; spotify?: string; }; followers?: { href?: string; published?: boolean; total?: number; }; href?: string; images?: { height: number; url: string; width: number; published?: boolean; }[]; items?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: object[]; published?: boolean; }; name?: string; owner?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: 'user'; uri?: string; }; published?: boolean; snapshot_id?: string; tracks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: object[]; published?: boolean; }; type?: string; uri?: string; }`\n\n  - `id?: string`\n  - `collaborative?: boolean`\n  - `description?: string`\n  - `external_urls?: { published?: boolean; spotify?: string; }`\n  - `followers?: { href?: string; published?: boolean; total?: number; }`\n  - `href?: string`\n  - `images?: { height: number; url: string; width: number; published?: boolean; }[]`\n  - `items?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { added_at?: string; added_by?: object; is_local?: boolean; item?: object | object; published?: boolean; track?: object | object; }[]; published?: boolean; }`\n  - `name?: string`\n  - `owner?: { id?: string; external_urls?: { published?: boolean; spotify?: string; }; href?: string; published?: boolean; type?: 'user'; uri?: string; }`\n  - `published?: boolean`\n  - `snapshot_id?: string`\n  - `tracks?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { added_at?: string; added_by?: object; is_local?: boolean; item?: object | object; published?: boolean; track?: object | object; }[]; published?: boolean; }`\n  - `type?: string`\n  - `uri?: string`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst playlist = await client.users.playlists.create('smedjan', { name: 'New Playlist' });\n\nconsole.log(playlist);\n```",
  },
  {
    name: 'list',
    endpoint: '/users/{user_id}/playlists',
    httpMethod: 'get',
    summary: "Get User's Playlists\n",
    description: 'Get a list of the playlists owned or followed by a Spotify user.\n',
    stainlessPath: '(resource) users.playlists > (method) list',
    qualified: 'client.users.playlists.list',
    params: ['user_id: string;', 'limit?: number;', 'offset?: number;'],
    response:
      "{ id?: string; collaborative?: boolean; description?: string; external_urls?: { published?: boolean; spotify?: string; }; href?: string; images?: { height: number; url: string; width: number; published?: boolean; }[]; items?: { href?: string; published?: boolean; total?: number; }; name?: string; owner?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: 'user'; uri?: string; }; published?: boolean; snapshot_id?: string; tracks?: { href?: string; published?: boolean; total?: number; }; type?: string; uri?: string; }",
    markdown:
      "## list\n\n`client.users.playlists.list(user_id: string, limit?: number, offset?: number): { id?: string; collaborative?: boolean; description?: string; external_urls?: external_url_object; href?: string; images?: image_object[]; items?: playlist_tracks_ref_object; name?: string; owner?: playlist_user_object; published?: boolean; snapshot_id?: string; tracks?: playlist_tracks_ref_object; type?: string; uri?: string; }`\n\n**get** `/users/{user_id}/playlists`\n\nGet a list of the playlists owned or followed by a Spotify user.\n\n\n### Parameters\n\n- `user_id: string`\n  The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n\n\n- `limit?: number`\n  The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n\n\n- `offset?: number`\n  The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.\n\n\n### Returns\n\n- `{ id?: string; collaborative?: boolean; description?: string; external_urls?: { published?: boolean; spotify?: string; }; href?: string; images?: { height: number; url: string; width: number; published?: boolean; }[]; items?: { href?: string; published?: boolean; total?: number; }; name?: string; owner?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: 'user'; uri?: string; }; published?: boolean; snapshot_id?: string; tracks?: { href?: string; published?: boolean; total?: number; }; type?: string; uri?: string; }`\n\n  - `id?: string`\n  - `collaborative?: boolean`\n  - `description?: string`\n  - `external_urls?: { published?: boolean; spotify?: string; }`\n  - `href?: string`\n  - `images?: { height: number; url: string; width: number; published?: boolean; }[]`\n  - `items?: { href?: string; published?: boolean; total?: number; }`\n  - `name?: string`\n  - `owner?: { id?: string; external_urls?: { published?: boolean; spotify?: string; }; href?: string; published?: boolean; type?: 'user'; uri?: string; }`\n  - `published?: boolean`\n  - `snapshot_id?: string`\n  - `tracks?: { href?: string; published?: boolean; total?: number; }`\n  - `type?: string`\n  - `uri?: string`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\n// Automatically fetches more pages as needed.\nfor await (const simplifiedPlaylistObject of client.users.playlists.list('smedjan')) {\n  console.log(simplifiedPlaylistObject);\n}\n```",
  },
  {
    name: 'get_featured_playlists',
    endpoint: '/browse/featured-playlists',
    httpMethod: 'get',
    summary: 'Get Featured Playlists\n',
    description:
      "Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).\n",
    stainlessPath: '(resource) browse > (method) get_featured_playlists',
    qualified: 'client.browse.getFeaturedPlaylists',
    params: ['limit?: number;', 'locale?: string;', 'offset?: number;'],
    response:
      '{ message?: string; playlists?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: simplified_playlist_object[]; published?: boolean; }; published?: boolean; }',
    markdown:
      "## get_featured_playlists\n\n`client.browse.getFeaturedPlaylists(limit?: number, locale?: string, offset?: number): { message?: string; playlists?: paging_playlist_object; published?: boolean; }`\n\n**get** `/browse/featured-playlists`\n\nGet a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).\n\n\n### Parameters\n\n- `limit?: number`\n  The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n\n\n- `locale?: string`\n  The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n\n\n- `offset?: number`\n  The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n\n\n### Returns\n\n- `{ message?: string; playlists?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: simplified_playlist_object[]; published?: boolean; }; published?: boolean; }`\n\n  - `message?: string`\n  - `playlists?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { id?: string; collaborative?: boolean; description?: string; external_urls?: external_url_object; href?: string; images?: image_object[]; items?: playlist_tracks_ref_object; name?: string; owner?: playlist_user_object; published?: boolean; snapshot_id?: string; tracks?: playlist_tracks_ref_object; type?: string; uri?: string; }[]; published?: boolean; }`\n  - `published?: boolean`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.browse.getFeaturedPlaylists();\n\nconsole.log(response);\n```",
  },
  {
    name: 'get_new_releases',
    endpoint: '/browse/new-releases',
    httpMethod: 'get',
    summary: 'Get New Releases\n',
    description:
      'Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).\n',
    stainlessPath: '(resource) browse > (method) get_new_releases',
    qualified: 'client.browse.getNewReleases',
    params: ['limit?: number;', 'offset?: number;'],
    response:
      "{ albums: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: simplified_artist_object[]; available_markets: string[]; external_urls: external_url_object; href: string; images: image_object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: album_restriction_object; }[]; published?: boolean; }; }",
    markdown:
      "## get_new_releases\n\n`client.browse.getNewReleases(limit?: number, offset?: number): { albums: object; }`\n\n**get** `/browse/new-releases`\n\nGet a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).\n\n\n### Parameters\n\n- `limit?: number`\n  The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n\n\n- `offset?: number`\n  The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n\n\n### Returns\n\n- `{ albums: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: simplified_artist_object[]; available_markets: string[]; external_urls: external_url_object; href: string; images: image_object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: album_restriction_object; }[]; published?: boolean; }; }`\n\n  - `albums: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets: string[]; external_urls: { published?: boolean; spotify?: string; }; href: string; images: { height: number; url: string; width: number; published?: boolean; }[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: { published?: boolean; reason?: 'market' | 'product' | 'explicit'; }; }[]; published?: boolean; }`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.browse.getNewReleases();\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/browse/categories/{category_id}',
    httpMethod: 'get',
    summary: 'Get Single Browse Category\n',
    description:
      'Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).\n',
    stainlessPath: '(resource) browse.categories > (method) retrieve',
    qualified: 'client.browse.categories.retrieve',
    params: ['category_id: string;', 'locale?: string;'],
    response:
      '{ id: string; href: string; icons: { height: number; url: string; width: number; published?: boolean; }[]; name: string; published?: boolean; }',
    markdown:
      "## retrieve\n\n`client.browse.categories.retrieve(category_id: string, locale?: string): { id: string; href: string; icons: image_object[]; name: string; published?: boolean; }`\n\n**get** `/browse/categories/{category_id}`\n\nGet a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).\n\n\n### Parameters\n\n- `category_id: string`\n  The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n\n\n- `locale?: string`\n  The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n\n\n### Returns\n\n- `{ id: string; href: string; icons: { height: number; url: string; width: number; published?: boolean; }[]; name: string; published?: boolean; }`\n\n  - `id: string`\n  - `href: string`\n  - `icons: { height: number; url: string; width: number; published?: boolean; }[]`\n  - `name: string`\n  - `published?: boolean`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst category = await client.browse.categories.retrieve('dinner');\n\nconsole.log(category);\n```",
  },
  {
    name: 'list',
    endpoint: '/browse/categories',
    httpMethod: 'get',
    summary: 'Get Several Browse Categories\n',
    description:
      'Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).\n',
    stainlessPath: '(resource) browse.categories > (method) list',
    qualified: 'client.browse.categories.list',
    params: ['limit?: number;', 'locale?: string;', 'offset?: number;'],
    response:
      '{ id: string; href: string; icons: { height: number; url: string; width: number; published?: boolean; }[]; name: string; published?: boolean; }',
    markdown:
      "## list\n\n`client.browse.categories.list(limit?: number, locale?: string, offset?: number): { id: string; href: string; icons: image_object[]; name: string; published?: boolean; }`\n\n**get** `/browse/categories`\n\nGet a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).\n\n\n### Parameters\n\n- `limit?: number`\n  The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n\n\n- `locale?: string`\n  The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n\n\n- `offset?: number`\n  The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n\n\n### Returns\n\n- `{ id: string; href: string; icons: { height: number; url: string; width: number; published?: boolean; }[]; name: string; published?: boolean; }`\n\n  - `id: string`\n  - `href: string`\n  - `icons: { height: number; url: string; width: number; published?: boolean; }[]`\n  - `name: string`\n  - `published?: boolean`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\n// Automatically fetches more pages as needed.\nfor await (const categoryListResponse of client.browse.categories.list()) {\n  console.log(categoryListResponse);\n}\n```",
  },
  {
    name: 'get_playlists',
    endpoint: '/browse/categories/{category_id}/playlists',
    httpMethod: 'get',
    summary: "Get Category's Playlists\n",
    description: 'Get a list of Spotify playlists tagged with a particular category.\n',
    stainlessPath: '(resource) browse.categories > (method) get_playlists',
    qualified: 'client.browse.categories.getPlaylists',
    params: ['category_id: string;', 'limit?: number;', 'offset?: number;'],
    response:
      '{ message?: string; playlists?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: simplified_playlist_object[]; published?: boolean; }; published?: boolean; }',
    markdown:
      "## get_playlists\n\n`client.browse.categories.getPlaylists(category_id: string, limit?: number, offset?: number): { message?: string; playlists?: paging_playlist_object; published?: boolean; }`\n\n**get** `/browse/categories/{category_id}/playlists`\n\nGet a list of Spotify playlists tagged with a particular category.\n\n\n### Parameters\n\n- `category_id: string`\n  The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n\n\n- `limit?: number`\n  The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n\n\n- `offset?: number`\n  The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n\n\n### Returns\n\n- `{ message?: string; playlists?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: simplified_playlist_object[]; published?: boolean; }; published?: boolean; }`\n\n  - `message?: string`\n  - `playlists?: { href: string; limit: number; next: string; offset: number; previous: string; total: number; items?: { id?: string; collaborative?: boolean; description?: string; external_urls?: external_url_object; href?: string; images?: image_object[]; items?: playlist_tracks_ref_object; name?: string; owner?: playlist_user_object; published?: boolean; snapshot_id?: string; tracks?: playlist_tracks_ref_object; type?: string; uri?: string; }[]; published?: boolean; }`\n  - `published?: boolean`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.browse.categories.getPlaylists('dinner');\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/audio-features/{id}',
    httpMethod: 'get',
    summary: "Get Track's Audio Features\n",
    description: 'Get audio feature information for a single track identified by its unique\nSpotify ID.\n',
    stainlessPath: '(resource) audio_features > (method) retrieve',
    qualified: 'client.audioFeatures.retrieve',
    params: ['id: string;'],
    response:
      "{ id?: string; acousticness?: number; analysis_url?: string; danceability?: number; duration_ms?: number; energy?: number; instrumentalness?: number; key?: number; liveness?: number; loudness?: number; mode?: number; published?: boolean; speechiness?: number; tempo?: number; time_signature?: number; track_href?: string; type?: 'audio_features'; uri?: string; valence?: number; }",
    markdown:
      "## retrieve\n\n`client.audioFeatures.retrieve(id: string): { id?: string; acousticness?: number; analysis_url?: string; danceability?: number; duration_ms?: number; energy?: number; instrumentalness?: number; key?: number; liveness?: number; loudness?: number; mode?: number; published?: boolean; speechiness?: number; tempo?: number; time_signature?: number; track_href?: string; type?: 'audio_features'; uri?: string; valence?: number; }`\n\n**get** `/audio-features/{id}`\n\nGet audio feature information for a single track identified by its unique\nSpotify ID.\n\n\n### Parameters\n\n- `id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n\n\n### Returns\n\n- `{ id?: string; acousticness?: number; analysis_url?: string; danceability?: number; duration_ms?: number; energy?: number; instrumentalness?: number; key?: number; liveness?: number; loudness?: number; mode?: number; published?: boolean; speechiness?: number; tempo?: number; time_signature?: number; track_href?: string; type?: 'audio_features'; uri?: string; valence?: number; }`\n\n  - `id?: string`\n  - `acousticness?: number`\n  - `analysis_url?: string`\n  - `danceability?: number`\n  - `duration_ms?: number`\n  - `energy?: number`\n  - `instrumentalness?: number`\n  - `key?: number`\n  - `liveness?: number`\n  - `loudness?: number`\n  - `mode?: number`\n  - `published?: boolean`\n  - `speechiness?: number`\n  - `tempo?: number`\n  - `time_signature?: number`\n  - `track_href?: string`\n  - `type?: 'audio_features'`\n  - `uri?: string`\n  - `valence?: number`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst audioFeature = await client.audioFeatures.retrieve('11dFghVXANMlKmJXsNCbNl');\n\nconsole.log(audioFeature);\n```",
  },
  {
    name: 'bulk_retrieve',
    endpoint: '/audio-features',
    httpMethod: 'get',
    summary: "Get Several Tracks' Audio Features\n",
    description: 'Get audio features for multiple tracks based on their Spotify IDs.\n',
    stainlessPath: '(resource) audio_features > (method) bulk_retrieve',
    qualified: 'client.audioFeatures.bulkRetrieve',
    params: ['ids: string;'],
    response:
      "{ audio_features: { id?: string; acousticness?: number; analysis_url?: string; danceability?: number; duration_ms?: number; energy?: number; instrumentalness?: number; key?: number; liveness?: number; loudness?: number; mode?: number; published?: boolean; speechiness?: number; tempo?: number; time_signature?: number; track_href?: string; type?: 'audio_features'; uri?: string; valence?: number; }[]; }",
    markdown:
      "## bulk_retrieve\n\n`client.audioFeatures.bulkRetrieve(ids: string): { audio_features: object[]; }`\n\n**get** `/audio-features`\n\nGet audio features for multiple tracks based on their Spotify IDs.\n\n\n### Parameters\n\n- `ids: string`\n  A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n\n\n### Returns\n\n- `{ audio_features: { id?: string; acousticness?: number; analysis_url?: string; danceability?: number; duration_ms?: number; energy?: number; instrumentalness?: number; key?: number; liveness?: number; loudness?: number; mode?: number; published?: boolean; speechiness?: number; tempo?: number; time_signature?: number; track_href?: string; type?: 'audio_features'; uri?: string; valence?: number; }[]; }`\n\n  - `audio_features: { id?: string; acousticness?: number; analysis_url?: string; danceability?: number; duration_ms?: number; energy?: number; instrumentalness?: number; key?: number; liveness?: number; loudness?: number; mode?: number; published?: boolean; speechiness?: number; tempo?: number; time_signature?: number; track_href?: string; type?: 'audio_features'; uri?: string; valence?: number; }[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.audioFeatures.bulkRetrieve({ ids: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/audio-analysis/{id}',
    httpMethod: 'get',
    summary: "Get Track's Audio Analysis\n",
    description:
      'Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre.\n',
    stainlessPath: '(resource) audio_analysis > (method) retrieve',
    qualified: 'client.audioAnalysis.retrieve',
    params: ['id: string;'],
    response:
      '{ bars?: time_interval_object[]; beats?: time_interval_object[]; meta?: object; published?: boolean; sections?: object[]; segments?: object[]; tatums?: time_interval_object[]; track?: object; }',
    markdown:
      "## retrieve\n\n`client.audioAnalysis.retrieve(id: string): { bars?: time_interval_object[]; beats?: time_interval_object[]; meta?: object; published?: boolean; sections?: object[]; segments?: object[]; tatums?: time_interval_object[]; track?: object; }`\n\n**get** `/audio-analysis/{id}`\n\nGet a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre.\n\n\n### Parameters\n\n- `id: string`\n  The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n\n\n### Returns\n\n- `{ bars?: { confidence?: number; duration?: number; published?: boolean; start?: number; }[]; beats?: { confidence?: number; duration?: number; published?: boolean; start?: number; }[]; meta?: { analysis_time?: number; analyzer_version?: string; detailed_status?: string; input_process?: string; platform?: string; status_code?: number; timestamp?: number; }; published?: boolean; sections?: { confidence?: number; duration?: number; key?: number; key_confidence?: number; loudness?: number; mode?: -1 | 0 | 1; mode_confidence?: number; published?: boolean; start?: number; tempo?: number; tempo_confidence?: number; time_signature?: number; time_signature_confidence?: number; }[]; segments?: { confidence?: number; duration?: number; loudness_end?: number; loudness_max?: number; loudness_max_time?: number; loudness_start?: number; pitches?: number[]; published?: boolean; start?: number; timbre?: number[]; }[]; tatums?: { confidence?: number; duration?: number; published?: boolean; start?: number; }[]; track?: { analysis_channels?: number; analysis_sample_rate?: number; code_version?: number; codestring?: string; duration?: number; echoprint_version?: number; echoprintstring?: string; end_of_fade_in?: number; key?: number; key_confidence?: number; loudness?: number; mode?: number; mode_confidence?: number; num_samples?: number; offset_seconds?: number; rhythm_version?: number; rhythmstring?: string; sample_md5?: string; start_of_fade_out?: number; synch_version?: number; synchstring?: string; tempo?: number; tempo_confidence?: number; time_signature?: number; time_signature_confidence?: number; window_seconds?: number; }; }`\n\n  - `bars?: { confidence?: number; duration?: number; published?: boolean; start?: number; }[]`\n  - `beats?: { confidence?: number; duration?: number; published?: boolean; start?: number; }[]`\n  - `meta?: { analysis_time?: number; analyzer_version?: string; detailed_status?: string; input_process?: string; platform?: string; status_code?: number; timestamp?: number; }`\n  - `published?: boolean`\n  - `sections?: { confidence?: number; duration?: number; key?: number; key_confidence?: number; loudness?: number; mode?: -1 | 0 | 1; mode_confidence?: number; published?: boolean; start?: number; tempo?: number; tempo_confidence?: number; time_signature?: number; time_signature_confidence?: number; }[]`\n  - `segments?: { confidence?: number; duration?: number; loudness_end?: number; loudness_max?: number; loudness_max_time?: number; loudness_start?: number; pitches?: number[]; published?: boolean; start?: number; timbre?: number[]; }[]`\n  - `tatums?: { confidence?: number; duration?: number; published?: boolean; start?: number; }[]`\n  - `track?: { analysis_channels?: number; analysis_sample_rate?: number; code_version?: number; codestring?: string; duration?: number; echoprint_version?: number; echoprintstring?: string; end_of_fade_in?: number; key?: number; key_confidence?: number; loudness?: number; mode?: number; mode_confidence?: number; num_samples?: number; offset_seconds?: number; rhythm_version?: number; rhythmstring?: string; sample_md5?: string; start_of_fade_out?: number; synch_version?: number; synchstring?: string; tempo?: number; tempo_confidence?: number; time_signature?: number; time_signature_confidence?: number; window_seconds?: number; }`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst audioAnalysis = await client.audioAnalysis.retrieve('11dFghVXANMlKmJXsNCbNl');\n\nconsole.log(audioAnalysis);\n```",
  },
  {
    name: 'get',
    endpoint: '/recommendations',
    httpMethod: 'get',
    summary: 'Get Recommendations\n',
    description:
      'Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.\n\nFor artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.\n',
    stainlessPath: '(resource) recommendations > (method) get',
    qualified: 'client.recommendations.get',
    params: [
      'limit?: number;',
      'market?: string;',
      'max_acousticness?: number;',
      'max_danceability?: number;',
      'max_duration_ms?: number;',
      'max_energy?: number;',
      'max_instrumentalness?: number;',
      'max_key?: number;',
      'max_liveness?: number;',
      'max_loudness?: number;',
      'max_mode?: number;',
      'max_popularity?: number;',
      'max_speechiness?: number;',
      'max_tempo?: number;',
      'max_time_signature?: number;',
      'max_valence?: number;',
      'min_acousticness?: number;',
      'min_danceability?: number;',
      'min_duration_ms?: number;',
      'min_energy?: number;',
      'min_instrumentalness?: number;',
      'min_key?: number;',
      'min_liveness?: number;',
      'min_loudness?: number;',
      'min_mode?: number;',
      'min_popularity?: number;',
      'min_speechiness?: number;',
      'min_tempo?: number;',
      'min_time_signature?: number;',
      'min_valence?: number;',
      'seed_artists?: string;',
      'seed_genres?: string;',
      'seed_tracks?: string;',
      'target_acousticness?: number;',
      'target_danceability?: number;',
      'target_duration_ms?: number;',
      'target_energy?: number;',
      'target_instrumentalness?: number;',
      'target_key?: number;',
      'target_liveness?: number;',
      'target_loudness?: number;',
      'target_mode?: number;',
      'target_popularity?: number;',
      'target_speechiness?: number;',
      'target_tempo?: number;',
      'target_time_signature?: number;',
      'target_valence?: number;',
    ],
    response:
      "{ seeds: { id?: string; afterFilteringSize?: number; afterRelinkingSize?: number; href?: string; initialPoolSize?: number; published?: boolean; type?: string; }[]; tracks: { id?: string; album?: object; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: external_id_object; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: 'track'; uri?: string; }[]; published?: boolean; }",
    markdown:
      "## get\n\n`client.recommendations.get(limit?: number, market?: string, max_acousticness?: number, max_danceability?: number, max_duration_ms?: number, max_energy?: number, max_instrumentalness?: number, max_key?: number, max_liveness?: number, max_loudness?: number, max_mode?: number, max_popularity?: number, max_speechiness?: number, max_tempo?: number, max_time_signature?: number, max_valence?: number, min_acousticness?: number, min_danceability?: number, min_duration_ms?: number, min_energy?: number, min_instrumentalness?: number, min_key?: number, min_liveness?: number, min_loudness?: number, min_mode?: number, min_popularity?: number, min_speechiness?: number, min_tempo?: number, min_time_signature?: number, min_valence?: number, seed_artists?: string, seed_genres?: string, seed_tracks?: string, target_acousticness?: number, target_danceability?: number, target_duration_ms?: number, target_energy?: number, target_instrumentalness?: number, target_key?: number, target_liveness?: number, target_loudness?: number, target_mode?: number, target_popularity?: number, target_speechiness?: number, target_tempo?: number, target_time_signature?: number, target_valence?: number): { seeds: object[]; tracks: track_object[]; published?: boolean; }`\n\n**get** `/recommendations`\n\nRecommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.\n\nFor artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.\n\n\n### Parameters\n\n- `limit?: number`\n  The target size of the list of recommended tracks. For seeds with unusually small pools or when highly restrictive filtering is applied, it may be impossible to generate the requested number of recommended tracks. Debugging information for such cases is available in the response. Default: 20\\. Minimum: 1\\. Maximum: 100.\n\n\n- `market?: string`\n  An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n\n\n- `max_acousticness?: number`\n  For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n\n\n- `max_danceability?: number`\n  For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n\n\n- `max_duration_ms?: number`\n  For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n\n\n- `max_energy?: number`\n  For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n\n\n- `max_instrumentalness?: number`\n  For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n\n\n- `max_key?: number`\n  For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n\n\n- `max_liveness?: number`\n  For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n\n\n- `max_loudness?: number`\n  For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n\n\n- `max_mode?: number`\n  For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n\n\n- `max_popularity?: number`\n  For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n\n\n- `max_speechiness?: number`\n  For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n\n\n- `max_tempo?: number`\n  For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n\n\n- `max_time_signature?: number`\n  For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n\n\n- `max_valence?: number`\n  For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n\n\n- `min_acousticness?: number`\n  For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n\n\n- `min_danceability?: number`\n  For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n\n\n- `min_duration_ms?: number`\n  For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n\n\n- `min_energy?: number`\n  For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n\n\n- `min_instrumentalness?: number`\n  For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n\n\n- `min_key?: number`\n  For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n\n\n- `min_liveness?: number`\n  For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n\n\n- `min_loudness?: number`\n  For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n\n\n- `min_mode?: number`\n  For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n\n\n- `min_popularity?: number`\n  For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n\n\n- `min_speechiness?: number`\n  For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n\n\n- `min_tempo?: number`\n  For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n\n\n- `min_time_signature?: number`\n  For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n\n\n- `min_valence?: number`\n  For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n\n\n- `seed_artists?: string`\n  A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for seed artists.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_genres` and `seed_tracks` are not set_.\n\n\n- `seed_genres?: string`\n  A comma separated list of any genres in the set of [available genre seeds](/documentation/web-api/reference/get-recommendation-genres). Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_tracks` are not set_.\n\n\n- `seed_tracks?: string`\n  A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for a seed track.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_genres` are not set_.\n\n\n- `target_acousticness?: number`\n  For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n\n\n- `target_danceability?: number`\n  For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n\n\n- `target_duration_ms?: number`\n  Target duration of the track (ms)\n\n- `target_energy?: number`\n  For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n\n\n- `target_instrumentalness?: number`\n  For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n\n\n- `target_key?: number`\n  For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n\n\n- `target_liveness?: number`\n  For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n\n\n- `target_loudness?: number`\n  For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n\n\n- `target_mode?: number`\n  For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n\n\n- `target_popularity?: number`\n  For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n\n\n- `target_speechiness?: number`\n  For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n\n\n- `target_tempo?: number`\n  Target tempo (BPM)\n\n- `target_time_signature?: number`\n  For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n\n\n- `target_valence?: number`\n  For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n\n\n### Returns\n\n- `{ seeds: { id?: string; afterFilteringSize?: number; afterRelinkingSize?: number; href?: string; initialPoolSize?: number; published?: boolean; type?: string; }[]; tracks: { id?: string; album?: object; artists?: simplified_artist_object[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: external_id_object; external_urls?: external_url_object; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: linked_track_object; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: track_restriction_object; track_number?: number; type?: 'track'; uri?: string; }[]; published?: boolean; }`\n\n  - `seeds: { id?: string; afterFilteringSize?: number; afterRelinkingSize?: number; href?: string; initialPoolSize?: number; published?: boolean; type?: string; }[]`\n  - `tracks: { id?: string; album?: { id: string; album_type: 'album' | 'single' | 'compilation'; artists: object[]; available_markets: string[]; external_urls: object; href: string; images: object[]; name: string; release_date: string; release_date_precision: 'year' | 'month' | 'day'; total_tracks: number; type: 'album'; uri: string; published?: boolean; restrictions?: object; }; artists?: { id?: string; external_urls?: external_url_object; href?: string; name?: string; published?: boolean; type?: 'artist'; uri?: string; }[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: { ean?: string; isrc?: string; published?: boolean; upc?: string; }; external_urls?: { published?: boolean; spotify?: string; }; href?: string; is_local?: boolean; is_playable?: boolean; linked_from?: { id?: string; external_urls?: external_url_object; href?: string; published?: boolean; type?: string; uri?: string; }; name?: string; popularity?: number; preview_url?: string; published?: boolean; restrictions?: { published?: boolean; reason?: string; }; track_number?: number; type?: 'track'; uri?: string; }[]`\n  - `published?: boolean`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst recommendation = await client.recommendations.get();\n\nconsole.log(recommendation);\n```",
  },
  {
    name: 'list_available_genre_seeds',
    endpoint: '/recommendations/available-genre-seeds',
    httpMethod: 'get',
    summary: 'Get Available Genre Seeds\n',
    description:
      'Retrieve a list of available genres seed parameter values for [recommendations](/documentation/web-api/reference/get-recommendations).\n',
    stainlessPath: '(resource) recommendations > (method) list_available_genre_seeds',
    qualified: 'client.recommendations.listAvailableGenreSeeds',
    response: '{ genres: string[]; }',
    markdown:
      "## list_available_genre_seeds\n\n`client.recommendations.listAvailableGenreSeeds(): { genres: string[]; }`\n\n**get** `/recommendations/available-genre-seeds`\n\nRetrieve a list of available genres seed parameter values for [recommendations](/documentation/web-api/reference/get-recommendations).\n\n\n### Returns\n\n- `{ genres: string[]; }`\n\n  - `genres: string[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst response = await client.recommendations.listAvailableGenreSeeds();\n\nconsole.log(response);\n```",
  },
  {
    name: 'list',
    endpoint: '/markets',
    httpMethod: 'get',
    summary: 'Get Available Markets\n',
    description: 'Get the list of markets where Spotify is available.\n',
    stainlessPath: '(resource) markets > (method) list',
    qualified: 'client.markets.list',
    response: '{ markets?: string[]; }',
    markdown:
      "## list\n\n`client.markets.list(): { markets?: string[]; }`\n\n**get** `/markets`\n\nGet the list of markets where Spotify is available.\n\n\n### Returns\n\n- `{ markets?: string[]; }`\n\n  - `markets?: string[]`\n\n### Example\n\n```typescript\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted();\n\nconst markets = await client.markets.list();\n\nconsole.log(markets);\n```",
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}

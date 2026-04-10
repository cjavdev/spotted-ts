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
    perLanguage: {
      cli: {
        method: 'albums retrieve',
        example:
          "spotted albums retrieve \\\n  --access-token 'My Access Token' \\\n  --id 4aawyAB9vmqN3uQ7FjRGTy",
      },
      csharp: {
        method: 'Albums.Retrieve',
        example:
          'AlbumRetrieveParams parameters = new() { ID = "4aawyAB9vmqN3uQ7FjRGTy" };\n\nvar album = await client.Albums.Retrieve(parameters);\n\nConsole.WriteLine(album);',
      },
      go: {
        method: 'client.Albums.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\talbum, err := client.Albums.Get(\n\t\tcontext.TODO(),\n\t\t"4aawyAB9vmqN3uQ7FjRGTy",\n\t\tspotted.AlbumGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", album.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/albums/$ID \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'albums().retrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.albums.AlbumRetrieveParams;\nimport dev.cjav.spotted.models.albums.AlbumRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        AlbumRetrieveResponse album = client.albums().retrieve("4aawyAB9vmqN3uQ7FjRGTy");\n    }\n}',
      },
      kotlin: {
        method: 'albums().retrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.albums.AlbumRetrieveParams\nimport dev.cjav.spotted.models.albums.AlbumRetrieveResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val album: AlbumRetrieveResponse = client.albums().retrieve("4aawyAB9vmqN3uQ7FjRGTy")\n}',
      },
      php: {
        method: 'albums->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$album = $client->albums->retrieve('4aawyAB9vmqN3uQ7FjRGTy', market: 'ES');\n\nvar_dump($album);",
      },
      python: {
        method: 'albums.retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nalbum = client.albums.retrieve(\n    id="4aawyAB9vmqN3uQ7FjRGTy",\n)\nprint(album.id)',
      },
      ruby: {
        method: 'albums.retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nalbum = spotted.albums.retrieve("4aawyAB9vmqN3uQ7FjRGTy")\n\nputs(album)',
      },
      typescript: {
        method: 'client.albums.retrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst album = await client.albums.retrieve('4aawyAB9vmqN3uQ7FjRGTy');\n\nconsole.log(album.id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'albums bulk_retrieve',
        example:
          "spotted albums bulk-retrieve \\\n  --access-token 'My Access Token' \\\n  --ids 382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc",
      },
      csharp: {
        method: 'Albums.BulkRetrieve',
        example:
          'AlbumBulkRetrieveParams parameters = new()\n{\n    Ids = "382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc"\n};\n\nvar response = await client.Albums.BulkRetrieve(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Albums.BulkGet',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Albums.BulkGet(context.TODO(), spotted.AlbumBulkGetParams{\n\t\tIDs: "382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Albums)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/albums \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'albums().bulkRetrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.albums.AlbumBulkRetrieveParams;\nimport dev.cjav.spotted.models.albums.AlbumBulkRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        AlbumBulkRetrieveParams params = AlbumBulkRetrieveParams.builder()\n            .ids("382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc")\n            .build();\n        AlbumBulkRetrieveResponse response = client.albums().bulkRetrieve(params);\n    }\n}',
      },
      kotlin: {
        method: 'albums().bulkRetrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.albums.AlbumBulkRetrieveParams\nimport dev.cjav.spotted.models.albums.AlbumBulkRetrieveResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: AlbumBulkRetrieveParams = AlbumBulkRetrieveParams.builder()\n        .ids("382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc")\n        .build()\n    val response: AlbumBulkRetrieveResponse = client.albums().bulkRetrieve(params)\n}',
      },
      php: {
        method: 'albums->bulkRetrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->albums->bulkRetrieve(\n  ids: '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc',\n  market: 'ES',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'albums.bulk_retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.albums.bulk_retrieve(\n    ids="382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc",\n)\nprint(response.albums)',
      },
      ruby: {
        method: 'albums.bulk_retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.albums.bulk_retrieve(ids: "382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc")\n\nputs(response)',
      },
      typescript: {
        method: 'client.albums.bulkRetrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.albums.bulkRetrieve({\n  ids: '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc',\n});\n\nconsole.log(response.albums);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'albums list_tracks',
        example:
          "spotted albums list-tracks \\\n  --access-token 'My Access Token' \\\n  --id 4aawyAB9vmqN3uQ7FjRGTy",
      },
      csharp: {
        method: 'Albums.ListTracks',
        example:
          'AlbumListTracksParams parameters = new() { ID = "4aawyAB9vmqN3uQ7FjRGTy" };\n\nvar page = await client.Albums.ListTracks(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Albums.ListTracks',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Albums.ListTracks(\n\t\tcontext.TODO(),\n\t\t"4aawyAB9vmqN3uQ7FjRGTy",\n\t\tspotted.AlbumListTracksParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/albums/$ID/tracks \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'albums().listTracks',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.albums.AlbumListTracksPage;\nimport dev.cjav.spotted.models.albums.AlbumListTracksParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        AlbumListTracksPage page = client.albums().listTracks("4aawyAB9vmqN3uQ7FjRGTy");\n    }\n}',
      },
      kotlin: {
        method: 'albums().listTracks',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.albums.AlbumListTracksPage\nimport dev.cjav.spotted.models.albums.AlbumListTracksParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val page: AlbumListTracksPage = client.albums().listTracks("4aawyAB9vmqN3uQ7FjRGTy")\n}',
      },
      php: {
        method: 'albums->listTracks',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->albums->listTracks(\n  '4aawyAB9vmqN3uQ7FjRGTy', limit: 10, market: 'ES', offset: 5\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'albums.list_tracks',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.albums.list_tracks(\n    id="4aawyAB9vmqN3uQ7FjRGTy",\n)\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'albums.list_tracks',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\npage = spotted.albums.list_tracks("4aawyAB9vmqN3uQ7FjRGTy")\n\nputs(page)',
      },
      typescript: {
        method: 'client.albums.listTracks',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const simplifiedTrackObject of client.albums.listTracks('4aawyAB9vmqN3uQ7FjRGTy')) {\n  console.log(simplifiedTrackObject.id);\n}",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'artists retrieve',
        example:
          "spotted artists retrieve \\\n  --access-token 'My Access Token' \\\n  --id 0TnOYISbd1XYRBk9myaseg",
      },
      csharp: {
        method: 'Artists.Retrieve',
        example:
          'ArtistRetrieveParams parameters = new() { ID = "0TnOYISbd1XYRBk9myaseg" };\n\nvar artistObject = await client.Artists.Retrieve(parameters);\n\nConsole.WriteLine(artistObject);',
      },
      go: {
        method: 'client.Artists.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tartistObject, err := client.Artists.Get(context.TODO(), "0TnOYISbd1XYRBk9myaseg")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", artistObject.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/artists/$ID \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'artists().retrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.ArtistObject;\nimport dev.cjav.spotted.models.artists.ArtistRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        ArtistObject artistObject = client.artists().retrieve("0TnOYISbd1XYRBk9myaseg");\n    }\n}',
      },
      kotlin: {
        method: 'artists().retrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.ArtistObject\nimport dev.cjav.spotted.models.artists.ArtistRetrieveParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val artistObject: ArtistObject = client.artists().retrieve("0TnOYISbd1XYRBk9myaseg")\n}',
      },
      php: {
        method: 'artists->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$artistObject = $client->artists->retrieve('0TnOYISbd1XYRBk9myaseg');\n\nvar_dump($artistObject);",
      },
      python: {
        method: 'artists.retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nartist_object = client.artists.retrieve(\n    "0TnOYISbd1XYRBk9myaseg",\n)\nprint(artist_object.id)',
      },
      ruby: {
        method: 'artists.retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nartist_object = spotted.artists.retrieve("0TnOYISbd1XYRBk9myaseg")\n\nputs(artist_object)',
      },
      typescript: {
        method: 'client.artists.retrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst artistObject = await client.artists.retrieve('0TnOYISbd1XYRBk9myaseg');\n\nconsole.log(artistObject.id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'artists bulk_retrieve',
        example:
          "spotted artists bulk-retrieve \\\n  --access-token 'My Access Token' \\\n  --ids 2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6",
      },
      csharp: {
        method: 'Artists.BulkRetrieve',
        example:
          'ArtistBulkRetrieveParams parameters = new()\n{\n    Ids = "2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6"\n};\n\nvar response = await client.Artists.BulkRetrieve(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Artists.BulkGet',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Artists.BulkGet(context.TODO(), spotted.ArtistBulkGetParams{\n\t\tIDs: "2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Artists)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/artists \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'artists().bulkRetrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.artists.ArtistBulkRetrieveParams;\nimport dev.cjav.spotted.models.artists.ArtistBulkRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        ArtistBulkRetrieveParams params = ArtistBulkRetrieveParams.builder()\n            .ids("2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6")\n            .build();\n        ArtistBulkRetrieveResponse response = client.artists().bulkRetrieve(params);\n    }\n}',
      },
      kotlin: {
        method: 'artists().bulkRetrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.artists.ArtistBulkRetrieveParams\nimport dev.cjav.spotted.models.artists.ArtistBulkRetrieveResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: ArtistBulkRetrieveParams = ArtistBulkRetrieveParams.builder()\n        .ids("2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6")\n        .build()\n    val response: ArtistBulkRetrieveResponse = client.artists().bulkRetrieve(params)\n}',
      },
      php: {
        method: 'artists->bulkRetrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->artists->bulkRetrieve(\n  ids: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'artists.bulk_retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.artists.bulk_retrieve(\n    ids="2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6",\n)\nprint(response.artists)',
      },
      ruby: {
        method: 'artists.bulk_retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.artists.bulk_retrieve(ids: "2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6")\n\nputs(response)',
      },
      typescript: {
        method: 'client.artists.bulkRetrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.artists.bulkRetrieve({\n  ids: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',\n});\n\nconsole.log(response.artists);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'artists list_albums',
        example:
          "spotted artists list-albums \\\n  --access-token 'My Access Token' \\\n  --id 0TnOYISbd1XYRBk9myaseg",
      },
      csharp: {
        method: 'Artists.ListAlbums',
        example:
          'ArtistListAlbumsParams parameters = new() { ID = "0TnOYISbd1XYRBk9myaseg" };\n\nvar page = await client.Artists.ListAlbums(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Artists.ListAlbums',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Artists.ListAlbums(\n\t\tcontext.TODO(),\n\t\t"0TnOYISbd1XYRBk9myaseg",\n\t\tspotted.ArtistListAlbumsParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/artists/$ID/albums \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'artists().listAlbums',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.artists.ArtistListAlbumsPage;\nimport dev.cjav.spotted.models.artists.ArtistListAlbumsParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        ArtistListAlbumsPage page = client.artists().listAlbums("0TnOYISbd1XYRBk9myaseg");\n    }\n}',
      },
      kotlin: {
        method: 'artists().listAlbums',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.artists.ArtistListAlbumsPage\nimport dev.cjav.spotted.models.artists.ArtistListAlbumsParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val page: ArtistListAlbumsPage = client.artists().listAlbums("0TnOYISbd1XYRBk9myaseg")\n}',
      },
      php: {
        method: 'artists->listAlbums',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->artists->listAlbums(\n  '0TnOYISbd1XYRBk9myaseg',\n  includeGroups: 'single,appears_on',\n  limit: 5,\n  market: 'ES',\n  offset: 5,\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'artists.list_albums',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.artists.list_albums(\n    id="0TnOYISbd1XYRBk9myaseg",\n)\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'artists.list_albums',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\npage = spotted.artists.list_albums("0TnOYISbd1XYRBk9myaseg")\n\nputs(page)',
      },
      typescript: {
        method: 'client.artists.listAlbums',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const artistListAlbumsResponse of client.artists.listAlbums('0TnOYISbd1XYRBk9myaseg')) {\n  console.log(artistListAlbumsResponse.id);\n}",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'artists top_tracks',
        example:
          "spotted artists top-tracks \\\n  --access-token 'My Access Token' \\\n  --id 0TnOYISbd1XYRBk9myaseg",
      },
      csharp: {
        method: 'Artists.TopTracks',
        example:
          'ArtistTopTracksParams parameters = new() { ID = "0TnOYISbd1XYRBk9myaseg" };\n\nvar response = await client.Artists.TopTracks(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Artists.TopTracks',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Artists.TopTracks(\n\t\tcontext.TODO(),\n\t\t"0TnOYISbd1XYRBk9myaseg",\n\t\tspotted.ArtistTopTracksParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Tracks)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/artists/$ID/top-tracks \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'artists().topTracks',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.artists.ArtistTopTracksParams;\nimport dev.cjav.spotted.models.artists.ArtistTopTracksResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        ArtistTopTracksResponse response = client.artists().topTracks("0TnOYISbd1XYRBk9myaseg");\n    }\n}',
      },
      kotlin: {
        method: 'artists().topTracks',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.artists.ArtistTopTracksParams\nimport dev.cjav.spotted.models.artists.ArtistTopTracksResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val response: ArtistTopTracksResponse = client.artists().topTracks("0TnOYISbd1XYRBk9myaseg")\n}',
      },
      php: {
        method: 'artists->topTracks',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->artists->topTracks('0TnOYISbd1XYRBk9myaseg', market: 'ES');\n\nvar_dump($response);",
      },
      python: {
        method: 'artists.top_tracks',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.artists.top_tracks(\n    id="0TnOYISbd1XYRBk9myaseg",\n)\nprint(response.tracks)',
      },
      ruby: {
        method: 'artists.top_tracks',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.artists.top_tracks("0TnOYISbd1XYRBk9myaseg")\n\nputs(response)',
      },
      typescript: {
        method: 'client.artists.topTracks',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.artists.topTracks('0TnOYISbd1XYRBk9myaseg');\n\nconsole.log(response.tracks);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'artists list_related_artists',
        example:
          "spotted artists list-related-artists \\\n  --access-token 'My Access Token' \\\n  --id 0TnOYISbd1XYRBk9myaseg",
      },
      csharp: {
        method: 'Artists.ListRelatedArtists',
        example:
          'ArtistListRelatedArtistsParams parameters = new()\n{\n    ID = "0TnOYISbd1XYRBk9myaseg"\n};\n\nvar response = await client.Artists.ListRelatedArtists(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Artists.ListRelatedArtists',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Artists.ListRelatedArtists(context.TODO(), "0TnOYISbd1XYRBk9myaseg")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Artists)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/artists/$ID/related-artists \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'artists().listRelatedArtists',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.artists.ArtistListRelatedArtistsParams;\nimport dev.cjav.spotted.models.artists.ArtistListRelatedArtistsResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        ArtistListRelatedArtistsResponse response = client.artists().listRelatedArtists("0TnOYISbd1XYRBk9myaseg");\n    }\n}',
      },
      kotlin: {
        method: 'artists().listRelatedArtists',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.artists.ArtistListRelatedArtistsParams\nimport dev.cjav.spotted.models.artists.ArtistListRelatedArtistsResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val response: ArtistListRelatedArtistsResponse = client.artists().listRelatedArtists("0TnOYISbd1XYRBk9myaseg")\n}',
      },
      php: {
        method: 'artists->listRelatedArtists',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->artists->listRelatedArtists('0TnOYISbd1XYRBk9myaseg');\n\nvar_dump($response);",
      },
      python: {
        method: 'artists.list_related_artists',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.artists.list_related_artists(\n    "0TnOYISbd1XYRBk9myaseg",\n)\nprint(response.artists)',
      },
      ruby: {
        method: 'artists.list_related_artists',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.artists.list_related_artists("0TnOYISbd1XYRBk9myaseg")\n\nputs(response)',
      },
      typescript: {
        method: 'client.artists.listRelatedArtists',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.artists.listRelatedArtists('0TnOYISbd1XYRBk9myaseg');\n\nconsole.log(response.artists);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'shows retrieve',
        example:
          "spotted shows retrieve \\\n  --access-token 'My Access Token' \\\n  --id 38bS44xjbVVZ3No3ByF1dJ",
      },
      csharp: {
        method: 'Shows.Retrieve',
        example:
          'ShowRetrieveParams parameters = new() { ID = "38bS44xjbVVZ3No3ByF1dJ" };\n\nvar show = await client.Shows.Retrieve(parameters);\n\nConsole.WriteLine(show);',
      },
      go: {
        method: 'client.Shows.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tshow, err := client.Shows.Get(\n\t\tcontext.TODO(),\n\t\t"38bS44xjbVVZ3No3ByF1dJ",\n\t\tspotted.ShowGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", show)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/shows/$ID \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'shows().retrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.shows.ShowRetrieveParams;\nimport dev.cjav.spotted.models.shows.ShowRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        ShowRetrieveResponse show = client.shows().retrieve("38bS44xjbVVZ3No3ByF1dJ");\n    }\n}',
      },
      kotlin: {
        method: 'shows().retrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.shows.ShowRetrieveParams\nimport dev.cjav.spotted.models.shows.ShowRetrieveResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val show: ShowRetrieveResponse = client.shows().retrieve("38bS44xjbVVZ3No3ByF1dJ")\n}',
      },
      php: {
        method: 'shows->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$show = $client->shows->retrieve('38bS44xjbVVZ3No3ByF1dJ', market: 'ES');\n\nvar_dump($show);",
      },
      python: {
        method: 'shows.retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nshow = client.shows.retrieve(\n    id="38bS44xjbVVZ3No3ByF1dJ",\n)\nprint(show)',
      },
      ruby: {
        method: 'shows.retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nshow = spotted.shows.retrieve("38bS44xjbVVZ3No3ByF1dJ")\n\nputs(show)',
      },
      typescript: {
        method: 'client.shows.retrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst show = await client.shows.retrieve('38bS44xjbVVZ3No3ByF1dJ');\n\nconsole.log(show);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'shows bulk_retrieve',
        example:
          "spotted shows bulk-retrieve \\\n  --access-token 'My Access Token' \\\n  --ids 5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ",
      },
      csharp: {
        method: 'Shows.BulkRetrieve',
        example:
          'ShowBulkRetrieveParams parameters = new()\n{\n    Ids = "5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ"\n};\n\nvar response = await client.Shows.BulkRetrieve(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Shows.BulkGet',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Shows.BulkGet(context.TODO(), spotted.ShowBulkGetParams{\n\t\tIDs: "5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Shows)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/shows \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'shows().bulkRetrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.shows.ShowBulkRetrieveParams;\nimport dev.cjav.spotted.models.shows.ShowBulkRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        ShowBulkRetrieveParams params = ShowBulkRetrieveParams.builder()\n            .ids("5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ")\n            .build();\n        ShowBulkRetrieveResponse response = client.shows().bulkRetrieve(params);\n    }\n}',
      },
      kotlin: {
        method: 'shows().bulkRetrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.shows.ShowBulkRetrieveParams\nimport dev.cjav.spotted.models.shows.ShowBulkRetrieveResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: ShowBulkRetrieveParams = ShowBulkRetrieveParams.builder()\n        .ids("5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ")\n        .build()\n    val response: ShowBulkRetrieveResponse = client.shows().bulkRetrieve(params)\n}',
      },
      php: {
        method: 'shows->bulkRetrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->shows->bulkRetrieve(\n  ids: '5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ', market: 'ES'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'shows.bulk_retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.shows.bulk_retrieve(\n    ids="5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ",\n)\nprint(response.shows)',
      },
      ruby: {
        method: 'shows.bulk_retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.shows.bulk_retrieve(ids: "5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ")\n\nputs(response)',
      },
      typescript: {
        method: 'client.shows.bulkRetrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.shows.bulkRetrieve({\n  ids: '5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ',\n});\n\nconsole.log(response.shows);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'shows list_episodes',
        example:
          "spotted shows list-episodes \\\n  --access-token 'My Access Token' \\\n  --id 38bS44xjbVVZ3No3ByF1dJ",
      },
      csharp: {
        method: 'Shows.ListEpisodes',
        example:
          'ShowListEpisodesParams parameters = new() { ID = "38bS44xjbVVZ3No3ByF1dJ" };\n\nvar page = await client.Shows.ListEpisodes(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Shows.ListEpisodes',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Shows.ListEpisodes(\n\t\tcontext.TODO(),\n\t\t"38bS44xjbVVZ3No3ByF1dJ",\n\t\tspotted.ShowListEpisodesParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/shows/$ID/episodes \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'shows().listEpisodes',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.shows.ShowListEpisodesPage;\nimport dev.cjav.spotted.models.shows.ShowListEpisodesParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        ShowListEpisodesPage page = client.shows().listEpisodes("38bS44xjbVVZ3No3ByF1dJ");\n    }\n}',
      },
      kotlin: {
        method: 'shows().listEpisodes',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.shows.ShowListEpisodesPage\nimport dev.cjav.spotted.models.shows.ShowListEpisodesParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val page: ShowListEpisodesPage = client.shows().listEpisodes("38bS44xjbVVZ3No3ByF1dJ")\n}',
      },
      php: {
        method: 'shows->listEpisodes',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->shows->listEpisodes(\n  '38bS44xjbVVZ3No3ByF1dJ', limit: 10, market: 'ES', offset: 5\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'shows.list_episodes',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.shows.list_episodes(\n    id="38bS44xjbVVZ3No3ByF1dJ",\n)\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'shows.list_episodes',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\npage = spotted.shows.list_episodes("38bS44xjbVVZ3No3ByF1dJ")\n\nputs(page)',
      },
      typescript: {
        method: 'client.shows.listEpisodes',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const simplifiedEpisodeObject of client.shows.listEpisodes('38bS44xjbVVZ3No3ByF1dJ')) {\n  console.log(simplifiedEpisodeObject.id);\n}",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'episodes retrieve',
        example:
          "spotted episodes retrieve \\\n  --access-token 'My Access Token' \\\n  --id 512ojhOuo1ktJprKbVcKyQ",
      },
      csharp: {
        method: 'Episodes.Retrieve',
        example:
          'EpisodeRetrieveParams parameters = new() { ID = "512ojhOuo1ktJprKbVcKyQ" };\n\nvar episodeObject = await client.Episodes.Retrieve(parameters);\n\nConsole.WriteLine(episodeObject);',
      },
      go: {
        method: 'client.Episodes.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tepisodeObject, err := client.Episodes.Get(\n\t\tcontext.TODO(),\n\t\t"512ojhOuo1ktJprKbVcKyQ",\n\t\tspotted.EpisodeGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", episodeObject.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/episodes/$ID \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'episodes().retrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.EpisodeObject;\nimport dev.cjav.spotted.models.episodes.EpisodeRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        EpisodeObject episodeObject = client.episodes().retrieve("512ojhOuo1ktJprKbVcKyQ");\n    }\n}',
      },
      kotlin: {
        method: 'episodes().retrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.EpisodeObject\nimport dev.cjav.spotted.models.episodes.EpisodeRetrieveParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val episodeObject: EpisodeObject = client.episodes().retrieve("512ojhOuo1ktJprKbVcKyQ")\n}',
      },
      php: {
        method: 'episodes->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$episodeObject = $client->episodes->retrieve(\n  '512ojhOuo1ktJprKbVcKyQ', market: 'ES'\n);\n\nvar_dump($episodeObject);",
      },
      python: {
        method: 'episodes.retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nepisode_object = client.episodes.retrieve(\n    id="512ojhOuo1ktJprKbVcKyQ",\n)\nprint(episode_object.id)',
      },
      ruby: {
        method: 'episodes.retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nepisode_object = spotted.episodes.retrieve("512ojhOuo1ktJprKbVcKyQ")\n\nputs(episode_object)',
      },
      typescript: {
        method: 'client.episodes.retrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst episodeObject = await client.episodes.retrieve('512ojhOuo1ktJprKbVcKyQ');\n\nconsole.log(episodeObject.id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'episodes bulk_retrieve',
        example:
          "spotted episodes bulk-retrieve \\\n  --access-token 'My Access Token' \\\n  --ids 77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf",
      },
      csharp: {
        method: 'Episodes.BulkRetrieve',
        example:
          'EpisodeBulkRetrieveParams parameters = new()\n{\n    Ids = "77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf"\n};\n\nvar response = await client.Episodes.BulkRetrieve(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Episodes.BulkGet',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Episodes.BulkGet(context.TODO(), spotted.EpisodeBulkGetParams{\n\t\tIDs: "77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Episodes)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/episodes \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'episodes().bulkRetrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.episodes.EpisodeBulkRetrieveParams;\nimport dev.cjav.spotted.models.episodes.EpisodeBulkRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        EpisodeBulkRetrieveParams params = EpisodeBulkRetrieveParams.builder()\n            .ids("77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf")\n            .build();\n        EpisodeBulkRetrieveResponse response = client.episodes().bulkRetrieve(params);\n    }\n}',
      },
      kotlin: {
        method: 'episodes().bulkRetrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.episodes.EpisodeBulkRetrieveParams\nimport dev.cjav.spotted.models.episodes.EpisodeBulkRetrieveResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: EpisodeBulkRetrieveParams = EpisodeBulkRetrieveParams.builder()\n        .ids("77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf")\n        .build()\n    val response: EpisodeBulkRetrieveResponse = client.episodes().bulkRetrieve(params)\n}',
      },
      php: {
        method: 'episodes->bulkRetrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->episodes->bulkRetrieve(\n  ids: '77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf', market: 'ES'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'episodes.bulk_retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.episodes.bulk_retrieve(\n    ids="77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf",\n)\nprint(response.episodes)',
      },
      ruby: {
        method: 'episodes.bulk_retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.episodes.bulk_retrieve(ids: "77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf")\n\nputs(response)',
      },
      typescript: {
        method: 'client.episodes.bulkRetrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.episodes.bulkRetrieve({\n  ids: '77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf',\n});\n\nconsole.log(response.episodes);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'audiobooks retrieve',
        example:
          "spotted audiobooks retrieve \\\n  --access-token 'My Access Token' \\\n  --id 7iHfbu1YPACw6oZPAFJtqe",
      },
      csharp: {
        method: 'Audiobooks.Retrieve',
        example:
          'AudiobookRetrieveParams parameters = new() { ID = "7iHfbu1YPACw6oZPAFJtqe" };\n\nvar audiobook = await client.Audiobooks.Retrieve(parameters);\n\nConsole.WriteLine(audiobook);',
      },
      go: {
        method: 'client.Audiobooks.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\taudiobook, err := client.Audiobooks.Get(\n\t\tcontext.TODO(),\n\t\t"7iHfbu1YPACw6oZPAFJtqe",\n\t\tspotted.AudiobookGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", audiobook)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/audiobooks/$ID \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'audiobooks().retrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.audiobooks.AudiobookRetrieveParams;\nimport dev.cjav.spotted.models.audiobooks.AudiobookRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        AudiobookRetrieveResponse audiobook = client.audiobooks().retrieve("7iHfbu1YPACw6oZPAFJtqe");\n    }\n}',
      },
      kotlin: {
        method: 'audiobooks().retrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.audiobooks.AudiobookRetrieveParams\nimport dev.cjav.spotted.models.audiobooks.AudiobookRetrieveResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val audiobook: AudiobookRetrieveResponse = client.audiobooks().retrieve("7iHfbu1YPACw6oZPAFJtqe")\n}',
      },
      php: {
        method: 'audiobooks->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$audiobook = $client->audiobooks->retrieve(\n  '7iHfbu1YPACw6oZPAFJtqe', market: 'ES'\n);\n\nvar_dump($audiobook);",
      },
      python: {
        method: 'audiobooks.retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\naudiobook = client.audiobooks.retrieve(\n    id="7iHfbu1YPACw6oZPAFJtqe",\n)\nprint(audiobook)',
      },
      ruby: {
        method: 'audiobooks.retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\naudiobook = spotted.audiobooks.retrieve("7iHfbu1YPACw6oZPAFJtqe")\n\nputs(audiobook)',
      },
      typescript: {
        method: 'client.audiobooks.retrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst audiobook = await client.audiobooks.retrieve('7iHfbu1YPACw6oZPAFJtqe');\n\nconsole.log(audiobook);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'audiobooks bulk_retrieve',
        example:
          "spotted audiobooks bulk-retrieve \\\n  --access-token 'My Access Token' \\\n  --ids 18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe",
      },
      csharp: {
        method: 'Audiobooks.BulkRetrieve',
        example:
          'AudiobookBulkRetrieveParams parameters = new()\n{\n    Ids = "18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe"\n};\n\nvar response = await client.Audiobooks.BulkRetrieve(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Audiobooks.BulkGet',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Audiobooks.BulkGet(context.TODO(), spotted.AudiobookBulkGetParams{\n\t\tIDs: "18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Audiobooks)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/audiobooks \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'audiobooks().bulkRetrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.audiobooks.AudiobookBulkRetrieveParams;\nimport dev.cjav.spotted.models.audiobooks.AudiobookBulkRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        AudiobookBulkRetrieveParams params = AudiobookBulkRetrieveParams.builder()\n            .ids("18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe")\n            .build();\n        AudiobookBulkRetrieveResponse response = client.audiobooks().bulkRetrieve(params);\n    }\n}',
      },
      kotlin: {
        method: 'audiobooks().bulkRetrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.audiobooks.AudiobookBulkRetrieveParams\nimport dev.cjav.spotted.models.audiobooks.AudiobookBulkRetrieveResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: AudiobookBulkRetrieveParams = AudiobookBulkRetrieveParams.builder()\n        .ids("18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe")\n        .build()\n    val response: AudiobookBulkRetrieveResponse = client.audiobooks().bulkRetrieve(params)\n}',
      },
      php: {
        method: 'audiobooks->bulkRetrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->audiobooks->bulkRetrieve(\n  ids: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe',\n  market: 'ES',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'audiobooks.bulk_retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.audiobooks.bulk_retrieve(\n    ids="18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe",\n)\nprint(response.audiobooks)',
      },
      ruby: {
        method: 'audiobooks.bulk_retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.audiobooks.bulk_retrieve(\n  ids: "18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe"\n)\n\nputs(response)',
      },
      typescript: {
        method: 'client.audiobooks.bulkRetrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.audiobooks.bulkRetrieve({\n  ids: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe',\n});\n\nconsole.log(response.audiobooks);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'audiobooks list_chapters',
        example:
          "spotted audiobooks list-chapters \\\n  --access-token 'My Access Token' \\\n  --id 7iHfbu1YPACw6oZPAFJtqe",
      },
      csharp: {
        method: 'Audiobooks.ListChapters',
        example:
          'AudiobookListChaptersParams parameters = new()\n{\n    ID = "7iHfbu1YPACw6oZPAFJtqe"\n};\n\nvar page = await client.Audiobooks.ListChapters(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Audiobooks.ListChapters',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Audiobooks.ListChapters(\n\t\tcontext.TODO(),\n\t\t"7iHfbu1YPACw6oZPAFJtqe",\n\t\tspotted.AudiobookListChaptersParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/audiobooks/$ID/chapters \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'audiobooks().listChapters',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.audiobooks.AudiobookListChaptersPage;\nimport dev.cjav.spotted.models.audiobooks.AudiobookListChaptersParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        AudiobookListChaptersPage page = client.audiobooks().listChapters("7iHfbu1YPACw6oZPAFJtqe");\n    }\n}',
      },
      kotlin: {
        method: 'audiobooks().listChapters',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.audiobooks.AudiobookListChaptersPage\nimport dev.cjav.spotted.models.audiobooks.AudiobookListChaptersParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val page: AudiobookListChaptersPage = client.audiobooks().listChapters("7iHfbu1YPACw6oZPAFJtqe")\n}',
      },
      php: {
        method: 'audiobooks->listChapters',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->audiobooks->listChapters(\n  '7iHfbu1YPACw6oZPAFJtqe', limit: 10, market: 'ES', offset: 5\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'audiobooks.list_chapters',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.audiobooks.list_chapters(\n    id="7iHfbu1YPACw6oZPAFJtqe",\n)\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'audiobooks.list_chapters',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\npage = spotted.audiobooks.list_chapters("7iHfbu1YPACw6oZPAFJtqe")\n\nputs(page)',
      },
      typescript: {
        method: 'client.audiobooks.listChapters',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const simplifiedChapterObject of client.audiobooks.listChapters(\n  '7iHfbu1YPACw6oZPAFJtqe',\n)) {\n  console.log(simplifiedChapterObject.id);\n}",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'me retrieve',
        example: "spotted me retrieve \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Retrieve',
        example:
          'MeRetrieveParams parameters = new();\n\nvar me = await client.Me.Retrieve(parameters);\n\nConsole.WriteLine(me);',
      },
      go: {
        method: 'client.Me.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tme, err := client.Me.Get(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", me.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().retrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.MeRetrieveParams;\nimport dev.cjav.spotted.models.me.MeRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        MeRetrieveResponse me = client.me().retrieve();\n    }\n}',
      },
      kotlin: {
        method: 'me().retrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.MeRetrieveParams\nimport dev.cjav.spotted.models.me.MeRetrieveResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val me: MeRetrieveResponse = client.me().retrieve()\n}',
      },
      php: {
        method: 'me->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$me = $client->me->retrieve();\n\nvar_dump($me);",
      },
      python: {
        method: 'me.retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nme = client.me.retrieve()\nprint(me.id)',
      },
      ruby: {
        method: 'me.retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nme = spotted.me.retrieve\n\nputs(me)',
      },
      typescript: {
        method: 'client.me.retrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst me = await client.me.retrieve();\n\nconsole.log(me.id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'audiobooks list',
        example: "spotted me:audiobooks list \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Audiobooks.List',
        example:
          'AudiobookListParams parameters = new();\n\nvar page = await client.Me.Audiobooks.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Me.Audiobooks.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Me.Audiobooks.List(context.TODO(), spotted.MeAudiobookListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/audiobooks \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().audiobooks().list',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.audiobooks.AudiobookListPage;\nimport dev.cjav.spotted.models.me.audiobooks.AudiobookListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        AudiobookListPage page = client.me().audiobooks().list();\n    }\n}',
      },
      kotlin: {
        method: 'me().audiobooks().list',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.audiobooks.AudiobookListPage\nimport dev.cjav.spotted.models.me.audiobooks.AudiobookListParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val page: AudiobookListPage = client.me().audiobooks().list()\n}',
      },
      php: {
        method: 'me->audiobooks->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->me->audiobooks->list(limit: 10, offset: 5);\n\nvar_dump($page);",
      },
      python: {
        method: 'me.audiobooks.list',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.me.audiobooks.list()\npage = page.items[0]\nprint(page.added_at)',
      },
      ruby: {
        method: 'me.audiobooks.list',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\npage = spotted.me.audiobooks.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.me.audiobooks.list',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const audiobookListResponse of client.me.audiobooks.list()) {\n  console.log(audiobookListResponse.added_at);\n}",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'audiobooks save',
        example:
          "spotted me:audiobooks save \\\n  --access-token 'My Access Token' \\\n  --ids 18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe",
      },
      csharp: {
        method: 'Me.Audiobooks.Save',
        example:
          'AudiobookSaveParams parameters = new()\n{\n    Ids = "18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe"\n};\n\nawait client.Me.Audiobooks.Save(parameters);',
      },
      go: {
        method: 'client.Me.Audiobooks.Save',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Audiobooks.Save(context.TODO(), spotted.MeAudiobookSaveParams{\n\t\tIDs: "18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/audiobooks \\\n    -X PUT \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().audiobooks().save',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.audiobooks.AudiobookSaveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        AudiobookSaveParams params = AudiobookSaveParams.builder()\n            .ids("18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe")\n            .build();\n        client.me().audiobooks().save(params);\n    }\n}',
      },
      kotlin: {
        method: 'me().audiobooks().save',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.audiobooks.AudiobookSaveParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: AudiobookSaveParams = AudiobookSaveParams.builder()\n        .ids("18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe")\n        .build()\n    client.me().audiobooks().save(params)\n}',
      },
      php: {
        method: 'me->audiobooks->save',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->audiobooks->save(\n  ids: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.audiobooks.save',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.audiobooks.save(\n    ids="18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe",\n)',
      },
      ruby: {
        method: 'me.audiobooks.save',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.audiobooks.save(ids: "18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe")\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.audiobooks.save',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.audiobooks.save({\n  ids: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe',\n});",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'audiobooks remove',
        example:
          "spotted me:audiobooks remove \\\n  --access-token 'My Access Token' \\\n  --ids 18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe",
      },
      csharp: {
        method: 'Me.Audiobooks.Remove',
        example:
          'AudiobookRemoveParams parameters = new()\n{\n    Ids = "18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe"\n};\n\nawait client.Me.Audiobooks.Remove(parameters);',
      },
      go: {
        method: 'client.Me.Audiobooks.Remove',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Audiobooks.Remove(context.TODO(), spotted.MeAudiobookRemoveParams{\n\t\tIDs: "18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/audiobooks \\\n    -X DELETE \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().audiobooks().remove',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.audiobooks.AudiobookRemoveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        AudiobookRemoveParams params = AudiobookRemoveParams.builder()\n            .ids("18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe")\n            .build();\n        client.me().audiobooks().remove(params);\n    }\n}',
      },
      kotlin: {
        method: 'me().audiobooks().remove',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.audiobooks.AudiobookRemoveParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: AudiobookRemoveParams = AudiobookRemoveParams.builder()\n        .ids("18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe")\n        .build()\n    client.me().audiobooks().remove(params)\n}',
      },
      php: {
        method: 'me->audiobooks->remove',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->audiobooks->remove(\n  ids: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.audiobooks.remove',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.audiobooks.remove(\n    ids="18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe",\n)',
      },
      ruby: {
        method: 'me.audiobooks.remove',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.audiobooks.remove(ids: "18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe")\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.audiobooks.remove',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.audiobooks.remove({\n  ids: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe',\n});",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'audiobooks check',
        example:
          "spotted me:audiobooks check \\\n  --access-token 'My Access Token' \\\n  --ids 18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe",
      },
      csharp: {
        method: 'Me.Audiobooks.Check',
        example:
          'AudiobookCheckParams parameters = new()\n{\n    Ids = "18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe"\n};\n\nvar response = await client.Me.Audiobooks.Check(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Me.Audiobooks.Check',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Me.Audiobooks.Check(context.TODO(), spotted.MeAudiobookCheckParams{\n\t\tIDs: "18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/audiobooks/contains \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().audiobooks().check',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.audiobooks.AudiobookCheckParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        AudiobookCheckParams params = AudiobookCheckParams.builder()\n            .ids("18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe")\n            .build();\n        List<Boolean> response = client.me().audiobooks().check(params);\n    }\n}',
      },
      kotlin: {
        method: 'me().audiobooks().check',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.audiobooks.AudiobookCheckParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: AudiobookCheckParams = AudiobookCheckParams.builder()\n        .ids("18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe")\n        .build()\n    val response: List<Boolean> = client.me().audiobooks().check(params)\n}',
      },
      php: {
        method: 'me->audiobooks->check',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->me->audiobooks->check(\n  ids: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'me.audiobooks.check',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.me.audiobooks.check(\n    ids="18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe",\n)\nprint(response)',
      },
      ruby: {
        method: 'me.audiobooks.check',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.me.audiobooks.check(ids: "18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe")\n\nputs(response)',
      },
      typescript: {
        method: 'client.me.audiobooks.check',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.me.audiobooks.check({\n  ids: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe',\n});\n\nconsole.log(response);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'playlists list',
        example: "spotted me:playlists list \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Playlists.List',
        example:
          'PlaylistListParams parameters = new();\n\nvar page = await client.Me.Playlists.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Me.Playlists.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Me.Playlists.List(context.TODO(), spotted.MePlaylistListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/playlists \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().playlists().list',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.playlists.PlaylistListPage;\nimport dev.cjav.spotted.models.me.playlists.PlaylistListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        PlaylistListPage page = client.me().playlists().list();\n    }\n}',
      },
      kotlin: {
        method: 'me().playlists().list',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.playlists.PlaylistListPage\nimport dev.cjav.spotted.models.me.playlists.PlaylistListParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val page: PlaylistListPage = client.me().playlists().list()\n}',
      },
      php: {
        method: 'me->playlists->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->me->playlists->list(limit: 10, offset: 5);\n\nvar_dump($page);",
      },
      python: {
        method: 'me.playlists.list',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.me.playlists.list()\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'me.playlists.list',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\npage = spotted.me.playlists.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.me.playlists.list',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const simplifiedPlaylistObject of client.me.playlists.list()) {\n  console.log(simplifiedPlaylistObject.id);\n}",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'top list_top_tracks',
        example: "spotted me:top list-top-tracks \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Top.ListTopTracks',
        example:
          'TopListTopTracksParams parameters = new();\n\nvar page = await client.Me.Top.ListTopTracks(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Me.Top.ListTopTracks',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Me.Top.ListTopTracks(context.TODO(), spotted.MeTopListTopTracksParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/top/tracks \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().top().listTopTracks',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.top.TopListTopTracksPage;\nimport dev.cjav.spotted.models.me.top.TopListTopTracksParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        TopListTopTracksPage page = client.me().top().listTopTracks();\n    }\n}',
      },
      kotlin: {
        method: 'me().top().listTopTracks',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.top.TopListTopTracksPage\nimport dev.cjav.spotted.models.me.top.TopListTopTracksParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val page: TopListTopTracksPage = client.me().top().listTopTracks()\n}',
      },
      php: {
        method: 'me->top->listTopTracks',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->me->top->listTopTracks(\n  limit: 10, offset: 5, timeRange: 'medium_term'\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'me.top.list_top_tracks',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.me.top.list_top_tracks()\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'me.top.list_top_tracks',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\npage = spotted.me.top.list_top_tracks\n\nputs(page)',
      },
      typescript: {
        method: 'client.me.top.listTopTracks',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const trackObject of client.me.top.listTopTracks()) {\n  console.log(trackObject.id);\n}",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'top list_top_artists',
        example: "spotted me:top list-top-artists \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Top.ListTopArtists',
        example:
          'TopListTopArtistsParams parameters = new();\n\nvar page = await client.Me.Top.ListTopArtists(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Me.Top.ListTopArtists',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Me.Top.ListTopArtists(context.TODO(), spotted.MeTopListTopArtistsParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/top/artists \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().top().listTopArtists',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.top.TopListTopArtistsPage;\nimport dev.cjav.spotted.models.me.top.TopListTopArtistsParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        TopListTopArtistsPage page = client.me().top().listTopArtists();\n    }\n}',
      },
      kotlin: {
        method: 'me().top().listTopArtists',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.top.TopListTopArtistsPage\nimport dev.cjav.spotted.models.me.top.TopListTopArtistsParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val page: TopListTopArtistsPage = client.me().top().listTopArtists()\n}',
      },
      php: {
        method: 'me->top->listTopArtists',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->me->top->listTopArtists(\n  limit: 10, offset: 5, timeRange: 'medium_term'\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'me.top.list_top_artists',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.me.top.list_top_artists()\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'me.top.list_top_artists',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\npage = spotted.me.top.list_top_artists\n\nputs(page)',
      },
      typescript: {
        method: 'client.me.top.listTopArtists',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const artistObject of client.me.top.listTopArtists()) {\n  console.log(artistObject.id);\n}",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'albums list',
        example: "spotted me:albums list \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Albums.List',
        example:
          'AlbumListParams parameters = new();\n\nvar page = await client.Me.Albums.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Me.Albums.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Me.Albums.List(context.TODO(), spotted.MeAlbumListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/albums \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().albums().list',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.albums.AlbumListPage;\nimport dev.cjav.spotted.models.me.albums.AlbumListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        AlbumListPage page = client.me().albums().list();\n    }\n}',
      },
      kotlin: {
        method: 'me().albums().list',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.albums.AlbumListPage\nimport dev.cjav.spotted.models.me.albums.AlbumListParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val page: AlbumListPage = client.me().albums().list()\n}',
      },
      php: {
        method: 'me->albums->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->me->albums->list(limit: 10, market: 'ES', offset: 5);\n\nvar_dump($page);",
      },
      python: {
        method: 'me.albums.list',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.me.albums.list()\npage = page.items[0]\nprint(page.added_at)',
      },
      ruby: {
        method: 'me.albums.list',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\npage = spotted.me.albums.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.me.albums.list',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const albumListResponse of client.me.albums.list()) {\n  console.log(albumListResponse.added_at);\n}",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'albums save',
        example: "spotted me:albums save \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Albums.Save',
        example: 'AlbumSaveParams parameters = new();\n\nawait client.Me.Albums.Save(parameters);',
      },
      go: {
        method: 'client.Me.Albums.Save',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Albums.Save(context.TODO(), spotted.MeAlbumSaveParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/albums \\\n    -X PUT \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().albums().save',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.albums.AlbumSaveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        client.me().albums().save();\n    }\n}',
      },
      kotlin: {
        method: 'me().albums().save',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.albums.AlbumSaveParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    client.me().albums().save()\n}',
      },
      php: {
        method: 'me->albums->save',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->albums->save(ids: ['string'], published: true);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.albums.save',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.albums.save()',
      },
      ruby: {
        method: 'me.albums.save',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.albums.save\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.albums.save',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.albums.save();",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'albums remove',
        example: "spotted me:albums remove \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Albums.Remove',
        example: 'AlbumRemoveParams parameters = new();\n\nawait client.Me.Albums.Remove(parameters);',
      },
      go: {
        method: 'client.Me.Albums.Remove',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Albums.Remove(context.TODO(), spotted.MeAlbumRemoveParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/albums \\\n    -X DELETE \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().albums().remove',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.albums.AlbumRemoveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        client.me().albums().remove();\n    }\n}',
      },
      kotlin: {
        method: 'me().albums().remove',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.albums.AlbumRemoveParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    client.me().albums().remove()\n}',
      },
      php: {
        method: 'me->albums->remove',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->albums->remove(ids: ['string'], published: true);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.albums.remove',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.albums.remove()',
      },
      ruby: {
        method: 'me.albums.remove',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.albums.remove\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.albums.remove',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.albums.remove();",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'albums check',
        example:
          "spotted me:albums check \\\n  --access-token 'My Access Token' \\\n  --ids 382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc",
      },
      csharp: {
        method: 'Me.Albums.Check',
        example:
          'AlbumCheckParams parameters = new()\n{\n    Ids = "382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc"\n};\n\nvar response = await client.Me.Albums.Check(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Me.Albums.Check',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Me.Albums.Check(context.TODO(), spotted.MeAlbumCheckParams{\n\t\tIDs: "382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/albums/contains \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().albums().check',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.albums.AlbumCheckParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        AlbumCheckParams params = AlbumCheckParams.builder()\n            .ids("382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc")\n            .build();\n        List<Boolean> response = client.me().albums().check(params);\n    }\n}',
      },
      kotlin: {
        method: 'me().albums().check',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.albums.AlbumCheckParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: AlbumCheckParams = AlbumCheckParams.builder()\n        .ids("382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc")\n        .build()\n    val response: List<Boolean> = client.me().albums().check(params)\n}',
      },
      php: {
        method: 'me->albums->check',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->me->albums->check(\n  ids: '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'me.albums.check',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.me.albums.check(\n    ids="382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc",\n)\nprint(response)',
      },
      ruby: {
        method: 'me.albums.check',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.me.albums.check(ids: "382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc")\n\nputs(response)',
      },
      typescript: {
        method: 'client.me.albums.check',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.me.albums.check({\n  ids: '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc',\n});\n\nconsole.log(response);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'tracks list',
        example: "spotted me:tracks list \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Tracks.List',
        example:
          'TrackListParams parameters = new();\n\nvar page = await client.Me.Tracks.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Me.Tracks.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Me.Tracks.List(context.TODO(), spotted.MeTrackListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/tracks \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().tracks().list',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.tracks.TrackListPage;\nimport dev.cjav.spotted.models.me.tracks.TrackListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        TrackListPage page = client.me().tracks().list();\n    }\n}',
      },
      kotlin: {
        method: 'me().tracks().list',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.tracks.TrackListPage\nimport dev.cjav.spotted.models.me.tracks.TrackListParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val page: TrackListPage = client.me().tracks().list()\n}',
      },
      php: {
        method: 'me->tracks->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->me->tracks->list(limit: 10, market: 'ES', offset: 5);\n\nvar_dump($page);",
      },
      python: {
        method: 'me.tracks.list',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.me.tracks.list()\npage = page.items[0]\nprint(page.added_at)',
      },
      ruby: {
        method: 'me.tracks.list',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\npage = spotted.me.tracks.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.me.tracks.list',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const trackListResponse of client.me.tracks.list()) {\n  console.log(trackListResponse.added_at);\n}",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'tracks save',
        example: "spotted me:tracks save \\\n  --access-token 'My Access Token' \\\n  --id string",
      },
      csharp: {
        method: 'Me.Tracks.Save',
        example:
          'TrackSaveParams parameters = new()\n{\n    Ids =\n    [\n        "string"\n    ],\n};\n\nawait client.Me.Tracks.Save(parameters);',
      },
      go: {
        method: 'client.Me.Tracks.Save',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Tracks.Save(context.TODO(), spotted.MeTrackSaveParams{\n\t\tIDs: []string{"string"},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/tracks \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN" \\\n    -d \'{\n          "ids": [\n            "string"\n          ]\n        }\'',
      },
      java: {
        method: 'me().tracks().save',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.tracks.TrackSaveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        TrackSaveParams params = TrackSaveParams.builder()\n            .addId("string")\n            .build();\n        client.me().tracks().save(params);\n    }\n}',
      },
      kotlin: {
        method: 'me().tracks().save',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.tracks.TrackSaveParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: TrackSaveParams = TrackSaveParams.builder()\n        .addId("string")\n        .build()\n    client.me().tracks().save(params)\n}',
      },
      php: {
        method: 'me->tracks->save',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->tracks->save(\n  ids: ['string'],\n  published: true,\n  timestampedIDs: [\n    [\n      'id' => 'id',\n      'addedAt' => new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n    ],\n  ],\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.tracks.save',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.tracks.save(\n    ids=["string"],\n)',
      },
      ruby: {
        method: 'me.tracks.save',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.tracks.save(ids: ["string"])\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.tracks.save',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.tracks.save({ ids: ['string'] });",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'tracks remove',
        example: "spotted me:tracks remove \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Tracks.Remove',
        example: 'TrackRemoveParams parameters = new();\n\nawait client.Me.Tracks.Remove(parameters);',
      },
      go: {
        method: 'client.Me.Tracks.Remove',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Tracks.Remove(context.TODO(), spotted.MeTrackRemoveParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/tracks \\\n    -X DELETE \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().tracks().remove',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.tracks.TrackRemoveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        client.me().tracks().remove();\n    }\n}',
      },
      kotlin: {
        method: 'me().tracks().remove',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.tracks.TrackRemoveParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    client.me().tracks().remove()\n}',
      },
      php: {
        method: 'me->tracks->remove',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->tracks->remove(ids: ['string'], published: true);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.tracks.remove',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.tracks.remove()',
      },
      ruby: {
        method: 'me.tracks.remove',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.tracks.remove\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.tracks.remove',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.tracks.remove();",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'tracks check',
        example:
          "spotted me:tracks check \\\n  --access-token 'My Access Token' \\\n  --ids 7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B",
      },
      csharp: {
        method: 'Me.Tracks.Check',
        example:
          'TrackCheckParams parameters = new()\n{\n    Ids = "7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B"\n};\n\nvar response = await client.Me.Tracks.Check(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Me.Tracks.Check',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Me.Tracks.Check(context.TODO(), spotted.MeTrackCheckParams{\n\t\tIDs: "7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/tracks/contains \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().tracks().check',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.tracks.TrackCheckParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        TrackCheckParams params = TrackCheckParams.builder()\n            .ids("7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B")\n            .build();\n        List<Boolean> response = client.me().tracks().check(params);\n    }\n}',
      },
      kotlin: {
        method: 'me().tracks().check',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.tracks.TrackCheckParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: TrackCheckParams = TrackCheckParams.builder()\n        .ids("7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B")\n        .build()\n    val response: List<Boolean> = client.me().tracks().check(params)\n}',
      },
      php: {
        method: 'me->tracks->check',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->me->tracks->check(\n  ids: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'me.tracks.check',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.me.tracks.check(\n    ids="7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B",\n)\nprint(response)',
      },
      ruby: {
        method: 'me.tracks.check',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.me.tracks.check(ids: "7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B")\n\nputs(response)',
      },
      typescript: {
        method: 'client.me.tracks.check',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.me.tracks.check({\n  ids: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',\n});\n\nconsole.log(response);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'episodes list',
        example: "spotted me:episodes list \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Episodes.List',
        example:
          'EpisodeListParams parameters = new();\n\nvar page = await client.Me.Episodes.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Me.Episodes.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Me.Episodes.List(context.TODO(), spotted.MeEpisodeListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/episodes \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().episodes().list',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.episodes.EpisodeListPage;\nimport dev.cjav.spotted.models.me.episodes.EpisodeListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        EpisodeListPage page = client.me().episodes().list();\n    }\n}',
      },
      kotlin: {
        method: 'me().episodes().list',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.episodes.EpisodeListPage\nimport dev.cjav.spotted.models.me.episodes.EpisodeListParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val page: EpisodeListPage = client.me().episodes().list()\n}',
      },
      php: {
        method: 'me->episodes->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->me->episodes->list(limit: 10, market: 'ES', offset: 5);\n\nvar_dump($page);",
      },
      python: {
        method: 'me.episodes.list',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.me.episodes.list()\npage = page.items[0]\nprint(page.added_at)',
      },
      ruby: {
        method: 'me.episodes.list',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\npage = spotted.me.episodes.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.me.episodes.list',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const episodeListResponse of client.me.episodes.list()) {\n  console.log(episodeListResponse.added_at);\n}",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'episodes save',
        example: "spotted me:episodes save \\\n  --access-token 'My Access Token' \\\n  --id string",
      },
      csharp: {
        method: 'Me.Episodes.Save',
        example:
          'EpisodeSaveParams parameters = new()\n{\n    Ids =\n    [\n        "string"\n    ],\n};\n\nawait client.Me.Episodes.Save(parameters);',
      },
      go: {
        method: 'client.Me.Episodes.Save',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Episodes.Save(context.TODO(), spotted.MeEpisodeSaveParams{\n\t\tIDs: []string{"string"},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/episodes \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN" \\\n    -d \'{\n          "ids": [\n            "string"\n          ]\n        }\'',
      },
      java: {
        method: 'me().episodes().save',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.episodes.EpisodeSaveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        EpisodeSaveParams params = EpisodeSaveParams.builder()\n            .addId("string")\n            .build();\n        client.me().episodes().save(params);\n    }\n}',
      },
      kotlin: {
        method: 'me().episodes().save',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.episodes.EpisodeSaveParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: EpisodeSaveParams = EpisodeSaveParams.builder()\n        .addId("string")\n        .build()\n    client.me().episodes().save(params)\n}',
      },
      php: {
        method: 'me->episodes->save',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->episodes->save(ids: ['string'], published: true);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.episodes.save',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.episodes.save(\n    ids=["string"],\n)',
      },
      ruby: {
        method: 'me.episodes.save',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.episodes.save(ids: ["string"])\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.episodes.save',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.episodes.save({ ids: ['string'] });",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'episodes remove',
        example: "spotted me:episodes remove \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Episodes.Remove',
        example: 'EpisodeRemoveParams parameters = new();\n\nawait client.Me.Episodes.Remove(parameters);',
      },
      go: {
        method: 'client.Me.Episodes.Remove',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Episodes.Remove(context.TODO(), spotted.MeEpisodeRemoveParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/episodes \\\n    -X DELETE \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().episodes().remove',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.episodes.EpisodeRemoveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        client.me().episodes().remove();\n    }\n}',
      },
      kotlin: {
        method: 'me().episodes().remove',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.episodes.EpisodeRemoveParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    client.me().episodes().remove()\n}',
      },
      php: {
        method: 'me->episodes->remove',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->episodes->remove(ids: ['string'], published: true);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.episodes.remove',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.episodes.remove()',
      },
      ruby: {
        method: 'me.episodes.remove',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.episodes.remove\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.episodes.remove',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.episodes.remove();",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'episodes check',
        example:
          "spotted me:episodes check \\\n  --access-token 'My Access Token' \\\n  --ids 77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf",
      },
      csharp: {
        method: 'Me.Episodes.Check',
        example:
          'EpisodeCheckParams parameters = new()\n{\n    Ids = "77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf"\n};\n\nvar response = await client.Me.Episodes.Check(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Me.Episodes.Check',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Me.Episodes.Check(context.TODO(), spotted.MeEpisodeCheckParams{\n\t\tIDs: "77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/episodes/contains \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().episodes().check',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.episodes.EpisodeCheckParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        EpisodeCheckParams params = EpisodeCheckParams.builder()\n            .ids("77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf")\n            .build();\n        List<Boolean> response = client.me().episodes().check(params);\n    }\n}',
      },
      kotlin: {
        method: 'me().episodes().check',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.episodes.EpisodeCheckParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: EpisodeCheckParams = EpisodeCheckParams.builder()\n        .ids("77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf")\n        .build()\n    val response: List<Boolean> = client.me().episodes().check(params)\n}',
      },
      php: {
        method: 'me->episodes->check',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->me->episodes->check(\n  ids: '77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'me.episodes.check',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.me.episodes.check(\n    ids="77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf",\n)\nprint(response)',
      },
      ruby: {
        method: 'me.episodes.check',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.me.episodes.check(ids: "77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf")\n\nputs(response)',
      },
      typescript: {
        method: 'client.me.episodes.check',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.me.episodes.check({\n  ids: '77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf',\n});\n\nconsole.log(response);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'shows list',
        example: "spotted me:shows list \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Shows.List',
        example:
          'ShowListParams parameters = new();\n\nvar page = await client.Me.Shows.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Me.Shows.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Me.Shows.List(context.TODO(), spotted.MeShowListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/shows \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().shows().list',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.shows.ShowListPage;\nimport dev.cjav.spotted.models.me.shows.ShowListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        ShowListPage page = client.me().shows().list();\n    }\n}',
      },
      kotlin: {
        method: 'me().shows().list',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.shows.ShowListPage\nimport dev.cjav.spotted.models.me.shows.ShowListParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val page: ShowListPage = client.me().shows().list()\n}',
      },
      php: {
        method: 'me->shows->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->me->shows->list(limit: 10, offset: 5);\n\nvar_dump($page);",
      },
      python: {
        method: 'me.shows.list',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.me.shows.list()\npage = page.items[0]\nprint(page.added_at)',
      },
      ruby: {
        method: 'me.shows.list',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\npage = spotted.me.shows.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.me.shows.list',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const showListResponse of client.me.shows.list()) {\n  console.log(showListResponse.added_at);\n}",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'shows save',
        example: "spotted me:shows save \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Shows.Save',
        example: 'ShowSaveParams parameters = new();\n\nawait client.Me.Shows.Save(parameters);',
      },
      go: {
        method: 'client.Me.Shows.Save',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Shows.Save(context.TODO(), spotted.MeShowSaveParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/shows \\\n    -X PUT \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().shows().save',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.shows.ShowSaveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        client.me().shows().save();\n    }\n}',
      },
      kotlin: {
        method: 'me().shows().save',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.shows.ShowSaveParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    client.me().shows().save()\n}',
      },
      php: {
        method: 'me->shows->save',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->shows->save(ids: ['string'], published: true);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.shows.save',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.shows.save()',
      },
      ruby: {
        method: 'me.shows.save',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.shows.save\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.shows.save',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.shows.save();",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'shows remove',
        example: "spotted me:shows remove \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Shows.Remove',
        example: 'ShowRemoveParams parameters = new();\n\nawait client.Me.Shows.Remove(parameters);',
      },
      go: {
        method: 'client.Me.Shows.Remove',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Shows.Remove(context.TODO(), spotted.MeShowRemoveParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/shows \\\n    -X DELETE \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().shows().remove',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.shows.ShowRemoveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        client.me().shows().remove();\n    }\n}',
      },
      kotlin: {
        method: 'me().shows().remove',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.shows.ShowRemoveParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    client.me().shows().remove()\n}',
      },
      php: {
        method: 'me->shows->remove',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->shows->remove(ids: ['string'], published: true);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.shows.remove',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.shows.remove()',
      },
      ruby: {
        method: 'me.shows.remove',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.shows.remove\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.shows.remove',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.shows.remove();",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'shows check',
        example:
          "spotted me:shows check \\\n  --access-token 'My Access Token' \\\n  --ids 5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ",
      },
      csharp: {
        method: 'Me.Shows.Check',
        example:
          'ShowCheckParams parameters = new()\n{\n    Ids = "5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ"\n};\n\nvar response = await client.Me.Shows.Check(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Me.Shows.Check',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Me.Shows.Check(context.TODO(), spotted.MeShowCheckParams{\n\t\tIDs: "5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/shows/contains \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().shows().check',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.shows.ShowCheckParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        ShowCheckParams params = ShowCheckParams.builder()\n            .ids("5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ")\n            .build();\n        List<Boolean> response = client.me().shows().check(params);\n    }\n}',
      },
      kotlin: {
        method: 'me().shows().check',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.shows.ShowCheckParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: ShowCheckParams = ShowCheckParams.builder()\n        .ids("5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ")\n        .build()\n    val response: List<Boolean> = client.me().shows().check(params)\n}',
      },
      php: {
        method: 'me->shows->check',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->me->shows->check(\n  ids: '5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'me.shows.check',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.me.shows.check(\n    ids="5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ",\n)\nprint(response)',
      },
      ruby: {
        method: 'me.shows.check',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.me.shows.check(ids: "5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ")\n\nputs(response)',
      },
      typescript: {
        method: 'client.me.shows.check',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.me.shows.check({\n  ids: '5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ',\n});\n\nconsole.log(response);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'following bulk_retrieve',
        example:
          "spotted me:following bulk-retrieve \\\n  --access-token 'My Access Token' \\\n  --type artist",
      },
      csharp: {
        method: 'Me.Following.BulkRetrieve',
        example:
          'FollowingBulkRetrieveParams parameters = new()\n{\n    Type = JsonSerializer.SerializeToElement("artist")\n};\n\nvar response = await client.Me.Following.BulkRetrieve(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Me.Following.BulkGet',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Me.Following.BulkGet(context.TODO(), spotted.MeFollowingBulkGetParams{\n\t\tType: "artist",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Artists)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/following \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().following().bulkRetrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.following.FollowingBulkRetrieveParams;\nimport dev.cjav.spotted.models.me.following.FollowingBulkRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        FollowingBulkRetrieveParams params = FollowingBulkRetrieveParams.builder()\n            .type(FollowingBulkRetrieveParams.Type.ARTIST)\n            .build();\n        FollowingBulkRetrieveResponse response = client.me().following().bulkRetrieve(params);\n    }\n}',
      },
      kotlin: {
        method: 'me().following().bulkRetrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.following.FollowingBulkRetrieveParams\nimport dev.cjav.spotted.models.me.following.FollowingBulkRetrieveResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: FollowingBulkRetrieveParams = FollowingBulkRetrieveParams.builder()\n        .type(FollowingBulkRetrieveParams.Type.ARTIST)\n        .build()\n    val response: FollowingBulkRetrieveResponse = client.me().following().bulkRetrieve(params)\n}',
      },
      php: {
        method: 'me->following->bulkRetrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->me->following->bulkRetrieve(\n  type: 'artist', after: '0I2XqVXqHScXjHhk6AYYRe', limit: 10\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'me.following.bulk_retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.me.following.bulk_retrieve(\n    type="artist",\n)\nprint(response.artists)',
      },
      ruby: {
        method: 'me.following.bulk_retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.me.following.bulk_retrieve(type: :artist)\n\nputs(response)',
      },
      typescript: {
        method: 'client.me.following.bulkRetrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.me.following.bulkRetrieve({ type: 'artist' });\n\nconsole.log(response.artists);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'following follow',
        example: "spotted me:following follow \\\n  --access-token 'My Access Token' \\\n  --id string",
      },
      csharp: {
        method: 'Me.Following.Follow',
        example:
          'FollowingFollowParams parameters = new()\n{\n    Ids =\n    [\n        "string"\n    ],\n};\n\nawait client.Me.Following.Follow(parameters);',
      },
      go: {
        method: 'client.Me.Following.Follow',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Following.Follow(context.TODO(), spotted.MeFollowingFollowParams{\n\t\tIDs: []string{"string"},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/following \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN" \\\n    -d \'{\n          "ids": [\n            "string"\n          ]\n        }\'',
      },
      java: {
        method: 'me().following().follow',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.following.FollowingFollowParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        FollowingFollowParams params = FollowingFollowParams.builder()\n            .addId("string")\n            .build();\n        client.me().following().follow(params);\n    }\n}',
      },
      kotlin: {
        method: 'me().following().follow',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.following.FollowingFollowParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: FollowingFollowParams = FollowingFollowParams.builder()\n        .addId("string")\n        .build()\n    client.me().following().follow(params)\n}',
      },
      php: {
        method: 'me->following->follow',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->following->follow(ids: ['string'], published: true);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.following.follow',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.following.follow(\n    ids=["string"],\n)',
      },
      ruby: {
        method: 'me.following.follow',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.following.follow(ids: ["string"])\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.following.follow',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.following.follow({ ids: ['string'] });",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'following unfollow',
        example: "spotted me:following unfollow \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Following.Unfollow',
        example:
          'FollowingUnfollowParams parameters = new();\n\nawait client.Me.Following.Unfollow(parameters);',
      },
      go: {
        method: 'client.Me.Following.Unfollow',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Following.Unfollow(context.TODO(), spotted.MeFollowingUnfollowParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/following \\\n    -X DELETE \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().following().unfollow',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.following.FollowingUnfollowParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        client.me().following().unfollow();\n    }\n}',
      },
      kotlin: {
        method: 'me().following().unfollow',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.following.FollowingUnfollowParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    client.me().following().unfollow()\n}',
      },
      php: {
        method: 'me->following->unfollow',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->following->unfollow(ids: ['string'], published: true);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.following.unfollow',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.following.unfollow()',
      },
      ruby: {
        method: 'me.following.unfollow',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.following.unfollow\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.following.unfollow',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.following.unfollow();",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'following check',
        example:
          "spotted me:following check \\\n  --access-token 'My Access Token' \\\n  --ids 2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6 \\\n  --type artist",
      },
      csharp: {
        method: 'Me.Following.Check',
        example:
          'FollowingCheckParams parameters = new()\n{\n    Ids = "2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6",\n    Type = Type.Artist,\n};\n\nvar response = await client.Me.Following.Check(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Me.Following.Check',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Me.Following.Check(context.TODO(), spotted.MeFollowingCheckParams{\n\t\tIDs:  "2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6",\n\t\tType: spotted.MeFollowingCheckParamsTypeArtist,\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/following/contains \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().following().check',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.following.FollowingCheckParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        FollowingCheckParams params = FollowingCheckParams.builder()\n            .ids("2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6")\n            .type(FollowingCheckParams.Type.ARTIST)\n            .build();\n        List<Boolean> response = client.me().following().check(params);\n    }\n}',
      },
      kotlin: {
        method: 'me().following().check',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.following.FollowingCheckParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: FollowingCheckParams = FollowingCheckParams.builder()\n        .ids("2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6")\n        .type(FollowingCheckParams.Type.ARTIST)\n        .build()\n    val response: List<Boolean> = client.me().following().check(params)\n}',
      },
      php: {
        method: 'me->following->check',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->me->following->check(\n  ids: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',\n  type: 'artist',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'me.following.check',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.me.following.check(\n    ids="2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6",\n    type="artist",\n)\nprint(response)',
      },
      ruby: {
        method: 'me.following.check',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.me.following.check(\n  ids: "2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6",\n  type: :artist\n)\n\nputs(response)',
      },
      typescript: {
        method: 'client.me.following.check',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.me.following.check({\n  ids: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',\n  type: 'artist',\n});\n\nconsole.log(response);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'player get_state',
        example: "spotted me:player get-state \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Player.GetState',
        example:
          'PlayerGetStateParams parameters = new();\n\nvar response = await client.Me.Player.GetState(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Me.Player.GetState',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Me.Player.GetState(context.TODO(), spotted.MePlayerGetStateParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Actions)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/player \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().player().getState',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.player.PlayerGetStateParams;\nimport dev.cjav.spotted.models.me.player.PlayerGetStateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        PlayerGetStateResponse response = client.me().player().getState();\n    }\n}',
      },
      kotlin: {
        method: 'me().player().getState',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.player.PlayerGetStateParams\nimport dev.cjav.spotted.models.me.player.PlayerGetStateResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val response: PlayerGetStateResponse = client.me().player().getState()\n}',
      },
      php: {
        method: 'me->player->getState',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->me->player->getState(\n  additionalTypes: 'additional_types', market: 'ES'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'me.player.get_state',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.me.player.get_state()\nprint(response.actions)',
      },
      ruby: {
        method: 'me.player.get_state',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.me.player.get_state\n\nputs(response)',
      },
      typescript: {
        method: 'client.me.player.getState',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.me.player.getState();\n\nconsole.log(response.actions);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'player transfer',
        example:
          "spotted me:player transfer \\\n  --access-token 'My Access Token' \\\n  --device-id 74ASZWbe4lXaubB36ztrGX",
      },
      csharp: {
        method: 'Me.Player.Transfer',
        example:
          'PlayerTransferParams parameters = new()\n{\n    DeviceIds =\n    [\n        "74ASZWbe4lXaubB36ztrGX"\n    ],\n};\n\nawait client.Me.Player.Transfer(parameters);',
      },
      go: {
        method: 'client.Me.Player.Transfer',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Player.Transfer(context.TODO(), spotted.MePlayerTransferParams{\n\t\tDeviceIDs: []string{"74ASZWbe4lXaubB36ztrGX"},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/player \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN" \\\n    -d \'{\n          "device_ids": [\n            "74ASZWbe4lXaubB36ztrGX"\n          ]\n        }\'',
      },
      java: {
        method: 'me().player().transfer',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.player.PlayerTransferParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        PlayerTransferParams params = PlayerTransferParams.builder()\n            .addDeviceId("74ASZWbe4lXaubB36ztrGX")\n            .build();\n        client.me().player().transfer(params);\n    }\n}',
      },
      kotlin: {
        method: 'me().player().transfer',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.player.PlayerTransferParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: PlayerTransferParams = PlayerTransferParams.builder()\n        .addDeviceId("74ASZWbe4lXaubB36ztrGX")\n        .build()\n    client.me().player().transfer(params)\n}',
      },
      php: {
        method: 'me->player->transfer',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->player->transfer(\n  deviceIDs: ['74ASZWbe4lXaubB36ztrGX'], play: true, published: true\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.player.transfer',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.player.transfer(\n    device_ids=["74ASZWbe4lXaubB36ztrGX"],\n)',
      },
      ruby: {
        method: 'me.player.transfer',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.player.transfer(device_ids: ["74ASZWbe4lXaubB36ztrGX"])\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.player.transfer',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.player.transfer({ device_ids: ['74ASZWbe4lXaubB36ztrGX'] });",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'player get_devices',
        example: "spotted me:player get-devices \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Player.GetDevices',
        example:
          'PlayerGetDevicesParams parameters = new();\n\nvar response = await client.Me.Player.GetDevices(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Me.Player.GetDevices',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Me.Player.GetDevices(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Devices)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/player/devices \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().player().getDevices',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.player.PlayerGetDevicesParams;\nimport dev.cjav.spotted.models.me.player.PlayerGetDevicesResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        PlayerGetDevicesResponse response = client.me().player().getDevices();\n    }\n}',
      },
      kotlin: {
        method: 'me().player().getDevices',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.player.PlayerGetDevicesParams\nimport dev.cjav.spotted.models.me.player.PlayerGetDevicesResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val response: PlayerGetDevicesResponse = client.me().player().getDevices()\n}',
      },
      php: {
        method: 'me->player->getDevices',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->me->player->getDevices();\n\nvar_dump($response);",
      },
      python: {
        method: 'me.player.get_devices',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.me.player.get_devices()\nprint(response.devices)',
      },
      ruby: {
        method: 'me.player.get_devices',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.me.player.get_devices\n\nputs(response)',
      },
      typescript: {
        method: 'client.me.player.getDevices',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.me.player.getDevices();\n\nconsole.log(response.devices);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'player get_currently_playing',
        example: "spotted me:player get-currently-playing \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Player.GetCurrentlyPlaying',
        example:
          'PlayerGetCurrentlyPlayingParams parameters = new();\n\nvar response = await client.Me.Player.GetCurrentlyPlaying(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Me.Player.GetCurrentlyPlaying',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Me.Player.GetCurrentlyPlaying(context.TODO(), spotted.MePlayerGetCurrentlyPlayingParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Actions)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/player/currently-playing \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().player().getCurrentlyPlaying',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.player.PlayerGetCurrentlyPlayingParams;\nimport dev.cjav.spotted.models.me.player.PlayerGetCurrentlyPlayingResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        PlayerGetCurrentlyPlayingResponse response = client.me().player().getCurrentlyPlaying();\n    }\n}',
      },
      kotlin: {
        method: 'me().player().getCurrentlyPlaying',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.player.PlayerGetCurrentlyPlayingParams\nimport dev.cjav.spotted.models.me.player.PlayerGetCurrentlyPlayingResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val response: PlayerGetCurrentlyPlayingResponse = client.me().player().getCurrentlyPlaying()\n}',
      },
      php: {
        method: 'me->player->getCurrentlyPlaying',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->me->player->getCurrentlyPlaying(\n  additionalTypes: 'additional_types', market: 'ES'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'me.player.get_currently_playing',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.me.player.get_currently_playing()\nprint(response.actions)',
      },
      ruby: {
        method: 'me.player.get_currently_playing',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.me.player.get_currently_playing\n\nputs(response)',
      },
      typescript: {
        method: 'client.me.player.getCurrentlyPlaying',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.me.player.getCurrentlyPlaying();\n\nconsole.log(response.actions);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'player start_playback',
        example: "spotted me:player start-playback \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Player.StartPlayback',
        example:
          'PlayerStartPlaybackParams parameters = new();\n\nawait client.Me.Player.StartPlayback(parameters);',
      },
      go: {
        method: 'client.Me.Player.StartPlayback',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Player.StartPlayback(context.TODO(), spotted.MePlayerStartPlaybackParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/player/play \\\n    -X PUT \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().player().startPlayback',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.player.PlayerStartPlaybackParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        client.me().player().startPlayback();\n    }\n}',
      },
      kotlin: {
        method: 'me().player().startPlayback',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.player.PlayerStartPlaybackParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    client.me().player().startPlayback()\n}',
      },
      php: {
        method: 'me->player->startPlayback',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->player->startPlayback(\n  deviceID: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',\n  contextUri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',\n  offset: ['position' => 'bar'],\n  positionMs: 0,\n  published: true,\n  uris: ['string'],\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.player.start_playback',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.player.start_playback()',
      },
      ruby: {
        method: 'me.player.start_playback',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.player.start_playback\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.player.startPlayback',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.player.startPlayback();",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'player pause_playback',
        example: "spotted me:player pause-playback \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Player.PausePlayback',
        example:
          'PlayerPausePlaybackParams parameters = new();\n\nawait client.Me.Player.PausePlayback(parameters);',
      },
      go: {
        method: 'client.Me.Player.PausePlayback',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Player.PausePlayback(context.TODO(), spotted.MePlayerPausePlaybackParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/player/pause \\\n    -X PUT \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().player().pausePlayback',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.player.PlayerPausePlaybackParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        client.me().player().pausePlayback();\n    }\n}',
      },
      kotlin: {
        method: 'me().player().pausePlayback',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.player.PlayerPausePlaybackParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    client.me().player().pausePlayback()\n}',
      },
      php: {
        method: 'me->player->pausePlayback',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->player->pausePlayback(\n  deviceID: '0d1841b0976bae2a3a310dd74c0f3df354899bc8'\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.player.pause_playback',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.player.pause_playback()',
      },
      ruby: {
        method: 'me.player.pause_playback',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.player.pause_playback\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.player.pausePlayback',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.player.pausePlayback();",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'player skip_next',
        example: "spotted me:player skip-next \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Player.SkipNext',
        example: 'PlayerSkipNextParams parameters = new();\n\nawait client.Me.Player.SkipNext(parameters);',
      },
      go: {
        method: 'client.Me.Player.SkipNext',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Player.SkipNext(context.TODO(), spotted.MePlayerSkipNextParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/player/next \\\n    -X POST \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().player().skipNext',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.player.PlayerSkipNextParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        client.me().player().skipNext();\n    }\n}',
      },
      kotlin: {
        method: 'me().player().skipNext',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.player.PlayerSkipNextParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    client.me().player().skipNext()\n}',
      },
      php: {
        method: 'me->player->skipNext',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->player->skipNext(\n  deviceID: '0d1841b0976bae2a3a310dd74c0f3df354899bc8'\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.player.skip_next',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.player.skip_next()',
      },
      ruby: {
        method: 'me.player.skip_next',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.player.skip_next\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.player.skipNext',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.player.skipNext();",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'player skip_previous',
        example: "spotted me:player skip-previous \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Player.SkipPrevious',
        example:
          'PlayerSkipPreviousParams parameters = new();\n\nawait client.Me.Player.SkipPrevious(parameters);',
      },
      go: {
        method: 'client.Me.Player.SkipPrevious',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Player.SkipPrevious(context.TODO(), spotted.MePlayerSkipPreviousParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/player/previous \\\n    -X POST \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().player().skipPrevious',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.player.PlayerSkipPreviousParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        client.me().player().skipPrevious();\n    }\n}',
      },
      kotlin: {
        method: 'me().player().skipPrevious',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.player.PlayerSkipPreviousParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    client.me().player().skipPrevious()\n}',
      },
      php: {
        method: 'me->player->skipPrevious',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->player->skipPrevious(\n  deviceID: '0d1841b0976bae2a3a310dd74c0f3df354899bc8'\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.player.skip_previous',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.player.skip_previous()',
      },
      ruby: {
        method: 'me.player.skip_previous',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.player.skip_previous\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.player.skipPrevious',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.player.skipPrevious();",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'player seek_to_position',
        example:
          "spotted me:player seek-to-position \\\n  --access-token 'My Access Token' \\\n  --position-ms 25000",
      },
      csharp: {
        method: 'Me.Player.SeekToPosition',
        example:
          'PlayerSeekToPositionParams parameters = new() { PositionMs = 25000 };\n\nawait client.Me.Player.SeekToPosition(parameters);',
      },
      go: {
        method: 'client.Me.Player.SeekToPosition',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Player.SeekToPosition(context.TODO(), spotted.MePlayerSeekToPositionParams{\n\t\tPositionMs: 25000,\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/player/seek \\\n    -X PUT \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().player().seekToPosition',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.player.PlayerSeekToPositionParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        PlayerSeekToPositionParams params = PlayerSeekToPositionParams.builder()\n            .positionMs(25000L)\n            .build();\n        client.me().player().seekToPosition(params);\n    }\n}',
      },
      kotlin: {
        method: 'me().player().seekToPosition',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.player.PlayerSeekToPositionParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: PlayerSeekToPositionParams = PlayerSeekToPositionParams.builder()\n        .positionMs(25000L)\n        .build()\n    client.me().player().seekToPosition(params)\n}',
      },
      php: {
        method: 'me->player->seekToPosition',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->player->seekToPosition(\n  positionMs: 25000, deviceID: '0d1841b0976bae2a3a310dd74c0f3df354899bc8'\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.player.seek_to_position',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.player.seek_to_position(\n    position_ms=25000,\n)',
      },
      ruby: {
        method: 'me.player.seek_to_position',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.player.seek_to_position(position_ms: 25000)\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.player.seekToPosition',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.player.seekToPosition({ position_ms: 25000 });",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'player set_repeat_mode',
        example:
          "spotted me:player set-repeat-mode \\\n  --access-token 'My Access Token' \\\n  --state context",
      },
      csharp: {
        method: 'Me.Player.SetRepeatMode',
        example:
          'PlayerSetRepeatModeParams parameters = new() { State = "context" };\n\nawait client.Me.Player.SetRepeatMode(parameters);',
      },
      go: {
        method: 'client.Me.Player.SetRepeatMode',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Player.SetRepeatMode(context.TODO(), spotted.MePlayerSetRepeatModeParams{\n\t\tState: "context",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/player/repeat \\\n    -X PUT \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().player().setRepeatMode',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.player.PlayerSetRepeatModeParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        PlayerSetRepeatModeParams params = PlayerSetRepeatModeParams.builder()\n            .state("context")\n            .build();\n        client.me().player().setRepeatMode(params);\n    }\n}',
      },
      kotlin: {
        method: 'me().player().setRepeatMode',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.player.PlayerSetRepeatModeParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: PlayerSetRepeatModeParams = PlayerSetRepeatModeParams.builder()\n        .state("context")\n        .build()\n    client.me().player().setRepeatMode(params)\n}',
      },
      php: {
        method: 'me->player->setRepeatMode',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->player->setRepeatMode(\n  state: 'context', deviceID: '0d1841b0976bae2a3a310dd74c0f3df354899bc8'\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.player.set_repeat_mode',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.player.set_repeat_mode(\n    state="context",\n)',
      },
      ruby: {
        method: 'me.player.set_repeat_mode',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.player.set_repeat_mode(state: "context")\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.player.setRepeatMode',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.player.setRepeatMode({ state: 'context' });",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'player set_volume',
        example:
          "spotted me:player set-volume \\\n  --access-token 'My Access Token' \\\n  --volume-percent 50",
      },
      csharp: {
        method: 'Me.Player.SetVolume',
        example:
          'PlayerSetVolumeParams parameters = new() { VolumePercent = 50 };\n\nawait client.Me.Player.SetVolume(parameters);',
      },
      go: {
        method: 'client.Me.Player.SetVolume',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Player.SetVolume(context.TODO(), spotted.MePlayerSetVolumeParams{\n\t\tVolumePercent: 50,\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/player/volume \\\n    -X PUT \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().player().setVolume',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.player.PlayerSetVolumeParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        PlayerSetVolumeParams params = PlayerSetVolumeParams.builder()\n            .volumePercent(50L)\n            .build();\n        client.me().player().setVolume(params);\n    }\n}',
      },
      kotlin: {
        method: 'me().player().setVolume',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.player.PlayerSetVolumeParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: PlayerSetVolumeParams = PlayerSetVolumeParams.builder()\n        .volumePercent(50L)\n        .build()\n    client.me().player().setVolume(params)\n}',
      },
      php: {
        method: 'me->player->setVolume',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->player->setVolume(\n  volumePercent: 50, deviceID: '0d1841b0976bae2a3a310dd74c0f3df354899bc8'\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.player.set_volume',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.player.set_volume(\n    volume_percent=50,\n)',
      },
      ruby: {
        method: 'me.player.set_volume',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.player.set_volume(volume_percent: 50)\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.player.setVolume',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.player.setVolume({ volume_percent: 50 });",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'player toggle_shuffle',
        example: "spotted me:player toggle-shuffle \\\n  --access-token 'My Access Token' \\\n  --state",
      },
      csharp: {
        method: 'Me.Player.ToggleShuffle',
        example:
          'PlayerToggleShuffleParams parameters = new() { State = true };\n\nawait client.Me.Player.ToggleShuffle(parameters);',
      },
      go: {
        method: 'client.Me.Player.ToggleShuffle',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Player.ToggleShuffle(context.TODO(), spotted.MePlayerToggleShuffleParams{\n\t\tState: true,\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/player/shuffle \\\n    -X PUT \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().player().toggleShuffle',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.player.PlayerToggleShuffleParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        PlayerToggleShuffleParams params = PlayerToggleShuffleParams.builder()\n            .state(true)\n            .build();\n        client.me().player().toggleShuffle(params);\n    }\n}',
      },
      kotlin: {
        method: 'me().player().toggleShuffle',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.player.PlayerToggleShuffleParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: PlayerToggleShuffleParams = PlayerToggleShuffleParams.builder()\n        .state(true)\n        .build()\n    client.me().player().toggleShuffle(params)\n}',
      },
      php: {
        method: 'me->player->toggleShuffle',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->player->toggleShuffle(\n  state: true, deviceID: '0d1841b0976bae2a3a310dd74c0f3df354899bc8'\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.player.toggle_shuffle',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.player.toggle_shuffle(\n    state=True,\n)',
      },
      ruby: {
        method: 'me.player.toggle_shuffle',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.player.toggle_shuffle(state: true)\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.player.toggleShuffle',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.player.toggleShuffle({ state: true });",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'player list_recently_played',
        example: "spotted me:player list-recently-played \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Player.ListRecentlyPlayed',
        example:
          'PlayerListRecentlyPlayedParams parameters = new();\n\nvar page = await client.Me.Player.ListRecentlyPlayed(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Me.Player.ListRecentlyPlayed',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Me.Player.ListRecentlyPlayed(context.TODO(), spotted.MePlayerListRecentlyPlayedParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/player/recently-played \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().player().listRecentlyPlayed',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.player.PlayerListRecentlyPlayedPage;\nimport dev.cjav.spotted.models.me.player.PlayerListRecentlyPlayedParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        PlayerListRecentlyPlayedPage page = client.me().player().listRecentlyPlayed();\n    }\n}',
      },
      kotlin: {
        method: 'me().player().listRecentlyPlayed',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.player.PlayerListRecentlyPlayedPage\nimport dev.cjav.spotted.models.me.player.PlayerListRecentlyPlayedParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val page: PlayerListRecentlyPlayedPage = client.me().player().listRecentlyPlayed()\n}',
      },
      php: {
        method: 'me->player->listRecentlyPlayed',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->me->player->listRecentlyPlayed(\n  after: 1484811043508, before: 0, limit: 10\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'me.player.list_recently_played',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.me.player.list_recently_played()\npage = page.items[0]\nprint(page.context)',
      },
      ruby: {
        method: 'me.player.list_recently_played',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\npage = spotted.me.player.list_recently_played\n\nputs(page)',
      },
      typescript: {
        method: 'client.me.player.listRecentlyPlayed',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const playerListRecentlyPlayedResponse of client.me.player.listRecentlyPlayed()) {\n  console.log(playerListRecentlyPlayedResponse.context);\n}",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'queue get',
        example: "spotted me:player:queue get \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Me.Player.Queue.Get',
        example:
          'QueueGetParams parameters = new();\n\nvar queue = await client.Me.Player.Queue.Get(parameters);\n\nConsole.WriteLine(queue);',
      },
      go: {
        method: 'client.Me.Player.Queue.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tqueue, err := client.Me.Player.Queue.Get(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", queue.CurrentlyPlaying)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/player/queue \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().player().queue().get',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.player.queue.QueueGetParams;\nimport dev.cjav.spotted.models.me.player.queue.QueueGetResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        QueueGetResponse queue = client.me().player().queue().get();\n    }\n}',
      },
      kotlin: {
        method: 'me().player().queue().get',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.player.queue.QueueGetParams\nimport dev.cjav.spotted.models.me.player.queue.QueueGetResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val queue: QueueGetResponse = client.me().player().queue().get()\n}',
      },
      php: {
        method: 'me->player->queue->get',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$queue = $client->me->player->queue->get();\n\nvar_dump($queue);",
      },
      python: {
        method: 'me.player.queue.get',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nqueue = client.me.player.queue.get()\nprint(queue.currently_playing)',
      },
      ruby: {
        method: 'me.player.queue.get',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nqueue = spotted.me.player.queue.get\n\nputs(queue)',
      },
      typescript: {
        method: 'client.me.player.queue.get',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst queue = await client.me.player.queue.get();\n\nconsole.log(queue.currently_playing);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'queue add',
        example:
          "spotted me:player:queue add \\\n  --access-token 'My Access Token' \\\n  --uri spotify:track:4iV5W9uYEdYUVa79Axb7Rh",
      },
      csharp: {
        method: 'Me.Player.Queue.Add',
        example:
          'QueueAddParams parameters = new()\n{\n    Uri = "spotify:track:4iV5W9uYEdYUVa79Axb7Rh"\n};\n\nawait client.Me.Player.Queue.Add(parameters);',
      },
      go: {
        method: 'client.Me.Player.Queue.Add',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Me.Player.Queue.Add(context.TODO(), spotted.MePlayerQueueAddParams{\n\t\tUri: "spotify:track:4iV5W9uYEdYUVa79Axb7Rh",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/me/player/queue \\\n    -X POST \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'me().player().queue().add',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.me.player.queue.QueueAddParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        QueueAddParams params = QueueAddParams.builder()\n            .uri("spotify:track:4iV5W9uYEdYUVa79Axb7Rh")\n            .build();\n        client.me().player().queue().add(params);\n    }\n}',
      },
      kotlin: {
        method: 'me().player().queue().add',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.me.player.queue.QueueAddParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: QueueAddParams = QueueAddParams.builder()\n        .uri("spotify:track:4iV5W9uYEdYUVa79Axb7Rh")\n        .build()\n    client.me().player().queue().add(params)\n}',
      },
      php: {
        method: 'me->player->queue->add',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->me->player->queue->add(\n  uri: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',\n  deviceID: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'me.player.queue.add',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.me.player.queue.add(\n    uri="spotify:track:4iV5W9uYEdYUVa79Axb7Rh",\n)',
      },
      ruby: {
        method: 'me.player.queue.add',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.me.player.queue.add(uri: "spotify:track:4iV5W9uYEdYUVa79Axb7Rh")\n\nputs(result)',
      },
      typescript: {
        method: 'client.me.player.queue.add',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.me.player.queue.add({ uri: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh' });",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'chapters retrieve',
        example:
          "spotted chapters retrieve \\\n  --access-token 'My Access Token' \\\n  --id 0D5wENdkdwbqlrHoaJ9g29",
      },
      csharp: {
        method: 'Chapters.Retrieve',
        example:
          'ChapterRetrieveParams parameters = new() { ID = "0D5wENdkdwbqlrHoaJ9g29" };\n\nvar chapter = await client.Chapters.Retrieve(parameters);\n\nConsole.WriteLine(chapter);',
      },
      go: {
        method: 'client.Chapters.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tchapter, err := client.Chapters.Get(\n\t\tcontext.TODO(),\n\t\t"0D5wENdkdwbqlrHoaJ9g29",\n\t\tspotted.ChapterGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", chapter.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/chapters/$ID \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'chapters().retrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.chapters.ChapterRetrieveParams;\nimport dev.cjav.spotted.models.chapters.ChapterRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        ChapterRetrieveResponse chapter = client.chapters().retrieve("0D5wENdkdwbqlrHoaJ9g29");\n    }\n}',
      },
      kotlin: {
        method: 'chapters().retrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.chapters.ChapterRetrieveParams\nimport dev.cjav.spotted.models.chapters.ChapterRetrieveResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val chapter: ChapterRetrieveResponse = client.chapters().retrieve("0D5wENdkdwbqlrHoaJ9g29")\n}',
      },
      php: {
        method: 'chapters->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$chapter = $client->chapters->retrieve('0D5wENdkdwbqlrHoaJ9g29', market: 'ES');\n\nvar_dump($chapter);",
      },
      python: {
        method: 'chapters.retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nchapter = client.chapters.retrieve(\n    id="0D5wENdkdwbqlrHoaJ9g29",\n)\nprint(chapter.id)',
      },
      ruby: {
        method: 'chapters.retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nchapter = spotted.chapters.retrieve("0D5wENdkdwbqlrHoaJ9g29")\n\nputs(chapter)',
      },
      typescript: {
        method: 'client.chapters.retrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst chapter = await client.chapters.retrieve('0D5wENdkdwbqlrHoaJ9g29');\n\nconsole.log(chapter.id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'chapters bulk_retrieve',
        example:
          "spotted chapters bulk-retrieve \\\n  --access-token 'My Access Token' \\\n  --ids 0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29",
      },
      csharp: {
        method: 'Chapters.BulkRetrieve',
        example:
          'ChapterBulkRetrieveParams parameters = new()\n{\n    Ids = "0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29"\n};\n\nvar response = await client.Chapters.BulkRetrieve(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Chapters.BulkGet',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Chapters.BulkGet(context.TODO(), spotted.ChapterBulkGetParams{\n\t\tIDs: "0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Chapters)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/chapters \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'chapters().bulkRetrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.chapters.ChapterBulkRetrieveParams;\nimport dev.cjav.spotted.models.chapters.ChapterBulkRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        ChapterBulkRetrieveParams params = ChapterBulkRetrieveParams.builder()\n            .ids("0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29")\n            .build();\n        ChapterBulkRetrieveResponse response = client.chapters().bulkRetrieve(params);\n    }\n}',
      },
      kotlin: {
        method: 'chapters().bulkRetrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.chapters.ChapterBulkRetrieveParams\nimport dev.cjav.spotted.models.chapters.ChapterBulkRetrieveResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: ChapterBulkRetrieveParams = ChapterBulkRetrieveParams.builder()\n        .ids("0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29")\n        .build()\n    val response: ChapterBulkRetrieveResponse = client.chapters().bulkRetrieve(params)\n}',
      },
      php: {
        method: 'chapters->bulkRetrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->chapters->bulkRetrieve(\n  ids: '0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29',\n  market: 'ES',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'chapters.bulk_retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.chapters.bulk_retrieve(\n    ids="0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29",\n)\nprint(response.chapters)',
      },
      ruby: {
        method: 'chapters.bulk_retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.chapters.bulk_retrieve(\n  ids: "0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29"\n)\n\nputs(response)',
      },
      typescript: {
        method: 'client.chapters.bulkRetrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.chapters.bulkRetrieve({\n  ids: '0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29',\n});\n\nconsole.log(response.chapters);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'tracks retrieve',
        example:
          "spotted tracks retrieve \\\n  --access-token 'My Access Token' \\\n  --id 11dFghVXANMlKmJXsNCbNl",
      },
      csharp: {
        method: 'Tracks.Retrieve',
        example:
          'TrackRetrieveParams parameters = new() { ID = "11dFghVXANMlKmJXsNCbNl" };\n\nvar trackObject = await client.Tracks.Retrieve(parameters);\n\nConsole.WriteLine(trackObject);',
      },
      go: {
        method: 'client.Tracks.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\ttrackObject, err := client.Tracks.Get(\n\t\tcontext.TODO(),\n\t\t"11dFghVXANMlKmJXsNCbNl",\n\t\tspotted.TrackGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", trackObject.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/tracks/$ID \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'tracks().retrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.TrackObject;\nimport dev.cjav.spotted.models.tracks.TrackRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        TrackObject trackObject = client.tracks().retrieve("11dFghVXANMlKmJXsNCbNl");\n    }\n}',
      },
      kotlin: {
        method: 'tracks().retrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.TrackObject\nimport dev.cjav.spotted.models.tracks.TrackRetrieveParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val trackObject: TrackObject = client.tracks().retrieve("11dFghVXANMlKmJXsNCbNl")\n}',
      },
      php: {
        method: 'tracks->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$trackObject = $client->tracks->retrieve(\n  '11dFghVXANMlKmJXsNCbNl', market: 'ES'\n);\n\nvar_dump($trackObject);",
      },
      python: {
        method: 'tracks.retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\ntrack_object = client.tracks.retrieve(\n    id="11dFghVXANMlKmJXsNCbNl",\n)\nprint(track_object.id)',
      },
      ruby: {
        method: 'tracks.retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\ntrack_object = spotted.tracks.retrieve("11dFghVXANMlKmJXsNCbNl")\n\nputs(track_object)',
      },
      typescript: {
        method: 'client.tracks.retrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst trackObject = await client.tracks.retrieve('11dFghVXANMlKmJXsNCbNl');\n\nconsole.log(trackObject.id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'tracks bulk_retrieve',
        example:
          "spotted tracks bulk-retrieve \\\n  --access-token 'My Access Token' \\\n  --ids 7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B",
      },
      csharp: {
        method: 'Tracks.BulkRetrieve',
        example:
          'TrackBulkRetrieveParams parameters = new()\n{\n    Ids = "7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B"\n};\n\nvar response = await client.Tracks.BulkRetrieve(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Tracks.BulkGet',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Tracks.BulkGet(context.TODO(), spotted.TrackBulkGetParams{\n\t\tIDs: "7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Tracks)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/tracks \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'tracks().bulkRetrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.tracks.TrackBulkRetrieveParams;\nimport dev.cjav.spotted.models.tracks.TrackBulkRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        TrackBulkRetrieveParams params = TrackBulkRetrieveParams.builder()\n            .ids("7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B")\n            .build();\n        TrackBulkRetrieveResponse response = client.tracks().bulkRetrieve(params);\n    }\n}',
      },
      kotlin: {
        method: 'tracks().bulkRetrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.tracks.TrackBulkRetrieveParams\nimport dev.cjav.spotted.models.tracks.TrackBulkRetrieveResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: TrackBulkRetrieveParams = TrackBulkRetrieveParams.builder()\n        .ids("7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B")\n        .build()\n    val response: TrackBulkRetrieveResponse = client.tracks().bulkRetrieve(params)\n}',
      },
      php: {
        method: 'tracks->bulkRetrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->tracks->bulkRetrieve(\n  ids: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',\n  market: 'ES',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'tracks.bulk_retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.tracks.bulk_retrieve(\n    ids="7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B",\n)\nprint(response.tracks)',
      },
      ruby: {
        method: 'tracks.bulk_retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.tracks.bulk_retrieve(ids: "7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B")\n\nputs(response)',
      },
      typescript: {
        method: 'client.tracks.bulkRetrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.tracks.bulkRetrieve({\n  ids: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',\n});\n\nconsole.log(response.tracks);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'search query',
        example:
          "spotted search query \\\n  --access-token 'My Access Token' \\\n  --q 'remaster%20track:Doxy%20artist:Miles%20Davis' \\\n  --type album",
      },
      csharp: {
        method: 'Search.Query',
        example:
          'SearchQueryParams parameters = new()\n{\n    Q = "remaster%20track:Doxy%20artist:Miles%20Davis",\n    Type =\n    [\n        Type.Album\n    ],\n};\n\nvar response = await client.Search.Query(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Search.Query',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Search.Query(context.TODO(), spotted.SearchQueryParams{\n\t\tQ:    "remaster%20track:Doxy%20artist:Miles%20Davis",\n\t\tType: []string{"album"},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Albums)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/search \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'search().query',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.search.SearchQueryParams;\nimport dev.cjav.spotted.models.search.SearchQueryResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        SearchQueryParams params = SearchQueryParams.builder()\n            .q("remaster%20track:Doxy%20artist:Miles%20Davis")\n            .addType(SearchQueryParams.Type.ALBUM)\n            .build();\n        SearchQueryResponse response = client.search().query(params);\n    }\n}',
      },
      kotlin: {
        method: 'search().query',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.search.SearchQueryParams\nimport dev.cjav.spotted.models.search.SearchQueryResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: SearchQueryParams = SearchQueryParams.builder()\n        .q("remaster%20track:Doxy%20artist:Miles%20Davis")\n        .addType(SearchQueryParams.Type.ALBUM)\n        .build()\n    val response: SearchQueryResponse = client.search().query(params)\n}',
      },
      php: {
        method: 'search->query',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->search->query(\n  q: 'remaster%20track:Doxy%20artist:Miles%20Davis',\n  type: ['album'],\n  includeExternal: 'audio',\n  limit: 10,\n  market: 'ES',\n  offset: 5,\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'search.query',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.search.query(\n    q="remaster%20track:Doxy%20artist:Miles%20Davis",\n    type=["album"],\n)\nprint(response.albums)',
      },
      ruby: {
        method: 'search.query',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.search.query(q: "remaster%20track:Doxy%20artist:Miles%20Davis", type: [:album])\n\nputs(response)',
      },
      typescript: {
        method: 'client.search.query',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.search.query({\n  q: 'remaster%20track:Doxy%20artist:Miles%20Davis',\n  type: ['album'],\n});\n\nconsole.log(response.albums);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'playlists retrieve',
        example:
          "spotted playlists retrieve \\\n  --access-token 'My Access Token' \\\n  --playlist-id 3cEYpjA9oz9GiPac4AsH4n",
      },
      csharp: {
        method: 'Playlists.Retrieve',
        example:
          'PlaylistRetrieveParams parameters = new()\n{\n    PlaylistID = "3cEYpjA9oz9GiPac4AsH4n"\n};\n\nvar playlist = await client.Playlists.Retrieve(parameters);\n\nConsole.WriteLine(playlist);',
      },
      go: {
        method: 'client.Playlists.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tplaylist, err := client.Playlists.Get(\n\t\tcontext.TODO(),\n\t\t"3cEYpjA9oz9GiPac4AsH4n",\n\t\tspotted.PlaylistGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", playlist.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/playlists/$PLAYLIST_ID \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'playlists().retrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.playlists.PlaylistRetrieveParams;\nimport dev.cjav.spotted.models.playlists.PlaylistRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        PlaylistRetrieveResponse playlist = client.playlists().retrieve("3cEYpjA9oz9GiPac4AsH4n");\n    }\n}',
      },
      kotlin: {
        method: 'playlists().retrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.playlists.PlaylistRetrieveParams\nimport dev.cjav.spotted.models.playlists.PlaylistRetrieveResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val playlist: PlaylistRetrieveResponse = client.playlists().retrieve("3cEYpjA9oz9GiPac4AsH4n")\n}',
      },
      php: {
        method: 'playlists->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$playlist = $client->playlists->retrieve(\n  '3cEYpjA9oz9GiPac4AsH4n',\n  additionalTypes: 'additional_types',\n  fields: 'items(added_by.id,track(name,href,album(name,href)))',\n  market: 'ES',\n);\n\nvar_dump($playlist);",
      },
      python: {
        method: 'playlists.retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nplaylist = client.playlists.retrieve(\n    playlist_id="3cEYpjA9oz9GiPac4AsH4n",\n)\nprint(playlist.id)',
      },
      ruby: {
        method: 'playlists.retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nplaylist = spotted.playlists.retrieve("3cEYpjA9oz9GiPac4AsH4n")\n\nputs(playlist)',
      },
      typescript: {
        method: 'client.playlists.retrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst playlist = await client.playlists.retrieve('3cEYpjA9oz9GiPac4AsH4n');\n\nconsole.log(playlist.id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'playlists update',
        example:
          "spotted playlists update \\\n  --access-token 'My Access Token' \\\n  --playlist-id 3cEYpjA9oz9GiPac4AsH4n",
      },
      csharp: {
        method: 'Playlists.Update',
        example:
          'PlaylistUpdateParams parameters = new()\n{\n    PlaylistID = "3cEYpjA9oz9GiPac4AsH4n"\n};\n\nawait client.Playlists.Update(parameters);',
      },
      go: {
        method: 'client.Playlists.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Playlists.Update(\n\t\tcontext.TODO(),\n\t\t"3cEYpjA9oz9GiPac4AsH4n",\n\t\tspotted.PlaylistUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/playlists/$PLAYLIST_ID \\\n    -X PUT \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'playlists().update',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.playlists.PlaylistUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        client.playlists().update("3cEYpjA9oz9GiPac4AsH4n");\n    }\n}',
      },
      kotlin: {
        method: 'playlists().update',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.playlists.PlaylistUpdateParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    client.playlists().update("3cEYpjA9oz9GiPac4AsH4n")\n}',
      },
      php: {
        method: 'playlists->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->playlists->update(\n  '3cEYpjA9oz9GiPac4AsH4n',\n  collaborative: true,\n  description: 'Updated playlist description',\n  name: 'Updated Playlist Name',\n  published: true,\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'playlists.update',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.playlists.update(\n    playlist_id="3cEYpjA9oz9GiPac4AsH4n",\n)',
      },
      ruby: {
        method: 'playlists.update',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.playlists.update("3cEYpjA9oz9GiPac4AsH4n")\n\nputs(result)',
      },
      typescript: {
        method: 'client.playlists.update',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.playlists.update('3cEYpjA9oz9GiPac4AsH4n');",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'tracks list',
        example:
          "spotted playlists:tracks list \\\n  --access-token 'My Access Token' \\\n  --playlist-id 3cEYpjA9oz9GiPac4AsH4n",
      },
      csharp: {
        method: 'Playlists.Tracks.List',
        example:
          'TrackListParams parameters = new() { PlaylistID = "3cEYpjA9oz9GiPac4AsH4n" };\n\nvar page = await client.Playlists.Tracks.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Playlists.Tracks.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Playlists.Tracks.List(\n\t\tcontext.TODO(),\n\t\t"3cEYpjA9oz9GiPac4AsH4n",\n\t\tspotted.PlaylistTrackListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/playlists/$PLAYLIST_ID/tracks \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'playlists().tracks().list',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.playlists.tracks.TrackListPage;\nimport dev.cjav.spotted.models.playlists.tracks.TrackListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        TrackListPage page = client.playlists().tracks().list("3cEYpjA9oz9GiPac4AsH4n");\n    }\n}',
      },
      kotlin: {
        method: 'playlists().tracks().list',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.playlists.tracks.TrackListPage\nimport dev.cjav.spotted.models.playlists.tracks.TrackListParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val page: TrackListPage = client.playlists().tracks().list("3cEYpjA9oz9GiPac4AsH4n")\n}',
      },
      php: {
        method: 'playlists->tracks->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->playlists->tracks->list(\n  '3cEYpjA9oz9GiPac4AsH4n',\n  additionalTypes: 'additional_types',\n  fields: 'items(added_by.id,track(name,href,album(name,href)))',\n  limit: 10,\n  market: 'ES',\n  offset: 5,\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'playlists.tracks.list',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.playlists.tracks.list(\n    playlist_id="3cEYpjA9oz9GiPac4AsH4n",\n)\npage = page.items[0]\nprint(page.added_at)',
      },
      ruby: {
        method: 'playlists.tracks.list',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\npage = spotted.playlists.tracks.list("3cEYpjA9oz9GiPac4AsH4n")\n\nputs(page)',
      },
      typescript: {
        method: 'client.playlists.tracks.list',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const playlistTrackObject of client.playlists.tracks.list('3cEYpjA9oz9GiPac4AsH4n')) {\n  console.log(playlistTrackObject.added_at);\n}",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'tracks add',
        example:
          "spotted playlists:tracks add \\\n  --access-token 'My Access Token' \\\n  --playlist-id 3cEYpjA9oz9GiPac4AsH4n",
      },
      csharp: {
        method: 'Playlists.Tracks.Add',
        example:
          'TrackAddParams parameters = new() { PlaylistID = "3cEYpjA9oz9GiPac4AsH4n" };\n\nvar response = await client.Playlists.Tracks.Add(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Playlists.Tracks.Add',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Playlists.Tracks.Add(\n\t\tcontext.TODO(),\n\t\t"3cEYpjA9oz9GiPac4AsH4n",\n\t\tspotted.PlaylistTrackAddParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.SnapshotID)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/playlists/$PLAYLIST_ID/tracks \\\n    -X POST \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'playlists().tracks().add',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.playlists.tracks.TrackAddParams;\nimport dev.cjav.spotted.models.playlists.tracks.TrackAddResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        TrackAddResponse response = client.playlists().tracks().add("3cEYpjA9oz9GiPac4AsH4n");\n    }\n}',
      },
      kotlin: {
        method: 'playlists().tracks().add',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.playlists.tracks.TrackAddParams\nimport dev.cjav.spotted.models.playlists.tracks.TrackAddResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val response: TrackAddResponse = client.playlists().tracks().add("3cEYpjA9oz9GiPac4AsH4n")\n}',
      },
      php: {
        method: 'playlists->tracks->add',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->playlists->tracks->add(\n  '3cEYpjA9oz9GiPac4AsH4n', position: 0, published: true, uris: ['string']\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'playlists.tracks.add',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.playlists.tracks.add(\n    playlist_id="3cEYpjA9oz9GiPac4AsH4n",\n)\nprint(response.snapshot_id)',
      },
      ruby: {
        method: 'playlists.tracks.add',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.playlists.tracks.add("3cEYpjA9oz9GiPac4AsH4n")\n\nputs(response)',
      },
      typescript: {
        method: 'client.playlists.tracks.add',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.playlists.tracks.add('3cEYpjA9oz9GiPac4AsH4n');\n\nconsole.log(response.snapshot_id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'tracks update',
        example:
          "spotted playlists:tracks update \\\n  --access-token 'My Access Token' \\\n  --playlist-id 3cEYpjA9oz9GiPac4AsH4n",
      },
      csharp: {
        method: 'Playlists.Tracks.Update',
        example:
          'TrackUpdateParams parameters = new() { PlaylistID = "3cEYpjA9oz9GiPac4AsH4n" };\n\nvar track = await client.Playlists.Tracks.Update(parameters);\n\nConsole.WriteLine(track);',
      },
      go: {
        method: 'client.Playlists.Tracks.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\ttrack, err := client.Playlists.Tracks.Update(\n\t\tcontext.TODO(),\n\t\t"3cEYpjA9oz9GiPac4AsH4n",\n\t\tspotted.PlaylistTrackUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", track.SnapshotID)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/playlists/$PLAYLIST_ID/tracks \\\n    -X PUT \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'playlists().tracks().update',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.playlists.tracks.TrackUpdateParams;\nimport dev.cjav.spotted.models.playlists.tracks.TrackUpdateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        TrackUpdateResponse track = client.playlists().tracks().update("3cEYpjA9oz9GiPac4AsH4n");\n    }\n}',
      },
      kotlin: {
        method: 'playlists().tracks().update',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.playlists.tracks.TrackUpdateParams\nimport dev.cjav.spotted.models.playlists.tracks.TrackUpdateResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val track: TrackUpdateResponse = client.playlists().tracks().update("3cEYpjA9oz9GiPac4AsH4n")\n}',
      },
      php: {
        method: 'playlists->tracks->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$track = $client->playlists->tracks->update(\n  '3cEYpjA9oz9GiPac4AsH4n',\n  insertBefore: 3,\n  published: true,\n  rangeLength: 2,\n  rangeStart: 1,\n  snapshotID: 'snapshot_id',\n  uris: ['string'],\n);\n\nvar_dump($track);",
      },
      python: {
        method: 'playlists.tracks.update',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\ntrack = client.playlists.tracks.update(\n    playlist_id="3cEYpjA9oz9GiPac4AsH4n",\n)\nprint(track.snapshot_id)',
      },
      ruby: {
        method: 'playlists.tracks.update',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\ntrack = spotted.playlists.tracks.update("3cEYpjA9oz9GiPac4AsH4n")\n\nputs(track)',
      },
      typescript: {
        method: 'client.playlists.tracks.update',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst track = await client.playlists.tracks.update('3cEYpjA9oz9GiPac4AsH4n');\n\nconsole.log(track.snapshot_id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'tracks remove',
        example:
          "spotted playlists:tracks remove \\\n  --access-token 'My Access Token' \\\n  --playlist-id 3cEYpjA9oz9GiPac4AsH4n \\\n  --track '{}'",
      },
      csharp: {
        method: 'Playlists.Tracks.Remove',
        example:
          'TrackRemoveParams parameters = new()\n{\n    PlaylistID = "3cEYpjA9oz9GiPac4AsH4n",\n    Tracks =\n    [\n        new() { Uri = "uri" }\n    ],\n};\n\nvar track = await client.Playlists.Tracks.Remove(parameters);\n\nConsole.WriteLine(track);',
      },
      go: {
        method: 'client.Playlists.Tracks.Remove',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\ttrack, err := client.Playlists.Tracks.Remove(\n\t\tcontext.TODO(),\n\t\t"3cEYpjA9oz9GiPac4AsH4n",\n\t\tspotted.PlaylistTrackRemoveParams{\n\t\t\tTracks: []spotted.PlaylistTrackRemoveParamsTrack{{}},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", track.SnapshotID)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/playlists/$PLAYLIST_ID/tracks \\\n    -X DELETE \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'playlists().tracks().remove',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.playlists.tracks.TrackRemoveParams;\nimport dev.cjav.spotted.models.playlists.tracks.TrackRemoveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        TrackRemoveParams params = TrackRemoveParams.builder()\n            .playlistId("3cEYpjA9oz9GiPac4AsH4n")\n            .addTrack(TrackRemoveParams.Track.builder().build())\n            .build();\n        TrackRemoveResponse track = client.playlists().tracks().remove(params);\n    }\n}',
      },
      kotlin: {
        method: 'playlists().tracks().remove',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.playlists.tracks.TrackRemoveParams\nimport dev.cjav.spotted.models.playlists.tracks.TrackRemoveResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: TrackRemoveParams = TrackRemoveParams.builder()\n        .playlistId("3cEYpjA9oz9GiPac4AsH4n")\n        .addTrack(TrackRemoveParams.Track.builder().build())\n        .build()\n    val track: TrackRemoveResponse = client.playlists().tracks().remove(params)\n}',
      },
      php: {
        method: 'playlists->tracks->remove',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$track = $client->playlists->tracks->remove(\n  '3cEYpjA9oz9GiPac4AsH4n',\n  tracks: [['uri' => 'uri']],\n  published: true,\n  snapshotID: 'snapshot_id',\n);\n\nvar_dump($track);",
      },
      python: {
        method: 'playlists.tracks.remove',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\ntrack = client.playlists.tracks.remove(\n    playlist_id="3cEYpjA9oz9GiPac4AsH4n",\n    tracks=[{}],\n)\nprint(track.snapshot_id)',
      },
      ruby: {
        method: 'playlists.tracks.remove',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\ntrack = spotted.playlists.tracks.remove("3cEYpjA9oz9GiPac4AsH4n", tracks: [{}])\n\nputs(track)',
      },
      typescript: {
        method: 'client.playlists.tracks.remove',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst track = await client.playlists.tracks.remove('3cEYpjA9oz9GiPac4AsH4n', { tracks: [{}] });\n\nconsole.log(track.snapshot_id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'followers follow',
        example:
          "spotted playlists:followers follow \\\n  --access-token 'My Access Token' \\\n  --playlist-id 3cEYpjA9oz9GiPac4AsH4n",
      },
      csharp: {
        method: 'Playlists.Followers.Follow',
        example:
          'FollowerFollowParams parameters = new()\n{\n    PlaylistID = "3cEYpjA9oz9GiPac4AsH4n"\n};\n\nawait client.Playlists.Followers.Follow(parameters);',
      },
      go: {
        method: 'client.Playlists.Followers.Follow',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Playlists.Followers.Follow(\n\t\tcontext.TODO(),\n\t\t"3cEYpjA9oz9GiPac4AsH4n",\n\t\tspotted.PlaylistFollowerFollowParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/playlists/$PLAYLIST_ID/followers \\\n    -X PUT \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'playlists().followers().follow',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.playlists.followers.FollowerFollowParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        client.playlists().followers().follow("3cEYpjA9oz9GiPac4AsH4n");\n    }\n}',
      },
      kotlin: {
        method: 'playlists().followers().follow',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.playlists.followers.FollowerFollowParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    client.playlists().followers().follow("3cEYpjA9oz9GiPac4AsH4n")\n}',
      },
      php: {
        method: 'playlists->followers->follow',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->playlists->followers->follow(\n  '3cEYpjA9oz9GiPac4AsH4n', published: true\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'playlists.followers.follow',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.playlists.followers.follow(\n    playlist_id="3cEYpjA9oz9GiPac4AsH4n",\n)',
      },
      ruby: {
        method: 'playlists.followers.follow',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.playlists.followers.follow("3cEYpjA9oz9GiPac4AsH4n")\n\nputs(result)',
      },
      typescript: {
        method: 'client.playlists.followers.follow',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.playlists.followers.follow('3cEYpjA9oz9GiPac4AsH4n');",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'followers unfollow',
        example:
          "spotted playlists:followers unfollow \\\n  --access-token 'My Access Token' \\\n  --playlist-id 3cEYpjA9oz9GiPac4AsH4n",
      },
      csharp: {
        method: 'Playlists.Followers.Unfollow',
        example:
          'FollowerUnfollowParams parameters = new()\n{\n    PlaylistID = "3cEYpjA9oz9GiPac4AsH4n"\n};\n\nawait client.Playlists.Followers.Unfollow(parameters);',
      },
      go: {
        method: 'client.Playlists.Followers.Unfollow',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Playlists.Followers.Unfollow(context.TODO(), "3cEYpjA9oz9GiPac4AsH4n")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/playlists/$PLAYLIST_ID/followers \\\n    -X DELETE \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'playlists().followers().unfollow',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.playlists.followers.FollowerUnfollowParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        client.playlists().followers().unfollow("3cEYpjA9oz9GiPac4AsH4n");\n    }\n}',
      },
      kotlin: {
        method: 'playlists().followers().unfollow',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.playlists.followers.FollowerUnfollowParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    client.playlists().followers().unfollow("3cEYpjA9oz9GiPac4AsH4n")\n}',
      },
      php: {
        method: 'playlists->followers->unfollow',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->playlists->followers->unfollow('3cEYpjA9oz9GiPac4AsH4n');\n\nvar_dump($result);",
      },
      python: {
        method: 'playlists.followers.unfollow',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.playlists.followers.unfollow(\n    "3cEYpjA9oz9GiPac4AsH4n",\n)',
      },
      ruby: {
        method: 'playlists.followers.unfollow',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresult = spotted.playlists.followers.unfollow("3cEYpjA9oz9GiPac4AsH4n")\n\nputs(result)',
      },
      typescript: {
        method: 'client.playlists.followers.unfollow',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.playlists.followers.unfollow('3cEYpjA9oz9GiPac4AsH4n');",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'followers check',
        example:
          "spotted playlists:followers check \\\n  --access-token 'My Access Token' \\\n  --playlist-id 3cEYpjA9oz9GiPac4AsH4n",
      },
      csharp: {
        method: 'Playlists.Followers.Check',
        example:
          'FollowerCheckParams parameters = new()\n{\n    PlaylistID = "3cEYpjA9oz9GiPac4AsH4n"\n};\n\nvar response = await client.Playlists.Followers.Check(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Playlists.Followers.Check',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Playlists.Followers.Check(\n\t\tcontext.TODO(),\n\t\t"3cEYpjA9oz9GiPac4AsH4n",\n\t\tspotted.PlaylistFollowerCheckParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/playlists/$PLAYLIST_ID/followers/contains \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'playlists().followers().check',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.playlists.followers.FollowerCheckParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        List<Boolean> response = client.playlists().followers().check("3cEYpjA9oz9GiPac4AsH4n");\n    }\n}',
      },
      kotlin: {
        method: 'playlists().followers().check',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.playlists.followers.FollowerCheckParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val response: List<Boolean> = client.playlists().followers().check("3cEYpjA9oz9GiPac4AsH4n")\n}',
      },
      php: {
        method: 'playlists->followers->check',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->playlists->followers->check(\n  '3cEYpjA9oz9GiPac4AsH4n', ids: 'jmperezperez'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'playlists.followers.check',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.playlists.followers.check(\n    playlist_id="3cEYpjA9oz9GiPac4AsH4n",\n)\nprint(response)',
      },
      ruby: {
        method: 'playlists.followers.check',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.playlists.followers.check("3cEYpjA9oz9GiPac4AsH4n")\n\nputs(response)',
      },
      typescript: {
        method: 'client.playlists.followers.check',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.playlists.followers.check('3cEYpjA9oz9GiPac4AsH4n');\n\nconsole.log(response);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'images list',
        example:
          "spotted playlists:images list \\\n  --access-token 'My Access Token' \\\n  --playlist-id 3cEYpjA9oz9GiPac4AsH4n",
      },
      csharp: {
        method: 'Playlists.Images.List',
        example:
          'ImageListParams parameters = new() { PlaylistID = "3cEYpjA9oz9GiPac4AsH4n" };\n\nvar imageObjects = await client.Playlists.Images.List(parameters);\n\nConsole.WriteLine(imageObjects);',
      },
      go: {
        method: 'client.Playlists.Images.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\timageObjects, err := client.Playlists.Images.List(context.TODO(), "3cEYpjA9oz9GiPac4AsH4n")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", imageObjects)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/playlists/$PLAYLIST_ID/images \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'playlists().images().list',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.ImageObject;\nimport dev.cjav.spotted.models.playlists.images.ImageListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        List<ImageObject> imageObjects = client.playlists().images().list("3cEYpjA9oz9GiPac4AsH4n");\n    }\n}',
      },
      kotlin: {
        method: 'playlists().images().list',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.ImageObject\nimport dev.cjav.spotted.models.playlists.images.ImageListParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val imageObjects: List<ImageObject> = client.playlists().images().list("3cEYpjA9oz9GiPac4AsH4n")\n}',
      },
      php: {
        method: 'playlists->images->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$imageObjects = $client->playlists->images->list('3cEYpjA9oz9GiPac4AsH4n');\n\nvar_dump($imageObjects);",
      },
      python: {
        method: 'playlists.images.list',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nimage_objects = client.playlists.images.list(\n    "3cEYpjA9oz9GiPac4AsH4n",\n)\nprint(image_objects)',
      },
      ruby: {
        method: 'playlists.images.list',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nimage_objects = spotted.playlists.images.list("3cEYpjA9oz9GiPac4AsH4n")\n\nputs(image_objects)',
      },
      typescript: {
        method: 'client.playlists.images.list',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst imageObjects = await client.playlists.images.list('3cEYpjA9oz9GiPac4AsH4n');\n\nconsole.log(imageObjects);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'images update',
        example:
          "spotted playlists:images update \\\n  --access-token 'My Access Token' \\\n  --playlist-id 3cEYpjA9oz9GiPac4AsH4n \\\n  --body 'Example data'",
      },
      csharp: {
        method: 'Playlists.Images.Update',
        example:
          'ImageUpdateParams parameters = new()\n{\n    PlaylistID = "3cEYpjA9oz9GiPac4AsH4n",\n    Body = Encoding.UTF8.GetBytes("Example data"),\n};\n\nvar image = await client.Playlists.Images.Update(parameters);\n\nConsole.WriteLine(image);',
      },
      go: {
        method: 'client.Playlists.Images.Update',
        example:
          'package main\n\nimport (\n\t"bytes"\n\t"context"\n\t"fmt"\n\t"io"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\timage, err := client.Playlists.Images.Update(\n\t\tcontext.TODO(),\n\t\t"3cEYpjA9oz9GiPac4AsH4n",\n\t\tio.Reader(bytes.NewBuffer([]byte("Example data"))),\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", image)\n}\n',
      },
      http: {
        example:
          "curl https://api.spotify.com/v1/playlists/$PLAYLIST_ID/images \\\n    -X PUT \\\n    -H 'Content-Type: image/jpeg' \\\n    -H \"Authorization: Bearer $SPOTIFY_ACCESS_TOKEN\" \\\n    -F 'body=@/path/to/body'",
      },
      java: {
        method: 'playlists().images().update',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.core.http.HttpResponse;\nimport dev.cjav.spotted.models.playlists.images.ImageUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        HttpResponse image = client.playlists().images().update(\n          "3cEYpjA9oz9GiPac4AsH4n", "Example data"\n        );\n    }\n}',
      },
      kotlin: {
        method: 'playlists().images().update',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.core.http.HttpResponse\nimport dev.cjav.spotted.models.playlists.images.ImageUpdateParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val image: HttpResponse = client.playlists().images().update(\n      "3cEYpjA9oz9GiPac4AsH4n", "Example data"\n    )\n}',
      },
      php: {
        method: 'playlists->images->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$image = $client->playlists->images->update('3cEYpjA9oz9GiPac4AsH4n', 'file');\n\nvar_dump($image);",
      },
      python: {
        method: 'playlists.images.update',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nimage = client.playlists.images.update(\n    playlist_id="3cEYpjA9oz9GiPac4AsH4n",\n    body=b"Example data",\n)\nprint(image)\ncontent = image.read()\nprint(content)',
      },
      ruby: {
        method: 'playlists.images.update',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nimage = spotted.playlists.images.update("3cEYpjA9oz9GiPac4AsH4n", body: StringIO.new("Example data"))\n\nputs(image)',
      },
      typescript: {
        method: 'client.playlists.images.update',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst image = await client.playlists.images.update(\n  '3cEYpjA9oz9GiPac4AsH4n',\n  fs.createReadStream('path/to/file'),\n);\n\nconsole.log(image);\n\nconst content = await image.blob();\nconsole.log(content);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'users retrieve_profile',
        example:
          "spotted users retrieve-profile \\\n  --access-token 'My Access Token' \\\n  --user-id smedjan",
      },
      csharp: {
        method: 'Users.RetrieveProfile',
        example:
          'UserRetrieveProfileParams parameters = new() { UserID = "smedjan" };\n\nvar response = await client.Users.RetrieveProfile(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Users.GetProfile',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Users.GetProfile(context.TODO(), "smedjan")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/users/$USER_ID \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'users().retrieveProfile',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.users.UserRetrieveProfileParams;\nimport dev.cjav.spotted.models.users.UserRetrieveProfileResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        UserRetrieveProfileResponse response = client.users().retrieveProfile("smedjan");\n    }\n}',
      },
      kotlin: {
        method: 'users().retrieveProfile',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.users.UserRetrieveProfileParams\nimport dev.cjav.spotted.models.users.UserRetrieveProfileResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val response: UserRetrieveProfileResponse = client.users().retrieveProfile("smedjan")\n}',
      },
      php: {
        method: 'users->retrieveProfile',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->users->retrieveProfile('smedjan');\n\nvar_dump($response);",
      },
      python: {
        method: 'users.retrieve_profile',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.users.retrieve_profile(\n    "smedjan",\n)\nprint(response.id)',
      },
      ruby: {
        method: 'users.retrieve_profile',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.users.retrieve_profile("smedjan")\n\nputs(response)',
      },
      typescript: {
        method: 'client.users.retrieveProfile',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.users.retrieveProfile('smedjan');\n\nconsole.log(response.id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'playlists list',
        example:
          "spotted users:playlists list \\\n  --access-token 'My Access Token' \\\n  --user-id smedjan",
      },
      csharp: {
        method: 'Users.Playlists.List',
        example:
          'PlaylistListParams parameters = new() { UserID = "smedjan" };\n\nvar page = await client.Users.Playlists.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Users.Playlists.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Users.Playlists.List(\n\t\tcontext.TODO(),\n\t\t"smedjan",\n\t\tspotted.UserPlaylistListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/users/$USER_ID/playlists \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'users().playlists().list',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.users.playlists.PlaylistListPage;\nimport dev.cjav.spotted.models.users.playlists.PlaylistListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        PlaylistListPage page = client.users().playlists().list("smedjan");\n    }\n}',
      },
      kotlin: {
        method: 'users().playlists().list',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.users.playlists.PlaylistListPage\nimport dev.cjav.spotted.models.users.playlists.PlaylistListParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val page: PlaylistListPage = client.users().playlists().list("smedjan")\n}',
      },
      php: {
        method: 'users->playlists->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->users->playlists->list('smedjan', limit: 10, offset: 5);\n\nvar_dump($page);",
      },
      python: {
        method: 'users.playlists.list',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.users.playlists.list(\n    user_id="smedjan",\n)\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'users.playlists.list',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\npage = spotted.users.playlists.list("smedjan")\n\nputs(page)',
      },
      typescript: {
        method: 'client.users.playlists.list',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const simplifiedPlaylistObject of client.users.playlists.list('smedjan')) {\n  console.log(simplifiedPlaylistObject.id);\n}",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'playlists create',
        example:
          "spotted users:playlists create \\\n  --access-token 'My Access Token' \\\n  --user-id smedjan \\\n  --name 'New Playlist'",
      },
      csharp: {
        method: 'Users.Playlists.Create',
        example:
          'PlaylistCreateParams parameters = new()\n{\n    UserID = "smedjan",\n    Name = "New Playlist",\n};\n\nvar playlist = await client.Users.Playlists.Create(parameters);\n\nConsole.WriteLine(playlist);',
      },
      go: {
        method: 'client.Users.Playlists.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tplaylist, err := client.Users.Playlists.New(\n\t\tcontext.TODO(),\n\t\t"smedjan",\n\t\tspotted.UserPlaylistNewParams{\n\t\t\tName: "New Playlist",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", playlist.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/users/$USER_ID/playlists \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN" \\\n    -d \'{\n          "name": "New Playlist"\n        }\'',
      },
      java: {
        method: 'users().playlists().create',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.users.playlists.PlaylistCreateParams;\nimport dev.cjav.spotted.models.users.playlists.PlaylistCreateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        PlaylistCreateParams params = PlaylistCreateParams.builder()\n            .userId("smedjan")\n            .name("New Playlist")\n            .build();\n        PlaylistCreateResponse playlist = client.users().playlists().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'users().playlists().create',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.users.playlists.PlaylistCreateParams\nimport dev.cjav.spotted.models.users.playlists.PlaylistCreateResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: PlaylistCreateParams = PlaylistCreateParams.builder()\n        .userId("smedjan")\n        .name("New Playlist")\n        .build()\n    val playlist: PlaylistCreateResponse = client.users().playlists().create(params)\n}',
      },
      php: {
        method: 'users->playlists->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$playlist = $client->users->playlists->create(\n  'smedjan',\n  name: 'New Playlist',\n  collaborative: true,\n  description: 'New playlist description',\n  published: true,\n);\n\nvar_dump($playlist);",
      },
      python: {
        method: 'users.playlists.create',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nplaylist = client.users.playlists.create(\n    user_id="smedjan",\n    name="New Playlist",\n)\nprint(playlist.id)',
      },
      ruby: {
        method: 'users.playlists.create',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nplaylist = spotted.users.playlists.create("smedjan", name: "New Playlist")\n\nputs(playlist)',
      },
      typescript: {
        method: 'client.users.playlists.create',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst playlist = await client.users.playlists.create('smedjan', { name: 'New Playlist' });\n\nconsole.log(playlist.id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'browse get_featured_playlists',
        example: "spotted browse get-featured-playlists \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Browse.GetFeaturedPlaylists',
        example:
          'BrowseGetFeaturedPlaylistsParams parameters = new();\n\nvar response = await client.Browse.GetFeaturedPlaylists(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Browse.GetFeaturedPlaylists',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Browse.GetFeaturedPlaylists(context.TODO(), spotted.BrowseGetFeaturedPlaylistsParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Message)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/browse/featured-playlists \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'browse().getFeaturedPlaylists',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.browse.BrowseGetFeaturedPlaylistsParams;\nimport dev.cjav.spotted.models.browse.BrowseGetFeaturedPlaylistsResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        BrowseGetFeaturedPlaylistsResponse response = client.browse().getFeaturedPlaylists();\n    }\n}',
      },
      kotlin: {
        method: 'browse().getFeaturedPlaylists',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.browse.BrowseGetFeaturedPlaylistsParams\nimport dev.cjav.spotted.models.browse.BrowseGetFeaturedPlaylistsResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val response: BrowseGetFeaturedPlaylistsResponse = client.browse().getFeaturedPlaylists()\n}',
      },
      php: {
        method: 'browse->getFeaturedPlaylists',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->browse->getFeaturedPlaylists(\n  limit: 10, locale: 'sv_SE', offset: 5\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'browse.get_featured_playlists',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.browse.get_featured_playlists()\nprint(response.message)',
      },
      ruby: {
        method: 'browse.get_featured_playlists',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.browse.get_featured_playlists\n\nputs(response)',
      },
      typescript: {
        method: 'client.browse.getFeaturedPlaylists',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.browse.getFeaturedPlaylists();\n\nconsole.log(response.message);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'browse get_new_releases',
        example: "spotted browse get-new-releases \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Browse.GetNewReleases',
        example:
          'BrowseGetNewReleasesParams parameters = new();\n\nvar response = await client.Browse.GetNewReleases(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Browse.GetNewReleases',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Browse.GetNewReleases(context.TODO(), spotted.BrowseGetNewReleasesParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Albums)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/browse/new-releases \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'browse().getNewReleases',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.browse.BrowseGetNewReleasesParams;\nimport dev.cjav.spotted.models.browse.BrowseGetNewReleasesResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        BrowseGetNewReleasesResponse response = client.browse().getNewReleases();\n    }\n}',
      },
      kotlin: {
        method: 'browse().getNewReleases',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.browse.BrowseGetNewReleasesParams\nimport dev.cjav.spotted.models.browse.BrowseGetNewReleasesResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val response: BrowseGetNewReleasesResponse = client.browse().getNewReleases()\n}',
      },
      php: {
        method: 'browse->getNewReleases',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->browse->getNewReleases(limit: 10, offset: 5);\n\nvar_dump($response);",
      },
      python: {
        method: 'browse.get_new_releases',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.browse.get_new_releases()\nprint(response.albums)',
      },
      ruby: {
        method: 'browse.get_new_releases',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.browse.get_new_releases\n\nputs(response)',
      },
      typescript: {
        method: 'client.browse.getNewReleases',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.browse.getNewReleases();\n\nconsole.log(response.albums);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'categories list',
        example: "spotted browse:categories list \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Browse.Categories.List',
        example:
          'CategoryListParams parameters = new();\n\nvar page = await client.Browse.Categories.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Browse.Categories.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Browse.Categories.List(context.TODO(), spotted.BrowseCategoryListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/browse/categories \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'browse().categories().list',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.browse.categories.CategoryListPage;\nimport dev.cjav.spotted.models.browse.categories.CategoryListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        CategoryListPage page = client.browse().categories().list();\n    }\n}',
      },
      kotlin: {
        method: 'browse().categories().list',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.browse.categories.CategoryListPage\nimport dev.cjav.spotted.models.browse.categories.CategoryListParams\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val page: CategoryListPage = client.browse().categories().list()\n}',
      },
      php: {
        method: 'browse->categories->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->browse->categories->list(\n  limit: 10, locale: 'sv_SE', offset: 5\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'browse.categories.list',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.browse.categories.list()\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'browse.categories.list',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\npage = spotted.browse.categories.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.browse.categories.list',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const categoryListResponse of client.browse.categories.list()) {\n  console.log(categoryListResponse.id);\n}",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'categories retrieve',
        example:
          "spotted browse:categories retrieve \\\n  --access-token 'My Access Token' \\\n  --category-id dinner",
      },
      csharp: {
        method: 'Browse.Categories.Retrieve',
        example:
          'CategoryRetrieveParams parameters = new() { CategoryID = "dinner" };\n\nvar category = await client.Browse.Categories.Retrieve(parameters);\n\nConsole.WriteLine(category);',
      },
      go: {
        method: 'client.Browse.Categories.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tcategory, err := client.Browse.Categories.Get(\n\t\tcontext.TODO(),\n\t\t"dinner",\n\t\tspotted.BrowseCategoryGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", category.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/browse/categories/$CATEGORY_ID \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'browse().categories().retrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.browse.categories.CategoryRetrieveParams;\nimport dev.cjav.spotted.models.browse.categories.CategoryRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        CategoryRetrieveResponse category = client.browse().categories().retrieve("dinner");\n    }\n}',
      },
      kotlin: {
        method: 'browse().categories().retrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.browse.categories.CategoryRetrieveParams\nimport dev.cjav.spotted.models.browse.categories.CategoryRetrieveResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val category: CategoryRetrieveResponse = client.browse().categories().retrieve("dinner")\n}',
      },
      php: {
        method: 'browse->categories->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$category = $client->browse->categories->retrieve('dinner', locale: 'sv_SE');\n\nvar_dump($category);",
      },
      python: {
        method: 'browse.categories.retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\ncategory = client.browse.categories.retrieve(\n    category_id="dinner",\n)\nprint(category.id)',
      },
      ruby: {
        method: 'browse.categories.retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\ncategory = spotted.browse.categories.retrieve("dinner")\n\nputs(category)',
      },
      typescript: {
        method: 'client.browse.categories.retrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst category = await client.browse.categories.retrieve('dinner');\n\nconsole.log(category.id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'categories get_playlists',
        example:
          "spotted browse:categories get-playlists \\\n  --access-token 'My Access Token' \\\n  --category-id dinner",
      },
      csharp: {
        method: 'Browse.Categories.GetPlaylists',
        example:
          'CategoryGetPlaylistsParams parameters = new() { CategoryID = "dinner" };\n\nvar response = await client.Browse.Categories.GetPlaylists(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Browse.Categories.GetPlaylists',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Browse.Categories.GetPlaylists(\n\t\tcontext.TODO(),\n\t\t"dinner",\n\t\tspotted.BrowseCategoryGetPlaylistsParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Message)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/browse/categories/$CATEGORY_ID/playlists \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'browse().categories().getPlaylists',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.browse.categories.CategoryGetPlaylistsParams;\nimport dev.cjav.spotted.models.browse.categories.CategoryGetPlaylistsResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        CategoryGetPlaylistsResponse response = client.browse().categories().getPlaylists("dinner");\n    }\n}',
      },
      kotlin: {
        method: 'browse().categories().getPlaylists',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.browse.categories.CategoryGetPlaylistsParams\nimport dev.cjav.spotted.models.browse.categories.CategoryGetPlaylistsResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val response: CategoryGetPlaylistsResponse = client.browse().categories().getPlaylists("dinner")\n}',
      },
      php: {
        method: 'browse->categories->getPlaylists',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->browse->categories->getPlaylists(\n  'dinner', limit: 10, offset: 5\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'browse.categories.get_playlists',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.browse.categories.get_playlists(\n    category_id="dinner",\n)\nprint(response.message)',
      },
      ruby: {
        method: 'browse.categories.get_playlists',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.browse.categories.get_playlists("dinner")\n\nputs(response)',
      },
      typescript: {
        method: 'client.browse.categories.getPlaylists',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.browse.categories.getPlaylists('dinner');\n\nconsole.log(response.message);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'audio_features bulk_retrieve',
        example:
          "spotted audio-features bulk-retrieve \\\n  --access-token 'My Access Token' \\\n  --ids 7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B",
      },
      csharp: {
        method: 'AudioFeatures.BulkRetrieve',
        example:
          'AudioFeatureBulkRetrieveParams parameters = new()\n{\n    Ids = "7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B"\n};\n\nvar response = await client.AudioFeatures.BulkRetrieve(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.AudioFeatures.BulkGet',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.AudioFeatures.BulkGet(context.TODO(), spotted.AudioFeatureBulkGetParams{\n\t\tIDs: "7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.AudioFeatures)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/audio-features \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'audioFeatures().bulkRetrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.audiofeatures.AudioFeatureBulkRetrieveParams;\nimport dev.cjav.spotted.models.audiofeatures.AudioFeatureBulkRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        AudioFeatureBulkRetrieveParams params = AudioFeatureBulkRetrieveParams.builder()\n            .ids("7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B")\n            .build();\n        AudioFeatureBulkRetrieveResponse response = client.audioFeatures().bulkRetrieve(params);\n    }\n}',
      },
      kotlin: {
        method: 'audioFeatures().bulkRetrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.audiofeatures.AudioFeatureBulkRetrieveParams\nimport dev.cjav.spotted.models.audiofeatures.AudioFeatureBulkRetrieveResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val params: AudioFeatureBulkRetrieveParams = AudioFeatureBulkRetrieveParams.builder()\n        .ids("7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B")\n        .build()\n    val response: AudioFeatureBulkRetrieveResponse = client.audioFeatures().bulkRetrieve(params)\n}',
      },
      php: {
        method: 'audioFeatures->bulkRetrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->audioFeatures->bulkRetrieve(\n  ids: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'audio_features.bulk_retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.audio_features.bulk_retrieve(\n    ids="7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B",\n)\nprint(response.audio_features)',
      },
      ruby: {
        method: 'audio_features.bulk_retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.audio_features.bulk_retrieve(\n  ids: "7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B"\n)\n\nputs(response)',
      },
      typescript: {
        method: 'client.audioFeatures.bulkRetrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.audioFeatures.bulkRetrieve({\n  ids: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',\n});\n\nconsole.log(response.audio_features);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'audio_features retrieve',
        example:
          "spotted audio-features retrieve \\\n  --access-token 'My Access Token' \\\n  --id 11dFghVXANMlKmJXsNCbNl",
      },
      csharp: {
        method: 'AudioFeatures.Retrieve',
        example:
          'AudioFeatureRetrieveParams parameters = new() { ID = "11dFghVXANMlKmJXsNCbNl" };\n\nvar audioFeature = await client.AudioFeatures.Retrieve(parameters);\n\nConsole.WriteLine(audioFeature);',
      },
      go: {
        method: 'client.AudioFeatures.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\taudioFeature, err := client.AudioFeatures.Get(context.TODO(), "11dFghVXANMlKmJXsNCbNl")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", audioFeature.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/audio-features/$ID \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'audioFeatures().retrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.audiofeatures.AudioFeatureRetrieveParams;\nimport dev.cjav.spotted.models.audiofeatures.AudioFeatureRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        AudioFeatureRetrieveResponse audioFeature = client.audioFeatures().retrieve("11dFghVXANMlKmJXsNCbNl");\n    }\n}',
      },
      kotlin: {
        method: 'audioFeatures().retrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.audiofeatures.AudioFeatureRetrieveParams\nimport dev.cjav.spotted.models.audiofeatures.AudioFeatureRetrieveResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val audioFeature: AudioFeatureRetrieveResponse = client.audioFeatures().retrieve("11dFghVXANMlKmJXsNCbNl")\n}',
      },
      php: {
        method: 'audioFeatures->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$audioFeature = $client->audioFeatures->retrieve('11dFghVXANMlKmJXsNCbNl');\n\nvar_dump($audioFeature);",
      },
      python: {
        method: 'audio_features.retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\naudio_feature = client.audio_features.retrieve(\n    "11dFghVXANMlKmJXsNCbNl",\n)\nprint(audio_feature.id)',
      },
      ruby: {
        method: 'audio_features.retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\naudio_feature = spotted.audio_features.retrieve("11dFghVXANMlKmJXsNCbNl")\n\nputs(audio_feature)',
      },
      typescript: {
        method: 'client.audioFeatures.retrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst audioFeature = await client.audioFeatures.retrieve('11dFghVXANMlKmJXsNCbNl');\n\nconsole.log(audioFeature.id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'audio_analysis retrieve',
        example:
          "spotted audio-analysis retrieve \\\n  --access-token 'My Access Token' \\\n  --id 11dFghVXANMlKmJXsNCbNl",
      },
      csharp: {
        method: 'AudioAnalysis.Retrieve',
        example:
          'AudioAnalysisRetrieveParams parameters = new()\n{\n    ID = "11dFghVXANMlKmJXsNCbNl"\n};\n\nvar audioAnalysis = await client.AudioAnalysis.Retrieve(parameters);\n\nConsole.WriteLine(audioAnalysis);',
      },
      go: {
        method: 'client.AudioAnalysis.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\taudioAnalysis, err := client.AudioAnalysis.Get(context.TODO(), "11dFghVXANMlKmJXsNCbNl")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", audioAnalysis.Bars)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/audio-analysis/$ID \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'audioAnalysis().retrieve',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.audioanalysis.AudioAnalysisRetrieveParams;\nimport dev.cjav.spotted.models.audioanalysis.AudioAnalysisRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        AudioAnalysisRetrieveResponse audioAnalysis = client.audioAnalysis().retrieve("11dFghVXANMlKmJXsNCbNl");\n    }\n}',
      },
      kotlin: {
        method: 'audioAnalysis().retrieve',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.audioanalysis.AudioAnalysisRetrieveParams\nimport dev.cjav.spotted.models.audioanalysis.AudioAnalysisRetrieveResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val audioAnalysis: AudioAnalysisRetrieveResponse = client.audioAnalysis().retrieve("11dFghVXANMlKmJXsNCbNl")\n}',
      },
      php: {
        method: 'audioAnalysis->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$audioAnalysis = $client->audioAnalysis->retrieve('11dFghVXANMlKmJXsNCbNl');\n\nvar_dump($audioAnalysis);",
      },
      python: {
        method: 'audio_analysis.retrieve',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\naudio_analysis = client.audio_analysis.retrieve(\n    "11dFghVXANMlKmJXsNCbNl",\n)\nprint(audio_analysis.bars)',
      },
      ruby: {
        method: 'audio_analysis.retrieve',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\naudio_analysis = spotted.audio_analysis.retrieve("11dFghVXANMlKmJXsNCbNl")\n\nputs(audio_analysis)',
      },
      typescript: {
        method: 'client.audioAnalysis.retrieve',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst audioAnalysis = await client.audioAnalysis.retrieve('11dFghVXANMlKmJXsNCbNl');\n\nconsole.log(audioAnalysis.bars);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'recommendations get',
        example: "spotted recommendations get \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Recommendations.Get',
        example:
          'RecommendationGetParams parameters = new();\n\nvar recommendation = await client.Recommendations.Get(parameters);\n\nConsole.WriteLine(recommendation);',
      },
      go: {
        method: 'client.Recommendations.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\trecommendation, err := client.Recommendations.Get(context.TODO(), spotted.RecommendationGetParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", recommendation.Seeds)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/recommendations \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'recommendations().get',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.recommendations.RecommendationGetParams;\nimport dev.cjav.spotted.models.recommendations.RecommendationGetResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        RecommendationGetResponse recommendation = client.recommendations().get();\n    }\n}',
      },
      kotlin: {
        method: 'recommendations().get',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.recommendations.RecommendationGetParams\nimport dev.cjav.spotted.models.recommendations.RecommendationGetResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val recommendation: RecommendationGetResponse = client.recommendations().get()\n}',
      },
      php: {
        method: 'recommendations->get',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$recommendation = $client->recommendations->get(\n  limit: 10,\n  market: 'ES',\n  maxAcousticness: 0,\n  maxDanceability: 0,\n  maxDurationMs: 0,\n  maxEnergy: 0,\n  maxInstrumentalness: 0,\n  maxKey: 0,\n  maxLiveness: 0,\n  maxLoudness: 0,\n  maxMode: 0,\n  maxPopularity: 0,\n  maxSpeechiness: 0,\n  maxTempo: 0,\n  maxTimeSignature: 0,\n  maxValence: 0,\n  minAcousticness: 0,\n  minDanceability: 0,\n  minDurationMs: 0,\n  minEnergy: 0,\n  minInstrumentalness: 0,\n  minKey: 0,\n  minLiveness: 0,\n  minLoudness: 0,\n  minMode: 0,\n  minPopularity: 0,\n  minSpeechiness: 0,\n  minTempo: 0,\n  minTimeSignature: 11,\n  minValence: 0,\n  seedArtists: '4NHQUGzhtTLFvgF5SZesLK',\n  seedGenres: 'classical,country',\n  seedTracks: '0c6xIDDpzE81m2q797ordA',\n  targetAcousticness: 0,\n  targetDanceability: 0,\n  targetDurationMs: 0,\n  targetEnergy: 0,\n  targetInstrumentalness: 0,\n  targetKey: 0,\n  targetLiveness: 0,\n  targetLoudness: 0,\n  targetMode: 0,\n  targetPopularity: 0,\n  targetSpeechiness: 0,\n  targetTempo: 0,\n  targetTimeSignature: 0,\n  targetValence: 0,\n);\n\nvar_dump($recommendation);",
      },
      python: {
        method: 'recommendations.get',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nrecommendation = client.recommendations.get()\nprint(recommendation.seeds)',
      },
      ruby: {
        method: 'recommendations.get',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nrecommendation = spotted.recommendations.get\n\nputs(recommendation)',
      },
      typescript: {
        method: 'client.recommendations.get',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst recommendation = await client.recommendations.get();\n\nconsole.log(recommendation.seeds);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'recommendations list_available_genre_seeds',
        example: "spotted recommendations list-available-genre-seeds \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Recommendations.ListAvailableGenreSeeds',
        example:
          'RecommendationListAvailableGenreSeedsParams parameters = new();\n\nvar response = await client.Recommendations.ListAvailableGenreSeeds(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Recommendations.ListAvailableGenreSeeds',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Recommendations.ListAvailableGenreSeeds(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Genres)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/recommendations/available-genre-seeds \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'recommendations().listAvailableGenreSeeds',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.recommendations.RecommendationListAvailableGenreSeedsParams;\nimport dev.cjav.spotted.models.recommendations.RecommendationListAvailableGenreSeedsResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        RecommendationListAvailableGenreSeedsResponse response = client.recommendations().listAvailableGenreSeeds();\n    }\n}',
      },
      kotlin: {
        method: 'recommendations().listAvailableGenreSeeds',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.recommendations.RecommendationListAvailableGenreSeedsParams\nimport dev.cjav.spotted.models.recommendations.RecommendationListAvailableGenreSeedsResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val response: RecommendationListAvailableGenreSeedsResponse = client.recommendations().listAvailableGenreSeeds()\n}',
      },
      php: {
        method: 'recommendations->listAvailableGenreSeeds',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->recommendations->listAvailableGenreSeeds();\n\nvar_dump($response);",
      },
      python: {
        method: 'recommendations.list_available_genre_seeds',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.recommendations.list_available_genre_seeds()\nprint(response.genres)',
      },
      ruby: {
        method: 'recommendations.list_available_genre_seeds',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nresponse = spotted.recommendations.list_available_genre_seeds\n\nputs(response)',
      },
      typescript: {
        method: 'client.recommendations.listAvailableGenreSeeds',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.recommendations.listAvailableGenreSeeds();\n\nconsole.log(response.genres);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'markets list',
        example: "spotted markets list \\\n  --access-token 'My Access Token'",
      },
      csharp: {
        method: 'Markets.List',
        example:
          'MarketListParams parameters = new();\n\nvar markets = await client.Markets.List(parameters);\n\nConsole.WriteLine(markets);',
      },
      go: {
        method: 'client.Markets.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tmarkets, err := client.Markets.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", markets.Markets)\n}\n',
      },
      http: {
        example:
          'curl https://api.spotify.com/v1/markets \\\n    -H "Authorization: Bearer $SPOTIFY_ACCESS_TOKEN"',
      },
      java: {
        method: 'markets().list',
        example:
          'package dev.cjav.spotted.example;\n\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.markets.MarketListParams;\nimport dev.cjav.spotted.models.markets.MarketListResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SpottedClient client = SpottedOkHttpClient.fromEnv();\n\n        MarketListResponse markets = client.markets().list();\n    }\n}',
      },
      kotlin: {
        method: 'markets().list',
        example:
          'package dev.cjav.spotted.example\n\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.markets.MarketListParams\nimport dev.cjav.spotted.models.markets.MarketListResponse\n\nfun main() {\n    val client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\n    val markets: MarketListResponse = client.markets().list()\n}',
      },
      php: {
        method: 'markets->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$markets = $client->markets->list();\n\nvar_dump($markets);",
      },
      python: {
        method: 'markets.list',
        example:
          'import os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nmarkets = client.markets.list()\nprint(markets.markets)',
      },
      ruby: {
        method: 'markets.list',
        example:
          'require "spotted"\n\nspotted = Spotted::Client.new(access_token: "My Access Token")\n\nmarkets = spotted.markets.list\n\nputs(markets)',
      },
      typescript: {
        method: 'client.markets.list',
        example:
          "import Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst markets = await client.markets.list();\n\nconsole.log(markets.markets);",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'python',
    content:
      '# Unofficial Spotify API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/spotted.svg?label=pypi%20(stable))](https://pypi.org/project/spotted/)\n\nThe Unofficial Spotify library provides convenient access to the Spotted REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Spotted MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=spotted-ts-mcp&config=eyJuYW1lIjoic3BvdHRlZC10cy1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly9zcG90dGVkLnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7Ingtc3BvdGlmeS1hY2Nlc3MtdG9rZW4iOiJNeSBBY2Nlc3MgVG9rZW4ifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22spotted-ts-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fspotted.stlmcp.com%22%2C%22headers%22%3A%7B%22x-spotify-access-token%22%3A%22My%20Access%20Token%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [spotted.cjav.dev](https://spotted.cjav.dev). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install spotted\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom spotted import Spotted\n\nclient = Spotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\n\nalbum = client.albums.retrieve(\n    id="4aawyAB9vmqN3uQ7FjRGTy",\n)\nprint(album.id)\n```\n\nWhile you can provide a `access_token` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `SPOTIFY_ACCESS_TOKEN="My Access Token"` to your `.env` file\nso that your Access Token is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncSpotted` instead of `Spotted` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom spotted import AsyncSpotted\n\nclient = AsyncSpotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  album = await client.albums.retrieve(\n      id="4aawyAB9vmqN3uQ7FjRGTy",\n  )\n  print(album.id)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install spotted[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom spotted import DefaultAioHttpClient\nfrom spotted import AsyncSpotted\n\nasync def main() -> None:\n  async with AsyncSpotted(\n    access_token=os.environ.get("SPOTIFY_ACCESS_TOKEN"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    album = await client.albums.retrieve(\n        id="4aawyAB9vmqN3uQ7FjRGTy",\n    )\n    print(album.id)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n## Pagination\n\nList methods in the Spotted API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```python\nfrom spotted import Spotted\n\nclient = Spotted()\n\nall_shows = []\n# Automatically fetches more pages as needed.\nfor show in client.shows.list_episodes(\n    id="showid",\n    limit=10,\n    offset=20,\n):\n    # Do something with show here\n    all_shows.append(show)\nprint(all_shows)\n```\n\nOr, asynchronously:\n\n```python\nimport asyncio\nfrom spotted import AsyncSpotted\n\nclient = AsyncSpotted()\n\nasync def main() -> None:\n    all_shows = []\n    # Iterate through items across all pages, issuing requests as needed.\n    async for show in client.shows.list_episodes(\n    id="showid",\n    limit=10,\n    offset=20,\n):\n        all_shows.append(show)\n    print(all_shows)\n\nasyncio.run(main())\n```\n\nAlternatively, you can use the `.has_next_page()`, `.next_page_info()`, or  `.get_next_page()` methods for more granular control working with pages:\n\n```python\nfirst_page = await client.shows.list_episodes(\n    id="showid",\n    limit=10,\n    offset=20,\n)\nif first_page.has_next_page():\n    print(f"will fetch next page using these details: {first_page.next_page_info()}")\n    next_page = await first_page.get_next_page()\n    print(f"number of items we just fetched: {len(next_page.items)}")\n\n# Remove `await` for non-async usage.\n```\n\nOr just work directly with the returned data:\n\n```python\nfirst_page = await client.shows.list_episodes(\n    id="showid",\n    limit=10,\n    offset=20,\n)\n\nprint(f"next URL: {first_page.next}") # => "next URL: ..."\nfor show in first_page.items:\n    print(show.id)\n\n# Remove `await` for non-async usage.\n```\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `spotted.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `spotted.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `spotted.APIError`.\n\n```python\nimport spotted\nfrom spotted import Spotted\n\nclient = Spotted()\n\ntry:\n    client.albums.retrieve(\n        id="4aawyAB9vmqN3uQ7FjRGTy",\n    )\nexcept spotted.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept spotted.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept spotted.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom spotted import Spotted\n\n# Configure the default for all requests:\nclient = Spotted(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).albums.retrieve(\n    id="4aawyAB9vmqN3uQ7FjRGTy",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom spotted import Spotted\n\n# Configure the default for all requests:\nclient = Spotted(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Spotted(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).albums.retrieve(\n    id="4aawyAB9vmqN3uQ7FjRGTy",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `SPOTTED_LOG` to `info`.\n\n```shell\n$ export SPOTTED_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom spotted import Spotted\n\nclient = Spotted()\nresponse = client.albums.with_raw_response.retrieve(\n    id="4aawyAB9vmqN3uQ7FjRGTy",\n)\nprint(response.headers.get(\'X-My-Header\'))\n\nalbum = response.parse()  # get the object that `albums.retrieve()` would have returned\nprint(album.id)\n```\n\nThese methods return an [`APIResponse`](https://github.com/cjavdev/spotted-py/tree/main/src/spotted/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/cjavdev/spotted-py/tree/main/src/spotted/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.albums.with_streaming_response.retrieve(\n    id="4aawyAB9vmqN3uQ7FjRGTy",\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom spotted import Spotted, DefaultHttpxClient\n\nclient = Spotted(\n    # Or use the `SPOTTED_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom spotted import Spotted\n\nwith Spotted() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/cjavdev/spotted-py/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport spotted\nprint(spotted.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'go',
    content:
      '# Unofficial Spotify API Library\n\n<a href="https://pkg.go.dev/github.com/cjavdev/spotted-go"><img src="https://pkg.go.dev/badge/github.com/cjavdev/spotted-go.svg" alt="Go Reference"></a>\n\nThe Unofficial Spotify library provides convenient access to the [Spotted REST API](https://spotted.cjav.dev)\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Spotted MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=spotted-ts-mcp&config=eyJuYW1lIjoic3BvdHRlZC10cy1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly9zcG90dGVkLnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7Ingtc3BvdGlmeS1hY2Nlc3MtdG9rZW4iOiJNeSBBY2Nlc3MgVG9rZW4ifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22spotted-ts-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fspotted.stlmcp.com%22%2C%22headers%22%3A%7B%22x-spotify-access-token%22%3A%22My%20Access%20Token%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/cjavdev/spotted-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/cjavdev/spotted-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cjavdev/spotted-go"\n\t"github.com/cjavdev/spotted-go/option"\n)\n\nfunc main() {\n\tclient := spotted.NewClient(\n\t\toption.WithAccessToken("My Access Token"), // defaults to os.LookupEnv("SPOTIFY_ACCESS_TOKEN")\n\t)\n\talbum, err := client.Albums.Get(\n\t\tcontext.TODO(),\n\t\t"4aawyAB9vmqN3uQ7FjRGTy",\n\t\tspotted.AlbumGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", album.ID)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Albums.Get(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/cjavdev/spotted-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n```go\niter := client.Shows.ListEpisodesAutoPaging(\n\tcontext.TODO(),\n\t"showid",\n\tspotted.ShowListEpisodesParams{\n\t\tLimit:  spotted.Int(10),\n\t\tOffset: spotted.Int(20),\n\t},\n)\n// Automatically fetches more pages as needed.\nfor iter.Next() {\n\tsimplifiedEpisodeObject := iter.Current()\n\tfmt.Printf("%+v\\n", simplifiedEpisodeObject)\n}\nif err := iter.Err(); err != nil {\n\tpanic(err.Error())\n}\n```\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n```go\npage, err := client.Shows.ListEpisodes(\n\tcontext.TODO(),\n\t"showid",\n\tspotted.ShowListEpisodesParams{\n\t\tLimit:  spotted.Int(10),\n\t\tOffset: spotted.Int(20),\n\t},\n)\nfor page != nil {\n\tfor _, show := range page.Items {\n\t\tfmt.Printf("%+v\\n", show)\n\t}\n\tpage, err = page.GetNextPage()\n}\nif err != nil {\n\tpanic(err.Error())\n}\n```\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Albums.Get(\n\tcontext.TODO(),\n\t"4aawyAB9vmqN3uQ7FjRGTy",\n\tspotted.AlbumGetParams{},\n)\nif err != nil {\n\tvar apierr *spotted.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/albums/{id}": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Albums.Get(\n\tctx,\n\t"4aawyAB9vmqN3uQ7FjRGTy",\n\tspotted.AlbumGetParams{},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := spotted.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Albums.Get(\n\tcontext.TODO(),\n\t"4aawyAB9vmqN3uQ7FjRGTy",\n\tspotted.AlbumGetParams{},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nalbum, err := client.Albums.Get(\n\tcontext.TODO(),\n\t"4aawyAB9vmqN3uQ7FjRGTy",\n\tspotted.AlbumGetParams{},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", album)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/cjavdev/spotted-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'terraform',
    content:
      '# Unofficial Spotify Provider\n\nThe [Unofficial Spotify provider](https://registry.terraform.io/providers/cjavdev/spotted/latest/docs) provides convenient access to\nthe [Spotted REST API](https://spotted.cjav.dev) from Terraform.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## Requirements\n\nThis provider requires Terraform CLI 1.0 or later. You can [install it for your system](https://developer.hashicorp.com/terraform/install)\non Hashicorp\'s website.\n\n## Usage\n\nAdd the following to your `main.tf` file:\n\n<!-- x-release-please-start-version -->\n\n```hcl\n# Declare the provider and version\nterraform {\n  required_providers {\n    SDK_ProviderTypeName = {\n      source  = "cjavdev/spotted"\n      version = "~> 0.0.1"\n    }\n  }\n}\n\n# Initialize the provider\nprovider "spotted" {\n  access_token = "My Access Token" # or set SPOTIFY_ACCESS_TOKEN env variable\n}\n\n# Configure a resource\nresource "spotted_user_playlist" "example_user_playlist" {\n  user_id = "smedjan"\n  name = "New Playlist"\n  collaborative = true\n  description = "New playlist description"\n  published = true\n}\n```\n\n<!-- x-release-please-end -->\n\nInitialize your project by running `terraform init` in the directory.\n\nAdditional examples can be found in the [./examples](./examples) folder within this repository, and you can\nrefer to the full documentation on [the Terraform Registry](https://registry.terraform.io/providers/cjavdev/spotted/latest/docs).\n\n### Provider Options\nWhen you initialize the provider, the following options are supported. It is recommended to use environment variables for sensitive values like access tokens.\nIf an environment variable is provided, then the option does not need to be set in the terraform source.\n\n| Property     | Environment variable   | Required | Default value |\n| ------------ | ---------------------- | -------- | ------------- |\n| access_token | `SPOTIFY_ACCESS_TOKEN` | true     | —             |\n\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/cjavdev/terraform-provider-spotted/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Unofficial Spotify API Library\n\n[![NPM version](https://img.shields.io/npm/v/spotted-ts.svg?label=npm%20(stable))](https://npmjs.org/package/spotted-ts) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/spotted-ts) [![JSR Version](https://jsr.io/badges/@cjavdev/spotted-ts)](https://jsr.io/@cjavdev/spotted-ts)\n\nThis library provides convenient access to the Spotted REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [spotted.cjav.dev](https://spotted.cjav.dev). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Spotted MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=spotted-ts-mcp&config=eyJuYW1lIjoic3BvdHRlZC10cy1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly9zcG90dGVkLnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7Ingtc3BvdGlmeS1hY2Nlc3MtdG9rZW4iOiJNeSBBY2Nlc3MgVG9rZW4ifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22spotted-ts-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fspotted.stlmcp.com%22%2C%22headers%22%3A%7B%22x-spotify-access-token%22%3A%22My%20Access%20Token%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install spotted-ts\n```\n\n### Installation from JSR\n\n```sh\ndeno add jsr:@cjavdev/spotted-ts\nnpx jsr add @cjavdev/spotted-ts\n```\n\nThese commands will make the module importable from the `@cjavdev/spotted-ts` scope:\n\nYou can also [import directly from JSR](https://jsr.io/docs/using-packages#importing-with-jsr-specifiers) without an install step if you're using the Deno JavaScript runtime:\n\n```ts\nimport Spotted from 'jsr:@cjavdev/spotted-ts';\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst album = await client.albums.retrieve('4aawyAB9vmqN3uQ7FjRGTy');\n\nconsole.log(album.id);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  accessToken: process.env['SPOTIFY_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst album: Spotted.AlbumRetrieveResponse = await client.albums.retrieve('4aawyAB9vmqN3uQ7FjRGTy');\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst album = await client.albums.retrieve('4aawyAB9vmqN3uQ7FjRGTy').catch(async (err) => {\n  if (err instanceof Spotted.APIError) {\n    console.log(err.status); // 400\n    console.log(err.name); // BadRequestError\n    console.log(err.headers); // {server: 'nginx', ...}\n  } else {\n    throw err;\n  }\n});\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Spotted({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.albums.retrieve('4aawyAB9vmqN3uQ7FjRGTy', {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Spotted({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.albums.retrieve('4aawyAB9vmqN3uQ7FjRGTy', {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the Spotted API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllSimplifiedEpisodeObjects(params) {\n  const allSimplifiedEpisodeObjects = [];\n  // Automatically fetches more pages as needed.\n  for await (const simplifiedEpisodeObject of client.shows.listEpisodes('showid', {\n    limit: 10,\n    offset: 20,\n  })) {\n    allSimplifiedEpisodeObjects.push(simplifiedEpisodeObject);\n  }\n  return allSimplifiedEpisodeObjects;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.shows.listEpisodes('showid', { limit: 10, offset: 20 });\nfor (const simplifiedEpisodeObject of page.items) {\n  console.log(simplifiedEpisodeObject);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Spotted();\n\nconst response = await client.albums.retrieve('4aawyAB9vmqN3uQ7FjRGTy').asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: album, response: raw } = await client.albums\n  .retrieve('4aawyAB9vmqN3uQ7FjRGTy')\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(album.id);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `SPOTTED_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Spotted from 'spotted-ts';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Spotted({\n  logger: logger.child({ name: 'Spotted' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.albums.retrieve({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Spotted from 'spotted-ts';\nimport fetch from 'my-fetch';\n\nconst client = new Spotted({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Spotted from 'spotted-ts';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Spotted({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Spotted from 'spotted-ts';\n\nconst client = new Spotted({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Spotted from 'jsr:@cjavdev/spotted-ts';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Spotted({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/cjavdev/spotted-ts/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
  {
    language: 'ruby',
    content:
      '# Unofficial Spotify API library\n\nThe Unofficial Spotify library provides convenient access to the Spotted REST API from any Ruby 3.2.0+ application. It ships with comprehensive types & docstrings in Yard, RBS, and RBI – [see below](https://github.com/cjavdev/spotted#Sorbet) for usage with Sorbet. The standard library\'s `net/http` is used as the HTTP transport, with connection pooling via the `connection_pool` gem.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Spotted MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=spotted-ts-mcp&config=eyJuYW1lIjoic3BvdHRlZC10cy1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly9zcG90dGVkLnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7Ingtc3BvdGlmeS1hY2Nlc3MtdG9rZW4iOiJNeSBBY2Nlc3MgVG9rZW4ifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22spotted-ts-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fspotted.stlmcp.com%22%2C%22headers%22%3A%7B%22x-spotify-access-token%22%3A%22My%20Access%20Token%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nDocumentation for releases of this gem can be found [on RubyDoc](https://gemdocs.org/gems/spotted).\n\nThe REST API documentation can be found on [spotted.cjav.dev](https://spotted.cjav.dev).\n\n## Installation\n\nTo use this gem, install via Bundler by adding the following to your application\'s `Gemfile`:\n\n<!-- x-release-please-start-version -->\n\n```ruby\ngem "spotted", "~> 0.0.1"\n```\n\n<!-- x-release-please-end -->\n\n## Usage\n\n```ruby\nrequire "bundler/setup"\nrequire "spotted"\n\nspotted = Spotted::Client.new(\n  access_token: ENV["SPOTIFY_ACCESS_TOKEN"] # This is the default and can be omitted\n)\n\nalbum = spotted.albums.retrieve("4aawyAB9vmqN3uQ7FjRGTy")\n\nputs(album.id)\n```\n\n\n\n### Pagination\n\nList methods in the Spotted API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```ruby\npage = spotted.shows.list_episodes("showid", limit: 10, offset: 20)\n\n# Fetch single item from page.\nshow = page.items[0]\nputs(show.id)\n\n# Automatically fetches more pages as needed.\npage.auto_paging_each do |show|\n  puts(show.id)\nend\n```\n\nAlternatively, you can use the `#next_page?` and `#next_page` methods for more granular control working with pages.\n\n```ruby\nif page.next_page?\n  new_page = page.next_page\n  puts(new_page.items[0].id)\nend\n```\n\n\n\n### Handling errors\n\nWhen the library is unable to connect to the API, or if the API returns a non-success status code (i.e., 4xx or 5xx response), a subclass of `Spotted::Errors::APIError` will be thrown:\n\n```ruby\nbegin\n  album = spotted.albums.retrieve("4aawyAB9vmqN3uQ7FjRGTy")\nrescue Spotted::Errors::APIConnectionError => e\n  puts("The server could not be reached")\n  puts(e.cause)  # an underlying Exception, likely raised within `net/http`\nrescue Spotted::Errors::RateLimitError => e\n  puts("A 429 status code was received; we should back off a bit.")\nrescue Spotted::Errors::APIStatusError => e\n  puts("Another non-200-range status code was received")\n  puts(e.status)\nend\n```\n\nError codes are as follows:\n\n| Cause            | Error Type                 |\n| ---------------- | -------------------------- |\n| HTTP 400         | `BadRequestError`          |\n| HTTP 401         | `AuthenticationError`      |\n| HTTP 403         | `PermissionDeniedError`    |\n| HTTP 404         | `NotFoundError`            |\n| HTTP 409         | `ConflictError`            |\n| HTTP 422         | `UnprocessableEntityError` |\n| HTTP 429         | `RateLimitError`           |\n| HTTP >= 500      | `InternalServerError`      |\n| Other HTTP error | `APIStatusError`           |\n| Timeout          | `APITimeoutError`          |\n| Network error    | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\n\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict, 429 Rate Limit, >=500 Internal errors, and timeouts will all be retried by default.\n\nYou can use the `max_retries` option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\nspotted = Spotted::Client.new(\n  max_retries: 0 # default is 2\n)\n\n# Or, configure per-request:\nspotted.albums.retrieve("4aawyAB9vmqN3uQ7FjRGTy", request_options: {max_retries: 5})\n```\n\n### Timeouts\n\nBy default, requests will time out after 60 seconds. You can use the timeout option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\nspotted = Spotted::Client.new(\n  timeout: nil # default is 60\n)\n\n# Or, configure per-request:\nspotted.albums.retrieve("4aawyAB9vmqN3uQ7FjRGTy", request_options: {timeout: 5})\n```\n\nOn timeout, `Spotted::Errors::APITimeoutError` is raised.\n\nNote that requests that time out are retried by default.\n\n## Advanced concepts\n\n### BaseModel\n\nAll parameter and response objects inherit from `Spotted::Internal::Type::BaseModel`, which provides several conveniences, including:\n\n1. All fields, including unknown ones, are accessible with `obj[:prop]` syntax, and can be destructured with `obj => {prop: prop}` or pattern-matching syntax.\n\n2. Structural equivalence for equality; if two API calls return the same values, comparing the responses with == will return true.\n\n3. Both instances and the classes themselves can be pretty-printed.\n\n4. Helpers such as `#to_h`, `#deep_to_h`, `#to_json`, and `#to_yaml`.\n\n### Making custom or undocumented requests\n\n#### Undocumented properties\n\nYou can send undocumented parameters to any endpoint, and read undocumented response properties, like so:\n\nNote: the `extra_` parameters of the same name overrides the documented parameters.\n\n```ruby\nalbum =\n  spotted.albums.retrieve(\n    "4aawyAB9vmqN3uQ7FjRGTy",\n    request_options: {\n      extra_query: {my_query_parameter: value},\n      extra_body: {my_body_parameter: value},\n      extra_headers: {"my-header": value}\n    }\n  )\n\nputs(album[:my_undocumented_property])\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` under the `request_options:` parameter when making a request, as seen in the examples above.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints while retaining the benefit of auth, retries, and so on, you can make requests using `client.request`, like so:\n\n```ruby\nresponse = client.request(\n  method: :post,\n  path: \'/undocumented/endpoint\',\n  query: {"dog": "woof"},\n  headers: {"useful-header": "interesting-value"},\n  body: {"hello": "world"}\n)\n```\n\n### Concurrency & connection pooling\n\nThe `Spotted::Client` instances are threadsafe, but are only are fork-safe when there are no in-flight HTTP requests.\n\nEach instance of `Spotted::Client` has its own HTTP connection pool with a default size of 99. As such, we recommend instantiating the client once per application in most settings.\n\nWhen all available connections from the pool are checked out, requests wait for a new connection to become available, with queue time counting towards the request timeout.\n\nUnless otherwise specified, other classes in the SDK do not have locks protecting their underlying data structure.\n\n## Sorbet\n\nThis library provides comprehensive [RBI](https://sorbet.org/docs/rbi) definitions, and has no dependency on sorbet-runtime.\n\nYou can provide typesafe request parameters like so:\n\n```ruby\nspotted.albums.retrieve("4aawyAB9vmqN3uQ7FjRGTy")\n```\n\nOr, equivalently:\n\n```ruby\n# Hashes work, but are not typesafe:\nspotted.albums.retrieve("4aawyAB9vmqN3uQ7FjRGTy")\n\n# You can also splat a full Params class:\nparams = Spotted::AlbumRetrieveParams.new\nspotted.albums.retrieve("4aawyAB9vmqN3uQ7FjRGTy", **params)\n```\n\n### Enums\n\nSince this library does not depend on `sorbet-runtime`, it cannot provide [`T::Enum`](https://sorbet.org/docs/tenum) instances. Instead, we provide "tagged symbols" instead, which is always a primitive at runtime:\n\n```ruby\n# :market\nputs(Spotted::AlbumRestrictionObject::Reason::MARKET)\n\n# Revealed type: `T.all(Spotted::AlbumRestrictionObject::Reason, Symbol)`\nT.reveal_type(Spotted::AlbumRestrictionObject::Reason::MARKET)\n```\n\nEnum parameters have a "relaxed" type, so you can either pass in enum constants or their literal value:\n\n```ruby\nSpotted::AlbumRestrictionObject.new(\n  reason: Spotted::AlbumRestrictionObject::Reason::MARKET,\n  # …\n)\n\nSpotted::AlbumRestrictionObject.new(\n  reason: :market,\n  # …\n)\n```\n\n## Versioning\n\nThis package follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions. As the library is in initial development and has a major version of `0`, APIs may change at any time.\n\nThis package considers improvements to the (non-runtime) `*.rbi` and `*.rbs` type definitions to be non-breaking changes.\n\n## Requirements\n\nRuby 3.2.0 or higher.\n\n## Contributing\n\nSee [the contributing documentation](https://github.com/cjavdev/spotted/tree/main/CONTRIBUTING.md).\n',
  },
  {
    language: 'java',
    content:
      '# Unofficial Spotify API Library\n\n<!-- x-release-please-start-version -->\n[![Maven Central](https://img.shields.io/maven-central/v/dev.cjav.spotted/spotted-java)](https://central.sonatype.com/artifact/dev.cjav.spotted/spotted-java/0.0.1)\n[![javadoc](https://javadoc.io/badge2/dev.cjav.spotted/spotted-java/0.0.1/javadoc.svg)](https://javadoc.io/doc/dev.cjav.spotted/spotted-java/0.0.1)\n<!-- x-release-please-end -->\n\nThe Unofficial Spotify SDK provides convenient access to the [Spotted REST API](https://spotted.cjav.dev)   from applications written in Java.\n\nThe Spotted Java SDK is similar to the Spotted Kotlin SDK but with minor differences that       make it more ergonomic for use in Java, such as `Optional` instead of nullable values, `Stream`       instead of `Sequence`, and `CompletableFuture` instead of suspend functions.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Spotted MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=spotted-ts-mcp&config=eyJuYW1lIjoic3BvdHRlZC10cy1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly9zcG90dGVkLnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7Ingtc3BvdGlmeS1hY2Nlc3MtdG9rZW4iOiJNeSBBY2Nlc3MgVG9rZW4ifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22spotted-ts-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fspotted.stlmcp.com%22%2C%22headers%22%3A%7B%22x-spotify-access-token%22%3A%22My%20Access%20Token%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n<!-- x-release-please-start-version -->\n\nThe REST API documentation can be found on [spotted.cjav.dev](https://spotted.cjav.dev). Javadocs are available on [javadoc.io](https://javadoc.io/doc/dev.cjav.spotted/spotted-java/0.0.1).\n\n<!-- x-release-please-end -->\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n### Gradle\n\n~~~kotlin\nimplementation("dev.cjav.spotted:spotted-java:0.0.1")\n~~~\n\n### Maven\n\n~~~xml\n<dependency>\n  <groupId>dev.cjav.spotted</groupId>\n  <artifactId>spotted-java</artifactId>\n  <version>0.0.1</version>\n</dependency>\n~~~\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Java 8 or later.\n\n## Usage\n\n```java\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.albums.AlbumRetrieveParams;\nimport dev.cjav.spotted.models.albums.AlbumRetrieveResponse;\n\n// Configures using the `spotted.spotifyAccessToken` and `spotted.baseUrl` system properties\n// Or configures using the `SPOTIFY_ACCESS_TOKEN` and `SPOTTED_BASE_URL` environment variables\nSpottedClient client = SpottedOkHttpClient.fromEnv();\n\nAlbumRetrieveResponse album = client.albums().retrieve("4aawyAB9vmqN3uQ7FjRGTy");\n```\n\n## Client configuration\n\nConfigure the client using system properties or environment variables:\n\n```java\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\n\n// Configures using the `spotted.spotifyAccessToken` and `spotted.baseUrl` system properties\n// Or configures using the `SPOTIFY_ACCESS_TOKEN` and `SPOTTED_BASE_URL` environment variables\nSpottedClient client = SpottedOkHttpClient.fromEnv();\n```\n\nOr manually:\n\n```java\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\n\nSpottedClient client = SpottedOkHttpClient.builder()\n    .accessToken("My Access Token")\n    .build();\n```\n\nOr using a combination of the two approaches:\n\n```java\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\n\nSpottedClient client = SpottedOkHttpClient.builder()\n    // Configures using the `spotted.spotifyAccessToken` and `spotted.baseUrl` system properties\n    // Or configures using the `SPOTIFY_ACCESS_TOKEN` and `SPOTTED_BASE_URL` environment variables\n    .fromEnv()\n    .accessToken("My Access Token")\n    .build();\n```\n\nSee this table for the available options:\n\n| Setter        | System property              | Environment variable   | Required | Default value                  |\n| ------------- | ---------------------------- | ---------------------- | -------- | ------------------------------ |\n| `accessToken` | `spotted.spotifyAccessToken` | `SPOTIFY_ACCESS_TOKEN` | true     | -                              |\n| `baseUrl`     | `spotted.baseUrl`            | `SPOTTED_BASE_URL`     | true     | `"https://api.spotify.com/v1"` |\n\nSystem properties take precedence over environment variables.\n\n> [!TIP]\n> Don\'t create more than one client in the same application. Each client has a connection pool and\n> thread pools, which are more efficient to share between requests.\n\n### Modifying configuration\n\nTo temporarily use a modified client configuration, while reusing the same connection and thread       pools, call `withOptions()` on any client or service:\n\n```java\nimport dev.cjav.spotted.client.SpottedClient;\n\nSpottedClient clientWithOptions = client.withOptions(optionsBuilder -> {\n    optionsBuilder.baseUrl("https://example.com");\n    optionsBuilder.maxRetries(42);\n});\n```\n\nThe `withOptions()` method does not affect the original client or service.\n\n## Requests and responses\n\nTo send a request to the Spotted API, build an instance of some `Params` class and pass it to the     corresponding client method. When the response is received, it will be deserialized into an instance of     a Java class.\n\nFor example, `client.albums().retrieve(...)` should be called with an instance of `AlbumRetrieveParams`, and it     will return an instance of `AlbumRetrieveResponse`.\n\n## Immutability\n\nEach class in the SDK has an associated   [builder](https://blogs.oracle.com/javamagazine/post/exploring-joshua-blochs-builder-design-pattern-in-java)   or factory method for constructing it.\n\nEach class is [immutable](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html)   once constructed. If the class has an associated builder, then it has a `toBuilder()` method, which can   be used to convert it back to a builder for making a modified copy.\n\nBecause each class is immutable, builder modification will _never_ affect already built class instances.\n\n## Asynchronous execution\n\nThe default client is synchronous. To switch to asynchronous execution, call the `async()` method:\n\n```java\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport dev.cjav.spotted.models.albums.AlbumRetrieveParams;\nimport dev.cjav.spotted.models.albums.AlbumRetrieveResponse;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `spotted.spotifyAccessToken` and `spotted.baseUrl` system properties\n// Or configures using the `SPOTIFY_ACCESS_TOKEN` and `SPOTTED_BASE_URL` environment variables\nSpottedClient client = SpottedOkHttpClient.fromEnv();\n\nCompletableFuture<AlbumRetrieveResponse> album = client.async().albums().retrieve("4aawyAB9vmqN3uQ7FjRGTy");\n```\n\nOr create an asynchronous client from the beginning:\n\n```java\nimport dev.cjav.spotted.client.SpottedClientAsync;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClientAsync;\nimport dev.cjav.spotted.models.albums.AlbumRetrieveParams;\nimport dev.cjav.spotted.models.albums.AlbumRetrieveResponse;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `spotted.spotifyAccessToken` and `spotted.baseUrl` system properties\n// Or configures using the `SPOTIFY_ACCESS_TOKEN` and `SPOTTED_BASE_URL` environment variables\nSpottedClientAsync client = SpottedOkHttpClientAsync.fromEnv();\n\nCompletableFuture<AlbumRetrieveResponse> album = client.albums().retrieve("4aawyAB9vmqN3uQ7FjRGTy");\n```\n\nThe asynchronous client supports the same options as the synchronous one, except most methods return `CompletableFuture`s.\n\n\n\n\n\n## Binary responses\n\nThe SDK defines methods that return binary responses, which are used for API responses that shouldn\'t     necessarily be parsed, like non-JSON data.\n\nThese methods return [`HttpResponse`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/core/http/HttpResponse.kt):\n\n```java\nimport dev.cjav.spotted.core.http.HttpResponse;\nimport dev.cjav.spotted.models.playlists.images.ImageUpdateParams;\n\nHttpResponse image = client.playlists().images().update(\n  "3cEYpjA9oz9GiPac4AsH4n", "Example data"\n);\n```\n\nTo save the response content to a file, use the     [`Files.copy(...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#copy-java.io.InputStream-java.nio.file.Path-java.nio.file.CopyOption...-)     method:\n\n```java\nimport dev.cjav.spotted.core.http.HttpResponse;\nimport java.nio.file.Files;\nimport java.nio.file.Paths;\nimport java.nio.file.StandardCopyOption;\n\ntry (HttpResponse response = client.playlists().images().update(params)) {\n    Files.copy(\n        response.body(),\n        Paths.get(path),\n        StandardCopyOption.REPLACE_EXISTING\n    );\n} catch (Exception e) {\n    System.out.println("Something went wrong!");\n    throw new RuntimeException(e);\n}\n```\n\nOr transfer the response content to any     [`OutputStream`](https://docs.oracle.com/javase/8/docs/api/java/io/OutputStream.html):\n\n```java\nimport dev.cjav.spotted.core.http.HttpResponse;\nimport java.nio.file.Files;\nimport java.nio.file.Paths;\n\ntry (HttpResponse response = client.playlists().images().update(params)) {\n    response.body().transferTo(Files.newOutputStream(Paths.get(path)));\n} catch (Exception e) {\n    System.out.println("Something went wrong!");\n    throw new RuntimeException(e);\n}\n```\n\n## Raw responses\n\nThe SDK defines methods that deserialize responses into instances of Java classes.       However, these methods don\'t provide access to the response headers, status code, or the raw response       body.\n\nTo access this data, prefix any HTTP method call on a client or service with `withRawResponse()`:\n\n```java\nimport dev.cjav.spotted.core.http.Headers;\nimport dev.cjav.spotted.core.http.HttpResponseFor;\nimport dev.cjav.spotted.models.albums.AlbumRetrieveParams;\nimport dev.cjav.spotted.models.albums.AlbumRetrieveResponse;\n\nHttpResponseFor<AlbumRetrieveResponse> album = client.albums().withRawResponse().retrieve("4aawyAB9vmqN3uQ7FjRGTy");\n\nint statusCode = album.statusCode();\nHeaders headers = album.headers();\n```\n\nYou can still deserialize the response into an instance of a Java class if needed:\n\n```java\nimport dev.cjav.spotted.models.albums.AlbumRetrieveResponse;\n\nAlbumRetrieveResponse parsedAlbum = album.parse();\n```\n\n## Error handling\n\nThe SDK throws custom unchecked exception types:\n\n- [`SpottedServiceException`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/errors/SpottedServiceException.kt): Base class for HTTP errors. See this table for which exception       subclass is thrown for each HTTP status code:\n\n  | Status | Exception                                          |\n  | ------ | -------------------------------------------------- |\n  | 400    | [`BadRequestException`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/errors/BadRequestException.kt)           |\n  | 401    | [`UnauthorizedException`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/errors/UnauthorizedException.kt)         |\n  | 403    | [`PermissionDeniedException`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/errors/PermissionDeniedException.kt)     |\n  | 404    | [`NotFoundException`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/errors/NotFoundException.kt)             |\n  | 422    | [`UnprocessableEntityException`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/errors/UnprocessableEntityException.kt)  |\n  | 429    | [`RateLimitException`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/errors/RateLimitException.kt)            |\n  | 5xx    | [`InternalServerException`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/errors/InternalServerException.kt)       |\n  | others | [`UnexpectedStatusCodeException`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/errors/UnexpectedStatusCodeException.kt) |\n\n- [`SpottedIoException`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/errors/SpottedIoException.kt): I/O networking errors.\n\n- [`SpottedRetryableException`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/errors/SpottedRetryableException.kt): Generic error indicating a failure that could be retried by the client.\n\n- [`SpottedInvalidDataException`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/errors/SpottedInvalidDataException.kt): Failure to interpret successfully parsed data. For example,       when accessing a property that\'s supposed to be required, but the API unexpectedly omitted it from the       response.\n\n- [`SpottedException`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/errors/SpottedException.kt): Base class for all exceptions. Most errors will result in one of the       previously mentioned ones, but completely generic errors may be thrown using the base class.\n\n## Pagination\n\nThe SDK defines methods that return a paginated lists of results. It provides convenient ways to access     the results either one page at a time or item-by-item across all pages.\n\n### Auto-pagination\n\nTo iterate through all results across all pages, use the `autoPager()` method, which automatically     fetches more pages as needed.\n\nWhen using the synchronous client, the method returns an [`Iterable`](https://docs.oracle.com/javase/8/docs/api/java/lang/Iterable.html)\n\n```java\nimport dev.cjav.spotted.models.SimplifiedEpisodeObject;\nimport dev.cjav.spotted.models.shows.ShowListEpisodesPage;\n\nShowListEpisodesPage page = client.shows().listEpisodes();\n\n// Process as an Iterable\nfor (SimplifiedEpisodeObject show : page.autoPager()) {\n    System.out.println(show);\n}\n\n// Process as a Stream\npage.autoPager()\n    .stream()\n    .limit(50)\n    .forEach(show -> System.out.println(show));\n```\n\nWhen using the asynchronous client, the method returns an [`AsyncStreamResponse`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/core/http/AsyncStreamResponse.kt):\n\n```java\nimport dev.cjav.spotted.core.http.AsyncStreamResponse;\nimport dev.cjav.spotted.models.SimplifiedEpisodeObject;\nimport dev.cjav.spotted.models.shows.ShowListEpisodesPageAsync;\nimport java.util.Optional;\nimport java.util.concurrent.CompletableFuture;\n\nCompletableFuture<ShowListEpisodesPageAsync> pageFuture = client.async().shows().listEpisodes();\n\npageFuture.thenRun(page -> page.autoPager().subscribe(show -> {\n    System.out.println(show);\n}));\n\n// If you need to handle errors or completion of the stream\npageFuture.thenRun(page -> page.autoPager().subscribe(new AsyncStreamResponse.Handler<>() {\n    @Override\n    public void onNext(SimplifiedEpisodeObject show) {\n        System.out.println(show);\n    }\n\n    @Override\n    public void onComplete(Optional<Throwable> error) {\n        if (error.isPresent()) {\n            System.out.println("Something went wrong!");\n            throw new RuntimeException(error.get());\n        } else {\n            System.out.println("No more!");\n        }\n    }\n}));\n\n// Or use futures\npageFuture.thenRun(page -> page.autoPager()\n    .subscribe(show -> {\n        System.out.println(show);\n    })\n    .onCompleteFuture()\n    .whenComplete((unused, error) -> {\n        if (error != null) {\n            System.out.println("Something went wrong!");\n            throw new RuntimeException(error);\n        } else {\n            System.out.println("No more!");\n        }\n    }));\n```\n\n### Manual pagination\n\nTo access individual page items and manually request the next page, use the `items()`,\n`hasNextPage()`, and `nextPage()` methods:\n\n```java\nimport dev.cjav.spotted.models.SimplifiedEpisodeObject;\nimport dev.cjav.spotted.models.shows.ShowListEpisodesPage;\n\nShowListEpisodesPage page = client.shows().listEpisodes();\nwhile (true) {\n    for (SimplifiedEpisodeObject show : page.items()) {\n        System.out.println(show);\n    }\n\n    if (!page.hasNextPage()) {\n        break;\n    }\n\n    page = page.nextPage();\n}\n```\n\n## Logging\n\nThe SDK uses the standard   [OkHttp logging interceptor](https://github.com/square/okhttp/tree/master/okhttp-logging-interceptor).\n\nEnable logging by setting the `SPOTTED_LOG` environment variable to   `info`:\n\n```sh\nexport SPOTTED_LOG=info\n```\n\nOr to `debug` for more verbose logging:\n\n```sh\nexport SPOTTED_LOG=debug\n```\n\n## ProGuard and R8\n\nAlthough the SDK uses reflection, it is still usable with     [ProGuard](https://github.com/Guardsquare/proguard) and     [R8](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization) because     `spotted-java-core` is published with a     [configuration file](spotted-java-core/src/main/resources/META-INF/proguard/spotted-java-core.pro) containing     [keep rules](https://www.guardsquare.com/manual/configuration/usage).\n\nProGuard and R8 should automatically detect and use the published rules, but you can also manually copy     the keep rules if necessary.\n\n\n\n\n\n## Jackson\n\nThe SDK depends on [Jackson](https://github.com/FasterXML/jackson) for JSON     serialization/deserialization. It is compatible with version 2.13.4 or higher,     but depends on version 2.18.2 by default.\n\nThe SDK throws an exception if it detects an incompatible Jackson version at runtime (e.g. if the     default version was overridden in your Maven or Gradle config).\n\nIf the SDK threw an exception, but you\'re _certain_ the version is compatible, then disable the version     check using the `checkJacksonVersionCompatibility` on [`SpottedOkHttpClient`](spotted-java-client-okhttp/src/main/kotlin/dev/cjav/spotted/client/okhttp/SpottedOkHttpClient.kt) or     [`SpottedOkHttpClientAsync`](spotted-java-client-okhttp/src/main/kotlin/dev/cjav/spotted/client/okhttp/SpottedOkHttpClientAsync.kt).\n\n> [!CAUTION]\n> We make no guarantee that the SDK works correctly when the Jackson version check is disabled.\n\nAlso note that there are bugs in older Jackson versions that can affect the SDK. We don\'t work around all     Jackson bugs ([example](https://github.com/FasterXML/jackson-databind/issues/3240)) and expect users to     upgrade Jackson for those instead.\n\n## Network options\n\n### Retries\n\nThe SDK automatically retries 2 times by default, with a short exponential backoff between requests.\n\nOnly the following error types are retried:\n- Connection errors (for example, due to a network connectivity problem)\n- 408 Request Timeout\n- 409 Conflict\n- 429 Rate Limit\n- 5xx Internal\n\nThe API may also explicitly instruct the SDK to retry or not retry a request.\n\nTo set a custom number of retries, configure the client using the `maxRetries` method:\n\n```java\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\n\nSpottedClient client = SpottedOkHttpClient.builder()\n    .fromEnv()\n    .maxRetries(4)\n    .build();\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default.\n\nTo set a custom timeout, configure the method call using the `timeout` method:\n\n```java\nimport dev.cjav.spotted.models.albums.AlbumRetrieveResponse;\n\nAlbumRetrieveResponse album = client.albums().retrieve(RequestOptions.builder().timeout(Duration.ofSeconds(30)).build());\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport java.time.Duration;\n\nSpottedClient client = SpottedOkHttpClient.builder()\n    .fromEnv()\n    .timeout(Duration.ofSeconds(30))\n    .build();\n```\n\n### Proxies\n\nTo route requests through a proxy, configure the client using the `proxy` method:\n\n```java\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport java.net.InetSocketAddress;\nimport java.net.Proxy;\n\nSpottedClient client = SpottedOkHttpClient.builder()\n    .fromEnv()\n    .proxy(new Proxy(\n      Proxy.Type.HTTP, new InetSocketAddress(\n        "https://example.com", 8080\n      )\n    ))\n    .build();\n```\n\n### Connection pooling\n\nTo customize the underlying OkHttp connection pool, configure the client using the   `maxIdleConnections` and `keepAliveDuration` methods:\n\n```java\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\nimport java.time.Duration;\n\nSpottedClient client = SpottedOkHttpClient.builder()\n    .fromEnv()\n    // If `maxIdleConnections` is set, then `keepAliveDuration` must be set, and vice versa.\n    .maxIdleConnections(10)\n    .keepAliveDuration(Duration.ofMinutes(2))\n    .build();\n```\n\nIf both options are unset, OkHttp\'s default connection pool settings are used.\n\n### HTTPS\n\n> [!NOTE]\n> Most applications should not call these methods, and instead use the system defaults. The defaults include\n> special optimizations that can be lost if the implementations are modified.\n\nTo configure how HTTPS connections are secured, configure the client using the `sslSocketFactory`,   `trustManager`, and `hostnameVerifier` methods:\n\n```java\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\n\nSpottedClient client = SpottedOkHttpClient.builder()\n    .fromEnv()\n    // If `sslSocketFactory` is set, then `trustManager` must be set, and vice versa.\n    .sslSocketFactory(yourSSLSocketFactory)\n    .trustManager(yourTrustManager)\n    .hostnameVerifier(yourHostnameVerifier)\n    .build();\n```\n\n\n\n### Custom HTTP client\n\nThe SDK consists of three artifacts:\n- `spotted-java-core`\n  - Contains core SDK logic\n  - Does not depend on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`SpottedClient`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClient.kt), [`SpottedClientAsync`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClientAsync.kt),             [`SpottedClientImpl`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClientImpl.kt), and [`SpottedClientAsyncImpl`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClientAsyncImpl.kt), all of which can             work with any HTTP client\n- `spotted-java-client-okhttp`\n  - Depends on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`SpottedOkHttpClient`](spotted-java-client-okhttp/src/main/kotlin/dev/cjav/spotted/client/okhttp/SpottedOkHttpClient.kt) and [`SpottedOkHttpClientAsync`](spotted-java-client-okhttp/src/main/kotlin/dev/cjav/spotted/client/okhttp/SpottedOkHttpClientAsync.kt), which             provide a way to construct [`SpottedClientImpl`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClientImpl.kt) and             [`SpottedClientAsyncImpl`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClientAsyncImpl.kt), respectively, using OkHttp\n- `spotted-java`\n  - Depends on and exposes the APIs of both `spotted-java-core` and `spotted-java-client-okhttp`\n  - Does not have its own logic\n\nThis structure allows replacing the SDK\'s default HTTP client without pulling in unnecessary dependencies.\n\n#### Customized [`OkHttpClient`](https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html)\n\n> [!TIP]\n> Try the available [network options](#network-options) before replacing the default client.\n\nTo use a customized `OkHttpClient`:\n\n1. Replace your [`spotted-java` dependency](#installation) with `spotted-java-core`\n2. Copy `spotted-java-client-okhttp`\'s [`OkHttpClient`](spotted-java-client-okhttp/src/main/kotlin/dev/cjav/spotted/client/okhttp/OkHttpClient.kt) class into your code and        customize it\n3. Construct [`SpottedClientImpl`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClientImpl.kt) or [`SpottedClientAsyncImpl`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClientAsyncImpl.kt), similarly to        [`SpottedOkHttpClient`](spotted-java-client-okhttp/src/main/kotlin/dev/cjav/spotted/client/okhttp/SpottedOkHttpClient.kt) or [`SpottedOkHttpClientAsync`](spotted-java-client-okhttp/src/main/kotlin/dev/cjav/spotted/client/okhttp/SpottedOkHttpClientAsync.kt), using your        customized client\n\n### Completely custom HTTP client\n\nTo use a completely custom HTTP client:\n\n1. Replace your [`spotted-java` dependency](#installation) with `spotted-java-core`\n2. Write a class that implements the [`HttpClient`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/core/http/HttpClient.kt) interface\n3. Construct [`SpottedClientImpl`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClientImpl.kt) or [`SpottedClientAsyncImpl`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClientAsyncImpl.kt), similarly to        [`SpottedOkHttpClient`](spotted-java-client-okhttp/src/main/kotlin/dev/cjav/spotted/client/okhttp/SpottedOkHttpClient.kt) or [`SpottedOkHttpClientAsync`](spotted-java-client-okhttp/src/main/kotlin/dev/cjav/spotted/client/okhttp/SpottedOkHttpClientAsync.kt), using your new        client class\n\n## Undocumented API functionality\n\nThe SDK is typed for convenient usage of the documented API. However, it also supports working with undocumented or not yet supported parts of the API.\n\n### Parameters\n\nTo set undocumented parameters, call the `putAdditionalHeader`, `putAdditionalQueryParam`, or       `putAdditionalBodyProperty` methods on any `Params` class:\n\n```java\nimport dev.cjav.spotted.core.JsonValue;\nimport dev.cjav.spotted.models.albums.AlbumRetrieveParams;\n\nAlbumRetrieveParams params = AlbumRetrieveParams.builder()\n    .putAdditionalHeader("Secret-Header", "42")\n    .putAdditionalQueryParam("secret_query_param", "42")\n    .putAdditionalBodyProperty("secretProperty", JsonValue.from("42"))\n    .build();\n```\n\nThese can be accessed on the built object later using the `_additionalHeaders()`,       `_additionalQueryParams()`, and `_additionalBodyProperties()` methods.\n\nTo set a documented parameter or property to an undocumented or not yet supported _value_, pass a       [`JsonValue`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/core/Values.kt) object to its setter:\n\n```java\nimport dev.cjav.spotted.models.albums.AlbumRetrieveParams;\n\nAlbumRetrieveParams params = AlbumRetrieveParams.builder().build();\n```\n\nThe most straightforward way to create a [`JsonValue`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/core/Values.kt) is using its       `from(...)` method:\n\n```java\nimport dev.cjav.spotted.core.JsonValue;\nimport java.util.List;\nimport java.util.Map;\n\n// Create primitive JSON values\nJsonValue nullValue = JsonValue.from(null);\nJsonValue booleanValue = JsonValue.from(true);\nJsonValue numberValue = JsonValue.from(42);\nJsonValue stringValue = JsonValue.from("Hello World!");\n\n// Create a JSON array value equivalent to `["Hello", "World"]`\nJsonValue arrayValue = JsonValue.from(List.of(\n  "Hello", "World"\n));\n\n// Create a JSON object value equivalent to `{ "a": 1, "b": 2 }`\nJsonValue objectValue = JsonValue.from(Map.of(\n  "a", 1,\n  "b", 2\n));\n\n// Create an arbitrarily nested JSON equivalent to:\n// {\n//   "a": [1, 2],\n//   "b": [3, 4]\n// }\nJsonValue complexValue = JsonValue.from(Map.of(\n  "a", List.of(\n    1, 2\n  ),\n  "b", List.of(\n    3, 4\n  )\n));\n```\n\nNormally a `Builder` class\'s `build` method will throw         [`IllegalStateException`](https://docs.oracle.com/javase/8/docs/api/java/lang/IllegalStateException.html)         if any required parameter or property is unset.\n\nTo forcibly omit a required parameter or property, pass [`JsonMissing`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/core/Values.kt):\n\n```java\nimport dev.cjav.spotted.core.JsonMissing;\nimport dev.cjav.spotted.models.albums.AlbumRetrieveParams;\n\nAlbumRetrieveParams params = AlbumRetrieveParams.builder()\n    .id(JsonMissing.of())\n    .build();\n```\n\n### Response properties\n\nTo access undocumented response properties, call the `_additionalProperties()` method:\n\n```java\nimport dev.cjav.spotted.core.JsonValue;\nimport java.util.Map;\n\nMap<String, JsonValue> additionalProperties = client.albums().retrieve(params)._additionalProperties();\nJsonValue secretPropertyValue = additionalProperties.get("secretProperty");\n\nString result = secretPropertyValue.accept(new JsonValue.Visitor<>() {\n    @Override\n    public String visitNull() {\n        return "It\'s null!";\n    }\n\n    @Override\n    public String visitBoolean(boolean value) {\n        return "It\'s a boolean!";\n    }\n\n    @Override\n    public String visitNumber(Number value) {\n        return "It\'s a number!";\n    }\n\n    // Other methods include `visitMissing`, `visitString`, `visitArray`, and `visitObject`\n    // The default implementation of each unimplemented method delegates to `visitDefault`, which throws by default, but can also be overridden\n});\n```\n\nTo access a property\'s raw JSON value, which may be undocumented, call its `_` prefixed method:\n\n```java\nimport dev.cjav.spotted.core.JsonField;\nimport java.util.Optional;\n\nJsonField<Object> field = client.albums().retrieve(params)._field();\n\nif (field.isMissing()) {\n  // The property is absent from the JSON response\n} else if (field.isNull()) {\n  // The property was set to literal null\n} else {\n  // Check if value was provided as a string\n  // Other methods include `asNumber()`, `asBoolean()`, etc.\n  Optional<String> jsonString = field.asString();\n\n  // Try to deserialize into a custom type\n  MyClass myObject = field.asUnknown().orElseThrow().convert(MyClass.class);\n}\n```\n\n### Response validation\n\nIn rare cases, the API may return a response that doesn\'t match the expected type. For example, the SDK     may expect a property to contain a `String`, but the API could return something else.\n\nBy default, the SDK will not throw an exception in this case. It will throw     [`SpottedInvalidDataException`](spotted-java-core/src/main/kotlin/dev/cjav/spotted/errors/SpottedInvalidDataException.kt) only if you directly access the property.\n\nIf you would prefer to check that the response is completely well-typed upfront, then either call     `validate()`:\n\n```java\nimport dev.cjav.spotted.models.albums.AlbumRetrieveResponse;\n\nAlbumRetrieveResponse album = client.albums().retrieve(params).validate();\n```\n\nOr configure the method call to validate the response using the `responseValidation` method:\n\n```java\nimport dev.cjav.spotted.models.albums.AlbumRetrieveResponse;\n\nAlbumRetrieveResponse album = client.albums().retrieve(RequestOptions.builder().responseValidation(true).build());\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport dev.cjav.spotted.client.SpottedClient;\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient;\n\nSpottedClient client = SpottedOkHttpClient.builder()\n    .fromEnv()\n    .responseValidation(true)\n    .build();\n```\n\n## FAQ\n\n### Why don\'t you use plain `enum` classes?\n\nJava `enum` classes are not trivially   [forwards compatible](https://www.stainless.com/blog/making-java-enums-forwards-compatible). Using them in   the SDK could cause runtime exceptions if the API is updated to respond with a new enum value.\n\n### Why do you represent fields using `JsonField<T>` instead of just plain `T`?\n\nUsing `JsonField<T>` enables a few features:\n\n- Allowing usage of [undocumented API functionality](#undocumented-api-functionality)\n- Lazily [validating the API response against the expected shape](#response-validation)\n- Representing absent vs explicitly null values\n\n### Why don\'t you use [`data` classes](https://kotlinlang.org/docs/data-classes.html)?\n\nIt is not [backwards compatible to add new fields to a data class](https://kotlinlang.org/docs/api-guidelines-backward-compatibility.html#avoid-using-data-classes-in-your-api)   and we don\'t want to introduce a breaking change every time we add a field to a class.\n\n### Why don\'t you use checked exceptions?\n\nChecked exceptions are widely considered a mistake in the Java programming language. In fact, they were   omitted from Kotlin for this reason.\n\nChecked exceptions:\n\n- Are verbose to handle\n- Encourage error handling at the wrong level of abstraction, where nothing can be done about the error\n- Are tedious to propagate due to the [function coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function)\n- Don\'t play well with lambdas (also due to the function coloring problem)\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/cjavdev/spotted-java/issues) with questions, bugs, or suggestions.\n',
  },
  {
    language: 'kotlin',
    content:
      '# Unofficial Spotify API Library\n\n<!-- x-release-please-start-version -->\n[![Maven Central](https://img.shields.io/maven-central/v/dev.cjav.spotted/spotted-kotlin)](https://central.sonatype.com/artifact/dev.cjav.spotted/spotted-kotlin/0.0.1)\n[![javadoc](https://javadoc.io/badge2/dev.cjav.spotted/spotted-kotlin/0.0.1/javadoc.svg)](https://javadoc.io/doc/dev.cjav.spotted/spotted-kotlin/0.0.1)\n<!-- x-release-please-end -->\n\nThe Unofficial Spotify SDK provides convenient access to the [Spotted REST API](https://spotted.cjav.dev)   from applications written in Kotlin.\n\nThe Spotted Kotlin SDK is similar to the Spotted Java SDK but with minor differences that       make it more ergonomic for use in Kotlin, such as nullable values instead of `Optional`,       `Sequence` instead of `Stream`, and suspend functions instead of `CompletableFuture`.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Spotted MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=spotted-ts-mcp&config=eyJuYW1lIjoic3BvdHRlZC10cy1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly9zcG90dGVkLnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7Ingtc3BvdGlmeS1hY2Nlc3MtdG9rZW4iOiJNeSBBY2Nlc3MgVG9rZW4ifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22spotted-ts-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fspotted.stlmcp.com%22%2C%22headers%22%3A%7B%22x-spotify-access-token%22%3A%22My%20Access%20Token%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n<!-- x-release-please-start-version -->\n\nThe REST API documentation can be found on [spotted.cjav.dev](https://spotted.cjav.dev). KDocs are available on [javadoc.io](https://javadoc.io/doc/dev.cjav.spotted/spotted-kotlin/0.0.1).\n\n<!-- x-release-please-end -->\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n### Gradle\n\n~~~kotlin\nimplementation("dev.cjav.spotted:spotted-kotlin:0.0.1")\n~~~\n\n### Maven\n\n~~~xml\n<dependency>\n  <groupId>dev.cjav.spotted</groupId>\n  <artifactId>spotted-kotlin</artifactId>\n  <version>0.0.1</version>\n</dependency>\n~~~\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Java 8 or later.\n\n## Usage\n\n```kotlin\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.albums.AlbumRetrieveParams\nimport dev.cjav.spotted.models.albums.AlbumRetrieveResponse\n\n// Configures using the `spotted.spotifyAccessToken` and `spotted.baseUrl` system properties\n// Or configures using the `SPOTIFY_ACCESS_TOKEN` and `SPOTTED_BASE_URL` environment variables\nval client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\nval album: AlbumRetrieveResponse = client.albums().retrieve("4aawyAB9vmqN3uQ7FjRGTy")\n```\n\n## Client configuration\n\nConfigure the client using system properties or environment variables:\n\n```kotlin\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\n\n// Configures using the `spotted.spotifyAccessToken` and `spotted.baseUrl` system properties\n// Or configures using the `SPOTIFY_ACCESS_TOKEN` and `SPOTTED_BASE_URL` environment variables\nval client: SpottedClient = SpottedOkHttpClient.fromEnv()\n```\n\nOr manually:\n\n```kotlin\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\n\nval client: SpottedClient = SpottedOkHttpClient.builder()\n    .accessToken("My Access Token")\n    .build()\n```\n\nOr using a combination of the two approaches:\n\n```kotlin\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\n\nval client: SpottedClient = SpottedOkHttpClient.builder()\n    // Configures using the `spotted.spotifyAccessToken` and `spotted.baseUrl` system properties\n    // Or configures using the `SPOTIFY_ACCESS_TOKEN` and `SPOTTED_BASE_URL` environment variables\n    .fromEnv()\n    .accessToken("My Access Token")\n    .build()\n```\n\nSee this table for the available options:\n\n| Setter        | System property              | Environment variable   | Required | Default value                  |\n| ------------- | ---------------------------- | ---------------------- | -------- | ------------------------------ |\n| `accessToken` | `spotted.spotifyAccessToken` | `SPOTIFY_ACCESS_TOKEN` | true     | -                              |\n| `baseUrl`     | `spotted.baseUrl`            | `SPOTTED_BASE_URL`     | true     | `"https://api.spotify.com/v1"` |\n\nSystem properties take precedence over environment variables.\n\n> [!TIP]\n> Don\'t create more than one client in the same application. Each client has a connection pool and\n> thread pools, which are more efficient to share between requests.\n\n### Modifying configuration\n\nTo temporarily use a modified client configuration, while reusing the same connection and thread       pools, call `withOptions()` on any client or service:\n\n```kotlin\nimport dev.cjav.spotted.client.SpottedClient\n\nval clientWithOptions: SpottedClient = client.withOptions {\n    it.baseUrl("https://example.com")\n    it.maxRetries(42)\n}\n```\n\nThe `withOptions()` method does not affect the original client or service.\n\n## Requests and responses\n\nTo send a request to the Spotted API, build an instance of some `Params` class and pass it to the     corresponding client method. When the response is received, it will be deserialized into an instance of     a Kotlin class.\n\nFor example, `client.albums().retrieve(...)` should be called with an instance of `AlbumRetrieveParams`, and it     will return an instance of `AlbumRetrieveResponse`.\n\n## Immutability\n\nEach class in the SDK has an associated   [builder](https://blogs.oracle.com/javamagazine/post/exploring-joshua-blochs-builder-design-pattern-in-java)   or factory method for constructing it.\n\nEach class is [immutable](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html)   once constructed. If the class has an associated builder, then it has a `toBuilder()` method, which can   be used to convert it back to a builder for making a modified copy.\n\nBecause each class is immutable, builder modification will _never_ affect already built class instances.\n\n## Asynchronous execution\n\nThe default client is synchronous. To switch to asynchronous execution, call the `async()` method:\n\n```kotlin\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport dev.cjav.spotted.models.albums.AlbumRetrieveParams\nimport dev.cjav.spotted.models.albums.AlbumRetrieveResponse\n\n// Configures using the `spotted.spotifyAccessToken` and `spotted.baseUrl` system properties\n// Or configures using the `SPOTIFY_ACCESS_TOKEN` and `SPOTTED_BASE_URL` environment variables\nval client: SpottedClient = SpottedOkHttpClient.fromEnv()\n\nval album: AlbumRetrieveResponse = client.async().albums().retrieve("4aawyAB9vmqN3uQ7FjRGTy")\n```\n\nOr create an asynchronous client from the beginning:\n\n```kotlin\nimport dev.cjav.spotted.client.SpottedClientAsync\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClientAsync\nimport dev.cjav.spotted.models.albums.AlbumRetrieveParams\nimport dev.cjav.spotted.models.albums.AlbumRetrieveResponse\n\n// Configures using the `spotted.spotifyAccessToken` and `spotted.baseUrl` system properties\n// Or configures using the `SPOTIFY_ACCESS_TOKEN` and `SPOTTED_BASE_URL` environment variables\nval client: SpottedClientAsync = SpottedOkHttpClientAsync.fromEnv()\n\nval album: AlbumRetrieveResponse = client.albums().retrieve("4aawyAB9vmqN3uQ7FjRGTy")\n```\n\nThe asynchronous client supports the same options as the synchronous one, except most methods are [suspending](https://kotlinlang.org/docs/coroutines-guide.html).\n\n\n\n\n\n## Binary responses\n\nThe SDK defines methods that return binary responses, which are used for API responses that shouldn\'t     necessarily be parsed, like non-JSON data.\n\nThese methods return [`HttpResponse`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/core/http/HttpResponse.kt):\n\n```kotlin\nimport dev.cjav.spotted.core.http.HttpResponse\nimport dev.cjav.spotted.models.playlists.images.ImageUpdateParams\n\nval image: HttpResponse = client.playlists().images().update(\n  "3cEYpjA9oz9GiPac4AsH4n", "Example data"\n)\n```\n\nTo save the response content to a file, use the     [`Files.copy(...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#copy-java.io.InputStream-java.nio.file.Path-java.nio.file.CopyOption...-)     method:\n\n```kotlin\nimport java.nio.file.Files\nimport java.nio.file.Paths\nimport java.nio.file.StandardCopyOption\n\nclient.playlists().images().update(params).use {\n    Files.copy(\n        it.body(),\n        Paths.get(path),\n        StandardCopyOption.REPLACE_EXISTING\n    )\n}\n```\n\nOr transfer the response content to any     [`OutputStream`](https://docs.oracle.com/javase/8/docs/api/java/io/OutputStream.html):\n\n```kotlin\nimport java.nio.file.Files\nimport java.nio.file.Paths\n\nclient.playlists().images().update(params).use {\n    it.body().transferTo(Files.newOutputStream(Paths.get(path)))\n}\n```\n\n## Raw responses\n\nThe SDK defines methods that deserialize responses into instances of Kotlin classes.       However, these methods don\'t provide access to the response headers, status code, or the raw response       body.\n\nTo access this data, prefix any HTTP method call on a client or service with `withRawResponse()`:\n\n```kotlin\nimport dev.cjav.spotted.core.http.Headers\nimport dev.cjav.spotted.core.http.HttpResponseFor\nimport dev.cjav.spotted.models.albums.AlbumRetrieveParams\nimport dev.cjav.spotted.models.albums.AlbumRetrieveResponse\n\nval album: HttpResponseFor<AlbumRetrieveResponse> = client.albums().withRawResponse().retrieve("4aawyAB9vmqN3uQ7FjRGTy")\n\nval statusCode: Int = album.statusCode()\nval headers: Headers = album.headers()\n```\n\nYou can still deserialize the response into an instance of a Kotlin class if needed:\n\n```kotlin\nimport dev.cjav.spotted.models.albums.AlbumRetrieveResponse\n\nval parsedAlbum: AlbumRetrieveResponse = album.parse()\n```\n\n## Error handling\n\nThe SDK throws custom unchecked exception types:\n\n- [`SpottedServiceException`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/errors/SpottedServiceException.kt): Base class for HTTP errors. See this table for which exception       subclass is thrown for each HTTP status code:\n\n  | Status | Exception                                          |\n  | ------ | -------------------------------------------------- |\n  | 400    | [`BadRequestException`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/errors/BadRequestException.kt)           |\n  | 401    | [`UnauthorizedException`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/errors/UnauthorizedException.kt)         |\n  | 403    | [`PermissionDeniedException`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/errors/PermissionDeniedException.kt)     |\n  | 404    | [`NotFoundException`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/errors/NotFoundException.kt)             |\n  | 422    | [`UnprocessableEntityException`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/errors/UnprocessableEntityException.kt)  |\n  | 429    | [`RateLimitException`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/errors/RateLimitException.kt)            |\n  | 5xx    | [`InternalServerException`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/errors/InternalServerException.kt)       |\n  | others | [`UnexpectedStatusCodeException`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/errors/UnexpectedStatusCodeException.kt) |\n\n- [`SpottedIoException`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/errors/SpottedIoException.kt): I/O networking errors.\n\n- [`SpottedRetryableException`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/errors/SpottedRetryableException.kt): Generic error indicating a failure that could be retried by the client.\n\n- [`SpottedInvalidDataException`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/errors/SpottedInvalidDataException.kt): Failure to interpret successfully parsed data. For example,       when accessing a property that\'s supposed to be required, but the API unexpectedly omitted it from the       response.\n\n- [`SpottedException`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/errors/SpottedException.kt): Base class for all exceptions. Most errors will result in one of the       previously mentioned ones, but completely generic errors may be thrown using the base class.\n\n## Pagination\n\nThe SDK defines methods that return a paginated lists of results. It provides convenient ways to access     the results either one page at a time or item-by-item across all pages.\n\n### Auto-pagination\n\nTo iterate through all results across all pages, use the `autoPager()` method, which automatically     fetches more pages as needed.\n\nWhen using the synchronous client, the method returns a [`Sequence`](https://kotlinlang.org/docs/sequences.html)\n\n```kotlin\nimport dev.cjav.spotted.models.shows.ShowListEpisodesPage\n\nval page: ShowListEpisodesPage = client.shows().listEpisodes()\npage.autoPager()\n    .take(50)\n    .forEach { show -> println(show) }\n```\n\nWhen using the asynchronous client, the method returns a [`Flow`](https://kotlinlang.org/docs/flow.html):\n\n```kotlin\nimport dev.cjav.spotted.models.shows.ShowListEpisodesPageAsync\n\nval page: ShowListEpisodesPageAsync = client.async().shows().listEpisodes()\npage.autoPager()\n    .take(50)\n    .forEach { show -> println(show) }\n```\n\n### Manual pagination\n\nTo access individual page items and manually request the next page, use the `items()`,\n`hasNextPage()`, and `nextPage()` methods:\n\n```kotlin\nimport dev.cjav.spotted.models.SimplifiedEpisodeObject\nimport dev.cjav.spotted.models.shows.ShowListEpisodesPage\n\nval page: ShowListEpisodesPage = client.shows().listEpisodes()\nwhile (true) {\n    for (show in page.items()) {\n        println(show)\n    }\n\n    if (!page.hasNextPage()) {\n        break\n    }\n\n    page = page.nextPage()\n}\n```\n\n## Logging\n\nThe SDK uses the standard   [OkHttp logging interceptor](https://github.com/square/okhttp/tree/master/okhttp-logging-interceptor).\n\nEnable logging by setting the `SPOTTED_LOG` environment variable to   `info`:\n\n```sh\nexport SPOTTED_LOG=info\n```\n\nOr to `debug` for more verbose logging:\n\n```sh\nexport SPOTTED_LOG=debug\n```\n\n## ProGuard and R8\n\nAlthough the SDK uses reflection, it is still usable with     [ProGuard](https://github.com/Guardsquare/proguard) and     [R8](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization) because     `spotted-kotlin-core` is published with a     [configuration file](spotted-kotlin-core/src/main/resources/META-INF/proguard/spotted-kotlin-core.pro) containing     [keep rules](https://www.guardsquare.com/manual/configuration/usage).\n\nProGuard and R8 should automatically detect and use the published rules, but you can also manually copy     the keep rules if necessary.\n\n\n\n\n\n## Jackson\n\nThe SDK depends on [Jackson](https://github.com/FasterXML/jackson) for JSON     serialization/deserialization. It is compatible with version 2.13.4 or higher,     but depends on version 2.18.2 by default.\n\nThe SDK throws an exception if it detects an incompatible Jackson version at runtime (e.g. if the     default version was overridden in your Maven or Gradle config).\n\nIf the SDK threw an exception, but you\'re _certain_ the version is compatible, then disable the version     check using the `checkJacksonVersionCompatibility` on [`SpottedOkHttpClient`](spotted-kotlin-client-okhttp/src/main/kotlin/dev/cjav/spotted/client/okhttp/SpottedOkHttpClient.kt) or     [`SpottedOkHttpClientAsync`](spotted-kotlin-client-okhttp/src/main/kotlin/dev/cjav/spotted/client/okhttp/SpottedOkHttpClientAsync.kt).\n\n> [!CAUTION]\n> We make no guarantee that the SDK works correctly when the Jackson version check is disabled.\n\nAlso note that there are bugs in older Jackson versions that can affect the SDK. We don\'t work around all     Jackson bugs ([example](https://github.com/FasterXML/jackson-databind/issues/3240)) and expect users to     upgrade Jackson for those instead.\n\n## Network options\n\n### Retries\n\nThe SDK automatically retries 2 times by default, with a short exponential backoff between requests.\n\nOnly the following error types are retried:\n- Connection errors (for example, due to a network connectivity problem)\n- 408 Request Timeout\n- 409 Conflict\n- 429 Rate Limit\n- 5xx Internal\n\nThe API may also explicitly instruct the SDK to retry or not retry a request.\n\nTo set a custom number of retries, configure the client using the `maxRetries` method:\n\n```kotlin\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\n\nval client: SpottedClient = SpottedOkHttpClient.builder()\n    .fromEnv()\n    .maxRetries(4)\n    .build()\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default.\n\nTo set a custom timeout, configure the method call using the `timeout` method:\n\n```kotlin\nimport dev.cjav.spotted.models.albums.AlbumRetrieveResponse\n\nval album: AlbumRetrieveResponse = client.albums().retrieve(RequestOptions.builder().timeout(Duration.ofSeconds(30)).build())\n```\n\nOr configure the default for all method calls at the client level:\n\n```kotlin\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport java.time.Duration\n\nval client: SpottedClient = SpottedOkHttpClient.builder()\n    .fromEnv()\n    .timeout(Duration.ofSeconds(30))\n    .build()\n```\n\n### Proxies\n\nTo route requests through a proxy, configure the client using the `proxy` method:\n\n```kotlin\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport java.net.InetSocketAddress\nimport java.net.Proxy\n\nval client: SpottedClient = SpottedOkHttpClient.builder()\n    .fromEnv()\n    .proxy(Proxy(\n      Proxy.Type.HTTP, InetSocketAddress(\n        "https://example.com", 8080\n      )\n    ))\n    .build()\n```\n\n### Connection pooling\n\nTo customize the underlying OkHttp connection pool, configure the client using the   `maxIdleConnections` and `keepAliveDuration` methods:\n\n```kotlin\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\nimport java.time.Duration\n\nval client: SpottedClient = SpottedOkHttpClient.builder()\n    .fromEnv()\n    // If `maxIdleConnections` is set, then `keepAliveDuration` must be set, and vice versa.\n    .maxIdleConnections(10)\n    .keepAliveDuration(Duration.ofMinutes(2))\n    .build()\n```\n\nIf both options are unset, OkHttp\'s default connection pool settings are used.\n\n### HTTPS\n\n> [!NOTE]\n> Most applications should not call these methods, and instead use the system defaults. The defaults include\n> special optimizations that can be lost if the implementations are modified.\n\nTo configure how HTTPS connections are secured, configure the client using the `sslSocketFactory`,   `trustManager`, and `hostnameVerifier` methods:\n\n```kotlin\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\n\nval client: SpottedClient = SpottedOkHttpClient.builder()\n    .fromEnv()\n    // If `sslSocketFactory` is set, then `trustManager` must be set, and vice versa.\n    .sslSocketFactory(yourSSLSocketFactory)\n    .trustManager(yourTrustManager)\n    .hostnameVerifier(yourHostnameVerifier)\n    .build()\n```\n\n\n\n### Custom HTTP client\n\nThe SDK consists of three artifacts:\n- `spotted-kotlin-core`\n  - Contains core SDK logic\n  - Does not depend on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`SpottedClient`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClient.kt), [`SpottedClientAsync`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClientAsync.kt),             [`SpottedClientImpl`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClientImpl.kt), and [`SpottedClientAsyncImpl`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClientAsyncImpl.kt), all of which can             work with any HTTP client\n- `spotted-kotlin-client-okhttp`\n  - Depends on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`SpottedOkHttpClient`](spotted-kotlin-client-okhttp/src/main/kotlin/dev/cjav/spotted/client/okhttp/SpottedOkHttpClient.kt) and [`SpottedOkHttpClientAsync`](spotted-kotlin-client-okhttp/src/main/kotlin/dev/cjav/spotted/client/okhttp/SpottedOkHttpClientAsync.kt), which             provide a way to construct [`SpottedClientImpl`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClientImpl.kt) and             [`SpottedClientAsyncImpl`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClientAsyncImpl.kt), respectively, using OkHttp\n- `spotted-kotlin`\n  - Depends on and exposes the APIs of both `spotted-kotlin-core` and `spotted-kotlin-client-okhttp`\n  - Does not have its own logic\n\nThis structure allows replacing the SDK\'s default HTTP client without pulling in unnecessary dependencies.\n\n#### Customized [`OkHttpClient`](https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html)\n\n> [!TIP]\n> Try the available [network options](#network-options) before replacing the default client.\n\nTo use a customized `OkHttpClient`:\n\n1. Replace your [`spotted-kotlin` dependency](#installation) with `spotted-kotlin-core`\n2. Copy `spotted-kotlin-client-okhttp`\'s [`OkHttpClient`](spotted-kotlin-client-okhttp/src/main/kotlin/dev/cjav/spotted/client/okhttp/OkHttpClient.kt) class into your code and        customize it\n3. Construct [`SpottedClientImpl`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClientImpl.kt) or [`SpottedClientAsyncImpl`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClientAsyncImpl.kt), similarly to        [`SpottedOkHttpClient`](spotted-kotlin-client-okhttp/src/main/kotlin/dev/cjav/spotted/client/okhttp/SpottedOkHttpClient.kt) or [`SpottedOkHttpClientAsync`](spotted-kotlin-client-okhttp/src/main/kotlin/dev/cjav/spotted/client/okhttp/SpottedOkHttpClientAsync.kt), using your        customized client\n\n### Completely custom HTTP client\n\nTo use a completely custom HTTP client:\n\n1. Replace your [`spotted-kotlin` dependency](#installation) with `spotted-kotlin-core`\n2. Write a class that implements the [`HttpClient`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/core/http/HttpClient.kt) interface\n3. Construct [`SpottedClientImpl`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClientImpl.kt) or [`SpottedClientAsyncImpl`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/client/SpottedClientAsyncImpl.kt), similarly to        [`SpottedOkHttpClient`](spotted-kotlin-client-okhttp/src/main/kotlin/dev/cjav/spotted/client/okhttp/SpottedOkHttpClient.kt) or [`SpottedOkHttpClientAsync`](spotted-kotlin-client-okhttp/src/main/kotlin/dev/cjav/spotted/client/okhttp/SpottedOkHttpClientAsync.kt), using your new        client class\n\n## Undocumented API functionality\n\nThe SDK is typed for convenient usage of the documented API. However, it also supports working with undocumented or not yet supported parts of the API.\n\n### Parameters\n\nTo set undocumented parameters, call the `putAdditionalHeader`, `putAdditionalQueryParam`, or       `putAdditionalBodyProperty` methods on any `Params` class:\n\n```kotlin\nimport dev.cjav.spotted.core.JsonValue\nimport dev.cjav.spotted.models.albums.AlbumRetrieveParams\n\nval params: AlbumRetrieveParams = AlbumRetrieveParams.builder()\n    .putAdditionalHeader("Secret-Header", "42")\n    .putAdditionalQueryParam("secret_query_param", "42")\n    .putAdditionalBodyProperty("secretProperty", JsonValue.from("42"))\n    .build()\n```\n\nThese can be accessed on the built object later using the `_additionalHeaders()`,       `_additionalQueryParams()`, and `_additionalBodyProperties()` methods.\n\nTo set a documented parameter or property to an undocumented or not yet supported _value_, pass a       [`JsonValue`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/core/Values.kt) object to its setter:\n\n```kotlin\nimport dev.cjav.spotted.models.albums.AlbumRetrieveParams\n\nval params: AlbumRetrieveParams = AlbumRetrieveParams.builder().build()\n```\n\nThe most straightforward way to create a [`JsonValue`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/core/Values.kt) is using its       `from(...)` method:\n\n```kotlin\nimport dev.cjav.spotted.core.JsonValue\n\n// Create primitive JSON values\nval nullValue: JsonValue = JsonValue.from(null)\nval booleanValue: JsonValue = JsonValue.from(true)\nval numberValue: JsonValue = JsonValue.from(42)\nval stringValue: JsonValue = JsonValue.from("Hello World!")\n\n// Create a JSON array value equivalent to `["Hello", "World"]`\nval arrayValue: JsonValue = JsonValue.from(listOf(\n  "Hello", "World"\n))\n\n// Create a JSON object value equivalent to `{ "a": 1, "b": 2 }`\nval objectValue: JsonValue = JsonValue.from(mapOf(\n  "a" to 1, "b" to 2\n))\n\n// Create an arbitrarily nested JSON equivalent to:\n// {\n//   "a": [1, 2],\n//   "b": [3, 4]\n// }\nval complexValue: JsonValue = JsonValue.from(mapOf(\n  "a" to listOf(\n    1, 2\n  ), "b" to listOf(\n    3, 4\n  )\n))\n```\n\nNormally a `Builder` class\'s `build` method will throw         [`IllegalStateException`](https://docs.oracle.com/javase/8/docs/api/java/lang/IllegalStateException.html)         if any required parameter or property is unset.\n\nTo forcibly omit a required parameter or property, pass [`JsonMissing`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/core/Values.kt):\n\n```kotlin\nimport dev.cjav.spotted.core.JsonMissing\nimport dev.cjav.spotted.models.albums.AlbumRetrieveParams\n\nval params: AlbumRetrieveParams = AlbumRetrieveParams.builder()\n    .id(JsonMissing.of())\n    .build()\n```\n\n### Response properties\n\nTo access undocumented response properties, call the `_additionalProperties()` method:\n\n```kotlin\nimport dev.cjav.spotted.core.JsonBoolean\nimport dev.cjav.spotted.core.JsonNull\nimport dev.cjav.spotted.core.JsonNumber\nimport dev.cjav.spotted.core.JsonValue\n\nval additionalProperties: Map<String, JsonValue> = client.albums().retrieve(params)._additionalProperties()\nval secretPropertyValue: JsonValue = additionalProperties.get("secretProperty")\n\nval result = when (secretPropertyValue) {\n    is JsonNull -> "It\'s null!"\n    is JsonBoolean -> "It\'s a boolean!"\n    is JsonNumber -> "It\'s a number!"\n    // Other types include `JsonMissing`, `JsonString`, `JsonArray`, and `JsonObject`\n    else -> "It\'s something else!"\n}\n```\n\nTo access a property\'s raw JSON value, which may be undocumented, call its `_` prefixed method:\n\n```kotlin\nimport dev.cjav.spotted.core.JsonField\n\nval field: JsonField<Any> = client.albums().retrieve(params)._field()\n\nif (field.isMissing()) {\n  // The property is absent from the JSON response\n} else if (field.isNull()) {\n  // The property was set to literal null\n} else {\n  // Check if value was provided as a string\n  // Other methods include `asNumber()`, `asBoolean()`, etc.\n  val jsonString: String? = field.asString();\n\n  // Try to deserialize into a custom type\n  val myObject: MyClass = field.asUnknown()!!.convert(MyClass::class.java)\n}\n```\n\n### Response validation\n\nIn rare cases, the API may return a response that doesn\'t match the expected type. For example, the SDK     may expect a property to contain a `String`, but the API could return something else.\n\nBy default, the SDK will not throw an exception in this case. It will throw     [`SpottedInvalidDataException`](spotted-kotlin-core/src/main/kotlin/dev/cjav/spotted/errors/SpottedInvalidDataException.kt) only if you directly access the property.\n\nIf you would prefer to check that the response is completely well-typed upfront, then either call     `validate()`:\n\n```kotlin\nimport dev.cjav.spotted.models.albums.AlbumRetrieveResponse\n\nval album: AlbumRetrieveResponse = client.albums().retrieve(params).validate()\n```\n\nOr configure the method call to validate the response using the `responseValidation` method:\n\n```kotlin\nimport dev.cjav.spotted.models.albums.AlbumRetrieveResponse\n\nval album: AlbumRetrieveResponse = client.albums().retrieve(RequestOptions.builder().responseValidation(true).build())\n```\n\nOr configure the default for all method calls at the client level:\n\n```kotlin\nimport dev.cjav.spotted.client.SpottedClient\nimport dev.cjav.spotted.client.okhttp.SpottedOkHttpClient\n\nval client: SpottedClient = SpottedOkHttpClient.builder()\n    .fromEnv()\n    .responseValidation(true)\n    .build()\n```\n\n## FAQ\n\n### Why don\'t you use plain `enum` classes?\n\nKotlin `enum` classes are not trivially   [forwards compatible](https://www.stainless.com/blog/making-java-enums-forwards-compatible). Using them in   the SDK could cause runtime exceptions if the API is updated to respond with a new enum value.\n\n### Why do you represent fields using `JsonField<T>` instead of just plain `T`?\n\nUsing `JsonField<T>` enables a few features:\n\n- Allowing usage of [undocumented API functionality](#undocumented-api-functionality)\n- Lazily [validating the API response against the expected shape](#response-validation)\n- Representing absent vs explicitly null values\n\n### Why don\'t you use [`data` classes](https://kotlinlang.org/docs/data-classes.html)?\n\nIt is not [backwards compatible to add new fields to a data class](https://kotlinlang.org/docs/api-guidelines-backward-compatibility.html#avoid-using-data-classes-in-your-api)   and we don\'t want to introduce a breaking change every time we add a field to a class.\n\n### Why don\'t you use checked exceptions?\n\nChecked exceptions are widely considered a mistake in the Java programming language. In fact, they were   omitted from Kotlin for this reason.\n\nChecked exceptions:\n\n- Are verbose to handle\n- Encourage error handling at the wrong level of abstraction, where nothing can be done about the error\n- Are tedious to propagate due to the [function coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function)\n- Don\'t play well with lambdas (also due to the function coloring problem)\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/cjavdev/spotted-kotlin/issues) with questions, bugs, or suggestions.\n',
  },
  {
    language: 'csharp',
    content:
      '# Unofficial Spotify API Library\n\nThe Unofficial Spotify SDK provides convenient access to the [Spotted REST API](https://spotted.cjav.dev) from applications written in   C#.\n\n## Installation\n\nInstall the package from [NuGet](https://www.nuget.org/packages/Spotted):\n\n```bash\ndotnet add package Spotted\n```\n\n## Requirements\n\nThis library requires .NET Standard 2.0 or later.\n\n## Usage\n\nSee the [`examples`](examples) directory for complete and runnable examples.\n\n```csharp\nSpottedClient client = new();\n\nAlbumRetrieveParams parameters = new() { ID = "4aawyAB9vmqN3uQ7FjRGTy" };\n\nvar album = await client.Albums.Retrieve(parameters);\n\nConsole.WriteLine(album);\n```',
  },
  {
    language: 'cli',
    content:
      "# Spotted CLI\n\nThe official CLI for the [Spotted REST API](https://spotted.cjav.dev).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n<!-- x-release-please-start-version -->\n\n## Installation\n\n### Installing with Homebrew\n\n~~~sh\nbrew install cjavdev/spotted-cli/spotted\n~~~\n\n### Installing with Go\n\nTo test or install the CLI locally, you need [Go](https://go.dev/doc/install) version 1.22 or later installed.\n\n~~~sh\ngo install 'github.com/cjavdev/spotted-cli/cmd/spotted@latest'\n~~~\n\nOnce you have run `go install`, the binary is placed in your Go bin directory:\n\n- **Default location**: `$HOME/go/bin` (or `$GOPATH/bin` if GOPATH is set)\n- **Check your path**: Run `go env GOPATH` to see the base directory\n\nIf commands aren't found after installation, add the Go bin directory to your PATH:\n\n~~~sh\n# Add to your shell profile (.zshrc, .bashrc, etc.)\nexport PATH=\"$PATH:$(go env GOPATH)/bin\"\n~~~\n\n<!-- x-release-please-end -->\n\n### Running Locally\n\nAfter cloning the git repository for this project, you can use the\n`scripts/run` script to run the tool locally:\n\n~~~sh\n./scripts/run args...\n~~~\n\n## Usage\n\nThe CLI follows a resource-based command structure:\n\n~~~sh\nspotted [resource] <command> [flags...]\n~~~\n\n~~~sh\nspotted albums retrieve \\\n  --access-token 'My Access Token' \\\n  --id 4aawyAB9vmqN3uQ7FjRGTy\n~~~\n\nFor details about specific commands, use the `--help` flag.\n\n### Environment variables\n\n| Environment variable   | Required |\n| ---------------------- | -------- |\n| `SPOTIFY_ACCESS_TOKEN` | yes      |\n\n### Global flags\n\n- `--access-token` (can also be set with `SPOTIFY_ACCESS_TOKEN` env var)\n- `--help` - Show command line usage\n- `--debug` - Enable debug logging (includes HTTP request/response details)\n- `--version`, `-v` - Show the CLI version\n- `--base-url` - Use a custom API backend URL\n- `--format` - Change the output format (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--format-error` - Change the output format for errors (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--transform` - Transform the data output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n- `--transform-error` - Transform the error output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n\n### Passing files as arguments\n\nTo pass files to your API, you can use the `@myfile.ext` syntax:\n\n~~~bash\nspotted <command> --arg @abe.jpg\n~~~\n\nFiles can also be passed inside JSON or YAML blobs:\n\n~~~bash\nspotted <command> --arg '{image: \"@abe.jpg\"}'\n# Equivalent:\nspotted <command> <<YAML\narg:\n  image: \"@abe.jpg\"\nYAML\n~~~\n\nIf you need to pass a string literal that begins with an `@` sign, you can\nescape the `@` sign to avoid accidentally passing a file.\n\n~~~bash\nspotted <command> --username '\\@abe'\n~~~\n\n#### Explicit encoding\n\nFor JSON endpoints, the CLI tool does filetype sniffing to determine whether the\nfile contents should be sent as a string literal (for plain text files) or as a\nbase64-encoded string literal (for binary files). If you need to explicitly send\nthe file as either plain text or base64-encoded data, you can use\n`@file://myfile.txt` (for string encoding) or `@data://myfile.dat` (for\nbase64-encoding). Note that absolute paths will begin with `@file://` or\n`@data://`, followed by a third `/` (for example, `@file:///tmp/file.txt`).\n\n~~~bash\nspotted <command> --arg @data://file.txt\n~~~\n",
  },
  {
    language: 'php',
    content:
      "# Unofficial Spotify API Library\n\nThe Unofficial Spotify library provides convenient access to the Spotted REST API from any PHP 8.1.0+ application.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n```\ncomposer require \"cjavdev/spotted 0.0.1\"\n```\n<!-- x-release-please-end -->\n\n## Usage\n\n```php\n<?php\n\n$client = new Client(\n  accessToken: getenv('SPOTIFY_ACCESS_TOKEN') ?: 'My Access Token'\n);\n\n$album = $client->albums->retrieve('4aawyAB9vmqN3uQ7FjRGTy');\n\nvar_dump($album->id);\n```",
  },
];

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

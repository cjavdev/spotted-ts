// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorURLPage, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Artists extends APIResource {
  /**
   * Get Spotify catalog information for a single artist identified by their unique
   * Spotify ID.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Shared.ArtistObject> {
    return this._client.get(path`/artists/${id}`, options);
  }

  /**
   * Get Spotify catalog information for several artists based on their Spotify IDs.
   *
   * @deprecated
   */
  bulkRetrieve(
    query: ArtistBulkRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<ArtistBulkRetrieveResponse> {
    return this._client.get('/artists', { query, ...options });
  }

  /**
   * Get Spotify catalog information about an artist's albums.
   */
  listAlbums(
    id: string,
    query: ArtistListAlbumsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ArtistListAlbumsResponsesCursorURLPage, ArtistListAlbumsResponse> {
    return this._client.getAPIList(path`/artists/${id}/albums`, CursorURLPage<ArtistListAlbumsResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Get Spotify catalog information about artists similar to a given artist.
   * Similarity is based on analysis of the Spotify community's listening history.
   *
   * @deprecated
   */
  listRelatedArtists(id: string, options?: RequestOptions): APIPromise<ArtistListRelatedArtistsResponse> {
    return this._client.get(path`/artists/${id}/related-artists`, options);
  }

  /**
   * Get Spotify catalog information about an artist's top tracks by country.
   *
   * @deprecated
   */
  topTracks(
    id: string,
    query: ArtistTopTracksParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ArtistTopTracksResponse> {
    return this._client.get(path`/artists/${id}/top-tracks`, { query, ...options });
  }
}

export type ArtistListAlbumsResponsesCursorURLPage = CursorURLPage<ArtistListAlbumsResponse>;

export interface ArtistBulkRetrieveResponse {
  artists: Array<Shared.ArtistObject>;
}

export interface ArtistListAlbumsResponse {
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * album.
   */
  id: string;

  /**
   * @deprecated This field describes the relationship between the artist and the
   * album.
   */
  album_group: 'album' | 'single' | 'compilation' | 'appears_on';

  /**
   * The type of the album.
   */
  album_type: 'album' | 'single' | 'compilation';

  /**
   * The artists of the album. Each artist object includes a link in `href` to more
   * detailed information about the artist.
   */
  artists: Array<Shared.SimplifiedArtistObject>;

  /**
   * @deprecated The markets in which the album is available:
   * [ISO 3166-1 alpha-2 country codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
   * _**NOTE**: an album is considered available in a market when at least 1 of its
   * tracks is available in that market._
   */
  available_markets: Array<string>;

  /**
   * Known external URLs for this album.
   */
  external_urls: Shared.ExternalURLObject;

  /**
   * A link to the Web API endpoint providing full details of the album.
   */
  href: string;

  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: Array<Shared.ImageObject>;

  /**
   * The name of the album. In case of an album takedown, the value may be an empty
   * string.
   */
  name: string;

  /**
   * The date the album was first released.
   */
  release_date: string;

  /**
   * The precision with which `release_date` value is known.
   */
  release_date_precision: 'year' | 'month' | 'day';

  /**
   * The number of tracks in the album.
   */
  total_tracks: number;

  /**
   * The object type.
   */
  type: 'album';

  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * album.
   */
  uri: string;

  /**
   * The playlist's public/private status (if it should be added to the user's
   * profile or not): `true` the playlist will be public, `false` the playlist will
   * be private, `null` the playlist status is not relevant. For more about
   * public/private status, see
   * [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  published?: boolean;

  /**
   * Included in the response when a content restriction is applied.
   */
  restrictions?: Shared.AlbumRestrictionObject;
}

export interface ArtistListRelatedArtistsResponse {
  artists: Array<Shared.ArtistObject>;
}

export interface ArtistTopTracksResponse {
  tracks: Array<Shared.TrackObject>;
}

export interface ArtistBulkRetrieveParams {
  /**
   * A comma-separated list of the
   * [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the artists.
   * Maximum: 50 IDs.
   */
  ids: string;
}

export interface ArtistListAlbumsParams {
  /**
   * A comma-separated list of keywords that will be used to filter the response. If
   * not supplied, all album types will be returned. <br/> Valid values are:<br/>-
   * `album`<br/>- `single`<br/>- `appears_on`<br/>- `compilation`<br/>For example:
   * `include_groups=album,single`.
   */
  include_groups?: string;

  /**
   * The maximum number of items to return. Default: 5. Minimum: 1. Maximum: 10.
   */
  limit?: number;

  /**
   * An
   * [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
   * If a country code is specified, only content that is available in that market
   * will be returned.<br/> If a valid user access token is specified in the request
   * header, the country associated with the user account will take priority over
   * this parameter.<br/> _**Note**: If neither market or user country are provided,
   * the content is considered unavailable for the client._<br/> Users can view the
   * country that is associated with their account in the
   * [account settings](https://www.spotify.com/account/overview/).
   */
  market?: string;

  /**
   * The index of the first item to return. Default: 0 (the first item). Use with
   * limit to get the next set of items.
   */
  offset?: number;
}

export interface ArtistTopTracksParams {
  /**
   * An
   * [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
   * If a country code is specified, only content that is available in that market
   * will be returned.<br/> If a valid user access token is specified in the request
   * header, the country associated with the user account will take priority over
   * this parameter.<br/> _**Note**: If neither market or user country are provided,
   * the content is considered unavailable for the client._<br/> Users can view the
   * country that is associated with their account in the
   * [account settings](https://www.spotify.com/account/overview/).
   */
  market?: string;
}

export declare namespace Artists {
  export {
    type ArtistBulkRetrieveResponse as ArtistBulkRetrieveResponse,
    type ArtistListAlbumsResponse as ArtistListAlbumsResponse,
    type ArtistListRelatedArtistsResponse as ArtistListRelatedArtistsResponse,
    type ArtistTopTracksResponse as ArtistTopTracksResponse,
    type ArtistListAlbumsResponsesCursorURLPage as ArtistListAlbumsResponsesCursorURLPage,
    type ArtistBulkRetrieveParams as ArtistBulkRetrieveParams,
    type ArtistListAlbumsParams as ArtistListAlbumsParams,
    type ArtistTopTracksParams as ArtistTopTracksParams,
  };
}

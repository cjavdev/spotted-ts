// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Search extends APIResource {
  /**
   * Get Spotify catalog information about albums, artists, playlists, tracks, shows,
   * episodes or audiobooks that match a keyword string. Audiobooks are only
   * available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
   */
  retrieve(query: SearchRetrieveParams, options?: RequestOptions): APIPromise<SearchRetrieveResponse> {
    return this._client.get('/search', { query, ...options });
  }
}

export interface SearchRetrieveResponse {
  albums?: SearchRetrieveResponse.Albums;

  artists?: SearchRetrieveResponse.Artists;

  audiobooks?: SearchRetrieveResponse.Audiobooks;

  episodes?: SearchRetrieveResponse.Episodes;

  playlists?: Shared.PagingPlaylistObject;

  shows?: SearchRetrieveResponse.Shows;

  tracks?: SearchRetrieveResponse.Tracks;
}

export namespace SearchRetrieveResponse {
  export interface Albums {
    /**
     * A link to the Web API endpoint returning the full result of the request
     */
    href: string;

    items: Array<Albums.Item>;

    /**
     * The maximum number of items in the response (as set in the query or by default).
     */
    limit: number;

    /**
     * URL to the next page of items. ( `null` if none)
     */
    next: string | null;

    /**
     * The offset of the items returned (as set in the query or by default)
     */
    offset: number;

    /**
     * URL to the previous page of items. ( `null` if none)
     */
    previous: string | null;

    /**
     * The total number of items available to return.
     */
    total: number;
  }

  export namespace Albums {
    export interface Item {
      /**
       * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
       * album.
       */
      id: string;

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
       * The markets in which the album is available:
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
       * Included in the response when a content restriction is applied.
       */
      restrictions?: Shared.AlbumRestrictionObject;
    }
  }

  export interface Artists {
    /**
     * A link to the Web API endpoint returning the full result of the request
     */
    href: string;

    items: Array<Shared.ArtistObject>;

    /**
     * The maximum number of items in the response (as set in the query or by default).
     */
    limit: number;

    /**
     * URL to the next page of items. ( `null` if none)
     */
    next: string | null;

    /**
     * The offset of the items returned (as set in the query or by default)
     */
    offset: number;

    /**
     * URL to the previous page of items. ( `null` if none)
     */
    previous: string | null;

    /**
     * The total number of items available to return.
     */
    total: number;
  }

  export interface Audiobooks {
    /**
     * A link to the Web API endpoint returning the full result of the request
     */
    href: string;

    items: Array<Audiobooks.Item>;

    /**
     * The maximum number of items in the response (as set in the query or by default).
     */
    limit: number;

    /**
     * URL to the next page of items. ( `null` if none)
     */
    next: string | null;

    /**
     * The offset of the items returned (as set in the query or by default)
     */
    offset: number;

    /**
     * URL to the previous page of items. ( `null` if none)
     */
    previous: string | null;

    /**
     * The total number of items available to return.
     */
    total: number;
  }

  export namespace Audiobooks {
    export interface Item {
      /**
       * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
       * audiobook.
       */
      id: string;

      /**
       * The author(s) for the audiobook.
       */
      authors: Array<Shared.AuthorObject>;

      /**
       * A list of the countries in which the audiobook can be played, identified by
       * their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
       * code.
       */
      available_markets: Array<string>;

      /**
       * The copyright statements of the audiobook.
       */
      copyrights: Array<Shared.CopyrightObject>;

      /**
       * A description of the audiobook. HTML tags are stripped away from this field, use
       * `html_description` field in case HTML tags are needed.
       */
      description: string;

      /**
       * Whether or not the audiobook has explicit content (true = yes it does; false =
       * no it does not OR unknown).
       */
      explicit: boolean;

      /**
       * External URLs for this audiobook.
       */
      external_urls: Shared.ExternalURLObject;

      /**
       * A link to the Web API endpoint providing full details of the audiobook.
       */
      href: string;

      /**
       * A description of the audiobook. This field may contain HTML tags.
       */
      html_description: string;

      /**
       * The cover art for the audiobook in various sizes, widest first.
       */
      images: Array<Shared.ImageObject>;

      /**
       * A list of the languages used in the audiobook, identified by their
       * [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.
       */
      languages: Array<string>;

      /**
       * The media type of the audiobook.
       */
      media_type: string;

      /**
       * The name of the audiobook.
       */
      name: string;

      /**
       * The narrator(s) for the audiobook.
       */
      narrators: Array<Shared.NarratorObject>;

      /**
       * The publisher of the audiobook.
       */
      publisher: string;

      /**
       * The number of chapters in this audiobook.
       */
      total_chapters: number;

      /**
       * The object type.
       */
      type: 'audiobook';

      /**
       * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
       * audiobook.
       */
      uri: string;

      /**
       * The edition of the audiobook.
       */
      edition?: string;
    }
  }

  export interface Episodes {
    /**
     * A link to the Web API endpoint returning the full result of the request
     */
    href: string;

    items: Array<Shared.SimplifiedEpisodeObject>;

    /**
     * The maximum number of items in the response (as set in the query or by default).
     */
    limit: number;

    /**
     * URL to the next page of items. ( `null` if none)
     */
    next: string | null;

    /**
     * The offset of the items returned (as set in the query or by default)
     */
    offset: number;

    /**
     * URL to the previous page of items. ( `null` if none)
     */
    previous: string | null;

    /**
     * The total number of items available to return.
     */
    total: number;
  }

  export interface Shows {
    /**
     * A link to the Web API endpoint returning the full result of the request
     */
    href: string;

    items: Array<Shows.Item>;

    /**
     * The maximum number of items in the response (as set in the query or by default).
     */
    limit: number;

    /**
     * URL to the next page of items. ( `null` if none)
     */
    next: string | null;

    /**
     * The offset of the items returned (as set in the query or by default)
     */
    offset: number;

    /**
     * URL to the previous page of items. ( `null` if none)
     */
    previous: string | null;

    /**
     * The total number of items available to return.
     */
    total: number;
  }

  export namespace Shows {
    export interface Item {
      /**
       * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the show.
       */
      id: string;

      /**
       * A list of the countries in which the show can be played, identified by their
       * [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.
       */
      available_markets: Array<string>;

      /**
       * The copyright statements of the show.
       */
      copyrights: Array<Shared.CopyrightObject>;

      /**
       * A description of the show. HTML tags are stripped away from this field, use
       * `html_description` field in case HTML tags are needed.
       */
      description: string;

      /**
       * Whether or not the show has explicit content (true = yes it does; false = no it
       * does not OR unknown).
       */
      explicit: boolean;

      /**
       * External URLs for this show.
       */
      external_urls: Shared.ExternalURLObject;

      /**
       * A link to the Web API endpoint providing full details of the show.
       */
      href: string;

      /**
       * A description of the show. This field may contain HTML tags.
       */
      html_description: string;

      /**
       * The cover art for the show in various sizes, widest first.
       */
      images: Array<Shared.ImageObject>;

      /**
       * True if all of the shows episodes are hosted outside of Spotify's CDN. This
       * field might be `null` in some cases.
       */
      is_externally_hosted: boolean;

      /**
       * A list of the languages used in the show, identified by their
       * [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.
       */
      languages: Array<string>;

      /**
       * The media type of the show.
       */
      media_type: string;

      /**
       * The name of the episode.
       */
      name: string;

      /**
       * The publisher of the show.
       */
      publisher: string;

      /**
       * The total number of episodes in the show.
       */
      total_episodes: number;

      /**
       * The object type.
       */
      type: 'show';

      /**
       * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
       * show.
       */
      uri: string;
    }
  }

  export interface Tracks {
    /**
     * A link to the Web API endpoint returning the full result of the request
     */
    href: string;

    items: Array<Shared.TrackObject>;

    /**
     * The maximum number of items in the response (as set in the query or by default).
     */
    limit: number;

    /**
     * URL to the next page of items. ( `null` if none)
     */
    next: string | null;

    /**
     * The offset of the items returned (as set in the query or by default)
     */
    offset: number;

    /**
     * URL to the previous page of items. ( `null` if none)
     */
    previous: string | null;

    /**
     * The total number of items available to return.
     */
    total: number;
  }
}

export interface SearchRetrieveParams {
  /**
   * Your search query.
   *
   * You can narrow down your search using field filters. The available filters are
   * `album`, `artist`, `track`, `year`, `upc`, `tag:hipster`, `tag:new`, `isrc`, and
   * `genre`. Each field filter only applies to certain result types.
   *
   * The `artist` and `year` filters can be used while searching albums, artists and
   * tracks. You can filter on a single `year` or a range (e.g. 1955-1960).<br /> The
   * `album` filter can be used while searching albums and tracks.<br /> The `genre`
   * filter can be used while searching artists and tracks.<br /> The `isrc` and
   * `track` filters can be used while searching tracks.<br /> The `upc`, `tag:new`
   * and `tag:hipster` filters can only be used while searching albums. The `tag:new`
   * filter will return albums released in the past two weeks and `tag:hipster` can
   * be used to return only albums with the lowest 10% popularity.<br />
   */
  q: string;

  /**
   * A comma-separated list of item types to search across. Search results include
   * hits from all the specified item types. For example: `q=abacab&type=album,track`
   * returns both albums and tracks matching "abacab".
   */
  type: Array<'album' | 'artist' | 'playlist' | 'track' | 'show' | 'episode' | 'audiobook'>;

  /**
   * If `include_external=audio` is specified it signals that the client can play
   * externally hosted audio content, and marks the content as playable in the
   * response. By default externally hosted audio content is marked as unplayable in
   * the response.
   */
  include_external?: 'audio';

  /**
   * The maximum number of results to return in each item type.
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
   * The index of the first result to return. Use with limit to get the next page of
   * search results.
   */
  offset?: number;
}

export declare namespace Search {
  export {
    type SearchRetrieveResponse as SearchRetrieveResponse,
    type SearchRetrieveParams as SearchRetrieveParams,
  };
}

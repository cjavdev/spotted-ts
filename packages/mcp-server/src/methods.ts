// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.albums.retrieve',
    fullyQualifiedName: 'albums.retrieve',
    httpMethod: 'get',
    httpPath: '/albums/{id}',
  },
  {
    clientCallName: 'client.albums.bulkRetrieve',
    fullyQualifiedName: 'albums.bulkRetrieve',
    httpMethod: 'get',
    httpPath: '/albums',
  },
  {
    clientCallName: 'client.albums.listTracks',
    fullyQualifiedName: 'albums.listTracks',
    httpMethod: 'get',
    httpPath: '/albums/{id}/tracks',
  },
  {
    clientCallName: 'client.artists.retrieve',
    fullyQualifiedName: 'artists.retrieve',
    httpMethod: 'get',
    httpPath: '/artists/{id}',
  },
  {
    clientCallName: 'client.artists.bulkRetrieve',
    fullyQualifiedName: 'artists.bulkRetrieve',
    httpMethod: 'get',
    httpPath: '/artists',
  },
  {
    clientCallName: 'client.artists.listAlbums',
    fullyQualifiedName: 'artists.listAlbums',
    httpMethod: 'get',
    httpPath: '/artists/{id}/albums',
  },
  {
    clientCallName: 'client.artists.listRelatedArtists',
    fullyQualifiedName: 'artists.listRelatedArtists',
    httpMethod: 'get',
    httpPath: '/artists/{id}/related-artists',
  },
  {
    clientCallName: 'client.artists.topTracks',
    fullyQualifiedName: 'artists.topTracks',
    httpMethod: 'get',
    httpPath: '/artists/{id}/top-tracks',
  },
  {
    clientCallName: 'client.shows.retrieve',
    fullyQualifiedName: 'shows.retrieve',
    httpMethod: 'get',
    httpPath: '/shows/{id}',
  },
  {
    clientCallName: 'client.shows.bulkRetrieve',
    fullyQualifiedName: 'shows.bulkRetrieve',
    httpMethod: 'get',
    httpPath: '/shows',
  },
  {
    clientCallName: 'client.shows.listEpisodes',
    fullyQualifiedName: 'shows.listEpisodes',
    httpMethod: 'get',
    httpPath: '/shows/{id}/episodes',
  },
  {
    clientCallName: 'client.episodes.retrieve',
    fullyQualifiedName: 'episodes.retrieve',
    httpMethod: 'get',
    httpPath: '/episodes/{id}',
  },
  {
    clientCallName: 'client.episodes.bulkRetrieve',
    fullyQualifiedName: 'episodes.bulkRetrieve',
    httpMethod: 'get',
    httpPath: '/episodes',
  },
  {
    clientCallName: 'client.audiobooks.retrieve',
    fullyQualifiedName: 'audiobooks.retrieve',
    httpMethod: 'get',
    httpPath: '/audiobooks/{id}',
  },
  {
    clientCallName: 'client.audiobooks.bulkRetrieve',
    fullyQualifiedName: 'audiobooks.bulkRetrieve',
    httpMethod: 'get',
    httpPath: '/audiobooks',
  },
  {
    clientCallName: 'client.audiobooks.listChapters',
    fullyQualifiedName: 'audiobooks.listChapters',
    httpMethod: 'get',
    httpPath: '/audiobooks/{id}/chapters',
  },
  {
    clientCallName: 'client.me.retrieve',
    fullyQualifiedName: 'me.retrieve',
    httpMethod: 'get',
    httpPath: '/me',
  },
  {
    clientCallName: 'client.me.audiobooks.list',
    fullyQualifiedName: 'me.audiobooks.list',
    httpMethod: 'get',
    httpPath: '/me/audiobooks',
  },
  {
    clientCallName: 'client.me.audiobooks.check',
    fullyQualifiedName: 'me.audiobooks.check',
    httpMethod: 'get',
    httpPath: '/me/audiobooks/contains',
  },
  {
    clientCallName: 'client.me.audiobooks.remove',
    fullyQualifiedName: 'me.audiobooks.remove',
    httpMethod: 'delete',
    httpPath: '/me/audiobooks',
  },
  {
    clientCallName: 'client.me.audiobooks.save',
    fullyQualifiedName: 'me.audiobooks.save',
    httpMethod: 'put',
    httpPath: '/me/audiobooks',
  },
  {
    clientCallName: 'client.me.playlists.list',
    fullyQualifiedName: 'me.playlists.list',
    httpMethod: 'get',
    httpPath: '/me/playlists',
  },
  {
    clientCallName: 'client.me.top.listTopArtists',
    fullyQualifiedName: 'me.top.listTopArtists',
    httpMethod: 'get',
    httpPath: '/me/top/artists',
  },
  {
    clientCallName: 'client.me.top.listTopTracks',
    fullyQualifiedName: 'me.top.listTopTracks',
    httpMethod: 'get',
    httpPath: '/me/top/tracks',
  },
  {
    clientCallName: 'client.me.albums.list',
    fullyQualifiedName: 'me.albums.list',
    httpMethod: 'get',
    httpPath: '/me/albums',
  },
  {
    clientCallName: 'client.me.albums.check',
    fullyQualifiedName: 'me.albums.check',
    httpMethod: 'get',
    httpPath: '/me/albums/contains',
  },
  {
    clientCallName: 'client.me.albums.remove',
    fullyQualifiedName: 'me.albums.remove',
    httpMethod: 'delete',
    httpPath: '/me/albums',
  },
  {
    clientCallName: 'client.me.albums.save',
    fullyQualifiedName: 'me.albums.save',
    httpMethod: 'put',
    httpPath: '/me/albums',
  },
  {
    clientCallName: 'client.me.tracks.list',
    fullyQualifiedName: 'me.tracks.list',
    httpMethod: 'get',
    httpPath: '/me/tracks',
  },
  {
    clientCallName: 'client.me.tracks.check',
    fullyQualifiedName: 'me.tracks.check',
    httpMethod: 'get',
    httpPath: '/me/tracks/contains',
  },
  {
    clientCallName: 'client.me.tracks.remove',
    fullyQualifiedName: 'me.tracks.remove',
    httpMethod: 'delete',
    httpPath: '/me/tracks',
  },
  {
    clientCallName: 'client.me.tracks.save',
    fullyQualifiedName: 'me.tracks.save',
    httpMethod: 'put',
    httpPath: '/me/tracks',
  },
  {
    clientCallName: 'client.me.episodes.list',
    fullyQualifiedName: 'me.episodes.list',
    httpMethod: 'get',
    httpPath: '/me/episodes',
  },
  {
    clientCallName: 'client.me.episodes.check',
    fullyQualifiedName: 'me.episodes.check',
    httpMethod: 'get',
    httpPath: '/me/episodes/contains',
  },
  {
    clientCallName: 'client.me.episodes.remove',
    fullyQualifiedName: 'me.episodes.remove',
    httpMethod: 'delete',
    httpPath: '/me/episodes',
  },
  {
    clientCallName: 'client.me.episodes.save',
    fullyQualifiedName: 'me.episodes.save',
    httpMethod: 'put',
    httpPath: '/me/episodes',
  },
  {
    clientCallName: 'client.me.shows.list',
    fullyQualifiedName: 'me.shows.list',
    httpMethod: 'get',
    httpPath: '/me/shows',
  },
  {
    clientCallName: 'client.me.shows.check',
    fullyQualifiedName: 'me.shows.check',
    httpMethod: 'get',
    httpPath: '/me/shows/contains',
  },
  {
    clientCallName: 'client.me.shows.remove',
    fullyQualifiedName: 'me.shows.remove',
    httpMethod: 'delete',
    httpPath: '/me/shows',
  },
  {
    clientCallName: 'client.me.shows.save',
    fullyQualifiedName: 'me.shows.save',
    httpMethod: 'put',
    httpPath: '/me/shows',
  },
  {
    clientCallName: 'client.me.following.bulkRetrieve',
    fullyQualifiedName: 'me.following.bulkRetrieve',
    httpMethod: 'get',
    httpPath: '/me/following',
  },
  {
    clientCallName: 'client.me.following.check',
    fullyQualifiedName: 'me.following.check',
    httpMethod: 'get',
    httpPath: '/me/following/contains',
  },
  {
    clientCallName: 'client.me.following.follow',
    fullyQualifiedName: 'me.following.follow',
    httpMethod: 'put',
    httpPath: '/me/following',
  },
  {
    clientCallName: 'client.me.following.unfollow',
    fullyQualifiedName: 'me.following.unfollow',
    httpMethod: 'delete',
    httpPath: '/me/following',
  },
  {
    clientCallName: 'client.me.player.getCurrentlyPlaying',
    fullyQualifiedName: 'me.player.getCurrentlyPlaying',
    httpMethod: 'get',
    httpPath: '/me/player/currently-playing',
  },
  {
    clientCallName: 'client.me.player.getDevices',
    fullyQualifiedName: 'me.player.getDevices',
    httpMethod: 'get',
    httpPath: '/me/player/devices',
  },
  {
    clientCallName: 'client.me.player.getState',
    fullyQualifiedName: 'me.player.getState',
    httpMethod: 'get',
    httpPath: '/me/player',
  },
  {
    clientCallName: 'client.me.player.listRecentlyPlayed',
    fullyQualifiedName: 'me.player.listRecentlyPlayed',
    httpMethod: 'get',
    httpPath: '/me/player/recently-played',
  },
  {
    clientCallName: 'client.me.player.pausePlayback',
    fullyQualifiedName: 'me.player.pausePlayback',
    httpMethod: 'put',
    httpPath: '/me/player/pause',
  },
  {
    clientCallName: 'client.me.player.seekToPosition',
    fullyQualifiedName: 'me.player.seekToPosition',
    httpMethod: 'put',
    httpPath: '/me/player/seek',
  },
  {
    clientCallName: 'client.me.player.setRepeatMode',
    fullyQualifiedName: 'me.player.setRepeatMode',
    httpMethod: 'put',
    httpPath: '/me/player/repeat',
  },
  {
    clientCallName: 'client.me.player.setVolume',
    fullyQualifiedName: 'me.player.setVolume',
    httpMethod: 'put',
    httpPath: '/me/player/volume',
  },
  {
    clientCallName: 'client.me.player.skipNext',
    fullyQualifiedName: 'me.player.skipNext',
    httpMethod: 'post',
    httpPath: '/me/player/next',
  },
  {
    clientCallName: 'client.me.player.skipPrevious',
    fullyQualifiedName: 'me.player.skipPrevious',
    httpMethod: 'post',
    httpPath: '/me/player/previous',
  },
  {
    clientCallName: 'client.me.player.startPlayback',
    fullyQualifiedName: 'me.player.startPlayback',
    httpMethod: 'put',
    httpPath: '/me/player/play',
  },
  {
    clientCallName: 'client.me.player.toggleShuffle',
    fullyQualifiedName: 'me.player.toggleShuffle',
    httpMethod: 'put',
    httpPath: '/me/player/shuffle',
  },
  {
    clientCallName: 'client.me.player.transfer',
    fullyQualifiedName: 'me.player.transfer',
    httpMethod: 'put',
    httpPath: '/me/player',
  },
  {
    clientCallName: 'client.me.player.queue.add',
    fullyQualifiedName: 'me.player.queue.add',
    httpMethod: 'post',
    httpPath: '/me/player/queue',
  },
  {
    clientCallName: 'client.me.player.queue.get',
    fullyQualifiedName: 'me.player.queue.get',
    httpMethod: 'get',
    httpPath: '/me/player/queue',
  },
  {
    clientCallName: 'client.chapters.retrieve',
    fullyQualifiedName: 'chapters.retrieve',
    httpMethod: 'get',
    httpPath: '/chapters/{id}',
  },
  {
    clientCallName: 'client.chapters.bulkRetrieve',
    fullyQualifiedName: 'chapters.bulkRetrieve',
    httpMethod: 'get',
    httpPath: '/chapters',
  },
  {
    clientCallName: 'client.tracks.retrieve',
    fullyQualifiedName: 'tracks.retrieve',
    httpMethod: 'get',
    httpPath: '/tracks/{id}',
  },
  {
    clientCallName: 'client.tracks.bulkRetrieve',
    fullyQualifiedName: 'tracks.bulkRetrieve',
    httpMethod: 'get',
    httpPath: '/tracks',
  },
  {
    clientCallName: 'client.search.query',
    fullyQualifiedName: 'search.query',
    httpMethod: 'get',
    httpPath: '/search',
  },
  {
    clientCallName: 'client.playlists.retrieve',
    fullyQualifiedName: 'playlists.retrieve',
    httpMethod: 'get',
    httpPath: '/playlists/{playlist_id}',
  },
  {
    clientCallName: 'client.playlists.update',
    fullyQualifiedName: 'playlists.update',
    httpMethod: 'put',
    httpPath: '/playlists/{playlist_id}',
  },
  {
    clientCallName: 'client.playlists.tracks.update',
    fullyQualifiedName: 'playlists.tracks.update',
    httpMethod: 'put',
    httpPath: '/playlists/{playlist_id}/tracks',
  },
  {
    clientCallName: 'client.playlists.tracks.list',
    fullyQualifiedName: 'playlists.tracks.list',
    httpMethod: 'get',
    httpPath: '/playlists/{playlist_id}/tracks',
  },
  {
    clientCallName: 'client.playlists.tracks.add',
    fullyQualifiedName: 'playlists.tracks.add',
    httpMethod: 'post',
    httpPath: '/playlists/{playlist_id}/tracks',
  },
  {
    clientCallName: 'client.playlists.tracks.remove',
    fullyQualifiedName: 'playlists.tracks.remove',
    httpMethod: 'delete',
    httpPath: '/playlists/{playlist_id}/tracks',
  },
  {
    clientCallName: 'client.playlists.followers.check',
    fullyQualifiedName: 'playlists.followers.check',
    httpMethod: 'get',
    httpPath: '/playlists/{playlist_id}/followers/contains',
  },
  {
    clientCallName: 'client.playlists.followers.follow',
    fullyQualifiedName: 'playlists.followers.follow',
    httpMethod: 'put',
    httpPath: '/playlists/{playlist_id}/followers',
  },
  {
    clientCallName: 'client.playlists.followers.unfollow',
    fullyQualifiedName: 'playlists.followers.unfollow',
    httpMethod: 'delete',
    httpPath: '/playlists/{playlist_id}/followers',
  },
  {
    clientCallName: 'client.playlists.images.update',
    fullyQualifiedName: 'playlists.images.update',
    httpMethod: 'put',
    httpPath: '/playlists/{playlist_id}/images',
  },
  {
    clientCallName: 'client.playlists.images.list',
    fullyQualifiedName: 'playlists.images.list',
    httpMethod: 'get',
    httpPath: '/playlists/{playlist_id}/images',
  },
  {
    clientCallName: 'client.users.retrieveProfile',
    fullyQualifiedName: 'users.retrieveProfile',
    httpMethod: 'get',
    httpPath: '/users/{user_id}',
  },
  {
    clientCallName: 'client.users.playlists.create',
    fullyQualifiedName: 'users.playlists.create',
    httpMethod: 'post',
    httpPath: '/users/{user_id}/playlists',
  },
  {
    clientCallName: 'client.users.playlists.list',
    fullyQualifiedName: 'users.playlists.list',
    httpMethod: 'get',
    httpPath: '/users/{user_id}/playlists',
  },
  {
    clientCallName: 'client.browse.getFeaturedPlaylists',
    fullyQualifiedName: 'browse.getFeaturedPlaylists',
    httpMethod: 'get',
    httpPath: '/browse/featured-playlists',
  },
  {
    clientCallName: 'client.browse.getNewReleases',
    fullyQualifiedName: 'browse.getNewReleases',
    httpMethod: 'get',
    httpPath: '/browse/new-releases',
  },
  {
    clientCallName: 'client.browse.categories.retrieve',
    fullyQualifiedName: 'browse.categories.retrieve',
    httpMethod: 'get',
    httpPath: '/browse/categories/{category_id}',
  },
  {
    clientCallName: 'client.browse.categories.list',
    fullyQualifiedName: 'browse.categories.list',
    httpMethod: 'get',
    httpPath: '/browse/categories',
  },
  {
    clientCallName: 'client.browse.categories.getPlaylists',
    fullyQualifiedName: 'browse.categories.getPlaylists',
    httpMethod: 'get',
    httpPath: '/browse/categories/{category_id}/playlists',
  },
  {
    clientCallName: 'client.audioFeatures.retrieve',
    fullyQualifiedName: 'audioFeatures.retrieve',
    httpMethod: 'get',
    httpPath: '/audio-features/{id}',
  },
  {
    clientCallName: 'client.audioFeatures.bulkRetrieve',
    fullyQualifiedName: 'audioFeatures.bulkRetrieve',
    httpMethod: 'get',
    httpPath: '/audio-features',
  },
  {
    clientCallName: 'client.audioAnalysis.retrieve',
    fullyQualifiedName: 'audioAnalysis.retrieve',
    httpMethod: 'get',
    httpPath: '/audio-analysis/{id}',
  },
  {
    clientCallName: 'client.recommendations.get',
    fullyQualifiedName: 'recommendations.get',
    httpMethod: 'get',
    httpPath: '/recommendations',
  },
  {
    clientCallName: 'client.recommendations.listAvailableGenreSeeds',
    fullyQualifiedName: 'recommendations.listAvailableGenreSeeds',
    httpMethod: 'get',
    httpPath: '/recommendations/available-genre-seeds',
  },
  {
    clientCallName: 'client.markets.list',
    fullyQualifiedName: 'markets.list',
    httpMethod: 'get',
    httpPath: '/markets',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import retrieve_albums from './albums/retrieve-albums';
import bulk_retrieve_albums from './albums/bulk-retrieve-albums';
import list_tracks_albums from './albums/list-tracks-albums';
import retrieve_artists from './artists/retrieve-artists';
import bulk_retrieve_artists from './artists/bulk-retrieve-artists';
import list_albums_artists from './artists/list-albums-artists';
import list_related_artists_artists from './artists/list-related-artists-artists';
import top_tracks_artists from './artists/top-tracks-artists';
import retrieve_shows from './shows/retrieve-shows';
import bulk_retrieve_shows from './shows/bulk-retrieve-shows';
import list_episodes_shows from './shows/list-episodes-shows';
import retrieve_episodes from './episodes/retrieve-episodes';
import bulk_retrieve_episodes from './episodes/bulk-retrieve-episodes';
import retrieve_audiobooks from './audiobooks/retrieve-audiobooks';
import bulk_retrieve_audiobooks from './audiobooks/bulk-retrieve-audiobooks';
import list_chapters_audiobooks from './audiobooks/list-chapters-audiobooks';
import retrieve_me from './me/retrieve-me';
import list_me_audiobooks from './me/audiobooks/list-me-audiobooks';
import check_me_audiobooks from './me/audiobooks/check-me-audiobooks';
import remove_me_audiobooks from './me/audiobooks/remove-me-audiobooks';
import save_me_audiobooks from './me/audiobooks/save-me-audiobooks';
import list_me_playlists from './me/playlists/list-me-playlists';
import list_top_artists_me_top from './me/top/list-top-artists-me-top';
import list_top_tracks_me_top from './me/top/list-top-tracks-me-top';
import list_me_albums from './me/albums/list-me-albums';
import check_me_albums from './me/albums/check-me-albums';
import remove_me_albums from './me/albums/remove-me-albums';
import save_me_albums from './me/albums/save-me-albums';
import list_me_tracks from './me/tracks/list-me-tracks';
import check_me_tracks from './me/tracks/check-me-tracks';
import remove_me_tracks from './me/tracks/remove-me-tracks';
import save_me_tracks from './me/tracks/save-me-tracks';
import list_me_episodes from './me/episodes/list-me-episodes';
import check_me_episodes from './me/episodes/check-me-episodes';
import remove_me_episodes from './me/episodes/remove-me-episodes';
import save_me_episodes from './me/episodes/save-me-episodes';
import list_me_shows from './me/shows/list-me-shows';
import check_me_shows from './me/shows/check-me-shows';
import remove_me_shows from './me/shows/remove-me-shows';
import save_me_shows from './me/shows/save-me-shows';
import bulk_retrieve_me_following from './me/following/bulk-retrieve-me-following';
import check_me_following from './me/following/check-me-following';
import follow_me_following from './me/following/follow-me-following';
import unfollow_me_following from './me/following/unfollow-me-following';
import get_currently_playing_me_player from './me/player/get-currently-playing-me-player';
import get_devices_me_player from './me/player/get-devices-me-player';
import get_state_me_player from './me/player/get-state-me-player';
import list_recently_played_me_player from './me/player/list-recently-played-me-player';
import pause_playback_me_player from './me/player/pause-playback-me-player';
import seek_to_position_me_player from './me/player/seek-to-position-me-player';
import set_repeat_mode_me_player from './me/player/set-repeat-mode-me-player';
import set_volume_me_player from './me/player/set-volume-me-player';
import skip_next_me_player from './me/player/skip-next-me-player';
import skip_previous_me_player from './me/player/skip-previous-me-player';
import start_playback_me_player from './me/player/start-playback-me-player';
import toggle_shuffle_me_player from './me/player/toggle-shuffle-me-player';
import transfer_me_player from './me/player/transfer-me-player';
import add_player_me_queue from './me/player/queue/add-player-me-queue';
import get_player_me_queue from './me/player/queue/get-player-me-queue';
import retrieve_chapters from './chapters/retrieve-chapters';
import bulk_retrieve_chapters from './chapters/bulk-retrieve-chapters';
import retrieve_tracks from './tracks/retrieve-tracks';
import bulk_retrieve_tracks from './tracks/bulk-retrieve-tracks';
import search_search from './search/search-search';
import retrieve_playlists from './playlists/retrieve-playlists';
import update_playlists from './playlists/update-playlists';
import update_playlists_tracks from './playlists/tracks/update-playlists-tracks';
import list_playlists_tracks from './playlists/tracks/list-playlists-tracks';
import add_playlists_tracks from './playlists/tracks/add-playlists-tracks';
import remove_playlists_tracks from './playlists/tracks/remove-playlists-tracks';
import check_playlists_followers from './playlists/followers/check-playlists-followers';
import follow_playlists_followers from './playlists/followers/follow-playlists-followers';
import unfollow_playlists_followers from './playlists/followers/unfollow-playlists-followers';
import update_playlists_images from './playlists/images/update-playlists-images';
import list_playlists_images from './playlists/images/list-playlists-images';
import retrieve_profile_users from './users/retrieve-profile-users';
import create_users_playlists from './users/playlists/create-users-playlists';
import list_users_playlists from './users/playlists/list-users-playlists';
import get_featured_playlists_browse from './browse/get-featured-playlists-browse';
import get_new_releases_browse from './browse/get-new-releases-browse';
import retrieve_browse_categories from './browse/categories/retrieve-browse-categories';
import list_browse_categories from './browse/categories/list-browse-categories';
import get_playlists_browse_categories from './browse/categories/get-playlists-browse-categories';
import retrieve_audio_features from './audio-features/retrieve-audio-features';
import bulk_retrieve_audio_features from './audio-features/bulk-retrieve-audio-features';
import retrieve_audio_analysis from './audio-analysis/retrieve-audio-analysis';
import get_recommendations from './recommendations/get-recommendations';
import list_available_genre_seeds_recommendations from './recommendations/list-available-genre-seeds-recommendations';
import list_markets from './markets/list-markets';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(retrieve_albums);
addEndpoint(bulk_retrieve_albums);
addEndpoint(list_tracks_albums);
addEndpoint(retrieve_artists);
addEndpoint(bulk_retrieve_artists);
addEndpoint(list_albums_artists);
addEndpoint(list_related_artists_artists);
addEndpoint(top_tracks_artists);
addEndpoint(retrieve_shows);
addEndpoint(bulk_retrieve_shows);
addEndpoint(list_episodes_shows);
addEndpoint(retrieve_episodes);
addEndpoint(bulk_retrieve_episodes);
addEndpoint(retrieve_audiobooks);
addEndpoint(bulk_retrieve_audiobooks);
addEndpoint(list_chapters_audiobooks);
addEndpoint(retrieve_me);
addEndpoint(list_me_audiobooks);
addEndpoint(check_me_audiobooks);
addEndpoint(remove_me_audiobooks);
addEndpoint(save_me_audiobooks);
addEndpoint(list_me_playlists);
addEndpoint(list_top_artists_me_top);
addEndpoint(list_top_tracks_me_top);
addEndpoint(list_me_albums);
addEndpoint(check_me_albums);
addEndpoint(remove_me_albums);
addEndpoint(save_me_albums);
addEndpoint(list_me_tracks);
addEndpoint(check_me_tracks);
addEndpoint(remove_me_tracks);
addEndpoint(save_me_tracks);
addEndpoint(list_me_episodes);
addEndpoint(check_me_episodes);
addEndpoint(remove_me_episodes);
addEndpoint(save_me_episodes);
addEndpoint(list_me_shows);
addEndpoint(check_me_shows);
addEndpoint(remove_me_shows);
addEndpoint(save_me_shows);
addEndpoint(bulk_retrieve_me_following);
addEndpoint(check_me_following);
addEndpoint(follow_me_following);
addEndpoint(unfollow_me_following);
addEndpoint(get_currently_playing_me_player);
addEndpoint(get_devices_me_player);
addEndpoint(get_state_me_player);
addEndpoint(list_recently_played_me_player);
addEndpoint(pause_playback_me_player);
addEndpoint(seek_to_position_me_player);
addEndpoint(set_repeat_mode_me_player);
addEndpoint(set_volume_me_player);
addEndpoint(skip_next_me_player);
addEndpoint(skip_previous_me_player);
addEndpoint(start_playback_me_player);
addEndpoint(toggle_shuffle_me_player);
addEndpoint(transfer_me_player);
addEndpoint(add_player_me_queue);
addEndpoint(get_player_me_queue);
addEndpoint(retrieve_chapters);
addEndpoint(bulk_retrieve_chapters);
addEndpoint(retrieve_tracks);
addEndpoint(bulk_retrieve_tracks);
addEndpoint(search_search);
addEndpoint(retrieve_playlists);
addEndpoint(update_playlists);
addEndpoint(update_playlists_tracks);
addEndpoint(list_playlists_tracks);
addEndpoint(add_playlists_tracks);
addEndpoint(remove_playlists_tracks);
addEndpoint(check_playlists_followers);
addEndpoint(follow_playlists_followers);
addEndpoint(unfollow_playlists_followers);
addEndpoint(update_playlists_images);
addEndpoint(list_playlists_images);
addEndpoint(retrieve_profile_users);
addEndpoint(create_users_playlists);
addEndpoint(list_users_playlists);
addEndpoint(get_featured_playlists_browse);
addEndpoint(get_new_releases_browse);
addEndpoint(retrieve_browse_categories);
addEndpoint(list_browse_categories);
addEndpoint(get_playlists_browse_categories);
addEndpoint(retrieve_audio_features);
addEndpoint(bulk_retrieve_audio_features);
addEndpoint(retrieve_audio_analysis);
addEndpoint(get_recommendations);
addEndpoint(list_available_genre_seeds_recommendations);
addEndpoint(list_markets);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}

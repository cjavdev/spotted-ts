# Shared

Types:

- <code><a href="./src/resources/shared.ts">AlbumRestrictionObject</a></code>
- <code><a href="./src/resources/shared.ts">ArtistObject</a></code>
- <code><a href="./src/resources/shared.ts">AudiobookBase</a></code>
- <code><a href="./src/resources/shared.ts">AuthorObject</a></code>
- <code><a href="./src/resources/shared.ts">ChapterRestrictionObject</a></code>
- <code><a href="./src/resources/shared.ts">CopyrightObject</a></code>
- <code><a href="./src/resources/shared.ts">EpisodeObject</a></code>
- <code><a href="./src/resources/shared.ts">EpisodeRestrictionObject</a></code>
- <code><a href="./src/resources/shared.ts">ExternalIDObject</a></code>
- <code><a href="./src/resources/shared.ts">ExternalURLObject</a></code>
- <code><a href="./src/resources/shared.ts">FollowersObject</a></code>
- <code><a href="./src/resources/shared.ts">ImageObject</a></code>
- <code><a href="./src/resources/shared.ts">LinkedTrackObject</a></code>
- <code><a href="./src/resources/shared.ts">NarratorObject</a></code>
- <code><a href="./src/resources/shared.ts">PagingPlaylistObject</a></code>
- <code><a href="./src/resources/shared.ts">PlaylistTrackObject</a></code>
- <code><a href="./src/resources/shared.ts">PlaylistTracksRefObject</a></code>
- <code><a href="./src/resources/shared.ts">PlaylistUserObject</a></code>
- <code><a href="./src/resources/shared.ts">ResumePointObject</a></code>
- <code><a href="./src/resources/shared.ts">ShowBase</a></code>
- <code><a href="./src/resources/shared.ts">SimplifiedArtistObject</a></code>
- <code><a href="./src/resources/shared.ts">SimplifiedEpisodeObject</a></code>
- <code><a href="./src/resources/shared.ts">SimplifiedPlaylistObject</a></code>
- <code><a href="./src/resources/shared.ts">SimplifiedTrackObject</a></code>
- <code><a href="./src/resources/shared.ts">TrackObject</a></code>
- <code><a href="./src/resources/shared.ts">TrackRestrictionObject</a></code>

# Albums

Types:

- <code><a href="./src/resources/albums.ts">AlbumRetrieveResponse</a></code>
- <code><a href="./src/resources/albums.ts">AlbumBulkRetrieveResponse</a></code>

Methods:

- <code title="get /albums/{id}">client.albums.<a href="./src/resources/albums.ts">retrieve</a>(id, { ...params }) -> AlbumRetrieveResponse</code>
- <code title="get /albums">client.albums.<a href="./src/resources/albums.ts">bulkRetrieve</a>({ ...params }) -> AlbumBulkRetrieveResponse</code>
- <code title="get /albums/{id}/tracks">client.albums.<a href="./src/resources/albums.ts">listTracks</a>(id, { ...params }) -> SimplifiedTrackObjectsCursorURLPage</code>

# Artists

Types:

- <code><a href="./src/resources/artists.ts">ArtistBulkRetrieveResponse</a></code>
- <code><a href="./src/resources/artists.ts">ArtistListAlbumsResponse</a></code>
- <code><a href="./src/resources/artists.ts">ArtistListRelatedArtistsResponse</a></code>
- <code><a href="./src/resources/artists.ts">ArtistTopTracksResponse</a></code>

Methods:

- <code title="get /artists/{id}">client.artists.<a href="./src/resources/artists.ts">retrieve</a>(id) -> ArtistObject</code>
- <code title="get /artists">client.artists.<a href="./src/resources/artists.ts">bulkRetrieve</a>({ ...params }) -> ArtistBulkRetrieveResponse</code>
- <code title="get /artists/{id}/albums">client.artists.<a href="./src/resources/artists.ts">listAlbums</a>(id, { ...params }) -> ArtistListAlbumsResponsesCursorURLPage</code>
- <code title="get /artists/{id}/related-artists">client.artists.<a href="./src/resources/artists.ts">listRelatedArtists</a>(id) -> ArtistListRelatedArtistsResponse</code>
- <code title="get /artists/{id}/top-tracks">client.artists.<a href="./src/resources/artists.ts">topTracks</a>(id, { ...params }) -> ArtistTopTracksResponse</code>

# Shows

Types:

- <code><a href="./src/resources/shows.ts">ShowRetrieveResponse</a></code>
- <code><a href="./src/resources/shows.ts">ShowBulkRetrieveResponse</a></code>

Methods:

- <code title="get /shows/{id}">client.shows.<a href="./src/resources/shows.ts">retrieve</a>(id, { ...params }) -> ShowRetrieveResponse</code>
- <code title="get /shows">client.shows.<a href="./src/resources/shows.ts">bulkRetrieve</a>({ ...params }) -> ShowBulkRetrieveResponse</code>
- <code title="get /shows/{id}/episodes">client.shows.<a href="./src/resources/shows.ts">listEpisodes</a>(id, { ...params }) -> SimplifiedEpisodeObjectsCursorURLPage</code>

# Episodes

Types:

- <code><a href="./src/resources/episodes.ts">EpisodeBulkRetrieveResponse</a></code>

Methods:

- <code title="get /episodes/{id}">client.episodes.<a href="./src/resources/episodes.ts">retrieve</a>(id, { ...params }) -> EpisodeObject</code>
- <code title="get /episodes">client.episodes.<a href="./src/resources/episodes.ts">bulkRetrieve</a>({ ...params }) -> EpisodeBulkRetrieveResponse</code>

# Audiobooks

Types:

- <code><a href="./src/resources/audiobooks.ts">SimplifiedChapterObject</a></code>
- <code><a href="./src/resources/audiobooks.ts">AudiobookRetrieveResponse</a></code>
- <code><a href="./src/resources/audiobooks.ts">AudiobookBulkRetrieveResponse</a></code>

Methods:

- <code title="get /audiobooks/{id}">client.audiobooks.<a href="./src/resources/audiobooks.ts">retrieve</a>(id, { ...params }) -> AudiobookRetrieveResponse</code>
- <code title="get /audiobooks">client.audiobooks.<a href="./src/resources/audiobooks.ts">bulkRetrieve</a>({ ...params }) -> AudiobookBulkRetrieveResponse</code>
- <code title="get /audiobooks/{id}/chapters">client.audiobooks.<a href="./src/resources/audiobooks.ts">listChapters</a>(id, { ...params }) -> SimplifiedChapterObjectsCursorURLPage</code>

# Me

Types:

- <code><a href="./src/resources/me/me.ts">MeRetrieveResponse</a></code>

Methods:

- <code title="get /me">client.me.<a href="./src/resources/me/me.ts">retrieve</a>() -> MeRetrieveResponse</code>

## Audiobooks

Types:

- <code><a href="./src/resources/me/audiobooks.ts">AudiobookListResponse</a></code>
- <code><a href="./src/resources/me/audiobooks.ts">AudiobookCheckResponse</a></code>

Methods:

- <code title="get /me/audiobooks">client.me.audiobooks.<a href="./src/resources/me/audiobooks.ts">list</a>({ ...params }) -> AudiobookListResponsesCursorURLPage</code>
- <code title="get /me/audiobooks/contains">client.me.audiobooks.<a href="./src/resources/me/audiobooks.ts">check</a>({ ...params }) -> AudiobookCheckResponse</code>
- <code title="delete /me/audiobooks">client.me.audiobooks.<a href="./src/resources/me/audiobooks.ts">remove</a>({ ...params }) -> void</code>
- <code title="put /me/audiobooks">client.me.audiobooks.<a href="./src/resources/me/audiobooks.ts">save</a>({ ...params }) -> void</code>

## Playlists

Methods:

- <code title="get /me/playlists">client.me.playlists.<a href="./src/resources/me/playlists.ts">list</a>({ ...params }) -> SimplifiedPlaylistObjectsCursorURLPage</code>

## Top

Methods:

- <code title="get /me/top/artists">client.me.top.<a href="./src/resources/me/top.ts">listTopArtists</a>({ ...params }) -> ArtistObjectsCursorURLPage</code>
- <code title="get /me/top/tracks">client.me.top.<a href="./src/resources/me/top.ts">listTopTracks</a>({ ...params }) -> TrackObjectsCursorURLPage</code>

## Albums

Types:

- <code><a href="./src/resources/me/albums.ts">AlbumListResponse</a></code>
- <code><a href="./src/resources/me/albums.ts">AlbumCheckResponse</a></code>

Methods:

- <code title="get /me/albums">client.me.albums.<a href="./src/resources/me/albums.ts">list</a>({ ...params }) -> AlbumListResponsesCursorURLPage</code>
- <code title="get /me/albums/contains">client.me.albums.<a href="./src/resources/me/albums.ts">check</a>({ ...params }) -> AlbumCheckResponse</code>
- <code title="delete /me/albums">client.me.albums.<a href="./src/resources/me/albums.ts">remove</a>({ ...params }) -> void</code>
- <code title="put /me/albums">client.me.albums.<a href="./src/resources/me/albums.ts">save</a>({ ...params }) -> void</code>

## Tracks

Types:

- <code><a href="./src/resources/me/tracks.ts">TrackListResponse</a></code>
- <code><a href="./src/resources/me/tracks.ts">TrackCheckResponse</a></code>

Methods:

- <code title="get /me/tracks">client.me.tracks.<a href="./src/resources/me/tracks.ts">list</a>({ ...params }) -> TrackListResponsesCursorURLPage</code>
- <code title="get /me/tracks/contains">client.me.tracks.<a href="./src/resources/me/tracks.ts">check</a>({ ...params }) -> TrackCheckResponse</code>
- <code title="delete /me/tracks">client.me.tracks.<a href="./src/resources/me/tracks.ts">remove</a>({ ...params }) -> void</code>
- <code title="put /me/tracks">client.me.tracks.<a href="./src/resources/me/tracks.ts">save</a>({ ...params }) -> void</code>

## Episodes

Types:

- <code><a href="./src/resources/me/episodes.ts">EpisodeListResponse</a></code>
- <code><a href="./src/resources/me/episodes.ts">EpisodeCheckResponse</a></code>

Methods:

- <code title="get /me/episodes">client.me.episodes.<a href="./src/resources/me/episodes.ts">list</a>({ ...params }) -> EpisodeListResponsesCursorURLPage</code>
- <code title="get /me/episodes/contains">client.me.episodes.<a href="./src/resources/me/episodes.ts">check</a>({ ...params }) -> EpisodeCheckResponse</code>
- <code title="delete /me/episodes">client.me.episodes.<a href="./src/resources/me/episodes.ts">remove</a>({ ...params }) -> void</code>
- <code title="put /me/episodes">client.me.episodes.<a href="./src/resources/me/episodes.ts">save</a>({ ...params }) -> void</code>

## Shows

Types:

- <code><a href="./src/resources/me/shows.ts">ShowListResponse</a></code>
- <code><a href="./src/resources/me/shows.ts">ShowCheckResponse</a></code>

Methods:

- <code title="get /me/shows">client.me.shows.<a href="./src/resources/me/shows.ts">list</a>({ ...params }) -> ShowListResponsesCursorURLPage</code>
- <code title="get /me/shows/contains">client.me.shows.<a href="./src/resources/me/shows.ts">check</a>({ ...params }) -> ShowCheckResponse</code>
- <code title="delete /me/shows">client.me.shows.<a href="./src/resources/me/shows.ts">remove</a>({ ...params }) -> void</code>
- <code title="put /me/shows">client.me.shows.<a href="./src/resources/me/shows.ts">save</a>({ ...params }) -> void</code>

## Following

Types:

- <code><a href="./src/resources/me/following.ts">FollowingBulkRetrieveResponse</a></code>
- <code><a href="./src/resources/me/following.ts">FollowingCheckResponse</a></code>

Methods:

- <code title="get /me/following">client.me.following.<a href="./src/resources/me/following.ts">bulkRetrieve</a>({ ...params }) -> FollowingBulkRetrieveResponse</code>
- <code title="get /me/following/contains">client.me.following.<a href="./src/resources/me/following.ts">check</a>({ ...params }) -> FollowingCheckResponse</code>
- <code title="put /me/following">client.me.following.<a href="./src/resources/me/following.ts">follow</a>({ ...params }) -> void</code>
- <code title="delete /me/following">client.me.following.<a href="./src/resources/me/following.ts">unfollow</a>({ ...params }) -> void</code>

## Player

Types:

- <code><a href="./src/resources/me/player/player.ts">ContextObject</a></code>
- <code><a href="./src/resources/me/player/player.ts">DeviceObject</a></code>
- <code><a href="./src/resources/me/player/player.ts">PlayerGetCurrentlyPlayingResponse</a></code>
- <code><a href="./src/resources/me/player/player.ts">PlayerGetDevicesResponse</a></code>
- <code><a href="./src/resources/me/player/player.ts">PlayerGetStateResponse</a></code>
- <code><a href="./src/resources/me/player/player.ts">PlayerListRecentlyPlayedResponse</a></code>

Methods:

- <code title="get /me/player/currently-playing">client.me.player.<a href="./src/resources/me/player/player.ts">getCurrentlyPlaying</a>({ ...params }) -> PlayerGetCurrentlyPlayingResponse</code>
- <code title="get /me/player/devices">client.me.player.<a href="./src/resources/me/player/player.ts">getDevices</a>() -> PlayerGetDevicesResponse</code>
- <code title="get /me/player">client.me.player.<a href="./src/resources/me/player/player.ts">getState</a>({ ...params }) -> PlayerGetStateResponse</code>
- <code title="get /me/player/recently-played">client.me.player.<a href="./src/resources/me/player/player.ts">listRecentlyPlayed</a>({ ...params }) -> PlayerListRecentlyPlayedResponsesCursorURLPage</code>
- <code title="put /me/player/pause">client.me.player.<a href="./src/resources/me/player/player.ts">pausePlayback</a>({ ...params }) -> void</code>
- <code title="put /me/player/seek">client.me.player.<a href="./src/resources/me/player/player.ts">seekToPosition</a>({ ...params }) -> void</code>
- <code title="put /me/player/repeat">client.me.player.<a href="./src/resources/me/player/player.ts">setRepeatMode</a>({ ...params }) -> void</code>
- <code title="put /me/player/volume">client.me.player.<a href="./src/resources/me/player/player.ts">setVolume</a>({ ...params }) -> void</code>
- <code title="post /me/player/next">client.me.player.<a href="./src/resources/me/player/player.ts">skipNext</a>({ ...params }) -> void</code>
- <code title="post /me/player/previous">client.me.player.<a href="./src/resources/me/player/player.ts">skipPrevious</a>({ ...params }) -> void</code>
- <code title="put /me/player/play">client.me.player.<a href="./src/resources/me/player/player.ts">startPlayback</a>({ ...params }) -> void</code>
- <code title="put /me/player/shuffle">client.me.player.<a href="./src/resources/me/player/player.ts">toggleShuffle</a>({ ...params }) -> void</code>
- <code title="put /me/player">client.me.player.<a href="./src/resources/me/player/player.ts">transfer</a>({ ...params }) -> void</code>

### Queue

Types:

- <code><a href="./src/resources/me/player/queue.ts">QueueGetResponse</a></code>

Methods:

- <code title="post /me/player/queue">client.me.player.queue.<a href="./src/resources/me/player/queue.ts">add</a>({ ...params }) -> void</code>
- <code title="get /me/player/queue">client.me.player.queue.<a href="./src/resources/me/player/queue.ts">get</a>() -> QueueGetResponse</code>

# Chapters

Types:

- <code><a href="./src/resources/chapters.ts">ChapterRetrieveResponse</a></code>
- <code><a href="./src/resources/chapters.ts">ChapterBulkRetrieveResponse</a></code>

Methods:

- <code title="get /chapters/{id}">client.chapters.<a href="./src/resources/chapters.ts">retrieve</a>(id, { ...params }) -> ChapterRetrieveResponse</code>
- <code title="get /chapters">client.chapters.<a href="./src/resources/chapters.ts">bulkRetrieve</a>({ ...params }) -> ChapterBulkRetrieveResponse</code>

# Tracks

Types:

- <code><a href="./src/resources/tracks.ts">TrackBulkRetrieveResponse</a></code>

Methods:

- <code title="get /tracks/{id}">client.tracks.<a href="./src/resources/tracks.ts">retrieve</a>(id, { ...params }) -> TrackObject</code>
- <code title="get /tracks">client.tracks.<a href="./src/resources/tracks.ts">bulkRetrieve</a>({ ...params }) -> TrackBulkRetrieveResponse</code>

# Search

Types:

- <code><a href="./src/resources/search.ts">SearchQueryResponse</a></code>

Methods:

- <code title="get /search">client.search.<a href="./src/resources/search.ts">query</a>({ ...params }) -> SearchQueryResponse</code>

# Playlists

Types:

- <code><a href="./src/resources/playlists/playlists.ts">PlaylistRetrieveResponse</a></code>

Methods:

- <code title="get /playlists/{playlist_id}">client.playlists.<a href="./src/resources/playlists/playlists.ts">retrieve</a>(playlistID, { ...params }) -> PlaylistRetrieveResponse</code>
- <code title="put /playlists/{playlist_id}">client.playlists.<a href="./src/resources/playlists/playlists.ts">update</a>(playlistID, { ...params }) -> void</code>

## Tracks

Types:

- <code><a href="./src/resources/playlists/tracks.ts">TrackUpdateResponse</a></code>
- <code><a href="./src/resources/playlists/tracks.ts">TrackAddResponse</a></code>
- <code><a href="./src/resources/playlists/tracks.ts">TrackRemoveResponse</a></code>

Methods:

- <code title="put /playlists/{playlist_id}/tracks">client.playlists.tracks.<a href="./src/resources/playlists/tracks.ts">update</a>(playlistID, { ...params }) -> TrackUpdateResponse</code>
- <code title="get /playlists/{playlist_id}/tracks">client.playlists.tracks.<a href="./src/resources/playlists/tracks.ts">list</a>(playlistID, { ...params }) -> PlaylistTrackObjectsCursorURLPage</code>
- <code title="post /playlists/{playlist_id}/tracks">client.playlists.tracks.<a href="./src/resources/playlists/tracks.ts">add</a>(playlistID, { ...params }) -> TrackAddResponse</code>
- <code title="delete /playlists/{playlist_id}/tracks">client.playlists.tracks.<a href="./src/resources/playlists/tracks.ts">remove</a>(playlistID, { ...params }) -> TrackRemoveResponse</code>

## Followers

Types:

- <code><a href="./src/resources/playlists/followers.ts">FollowerCheckResponse</a></code>

Methods:

- <code title="get /playlists/{playlist_id}/followers/contains">client.playlists.followers.<a href="./src/resources/playlists/followers.ts">check</a>(playlistID, { ...params }) -> FollowerCheckResponse</code>
- <code title="put /playlists/{playlist_id}/followers">client.playlists.followers.<a href="./src/resources/playlists/followers.ts">follow</a>(playlistID, { ...params }) -> void</code>
- <code title="delete /playlists/{playlist_id}/followers">client.playlists.followers.<a href="./src/resources/playlists/followers.ts">unfollow</a>(playlistID) -> void</code>

## Images

Types:

- <code><a href="./src/resources/playlists/images.ts">ImageListResponse</a></code>

Methods:

- <code title="put /playlists/{playlist_id}/images">client.playlists.images.<a href="./src/resources/playlists/images.ts">update</a>(playlistID, body) -> Response</code>
- <code title="get /playlists/{playlist_id}/images">client.playlists.images.<a href="./src/resources/playlists/images.ts">list</a>(playlistID) -> ImageListResponse</code>

# Users

Types:

- <code><a href="./src/resources/users/users.ts">UserRetrieveProfileResponse</a></code>

Methods:

- <code title="get /users/{user_id}">client.users.<a href="./src/resources/users/users.ts">retrieveProfile</a>(userID) -> UserRetrieveProfileResponse</code>

## Playlists

Types:

- <code><a href="./src/resources/users/playlists.ts">PlaylistCreateResponse</a></code>

Methods:

- <code title="post /users/{user_id}/playlists">client.users.playlists.<a href="./src/resources/users/playlists.ts">create</a>(userID, { ...params }) -> PlaylistCreateResponse</code>
- <code title="get /users/{user_id}/playlists">client.users.playlists.<a href="./src/resources/users/playlists.ts">list</a>(userID, { ...params }) -> SimplifiedPlaylistObjectsCursorURLPage</code>

# Browse

Types:

- <code><a href="./src/resources/browse/browse.ts">BrowseGetFeaturedPlaylistsResponse</a></code>
- <code><a href="./src/resources/browse/browse.ts">BrowseGetNewReleasesResponse</a></code>

Methods:

- <code title="get /browse/featured-playlists">client.browse.<a href="./src/resources/browse/browse.ts">getFeaturedPlaylists</a>({ ...params }) -> BrowseGetFeaturedPlaylistsResponse</code>
- <code title="get /browse/new-releases">client.browse.<a href="./src/resources/browse/browse.ts">getNewReleases</a>({ ...params }) -> BrowseGetNewReleasesResponse</code>

## Categories

Types:

- <code><a href="./src/resources/browse/categories.ts">CategoryRetrieveResponse</a></code>
- <code><a href="./src/resources/browse/categories.ts">CategoryListResponse</a></code>
- <code><a href="./src/resources/browse/categories.ts">CategoryGetPlaylistsResponse</a></code>

Methods:

- <code title="get /browse/categories/{category_id}">client.browse.categories.<a href="./src/resources/browse/categories.ts">retrieve</a>(categoryID, { ...params }) -> CategoryRetrieveResponse</code>
- <code title="get /browse/categories">client.browse.categories.<a href="./src/resources/browse/categories.ts">list</a>({ ...params }) -> CategoryListResponsesCursorURLPage</code>
- <code title="get /browse/categories/{category_id}/playlists">client.browse.categories.<a href="./src/resources/browse/categories.ts">getPlaylists</a>(categoryID, { ...params }) -> CategoryGetPlaylistsResponse</code>

# AudioFeatures

Types:

- <code><a href="./src/resources/audio-features.ts">AudioFeatureRetrieveResponse</a></code>
- <code><a href="./src/resources/audio-features.ts">AudioFeatureBulkRetrieveResponse</a></code>

Methods:

- <code title="get /audio-features/{id}">client.audioFeatures.<a href="./src/resources/audio-features.ts">retrieve</a>(id) -> AudioFeatureRetrieveResponse</code>
- <code title="get /audio-features">client.audioFeatures.<a href="./src/resources/audio-features.ts">bulkRetrieve</a>({ ...params }) -> AudioFeatureBulkRetrieveResponse</code>

# AudioAnalysis

Types:

- <code><a href="./src/resources/audio-analysis.ts">TimeIntervalObject</a></code>
- <code><a href="./src/resources/audio-analysis.ts">AudioAnalysisRetrieveResponse</a></code>

Methods:

- <code title="get /audio-analysis/{id}">client.audioAnalysis.<a href="./src/resources/audio-analysis.ts">retrieve</a>(id) -> AudioAnalysisRetrieveResponse</code>

# Recommendations

Types:

- <code><a href="./src/resources/recommendations.ts">RecommendationGetResponse</a></code>
- <code><a href="./src/resources/recommendations.ts">RecommendationListAvailableGenreSeedsResponse</a></code>

Methods:

- <code title="get /recommendations">client.recommendations.<a href="./src/resources/recommendations.ts">get</a>({ ...params }) -> RecommendationGetResponse</code>
- <code title="get /recommendations/available-genre-seeds">client.recommendations.<a href="./src/resources/recommendations.ts">listAvailableGenreSeeds</a>() -> RecommendationListAvailableGenreSeedsResponse</code>

# Markets

Types:

- <code><a href="./src/resources/markets.ts">MarketListResponse</a></code>

Methods:

- <code title="get /markets">client.markets.<a href="./src/resources/markets.ts">list</a>() -> MarketListResponse</code>

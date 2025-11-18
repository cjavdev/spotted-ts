# Spotted TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export SPOTIFY_CLIENT_ID="My Client ID"
export SPOTIFY_CLIENT_SECRET="My Client Secret"
export SPOTIFY_ACCESS_TOKEN="My Access Token"
npx -y spotted-ts-mcp@latest
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "spotted_ts_api": {
      "command": "npx",
      "args": ["-y", "spotted-ts-mcp", "--client=claude", "--tools=dynamic"],
      "env": {
        "SPOTIFY_CLIENT_ID": "My Client ID",
        "SPOTIFY_CLIENT_SECRET": "My Client Secret",
        "SPOTIFY_ACCESS_TOKEN": "My Access Token"
      }
    }
  }
}
```

### Cursor

If you use Cursor, you can install the MCP server by using the button below. You will need to set your environment variables
in Cursor's `mcp.json`, which can be found in Cursor Settings > Tools & MCP > New MCP Server.

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=spotted-ts-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsInNwb3R0ZWQtdHMtbWNwIl0sImVudiI6eyJTUE9USUZZX0NMSUVOVF9JRCI6IlNldCB5b3VyIFNQT1RJRllfQ0xJRU5UX0lEIGhlcmUuIiwiU1BPVElGWV9DTElFTlRfU0VDUkVUIjoiU2V0IHlvdXIgU1BPVElGWV9DTElFTlRfU0VDUkVUIGhlcmUuIiwiU1BPVElGWV9BQ0NFU1NfVE9LRU4iOiJTZXQgeW91ciBTUE9USUZZX0FDQ0VTU19UT0tFTiBoZXJlLiJ9fQ)

### VS Code

If you use MCP, you can install the MCP server by clicking the link below. You will need to set your environment variables
in VS Code's `mcp.json`, which can be found via Command Palette > MCP: Open User Configuration.

[Open VS Code](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22spotted-ts-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22spotted-ts-mcp%22%5D%2C%22env%22%3A%7B%22SPOTIFY_CLIENT_ID%22%3A%22Set%20your%20SPOTIFY_CLIENT_ID%20here.%22%2C%22SPOTIFY_CLIENT_SECRET%22%3A%22Set%20your%20SPOTIFY_CLIENT_SECRET%20here.%22%2C%22SPOTIFY_ACCESS_TOKEN%22%3A%22Set%20your%20SPOTIFY_ACCESS_TOKEN%20here.%22%7D%7D)

### Claude Code

If you use Claude Code, you can install the MCP server by running the command below in your terminal. You will need to set your
environment variables in Claude Code's `.claude.json`, which can be found in your home directory.

```
claude mcp add --transport stdio spotted_ts_api --env SPOTIFY_CLIENT_ID="Your SPOTIFY_CLIENT_ID here." SPOTIFY_CLIENT_SECRET="Your SPOTIFY_CLIENT_SECRET here." SPOTIFY_ACCESS_TOKEN="Your SPOTIFY_ACCESS_TOKEN here." -- npx -y spotted-ts-mcp
```

## Exposing endpoints to your MCP Client

There are three ways to expose endpoints as tools in the MCP server:

1. Exposing one tool per endpoint, and filtering as necessary
2. Exposing a set of tools to dynamically discover and invoke endpoints from the API
3. Exposing a docs search tool and a code execution tool, allowing the client to write code to be executed against the TypeScript client

### Filtering endpoints and tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

### Dynamic tools

If you specify `--tools=dynamic` to the MCP server, instead of exposing one tool per endpoint in the API, it will
expose the following tools:

1. `list_api_endpoints` - Discovers available endpoints, with optional filtering by search query
2. `get_api_endpoint_schema` - Gets detailed schema information for a specific endpoint
3. `invoke_api_endpoint` - Executes any endpoint with the appropriate parameters

This allows you to have the full set of API endpoints available to your MCP Client, while not requiring that all
of their schemas be loaded into context at once. Instead, the LLM will automatically use these tools together to
search for, look up, and invoke endpoints dynamically. However, due to the indirect nature of the schemas, it
can struggle to provide the correct properties a bit more than when tools are imported explicitly. Therefore,
you can opt-in to explicit tools, the dynamic tools, or both.

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

### Code execution

If you specify `--tools=code` to the MCP server, it will expose just two tools:

- `search_docs` - Searches the API documentation and returns a list of markdown results
- `execute` - Runs code against the TypeScript client

This allows the LLM to implement more complex logic by chaining together many API calls without loading
intermediary results into its context window.

The code execution itself happens in a Deno sandbox that has network access only to the base URL for the API.

### Specifying the MCP Client

Different clients have varying abilities to handle arbitrary tools and schemas.

You can specify the client you are using with the `--client` argument, and the MCP server will automatically
serve tools and schemas that are more compatible with that client.

- `--client=<type>`: Set all capabilities based on a known MCP client

  - Valid values: `openai-agents`, `claude`, `claude-code`, `cursor`
  - Example: `--client=cursor`

Additionally, if you have a client not on the above list, or the client has gotten better
over time, you can manually enable or disable certain capabilities:

- `--capability=<name>`: Specify individual client capabilities
  - Available capabilities:
    - `top-level-unions`: Enable support for top-level unions in tool schemas
    - `valid-json`: Enable JSON string parsing for arguments
    - `refs`: Enable support for $ref pointers in schemas
    - `unions`: Enable support for union types (anyOf) in schemas
    - `formats`: Enable support for format validations in schemas (e.g. date-time, email)
    - `tool-name-length=N`: Set maximum tool name length to N characters
  - Example: `--capability=top-level-unions --capability=tool-name-length=40`
  - Example: `--capability=top-level-unions,tool-name-length=40`

### Examples

1. Filter for read operations on cards:

```bash
--resource=cards --operation=read
```

2. Exclude specific tools while including others:

```bash
--resource=cards --no-tool=create_cards
```

3. Configure for Cursor client with custom max tool name length:

```bash
--client=cursor --capability=tool-name-length=40
```

4. Complex filtering with multiple criteria:

```bash
--resource=cards,accounts --operation=read --tag=kyc --no-tool=create_cards
```

## Running remotely

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the `Authorization` header using the Bearer scheme.

Additionally, authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| ------------------------ | ------------------------ | --------------- |
| `x-spotify-access-token` | `accessToken` | bearerAuth |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "spotted_ts_api": {
      "url": "http://localhost:3000",
      "headers": {
        "Authorization": "Bearer <auth value>"
      }
    }
  }
}
```

The command-line arguments for filtering tools and specifying clients can also be used as query parameters in the URL.
For example, to exclude specific tools while including others, use the URL:

```
http://localhost:3000?resource=cards&resource=accounts&no_tool=create_cards
```

Or, to configure for the Cursor client, with a custom max tool name length, use the URL:

```
http://localhost:3000?client=cursor&capability=tool-name-length%3D40
```

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "spotted-ts-mcp/server";

// import a specific tool
import retrieveAlbums from "spotted-ts-mcp/tools/albums/retrieve-albums";

// initialize the server and all endpoints
init({ server, endpoints });

// manually start server
const transport = new StdioServerTransport();
await server.connect(transport);

// or initialize your own server with specific tools
const myServer = new McpServer(...);

// define your own endpoint
const myCustomEndpoint = {
  tool: {
    name: 'my_custom_tool',
    description: 'My custom tool',
    inputSchema: zodToJsonSchema(z.object({ a_property: z.string() })),
  },
  handler: async (client: client, args: any) => {
    return { myResponse: 'Hello world!' };
  })
};

// initialize the server with your custom endpoints
init({ server: myServer, endpoints: [retrieveAlbums, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `albums`:

- `retrieve_albums` (`read`): Get Spotify catalog information for a single album.
- `bulk_retrieve_albums` (`read`): Get Spotify catalog information for multiple albums identified by their Spotify IDs.
- `list_tracks_albums` (`read`): Get Spotify catalog information about an album’s tracks.
  Optional parameters can be used to limit the number of tracks returned.

### Resource `artists`:

- `retrieve_artists` (`read`): Get Spotify catalog information for a single artist identified by their unique Spotify ID.
- `bulk_retrieve_artists` (`read`): Get Spotify catalog information for several artists based on their Spotify IDs.
- `list_albums_artists` (`read`): Get Spotify catalog information about an artist's albums.
- `list_related_artists_artists` (`read`): Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's listening history.
- `top_tracks_artists` (`read`): Get Spotify catalog information about an artist's top tracks by country.

### Resource `shows`:

- `retrieve_shows` (`read`): Get Spotify catalog information for a single show identified by its
  unique Spotify ID.
- `bulk_retrieve_shows` (`read`): Get Spotify catalog information for several shows based on their Spotify IDs.
- `list_episodes_shows` (`read`): Get Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.

### Resource `episodes`:

- `retrieve_episodes` (`read`): Get Spotify catalog information for a single episode identified by its
  unique Spotify ID.
- `bulk_retrieve_episodes` (`read`): Get Spotify catalog information for several episodes based on their Spotify IDs.

### Resource `audiobooks`:

- `retrieve_audiobooks` (`read`): Get Spotify catalog information for a single audiobook. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
- `bulk_retrieve_audiobooks` (`read`): Get Spotify catalog information for several audiobooks identified by their Spotify IDs. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
- `list_chapters_audiobooks` (`read`): Get Spotify catalog information about an audiobook's chapters. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.

### Resource `me`:

- `retrieve_me` (`read`): Get detailed profile information about the current user (including the
  current user's username).

### Resource `me.audiobooks`:

- `list_me_audiobooks` (`read`): Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.
- `check_me_audiobooks` (`read`): Check if one or more audiobooks are already saved in the current Spotify user's library.
- `remove_me_audiobooks` (`write`): Remove one or more audiobooks from the Spotify user's library.
- `save_me_audiobooks` (`write`): Save one or more audiobooks to the current Spotify user's library.

### Resource `me.playlists`:

- `list_me_playlists` (`read`): Get a list of the playlists owned or followed by the current Spotify
  user.

### Resource `me.top`:

- `list_top_artists_me_top` (`read`): Get the current user's top artists based on calculated affinity.
- `list_top_tracks_me_top` (`read`): Get the current user's top tracks based on calculated affinity.

### Resource `me.albums`:

- `list_me_albums` (`read`): Get a list of the albums saved in the current Spotify user's 'Your Music' library.
- `check_me_albums` (`read`): Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.
- `remove_me_albums` (`write`): Remove one or more albums from the current user's 'Your Music' library.
- `save_me_albums` (`write`): Save one or more albums to the current user's 'Your Music' library.

### Resource `me.tracks`:

- `list_me_tracks` (`read`): Get a list of the songs saved in the current Spotify user's 'Your Music' library.
- `check_me_tracks` (`read`): Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.
- `remove_me_tracks` (`write`): Remove one or more tracks from the current user's 'Your Music' library.
- `save_me_tracks` (`write`): Save one or more tracks to the current user's 'Your Music' library.

### Resource `me.episodes`:

- `list_me_episodes` (`read`): Get a list of the episodes saved in the current Spotify user's library.<br/>
  This API endpoint is in **beta** and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
- `check_me_episodes` (`read`): Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library.<br/>
  This API endpoint is in **beta** and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer)..
- `remove_me_episodes` (`write`): Remove one or more episodes from the current user's library.<br/>
  This API endpoint is in **beta** and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
- `save_me_episodes` (`write`): Save one or more episodes to the current user's library.<br/>
  This API endpoint is in **beta** and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).

### Resource `me.shows`:

- `list_me_shows` (`read`): Get a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.
- `check_me_shows` (`read`): Check if one or more shows is already saved in the current Spotify user's library.
- `remove_me_shows` (`write`): Delete one or more shows from current Spotify user's library.
- `save_me_shows` (`write`): Save one or more shows to current Spotify user's library.

### Resource `me.following`:

- `bulk_retrieve_me_following` (`read`): Get the current user's followed artists.
- `check_me_following` (`read`): Check to see if the current user is following one or more artists or other Spotify users.
- `follow_me_following` (`write`): Add the current user as a follower of one or more artists or other Spotify users.
- `unfollow_me_following` (`write`): Remove the current user as a follower of one or more artists or other Spotify users.

### Resource `me.player`:

- `get_currently_playing_me_player` (`read`): Get the object currently being played on the user's Spotify account.
- `get_devices_me_player` (`read`): Get information about a user’s available Spotify Connect devices. Some device models are not supported and will not be listed in the API response.
- `get_state_me_player` (`read`): Get information about the user’s current playback state, including track or episode, progress, and active device.
- `list_recently_played_me_player` (`read`): Get tracks from the current user's recently played tracks.
  _**Note**: Currently doesn't support podcast episodes._
- `pause_playback_me_player` (`write`): Pause playback on the user's account. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.
- `seek_to_position_me_player` (`write`): Seeks to the given position in the user’s currently playing track. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.
- `set_repeat_mode_me_player` (`write`): Set the repeat mode for the user's playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.
- `set_volume_me_player` (`write`): Set the volume for the user’s current playback device. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.
- `skip_next_me_player` (`write`): Skips to next track in the user’s queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.
- `skip_previous_me_player` (`write`): Skips to previous track in the user’s queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.
- `start_playback_me_player` (`write`): Start a new context or resume current playback on the user's active device. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.
- `toggle_shuffle_me_player` (`write`): Toggle shuffle on or off for user’s playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.
- `transfer_me_player` (`write`): Transfer playback to a new device and optionally begin playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.

### Resource `me.player.queue`:

- `add_player_me_queue` (`write`): Add an item to be played next in the user's current playback queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.
- `get_player_me_queue` (`read`): Get the list of objects that make up the user's queue.

### Resource `chapters`:

- `retrieve_chapters` (`read`): Get Spotify catalog information for a single audiobook chapter. Chapters are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
- `bulk_retrieve_chapters` (`read`): Get Spotify catalog information for several audiobook chapters identified by their Spotify IDs. Chapters are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.

### Resource `tracks`:

- `retrieve_tracks` (`read`): Get Spotify catalog information for a single track identified by its
  unique Spotify ID.
- `bulk_retrieve_tracks` (`read`): Get Spotify catalog information for multiple tracks based on their Spotify IDs.

### Resource `search`:

- `query_search` (`read`): Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks
  that match a keyword string. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.

### Resource `playlists`:

- `retrieve_playlists` (`read`): Get a playlist owned by a Spotify user.
- `update_playlists` (`write`): Change a playlist's name and public/private state. (The user must, of
  course, own the playlist.)

### Resource `playlists.tracks`:

- `update_playlists_tracks` (`write`): Either reorder or replace items in a playlist depending on the request's parameters.
  To reorder items, include `range_start`, `insert_before`, `range_length` and `snapshot_id` in the request's body.
  To replace items, include `uris` as either a query parameter or in the request's body.
  Replacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.
  <br/>
  **Note**: Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters.
  These operations can't be applied together in a single request.
- `list_playlists_tracks` (`read`): Get full details of the items of a playlist owned by a Spotify user.
- `add_playlists_tracks` (`write`): Add one or more items to a user's playlist.
- `remove_playlists_tracks` (`write`): Remove one or more items from a user's playlist.

### Resource `playlists.followers`:

- `check_playlists_followers` (`read`): Check to see if the current user is following a specified playlist.
- `follow_playlists_followers` (`write`): Add the current user as a follower of a playlist.
- `unfollow_playlists_followers` (`write`): Remove the current user as a follower of a playlist.

### Resource `playlists.images`:

- `list_playlists_images` (`read`): Get the current image associated with a specific playlist.

### Resource `users`:

- `retrieve_profile_users` (`read`): Get public profile information about a Spotify user.

### Resource `users.playlists`:

- `create_users_playlists` (`write`): Create a playlist for a Spotify user. (The playlist will be empty until
  you [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)
  Each user is generally limited to a maximum of 11000 playlists.
- `list_users_playlists` (`read`): Get a list of the playlists owned or followed by a Spotify user.

### Resource `browse`:

- `get_featured_playlists_browse` (`read`): Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).
- `get_new_releases_browse` (`read`): Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).

### Resource `browse.categories`:

- `retrieve_browse_categories` (`read`): Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
- `list_browse_categories` (`read`): Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
- `get_playlists_browse_categories` (`read`): Get a list of Spotify playlists tagged with a particular category.

### Resource `audio_features`:

- `retrieve_audio_features` (`read`): Get audio feature information for a single track identified by its unique
  Spotify ID.
- `bulk_retrieve_audio_features` (`read`): Get audio features for multiple tracks based on their Spotify IDs.

### Resource `audio_analysis`:

- `retrieve_audio_analysis` (`read`): Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre.

### Resource `recommendations`:

- `get_recommendations` (`read`): Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.

  For artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.

- `list_available_genre_seeds_recommendations` (`read`): Retrieve a list of available genres seed parameter values for [recommendations](/documentation/web-api/reference/get-recommendations).

### Resource `markets`:

- `list_markets` (`read`): Get the list of markets where Spotify is available.

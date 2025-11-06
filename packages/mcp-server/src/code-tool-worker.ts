// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import util from 'node:util';

import Fuse from 'fuse.js';
import ts from 'typescript';

import { WorkerInput, WorkerSuccess, WorkerError } from './code-tool-types';
import { Spotted } from 'spotted-ts';

function getRunFunctionNode(
  code: string,
): ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction | null {
  const sourceFile = ts.createSourceFile('code.ts', code, ts.ScriptTarget.Latest, true);

  for (const statement of sourceFile.statements) {
    // Check for top-level function declarations
    if (ts.isFunctionDeclaration(statement)) {
      if (statement.name?.text === 'run') {
        return statement;
      }
    }

    // Check for variable declarations: const run = () => {} or const run = function() {}
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name) && declaration.name.text === 'run') {
          // Check if it's initialized with a function
          if (
            declaration.initializer &&
            (ts.isFunctionExpression(declaration.initializer) || ts.isArrowFunction(declaration.initializer))
          ) {
            return declaration.initializer;
          }
        }
      }
    }
  }

  return null;
}

const fuse = new Fuse(
  [
    'client.albums.bulkRetrieve',
    'client.albums.listTracks',
    'client.albums.retrieve',
    'client.artists.list',
    'client.artists.listAlbums',
    'client.artists.listRelatedArtists',
    'client.artists.listTopTracks',
    'client.artists.retrieve',
    'client.shows.list',
    'client.shows.listEpisodes',
    'client.shows.retrieve',
    'client.episodes.list',
    'client.episodes.retrieve',
    'client.audiobooks.list',
    'client.audiobooks.listChapters',
    'client.audiobooks.retrieve',
    'client.me.retrieve',
    'client.me.audiobooks.check',
    'client.me.audiobooks.list',
    'client.me.audiobooks.remove',
    'client.me.audiobooks.save',
    'client.me.playlists.list',
    'client.me.top.listTopArtists',
    'client.me.top.listTopTracks',
    'client.me.albums.check',
    'client.me.albums.list',
    'client.me.albums.remove',
    'client.me.albums.save',
    'client.me.tracks.check',
    'client.me.tracks.list',
    'client.me.tracks.remove',
    'client.me.tracks.save',
    'client.me.episodes.check',
    'client.me.episodes.list',
    'client.me.episodes.remove',
    'client.me.episodes.save',
    'client.me.shows.check',
    'client.me.shows.list',
    'client.me.shows.remove',
    'client.me.shows.save',
    'client.me.following.check',
    'client.me.following.follow',
    'client.me.following.list',
    'client.me.following.unfollow',
    'client.me.player.getCurrentlyPlaying',
    'client.me.player.getDevices',
    'client.me.player.getState',
    'client.me.player.listRecentlyPlayed',
    'client.me.player.pausePlayback',
    'client.me.player.seekToPosition',
    'client.me.player.setRepeatMode',
    'client.me.player.setVolume',
    'client.me.player.skipNext',
    'client.me.player.skipPrevious',
    'client.me.player.startPlayback',
    'client.me.player.toggleShuffle',
    'client.me.player.transfer',
    'client.me.player.queue.add',
    'client.me.player.queue.get',
    'client.chapters.list',
    'client.chapters.retrieve',
    'client.tracks.list',
    'client.tracks.retrieve',
    'client.search.retrieve',
    'client.playlists.retrieve',
    'client.playlists.update',
    'client.playlists.tracks.add',
    'client.playlists.tracks.list',
    'client.playlists.tracks.remove',
    'client.playlists.tracks.update',
    'client.playlists.followers.check',
    'client.playlists.followers.follow',
    'client.playlists.followers.unfollow',
    'client.playlists.images.list',
    'client.playlists.images.update',
    'client.users.retrieveProfile',
    'client.users.playlists.create',
    'client.users.playlists.list',
    'client.browse.getFeaturedPlaylists',
    'client.browse.getNewReleases',
    'client.browse.categories.getPlaylists',
    'client.browse.categories.list',
    'client.browse.categories.retrieve',
    'client.audioFeatures.list',
    'client.audioFeatures.retrieve',
    'client.audioAnalysis.retrieve',
    'client.recommendations.get',
    'client.recommendations.listAvailableGenreSeeds',
    'client.markets.list',
  ],
  { threshold: 1, shouldSort: true },
);

function getMethodSuggestions(fullyQualifiedMethodName: string): string[] {
  return fuse
    .search(fullyQualifiedMethodName)
    .map(({ item }) => item)
    .slice(0, 5);
}

const proxyToObj = new WeakMap<any, any>();
const objToProxy = new WeakMap<any, any>();

type ClientProxyConfig = {
  path: string[];
  isBelievedBad?: boolean;
};

function makeSdkProxy<T extends object>(obj: T, { path, isBelievedBad = false }: ClientProxyConfig): T {
  let proxy: T = objToProxy.get(obj);

  if (!proxy) {
    proxy = new Proxy(obj, {
      get(target, prop, receiver) {
        const propPath = [...path, String(prop)];
        const value = Reflect.get(target, prop, receiver);

        if (isBelievedBad || (!(prop in target) && value === undefined)) {
          // If we're accessing a path that doesn't exist, it will probably eventually error.
          // Let's proxy it and mark it bad so that we can control the error message.
          // We proxy an empty class so that an invocation or construction attempt is possible.
          return makeSdkProxy(class {}, { path: propPath, isBelievedBad: true });
        }

        if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
          return makeSdkProxy(value, { path: propPath, isBelievedBad });
        }

        return value;
      },

      apply(target, thisArg, args) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a function. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.apply(target, proxyToObj.get(thisArg) ?? thisArg, args);
      },

      construct(target, args, newTarget) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a constructor. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.construct(target, args, newTarget);
      },
    });

    objToProxy.set(obj, proxy);
    proxyToObj.set(proxy, obj);
  }

  return proxy;
}

const fetch = async (req: Request): Promise<Response> => {
  const { opts, code } = (await req.json()) as WorkerInput;
  if (code == null) {
    return Response.json(
      {
        message:
          'The code param is missing. Provide one containing a top-level `run` function. Write code within this template:\n\n```\nasync function run(client) {\n  // Fill this out\n}\n```',
      } satisfies WorkerError,
      { status: 400, statusText: 'Code execution error' },
    );
  }

  const runFunctionNode = getRunFunctionNode(code);
  if (!runFunctionNode) {
    return Response.json(
      {
        message:
          'The code is missing a top-level `run` function. Write code within this template:\n\n```\nasync function run(client) {\n  // Fill this out\n}\n```',
      } satisfies WorkerError,
      { status: 400, statusText: 'Code execution error' },
    );
  }

  const client = new Spotted({
    ...opts,
  });

  const logLines: string[] = [];
  const errLines: string[] = [];
  const console = {
    log: (...args: unknown[]) => {
      logLines.push(util.format(...args));
    },
    error: (...args: unknown[]) => {
      errLines.push(util.format(...args));
    },
  };
  try {
    let run_ = async (client: any) => {};
    eval(`
      ${code}
      run_ = run;
    `);
    const result = await run_(makeSdkProxy(client, { path: ['client'] }));
    return Response.json({
      result,
      logLines,
      errLines,
    } satisfies WorkerSuccess);
  } catch (e) {
    const message = e instanceof Error ? e.message : undefined;
    return Response.json(
      {
        message,
      } satisfies WorkerError,
      { status: 400, statusText: 'Code execution error' },
    );
  }
};

export default { fetch };

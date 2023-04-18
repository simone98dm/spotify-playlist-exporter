import { IPlaylist, PlaylistItem } from "~/models/Playlist";
import { ITrack, TrackItem } from "~/models/Track";
import { IUser } from "~/models/User";
import { clientId, PROFILE_ENDPOINT, stateKey } from "~/utils/constants";

export function getHashParams(): any {
  let hashParams: { [e: string]: string } = {};
  let e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

export function generateRandomString(length: number): string {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function buildSpotifyRedirectUrl(): string {
  let redirect_uri = window.location.origin + window.location.pathname;
  let state = generateRandomString(16);
  localStorage.setItem(stateKey, state);
  let scope = "playlist-read-private playlist-read-collaborative";

  let url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(clientId);
  url += "&scope=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
  url += "&state=" + encodeURIComponent(state);

  return url;
}

export async function getUserInfo(access_token: string) {
  if (typeof access_token == "undefined") {
    return null;
  }

  return await fetch(PROFILE_ENDPOINT(), {
    headers: getHeader(access_token),
  }).then((response) => response.json() as unknown as IUser);
}

export async function getUserPlaylists(
  userId?: string
): Promise<PlaylistItem[] | null> {
  if (!userId) {
    return null;
  }

  const account = useToken();

  let url = PLAYLIST_ENDPOINT(userId);
  const list: PlaylistItem[] = [];
  do {
    const playlists = await fetch(url, {
      headers: getHeader(account.token),
    }).then((response) => response.json() as unknown as IPlaylist);

    url = playlists.next;

    if (playlists.items) {
      playlists.items.map((x) => list.push(x));
    }
  } while (Boolean(url));

  return list;
}

export async function getPlaylistTracks(
  playlistId?: string
): Promise<TrackItem[] | null> {
  if (!playlistId) {
    return null;
  }
  const account = useToken();

  let url = TRACK_ENDPOINT(playlistId);
  const list: TrackItem[] = [];
  do {
    const tracks = await fetch(url, {
      headers: getHeader(account.token),
    }).then((response) => response.json() as unknown as ITrack);

    url = tracks.next;

    if (tracks.items) {
      tracks.items.map((x) => list.push(x));
    }
  } while (Boolean(url));

  return list;
}

function getHeader(access_token: string): any {
  return {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
}

export function extractTokenFromUrl(hash: string): { token: string } {
  const r = hash.substring(1, hash.length - 1);
  let p = "";
  if (r) {
    p = r.split("=")[1];
  }

  return {
    token: p,
  };
}

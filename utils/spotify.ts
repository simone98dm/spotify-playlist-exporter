import { IPlaylist } from "~/models/Playlist";
import { ITrack } from "~/models/Track";
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
  let scope = "user-top-read";

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

export async function getUserPlaylists(userId?: string) {
  if (!userId) {
    return null;
  }
  const account = useAccount();
  return await fetch(PLAYLIST_ENDPOINT(userId), {
    headers: getHeader(account.value.token),
  }).then((response) => response.json() as unknown as IPlaylist);
}

export async function getPlaylistTracks(playlistId?: string) {
  if (!playlistId) {
    return null;
  }
  const account = useAccount();
  return await fetch(TRACK_ENDPOINT(playlistId), {
    headers: getHeader(account.value.token),
  }).then((response) => response.json() as unknown as ITrack);
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

export const PLAYLIST_ENDPOINT = (
  userId: string,
  offset: number = 1,
  limit: number = 50
) =>
  `https://api.spotify.com/v1/users/${userId}/playlists?limit=${limit}&offset=${offset}`;

export const TRACK_ENDPOINT = (
  playlistId: string,
  offset: number = 1,
  limit: number = 50
) =>
  `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`;

export const PROFILE_ENDPOINT = () => `https://api.spotify.com/v1/me`;

export const stateKey = "spotify_auth_state";

export const clientId = import.meta.env.VITE_CLIENT_ID || "";

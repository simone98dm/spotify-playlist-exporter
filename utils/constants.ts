export const PLAYLIST_ENDPOINT = (userId: string) =>
  `https://api.spotify.com/v1/users/${userId}/playlists`;

export const TRACK_ENDPOINT = (playlistId: string) =>
  `https://api.spotify.com/v1/playlists/${playlistId}/tracks
`;

export const PROFILE_ENDPOINT = () => `https://api.spotify.com/v1/me`;

export const stateKey = "spotify_auth_state";

export const clientId = import.meta.env.VITE_CLIENT_ID;

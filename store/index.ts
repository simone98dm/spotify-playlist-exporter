import { defineStore } from "pinia";
import { useAccount } from "~/composables/useAccount";
import { IPlaylist } from "~/models/Playlist";
import { ITrack } from "~/models/Track";
import { IUser } from "~/models/User";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as IUser | null,
    playlist: null as IPlaylist | null,
    tracks: null as ITrack | null,
  }),
  getters: {},
  actions: {
    async getUser() {
      const user = useAccount();
      this.user = await getUserInfo(user.value.token);
    },
    async getUserPlaylists() {
      if (!this.user) {
        await this.getUser();
      }

      this.playlist = null;

      const data = await getUserPlaylists(this.user?.id);

      if (data) {
        this.playlist = data;
      }
    },
    async getPlaylistTracks(playlistId: string) {
      if (!this.playlist) {
        await this.getUserPlaylists();
      }

      this.tracks = null;

      const data = await getPlaylistTracks(playlistId);

      if (data) {
        this.tracks = data;
      }
    },
  },
});

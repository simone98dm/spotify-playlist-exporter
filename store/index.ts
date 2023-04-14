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
    loading: false,
  }),
  getters: {
    blobUrl() {
      const line = this.tracks?.items
        .map(
          (track) =>
            `${track.track.name} | ${track.track.artists
              .map((x) => x.name)
              .join(", ")}`
        )
        .join("\n");

      const blob = new Blob([line], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      return url;
    },
  },
  actions: {
    async getUser() {
      const user = useAccount();
      this.loading = true;
      this.user = await getUserInfo(user.value.token).finally(
        () => (this.loading = false)
      );
    },
    async getUserPlaylists() {
      if (!this.user) {
        await this.getUser();
      }

      this.playlist = null;
      this.loading = true;

      const data = await getUserPlaylists(this.user?.id).finally(
        () => (this.loading = false)
      );

      if (data) {
        this.playlist = data;
      }
    },
    async getPlaylistTracks(playlistId: string) {
      if (!this.playlist) {
        await this.getUserPlaylists();
      }

      this.tracks = null;
      this.loading = true;

      const data = await getPlaylistTracks(playlistId).finally(
        () => (this.loading = false)
      );

      if (data) {
        this.tracks = data;
      }
    },
  },
});

import { defineStore } from "pinia";
import { useToken } from "~/composables/useToken";
import { PlaylistItem } from "~/models/Playlist";
import { TrackItem } from "~/models/Track";
import { IUser } from "~/models/User";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as IUser | null,
    playlist: null as PlaylistItem[] | null,
    selectedPlaylist: null as PlaylistItem | null,
    tracks: null as TrackItem[] | null,
    loading: false,
  }),
  getters: {
    blobUrl() {
      const line = this.tracks
        ?.map(
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
      const user = useToken();
      this.loading = true;
      this.user = await getUserInfo(user.token).finally(
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
    async getPlaylistTracks(selectedPlaylist: PlaylistItem) {
      if (!this.playlist) {
        await this.getUserPlaylists();
      }

      this.tracks = null;
      this.selectedPlaylist = selectedPlaylist;
      this.loading = true;

      const data = await getPlaylistTracks(selectedPlaylist.id).finally(
        () => (this.loading = false)
      );

      if (data) {
        this.tracks = data;
      }
    },
  },
});

<script lang="ts" setup>
import { useUserStore } from "~/store";

const user = useAccount();
const loginUrl = buildSpotifyRedirectUrl();

const userStore = useUserStore();
userStore.getUserPlaylists();
</script>

<template>
  <a v-if="!user.token" :href="loginUrl">Login</a>

  <section v-if="userStore.playlist">
    <div v-for="playlist in userStore.playlist.items" :key="playlist.id">
      <button
        class="button"
        @click="() => userStore.getPlaylistTracks(playlist.id)"
      >
        {{ playlist.name }}
      </button>
    </div>
  </section>

  <section v-if="userStore.tracks" class="section-column">
    <div
      v-for="track in userStore.tracks.items"
      :key="track.track.id"
      class="song"
    >
      <span class="song-title">{{ track.track.name }}</span> -
      {{ track.track.artists[0].name }}
    </div>
  </section>
</template>

<style scoped>
.button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

section {
  display: flex;
}

.section-column {
  flex-direction: column;
}

.song {
  font-size: 2rem;
  margin: 10px 0;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
}

.song-title {
  font-weight: bold;
}
</style>

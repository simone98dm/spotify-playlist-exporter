<script lang="ts" setup>
import { useUserStore } from "~/store";

const userStore = useUserStore();
userStore.getUserPlaylists();
</script>

<template>
  <header>
    <Navbar />
  </header>
  <Loading v-if="userStore.loading" />
  <Login />
  <Playlist />
  <main>
    <Track />
  </main>
</template>

<style scoped>
main {
  margin: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  max-width: 1000px;
  margin: 0 auto;
}
</style>

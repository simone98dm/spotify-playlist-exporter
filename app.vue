<script lang="ts" setup>
import { useUserStore } from "~/store";

const userStore = useUserStore();
userStore.getUserPlaylists();
</script>

<template>
  <header>
    <Navbar />
  </header>

  <div class="container">
    <aside>
      <!-- Side panel -->
      <Playlist />
    </aside>
    <main>
      <!-- Main panel -->
      <Login />
      <Loading v-if="userStore.loading" />
      <Track />
    </main>
  </div>
</template>

<style scoped>
main {
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0 auto;
  width: 100%;
}

.container {
  display: flex;
  flex: 0 0 33.33333%;
  gap: 0.5rem;
}
</style>

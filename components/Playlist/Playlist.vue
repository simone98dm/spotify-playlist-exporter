<script lang="ts" setup>
import { useUserStore } from "~/store/index";

const userStore = useUserStore();
</script>

<template>
  <section v-if="userStore.playlist" class="playlist">
    <BaseButton
      v-for="playlist in userStore.playlist"
      :key="playlist.id"
      @click="() => userStore.getPlaylistTracks(playlist)"
    >
      {{ playlist.name }}
    </BaseButton>
  </section>
</template>

<style lang="scss" scoped>
.playlist {
  margin: 0.5rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>

<script lang="ts" setup>
import { useUserStore } from "~/store";

const userStore = useUserStore();
</script>

<template>
  <div class="navbar">
    <span class="brand-name">Spotify playlist export</span>
    <div class="right">
      <BaseButton
        variant="accent"
        v-if="userStore.tracks"
        data-testid="download-playlist"
      >
        <a :href="userStore.blobUrl" download="playlist.txt">
          Download playlist
        </a>
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 80px;
  background-color: var(--primary-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.right {
  margin: 0 8px;
}

.brand-name {
  color: var(--font-color);
  font-size: 1.5rem;
  font-weight: bold;
  margin: auto 0 auto 1rem;
}
</style>

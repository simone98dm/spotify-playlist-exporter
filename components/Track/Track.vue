<script lang="ts" setup>
import { useUserStore } from "~/store";

const userStore = useUserStore();
</script>

<template>
  <section v-if="userStore.tracks">
    <BaseCard
      v-for="track in userStore.tracks"
      :key="track.track.id"
      class="song"
    >
      <img
        v-if="track.track.album.images.length > 0"
        :src="track.track.album.images[0].url"
      />
      <div class="song-detail">
        <span class="song-title">
          {{ track.track.name }}
        </span>
        <span class="song-artists">
          {{ track.track.artists.map((a) => a.name).join(", ") }}
        </span>
        <span class="song-album">
          {{ track.track.album.name }}
        </span>
      </div>
    </BaseCard>
  </section>
</template>

<style lang="scss" scoped>
.song {
  margin: 0.5rem;
  font-size: 1.5rem;
  display: flex;

  &-detail {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    gap: 0.5rem;
  }

  &-artists,
  &-album {
    font-size: 1rem;
    color: var(--secondary-color);
  }

  &-title {
    font-weight: bold;
  }
}
img {
  width: 100px;
  height: 100px;
}
</style>

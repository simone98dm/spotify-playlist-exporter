<script lang="ts" setup>
const user = useAccount();
const loginUrl = buildSpotifyRedirectUrl();
</script>

<template>
  <div class="login">
    <BaseButton v-if="!user.token">
      <a :href="loginUrl">Login</a>
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

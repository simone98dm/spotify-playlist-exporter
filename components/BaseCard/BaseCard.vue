<template>
  <div class="base-card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.base-card {
  margin: 10px 0;
  border-radius: 5px;
  background-color: var(--card-background-color);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
}
</style>

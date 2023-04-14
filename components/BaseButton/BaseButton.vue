<script lang="ts" setup>
interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
}

withDefaults(defineProps<ButtonProps>(), { variant: "primary" });
defineEmits(["click"]);
</script>
<template>
  <button
    :class="['base-button', variant]"
    @click="$emit('click')"
    data-testid="base-button"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.base-button {
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}

.primary {
  background-color: var(--primary-color);
}

.secondary {
  background-color: var(--secondary-color);
}

.outline {
  background-color: transparent;
  border: 2px solid var(--primary-color);
}
</style>

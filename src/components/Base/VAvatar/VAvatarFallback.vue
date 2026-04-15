<script setup lang="ts">
import { AvatarFallback, type AvatarFallbackProps } from 'reka-ui';

const props = defineProps</* @vue-ignore */ AvatarFallbackProps & { class?: string }>();
</script>

<template>
  <AvatarFallback
    v-bind="props"
    class="VAvatarFallback v-avatar-fallback"
    :class="props.class"
  >
    <slot />
  </AvatarFallback>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-avatar-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: inherit;
  background:colors.$gray-20;
}
</style>

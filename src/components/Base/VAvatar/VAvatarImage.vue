<script setup lang="ts">
import { AvatarImage, type AvatarImageProps } from 'radix-vue';

const props = defineProps<AvatarImageProps>();
</script>

<template>
  <AvatarImage
    v-bind="props"
    class="VAvatarImage v-avatar-image is--margin-top-0"
  />
</template>

<style lang="scss">
.v-avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  margin: 0;
}
</style>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>

<template>
  <div
    :class="props.class"
    class="VDialogFooter v-dialog-footer"
  >
    <slot />
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_transitions.scss' as *;
@use 'UiKit/styles/_variables.scss' as *;
@use 'UiKit/styles/_colors.scss' as colors;

.v-dialog-footer {
  width: 100%;
  padding: 20px 60px;
  border-top: 1px solid rgb(66 84 102 / 0.2);

  @media screen and (width < $tablet){
    padding: 20px 23px;
  }
}
</style>

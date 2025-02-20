<script setup lang="ts">
import { ToastViewport, type ToastViewportProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<ToastViewportProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ToastViewport
    v-bind="delegatedProps"
    :class="props.class"
    class="VToastViewport v-toast-viewport"
  />
</template>

<style lang="scss">
.v-toast-viewport {
  --viewport-padding: 25px;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: var(--viewport-padding);
  gap: 10px;
  width: 100%;
  max-width: 450px;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
}
</style>

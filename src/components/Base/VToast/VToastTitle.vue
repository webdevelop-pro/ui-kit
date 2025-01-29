<script setup lang="ts">
import { ToastTitle, type ToastTitleProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<ToastTitleProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ToastTitle
    v-bind="delegatedProps"
    :class="props.class"
    class="VToastTitle v-toast-title is--h5__title"
  >
    <slot />
  </ToastTitle>
</template>

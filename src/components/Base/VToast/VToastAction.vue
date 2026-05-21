<script setup lang="ts">
import { ToastAction, type ToastActionProps } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';
import VButton from '../VButton/VButton.vue';

const props = defineProps<ToastActionProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

  return delegated;
});
</script>

<template>
  <ToastAction
    v-bind="delegatedProps"
    :class="props.class"
    class="VToastAction v-toast-action"
  >
    <VButton
      size="small"
    >
      <slot />
    </VButton>
  </ToastAction>
</template>

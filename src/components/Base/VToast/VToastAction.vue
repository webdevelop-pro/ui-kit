<script setup lang="ts">
import { ToastAction, type ToastActionProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';
import VButton from '../VButton/VButton.vue';

const props = defineProps<ToastActionProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

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

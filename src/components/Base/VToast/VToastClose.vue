<script setup lang="ts">
import { ToastClose, type ToastCloseProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import closeIcon from 'UiKit/assets/images/close.svg?component';

const props = defineProps<ToastCloseProps & {
  class?: HTMLAttributes['class'];
}>();

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

  return delegated;
});
</script>

<template>
  <ToastClose
    v-bind="delegatedProps"
    :class="props.class"
    class="VToastClose v-toast-close"
  >
    <VButton
      icon-only
      variant="link"
      size="small"
    >
      <closeIcon class="v-toast-close__icon" />
    </VButton>
  </ToastClose>
</template>

<style lang="scss">
@use 'UiKit/styles/_transitions.scss' as *;
@use 'UiKit/styles/_variables.scss' as *;
@use 'UiKit/styles/_colors.scss' as colors;

.v-toast-close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: auto;
  color: colors.$black;

  &__icon {
    width: 14px;
    height: 14px;
    color: inherit;
  }

  .is--variant-info & {
    color: colors.$primary;
  }

  .is--variant-error & {
    color: colors.$red;
  }
}

</style>

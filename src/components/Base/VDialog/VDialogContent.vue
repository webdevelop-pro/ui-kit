<script setup lang="ts">
import {
  DialogContent,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
} from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';
import VDialogClose from './VDialogClose.vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps</* @vue-ignore */ DialogContentProps & {
  class?: HTMLAttributes['class'];
  ariaDescribedby?: string;
  fullScreen?: boolean;
}>();

const delegatedProps = computed(() => {
  const {
    ariaDescribedby: unusedAriaDescribedby,
    class: unusedClass,
    fullScreen: unusedFullScreen,
    ...delegated
  } = props;

  void unusedAriaDescribedby;
  void unusedClass;
  void unusedFullScreen;

  return delegated;
});
</script>

<template>
  <DialogPortal>
    <DialogOverlay class="v-dialog-overlay" />
    <DialogContent
      v-bind="{ ...delegatedProps, ...$attrs }"
      :aria-describedby="props.ariaDescribedby"
      class="v-dialog-content"
      :class="[props.class, { 'is--full-screen': props.fullScreen }]"
    >
      <slot />

      <VDialogClose />
    </DialogContent>
  </DialogPortal>
</template>

<style lang="scss">
@use 'UiKit/styles/_transitions.scss' as *;
@use 'UiKit/styles/_variables.scss' as *;
@use 'UiKit/styles/_colors.scss' as colors;

.v-dialog-overlay {
  background: rgb(18 22 31 / 40%);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1100;
}

.v-dialog-content {
  background: colors.$white;
  box-shadow: $box-shadow-medium;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 700px;
  max-height: 100%;
  overflow-y: auto;
  padding: 40px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1100;

  @media screen and (max-width: $tablet){
    // padding: 50px 10px 10px;
    padding: 15px 10px 10px;
    max-width: 100%;
    height: 100%;
  }

  &:focus {
    outline: none;
  }

  &.is--full-screen {
    max-width: 100%;
  }
}
</style>

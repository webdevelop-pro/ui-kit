<script setup lang="ts">
import {
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';
import VDialogClose from './VDialogClose.vue';

const props = defineProps<DialogContentProps & {
  class?: HTMLAttributes['class'];
  ariaDescribedby?: string;
  fullScreen?: boolean;
}>();
const emits = defineEmits<DialogContentEmits>();

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DialogPortal>
    <DialogOverlay class="v-dialog-overlay" />
    <DialogContent
      v-bind="forwarded"
      :aria-describedby="ariaDescribedby"
      class="v-dialog-content"
      :class="[props.class, { 'is--full-screen': fullScreen }]"
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

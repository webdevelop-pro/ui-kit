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
  scrollableBody?: boolean
}>();
const emits = defineEmits<DialogContentEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

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
      :class="[props.class, { 'is--full-screen': fullScreen, 'is--scrollable-body': scrollableBody }]"
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
  background: rgb(34 34 34 / 0.85);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1100;
}

.v-dialog-content {
  background: colors.$biege;
  box-shadow: $box-shadow-medium;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 1000px;
  max-height: calc(100% - 120px);
  overflow-y: auto;
  padding: 60px 0 0;
  border-radius: 8px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1100;

  @media screen and (width < $tablet){
    max-width: 100%;
    max-height: 100%;
    height: 100%;
    border-radius: 8px 8px 0 0;
  }

  &:focus {
    outline: none;
  }

  &.is--full-screen {
    max-width: 100%;
    height: 100%;
  }

  &.is--scrollable-body {
    overflow-y: auto;
  }

  // p {
  //   font-family: $familyValue;
  //   font-size: 20px;
  //   font-style: normal;
  //   font-weight: 400;
  //   line-height: 28px;
  // }
}
</style>

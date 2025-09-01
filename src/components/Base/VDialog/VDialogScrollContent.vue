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

const props = defineProps<DialogContentProps & { class?: HTMLAttributes['class'] }>();
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
    <DialogOverlay
      class="v-dialog-overlay"
    >
      <DialogContent
        :class="props.class"
        class="VDialogScrollContent v-dialog-scroll-content"
        v-bind="forwarded"
        @pointer-down-outside="(event) => {
          const originalEvent = event.detail.originalEvent;
          const target = originalEvent.target as HTMLElement;
          if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
            event.preventDefault();
          }
        }"
      >
        <slot />

        <VDialogClose />
      </DialogContent>
    </DialogOverlay>
  </DialogPortal>
</template>

<style lang="scss">
@use 'UiKit/styles/_transitions.scss' as *;
@use 'UiKit/styles/_variables.scss' as *;
@use 'UiKit/styles/_colors.scss' as colors;
.v-dialog-overlay {
  background: rgba(18, 22, 31, 0.40);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.v-dialog-scroll-content {
  padding-bottom: 15px;
  background: colors.$white;
  box-shadow: $box-shadow-medium;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 40px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
  }
}
</style>

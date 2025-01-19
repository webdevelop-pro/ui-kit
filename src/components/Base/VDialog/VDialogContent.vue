<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';
import closeIcon from 'UiKit/assets/images/close.svg';

const props = defineProps<DialogContentProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<DialogContentEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="v-dialog-overlay"
    />
    <DialogContent
      v-bind="forwarded"
      :class="props.class"
      class="VDialogContent v-dialog-content"
    >
      <slot />

      <DialogClose class="v-dialog-close">
        <closeIcon class="v-dialog-close__icon" />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>

<style lang="scss">
.v-dialog-close {
  position: absolute;
  right: 8px;
  top: 8px;

  &__icon {
    width: 20px
  }
}

.v-dialog-overlay {
  background: rgba(18, 22, 31, 0.40);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes overlayShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

<script setup lang="ts">
import { DialogClose, type DialogCloseProps } from 'radix-vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import closeIcon from 'UiKit/assets/images/close.svg?component';

const props = defineProps<DialogCloseProps>();
</script>

<template>
  <DialogClose
    v-bind="props"
    aria-label="Close"
    class="VDialogClose v-dialog-close"
  >
    <slot>
      <VButton
        icon-only
        variant="link"
        class="is--margin-top-0"
      >
        <closeIcon class="v-dialog-close__icon" />
      </VButton>
    </slot>
  </DialogClose>
</template>

<style lang="scss">
@use 'UiKit/styles/_transitions.scss' as *;
@use 'UiKit/styles/_variables.scss' as *;
@use 'UiKit/styles/_colors.scss' as colors;

.v-dialog-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: auto;

  &__icon {
    width: 24px !important;
    height: 24px !important;
    color: colors.$black
  }
}
</style>

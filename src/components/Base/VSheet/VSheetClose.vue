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
    class="VSheetClose v-sheet-close"
  >
    <slot>
      <VButton
        icon-only
        variant="link"
        size="large"
      >
        <closeIcon class="v-sheet-close__icon" />
      </VButton>
    </slot>
  </DialogClose>
</template>

<style lang="scss">
@use 'UiKit/styles/_transitions.scss' as *;
@use 'UiKit/styles/_variables.scss' as *;
@use 'UiKit/styles/_colors.scss' as colors;
.v-sheet-close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: auto;

  &__icon {
    width: 20px;
    height: 20px;
    color: colors.$primary
  }
}
</style>

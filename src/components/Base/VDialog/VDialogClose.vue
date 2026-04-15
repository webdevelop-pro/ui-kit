<script setup lang="ts">
import { DialogClose, type DialogCloseProps } from 'reka-ui';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';

const props = defineProps</* @vue-ignore */ DialogCloseProps>();
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
        size="large"
      >
        <svg
          class="v-dialog-close__icon"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
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

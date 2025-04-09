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
import { computed } from 'vue';
import VSheetClose from './VSheetClose.vue';

interface SheetContentProps extends DialogContentProps {
  side?: 'top' | 'bottom' | 'left' | 'right';
  withHeader?: boolean;
  hideClose?: boolean;
  ariaDescribedby?: string;
}

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<SheetContentProps>(), {
  side: 'right',
});

const emits = defineEmits<DialogContentEmits>();

const delegatedProps = computed(() => {
  const { side, ariaDescribedby, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="v-sheet-overlay"
      :class="{ 'is--with-header': withHeader }"
    />
    <DialogContent
      class="VSheetContent v-sheet-content"
      :aria-describedby="ariaDescribedby"
      :class="[`is--side-${side}`, { 'is--with-header': withHeader }]"
      v-bind="{ ...forwarded, ...$attrs }"
    >
      <slot />

      <VSheetClose v-if="!hideClose" />
    </DialogContent>
  </DialogPortal>
</template>

<style lang="scss">
@use 'UiKit/styles/_variables.scss' as variables;
@use 'UiKit/styles/_transitions.scss' as *;
$z-index-menu-bg: 100;
$z-index-menu: 100;
$z-index-menu-burger: $z-index-menu + 1;

.v-sheet-content {
  position: fixed;
  z-index: $z-index-menu;
  background: $white;
  overflow-y: auto;
}
.v-sheet-overlay {
  pointer-events: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $z-index-menu-bg;
  background: rgba(0, 0, 0, 0.33);

  &.is--with-header {
    top: $header-height;
  }
}
.v-sheet-overlay[data-state="open"] {
  animation: fadeIn 0.3s ease-out;
}
.v-sheet-overlay[data-state="closed"] {
  animation: fadeOut 0.3s ease-in;
}
.v-sheet-content[data-state="open"] {
  animation: 0.3s ease-out;
}
.v-sheet-content[data-state="closed"] {
  animation: 0.3s ease-in;
}

.is--side-top {
  &.v-sheet-content {
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    max-height: 367px;
  }
  &.v-sheet-content[data-state="open"] {
    animation-name: slideInFromTop;
  }
  &.v-sheet-content[data-state="closed"] {
    animation-name: slideOutToTop;
  }
}
.is--side-bottom {
  .v-sheet-content {
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    max-height: 367px;
  }
  .v-sheet-content[data-state="open"] {
    animation-name: slideInFromBottom;
  }
  .v-sheet-content[data-state="closed"] {
    animation-name: slideOutToBottom;
  }
}
.is--side-left {
  .v-sheet-content {
    top: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    max-width: 367px;
    &.is--with-header {
      top: $header-height;
      height: calc(100% - $header-height);
    }
  }
  .v-sheet-content[data-state="open"] {
    animation-name: slideInFromLeft;
  }
  .v-sheet-content[data-state="closed"] {
    animation-name: slideOutToLeft;
  }
}
.is--side-right {
  &.v-sheet-content {
    top: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    max-width: 367px;
    &.is--with-header {
      top: $header-height;
      height: calc(100% - $header-height);
    }
  }
  &.v-sheet-content[data-state="open"] {
    animation-name: slideInFromRight;
  }
  &.v-sheet-content[data-state="closed"] {
    animation-name: slideOutToRight;
  }
}
</style>

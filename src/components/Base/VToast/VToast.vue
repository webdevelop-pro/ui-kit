<script setup lang="ts">
import { ToastRoot, type ToastRootEmits, useForwardPropsEmits } from 'reka-ui';
import { computed } from 'vue';
import { type ToastProps } from '.';

const props = withDefaults(defineProps<ToastProps>(), {
  variant: 'info',
});

const emits = defineEmits<ToastRootEmits>();

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ToastRoot
    v-bind="forwarded"
    class="VToast v-toast"
    :class="[props.class, `is--variant-${variant}`]"
    @update:open="onOpenChange"
  >
    <slot />
  </ToastRoot>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;
@use 'UiKit/styles/_transitions' as *;

.v-toast {
  position: relative;
  display: flex;
  width: 100%;
  height: auto;
  min-height: 66px;
  padding: 21px 44px 21px 18px;
  margin-bottom: 10px;
  background: colors.$white;
  border-left: 2px solid transparent;
  box-shadow: variables.$box-shadow-medium;

  @media screen and (width <= 768px){
    width: 100%;
    min-height: auto;
    margin-bottom: 0;
  }

  &.is--variant-info{
    border-color: colors.$primary;
  }

  &.is--variant-error{
    border-color: colors.$red;
  }

  &.is--variant-success{
    border-color: colors.$secondary;
  }
}

.ToastRoot[data-state='open'] {
  animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ToastRoot[data-state='closed'] {
  animation: hide 100ms ease-in;
}

.ToastRoot[data-swipe='move'] {
  transform: translateX(var(--reka-toast-swipe-move-x));
}

.ToastRoot[data-swipe='cancel'] {
  transform: translateX(0);
  transition: transform 200ms ease-out;
}

.ToastRoot[data-swipe='end'] {
  animation: swipeOut 100ms ease-out;
}
</style>

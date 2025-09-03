<script setup lang="ts">
import { isVNode } from 'vue';
import {
  VToast, VToastClose, VToastDescription, VToastProvider, VToastTitle, VToastViewport,
  VToastAction,
} from './index';
import { useToast } from './use-toast';
import errorIcon from 'UiKit/assets/images/circle-exclamation.svg';
import infoIcon from 'UiKit/assets/images/circle-info.svg';
import checkIcon from 'UiKit/assets/images/circle-check.svg';

const { toasts } = useToast();

const getIcon = (variant?: string) => {
  if (variant === 'error') return errorIcon;
  if (variant === 'success') return checkIcon;
  return infoIcon;
};
const getButtonColor = (variant?: string) => {
  if (variant === 'error') return 'red';
  if (variant === 'success') return 'secondary';
  return 'primary';
};
</script>

<template>
  <VToastProvider class="VToaster v-toaster">
    <VToast
      v-for="toast in toasts"
      :key="toast.id"
      v-bind="toast"
    >
      <component
        :is="getIcon(toast.variant)"
        class="v-toaster__icon"
      />
      <div class="grid gap-1">
        <VToastTitle v-if="toast.title">
          {{ toast.title }}
        </VToastTitle>
        <template
          v-if="toast.description"
        >
          <VToastDescription
            v-if="isVNode(toast.description)"
            class="is--margin-top-4"
          >
            <component :is="toast.description" />
          </VToastDescription>
          <VToastDescription
            v-else
            class="is--margin-top-4"
          >
            {{ toast.description }}
          </VToastDescription>
          <VToastAction
            v-if="toast.action"
            :color="getButtonColor(toast.variant)"
            :alt-text="toast.action"
            class="is--margin-top-20"
            as-child
          >
            {{ toast.action }}
          </VToastAction>
        </template>
        <VToastClose />
      </div>
    </VToast>
    <VToastViewport />
  </VToastProvider>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-toaster {
  &__icon{
    margin-right: 8px;
    margin-top: 1px;
    width: 20px;
    flex-shrink: 0;
    color: colors.$primary;

    .is--variant-success & {
      color: colors.$secondary;
    }

    .is--variant-error & {
      color: colors.$red;
    }
  }
}
</style>

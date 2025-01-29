import type { ToastRootProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';

export { default as VToast } from './VToast.vue';
export { default as VToastAction } from './VToastAction.vue';
export { default as VToastClose } from './VToastClose.vue';
export { default as VToastDescription } from './VToastDescription.vue';
export { default as VToaster } from './VToaster.vue';
export { default as VToastProvider } from './VToastProvider.vue';
export { default as VToastTitle } from './VToastTitle.vue';
export { default as VToastViewport } from './VToastViewport.vue';
export { toast, useToast } from './use-toast';

export interface ToastProps extends ToastRootProps {
  class?: HTMLAttributes['class'];
  variant?: 'error' | 'success' | 'info';
  onOpenChange?: ((value: boolean) => void) | undefined;
}

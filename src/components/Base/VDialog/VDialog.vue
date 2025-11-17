<script setup lang="ts">
import {
  DialogRoot, type DialogRootEmits, type DialogRootProps, useForwardPropsEmits,
} from 'radix-vue';
import { useSyncWithUrl } from 'UiKit/composables/useSyncWithUrl';
import { watch, ref, nextTick } from 'vue';

const props = defineProps<DialogRootProps & {
  queryKey?: string;
  queryValue?: string;
}>();

const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

// Generate a unique fallback key if queryKey is not provided
const queryKey = props.queryKey || 'dialog';

// Check if URL has the query parameter on initial load (read synchronously)
const initialUrlHasValue = (() => {
  const urlParams = new URLSearchParams(window.location.search);
  const urlValue = urlParams.get(queryKey);
  return urlValue === (props.queryValue ?? 'true');
})();

// Set up URL syncing for the dialog open state
const open = useSyncWithUrl<boolean>({
  key: queryKey,
  defaultValue: false,
  syncToUrl: true,
  parse: (val) => val === (props.queryValue ?? 'true'),
  serialize: (val) => (val ? (props.queryValue ?? 'true') : ''),
});

// Track if initial sync from URL has completed
const hasInitializedFromUrl = ref(false);

// After nextTick, mark that URL initialization is complete
nextTick(() => {
  hasInitializedFromUrl.value = true;
});

// Emit updates to the parent via v-model
watch(open, (newVal) => {
  emits('update:open', newVal);
}, { immediate: true });

// Sync external open prop with internal open state
// On initial load, if URL has a value, let it take precedence
// After initialization, sync normally from props
watch(() => props.open, (newVal) => {
  // If URL had a value on initial load and we haven't initialized yet, don't override
  // This ensures that popup=contact-us in URL opens the dialog even on page refresh
  if (hasInitializedFromUrl.value || !initialUrlHasValue) {
    if (open.value !== newVal) {
      open.value = newVal;
    }
  }
}, { immediate: true });
</script>

<template>
  <DialogRoot
    v-bind="forwarded"
    :open="open"
    class="VDialog v-dialog"
  >
    <slot />
  </DialogRoot>
</template>

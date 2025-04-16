<script setup lang="ts">
import {
  DialogRoot, type DialogRootEmits, type DialogRootProps, useForwardPropsEmits,
} from 'radix-vue';
import { useSyncWithUrl } from 'UiKit/composables/useSyncWithUrl';
import { watch } from 'vue';

const props = defineProps<DialogRootProps & {
  queryKey?: string;
  queryValue?: string;
}>();

const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

// Generate a unique fallback key if queryKey is not provided
const queryKey = props.queryKey || 'dialog';

// Set up URL syncing for the dialog open state
const open = useSyncWithUrl<boolean>({
  key: queryKey,
  defaultValue: false,
  syncToUrl: true,
  parse: (val) => val === (props.queryValue ?? 'true'),
  serialize: (val) => (val ? (props.queryValue ?? 'true') : ''),
});

// Emit updates to the parent via v-model
watch(open, (newVal) => {
  emits('update:open', newVal);
}, { immediate: true });

// Sync external open prop with internal open state
watch(() => props.open, (newVal) => {
  if (open.value !== newVal) open.value = newVal;
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

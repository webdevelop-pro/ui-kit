<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from 'radix-vue';
import { VDialog, VDialogContent } from 'UiKit/components/Base/VDialog';
import { useForwardPropsEmits } from 'radix-vue';
import Command from './VCommand.vue';

const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <VDialog v-bind="forwarded">
    <VDialogContent class="VCommandDialog v-command-dialog">
      <Command class="v-command-dialog__command">
        <slot />
      </Command>
    </VDialogContent>
  </VDialog>
</template>

<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from 'reka-ui';
import { VDialog, VDialogContent } from 'UiKit/components/Base/VDialog';
import { useForwardPropsEmits } from 'reka-ui';
import Command from './VCommand.vue';

const props = defineProps</* @vue-ignore */ DialogRootProps>();
const emits = defineEmits</* @vue-ignore */ DialogRootEmits>();

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

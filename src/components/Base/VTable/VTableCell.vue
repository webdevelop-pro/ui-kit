<script setup lang="ts">
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

interface Props {
  size?: 'regular' | 'small';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'regular',
});

const { isTablet } = storeToRefs(useBreakpoints());
const classes = computed(() => {
  if (props.size === 'regular' && !isTablet.value) return 'is--body';
  if (props.size === 'regular' && isTablet.value) return 'is--small';
  if (props.size === 'small') return 'is--small';
  return '';
});
</script>

<template>
  <td
    class="VTableCell v-table-cell"
    :class="[`is--size-${props.size}`, classes]"
  >
    <slot />
  </td>
</template>

<style lang="scss">
.v-table-cell {
  color: $gray-80;
  &.is--size-regular {
    padding: 16px;
  }
  &.is--size-small {
    padding: 12px;
  }
}
</style>

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
  <th
    class="VTableHead v-table-head"
    :class="[`is--size-${props.size}`, classes]"
  >
    <slot />
  </th>
</template>

<style lang="scss">
.v-table-head {
  color: $gray-60;
  gap: 2px;
  cursor: default;
  &.is--size-regular {
    padding: 16px;
  }
  &.is--size-small {
    padding: 12px;
  }
}
</style>

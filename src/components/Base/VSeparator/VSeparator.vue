<script setup lang="ts">
import { Separator, type SeparatorProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps<
  SeparatorProps & { label?: string; withContainer?: boolean }
>();

const delegatedProps = computed(() => {
  const { withContainer: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <div :class="{ 'is--container': withContainer }">
    <Separator
      v-bind="delegatedProps"
      class="VSeparator v-separator"
    >
      <span
        v-if="props.label"
      >
        {{ props.label }}
      </span>
    </Separator>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;
.v-separator {
  margin: 60px 0;
  border-bottom: 1px solid $gray-40;
  position: relative;
}
</style>

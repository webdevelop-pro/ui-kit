<script setup lang="ts">
import { Separator, type SeparatorProps } from 'reka-ui';
import { computed } from 'vue';

const props = defineProps<
  /* @vue-ignore */ SeparatorProps & { label?: string; withContainer?: boolean }
>();

const delegatedProps = computed(() => {
  const { withContainer: _, ...delegated } = props;
  void _; // Explicitly mark as intentionally unused

  return delegated;
});

</script>

<template>
  <div>
    <Separator
      v-bind="delegatedProps"
      class="VSeparator v-separator"
      :class="{ 'is--container': withContainer }"
    >
      <span
        v-if="props.label"
        class="is--h6__title"
      >
        {{ props.label }}
      </span>
    </Separator>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;

.v-separator {
  background-color: $gray-40;
  position: relative;
  color: $gray-60;
  width: 100%;
  height: 1px;

  span {
      background-color: $white;
      z-index: 1;
      position: absolute;
      left: 50%;
      top: 49%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 12px;
  }
}
</style>
